import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { chatModel } from "@/lib/ai/model";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const {
      messages,
    }: {
      messages: UIMessage[];
    } = await request.json();

    const result = streamText({
      model: chatModel,

      system: `
                You are a helpful AI assistant inside an application called AI Workspace.

                Be concise but useful.
                Use markdown when it improves readability.
                For code-related questions, provide clear explanations and examples.
                Do not invent information when you are uncertain.
                `.trim(),

      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error: "Unable to process your request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
