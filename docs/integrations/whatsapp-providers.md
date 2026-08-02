---
id: whatsapp-providers
title: WhatsApp Providers (Meta / AiSensy)
---

# WhatsApp Providers — Meta / AiSensy Toggle

## Why the toggle exists

AiSensy tracks all outbound message volume for billing purposes. The toggle lets you switch providers without any code changes — just one env var in Railway.

## How it works

All outbound WhatsApp sends go through `whatsapp_sender.py`:

```python
async def send_whatsapp_message(to_number: str, payload: dict) -> dict:
    # reads WHATSAPP_PROVIDER at call time
    # routes to Meta or AiSensy accordingly
    # payload format is identical for both
```

The payload format (buttons, lists, documents, text) is identical because AiSensy mirrors the Meta Cloud API schema.

## Functions that use the toggle

| Function | File | Message type |
|----------|------|-------------|
| `send_meta_text()` | `main.py` | Plain text |
| `send_meta_document()` | `main.py` | PDF / document |
| `send_meta_interactive()` | `main.py` | Buttons (inline) |
| `send_meta_buttons()` | `consultation_helpers.py` | Reply buttons |
| `send_meta_list()` | `consultation_helpers.py` | List menus |
| `send_whatsapp_text()` | `consultation_helpers.py` | Plain text |

## What stays on Meta always

- Inbound webhook receiver (`POST /webhook/meta`)
- Media download (`download_meta_media()`)

## Switching providers

In Railway environment variables:

```
# Use Meta (default)
WHATSAPP_PROVIDER=meta

# Use AiSensy
WHATSAPP_PROVIDER=aisensy
AISENSY_API_KEY=<bearer token from AiSensy dashboard>
```

No redeploy of code needed — Railway picks up env var changes on redeploy.

## Verification

Railway logs will show on every outbound message:
```
[WA] provider=aisensy to=919047099959 type=text
[WA] status=200 body=...
```

## AiSensy prerequisite

Your production WhatsApp Business number must be registered and display-name approved on AiSensy's platform before switching. The Meta test number (`+1 555 991-8904`) will not work with AiSensy.
