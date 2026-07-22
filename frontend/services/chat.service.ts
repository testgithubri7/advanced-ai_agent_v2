import { apiFetch } from "./api";
import { ChatResponse } from "@/types/api";

export async function sendMessage(
    message: string
): Promise<ChatResponse> {

    return apiFetch<ChatResponse>(
        "/api/agent/chat",
        {
            method: "POST",

            body: JSON.stringify({
                message,
            }),
        }
    );
}