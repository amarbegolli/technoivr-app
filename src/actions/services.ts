"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addService(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    throw new Error("Title and description are required.");
  }

  await prisma.service.create({
    data: { title, description },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function deleteService(serviceId: string) {
  await prisma.service.delete({
    where: { id: serviceId },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
}