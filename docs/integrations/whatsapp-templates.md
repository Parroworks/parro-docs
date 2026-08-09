---
id: whatsapp-templates
title: WhatsApp Meta Templates
---

# WhatsApp Meta Templates

Tracking page for Meta (WhatsApp Business) message templates used by Parro Connect.

Today the backend sends most proactive messages as free-form `type: text` via `send_meta_text()`. Meta requires **approved templates** for business-initiated messages outside the 24-hour customer-care window. This page is the submission checklist and status board.

> **How to update status:** edit the Status column below, commit, and push to `parro-docs` (Vercel redeploys automatically).

## Status values

| Status | Meaning |
|--------|---------|
| `Not Submitted` | Draft only — not sent to Meta yet |
| `Submitted` | Sent to Meta / BSP for review |
| `Approved` | Live — safe to wire in backend |
| `Rejected` | Meta/BSP rejected — see Notes |
| `Re-Submitted` | Updated after rejection; waiting again |

## Master list

| # | Use case | Template name | Lang | Category | Status | Code path |
|---|----------|---------------|------|----------|--------|-----------|
| 1 | Morning medicine reminder | `morning_medicine_reminder` | `en` | UTILITY | Not Submitted | `scheduler.build_morning_message` |
| 2 | Evening medicine reminder | `evening_medicine_reminder` | `en` | UTILITY | Not Submitted | `scheduler.build_evening_message` |
| 3 | Visit summary | `visit_summary` | `en` | UTILITY | Not Submitted | `scheduler.send_visit_summary` |
| 4 | Google review request | `review_request` | `en` | MARKETING* | Not Submitted | `scheduler.send_review_requests` |
| 5 | Rx follow-up check-in | `followup_checkin` | `en` | UTILITY | Not Submitted | `followup.send_followup_whatsapp_from_followups` |
| 6 | Rx follow-up check-in (Tamil) | `followup_checkin` | `ta` | UTILITY | Not Submitted | `followup.LANGUAGE_CONFIG["tamil"]` |
| 7 | Rx follow-up check-in (Hindi) | `followup_checkin` | `hi` | UTILITY | Not Submitted | `followup.LANGUAGE_CONFIG["hindi"]` |
| 8 | Appointment cancelled | `appointment_cancelled` | `en` | UTILITY | Not Submitted | `main` bulk-cancel / `doctor_tool_executor` |
| 9 | Missed appointment (no-show) | `appointment_missed` | `en` | UTILITY | Not Submitted | `main` no-show handler |
| 10 | Daily doctor summary | `daily_doctor_summary` | `en` | UTILITY | Not Submitted | `scheduler.send_daily_doctor_summary` |

\*Review requests are often classified as **MARKETING** by Meta (opt-out / quality rules apply). Confirm with your BSP before submit.

---

## Template structures

Bodies below are adapted from current hardcoded copy in `pra-backend-meta`. Meta uses numbered placeholders (`{{1}}`, `{{2}}`, …). Keep variable order stable after approval.

### 1. `morning_medicine_reminder` — `en`

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | — |

**Body**

```text
Good morning {{1}}!

Medicine Reminder - Day {{2}}

{{3}}

{{4}}

Take care and get well soon!
- {{5}}
```

| Var | Meaning | Example |
|-----|---------|---------|
| `{{1}}` | Patient first name | Priya |
| `{{2}}` | Day number of course | 3 |
| `{{3}}` | Timed medicine block(s) | Morning: • Paracetamol 650mg … |
| `{{4}}` | Diet line or `-` | Diet: Avoid spicy food |
| `{{5}}` | Clinic name | TrueCare Family Clinic |

---

### 2. `evening_medicine_reminder` — `en`

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | — |

**Body**

```text
Good evening {{1}}!

Don't forget your night medicines:

{{2}}

Good night! Rest well.
- {{3}}
```

| Var | Meaning | Example |
|-----|---------|---------|
| `{{1}}` | Patient first name | Priya |
| `{{2}}` | Night medicine lines | Cetirizine 10mg after food |
| `{{3}}` | Clinic name | TrueCare Family Clinic |

---

### 3. `visit_summary` — `en`

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | Optional DB override: `template.visit_summary.english` |

**Body**

```text
Dear {{1}},

Thank you for visiting {{2}} today.

Diagnosis: {{3}}
{{4}}

Please follow the prescribed medicines and instructions.

For any queries reply to this message.
- {{5}}
```

| Var | Meaning | Example |
|-----|---------|---------|
| `{{1}}` | Patient name | Priya |
| `{{2}}` | Clinic name | TrueCare Family Clinic |
| `{{3}}` | Diagnosis | Viral fever |
| `{{4}}` | Follow-up line or `-` | Next Review: 16 Aug 2026 |
| `{{5}}` | Doctor name | Dr. Kumar |

---

### 4. `review_request` — `en`

| Field | Value |
|-------|-------|
| Category | MARKETING (confirm) |
| Status | Not Submitted |
| Notes | Optional DB override: `template.review_request.english` |

**Body**

```text
Dear {{1}},

We hope you are feeling much better now!

It has been a week since your visit to {{2}}. Your feedback means a lot to us!

Please take 1 minute to share your experience:
{{3}}

Thank you for trusting us with your health!
- {{4}} & Team
```

| Var | Meaning | Example |
|-----|---------|---------|
| `{{1}}` | Patient name | Priya |
| `{{2}}` | Clinic name | TrueCare Family Clinic |
| `{{3}}` | Google review URL | https://g.page/r/... |
| `{{4}}` | Doctor name | Dr. Kumar |

---

### 5. `followup_checkin` — `en` (+ buttons)

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | Prefer **quick-reply buttons** template (session interactive buttons do not work outside 24h) |

**Body**

```text
Hi! How is {{1}} feeling after the visit on {{2}}?
{{3}}
```

**Buttons (quick reply)**

1. Doing well  
2. Still recovering  
3. Needs appointment  

| Var | Meaning | Example |
|-----|---------|---------|
| `{{1}}` | Patient name | Priya |
| `{{2}}` | Visit date | 02 Aug 2026 |
| `{{3}}` | Clinic name | TrueCare Family Clinic |

---

### 6. `followup_checkin` — `ta`

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | Same template name, Tamil language translation |

**Body**

```text
வணக்கம் {{1}}!

உங்கள் மருந்து கோர்ஸ் முடிந்தது.
நீங்கள் எப்படி உணர்கிறீர்கள்?

1. நலமாக இருக்கிறேன்
2. இன்னும் குணமாகவில்லை
3. மீண்டும் மருத்துவரை சந்திக்க வேண்டும்

- {{2}}
```

| Var | Meaning |
|-----|---------|
| `{{1}}` | Patient name |
| `{{2}}` | Clinic name |

---

### 7. `followup_checkin` — `hi`

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | Same template name, Hindi language translation |

**Body**

```text
नमस्ते {{1}}!

आपका दवाई का कोर्स पूरा हो गया है।
आप कैसा महसूस कर रहे हैं?

1. बहुत बेहतर हूं
2. अभी भी ठीक नहीं हूं
3. डॉक्टर से मिलना है

- {{2}}
```

| Var | Meaning |
|-----|---------|
| `{{1}}` | Patient name |
| `{{2}}` | Clinic name |

---

### 8. `appointment_cancelled` — `en`

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | Used by bulk cancel + doctor-agent holiday/cancel-all |

**Body**

```text
Hi {{1}},

Your appointment at {{2}} on {{3}}{{4}} has been cancelled.

We apologise for the inconvenience. Please reply to reschedule.

— {{2}} Team
```

| Var | Meaning | Example |
|-----|---------|---------|
| `{{1}}` | Patient name | Priya |
| `{{2}}` | Clinic name | TrueCare Family Clinic |
| `{{3}}` | Date | 10 Aug 2026 |
| `{{4}}` | Optional time suffix or empty |  at 10:30 AM |

---

### 9. `appointment_missed` — `en`

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | No-show WhatsApp nudge |

**Body**

```text
Hi {{1}},

We noticed you missed your appointment with {{2}} today{{3}}.

We hope everything is okay.

Please reply to this message to reschedule your appointment at your convenience.

— {{4}} Team
```

| Var | Meaning | Example |
|-----|---------|---------|
| `{{1}}` | Patient first name | Priya |
| `{{2}}` | Doctor name | Dr. Kumar |
| `{{3}}` | Optional time suffix or empty |  at 10:30 AM |
| `{{4}}` | Clinic name | TrueCare Family Clinic |

---

### 10. `daily_doctor_summary` — `en`

| Field | Value |
|-------|-------|
| Category | UTILITY |
| Status | Not Submitted |
| Notes | Sent to **doctor personal WhatsApp**, not patients |

**Body**

```text
Good morning, {{1}}!

Today's Schedule
{{2}} appointment(s) booked

Yesterday
{{3}} patient(s) seen

{{4}}

Have a great day!
```

| Var | Meaning | Example |
|-----|---------|---------|
| `{{1}}` | Doctor name | Dr. Kumar |
| `{{2}}` | Today's appointment count | 12 |
| `{{3}}` | Yesterday completed visits | 9 |
| `{{4}}` | Pending block or `-` | Pending: 2 queries, 1 lab |

---

## Out of scope (session messages)

These usually stay as free-form session messages (patient already chatting within 24h). No Meta template required for v1:

- Booking confirmations after patient selects a slot
- In-chat MENU / agent replies
- Lab OCR ack + summary inside an open thread
- Prescription PDF/text sent during/after consult while session is open

Revisit if you later need to push these cold (outside session).

## Backend note

`pra-backend-meta` already has `send_meta_template()` in `main.py`, but **nothing calls it yet**. After a row reaches **Approved**, wire that use case to `send_meta_template(name, lang, components)` instead of `send_meta_text`.

## Change log

| Date | Change |
|------|--------|
| 2026-08-09 | Initial page — 10 templates drafted from backend copy; all `Not Submitted` |
