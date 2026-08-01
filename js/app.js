/* ============================================================
   THE SEO EVENT · interactions
   Vanilla JS, no dependencies. Shared across all pages.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Paste your Google Apps Script Web App URL here (see DEPLOY.md) ---- */
  const SHEET_ENDPOINT = ""; // e.g. "https://script.google.com/macros/s/AKfy.../exec"

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    yearStamp();
    nav();
    revealOnScroll();
    counters();
    marquees();
    buildGallery();
    signup();
    stickyBar();
  }

  /* ---------- Footer year ---------- */
  function yearStamp() {
    $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- Nav ---------- */
  function nav() {
    const bar = $(".nav");
    const toggle = $(".nav-toggle");
    const links = $(".nav-links");
    if (bar) {
      const onScroll = () => bar.classList.toggle("scrolled", window.scrollY > 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (toggle && links) {
      const close = () => { links.classList.remove("open"); toggle.classList.remove("open"); document.body.style.overflow = ""; };
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
      $$("a", links).forEach(a => a.addEventListener("click", close));
      document.addEventListener("keydown", e => e.key === "Escape" && close());
    }
  }

  /* ---------- Reveal ---------- */
  function revealOnScroll() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(i => i.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(i => io.observe(i));
  }

  /* ---------- Animated counters ---------- */
  function counters() {
    const nums = $$("[data-count]");
    if (!nums.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dur = 1500, t0 = performance.now();
      const fmt = (n) => Number.isInteger(target) ? Math.round(n).toLocaleString() : n.toFixed(1);
      if (reduced) { el.firstChild ? (el.childNodes[0].nodeValue = fmt(target)) : (el.textContent = fmt(target)); return; }
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setLead(el, fmt(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    // write into the text node before any <span class="suf">
    const setLead = (el, val) => {
      if (el.childNodes.length && el.childNodes[0].nodeType === 3) el.childNodes[0].nodeValue = val;
      else el.insertBefore(document.createTextNode(val), el.firstChild);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(n => io.observe(n));
  }

  /* ---------- Marquees (seamless loop) ---------- */
  function marquees() {
    $$(".marquee-track").forEach(track => {
      track.innerHTML += track.innerHTML; // duplicate for -50% loop
    });
  }

  /* ---------- Gallery + Lightbox ---------- */
  function buildGallery() {
    const grid = $("#gallery-grid");
    if (!grid || typeof GALLERY === "undefined") return;

    GALLERY.forEach((id, i) => {
      const fig = document.createElement("figure");
      fig.className = "shot";
      fig.dataset.index = i;
      fig.tabIndex = 0;
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", `Open photo ${i + 1} of ${GALLERY.length}`);
      const img = new Image();
      img.loading = "lazy";
      img.alt = `The SEO Event · Dhaka 2024 · photo ${i + 1}`;
      img.src = buildSrc(id, 700);
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.addEventListener("error", () => {
        if (!img.dataset.alt) { img.dataset.alt = "1"; img.src = buildSrcAlt(id, 700); }
      });
      const cap = document.createElement("figcaption");
      cap.className = "cap";
      cap.textContent = `IMG · 2024`;
      fig.append(img, cap);
      fig.addEventListener("click", () => openLB(i));
      fig.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLB(i); } });
      grid.appendChild(fig);
    });

    lightbox();
  }

  let lbState = { i: 0 };
  function lightbox() {
    const lb = $("#lightbox");
    if (!lb) return;
    const imgEl = $(".lb-img", lb);
    const countEl = $(".lb-count", lb);

    window.openLB = (i) => {
      lbState.i = i;
      lbState.trigger = document.activeElement;
      show();
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const c = $(".lb-close", lb); if (c) c.focus();
    };
    const close = () => {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lbState.trigger && lbState.trigger.focus) lbState.trigger.focus();
    };
    const show = () => {
      const id = GALLERY[lbState.i];
      imgEl.src = buildSrc(id, 1600);
      imgEl.onerror = () => { imgEl.src = buildSrcAlt(id, 1600); };
      if (countEl) countEl.textContent = `${lbState.i + 1} / ${GALLERY.length}`;
    };
    const go = (d) => { lbState.i = (lbState.i + d + GALLERY.length) % GALLERY.length; show(); };

    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", () => go(-1));
    $(".lb-next", lb).addEventListener("click", () => go(1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    });
  }

  /* ---------- Signup forms -> Google Sheet ---------- */
  const STICKY_KEY = "seoevent_sticky_dismissed";

  function signup() {
    $$("#signup-form, #sticky-form").forEach(bindSignup);
  }
  function bindSignup(form) {
    const msg = $(".form-msg", form);
    const btn = $("button[type=submit]", form);
    const isSticky = form.id === "sticky-form";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const email = (data.get("email") || "").toString().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return setMsg(msg, "Please enter a valid email address.", "err");
      }
      data.append("source", "theseoevent.com");
      data.append("ts", new Date().toISOString());

      const done = () => { if (isSticky) { try { localStorage.setItem(STICKY_KEY, "1"); } catch (_) {} } };

      if (!SHEET_ENDPOINT) {
        // Not wired yet. Fail gracefully so the UI still responds.
        console.warn("Signup not saving: set SHEET_ENDPOINT in js/app.js (see DEPLOY.md).");
        setMsg(msg, "You're on the list. We'll email you about the next one.", "ok");
        form.reset(); done();
        return;
      }

      const original = btn.textContent;
      btn.textContent = "Sending…"; btn.disabled = true;
      try {
        await fetch(SHEET_ENDPOINT, { method: "POST", body: data, mode: "no-cors" });
        setMsg(msg, "You're in. We'll email you when the next one drops.", "ok");
        form.reset(); done();
      } catch (err) {
        setMsg(msg, "Something went wrong. Try again in a moment.", "err");
      } finally {
        btn.textContent = original; btn.disabled = false;
      }
    });
  }

  /* ---------- Sticky signup bar ---------- */
  function stickyBar() {
    const bar = $("#stickyBar");
    if (!bar) return;
    let killed = false;
    try { killed = localStorage.getItem(STICKY_KEY) === "1"; } catch (_) {}
    if (killed) return;

    const closeBtn = $("#sbClose", bar);
    const cta = $("#signup");
    let ctaVisible = false;
    let shown = false;
    let hideTimer = null;
    let io = null;

    const show = () => {
      if (shown || killed) return;
      shown = true;
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      bar.hidden = false;
      requestAnimationFrame(() => bar.classList.add("show"));
    };
    const hide = () => {
      if (!shown) return;
      shown = false;
      bar.classList.remove("show");
      hideTimer = setTimeout(() => { if (!shown) bar.hidden = true; }, 320); // remove from tab order once off-screen
    };
    const update = () => {
      if (killed) return;
      const past = window.scrollY > window.innerHeight * 0.9;
      if (past && !ctaVisible) show(); else hide();
    };

    if (cta && "IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => { ctaVisible = entries[0].isIntersecting; update(); }, { threshold: 0 });
      io.observe(cta);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();

    const dismiss = () => {
      killed = true;
      shown = false;
      bar.classList.remove("show");
      try { localStorage.setItem(STICKY_KEY, "1"); } catch (_) {}
      window.removeEventListener("scroll", update);
      if (io) io.disconnect();
      setTimeout(() => { bar.hidden = true; }, 320);
    };
    if (closeBtn) closeBtn.addEventListener("click", dismiss);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && shown) dismiss(); });
  }
  function setMsg(el, text, kind) {
    if (!el) return;
    el.textContent = text;
    el.className = "form-msg " + (kind || "");
  }
})();
