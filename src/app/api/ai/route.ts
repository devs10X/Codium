import { getSystemPrompt } from "@/lib/prompt";
import OpenAI from "openai";

const client = new OpenAI({
    baseURL: "https://models.github.ai/inference",
    apiKey : process.env.OPENAI_API,
});

const systemPrompt = getSystemPrompt();

export async function POST(req: Request) {
    const { messages } = await req.json();
    const stream = await client.chat.completions.create({
        model : 'openai/gpt-4.1',
        messages : [{
            role : 'system',
            content : systemPrompt
        }, ...messages],
        stream: true 
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
        async start(controller) {
        try {
            for await (const part of stream) {
            const text = part.choices[0]?.delta?.content;
            if (text) {
                controller.enqueue(encoder.encode(text));
            }
            }
        } catch (err) {
            controller.error(err);
        } finally {
            controller.close();
        }
        },
    });

    return new Response(readable, {
        headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        },
    });
}