---
id: google-vision
title: Google Vision OCR
---

# Google Vision OCR

## Setup

1. Create a GCP project (e.g. `parro-ocr-testing`)
2. Enable the **Cloud Vision API**
3. Create an API key restricted to Cloud Vision API only
4. Set `GOOGLE_CLOUD_VISION_KEY` in Railway

:::caution
If billing on the GCP project is closed or suspended, Vision API calls return 403. Create a new project with active billing — do not try to reopen a closed billing account.
:::

## API used

`DOCUMENT_TEXT_DETECTION` via the Vision REST API:

```
POST https://vision.googleapis.com/v1/images:annotate?key={API_KEY}
```

This mode is optimised for dense text documents like lab reports.

## Batching

The Vision API accepts up to **16 images per request**. For PDFs with more than 16 pages, `ocr_pdf_all_pages()` automatically batches:

```python
BATCH_SIZE = 16
for batch_start in range(0, len(pages), BATCH_SIZE):
    batch = pages[batch_start:batch_start + BATCH_SIZE]
    # POST batch to Vision API
```

## Cost

Google Vision API pricing (as of 2025): ~$1.50 per 1,000 pages. A typical 29-page lab report costs ~$0.04.
