"use client"
import { Send } from "lucide-react"
import { useEffect, useState } from "react"

interface Message {
  id: string
  content: string
  role: "USER" | "ASSISTANT"
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    setMessages([
        {
          id: "1",
          content: "Hello",
          role: "USER",
        },
        {
          id: "2",
          content: "Hello from assistant",
          role: "ASSISTANT",
        },
        {
          id: "3",
          content: "Can you show me an example of a JavaScript function?",
          role: "USER",
        },
        {
          id: "4",
          content: "Sure! Here’s a simple function:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```",
          role: "ASSISTANT",
        },
        {
          id: "5",
          content: "Nice, thanks! How about an async example?",
          role: "USER",
        },
        {
          id: "6",
          content: "Of course:\n\n```javascript\nasync function fetchData(url) {\n  const response = await fetch(url);\n  return response.json();\n}\n```",
          role: "ASSISTANT",
        },
        {
          id: "7",
          content: "Cool. And what does `await` actually do?",
          role: "USER",
        },
        {
          id: "8",
          content: "`await` pauses the function until the promise resolves, letting you write async code that looks synchronous.",
          role: "ASSISTANT",
        },
        {
          id: "9",
          content: "Got it 🙌 That’s really helpful.",
          role: "USER",
        },
        {
          id: "10",
          content: "Glad to help! 🚀 Want me to also show you an example with error handling?",
          role: "ASSISTANT",
        }
      ]
      )
  }, [])

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-custom p-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "USER" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`py-2 px-4 rounded max-w-[75%] ${
                message.role === "USER"
                  ? "bg-zinc-800 text-white"
                  : ""
              }`}
            >
              {message.role === "ASSISTANT" ? <p className="font-bold mb-1">Codium</p> : <></>}
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
        />
        <Send />
      </div>
    </div>
  )
}
