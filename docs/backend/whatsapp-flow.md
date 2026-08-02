---
id: whatsapp-flow
title: WhatsApp Flow
---

# WhatsApp Flow & State Machine

## Inbound message types handled

| Type | Example | Handler |
|------|---------|---------|
| Text | "Hi", "Book", "1" | `handle_inbound_message()` |
| Button reply | Yes/No confirmations | `button_reply` section in `main.py` |
| List reply | Slot selection, patient picker | `list_reply` section in `main.py` |
| Document | Lab report PDF/image | `handle_document()` |
| Audio | Voice message | Transcribed via Whisper, then text handler |

## Duplicate prevention

Meta sometimes fires the same webhook twice. The backend deduplicates using `wamid` (WhatsApp message ID):

```python
if _td.get("last_wamid") == msg_wamid:
    # skip — already processed
```

The `last_wamid` is stamped into `temp_data` before processing begins.

## Appointment booking flow

```
Patient: "Hi"
Bot: Welcome + Doctor selection list

Patient: Selects doctor
Bot: Visit type? (In-clinic / Online)

Patient: Selects visit type
Bot: Which date? (Today / Tomorrow / Pick date)

Patient: Selects date
Bot: Morning / Evening session

Patient: Selects session
Bot: Shows available time slots as list

Patient: Selects slot
Bot: Confirms name + slot, books appointment
```

## Lab report flow

```
Patient sends PDF/image
Bot: "For which patient?" (shows family member list)

Patient selects patient
Bot: "⏳ Got it! Processing your report in the background..."
     [state → idle, background task starts]

Background (30–60s):
  1. Download file from Meta
  2. OCR all pages (Google Vision)
  3. Chunk + extract values (Claude Sonnet)
  4. Check OCR name vs selected patient

If name matches:
  → Save to DB, send WhatsApp summary to patient

If name mismatch:
  → Send confirmation buttons: "Report says [OCR Name]. Tag to [Selected]?"
  Patient: Yes → save  |  No → cancel
```

## Family account support

One WhatsApp number can have multiple patients linked (family members). The bot shows a picker filtered to patients with pending lab orders. If only one has a pending order, it auto-selects.
