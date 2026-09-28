import { openai } from "@ai-sdk/openai";

export const chatModel = openai(
  process.env.OPENAI_MODEL ?? "gpt-4o-mini",
);