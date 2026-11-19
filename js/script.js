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

// "View other projects" buttons: switch tab, then jump back up to the tabs
function gotoTab(tab) {
  showTab(tab);
  document.getElementById('workTabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ====================================
// IMAGE LIGHTBOX
// ====================================

// Each project's images form a group so the lightbox can step through them.
let lbGroup = [];
let lbIndex = 0;

function showLightboxImage() {
  const item = lbGroup[lbIndex];
  const img = document.getElementById('lbImg');
  img.src = item.src;
  img.alt = item.alt || '';
  document.getElementById('lbCount').textContent =
    lbGroup.length > 1 ? (lbIndex + 1) + ' / ' + lbGroup.length : '';
}

function openLightbox(group, index) {
  lbGroup = group;
  lbIndex = index || 0;
  showLightboxImage();
  const lb = document.getElementById('lightbox');
  lb.classList.toggle('multi', group.length > 1);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function stepLightbox(dir) {
  if (lbGroup.length < 2) return;
  lbIndex = (lbIndex + dir + lbGroup.length) % lbGroup.length;
  showLightboxImage();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lbPrev').addEventListener('click', function (e) {
  e.stopPropagation();
  stepLightbox(-1);
});
document.getElementById('lbNext').addEventListener('click', function (e) {
  e.stopPropagation();
  stepLightbox(1);
});

document.querySelectorAll('.case-media').forEach(function (media) {
  const imgs = Array.prototype.filter.call(media.querySelectorAll('img'), function (img) {
    return !img.closest('.car-thumb');
  });
  imgs.forEach(function (img, i) {
    img.addEventListener('click', function () {
      openLightbox(imgs, i);
    });
  });
});

document.addEventListener('keydown', function (e) {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowLeft') stepLightbox(-1);
  else if (e.key === 'ArrowRight') stepLightbox(1);
});

// ====================================
// CAROUSELS
// ====================================

document.querySelectorAll('.carousel').forEach(function (carousel) {
  const track = carousel.querySelector('.car-track');
  const slides = track.querySelectorAll('.car-slide');
  const prev = carousel.querySelector('.car-prev');
  const next = carousel.querySelector('.car-next');
  const count = carousel.querySelector('.car-count b');
  const thumbs = carousel.parentElement.querySelectorAll('.car-thumb');
  let current = 0;

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: i * track.clientWidth });
  }

  function update() {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i === current && count.textContent) return;
    current = i;
    count.textContent = i + 1;
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
    thumbs.forEach(function (t, ti) {
      t.classList.toggle('active', ti === i);
    });
  }

  prev.addEventListener('click', function () { goTo(current - 1); });
  next.addEventListener('click', function () { goTo(current + 1); });
  thumbs.forEach(function (t, ti) {
    t.addEventListener('click', function () { goTo(ti); });
  });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });
  track.addEventListener('scroll', function () {
    window.requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', function () { goTo(current); });

  prev.disabled = true;
  next.disabled = slides.length < 2;
});
