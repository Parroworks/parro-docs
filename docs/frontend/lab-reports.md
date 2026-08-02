---
id: lab-reports
title: Lab Reports UI
---

# Lab Reports UI

## Report list view

Reports are grouped by status:
- 🔴 **Critical** — at least one Critical High/Low parameter
- 🟡 **Needs Review** — at least one High/Low parameter
- ⚪ **Pending Review** — all Normal or not yet reviewed

## Report detail modal (`ReportDetailModal.tsx`)

Opens when a report is clicked. Shows parameters in three sections:

### Critical parameters
Red border. Always visible. Shows all parameters with "Critical High" or "Critical Low" status.

### Abnormal parameters
Amber border. Always visible. Shows all parameters with "High" or "Low" status.

### Normal parameters
Collapsed accordion (click to expand). Shows count in header. Collapsed by default to keep focus on what matters.

### Summary badges
Header chips: **X Critical · X Abnormal · X Normal**

## Trend charts

For key parameters with 2+ historical readings, a trend chart is shown:

Tracked parameters: WBC, HbA1c, TSH, HDL Cholesterol, LDL Cholesterol, Total Cholesterol, Creatinine, eGFR, ALT/SGPT, AST/SGOT, Fasting Glucose, HGB/Hemoglobin, Platelets, Vitamin D, Vitamin B12, Uric Acid, Sodium, Potassium, Triglycerides, PSA.

Charts use Recharts with a responsive line chart, reference range band, and hover tooltips showing value + date.

## Send to patient

Doctors can send a WhatsApp summary to the patient directly from the dashboard. The message includes:
- Count summary (X Critical, X Abnormal, X Normal)
- Top 3 critical values (if any)
- Top 4 abnormal values
- Doctor's notes
- Link to the PDF
