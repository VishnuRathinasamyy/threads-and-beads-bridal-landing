/* =========================================================================
   THREADS & BEADS — GALLERY ENGINE
   Edit js/gallery-data.js to add images or tabs. Nothing here needs changing
   except the SCRIPT_URL below if your Google Apps Script address ever moves.
   ========================================================================= */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwS8hBbd5MYveCvCYkFKz6x1JCaWWYBz-u1JROBYDemDAxO_oOGYTE2V64z-SYyHwYv/exec";

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const BATCH = 20;

/* ---------- tabs and flat image list, built from GALLERY ---------- */
const TABS = [];
if (typeof SHOW_ALL_TAB === "undefined" || SHOW_ALL_TAB) {
  TABS.push({ id: "all", label: "All Designs", icon: "bi-stars" });
}
GALLERY.forEach(c => TABS.push({ id: c.id, label: c.label, icon: c.icon || "bi-dot" }));

const ALL_ITEMS = [];
GALLERY.forEach(cat => {
  (cat.images || []).forEach(line => {
    const parts = line.split("|").map(p => p.trim());
    if (!parts[0]) return;
    ALL_ITEMS.push({
      src: parts[0].includes("/") ? parts[0] : IMAGE_FOLDER + parts[0],
      alt: parts[1] || cat.label,
      category: cat.id,
      label: cat.label
    });
  });
});

let activeCat = TABS[0].id;
let visibleItems = [];
let rendered = 0;
let lbIndex = 0;

const grid = document.getElementById("luxGrid");
const tabsBox = document.getElementById("galleryTabs");
const indicator = document.getElementById("tabIndicator");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const countEl = document.getElementById("gridCount");

/* =========================================================================
   INTRO
   ========================================================================= */
/* ===============================
   INTRO — with an 8 second failsafe
   =============================== */
(function weddingIntro() {
  const intro = document.querySelector(".wedding-intro");
  if (!intro) return;

  const glow = document.querySelector(".intro-glow");
  const logo = document.querySelector(".intro-logo");
  let done = false;

  document.body.classList.add("intro-lock");

  function hide(instant) {
    if (done) return;
    done = true;
    clearTimeout(failsafe);
    document.body.classList.remove("intro-lock");

    if (instant || typeof gsap === "undefined") {
      intro.style.display = "none";
      return;
    }
    gsap.to(intro, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => (intro.style.display = "none")
    });
  }

  function play() {
    if (done) return;

    if (typeof gsap === "undefined") return hide(true);

    gsap.timeline({ onComplete: () => hide(false) })
      .fromTo(glow, { scale: 0, opacity: 1 }, { scale: 6, duration: 1.1, ease: "power3.out" })
      .to(logo, { opacity: 1, scale: 1.05, duration: 0.7, ease: "power2.out" }, "-=0.75")
      .to({}, { duration: 0.15 });
  }

  // hard stop: whatever happens, the overlay is gone by 8 seconds
  const failsafe = setTimeout(() => hide(true), 8000);

  // if the page already finished loading, run now instead of waiting
  if (document.readyState === "complete") play();
  else window.addEventListener("load", play);

  // and don't wait more than 2.5s for slow images before starting anyway
  setTimeout(play, 2500);
})();

/* =========================================================================
   HERO TITLE
   ========================================================================= */
(function splitHero() {
  const el = document.querySelector("[data-split]");
  if (!el) return;
  el.innerHTML = el.textContent
    .trim()
    .split("")
    .map(ch => `<span class="ch">${ch === " " ? "&nbsp;" : ch}</span>`)
    .join("");

  if (REDUCED) return;
  gsap.from(el.querySelectorAll(".ch"), {
    yPercent: 110,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.035,
    delay: 1.4
  });
  gsap.from(".hero-eyebrow, .hero-sub", {
    y: 22,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: "power2.out",
    delay: 1.8
  });
})();

/* =========================================================================
   TABS
   ========================================================================= */
function countFor(id) {
  return id === "all" ? ALL_ITEMS.length : ALL_ITEMS.filter(i => i.category === id).length;
}

function buildTabs() {
  TABS.forEach((tab, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gtab" + (i === 0 ? " active" : "");
    btn.dataset.cat = tab.id;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.innerHTML = `<i class="bi ${tab.icon}"></i><span>${tab.label}</span><em>${countFor(tab.id)}</em>`;
    btn.addEventListener("click", () => selectTab(tab.id, btn));
    tabsBox.appendChild(btn);
  });
  tabsBox.classList.toggle("many", TABS.length > 6);
  requestAnimationFrame(() => moveIndicator(tabsBox.querySelector(".gtab.active"), true));
}

function moveIndicator(btn, instant) {
  if (!btn) return;
  const box = tabsBox.getBoundingClientRect();
  const b = btn.getBoundingClientRect();
  gsap.to(indicator, {
    x: b.left - box.left + tabsBox.scrollLeft,
    y: b.top - box.top,
    width: b.width,
    height: b.height,
    duration: instant || REDUCED ? 0 : 0.45,
    ease: "power3.out"
  });
}

function selectTab(id, btn) {
  if (id === activeCat) return;
  activeCat = id;
  history.replaceState(null, "", id === "all" ? "gallery.html" : "gallery.html?tab=" + id);

  tabsBox.querySelectorAll(".gtab").forEach(b => {
    const on = b === btn;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
  });
  moveIndicator(btn);
  btn.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "nearest", inline: "center" });

  grid.style.opacity = "0";
  grid.style.transition = "opacity .22s ease";
  setTimeout(() => {
    applyFilter();
    grid.style.opacity = "1";
  }, REDUCED ? 0 : 220);
}

/* =========================================================================
   GRID
   ========================================================================= */
function applyFilter() {
  visibleItems = activeCat === "all" ? ALL_ITEMS : ALL_ITEMS.filter(i => i.category === activeCat);
  observer.disconnect();
  grid.innerHTML = "";
  rendered = 0;
  renderBatch();

  const top = document.getElementById("tabsWrap").offsetTop - 80;
  window.scrollTo({ top, behavior: REDUCED ? "auto" : "smooth" });
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* reveal on scroll — one observer for every card, far lighter than a
   scroll listener or a per-card trigger */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = (e.target.dataset.delay || 0) + "ms";
      e.target.classList.add("in");
      observer.unobserve(e.target);
    });
  },
  { rootMargin: "160px 0px", threshold: 0.01 }
);

function renderBatch() {
  const slice = visibleItems.slice(rendered, rendered + BATCH);
  const frag = document.createDocumentFragment();

  slice.forEach((item, i) => {
    const index = rendered + i;
    const card = document.createElement("figure");
    card.className = "lux-card" + (index % 7 === 0 ? " is-tall" : "");
    card.dataset.index = index;
    card.dataset.delay = (i % 4) * 60;
    card.innerHTML = `
      <div class="lux-media">
        <img src="${item.src}" alt="${esc(item.alt)}" loading="lazy" decoding="async" />
      </div>
      <figcaption class="lux-meta">
        <span class="lux-tag">${esc(item.label)}</span>
        <span class="lux-desc">${esc(item.alt)}</span>
        <button type="button" class="lux-btn">Get this dress</button>
      </figcaption>
      <span class="lux-zoom" aria-hidden="true"><i class="bi bi-arrows-fullscreen"></i></span>`;

    const img = card.querySelector("img");
    img.addEventListener("error", () => {
      card.remove();
      updateCount();
    });

    card.addEventListener("click", () => openLightbox(parseInt(card.dataset.index, 10)));
    card.querySelector(".lux-btn").addEventListener("click", e => {
      e.stopPropagation();
      openEnquiry(visibleItems[card.dataset.index]);
    });

    frag.appendChild(card);
    if (REDUCED) card.classList.add("in");
    else observer.observe(card);
  });

  grid.appendChild(frag);
  rendered += slice.length;
  updateCount();
  loadMoreBtn.style.display = rendered >= visibleItems.length ? "none" : "inline-flex";
}

function updateCount() {
  const shown = grid.querySelectorAll(".lux-card").length;
  const tab = TABS.find(t => t.id === activeCat);
  countEl.textContent = `Showing ${shown} of ${visibleItems.length} ${tab.label.toLowerCase()}`;
}

loadMoreBtn.addEventListener("click", () => {
  loadMoreBtn.classList.add("loading");
  requestAnimationFrame(() => {
    renderBatch();
    loadMoreBtn.classList.remove("loading");
  });
});

/* =========================================================================
   LIGHTBOX
   ========================================================================= */
const lb = document.getElementById("luxLightbox");
const lbImage = document.getElementById("lbImage");
const lbText = document.getElementById("lbText");
const lbIndexEl = document.getElementById("lbIndex");

function openLightbox(index) {
  lbIndex = index;
  paintLightbox();
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
  if (REDUCED) return;
  gsap.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 0.28 });
  gsap.fromTo(".lb-stage", { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" });
}

function paintLightbox() {
  const item = visibleItems[lbIndex];
  if (!item) return;
  lbImage.src = item.src;
  lbImage.alt = item.alt;
  lbText.textContent = item.alt;
  lbIndexEl.textContent = `Design ${lbIndex + 1} of ${visibleItems.length}`;
}

function stepLightbox(dir) {
  lbIndex = (lbIndex + dir + visibleItems.length) % visibleItems.length;
  if (REDUCED) return paintLightbox();
  gsap.to(lbImage, {
    opacity: 0,
    duration: 0.15,
    onComplete: () => {
      paintLightbox();
      gsap.fromTo(lbImage, { opacity: 0 }, { opacity: 1, duration: 0.28 });
    }
  });
}

function closeLightbox() {
  document.body.style.overflow = "";
  lb.classList.remove("open");
  lb.style.opacity = "";
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lbNext").addEventListener("click", () => stepLightbox(1));
document.getElementById("lbEnquire").addEventListener("click", () => {
  const item = visibleItems[lbIndex];
  closeLightbox();
  openEnquiry(item);
});
lb.addEventListener("click", e => {
  if (e.target === lb) closeLightbox();
});

let touchX = 0;
lb.addEventListener("touchstart", e => (touchX = e.changedTouches[0].clientX), { passive: true });
lb.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 55) stepLightbox(dx < 0 ? 1 : -1);
}, { passive: true });

/* =========================================================================
   ENQUIRY POPUP — posts to the same Google Sheet as the home page form
   ========================================================================= */
const enqOverlay = document.getElementById("enqOverlay");
const enqForm = document.getElementById("enquiryForm");
const enqProduct = document.getElementById("enqProduct");
const enqRef = document.getElementById("enqRef");
const enqDesign = document.getElementById("enqDesign");
const enqError = document.getElementById("enqError");
const enqSubmit = document.getElementById("enqSubmit");
const enqSuccess = document.getElementById("enqSuccess");

// fill the product dropdown from the tabs, so it always matches your categories
GALLERY.forEach(cat => {
  const o = document.createElement("option");
  o.value = cat.label;
  o.textContent = cat.label;
  enqProduct.appendChild(o);
});
const otherOpt = document.createElement("option");
otherOpt.value = "Other";
otherOpt.textContent = "Other";
enqProduct.appendChild(otherOpt);

function openEnquiry(item) {
  enqForm.style.display = "";
  enqSuccess.classList.remove("show");
  enqError.textContent = "";

  if (item && item.src) {
    const file = item.src.split("/").pop();
    enqDesign.value = file;
    enqRef.textContent = item.alt;
    const match = Array.from(enqProduct.options).find(o => o.value === item.label);
    enqProduct.value = match ? item.label : "Other";
  } else {
    enqDesign.value = "";
    enqRef.textContent = "Tell us what you would like made and we will call you back.";
    enqProduct.value = "";
  }

  enqOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  if (!REDUCED) {
    gsap.fromTo(".enq-box", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
  }
}

function closeEnquiry() {
  enqOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("enqClose").addEventListener("click", closeEnquiry);
enqOverlay.addEventListener("click", e => {
  if (e.target === enqOverlay) closeEnquiry();
});
document.querySelectorAll("[data-enquire]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    openEnquiry(null);
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (enqOverlay.classList.contains("open")) closeEnquiry();
    else if (lb.classList.contains("open")) closeLightbox();
  }
  if (!lb.classList.contains("open")) return;
  if (e.key === "ArrowRight") stepLightbox(1);
  if (e.key === "ArrowLeft") stepLightbox(-1);
});

enqForm.addEventListener("submit", function (e) {
  e.preventDefault();
  enqError.textContent = "";

  const name = enqForm.name.value.trim();
  const phone = enqForm.phone.value.trim();
  const product = enqForm.product.value;
  const size = enqForm.size.value.trim();

  if (!name || !phone || !product || !size) {
    enqError.textContent = "Please fill your name, phone, product and size.";
    return;
  }
  if (!/^[0-9+\-\s]{8,15}$/.test(phone)) {
    enqError.textContent = "Please enter a valid phone number.";
    return;
  }

  // the design reference travels inside the message, so your Apps Script
  // needs no changes at all
  const note = enqForm.message.value.trim();
  const design = enqDesign.value
    ? `Design: ${enqDesign.value}${note ? " — " + note : ""}`
    : note;

  const file = document.getElementById("enqReference").files[0];

  enqSubmit.disabled = true;
  enqSubmit.textContent = "Sending...";

  const send = fileData => {
    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        phone: phone,
        product: product,
        size: size,
        message: design,
        file: fileData || ""
      })
    })
      .then(r => r.json())
      .then(res => {
        if (res.result === "success") {
          enqForm.style.display = "none";
          enqSuccess.classList.add("show");
          enqForm.reset();
          setTimeout(closeEnquiry, 2600);
        } else {
          enqError.textContent = "Something went wrong. Please call us on 9944943614.";
        }
      })
      .catch(() => {
        enqError.textContent = "Network problem. Please check your connection and try again.";
      })
      .finally(() => {
        enqSubmit.disabled = false;
        enqSubmit.textContent = "Submit";
      });
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => send(reader.result);
    reader.onerror = () => {
      enqError.textContent = "That file could not be read. Try a different one.";
      enqSubmit.disabled = false;
      enqSubmit.textContent = "Submit";
    };
    reader.readAsDataURL(file);
  } else {
    send("");
  }
});

/* =========================================================================
   SCROLL — one rAF-throttled listener for the whole page
   ========================================================================= */
const bar = document.getElementById("goldProgressBar");
const tabsWrap = document.getElementById("tabsWrap");
let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / (h || 1)) * 100 + "%";
      tabsWrap.classList.toggle("stuck", window.scrollY > 200);
      ticking = false;
    });
  },
  { passive: true }
);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => moveIndicator(tabsBox.querySelector(".gtab.active"), true), 120);
});

/* =========================================================================
   GO — opens on the tab named in the link, e.g. gallery.html?tab=kurtis
   ========================================================================= */
buildTabs();

(function openRequestedTab() {
  const wanted =
    new URLSearchParams(window.location.search).get("tab") ||
    window.location.hash.replace("#", "");

  if (wanted && TABS.some(t => t.id === wanted)) {
    activeCat = wanted;
    tabsBox.querySelectorAll(".gtab").forEach(b => {
      const on = b.dataset.cat === wanted;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    const btn = tabsBox.querySelector('.gtab[data-cat="' + wanted + '"]');
    requestAnimationFrame(() => {
      moveIndicator(btn, true);
      btn.scrollIntoView({ block: "nearest", inline: "center" });
    });
  }
})();

visibleItems = activeCat === "all" ? ALL_ITEMS : ALL_ITEMS.filter(i => i.category === activeCat);
renderBatch();
