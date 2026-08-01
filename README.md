# The SEO Event — theseoevent.com

Static site for **The SEO Event: Beyond Algorithm** (Dhaka, Bangladesh). No build step: plain HTML, CSS, and vanilla JS.

Deployed on **Cloudflare Pages** (connected to this repo, branch `main`). Every push to `main` goes live automatically at https://theseoevent.com.

## Structure

```
index.html          Home
events.html         Event recap
gallery.html        Photo gallery
css/styles.css      All styling
js/app.js           Interactions + signup form
js/gallery-data.js  Gallery photo IDs
assets/             Logo, favicon, OG image, speaker + sponsor images
robots.txt
sitemap.xml
```

See `DEPLOY.md` for how the signup form connects to Google Sheets.
