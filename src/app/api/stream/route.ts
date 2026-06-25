import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

const openRouter = createOpenRouter({
  apiKey: process.env.AI_API,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openRouter("nvidia/nemotron-nano-12b-v2-vl:free"),
      system: `you are a helpful assistant that translates text to English.`,
      prompt
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error: ", error);
    return Response.json({ error: "failed to generate text" }, { status: 500 });
  }
}
