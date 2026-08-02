---
id: railway
title: Railway (Backend)
---

# Deploying Backend to Railway

## Setup

1. Connect your `pra-backend-meta` GitHub repo to Railway
2. Railway auto-detects Python and uses the `Procfile` or `railway.toml`
3. Add all [environment variables](./environment-variables)
4. Railway auto-deploys on every push to `main`

## Triggering a redeploy

Push any commit to `main` — including an empty one:

```bash
git commit --allow-empty -m "chore: trigger Railway redeploy"
git push
```

## Logs

View real-time logs in the Railway dashboard. Key log prefixes:

| Prefix | Meaning |
|--------|---------|
| `[Meta Inbound]` | Raw inbound webhook payload |
| `[Meta TEXT IN]` | Parsed text message |
| `[Meta BUTTON]` | Button reply received |
| `[WA] provider=...` | Outbound message sent |
| `[WA] status=...` | Provider response |
| `[OCR]` | OCR pipeline progress |
| `[LAB WA]` | Lab report WhatsApp flow |

## Health check

```
GET https://<your-railway-url>/health
```

Returns `{"status": "ok"}`.
