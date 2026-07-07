#!/usr/bin/env node
/**
 * Generate Rafeeq pitch PDFs (Arabic deck + combined).
 * Usage: node generate-pitch-pdf.mjs
 */
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const ROOT = dirname(fileURLToPath(import.meta.url));
const deck = join(ROOT, "pitch-deck.html");
const outAr = join(ROOT, "Rafeeq-Pitch-MCIT.pdf");

let playwright;
try {
  playwright = await import("playwright");
} catch {
  console.error("Install playwright: npm install -D playwright && npx playwright install chromium");
  process.exit(1);
}

const browser = await playwright.chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${deck}`, { waitUntil: "networkidle" });
await page.pdf({
  path: outAr,
  format: "A4",
  printBackground: true,
  margin: { top: "12mm", bottom: "12mm", left: "10mm", right: "10mm" },
});
await browser.close();

console.log(`PDF saved: ${outAr}`);
