---
id: architecture
title: Architecture
---

# Backend Architecture

## Entry point — `main.py`

All inbound WhatsApp webhooks arrive at `POST /webhook/meta`. The handler:

1. Deduplicates by `wamid` (message ID) — prevents double-processing when Meta fires the same event twice
2. Extracts `from_number`, `clinic_number`, and message content
3. Routes to `handle_inbound_message()` in `whatsapp_handler.py`

## State machine — `whatsapp_handler.py`

Every patient conversation has a **state** stored in Supabase (`conversation_states` table).

```
idle
  └─ greeting → awaiting_name → awaiting_dob → registered
  └─ book_appointment → awaiting_date → awaiting_slot → confirmed
  └─ lab_report_flow → awaiting_patient_select → processing (background)
  └─ awaiting_lab_mismatch_confirm
```

State is read at the start of every message and written at the end. Temp data (e.g. selected date, pending OCR result) is stored alongside state as a JSON blob.

## Routers

| File | Routes |
|------|--------|
| `routers/lab_reports_router.py` | Lab report upload, OCR, dashboard |
| `routers/appointments.py` | Slot availability, booking |
| `routers/availability.py` | Doctor availability config |
| `routers/clinic_schedule.py` | Clinic hours management |
| `routers/prescription_ai_router.py` | AI prescription generation |

## Key helper files

| File | Purpose |
|------|---------|
| `database.py` | All Supabase read/write functions |
| `whatsapp_sender.py` | Provider-agnostic WhatsApp send (Meta or AiSensy) |
| `consultation_helpers.py` | Button/list senders, video room helpers |
| `lab_ocr_service.py` | Google Vision OCR + Claude chunked extraction |
| `multi_doctor.py` | Multi-doctor clinic support |
