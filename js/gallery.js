/* =========================================================================
   THREADS & BEADS — GALLERY ENGINE
   Edit js/gallery-data.js to add images, views or tabs.
   ========================================================================= */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwS8hBbd5MYveCvCYkFKz6x1JCaWWYBz-u1JROBYDemDAxO_oOGYTE2V64z-SYyHwYv/exec";

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const BATCH = 16;

/* -------------------------------------------------------------------------
   Build tabs and the product list.
   A plain string is a one-view product. An array is a multi-view product,
   with the first entry as the main photo.
   ------------------------------------------------------------------------- */
const TABS = [];
if (typeof SHOW_ALL_TAB === "undefined" || SHOW_ALL_TAB) {
  TABS.push({ id: "all", label: "All Designs", icon: "bi-stars" });
}
GALLERY.forEach(c => TABS.push({ id: c.id, label: c.label, icon: c.icon || "bi-dot" }));

function parseView(line) {
  const parts = String(line).split("|").map(p => p.trim());
  if (!parts[0]) return null;
  return {
    src: parts[0].includes("/") ? parts[0] : IMAGE_FOLDER + parts[0],
    alt: parts[1] || ""
  };
}

const PRODUCTS = [];
GALLERY.forEach(cat => {
  (cat.images || []).forEach(entry => {
    const lines = Array.isArray(entry) ? entry : [entry];
    const views = lines.map(parseView).filter(Boolean);
    if (!views.length) return;
    views.forEach(v => {
      if (!v.alt) v.alt = cat.label;
    });
    PRODUCTS.push({ views: views, category: cat.id, label: cat.label, cta: cat.cta || "Get this dress" });
  });
});

let activeCat = TABS[0].id;
let visible = [];
let rendered = 0;
let loading = false;

const grid = document.getElementById("luxGrid");
const tabsBox = document.getElementById("galleryTabs");
const indicator = document.getElementById("tabIndicator");
const countEl = document.getElementById("gridCount");
const sentinel = document.getElementById("gridSentinel");
const endEl = document.getElementById("gridEnd");

/* =========================================================================
   INTRO — with an 8 second failsafe
   ========================================================================= */
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
    gsap.to(intro, { opacity: 0, duration: 0.5, onComplete: () => (intro.style.display = "none") });
  }

  function play() {
    if (done) return;
    if (typeof gsap === "undefined") return hide(true);
    gsap.timeline({ onComplete: () => hide(false) })
      .fromTo(glow, { scale: 0, opacity: 1 }, { scale: 6, duration: 1.1, ease: "power3.out" })
      .to(logo, { opacity: 1, scale: 1.05, duration: 0.7, ease: "power2.out" }, "-=0.75")
      .to({}, { duration: 0.15 });
  }

  const failsafe = setTimeout(() => hide(true), 8000);
  if (document.readyState === "complete") play();
  else window.addEventListener("load", play);
  setTimeout(play, 2500);
})();

/* =========================================================================
   HERO TITLE
   ========================================================================= */
(function splitHero() {
  const el = document.querySelector("[data-split]");
  if (!el) return;
  el.innerHTML = el.textContent.trim().split("")
    .map(ch => `<span class="ch">${ch === " " ? "&nbsp;" : ch}</span>`).join("");
  if (REDUCED || typeof gsap === "undefined") return;
  gsap.from(el.querySelectorAll(".ch"), {
    yPercent: 110, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.035, delay: 1.4
  });
  gsap.from(".hero-eyebrow, .hero-sub", {
    y: 22, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", delay: 1.8
  });
})();

/* =========================================================================
   TABS
   ========================================================================= */
function countFor(id) {
  return id === "all" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === id).length;
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
  if (!btn || typeof gsap === "undefined") return;
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

  grid.style.transition = "opacity .22s ease";
  grid.style.opacity = "0";
  setTimeout(() => {
    applyFilter();
    grid.style.opacity = "1";
  }, REDUCED ? 0 : 220);
}

/* =========================================================================
   GRID
   ========================================================================= */
function applyFilter() {
  visible = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);
  revealer.disconnect();
  grid.innerHTML = "";
  rendered = 0;
  endEl.classList.remove("show");
  sentinel.classList.remove("done");
  renderBatch();
  window.scrollTo({
    top: document.getElementById("tabsWrap").offsetTop - 80,
    behavior: REDUCED ? "auto" : "smooth"
  });
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const revealer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.style.transitionDelay = (e.target.dataset.delay || 0) + "ms";
    e.target.classList.add("in");
    revealer.unobserve(e.target);
  });
}, { rootMargin: "160px 0px", threshold: 0.01 });

function renderBatch() {
  const slice = visible.slice(rendered, rendered + BATCH);
  const frag = document.createDocumentFragment();

  slice.forEach((product, i) => {
    const index = rendered + i;
    const main = product.views[0];
    const extra = product.views.length - 1;

    const card = document.createElement("figure");
    card.className = "lux-card" + (index % 7 === 0 ? " is-tall" : "");
    card.dataset.index = index;
    card.dataset.delay = (i % 4) * 60;
    card.innerHTML = `
      <div class="lux-media">
        <img src="${main.src}" alt="${esc(main.alt)}"
             loading="${index < 8 ? "eager" : "lazy"}" decoding="async" />
      </div>
      ${extra > 0 ? `<span class="lux-views"><i class="bi bi-images"></i>${extra + 1} views</span>` : ""}
      <figcaption class="lux-meta">
        <span class="lux-tag">${esc(product.label)}</span>
        <span class="lux-desc">${esc(main.alt)}</span>
        <button type="button" class="lux-btn">${esc(product.cta)}</button>
      </figcaption>`;

    card.querySelector("img").addEventListener("error", () => {
      card.remove();
      updateCount();
    });
    card.addEventListener("click", () => openViewer(parseInt(card.dataset.index, 10)));
    card.querySelector(".lux-btn").addEventListener("click", e => {
      e.stopPropagation();
      openEnquiry(visible[card.dataset.index], 0);
    });

    frag.appendChild(card);
    if (REDUCED) card.classList.add("in");
    else revealer.observe(card);
  });

  grid.appendChild(frag);
  rendered += slice.length;
  updateCount();

  const finished = rendered >= visible.length;
  sentinel.classList.toggle("done", finished);
  endEl.classList.toggle("show", finished && visible.length > BATCH);
}

function updateCount() {
  const shown = grid.querySelectorAll(".lux-card").length;
  const tab = TABS.find(t => t.id === activeCat);
  countEl.textContent = `Showing ${shown} of ${visible.length} ${tab.label.toLowerCase()}`;
}

/* auto-load: when the sentinel scrolls into view, render the next batch */
const autoLoader = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || loading) return;
  if (rendered >= visible.length) return;
  loading = true;
  requestAnimationFrame(() => {
    renderBatch();
    loading = false;
  });
}, { rootMargin: "500px 0px" });
autoLoader.observe(sentinel);

/* =========================================================================
   VIEWER — big image, thumbnails, hover to preview, click to keep
   ========================================================================= */
const viewer = document.getElementById("luxViewer");
const vwImage = document.getElementById("vwImage");
const vwStage = document.querySelector(".vw-stage");
const vwThumbs = document.getElementById("vwThumbs");
const vwText = document.getElementById("vwText");
const vwIndexEl = document.getElementById("vwIndex");

let pIndex = 0; // which product
let vIndex = 0; // which view of that product is chosen

function openViewer(index) {
  pIndex = index;
  vIndex = 0;
  paintProduct();
  viewer.classList.add("open");
  document.body.style.overflow = "hidden";
  if (REDUCED || typeof gsap === "undefined") return;
  gsap.fromTo(viewer, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  gsap.fromTo(".vw-inner", { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
}

function closeViewer() {
  viewer.classList.remove("open");
  viewer.style.opacity = "";
  document.body.style.overflow = "";
}

/* draws the whole product: main image + thumbnail strip */
function paintProduct() {
  const product = visible[pIndex];
  document.getElementById("vwEnquire").textContent = product.cta;
  if (!product) return;

  showView(vIndex);
  vwIndexEl.textContent = `Design ${pIndex + 1} of ${visible.length}`;

  vwThumbs.innerHTML = "";
  if (product.views.length < 2) return;

  product.views.forEach((view, i) => {
    const t = document.createElement("button");
    t.type = "button";
    t.className = "vw-thumb" + (i === vIndex ? " active" : "");
    t.setAttribute("aria-label", "View " + (i + 1));
    t.innerHTML = `<img src="${view.src}" alt="" loading="lazy" decoding="async" />`;

    // hover shows it in the big frame, without committing
    t.addEventListener("mouseenter", () => previewView(i));
    t.addEventListener("mouseleave", () => previewView(vIndex));
    // click keeps it
    t.addEventListener("click", () => {
      vIndex = i;
      showView(i);
      vwThumbs.querySelectorAll(".vw-thumb").forEach((el, n) => el.classList.toggle("active", n === i));
    });

    vwThumbs.appendChild(t);
  });
}

/* swaps the big image without changing which thumb is marked active */
function previewView(i) {
  const view = visible[pIndex] && visible[pIndex].views[i];
  if (!view || vwImage.getAttribute("src") === view.src) return;
  vwImage.src = view.src;
  vwImage.alt = view.alt;
  vwText.textContent = view.alt;
}

function showView(i) {
  const view = visible[pIndex] && visible[pIndex].views[i];
  if (!view) return;
  vwStage.classList.add("swapping");
  const img = new Image();
  img.onload = img.onerror = () => {
    vwImage.src = view.src;
    vwImage.alt = view.alt;
    vwText.textContent = view.alt;
    vwStage.classList.remove("swapping");
  };
  img.src = view.src;
}

/* arrows move product to product, not view to view */
function stepProduct(dir) {
  pIndex = (pIndex + dir + visible.length) % visible.length;
  vIndex = 0;
  paintProduct();
}

document.getElementById("vwClose").addEventListener("click", closeViewer);
document.getElementById("vwPrev").addEventListener("click", () => stepProduct(-1));
document.getElementById("vwNext").addEventListener("click", () => stepProduct(1));
document.getElementById("vwEnquire").addEventListener("click", () => {
  const product = visible[pIndex];
  const view = vIndex;
  closeViewer();
  openEnquiry(product, view);
});
viewer.addEventListener("click", e => {
  if (e.target === viewer || e.target === vwStage) closeViewer();
});

let touchX = 0;
viewer.addEventListener("touchstart", e => (touchX = e.changedTouches[0].clientX), { passive: true });
viewer.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 55) stepProduct(dx < 0 ? 1 : -1);
}, { passive: true });

/* =========================================================================
   ENQUIRY POPUP
   ========================================================================= */
const enqOverlay = document.getElementById("enqOverlay");
const enqForm = document.getElementById("enquiryForm");
const enqProduct = document.getElementById("enqProduct");
const enqRef = document.getElementById("enqRef");
const enqDesign = document.getElementById("enqDesign");
const enqError = document.getElementById("enqError");
const enqSubmit = document.getElementById("enqSubmit");
const enqSuccess = document.getElementById("enqSuccess");

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

function openEnquiry(product, viewIdx) {
  enqForm.style.display = "";
  enqSuccess.classList.remove("show");
  enqError.textContent = "";

  if (product) {
    const view = product.views[viewIdx || 0];
    enqDesign.value = view.src.split("/").pop();
    enqRef.textContent = view.alt;
    const match = Array.from(enqProduct.options).find(o => o.value === product.label);
    enqProduct.value = match ? product.label : "Other";
  } else {
    enqDesign.value = "";
    enqRef.textContent = "Tell us what you would like made and we will call you back.";
    enqProduct.value = "";
  }

  enqOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  if (!REDUCED && typeof gsap !== "undefined") {
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
    openEnquiry(null, 0);
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (enqOverlay.classList.contains("open")) return closeEnquiry();
    if (viewer.classList.contains("open")) return closeViewer();
  }
  if (!viewer.classList.contains("open")) return;
  if (e.key === "ArrowRight") stepProduct(1);
  if (e.key === "ArrowLeft") stepProduct(-1);
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

  const note = enqForm.message.value.trim();
  const message = enqDesign.value
    ? `Design: ${enqDesign.value}${note ? " — " + note : ""}`
    : note;

  const file = document.getElementById("enqReference").files[0];

  enqSubmit.disabled = true;
  enqSubmit.textContent = "Sending...";

  const send = fileData => {
    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ name, phone, product, size, message, file: fileData || "" })
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
   SCROLL
   ========================================================================= */
const bar = document.getElementById("goldProgressBar");
const tabsWrap = document.getElementById("tabsWrap");
let ticking = false;

window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / (h || 1)) * 100 + "%";
    tabsWrap.classList.toggle("stuck", window.scrollY > 200);
    ticking = false;
  });
}, { passive: true });

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

visible = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);
renderBatch();
