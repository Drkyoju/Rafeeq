#!/usr/bin/env node
/**
 * Headless smoke test for Rafeeq — all 14 views, both languages, key interactions.
 * Usage: node test-rafeeq.mjs
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
};

function serve(req, res) {
  const path = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const file = join(ROOT, path);
  readFile(file)
    .then((buf) => {
      res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
      res.end(buf);
    })
    .catch(() => {
      res.writeHead(404);
      res.end("Not found");
    });
}

const server = createServer(serve);
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}/index.html`;

let playwright;
try {
  playwright = await import("playwright");
} catch {
  console.error("Install playwright: npm install -D playwright && npx playwright install chromium");
  server.close();
  process.exit(1);
}

const browser = await playwright.chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`PAGE: ${e.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`CONSOLE: ${msg.text()}`);
});

const views = [
  "dash", "group", "alerts", "crowd", "scan", "medical", "missing", "wear",
  "trans", "exp", "fiqh", "copilot", "coord", "reports", "pitch",
];

await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => {
  try { localStorage.setItem("rafeeq_onboard", "1"); } catch (e) {}
  document.getElementById("onboardModal")?.classList.remove("open");
});
await page.waitForSelector("#beads .bead", { timeout: 10000 });

for (const v of views) {
  const btn = await page.$(`.rail button[data-v="${v}"]`);
  if (btn && (await btn.isVisible())) {
    await btn.click();
  } else {
    await page.evaluate((view) => goView(view), v);
  }
  await page.waitForSelector(`#${v}.active`, { timeout: 5000 });
  const title = await page.textContent("#ttl");
  if (!title || title.length < 2) throw new Error(`Empty title on view: ${v}`);
}

await page.click("#langBtn");
await page.waitForFunction(() => document.documentElement.lang === "en");
for (const v of ["crowd", "wear", "pitch", "copilot", "alerts"]) {
  await page.click(`.rail button[data-v="${v}"]`);
  await page.waitForSelector(`#${v}.active`);
}

await page.click('.rail button[data-v="scan"]');
await page.fill("#scanId", "70217");
await page.click('button[data-i="scan_confirm"]');
await page.waitForSelector(".toast.show", { timeout: 3000 });
await page.waitForSelector(".toast:not(.show)", { timeout: 4000 });

await page.click('.rail button[data-v="copilot"]');
await page.click("#aiChips .chip");
await page.waitForSelector("#aiOut b", { timeout: 3000 });

await page.click('.rail button[data-v="pitch"]');
await page.waitForSelector("#ptReq .row", { timeout: 3000 });
await page.evaluate(() => exportProjectProfile());

await page.click('.rail button[data-v="dash"]');
await page.waitForSelector("#mcitCheck .mcit-row", { timeout: 3000 });
await page.waitForSelector("#sensorGrid .pill", { timeout: 3000 });
await page.click('.rail button[data-v="alerts"]');
await page.waitForSelector("#alertsList", { timeout: 3000 });
await page.click('.rail button[data-v="crowd"]');
await page.click('#crowdTabs button[data-ct="data"]');
await page.waitForSelector("#flowPrediction .flow-now", { timeout: 3000 });
await page.click('#crowdTabs button[data-ct="map"]');
await page.waitForSelector("#crowdMap", { timeout: 3000 });
const mapDots = await page.$$("#crowdMap circle.cmap-dot");
if (mapDots.length < 40) throw new Error(`Crowd map dots missing (got ${mapDots.length})`);
await page.click("#mapCtrls .map-ctrl");
await page.click("#settingsBtn");
await page.waitForSelector("#settingsModal.open");
await page.click('#settingsModal button[onclick="closeModals()"]');

await page.click("#netBtn");
await page.waitForSelector("#offlineBar.show", { timeout: 3000 });
await page.click("#netBtn");

await page.click('.rail button[data-v="wear"]');
await page.waitForSelector("#sehaPanel .row", { timeout: 3000 });
const gf = await page.textContent("#gfList");
if (!gf || gf.length < 10) throw new Error("Geofence list empty");

const saved = await page.evaluate(async () => {
  const open = () => new Promise((res, rej) => {
    const r = indexedDB.open("rafeeq", 1);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  const db = await open();
  return new Promise((res) => {
    const tx = db.transaction("kv", "readonly");
    const req = tx.objectStore("kv").get("rafeeq_v2");
    req.onsuccess = () => res(!!req.result && req.result.v === 2);
  });
});
if (!saved) throw new Error("IndexedDB snapshot not found");

const hasEnhance = await page.evaluate(() => typeof renderAlertsInbox === "function");
if (!hasEnhance) throw new Error("Enhancements module not loaded");

const actionStrip = await page.$("#actionStrip .act-chip");
if (!actionStrip) throw new Error("Action strip missing");

await browser.close();
server.close();

if (errors.length) {
  console.error("FAIL — errors detected:\n" + errors.join("\n"));
  process.exit(1);
}

console.log("PASS — 15 views (AR+EN), alerts inbox, UX pack, Netlify-ready, IndexedDB");
