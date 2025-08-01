document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('responsiveNav');
  const navDrawer = document.querySelector('.nav-drawer');

  function closeDrawer() {
    nav.classList.remove('expanded');
    nav.classList.add('collapsed');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function openDrawer() {
    nav.classList.add('expanded');
    nav.classList.remove('collapsed');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  // Hamburger click toggles menu
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    if (nav.classList.contains('expanded')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Clicking overlay closes menu
  nav.addEventListener('click', function(e) {
    if (e.target === nav && nav.classList.contains('expanded')) {
      closeDrawer();
    }
  });

  // Clicking a nav link in the drawer closes the menu (mobile)
  navDrawer.addEventListener('click', function(e) {
    if (e.target.tagName === "A") {
      closeDrawer();
    }
  });

  // ESC key closes menu
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeDrawer();
  });

  // Clicking outside nav closes drawer (on mobile)
  document.body.addEventListener('click', function(e) {
    if (nav.classList.contains('expanded') && !nav.contains(e.target) && e.target !== hamburger) {
      closeDrawer();
    }
  }, true);
});

// testing whether github updates this //