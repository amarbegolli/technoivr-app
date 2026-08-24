"use server";

import { GoogleGenAI } from "@google/genai";
import { requireAdmin } from "@/lib/admin";

const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 2_000;

export type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export async function chatWithAI(
  history: ChatMessage[],
  newMessage: string
) {
  await requireAdmin();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API is not configured.");
  }

  if (typeof newMessage !== "string" || !newMessage.trim()) {
    throw new Error("Message is required.");
  }

  if (newMessage.length > MAX_MESSAGE_LENGTH) {
    throw new Error("Message is too long.");
  }

  if (!Array.isArray(history) || history.length > MAX_HISTORY_MESSAGES) {
    throw new Error("Conversation history is too long.");
  }

  const contents = history.map((message) => {
    if (
      !message ||
      (message.role !== "user" && message.role !== "model") ||
      typeof message.text !== "string" ||
      !message.text.trim() ||
      message.text.length > MAX_MESSAGE_LENGTH
    ) {
      throw new Error("Invalid conversation history.");
    }

    return { role: message.role, parts: [{ text: message.text }] };
  });

  contents.push({
    role: "user",
    parts: [{ text: newMessage }],
  });

  const ai = new GoogleGenAI({ apiKey });
  let response;

  try {
    response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
    });
  } catch (error) {
    console.error("Gemini request failed", error);
    const message = error instanceof Error ? error.message.toLowerCase() : "";

    if (message.includes("api key") || message.includes("api_key")) {
      throw new Error("API key is invalid. Create a new key in Google AI Studio and update GEMINI_API_KEY.");
    }

    if (message.includes("quota") || message.includes("429") || message.includes("rate limit")) {
      throw new Error("The free AI quota has been reached. Please try again later.");
    }

    if (message.includes("model") || message.includes("404")) {
      throw new Error("The selected AI model is not available for this API key.");
    }

    throw new Error("The AI service could not respond. Check the server logs for details.");
  }

  const parts = response.candidates?.[0]?.content?.parts ?? [];

  const textPart = parts.find((p) => p.text);
  return {
    text: textPart?.text ?? null,
  };
}
