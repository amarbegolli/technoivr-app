"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function addMaterial(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const description = formData.get("description") as string;

  if (!name) {
    throw new Error("Name is required.");
  }

  await prisma.material.create({
    data: {
      name,
      brand: brand || null,
      description: description || null,
    },
  });

  revalidatePath("/admin/materials");
  revalidatePath("/materials");
}

export async function deleteMaterial(materialId: string) {
  await requireAdmin();

  await prisma.material.delete({
    where: { id: materialId },
  });

  revalidatePath("/admin/materials");
  revalidatePath("/materials");
}
