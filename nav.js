document.addEventListener('DOMContentLoaded', function() {
  const cta = document.getElementById('navMobileCTA');
  const nav = document.getElementById('responsiveNav');

  if (!cta || !nav) return;

  // Always start collapsed on mobile
  nav.classList.remove('expanded');
  nav.classList.add('collapsed');
  cta.setAttribute('aria-expanded', 'false');

  function toggleAccordion() {
    nav.classList.toggle('expanded');
    nav.classList.toggle('collapsed');
    cta.setAttribute('aria-expanded', nav.classList.contains('expanded') ? 'true' : 'false');
  }

  cta.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleAccordion();
  });
  cta.addEventListener('keydown', function(e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleAccordion();
    }
  });

  // Optional: close nav if click outside (mobile)
  document.addEventListener('click', function(e) {
    if (
      window.innerWidth <= 1110 &&
      nav.classList.contains('expanded') &&
      !nav.contains(e.target) &&
      e.target !== cta
    ) {
      nav.classList.remove('expanded');
      nav.classList.add('collapsed');
      cta.setAttribute('aria-expanded', 'false');
    }
  });
  // ESC closes accordion
  document.addEventListener('keydown', function(e) {
    if (
      (e.key === "Escape" || e.key === "Esc") &&
      nav.classList.contains('expanded')
    ) {
      nav.classList.remove('expanded');
      nav.classList.add('collapsed');
      cta.setAttribute('aria-expanded', 'false');
    }
  });
});
