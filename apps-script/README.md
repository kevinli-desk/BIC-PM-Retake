# Setup (collect registrations in a Google Sheet)
1. Create a Google Sheet → Extensions → Apps Script, paste `Code.gs`.
2. Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone). Copy the URL.
3. Paste the URL into `ENDPOINT` in `index.html`, commit, push.
4. Enable GitHub Pages (Settings → Pages → main / root).
Count per quiz in the Sheet: `=COUNTIF(D:D,"Quiz 5")` etc.
