# Setup
1. Google Sheet → Extensions → Apps Script, paste `Code.gs`, save.
2. Deploy → Manage deployments → edit → Version: New version → Deploy (URL stays the same).
3. Reload the Sheet: a "Retake" menu appears.

# Approving requests
- New requests arrive with Status = Pending.
- Change Status (column F) to `Approved` or `Declined`.
- Retake → Send decision emails. Column G records when each email was sent; rows are never emailed twice.
- Copies to print: `=COUNTIFS(D:D,"Quiz 5",F:F,"Approved")` etc.
