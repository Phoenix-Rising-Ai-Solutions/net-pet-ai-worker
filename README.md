# net-pet-ai-worker

Public CI/deploy mirror of the **NET-PET-AI** deploy surface, sourced from the authoritative private canon repo [`Phoenix-Rising-Ai-Solutions/OB-1--Authoritative-`](https://github.com/Phoenix-Rising-Ai-Solutions/OB-1--Authoritative-) (branch `canon`, path `NET-PET-AI/`).

## Why this repo exists
GitHub-hosted Actions never run on the private repo (free-plan private repos have no hosted runners — every scheduled run dies with `startup_failure`). On this **public** repo, hosted Actions run for free, so pushes (or manual dispatch) deploy the Cloudflare Worker `net-pet-ai` on the Cloudflare free tier.

## Deploy pipeline
`.github/workflows/deploy-net-pet-ai.yml`:
1. Verify `CLOUDFLARE_API_TOKEN` (predeploy guardrail)
2. `wrangler deploy` (wrangler.toml -> `deploy/net-pet-ai-fixed.router.js` + public assets + DO/KV/D1 bindings)
3. Smoke check `GET /api/health` must return `ok:true` — otherwise the run fails loudly

## Secrets (repo-level)
- `CLOUDFLARE_API_TOKEN` — account-scoped Cloudflare API token (Workers:Edit)
- `CLOUDFLARE_ACCOUNT_ID`

No GitHub PAT is stored here. Source of truth remains the private canon repo; this is a deploy artifact only.
