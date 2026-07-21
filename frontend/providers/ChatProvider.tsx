"use client";

import { useState } from "react";
import { ChatContext } from "@/context/ChatContext";
import { Message } from "@/types/message";

interface Props {
  children: React.ReactNode;
}

export default function ChatProvider({ children }: Props) {

  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessage(text: string) {

    const message: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, message]);
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
