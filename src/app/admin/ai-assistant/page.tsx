"use client";

import { useState } from "react";
import { chatWithAI, type ChatMessage } from "@/actions/chatWithAI";

type DisplayMessage = ChatMessage & { imageUrl?: string };

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage: DisplayMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const result = await chatWithAI(messages, input);

      const modelMessage: DisplayMessage = {
        role: "model",
        text: result.text ?? undefined,
        imageBase64: result.imageBase64 ?? undefined,
        imageMimeType: result.imageMimeType ?? undefined,
        imageUrl: result.imageBase64
          ? `data:${result.imageMimeType};base64,${result.imageBase64}`
          : undefined,
      };

      setMessages([...updatedMessages, modelMessage]);
    } catch (error) {
      const errorMessage: DisplayMessage = {
        role: "model",
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">AI Assistant</h1>

      <div className="border border-gray-200 rounded-xl p-6 mb-4 min-h-[400px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">
            Ask me anything, or request an image (e.g. &quot;generate a photo of a waterproofed pool terrace&quot;).
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-4 ${msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-900"
                }`}
            >
              {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}
              {msg.imageUrl && (
                <img
                  src={msg.imageUrl}
                  alt="Generated"
                  className="mt-2 rounded-lg max-w-full"
                />
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 rounded-xl p-4 text-sm">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-light transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}