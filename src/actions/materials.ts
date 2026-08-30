"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function addMaterial(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const description = formData.get("description") as string;
  const file = formData.get("image") as File | null;

  if (!name) {
    throw new Error("Name is required.");
  }

  let imageUrl: string | null = null;

  if (file && file.size > 0) {
    const fileName = `material-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(fileName, file);

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from("photos")
      .getPublicUrl(fileName);

    imageUrl = urlData.publicUrl;
  }

  await prisma.material.create({
    data: {
      name,
      brand: brand || null,
      description: description || null,
      imageUrl,
    },
  });

  revalidatePath("/admin/materials");
  revalidatePath("/materials");
}

export async function deleteMaterial(materialId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.material.delete({
    where: { id: materialId },
  });

  revalidatePath("/admin/materials");
  revalidatePath("/materials");
}