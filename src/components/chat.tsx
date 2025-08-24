"use client"
import { useEffect, useState } from "react";

interface Message {
    id: string;
    content: string;
    role: "USER" | "ASSISTANT";
}

export function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        setMessages([
            {
                id: "1",
                content: "Hello",
                role: "USER"
            },
            {
                id: "2",
                content: "Hello",
                role: "ASSISTANT"
            }
        ])
    }, []);
    return (
        <div>
            <h1>Chat</h1>
            {messages.map((message) => (
                <div key={message.id}>
                    <p>{message.content}</p>
                </div>
            ))}
        </div>
    )
}