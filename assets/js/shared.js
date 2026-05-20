(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
    if (link.getAttribute('data-page') === path) link.classList.add('active');
  });

  const year = new Date().getFullYear();
  document.querySelectorAll('.current-year').forEach((el) => (el.textContent = year));

  const island = document.getElementById('dynamic-island');
  if (island) {
    const updateIsland = () => {
      const scrolled = Math.round((window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100);
      island.textContent = `Dynamic Island • ${Math.min(scrolled, 100)}% explored`;
    };
    updateIsland();
    window.addEventListener('scroll', updateIsland, { passive: true });
  }

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  if (cookieBanner && cookieAccept) {
    if (localStorage.getItem('raccoCookieConsent') === 'accepted') {
      cookieBanner.classList.add('hidden');
    }
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('raccoCookieConsent', 'accepted');
      cookieBanner.classList.add('hidden');
    });
  }
})();
