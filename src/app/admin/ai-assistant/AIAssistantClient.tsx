"use client";

import { useState } from "react";
import { chatWithAI, type ChatMessage } from "@/actions/chatWithAI";

type DisplayMessage = ChatMessage;

export default function AIAssistantClient() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const message = input.trim();
    if (!message || loading) return;

    const userMessage: DisplayMessage = { role: "user", text: message };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map(({ role, text }) => ({ role, text }));
      const result = await chatWithAI(history, message);
      const modelMessage: DisplayMessage = {
        role: "model",
        text: result.text ?? "I could not generate a response.",
      };

      setMessages([...updatedMessages, modelMessage]);
    } catch (error) {
      const errorText = error instanceof Error ? error.message : "The AI service could not respond.";
      setMessages([
        ...updatedMessages,
        { role: "model", text: errorText },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">AI Assistant</h1>
      <div className="border border-gray-200 rounded-xl p-6 mb-4 min-h-[400px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.length === 0 && <p className="text-gray-400 text-sm">Ask for help with copy, project descriptions, or customer messages.</p>}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-xl p-4 ${msg.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-900"}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">Thinking...</p>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5"
          disabled={loading}
          maxLength={2_000}
        />
        <button onClick={handleSend} disabled={loading} className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50">
          Send
        </button>
      </div>
    </div>
  );
}
