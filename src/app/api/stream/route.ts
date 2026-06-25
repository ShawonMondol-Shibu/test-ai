import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

const openRouter = createOpenRouter({
  apiKey: process.env.AI_API,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openRouter("openrouter/owl-alpha"),
      system: `You are a helpful assistant that translates natural language into SQL queries.
You will be given a natural language prompt, and you will respond with a SQL query that fulfills the request.
You will not provide any explanations or additional information, only the SQL query itself.
If the prompt is ambiguous or unclear, you will ask for clarification instead of making assumptions.
`,
      prompt
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error: ", error);
    return Response.json({ error: "failed to generate text" }, { status: 500 });
  }
}
