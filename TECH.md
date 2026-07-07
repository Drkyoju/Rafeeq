# Rafeeq — Technical Disclosure (MCIT / Judges)

**Live demo:** https://rafeqai.netlify.app/app?judge=1  
**Last updated:** July 2026

This page separates what is **real in the prototype** from what is **simulated**, and outlines the production API plan.

---

## What is real (works in the browser today)

| Capability | Implementation |
|------------|----------------|
| Bilingual PWA (AR/EN) | Static HTML/JS, `gov.css`, service worker |
| 45-pilgrim ops console | In-memory + IndexedDB persistence |
| Offline mode | Manual toggle + `navigator.onLine`; queued actions sync on reconnect |
| Crowd map & density UI | Client-side simulation with realistic zone data |
| Nusuk scan flow | Simulated NFC verify (demo pilgrim IDs) |
| SEHA cardiac panel | Simulated ECG stream + escalation UI |
| Integration map | 12 national entities with status (live / pilot / planned) |
| Webhook log | **Simulated** HTTP stubs — latency, 200 OK, persisted in `localStorage` |
| Judge / manager modes | URL params `?judge=1`, `?manager=1` |
| Playwright smoke tests | `npm test` — runs on every Netlify deploy |

---

## What is simulated (architecture-ready, not live APIs)

| Entity | Demo behaviour | Production target |
|--------|----------------|-------------------|
| **Baseer (SDAIA)** | Zone density feed | `GET /density/zones` — national crowd API |
| **Nusuk Card** | Scan by pilgrim ID | `POST /verify/nfc` — official pilgrim identity |
| **Nusuk Business** | Ticket / coord webhooks | `POST /tickets` — operator back-office |
| **SEHA Virtual** | RPM/ECG escalation | `POST /rpm/stream` — virtual hospital |
| **SDAIA/STC Band** | Vitals + SOS | `WS /vitals` — wearable telemetry |
| **Baladi+ / Maps** | Reroute suggestions | `GET /routes` — official routing |
| **Mashaer Security** | Missing-person alert | `POST /missing/alert` |
| **Red Crescent 997** | Planned — dispatch stub | `POST /dispatch` |
| **Ministry of Hajj** | Planned — compliance export | `POST /compliance` |
| **Adilla companies** | Marked **live** — dashboard API pattern | B2B operator integration |

Webhook stubs fire locally when you scan, report missing, escalate medical, etc. Check **Integrations → Webhook log** or the dashboard **National integration status** card.

---

## Optional: GLM AI assistant

- Run `npm run glm-proxy` with a Zhipu GLM API key in `.env`
- Without the proxy, the copilot uses **deterministic fallback** answers from live group data

---

## Data & PDPL

- All pilgrim data in the demo is **synthetic** (no real PII).
- Production design: **safety-only telemetry** (vitals, location zone, attendance) — no religious profiling, no unnecessary identity storage.
- PDPL alignment: purpose limitation, consent via Nusuk Card binding, retention limits, Saudi-hosted backend (planned: Supabase / gov cloud).

---

## Deployment

```bash
npm test          # Playwright smoke tests (Netlify build command)
npm run serve     # Local preview on :4173
```

Netlify config: `netlify.toml` — `command = "npm test"`, `publish = "."`

---

## Repository

https://github.com/Drkyoju/Rafeeq
