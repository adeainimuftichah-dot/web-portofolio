// Toggle mobile navigation
const navToggle = document.getElementById('nav-toggle');
const body = document.body;
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  body.classList.toggle('nav-open');
});

// Close nav when a link is clicked (mobile)
mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && body.classList.contains('nav-open')) {
    body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// IntersectionObserver for fade-in elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Simple form validation & simulated submit
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = '';
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (name.length < 2) { status.textContent = 'Mohon masukkan nama yang valid.'; form.name.focus(); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent = 'Mohon masukkan alamat email yang valid.'; form.email.focus(); return; }
  if (message.length < 10) { status.textContent = 'Pesan terlalu pendek (minimal 10 karakter).'; form.message.focus(); return; }

  // Simulasi pengiriman (ganti dengan fetch ke backend jika tersedia)
  status.textContent = 'Mengirim...';
  setTimeout(() => {
    status.textContent = 'Pesan terkirim — terima kasih!';
    form.reset();
  }, 900);
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();