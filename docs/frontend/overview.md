---
id: overview
title: Frontend Overview
---

# Frontend Overview

The `pra-frontend` is a **React + Next.js** doctor dashboard hosted on Vercel.

## What doctors can do

- View today's appointments and queue
- Manage patient records and family members
- View lab reports with parameter grouping (Critical / Abnormal / Normal)
- Trend charts for key parameters (HbA1c, TSH, Creatinine, etc.)
- Write prescriptions (AI-assisted)
- Manage medicine inventory and stock
- Configure clinic availability and online consultation hours

## Tech stack

| | |
|--|--|
| Framework | Next.js (App Router) |
| UI | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| State | React hooks |
| API | Fetch to Railway backend |

## Local development

```bash
cd pra-frontend
pnpm install
pnpm dev
```

Runs at `http://localhost:5173`.

## Env vars required

| Var | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | Railway backend URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
