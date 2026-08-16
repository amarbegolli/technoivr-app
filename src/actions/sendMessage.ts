"use server";

import { prisma } from "@/lib/prisma";

export async function sendMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const content = formData.get("content") as string;

  if (!name || !content) {
    return { success: false, error: "Name and message are required." };
  }

  await prisma.message.create({
    data: {
      name,
      phone: phone || null,
      email: email || null,
      content,
    },
  });

  return { success: true };
}