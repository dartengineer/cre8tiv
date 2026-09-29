// ====================================
// CURSOR ANIMATION
// ====================================

const dot = document.getElementById('dot');
const ring = document.getElementById('ring');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let rx = mx;
let ry = my;

document.addEventListener('mousemove', function (e) {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(tick);
})();

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .sc, .tc, .case-media img').forEach(function (el) {
  el.addEventListener('mouseenter', function () {
    document.body.classList.add('hov');
  });
  el.addEventListener('mouseleave', function () {
    document.body.classList.remove('hov');
  });
});

// ====================================
// NAVIGATION SCROLL
// ====================================

window.addEventListener('scroll', function () {
  document.getElementById('nav').classList.toggle('stuck', window.scrollY > 30);
});

// ====================================
// REVEAL ANIMATION ON SCROLL
// ====================================

const obs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('on');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.r').forEach(function (el) {
  obs.observe(el);
});

// ====================================
// FORM HANDLING
// ====================================

function handleSub(e) {
  e.preventDefault();

  const form = e.target;
  const firstName = form.querySelector('[name="firstName"]').value.trim();
  const lastName = form.querySelector('[name="lastName"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const projectType = form.querySelector('[name="projectType"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  const whatsappNumber = '2349066433499';
  const text = `Hello, I would like to inquire about a project.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nProject type: ${projectType}\n\nMessage:\n${message}`;
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedText}`
    : `https://wa.me/?text=${encodedText}`;

  window.open(whatsappUrl, '_blank');
  document.getElementById('fok').style.display = 'block';
  form.querySelector('.fsub').style.display = 'none';
}

// ====================================
// PORTFOLIO TABS
// ====================================

function showTab(tab) {
  document.querySelectorAll('.ptab').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.case-list').forEach(function (panel) {
    panel.classList.toggle('active', panel.dataset.panel === tab);
  });
}

// ====================================
// IMAGE LIGHTBOX
// ====================================

function openLightbox(src, alt) {
  const img = document.getElementById('lbImg');
  img.src = src;
  img.alt = alt || '';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.case-media img').forEach(function (img) {
  img.addEventListener('click', function () {
    openLightbox(img.src, img.alt);
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
