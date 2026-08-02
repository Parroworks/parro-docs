---
id: lab-ocr
title: Lab Reports & OCR
---

# Lab Reports & OCR Pipeline

## Overview

```
PDF/Image  →  Google Vision OCR  →  Chunk  →  Claude Sonnet (parallel)  →  Merge  →  DB
```

All logic lives in `lab_ocr_service.py`.

## Step 1 — PDF to images

`pdf_to_images_bytes()` converts **all pages** of a PDF to JPEG using PyMuPDF at 2x zoom for OCR quality. A 29-page PDF produces 29 JPEG images.

## Step 2 — Google Vision OCR

`ocr_pdf_all_pages()` batches images to Google Vision API (max 16 per request) using `DOCUMENT_TEXT_DETECTION`. Full text from all pages is joined into one string — typically 40,000–70,000 characters for a detailed blood report.

## Step 3 — Chunked parallel extraction

For text longer than 10,000 chars, `chunk_ocr_text()` splits into overlapping chunks (10,000 chars, 500-char overlap) so parameters near chunk boundaries aren't missed.

All chunks are sent to **Claude Sonnet 4.6** in parallel via `asyncio.gather()`. Each chunk returns structured JSON:

```json
{
  "parameters": [
    {
      "name": "HbA1c",
      "category": "Diabetes",
      "value": 6.2,
      "unit": "%",
      "ref_low": 4.0,
      "ref_high": 5.6,
      "status": "High"
    }
  ]
}
```

## Step 4 — Merge

`merge_chunk_results()` deduplicates parameters by name. When the same parameter appears in multiple chunks, it keeps the version with the most complete reference range.

## Step 5 — Name mismatch check

OCR extracts `patient_name` from the report. This is compared against the selected patient using **word-overlap matching** (words > 3 chars). If mismatch is detected, the report is held and the patient is asked to confirm before saving to DB.

## Status classification

| Parameters contain | Report status |
|-------------------|--------------|
| Any Critical High/Low | `Critical` |
| Any High/Low | `Needs Review` |
| All Normal | `Pending Review` |

## Async background processing

The patient receives an instant ack ("⏳ Processing...") and the state returns to idle. OCR runs in the background via `asyncio.create_task()`. On completion, the patient receives a WhatsApp summary with counts and abnormal values.

## Env vars required

| Var | Purpose |
|-----|---------|
| `GOOGLE_CLOUD_VISION_KEY` | Google Cloud API key (Vision API enabled) |
| `ANTHROPIC_API_KEY` | Claude Sonnet for value extraction |
