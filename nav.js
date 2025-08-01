// Wait until nav is loaded, since it's injected dynamically
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('responsiveNav');

  if (!hamburger || !nav) return;

  // Always start collapsed (for mobile)
  nav.classList.add('collapsed');
  nav.classList.remove('expanded');

  function toggleAccordion() {
    if (nav.classList.contains('expanded')) {
      nav.classList.remove('expanded');
      nav.classList.add('collapsed');
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      nav.classList.add('expanded');
      nav.classList.remove('collapsed');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleAccordion();
  });

  // Optional: Close menu if user clicks outside (on mobile)
  document.addEventListener('click', function(e) {
    if (
      nav.classList.contains('expanded') &&
      !nav.contains(e.target) &&
      e.target !== hamburger
    ) {
      nav.classList.remove('expanded');
      nav.classList.add('collapsed');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // ESC closes accordion
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape" && nav.classList.contains('expanded')) {
      nav.classList.remove('expanded');
      nav.classList.add('collapsed');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});
