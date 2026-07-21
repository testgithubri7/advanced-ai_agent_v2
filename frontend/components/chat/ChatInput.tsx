"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { useChat } from "@/hooks/useChat";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  const { sendMessage } = useChat();

  function handleSend() {
    if (!message.trim()) return;

    sendMessage(message);

    setMessage("");
  }

  return (
    <div className="border-t border-gray-800 bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto flex items-end gap-3">

        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask me anything..."
          className="flex-1 resize-none rounded-xl bg-gray-800 px-4 py-3 outline-none"
        />

        <button className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700">
          <Mic />
        </button>

        <button
          onClick={handleSend}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          <Send />
        </button>

      </div>
    </div>
  );
}