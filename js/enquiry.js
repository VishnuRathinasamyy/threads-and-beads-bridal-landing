/* =========================================================================
   THREADS & BEADS — ENQUIRY POPUP (home page)

   Builds its own markup, so there is no HTML to paste. To open it from any
   link or button anywhere on the page, add data-enquire to that element:

        <a href="#" class="footer-btn" data-enquire>Get estimate</a>

   Posts to the same Google Apps Script as your existing form, using the
   same field names, so your sheet needs no changes.

   Do NOT load this file on gallery.html — that page has its own popup.
   ========================================================================= */

(function () {
  "use strict";

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwS8hBbd5MYveCvCYkFKz6x1JCaWWYBz-u1JROBYDemDAxO_oOGYTE2V64z-SYyHwYv/exec";

  // options for the product dropdown — edit freely
  const PRODUCTS = [
    "Bridal Lehenga",
    "Bridal Blouses",
    "Blouses",
    "Kurtis",
    "Accessories",
    "Blazers",
    "Embroideries",
    "Other"
  ];

  const overlay = document.createElement("div");
  overlay.className = "enq-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <div class="enq-box">
      <button class="enq-close" type="button" aria-label="Close form">&times;</button>

      <div class="enq-head">
        <h2 class="enq-title">Get an estimate</h2>
        <p class="enq-ref">Tell us what you would like made and we will call you back.</p>
      </div>

      <form class="enq-form" novalidate>
        <div class="form-group">
          <input type="text" name="name" class="enq-input" placeholder="Your Name" required />
        </div>
        <div class="form-group">
          <input type="tel" name="phone" class="enq-input" placeholder="Phone Number" required />
        </div>
        <div class="form-group">
          <select name="product" class="enq-input" title="Products" required>
            <option value="" disabled selected>Select Product</option>
            ${PRODUCTS.map(p => `<option value="${p}">${p}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <input type="text" name="size" class="enq-input" placeholder="Size" required />
        </div>
        <div class="form-group">
          <textarea name="message" class="enq-input" rows="3" placeholder="Your Message"></textarea>
        </div>
        <div class="form-group">
          <label class="label" for="enqHomeFile">Upload your reference <span class="opt">(optional)</span></label>
          <input type="file" name="reference" id="enqHomeFile" class="enq-input" accept="image/*,.pdf" />
        </div>

        <p class="enq-error"></p>
        <button type="submit" class="enq-submit">Submit</button>
      </form>

      <div class="enq-success">
        <i class="bi bi-check-circle"></i>
        <p>Your enquiry has been sent. We will call you shortly.</p>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  const box = overlay.querySelector(".enq-box");
  const form = overlay.querySelector(".enq-form");
  const errorEl = overlay.querySelector(".enq-error");
  const submitBtn = overlay.querySelector(".enq-submit");
  const successEl = overlay.querySelector(".enq-success");
  const refEl = overlay.querySelector(".enq-ref");
  const titleEl = overlay.querySelector(".enq-title");
  const fileEl = overlay.querySelector("#enqHomeFile");

  let lastFocused = null;

  function open(trigger) {
    lastFocused = trigger || document.activeElement;

    form.style.display = "";
    successEl.classList.remove("show");
    errorEl.textContent = "";

    // a trigger can set its own wording, e.g. data-title="Book your design"
    if (trigger && trigger.dataset.title) titleEl.textContent = trigger.dataset.title;
    if (trigger && trigger.dataset.design) {
      refEl.textContent = trigger.dataset.design;
      form.dataset.design = trigger.dataset.design;
    } else {
      refEl.textContent = "Tell us what you would like made and we will call you back.";
      delete form.dataset.design;
    }
    if (trigger && trigger.dataset.product) {
      const opt = Array.from(form.product.options).find(o => o.value === trigger.dataset.product);
      if (opt) form.product.value = trigger.dataset.product;
    }

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => form.name.focus(), 60);
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  overlay.querySelector(".enq-close").addEventListener("click", close);
  overlay.addEventListener("click", e => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("open")) close();
  });

  // keep tab focus inside the popup while it is open
  box.addEventListener("keydown", e => {
    if (e.key !== "Tab") return;
    const items = box.querySelectorAll("button, input, select, textarea, a[href]");
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // wire every trigger on the page
  document.querySelectorAll("[data-enquire]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      open(el);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.textContent = "";

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const product = form.product.value;
    const size = form.size.value.trim();

    if (!name || !phone || !product || !size) {
      errorEl.textContent = "Please fill your name, phone, product and size.";
      return;
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(phone)) {
      errorEl.textContent = "Please enter a valid phone number.";
      return;
    }

    const note = form.message.value.trim();
    const message = form.dataset.design
      ? `${form.dataset.design}${note ? " — " + note : ""}`
      : note;

    const file = fileEl.files[0];

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const send = fileData => {
      fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          phone: phone,
          product: product,
          size: size,
          message: message,
          file: fileData || ""
        })
      })
        .then(r => r.json())
        .then(res => {
          if (res.result === "success") {
            form.style.display = "none";
            successEl.classList.add("show");
            form.reset();
            setTimeout(close, 2600);
          } else {
            errorEl.textContent = "Something went wrong. Please call us on 9944943614.";
          }
        })
        .catch(() => {
          errorEl.textContent = "Network problem. Please check your connection and try again.";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
        });
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => send(reader.result);
      reader.onerror = () => {
        errorEl.textContent = "That file could not be read. Try a different one.";
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      };
      reader.readAsDataURL(file);
    } else {
      send("");
    }
  });
})();
