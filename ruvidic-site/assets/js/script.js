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
    node.innerHTML = `
      <div>
        <h3>${project.title}</h3>
        <p>${project.text}</p>
        <div class="tags tags-top">${renderTags(project.tags)}</div>
      </div>
      <span class="tag ${project.status.class} status-tag">${project.status.label}</span>
    `;
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

  content.passions.forEach(section => {
    const block = el('div', 'passion-block fade-in');
    const inner = el('div', `passion-block-inner ${section.reverse ? 'reverse' : ''}`);

    const textSide = el('div');
    textSide.innerHTML = `
      <div class="passion-label" style="color:${section.labelColor}">${section.label}</div>
      <h3>${section.title}</h3>
      <p style="margin-top:12px">${section.text}</p>
      <div class="tags" style="margin-top:16px">${renderTags(section.tags)}</div>
    `;

    let visual;
    if (section.visual.type === 'stats') {
      visual = el('div', 'interest-visual');
      visual.innerHTML = `<div style="font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px">${section.visual.title}</div>`;
      section.visual.rows.forEach(row => {
        const stat = el('div', 'interest-stat');
        stat.innerHTML = `
          <div class="interest-stat-num">${row.num}</div>
          <div style="flex:1">
            <div class="interest-stat-label">${row.label}</div>
            <div class="interest-stat-bar"><div class="interest-stat-fill" style="width:${row.width}"></div></div>
          </div>
        `;
        visual.appendChild(stat);
      });
    } else {
      visual = el('div', 'aqua-visual');
      section.visual.cells.forEach(cell => {
        const item = el('div', 'aqua-cell');
        item.innerHTML = `
          <div class="aqua-cell-icon">${cell.icon}</div>
          <div class="aqua-cell-title">${cell.title}</div>
          <div class="aqua-cell-sub">${cell.sub}</div>
        `;
        visual.appendChild(item);
      });
    }

    inner.appendChild(textSide);
    inner.appendChild(visual);
    block.appendChild(inner);
    root.appendChild(block);
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
    node.innerHTML = `
      <span class="contact-link-icon">${link.icon}</span>
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
renderGallery();
renderPassions();
renderContact();
initFadeObserver();
initNavTracking();

window.switchTab = switchTab;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.handleFormSubmit = handleFormSubmit;
