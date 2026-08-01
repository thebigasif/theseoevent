/* ============================================================
   Gallery photo data · The SEO Event, Dhaka 2024
   Hand-curated mix of high-res photos from the user's Drive
   ("new photos / seo event images"), served via Drive's image
   endpoint. Chosen for variety: different speakers, crowd,
   networking, and venue shots (no repeated subjects).
   To self-host later: drop the files in /assets/photos/ and
   swap buildSrc() below.
   ============================================================ */

// Google Drive file IDs, curated for variety
const PHOTO_IDS = [
  "1oZsoIZU1-ZeVk_hnKolwWPAddRRomGVd", // event banner
  "1vx2nR5J1oACT8CP8barGivDR-TA4ooTz", // audience
  "14Z7mShr1XeuFPNdGoBFrZ28Agbaw50kf", // speaker
  "1hv3DDw7OcYuzPqSlA4ChgFoPcAjqEK2v", // crowd
  "1AYApyL8JsOOzLKx0Bam7Zgppf1fCm7p6", // speaker, agency talk
  "1tnUqb1Ju51iXi00Jo2Y4zeQXc7v-lAB8", // attendees
  "1WLudy2adYZGLuvfV9KWF8SRDJ0YiSpmF", // speaker, mid-talk
  "10YpAL3nSU1b6v9iuOsxpi1BaB-0f3bIk", // the venue
  "1mmHLwIrpf1VpjbgBO25MRD2jsWb-cYT4", // audience
  "1wssDJuEmB1-A2Zbmsmnsn4wxHT9oTCgr", // speaker
  "1g3tUtK6cUZHB-BZVbaalqh4GVGKh9M7A", // networking
  "1awB8yieltdJZPvQE5PTagm1uH5FDUKHy", // speaker at podium
  "1Kugc9vT6kCKBuxfaob_nOFKEqHEDanIg", // attendees
  "1OTetnRCSMmHd43W02EVJx0xJHBT2yXW5", // stage + screen
  "1Cqt6fGtmG7iZv4_wnqaOnPJRa5QFJ01k", // speaker
  "1sX5wSrRRqELdpw3bL5NZK4Brhp8YSrCZ", // audience watching
  "1QWr-7SjJtRge4j5HUoHkp2Tocr4BVCzo", // candid
  "1ysep5bpU8u_KCV8t8rwwFVzqY-A-2AWH", // behind the scenes
  "1FYSn4jrMSDS6nvFYNwezKkzXPXMMmCDW", // session in progress
  "17e2be5BA99lz8kJYBg1hmjaR3DVa2fyM", // speaker at podium
  "1EfG7O0ISpScQ_mr3Q9dSDuJh7ZHOvHFm", // networking
];

// Remove any accidental duplicates, keep order
const GALLERY = [...new Set(PHOTO_IDS)];

// Build a Drive image URL at a given width
function buildSrc(id, w) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
}
// Fallback host if the first one is throttled
function buildSrcAlt(id, w) {
  return `https://lh3.googleusercontent.com/d/${id}=w${w}`;
}

// Highlight reel (public Drive video)
const HIGHLIGHT_REEL_ID = "1Qd31rbbcOxVsx42igprMTmiqVtAVSN-6";
