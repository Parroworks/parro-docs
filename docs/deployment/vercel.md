---
id: vercel
title: Vercel (Frontend)
---

# Deploying Frontend to Vercel

## Setup

1. Connect your `pra-frontend` GitHub repo to Vercel
2. Framework preset: **Next.js**
3. Add all [environment variables](./environment-variables) in Vercel project settings
4. Vercel auto-deploys on every push to `main`

## Local dev

```bash
cd pra-frontend
pnpm install
pnpm dev
# runs at http://localhost:5173
```

## Docs site (this site)

This documentation site (`parro-docs`) is also hosted on Vercel.

```bash
cd parro-docs
npm install
npm run build
# deploy via Vercel CLI or GitHub integration
```
