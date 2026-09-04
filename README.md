# NET-PET-AI

Cloudflare Worker + Durable Objects scaffold for Natural English Training.

Current MVP supports two lanes:

- Private coaching lane: onboarding, lesson, practice, feedback, and NET-PET progression.
- Classroom lane: start class sessions, log rule events, and generate report-ready summaries.

## Stack

- Cloudflare Workers
- Durable Objects (SQLite-backed)
- Static frontend served through Worker assets
- Node 20 + Wrangler 4

## Run

1. Install deps: npm install
2. Run dev (no browser auto-open): npm run dev:safe
3. Open <http://127.0.0.1:8788>

## Deploy

1. Set env var once (PowerShell): `$env:CLOUDFLARE_API_TOKEN="<token>"`
2. Run deploy: npm run deploy:safe

## Domain hookup

After deploy, attach your custom domain in Cloudflare Workers routes:

- `www.naturalenglishtraining.com/*`

## Current API

- GET /api/health
- POST /api/onboarding
- POST /api/lesson
- POST /api/practice
- POST /api/feedback
- POST /api/netpet/checkin
- GET /api/netpet/state?studentId=...
- POST /api/classroom/session/start
- POST /api/classroom/event
- GET /api/classroom/session?classId=...&totalStudents=...
- GET /api/classroom/report?classId=...&totalStudents=...

## Classroom Quick Flow

1. Start a class session with class ID and total students.
2. Log behavior events as `followed` or `broken` for each student event.
3. Refresh summary to see compliance rate and flagged students.
4. Generate report text and send through your school escalation channel.

## Classroom Safety Guardrails

- Event rate limiting is enabled by default.
- Class limit: 120 behavior events per 60 seconds.
- Student limit: 20 behavior events per 60 seconds per class.
- When exceeded, API returns HTTP 429 with retry guidance.
