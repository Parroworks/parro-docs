---
id: api-reference
title: API Reference
---

# API Reference

The backend auto-generates interactive API docs via FastAPI's built-in Swagger UI.

## Live API docs (Railway)

Once deployed, visit:

```
https://<your-railway-url>/docs
```

This gives you a full interactive Swagger UI where you can:
- Browse all endpoints grouped by tag
- See request/response schemas
- Test endpoints directly from the browser

## Key endpoint groups

### Webhook
- `GET /webhook/meta` — Meta webhook verification
- `POST /webhook/meta` — Inbound WhatsApp messages

### Lab Reports
- `POST /lab-reports/whatsapp` — Receive report from WhatsApp
- `GET /lab-reports/{patient_id}` — Patient report history
- `POST /lab-reports/send-to-patient` — Send report summary to patient

### Appointments
- `GET /appointments` — List appointments
- `POST /appointments` — Create appointment

### Medicines
- `GET /medicines` — List medicines
- `POST /medicines` — Add medicine
- `GET /dashboard/pharmacy-alerts` — Low stock / expiry alerts

### Triggers (scheduled)
- `POST /trigger/morning-reminders`
- `POST /trigger/evening-reminders`
- `POST /trigger/visit-summary`
- `POST /trigger/review-requests`

### Config
- `GET /config/{doctor_id}` — Get doctor config
- `PATCH /config/{doctor_id}/{config_key}` — Update config value

### Health
- `GET /health` — Service health check
