"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function uploadPhoto(formData: FormData) {
  const file = formData.get("file") as File;
  const category = formData.get("category") as string;
  const caption = formData.get("caption") as string;

  if (!file || file.size === 0) {
    throw new Error("Please select a file.");
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("photos")
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from("photos")
    .getPublicUrl(fileName);

  await prisma.photo.create({
    data: {
      url: urlData.publicUrl,
      category: category as any,
      caption: caption || null,
    },
  });

  revalidatePath("/admin/photos");
  revalidatePath("/gallery");
}

export async function deletePhoto(photoId: string, photoUrl: string) {
  const fileName = photoUrl.split("/").pop();

  if (fileName) {
    await supabase.storage.from("photos").remove([fileName]);
  }

  await prisma.photo.delete({
    where: { id: photoId },
  });

  revalidatePath("/admin/photos");
  revalidatePath("/gallery");
}