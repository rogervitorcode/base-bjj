const isMobile = window.matchMedia("(max-width: 768px)").matches;

/* =====================================================
   NAVBAR SHRINK (IGUAL AO DESKTOP ATUAL)
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
   ANIMAÇÕES DE ENTRADA (DESKTOP ONLY)
   ===================================================== */
if (!isMobile) {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  document.querySelectorAll(
    ".stat-card, .about-text, .benefit-card, .plan-card"
  ).forEach(el => observer.observe(el));

}

/* =====================================================
   PROTEÇÕES MOBILE (SEM ALTERAR HTML)
   ===================================================== */
if (isMobile) {

  /* Remove qualquer transform quebrado */
  document.querySelectorAll("*").forEach(el => {
    el.style.transform = "none";
  });

  /* Evita bugs de scroll horizontal */
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";

}
