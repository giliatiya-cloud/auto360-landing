# Auto360 Landing

Hebrew RTL Vite landing for Auto360.

npm install
npm run build

## Setup

npm install
npm run dev
npm run build  (outputs dist/)
npm run preview

## Demo form (live FormSubmit)

Fields: name, phone, lot, city.
Client-side validation (Israeli phone pattern).
Live endpoint in src/main.js: DEMO_ENDPOINT posts to FormSubmit AJAX for gili@webxp.co.il.
POSTs JSON: name, phone, lot, city, source, submittedAt, _subject, _template, _captcha.
Success UI only after HTTP OK + FormSubmit success. Failures show #form-error and re-enable the button.
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
Live FormSubmit to gili@webxp.co.il (DEMO_ENDPOINT in src/main.js).
