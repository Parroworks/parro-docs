---
id: intro
slug: /
title: Introduction
sidebar_position: 1
---

# Parro Connect

**WhatsApp-first clinic management platform** for TrueCare Family Clinic and multi-clinic deployments.

Patients interact entirely over WhatsApp — booking appointments, receiving lab reports, getting prescriptions — while doctors manage everything from a web dashboard.

---

## How it works

```
Patient WhatsApp  →  Meta Webhook  →  FastAPI Backend  →  Supabase DB
                                              ↓
                                      React Frontend (Dashboard)
```

1. Patient sends a WhatsApp message to the clinic number
2. Meta fires a webhook to the FastAPI backend on Railway
3. The state machine in `whatsapp_handler.py` processes the message
4. Response is sent back via AiSensy or Meta Cloud API (togglable)
5. All data is persisted in Supabase (PostgreSQL)
6. Doctors view and manage everything in the React frontend

---

## Repos

| Repo | Purpose | Hosted on |
|------|---------|-----------|
| `pra-backend-meta` | FastAPI backend, WhatsApp handler, OCR pipeline | Railway |
| `pra-frontend` | React + Next.js doctor dashboard | Vercel |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.10, FastAPI, httpx |
| Database | Supabase (PostgreSQL) |
| File Storage | Supabase Storage (`lab-reports` bucket) |
| WhatsApp | Meta Cloud API + AiSensy (provider toggle) |
| OCR | Google Cloud Vision API |
| AI Extraction | Claude Sonnet 4.6 (Anthropic) |
| Frontend | React, Next.js, Recharts, Tailwind CSS |
| Deployment | Railway (backend), Vercel (frontend) |
