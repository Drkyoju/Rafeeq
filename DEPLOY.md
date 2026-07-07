# Deploy Rafeeq to Netlify

## One-click (recommended)

1. Push this repo to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Connect GitHub and select the `Rafeeq` repository.
4. Build settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm test`
   - **Publish directory:** `.` (root)
5. Click **Deploy site**.

Your live URL will be `https://<random-name>.netlify.app` — rename under **Site settings → Domain management**.

## CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Judge / demo links

| URL | Purpose |
|-----|---------|
| `/?judge=1` | Track 3 judge mode — hides Fiqh/Translation, MCIT card, auto-demo |
| `/?track3=1` | Track 3 focus only (no auto-demo) |
| `/?manager=1` | Company manager dashboard (mock aggregate) |
| `/?judge=1&lang=en` | English judge demo for MCIT screening |

## Local preview

```bash
npm run serve
# open http://127.0.0.1:4173/?judge=1
```

## Notes

- `npm test` runs Playwright smoke tests on every Netlify build.
- Service worker caches the app shell for offline use.
- GitHub Pages workflow (`.github/workflows/pages.yml`) still works if you prefer GitHub hosting.
