"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export type ChatMessage = {
  role: "user" | "model";
  text?: string;
  imageBase64?: string;
  imageMimeType?: string;
};

export async function chatWithAI(
  history: ChatMessage[],
  newMessage: string
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!newMessage || newMessage.trim().length === 0) {
    throw new Error("Message is required.");
  }

  const contents = history.map((msg) => ({
    role: msg.role,
    parts: msg.text
      ? [{ text: msg.text }]
      : [{ inlineData: { data: msg.imageBase64!, mimeType: msg.imageMimeType! } }],
  }));

  contents.push({
    role: "user",
    parts: [{ text: newMessage }],
  });

  const response = await ai.models.generateContent({
  model: "gemini-2.0-flash-preview-image-generation",
  contents,
});

  const parts = response.candidates?.[0]?.content?.parts ?? [];

  const textPart = parts.find((p) => p.text);
  const imagePart = parts.find((p) => p.inlineData);

  return {
    text: textPart?.text ?? null,
    imageBase64: imagePart?.inlineData?.data ?? null,
    imageMimeType: imagePart?.inlineData?.mimeType ?? null,
  };
}