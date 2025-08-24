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
}

function refineMessages(
  prev: DisplayMessage[],
  parsed: { assistantMessage?: string; artifacts?: any[] }
): DisplayMessage[] {
  const updated = [...prev];

  // Handle assistant text streaming
  if (parsed.assistantMessage) {
    const lastIdx = updated.findLastIndex(
      (m) => m.role === "assistant" && !m.file
    );

    if (lastIdx >= 0) {
      updated[lastIdx].content = parsed.assistantMessage;
    } else {
      updated.push({ role: "assistant", content: parsed.assistantMessage });
    }
  }

  // Handle files (artifacts)
  if (parsed.artifacts) {
    parsed.artifacts.forEach((artifact) => {
      Object.entries(artifact.actions).forEach(([file, code]) => {
        if (!updated.some((m) => m.file === file)) {
          updated.push({ role: "assistant", file, content: code as string });
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

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { content: input, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setDisplayMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({
        messages: [...messages, userMessage],
      }),
    });

    if (!res.body) {
      console.error("No response body");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) {
        buffer += decoder.decode(value, { stream: true });

        // parse with full buffer (incremental growth)
        const parsed = parseStreamChunk(buffer);

        setDisplayMessages((prev) =>
          refineMessages(prev, {
            ...parsed,
            assistantMessage: parsed.assistantMessage ?? undefined,
          })
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

        // Keep backend messages
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
      done = readerDone;
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
                  ? "text-white"
                  : ""
              }`}
            >
              {/* Codium header only on the FIRST assistant text */}
              {message.role === "assistant" &&
                !message.file &&
                idx ===
                  displayMessages.findIndex(
                    (m) => m.role === "assistant" && !m.file
                  ) && <p className="font-bold pb-2">Codium</p>}

              {message.file ? (
                <div>
                  <p className="font-mono text-sm text-zinc-400 mb-1 flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-400" /> {message.file}
                  </p>
                </div>
              ) : (
                message.content
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
