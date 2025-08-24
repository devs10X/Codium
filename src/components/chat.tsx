"use client";
import { Check, Send } from "lucide-react";
import { useState } from "react";
import { parseStreamChunk } from "@/lib/parseResponse";

interface Message {
  content: string;
  role: "user" | "assistant";
}

interface DisplayMessage {
  role: "user" | "assistant" | "system";
  content?: string;
  file?: string;
  conversationTurn?: number; // Track which conversation turn this belongs to
}

function refineMessages(
  prev: DisplayMessage[],
  parsed: { assistantMessage?: string; artifacts?: any[] },
  currentTurn: number
): DisplayMessage[] {
  const updated = [...prev];

  // Handle assistant text streaming
  if (parsed.assistantMessage) {
    const lastIdx = updated.findLastIndex(
      (m) => m.role === "assistant" && !m.file && m.conversationTurn === currentTurn
    );

    if (lastIdx >= 0) {
      updated[lastIdx].content = parsed.assistantMessage;
    } else {
      updated.push({ 
        role: "assistant", 
        content: parsed.assistantMessage,
        conversationTurn: currentTurn
      });
    }
  }

  // Handle files (artifacts)
  if (parsed.artifacts) {
    parsed.artifacts.forEach((artifact) => {
      Object.entries(artifact.actions).forEach(([file, code]) => {
        // Check if this file already exists for this conversation turn
        if (!updated.some((m) => m.file === file && m.conversationTurn === currentTurn)) {
          updated.push({ 
            role: "assistant", 
            file, 
            content: code as string,
            conversationTurn: currentTurn
          });
        }
      });
    });
  }

  return updated;
}

export function Chat({ handleFiles }: { handleFiles: (files: any) => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([]);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [conversationTurn, setConversationTurn] = useState(0);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const currentTurnNumber = conversationTurn + 1;
    setConversationTurn(currentTurnNumber);

    const userMessage: Message = { content: input, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setDisplayMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, userMessage],
      }),
    });

    if (!res.body) {
      console.error("No response body");
      return;
    }

    if (!res.ok) {
      console.error("Response not OK:", res.status, res.statusText);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let done = false;

    while (!done) {
      try {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // parse with full buffer (incremental growth)
          const parsed = parseStreamChunk(buffer);

          // Only update if we have content
          if (parsed.assistantMessage !== null || (parsed.artifacts && parsed.artifacts.length > 0)) {
            // Update display messages with streaming content
            setDisplayMessages((prev) =>
              refineMessages(prev, {
                ...parsed,
                assistantMessage: parsed.assistantMessage ?? undefined,
              }, currentTurnNumber)
            );

            // Merge files
            if (parsed.artifacts && parsed.artifacts.length > 0) {
              const merged: Record<string, string> = { ...files };
              parsed.artifacts.forEach((artifact) => {
                Object.entries(artifact.actions).forEach(([file, code]) => {
                  merged[file] = code as string;
                });
              });
              setFiles(merged);
              handleFiles(merged);
            }

            // Keep backend messages in sync
            if (parsed.assistantMessage != null) {
              setMessages((prev) => {
                const updated = [...prev];
                if (
                  updated.length > 0 &&
                  updated[updated.length - 1].role === "assistant"
                ) {
                  updated[updated.length - 1].content = parsed.assistantMessage!;
                } else {
                  updated.push({
                    role: "assistant",
                    content: parsed.assistantMessage!,
                  });
                }
                return updated;
              });
            }
          }
        }
      } catch (error) {
        console.error("Error reading stream:", error);
        break;
      }
    }

    setDisplayMessages((prev) => [
      ...prev,
      { role: "system", content: "Done with Generation ✓" },
    ]);
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-custom p-4 space-y-2">
        {displayMessages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`py-2 px-4 rounded max-w-[95%] ${
                message.role === "user"
                  ? "bg-zinc-800 text-white"
                  : message.role === "system"
                  ? "text-white mt-4"
                  : ""
              }`}
            >
              {/* Show Codium header for assistant messages with text content - find first message of each turn */}
              {message.role === "assistant" &&
                !message.file &&
                message.content &&
                displayMessages.findIndex(
                  (m) => m.role === "assistant" && 
                  !m.file && 
                  m.conversationTurn === message.conversationTurn
                ) === idx && (
                  <p className="font-bold pb-2">Codium</p>
                )}

              {message.file ? (
                <div>
                  <p className="font-mono text-sm text-zinc-400 -mb-5 flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-400" /> {message.file}
                  </p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2 items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border rounded text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="p-2 bg-zinc-800 text-white rounded"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}