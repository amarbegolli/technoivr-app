"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { PhotoCategory } from "@prisma/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const IMAGE_FORMATS = {
  "image/jpeg": { extension: "jpg", signature: [0xff, 0xd8, 0xff] },
  "image/png": {
    extension: "png",
    signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  },
  "image/webp": {
    extension: "webp",
    signature: [0x52, 0x49, 0x46, 0x46],
  },
} as const;

type SupportedImageType = keyof typeof IMAGE_FORMATS;

function isSupportedImageType(type: string): type is SupportedImageType {
  return type in IMAGE_FORMATS;
}

async function getImageExtension(file: File) {
  if (!isSupportedImageType(file.type)) {
    throw new Error("Only JPEG, PNG, and WebP images are allowed.");
  }

  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const { signature, extension } = IMAGE_FORMATS[file.type];
  const hasExpectedSignature = signature.every((byte, index) => bytes[index] === byte);
  const isWebp =
    file.type !== "image/webp" ||
    (bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50);

  if (!hasExpectedSignature || !isWebp) {
    throw new Error("The uploaded file does not match its image type.");
  }

  return extension;
}

export async function uploadPhoto(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const uploadedFile = formData.get("file");
  const category = formData.get("category");
  const caption = formData.get("caption");

  if (!(uploadedFile instanceof File) || uploadedFile.size === 0) {
    throw new Error("Please select a file.");
  }

  if (uploadedFile.size > MAX_FILE_SIZE) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  if (typeof category !== "string" || !Object.values(PhotoCategory).includes(category as PhotoCategory)) {
    throw new Error("Please select a valid category.");
  }

  const photoCategory = category as PhotoCategory;

  if (typeof caption === "string" && caption.length > 500) {
    throw new Error("Caption must be 500 characters or fewer.");
  }

  const extension = await getImageExtension(uploadedFile);
  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("photos")
    .upload(fileName, uploadedFile, {
      cacheControl: "3600",
      contentType: uploadedFile.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from("photos")
    .getPublicUrl(fileName);

  try {
    await prisma.photo.create({
      data: {
        url: urlData.publicUrl,
        category: photoCategory,
        caption: typeof caption === "string" ? caption.trim() || null : null,
      },
    });
  } catch (error) {
    await supabase.storage.from("photos").remove([fileName]);
    throw error;
  }

  revalidatePath("/admin/photos");
  revalidatePath("/gallery");
}

export async function deletePhoto(photoId: string) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const photo = await prisma.photo.findUnique({
    where: { id: photoId },
    select: { url: true },
  });

  if (!photo) {
    throw new Error("Photo not found.");
  }

  const storagePath = new URL(photo.url).pathname.split("/photos/")[1];

  if (!storagePath) {
    throw new Error("Invalid photo storage path.");
  }

  await prisma.photo.delete({
    where: { id: photoId },
  });

  const { error: removeError } = await supabase.storage
    .from("photos")
    .remove([decodeURIComponent(storagePath)]);

  if (removeError) {
    console.error(`Photo record deleted but storage cleanup failed: ${removeError.message}`);
  }

  revalidatePath("/admin/photos");
  revalidatePath("/gallery");
}
