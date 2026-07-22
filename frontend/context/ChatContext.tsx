
"use client";
import { createContext } from "react";
import { Message } from "@/types/message";

export interface ChatContextType {

    messages: Message[];

    loading: boolean;

    error: string | null;

    sendMessage(message:string): Promise<void>;

}
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);