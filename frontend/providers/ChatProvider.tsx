"use client";

import { useState } from "react";
import { ChatContext } from "@/context/ChatContext";
import { Message } from "@/types/message";
import { sendMessage as sendMessageToAPI } from "@/services/chat.service";

interface Props {
  children: React.ReactNode;
}

export default function ChatProvider({ children }: Props) {

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(text: string) {

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setError(null);

    try {

      const response = await sendMessageToAPI(text);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        error,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}