# Auto360 Landing

Hebrew RTL Vite landing for Auto360.

npm install
npm run build

## Setup

npm install
npm run dev
npm run build  (outputs dist/)
npm run preview

## Demo form (native FormSubmit POST)

Fields: name, phone, lot, city.
Client-side validation (Israeli phone pattern).
Native HTML POST to FormSubmit (no fetch/AJAX) — avoids browser CORS on GitHub Pages.
Form action posts name/phone/lot/city plus hidden _subject, _template=table, _captcha=false, _next=?sent=1#demo, source=auto360-landing.
JS validates only; if valid, native submit. On return with sent=1, shows success UI and strips query via history.replaceState.
First-time FormSubmit may require Activate / Confirm on gili@webxp.co.il.

## Honesty

Full lead funnel (R5) is in development. Short tasteful note on page only — not sold as live.

## Design

Premium industrial automotive dark theme. Heebo + Rubik. Mobile-first RTL. Accessible.

## Deploy

Publish dist/ (or docs/ for GitHub Pages) to any static host (Netlify, Vercel, Cloudflare Pages, S3).

## עברית

דף נחיתה RTL. Vite + vanilla.
Form: שם / טלפון / מגרש / עיר.
Native FormSubmit POST to gili@webxp.co.il (no browser fetch — avoids CORS on GitHub Pages).
