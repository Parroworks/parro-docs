---
id: supabase
title: Supabase
---

# Supabase

Supabase (PostgreSQL) is the primary database and file storage for Parro Connect.

## Key tables

| Table | Purpose |
|-------|---------|
| `doctors` | Doctor profiles, WhatsApp number, clinic config, availability |
| `patients` | Patient records, linked to WhatsApp `from_number` |
| `appointments` | All booked appointments |
| `consultations` | Online video consultation records |
| `conversation_states` | WhatsApp state machine state per phone number |
| `lab_reports` | Uploaded lab reports (URL, OCR text, status) |
| `lab_report_values` | Individual parameter rows for each report |
| `lab_orders` | Ordered tests per patient (used for patient attribution) |
| `medicines` | Medicine inventory |
| `medicine_stock` | Stock batches with expiry and quantity |
| `prescriptions` | Written prescriptions |

## File storage

Lab report files (PDF and images) are stored in the `lab-reports` bucket in Supabase Storage. Files are public — the URL is stored in `lab_reports.file_url`.

## Connection

```python
from supabase import create_client
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
```

Uses the **service key** (not anon key) on the backend for full DB access.

## `conversation_states` schema

```sql
phone_number   TEXT PRIMARY KEY
state          TEXT       -- e.g. "idle", "awaiting_slot_selection"
temp_data      JSONB      -- arbitrary state machine context
updated_at     TIMESTAMP
```

`temp_data` stores things like selected date, pending OCR result, last processed `wamid`.
