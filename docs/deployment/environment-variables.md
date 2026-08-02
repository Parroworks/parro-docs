---
id: environment-variables
title: Environment Variables
---

# Environment Variables

## Backend (Railway)

| Variable | Required | Description |
|----------|----------|-------------|
| `META_ACCESS_TOKEN` | ✅ | Meta WhatsApp Cloud API bearer token |
| `META_PHONE_NUMBER_ID` | ✅ | Meta phone number ID for the clinic |
| `META_API_VERSION` | ✅ | Meta API version (e.g. `v18.0`) |
| `META_VERIFY_TOKEN` | ✅ | Webhook verification token |
| `SUPABASE_URL` | ✅ | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | ✅ | Supabase service role key |
| `ANTHROPIC_API_KEY` | ✅ | Claude Sonnet API key for OCR extraction |
| `GOOGLE_CLOUD_VISION_KEY` | ✅ | Google Cloud Vision API key |
| `WHATSAPP_PROVIDER` | ✅ | `meta` or `aisensy` |
| `AISENSY_API_KEY` | ⚠️ | Required only when `WHATSAPP_PROVIDER=aisensy` |
| `JAAS_APP_ID` | ⚠️ | Required for online consultations (8x8 JaaS) |
| `OPENAI_API_KEY` | ⚠️ | Required for Whisper voice transcription |

## Frontend (Vercel)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ | Railway backend base URL |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key (public) |
