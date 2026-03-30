const content = window.siteContent || {};

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderTags(tags) {
  return tags.map(tag => `<span class="tag ${tag.class}">${tag.label}</span>`).join('');
}

function renderHero() {
  document.getElementById('hero-title').innerHTML = `${content.hero.titleMain}<span class="outline">${content.hero.titleOutline}</span>`;
  document.getElementById('hero-eyebrow').innerHTML = content.hero.eyebrow;
  document.getElementById('hero-location').textContent = content.hero.location;
  document.getElementById('hero-tagline').innerHTML = content.hero.tagline;
}

function renderAbout() {
  const aboutText = document.getElementById('about-text');
  content.about.paragraphs.forEach(p => aboutText.appendChild(el('p', '', p)));

  const timeline = document.getElementById('timeline');
  content.about.timeline.forEach(item => {
    const wrap = el('div', 'tl-item');
    let orgHtml;
    if (item.orgLinks) {
      orgHtml = `<div class="tl-org">${item.orgLinks.map(l =>
        `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="tl-org-link">${l.label}</a>`
      ).join('<span class="tl-org-sep"> · </span>')}</div>`;
    } else {
      orgHtml = `<div class="tl-org">${item.org}</div>`;
    }
    wrap.innerHTML = `
      <div class="tl-year">${item.year}</div>
      <div class="tl-dot ${item.active ? 'active' : ''}"></div>
      <div>
        <div class="tl-role">${item.role}</div>
        ${orgHtml}
        <div class="tl-desc">${item.desc}</div>
      </div>
    `;
    timeline.appendChild(wrap);
  });
}

function renderExpertise() {
  const grid = document.getElementById('expertise-grid');
  content.expertise.forEach(card => {
    const node = el('div', 'domain-card');
    node.innerHTML = `
      <div class="d-icon ${card.iconClass}">${card.icon}</div>
      <h3>${card.title}</h3>
      <p>${card.text}</p>
      <div class="tags">${renderTags(card.tags)}</div>
    `;
    grid.appendChild(node);
  });
}

function renderProjects() {
  const list = document.getElementById('project-list');
  content.projects.forEach(project => {
    const node = el('div', 'project-card');
    if (project.problem) {
      node.innerHTML = `
        <div class="project-card-top">
          <h3>${project.title}</h3>
          <span class="tag ${project.status.class} status-tag">${project.status.label}</span>
        </div>
        <div class="project-proof">
          <div class="proof-row">
            <span class="proof-label proof-problem">Problem</span>
            <p class="proof-text">${project.problem}</p>
          </div>
          <div class="proof-row">
            <span class="proof-label proof-action">Action</span>
            <p class="proof-text">${project.action}</p>
          </div>
          <div class="proof-row">
            <span class="proof-label proof-result">Result</span>
            <p class="proof-text proof-result-text">${project.result}</p>
          </div>
        </div>
        <div class="tags tags-top">${renderTags(project.tags)}</div>
      `;
    } else {
      node.innerHTML = `
        <div>
          <h3>${project.title}</h3>
          <p>${project.text}</p>
          <div class="tags tags-top">${renderTags(project.tags)}</div>
        </div>
        <span class="tag ${project.status.class} status-tag">${project.status.label}</span>
      `;
    }
    list.appendChild(node);
  });
}

function renderCertifications() {
  const grid = document.getElementById('cert-grid');
  content.certifications.forEach(cert => {
    const node = el('div', 'cert-card');
    node.innerHTML = `
      <div class="cert-num">${cert.num}</div>
      <div>
        <div class="cert-name">${cert.name}</div>
        <div class="cert-body">${cert.body}</div>
      </div>
    `;
    grid.appendChild(node);
  });
}

function buildRibbonSVG(stripes) {
  const W = 90, H = 28;
  const total = stripes.reduce((s, st) => s + st.flex, 0);
  let x = 0;
  const rects = stripes.map(st => {
    const w = (st.flex / total) * W;
    const rect = `<rect x="${x.toFixed(2)}" y="0" width="${w.toFixed(2)}" height="${H}" fill="${st.color}"/>`;
    x += w;
    return rect;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block;border-radius:3px;overflow:hidden">${rects}</svg>`;
}

function renderMedals() {
  const container = document.getElementById('medals-row');
  if (!container || !content.medals) return;

  content.medals.forEach(medal => {
    const card = el('div', 'medal-card');
    const lines = medal.name.split('\n');
    card.innerHTML = `
      <div class="medal-ribbon-wrap">
        ${buildRibbonSVG(medal.ribbon)}
        <div class="medal-bar"></div>
      </div>
      <div class="medal-info">
        <div class="medal-name">${lines.join('<br>')}</div>
        <div class="medal-issuer">${medal.issuer}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderGallery() {
  document.getElementById('gallery-intro').textContent = content.gallery.intro;
  const tabs = document.getElementById('gallery-tabs');
  const panels = document.getElementById('gallery-panels');

  content.gallery.tabs.forEach((tab, index) => {
    const btn = el('button', `gtab ${index === 0 ? 'active' : ''}`, tab.label);
    btn.type = 'button';
    btn.addEventListener('click', () => switchTab(tab.key, btn));
    tabs.appendChild(btn);

    const panel = el('div', `gallery-panel ${index === 0 ? 'active' : ''}`);
    panel.id = `panel-${tab.key}`;

    tab.images.forEach(image => {
      const cell = el('div', `g-cell ${image.wide ? 'wide' : ''}`);
      cell.innerHTML = `<img src="${image.src}" alt="${image.alt}"><div class="g-caption">${image.caption}</div>`;
      cell.addEventListener('click', () => openLightbox(cell));
      panel.appendChild(cell);
    });

    panels.appendChild(panel);
  });
}

function renderPassions() {
  const root = document.getElementById('passion-sections');
  if (!root || !content.passions) return;

  const grid = el('div', 'blog-grid');
  content.passions.forEach(passion => {
    const card = document.createElement('a');
    card.className = 'blog-card';
    card.href = passion.slug;
    card.innerHTML = `
      <div class="blog-card-meta">
        <span class="passion-icon">${passion.icon}</span>
        <span class="tag ${passion.tagClass}">${passion.tag}</span>
      </div>
      <h3 class="blog-card-title">${passion.title}</h3>
      <p class="blog-card-excerpt">${passion.excerpt}</p>
      <span class="blog-card-read">Read more →</span>
    `;
    grid.appendChild(card);
  });
  root.appendChild(grid);
}

const CONTACT_ICONS = {
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`
};

function renderBlog() {
  const grid = document.getElementById('blog-grid');
  if (!grid || !content.blog) return;
  content.blog.forEach(post => {
    const card = document.createElement('a');
    card.className = 'blog-card';
    card.href = post.slug;
    card.innerHTML = `
      <div class="blog-card-meta">
        <span class="tag ${post.tagClass}">${post.tag}</span>
        <span class="blog-card-date">${post.date}</span>
      </div>
      <h3 class="blog-card-title">${post.title}</h3>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <span class="blog-card-read">Read more →</span>
    `;
    grid.appendChild(card);
  });
}

function renderContact() {
  document.getElementById('contact-title').innerHTML = content.contact.title;
  document.getElementById('contact-text').textContent = content.contact.text;

  const links = document.getElementById('contact-links');
  content.contact.links.forEach(link => {
    const node = document.createElement(link.type);
    node.className = 'contact-link';
    if (link.type === 'a') {
      node.href = link.href;
      if (link.target) {
        node.target = link.target;
        node.rel = 'noopener noreferrer';
      }
    } else {
      node.style.cursor = 'default';
    }
    const iconSvg = CONTACT_ICONS[link.icon] || link.icon;
    node.innerHTML = `
      <span class="contact-link-icon">${iconSvg}</span>
      <span class="contact-link-label">${link.label}</span>
      <span class="contact-link-sub">${link.sub}</span>
    `;
    links.appendChild(node);
  });
}

function initFadeObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(node => obs.observe(node));
}

function initNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) cur = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + cur) link.classList.add('active');
    });
  });
}

function switchTab(tab, btn) {
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
  const form = document.getElementById('contact-form');
  const btn = form?.querySelector('.btn-send');
  if (!form || !btn) return;
  btn.textContent = 'SENDING...';
  btn.disabled = true;
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    handleFormSubmit();
  });
}

renderHero();
renderAbout();
renderExpertise();
renderProjects();
renderCertifications();
renderMedals();
renderBlog();
renderGallery();
renderPassions();
renderContact();
initFadeObserver();
initNavTracking();

window.switchTab = switchTab;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.handleFormSubmit = handleFormSubmit;
