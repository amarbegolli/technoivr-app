"use server";

import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const getText = (field: string) => {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
  };

  const name = getText("name");
  const phone = getText("phone");
  const email = getText("email");
  const content = getText("content");
  const website = getText("website");

  if (!name || !content) {
    throw new Error("Name and message are required.");
  }

  if (website) {
    throw new Error("Invalid submission.");
  }

  if (name.length > 120 || phone.length > 40 || email.length > 254 || content.length > 4_000) {
    throw new Error("One or more fields are too long.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please provide a valid email address.");
  }

  const requestHeaders = await headers();
  const clientIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(`contact:${clientIp}`, 5, 60 * 60 * 1000)) {
    throw new Error("Too many messages. Please try again later.");
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
