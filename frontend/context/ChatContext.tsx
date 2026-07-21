
"use client";
import { createContext } from "react";
import { Message } from "@/types/message";

export interface ChatContextType {
  messages: Message[];
  sendMessage: (message: string) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);