---
id: pharmacy
title: Pharmacy & Medicines
---

# Pharmacy & Medicines

## Medicine inventory

Full CRUD for medicine stock management via REST API.

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/medicines` | List all medicines |
| POST | `/medicines` | Add new medicine |
| PUT | `/medicines/{id}` | Update medicine |
| DELETE | `/medicines/{id}` | Remove medicine |
| PATCH | `/medicines/{id}/deactivate` | Deactivate |
| PATCH | `/medicines/{id}/activate` | Reactivate |
| PATCH | `/medicines/{id}/threshold` | Set low-stock threshold |
| PATCH | `/medicines/{id}/increment-usage` | Record dispensing |

## Stock management

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/medicines/{id}/stock` | View batches |
| POST | `/medicines/{id}/stock` | Add stock batch |
| POST | `/medicines/{id}/stock/{batch_id}/writeoff` | Write off expired stock |
| PATCH | `/medicine-stock/{batch_id}` | Update batch |
| POST | `/medicine-stock/{batch_id}/adjust` | Adjust quantity |
| GET | `/medicines/{id}/transactions` | Transaction history |

## Dashboard alerts

`GET /dashboard/pharmacy-alerts` returns low-stock and expiry alerts for the doctor dashboard.

## AI Prescription

`POST /prescriptions/write` — AI-assisted prescription generation via `prescription_ai_router.py`.
