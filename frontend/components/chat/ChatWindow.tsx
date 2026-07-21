"use client";

import { useChat } from "@/hooks/useChat";

export default function ChatWindow() {
  const { messages } = useChat();

  return (
    <main className="flex-1 overflow-y-auto bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto space-y-4">

        {messages.length === 0 ? (
          <div className="text-center mt-28">
            <h2 className="text-5xl font-bold mb-4">
              Welcome 👋
            </h2>

            <p className="text-gray-400">
              Ask me anything...
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-xl max-w-xl ${
                message.role === "user"
                  ? "bg-blue-600 ml-auto"
                  : "bg-gray-800"
              }`}
            >
              {message.content}
            </div>
          ))
        )}

      </div>
    </main>
  );
}