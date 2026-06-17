/* INDIYA NYC — shared JS */

(function () {
  'use strict';

  /* ── Nav scroll opacity (homepage only) ── */
  const header = document.querySelector('.site-header');
  if (document.body.classList.contains('page-home') && header) {
    const THRESHOLD = window.innerHeight * 0.55;
    function checkScroll() {
      if (window.scrollY > THRESHOLD) {
        header.classList.add('opaque');
      } else {
        header.classList.remove('opaque');
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ── Mobile nav toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      const open = navToggle.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', open);
    });

    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Product carousel (homepage) ── */
  const track   = document.getElementById('productTrack');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (track && prevBtn && nextBtn) {
    const PER_PAGE = 3;
    let page = 0;
    const cards = Array.from(track.querySelectorAll('.product-card'));
    const pages = Math.ceil(cards.length / PER_PAGE);

    function render() {
      const start = page * PER_PAGE;
      cards.forEach(function (card, i) {
        card.style.display = (i >= start && i < start + PER_PAGE) ? '' : 'none';
      });
      prevBtn.disabled = page === 0;
      nextBtn.disabled = page >= pages - 1;
    }

    prevBtn.addEventListener('click', function () { if (page > 0) { page--; render(); } });
    nextBtn.addEventListener('click', function () { if (page < pages - 1) { page++; render(); } });

    render();
  }

  /* ── Auto-update footer year ── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
