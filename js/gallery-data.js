/* ============================================================
   Gallery photo data · The SEO Event, Dhaka 2024
   Hand-curated from the full pro-photo set (AFRN1177-1342),
   balanced mix: stage moments, crowd energy, networking, and
   venue shots. One frame per speaker, no repeated faces.
   To self-host later: drop the files in /assets/photos/ and
   swap buildSrc() below.
   ============================================================ */

// Google Drive file IDs, curated for balance and variety
const PHOTO_IDS = [
  "1oZsoIZU1-ZeVk_hnKolwWPAddRRomGVd", // AFRN1177 event banner
  "1g3tUtK6cUZHB-BZVbaalqh4GVGKh9M7A", // AFRN1241 packed audience
  "1iTaetYxr96_rw-6hpKUy_YatLwUSA05R", // AFRN1183 speaker at the backdrop
  "1dNt8AMgGX1s5gWoTaPCJycHxWNti5jpH", // AFRN1310 wide stage + full room
  "1mTCPzv6FOEb-n6pKgh783cSyPYk1bH7o", // AFRN1259 question from the floor
  "1awB8yieltdJZPvQE5PTagm1uH5FDUKHy", // AFRN1190 speaker close-up
  "1TzZ3NM1MvDw4NP1VXDKviNtxpWD0eqrC", // AFRN1269 crowd, orange wall
  "1AYApyL8JsOOzLKx0Bam7Zgppf1fCm7p6", // AFRN1213 agency talk, slide in view
  "1PnB4qvK_nM-zjOkzQ87ICtSi8XzNSPnN", // AFRN1256 crowd on their feet
  "1_6UqpV962mMumf4dIioKZ9NJWyb1FzVa", // AFRN1261 networking chat
  "1as9Tlr5uFp9yHmfQUbeYushu19gQBbd1", // AFRN1328 keynote, arms wide
  "1IKjh7W3U5bl3h8ZbMtMJEnrxHg5qHERp", // AFRN1193 packed rows
  "1HyNgwujpQ8vwADyH5ft27ifkurONAZrv", // AFRN1250 team development session
  "1IlQ-zsVmHSP4pWTJcpenO24PSogNPpUL", // AFRN1319 phones up, recording
  "1fVJDXMVdrDyWdHYh_pa4cr639Rwyxftg", // AFRN1324 attendees at the ATTENTION letters
  "1kX1zNl4AnINMJ5DBvGfP2A-6Zrpz9dr0", // AFRN1232 speaker mid-gesture
  "1Q1nKD6ZV_i_R3nSpjxegV9CW_mzRBQ07", // AFRN1218 audience in window light
  "1Usf0r08V-8q4ftc-17Et9oXcn0xzeFpP", // AFRN1254 organizers at the banner
  "1aIuX_SCRJB-7YnCy4JOo4HfdaVcBSmu7", // AFRN1307 listeners up close
  "10YpAL3nSU1b6v9iuOsxpi1BaB-0f3bIk", // AFRN1185 the venue
  "1wssDJuEmB1-A2Zbmsmnsn4wxHT9oTCgr", // AFRN1188 backdrop + seated crowd
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
