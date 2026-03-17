const obs = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      cur = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + cur) {
      link.classList.add('active');
    }
  });
});

function switchTab(btn, tab) {
  document.querySelectorAll('.gallery-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.gtab').forEach(tabBtn => tabBtn.classList.remove('active'));
  document.getElementById('panel-' + tab).classList.add('active');
  btn.classList.add('active');
}

function openLightbox(cell) {
  const img = cell.querySelector('img');
  if (!img) return;
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-img').alt = img.alt || '';
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function handleFormSubmit() {
  const btn = document.querySelector('.btn-send');
  btn.textContent = 'MESSAGE SENT ✓';
  btn.style.background = 'var(--green)';
  btn.disabled = true;
}
