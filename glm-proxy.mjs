#!/usr/bin/env node
/** Local CORS proxy for GLM API demos. Usage: npm run glm-proxy */
import { createServer } from "node:http";

const PORT = Number(process.env.GLM_PROXY_PORT || 8787);
const TARGET = process.env.GLM_API_TARGET || "https://api.z.ai/api/paas/v4/chat/completions";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    return res.end();
  }
  if (req.url !== "/chat/completions" || req.method !== "POST") {
    res.writeHead(404, cors);
    return res.end("Not found — POST /chat/completions");
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try {
    const upstream = await fetch(TARGET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization || "",
      },
      body: Buffer.concat(chunks),
    });
    const body = await upstream.text();
    res.writeHead(upstream.status, { ...cors, "Content-Type": "application/json" });
    res.end(body);
  } catch (e) {
    res.writeHead(502, cors);
    res.end(JSON.stringify({ error: { message: e.message } }));
  }
}).listen(PORT, "127.0.0.1", () => {
  console.log(`GLM proxy → ${TARGET}`);
  console.log(`Use in Rafeeq ⚙️: http://127.0.0.1:${PORT}/chat/completions`);
});
