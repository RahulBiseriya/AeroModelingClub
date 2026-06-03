/* =============================================
   AEROMODELLING CLUB – main.js
   ============================================= */

// ── HAMBURGER MENU ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });
  mobileMenu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

// ── GALLERY AUTO-SCROLL ──────────────────────────
const track = document.getElementById('galleryTrack');
const dotsContainer = document.getElementById('galleryDots');

if (track) {
  const slides = Array.from(track.querySelectorAll('.gallery-slide'));
  let current = 0;
  let timer = null;
  let paused = false;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = ((index % slides.length) + slides.length) % slides.length;
    const slideW = slides[0].offsetWidth + 16; // width + gap
    track.style.transition = 'transform 0.65s cubic-bezier(0.4,0,0.2,1)';
    track.style.transform = `translateX(-${current * slideW}px)`;
    document.querySelectorAll('.gallery-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function next() { if (!paused) goTo(current + 1); }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 3200);
  }

  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });

  // Recalculate on resize
  window.addEventListener('resize', () => goTo(current));

  goTo(0);
  startAuto();
}

// ── NAV ACTIVE LINK ─────────────────────────────
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  link.classList.toggle('active', link.getAttribute('href') === page);
});
