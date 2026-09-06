# Auto360 Landing

Hebrew RTL Vite landing for Auto360 (approved marketing content v2).

## Setup

```bash
npm install
npm run dev
npm run build   # outputs dist/
npm run preview
```

## Demo form stub

Fields: שם / טלפון / מגרש / עיר.
Client-side validation (Israeli phone pattern).
Stub endpoint: `STUB_ENDPOINT` in `src/main.js` — replace with CRM/webhook for production.
On static hosts, network errors are ignored; success UI shows after validation.

## Honesty

Full lead funnel (R5) is in development — short note on page only, not sold as live.

## Deploy

Publish `dist/` to any static host (Netlify, Vercel, Cloudflare Pages).

## עברית

דף נחיתה RTL ל-Auto360. Vite + vanilla HTML/CSS/JS.
תוכן מאושר v2 (דני/נועה). Form: שם · טלפון · מגרש · עיר.
