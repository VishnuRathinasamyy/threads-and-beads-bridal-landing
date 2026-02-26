// ================= GSAP SETUP =================
gsap.registerPlugin(ScrollTrigger);

// ================= SECTION REVEAL =================
gsap.utils.toArray(".section-padding").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        }
    });
});


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});
// ===============================
// FAST LUXURY WEDDING ENTRY
// ===============================

window.addEventListener("load", function () {

    const intro = document.querySelector(".wedding-intro");
    const glow = document.querySelector(".intro-glow");
    const logo = document.querySelector(".intro-logo");

    let tl = gsap.timeline();

    tl.fromTo(glow,
        { scale: 0, opacity: 1 },
        { scale: 6, duration: 1.2, ease: "power3.out" }
    )

    .to(logo, {
        opacity: 1,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.8")

    .to(intro, {
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        onComplete: function () {
            intro.style.display = "none";
        }
    });

});

// ===============================
// GSAP PARTICLE BACKGROUND
// ===============================

// const canvas = document.getElementById("particleCanvas");
// const ctx = canvas.getContext("2d");

// let particles = [];
// const particleCount = 80;

// // Responsive canvas
// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);

// // Particle class
// class Particle {
//     constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.radius = Math.random() * 2 + 1;
//         this.opacity = Math.random() * 0.5 + 0.3;

//         this.draw = () => {
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//             ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
//             ctx.fill();
//         };

//         // GSAP movement animation
//         gsap.to(this, {
//             x: "+=" + (Math.random() * 200 - 100),
//             y: "+=" + (Math.random() * 200 - 100),
//             duration: Math.random() * 10 + 10,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut"
//         });
//     }
// }

// // Create particles
// function initParticles() {
//     particles = [];
//     for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//     }
// }
// initParticles();

// // Animation loop
// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     particles.forEach(p => p.draw());

//     requestAnimationFrame(animate);
// }
// animate();



///////////////////////////////////////////////////////////////////////////////////////////



// const canvas = document.getElementById("particleCanvas");

// if (canvas) {
//   const ctx = canvas.getContext("2d");

//   let particles = [];
//   const particleCount = 80;

//   function resizeCanvas() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//   }
//   resizeCanvas();
//   window.addEventListener("resize", resizeCanvas);

//   class Particle {
//       constructor() {
//           this.x = Math.random() * canvas.width;
//           this.y = Math.random() * canvas.height;
//           this.radius = Math.random() * 2 + 1;
//           this.opacity = Math.random() * 0.5 + 0.3;

//           this.draw = () => {
//               ctx.beginPath();
//               ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//               ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
//               ctx.fill();
//           };

//           gsap.to(this, {
//               x: "+=" + (Math.random() * 200 - 100),
//               y: "+=" + (Math.random() * 200 - 100),
//               duration: Math.random() * 10 + 10,
//               repeat: -1,
//               yoyo: true,
//               ease: "sine.inOut"
//           });
//       }
//   }

//   function initParticles() {
//       particles = [];
//       for (let i = 0; i < particleCount; i++) {
//           particles.push(new Particle());
//       }
//   }
//   initParticles();

//   function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach(p => p.draw());
//       requestAnimationFrame(animate);
//   }
//   animate();
// }

////////////////////////////////////////////
//==============letter typing=============//
////////////////////////////////////////////
// Infinite typing effect every 5 seconds
const textContainer = document.querySelector(".text-content");
const cursor = document.querySelector(".typing-cursor");
const originalText = textContainer.innerText;

let hasStarted = false;

function startTypingLoop() {

    function typeOnce() {

        textContainer.innerHTML = "";
        let letters = originalText.split("").map(letter => {
            let span = document.createElement("span");
            span.innerText = letter;
            span.style.opacity = "0";
            textContainer.appendChild(span);
            return span;
        });

        // Create typing timeline
        let tl = gsap.timeline();

        tl.to(letters, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.08,
            onUpdate: function () {
                const visible = letters.filter(l => l.style.opacity === "1");
                if (visible.length > 0) {
                    visible[visible.length - 1].after(cursor);
                }
            }
        });

        // After typing finishes, wait 5 seconds then repeat
        tl.to({}, {
            duration: 5,
            onComplete: typeOnce
        });
    }

    typeOnce();
}

// Start when 30% visible
ScrollTrigger.create({
    trigger: ".typing-text",
    start: "top 70%",
    onEnter: function () {
        if (!hasStarted) {
            hasStarted = true;
            startTypingLoop();
        }
    }
});

/////////////////////////////////
// FORM TO SOOGLE SHEET SCRIPT //
/////////////////////////////////
const scriptURL = "https://script.google.com/macros/s/AKfycbwS8hBbd5MYveCvCYkFKz6x1JCaWWYBz-u1JROBYDemDAxO_oOGYTE2V64z-SYyHwYv/exec";
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.querySelector('input[name="reference"]');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {

    const data = {
      name: form.name.value,
      phone: form.phone.value,
      product: form.product.value,
      size: form.size.value,
      message: form.message.value,
      file: reader.result
    };

    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {

        const messageBox = document.getElementById("formMessage");
        messageBox.style.display = "block";

        form.reset();

        setTimeout(() => {
          messageBox.style.display = "none";
        }, 4000);

      } else {
        alert("Error: " + data.error);
      }
    })
  };

  reader.readAsDataURL(file);
});


//--============== POPUP ===============--//

const popup = document.getElementById("collectionPopup");
const closeBtn = document.querySelector(".close-popup");
const swiperWrapper = document.querySelector(".mySwiper .swiper-wrapper");
const popupText = document.getElementById("popupText");

let swiperInstance; // important

const collections = {
  lehenga: [
    "images/Bridal lehenga 01.webp",
    "images/Bridal lehenga 05.jpg",
    "images/Bridal lehenga 06.webp",
    "images/Braidal lehenga 07.webp"
  ],
  blouse: [
    "images/Bridal saree 1.webp",
    "images/Bridal saree 3.webp",
    "images/Bridal saree 2.webp",
    "images/Bridal saree 4.webp"
  ],
  customized: [
    "images/customized stitches 02.jpeg"
  ]
};

document.querySelectorAll(".collection-card").forEach(card => {
  card.addEventListener("click", function () {

    const type = this.getAttribute("data-collection");
    if (!type) return;

    swiperWrapper.innerHTML = "";

    collections[type].forEach(img => {
      swiperWrapper.innerHTML += `
        <div class="swiper-slide">
          <img src="${img}" alt="">
          <button class="slide-btn" onclick="goToForm()">Get This Design</button>
        </div>
      `;
    });

    // 🔥 TEXT CHANGE LOGIC
    if (type === "customized") {
      popupText.textContent = "Give your Pinterest reference & we'll create it for you";
    } else {
      popupText.textContent = "Give your reference & we'll create it for you";
    }

    popup.classList.add("active");

    // Destroy previous swiper if exists
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 900,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
    });
  });
});

closeBtn.onclick = () => popup.classList.remove("active");

function goToForm() {
  popup.classList.remove("active");
  document.querySelector("#contactForm").scrollIntoView({
    behavior: "smooth"
  });
}

document.querySelector(".reference-btn").addEventListener("click", function () {
  popup.classList.remove("active");
});



//--============== Testimonial ====================--//

new Swiper(".testimonialSwiper", {

  effect: "coverflow",
  centeredSlides: true,
  loop: true,
  grabCursor: true,
  speed: 1000,

  slidesPerView: 5, 

  coverflowEffect: {
    rotate: 0,
    stretch: -80,
    depth: 300,
    modifier: 1.4,
    slideShadows: false,
  },

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  breakpoints: {

    1200: {
      slidesPerView: 5,
    },

    992: {
      slidesPerView: 3,
    },

    768: {
      slidesPerView: 2,
    },

    0: {
      slidesPerView: 1,
      coverflowEffect: {
        stretch: 0,
        depth: 0,
      }
    }

  }

});