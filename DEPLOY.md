# The SEO Event site guide

A fast, static website (no build step, no framework). Just HTML, CSS, and a little vanilla JS.

```
the seo event/
├── index.html        ← Home
├── events.html       ← Event recap
├── gallery.html      ← Photo gallery + highlight reel
├── css/styles.css    ← All styling / design system
├── js/app.js         ← Interactions + signup form logic
├── js/gallery-data.js← The gallery photo IDs + helpers
├── assets/           ← Logo, favicon, OG image, speaker + sponsor images
├── robots.txt
├── sitemap.xml
└── DEPLOY.md         ← This file
```

---

## 1. The site is LIVE on Cloudflare Pages

How it is set up:

- GitHub repo: https://github.com/thebigasif/theseoevent (branch `main`) is the source of truth.
- Cloudflare Pages is connected to that repo. No build command; it serves the repo root as-is.
- Custom domain: `theseoevent.com` (plus `www`), with DNS already on Cloudflare.

**To update the live site:** change the files, push to `main` (or just ask Claude to do it). Cloudflare rebuilds and the change is live in about a minute. Keep the local folder and the repo in sync.

---

## 2. Preview it locally

Easiest: double-click `index.html` to open it in your browser.

For the gallery/video to behave exactly like production, run a tiny local server instead:

```bash
cd "the seo event"
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 3. Connect the signup form to a Google Sheet

The "Notify me" form is built and validated. It just needs somewhere to send emails. We'll use a free Google Apps Script endpoint that writes to your Sheet.

1. Create a new Google Sheet. In row 1, add headers: **Timestamp · Email · Source · Submitted**.
2. In the Sheet: **Extensions → Apps Script**.
3. Delete the placeholder and paste:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var p = e.parameter || {};
    sheet.appendRow([new Date(), p.email || '', p.source || '', p.ts || '']);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy → New deployment → Web app**.
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   - Click **Deploy**, authorize, and **copy the Web app URL** (ends in `/exec`).
5. Open `js/app.js`, find the line near the top:

```javascript
const SHEET_ENDPOINT = "";
```

   Paste your URL between the quotes, save, and push to `main`.

That's it. Submissions now append to your Sheet. (Until you do this, the form shows a friendly "you're on the list" message but doesn't store anything.)

---

## 4. Photos: current setup & upgrade path

Right now the gallery photos and the highlight reel are streamed straight from your Google Drive, so nothing needs uploading.

- ✅ **Do this:** in Drive, set the shared folder to **"Anyone with the link" with Viewer access** (Editor lets strangers change it). Viewer still lets the gallery load.
- ⚡ **Optional, for speed/reliability later:** download the photos into `assets/photos/`, then in `js/gallery-data.js` change `buildSrc()` to return `assets/photos/<filename>`. Self-hosted images load faster and never get rate-limited.

---

## 5. Things you'll likely want to customize

- **Social links & contact email:** footer of each page (`hello@theseoevent.com` and the Facebook/LinkedIn/YouTube placeholders point to `#`).
- **Next edition:** when the date lands, update the FAQ answer, the Event page, and the JSON-LD blocks.
- **Search Console:** submit `https://theseoevent.com/sitemap.xml` in Google Search Console now that the site is live.
