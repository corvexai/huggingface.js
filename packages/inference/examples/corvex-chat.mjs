// Run with: node packages/inference/examples/corvex-chat.mjs
// Requires a build first: pnpm -w build (so dist/esm exists)

import { InferenceClient } from "../dist/esm/index.js";

const client = new InferenceClient();

const base = process.env.CORVEX_API_BASE_URL || "https://api.corvex.ai";
if (process.env.CORVEX_API_BASE_URL) {
  console.log("Using CORVEX_API_BASE_URL =", base);
}

async function run(label, accessToken) {
  try {
    const out = await client.chatCompletion({
      provider: "corvex",
      task: "conversational",
      // You can pass either accessToken or apiKey — base class handles headers.
      accessToken,
      model: "tinyllama",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is the capital of France?" },
      ],
      max_tokens: 100,
      temperature: 0.2,
      stream: false,
    });
    console.log(`[${label}] OK:\n`, JSON.stringify(out, null, 2));
  } catch (e) {
    console.error(`[${label}] ERROR`, e?.status || "", e?.message || e);
  }
}

await run("VALID", process.env.CORVEX_API_KEY || "replace_me");
await run("INVALID", "invalid_key");
