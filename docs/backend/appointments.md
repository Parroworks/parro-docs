---
id: appointments
title: Appointments
---

# Appointments

## Booking via WhatsApp

Appointments are booked entirely through the WhatsApp conversation flow. See [WhatsApp Flow](./whatsapp-flow) for the full step-by-step.

## Slot availability

`routers/availability.py` and `routers/clinic_schedule.py` manage doctor availability configuration.

Slots are generated dynamically based on:
- Doctor's configured working hours (morning/evening sessions)
- Existing booked appointments on that date
- Online consultation hours (separate config)

## Online vs In-clinic

Each appointment has a `consultation_type`:
- `in_clinic` — standard visit
- `online` — video consultation via JaaS (8x8)

For online appointments, a video room is auto-created in `consultation_helpers.py` and the patient receives a join link via WhatsApp.

## Reminders

Scheduled triggers fire morning and evening reminders:

| Trigger | Route | Time |
|---------|-------|------|
| Morning reminders | `POST /trigger/morning-reminders` | Configurable |
| Evening reminders | `POST /trigger/evening-reminders` | Configurable |
| Visit summary | `POST /trigger/visit-summary` | After appointment |
| Review requests | `POST /trigger/review-requests` | Post-visit |

## Key DB tables

| Table | Purpose |
|-------|---------|
| `appointments` | All booked appointments |
| `doctors` | Doctor config including availability |
| `patients` | Patient records linked to WhatsApp number |
| `consultations` | Online video consultation records |
