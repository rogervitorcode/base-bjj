const isMobile = window.matchMedia("(max-width: 768px)").matches;

/* =====================================================
   NAVBAR SHRINK (IGUAL AO DESKTOP)
   ===================================================== */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

/* =====================================================
   INTERSECTION ANIMATIONS (DESKTOP ONLY)
   ===================================================== */
if (!isMobile) {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  document
    .querySelectorAll(".stat-card, .about-text, .benefit-card, .plan-card")
    .forEach(el => observer.observe(el));

}

/* =====================================================
   COUNTERS (DESKTOP ONLY – evita bug visual no mobile)
   ===================================================== */
if (!isMobile) {

  const counters = document.querySelectorAll(".stat-number");

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const increment = Math.ceil(target / 60);

      const update = () => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
        } else {
          el.textContent = current;
          requestAnimationFrame(update);
        }
      };

      update();
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => countObserver.observe(counter));
}

/* =====================================================
   INTRO SCREEN (OK EM TODOS)
   ===================================================== */
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.querySelector(".intro-screen");
    if (intro) intro.classList.add("hide");
  }, 1800);
});

/* =====================================================
   CANVAS BACKGROUND (MANTIDO EM TODOS)
   ===================================================== */
const canvas = document.getElementById("bg-canvas");

if (canvas) {

  const ctx = canvas.getContext("2d");
  let w, h, t = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  function noise(x, y) {
    return Math.sin(x * 0.002 + t) * Math.cos(y * 0.002 + t);
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    for (let y = 0; y < h; y += 4) {
      for (let x = 0; x < w; x += 4) {
        const n = noise(x, y);
        const alpha = (n + 1) * 0.015;

        ctx.fillStyle = `rgba(201,162,77,${alpha})`;
        ctx.fillRect(x, y, 4, 4);
      }
    }

    t += 0.003;
    requestAnimationFrame(animate);
  }

  animate();
}
