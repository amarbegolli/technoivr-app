"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const content = formData.get("content") as string;

  if (!name || !content) {
    throw new Error("Name and message are required.");
  }

  await prisma.message.create({
    data: {
      name,
      phone: phone || null,
      email: email || null,
      content,
    },
  });

  redirect("/contact?success=true");
}