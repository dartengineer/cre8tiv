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
document.querySelectorAll('a, button, .card, .sc, .tc').forEach(function (el) {
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
// CASE STUDIES DATA
// ====================================

const cases = {
  lumiere: {
    cat: 'Brand Identity',
    title: 'Lumière Studio',
    bg: 'linear-gradient(145deg,#D6B5AA,#B88880)',
    client: 'Lumière Studio',
    year: '2025',
    role: 'Brand Designer',
    dur: '8 weeks',
    prob: 'Lumière, a Paris-based photography studio, needed an identity as elevated as their work — sophisticated, warm, and instantly memorable. Their existing brand was generic and failing to attract luxury clients who expected visual excellence from the very first impression.',
    proc: 'I began with a deep discovery phase — interviewing the founders, analysing the competitive landscape, and developing an extensive mood board rooted in golden-hour light and analogue film photography. The wordmark was crafted in a custom refined serif with careful optical corrections. The supporting system uses a warm neutral palette anchored by a deep burgundy accent, with bespoke art direction guidelines covering everything from studio signage to digital presence.',
    out: 'The new identity launched to immediate praise. Lumiere received three editorial features in the first quarter, doubled their inquiry rate, and successfully repositioned as the premier luxury studio in their arrondissement. The brand has since become a reference in Paris\'s creative community and was shortlisted for a D&AD pencil.'
  },
  velours: {
    cat: 'UI / UX Design',
    title: 'Velours App',
    bg: 'linear-gradient(145deg,#B8A8CC,#8E7AAA)',
    client: 'Velours Technologies',
    year: '2025',
    role: 'Lead Product Designer',
    dur: '12 weeks',
    prob: 'Velours, a wellness subscription app, had genuinely transformative content but a clunky interface leading to high churn. Users found the journey disorienting and the aesthetic misaligned with the calm, intentional experience the brand promised.',
    proc: 'Through 14 user interviews and deep analytics review, I mapped every core friction point. I redesigned the complete user flow with an emphasis on ritual and ease — introducing a "Daily Calm" dashboard, a refined three-step onboarding sequence, and a micro-interaction library of 40+ transitions that feel deliberate and soothing. The visual language uses layered soft gradients, generous whitespace, and a muted lavender palette with warm sand accents.',
    out: 'Post-launch metrics exceeded all targets: a 34% reduction in onboarding drop-off, 28% increase in daily active users, and App Store ratings climbed from 3.4 to 4.7 stars within six months. The redesign was featured in Mobbin\'s Design of the Week.'
  },
  maison: {
    cat: 'Editorial Design',
    title: 'Maison Magazine',
    bg: 'linear-gradient(145deg,#D8C8A8,#C0A87A)',
    client: 'Maison Publishing',
    year: '2024',
    role: 'Editorial Designer',
    dur: '6 months',
    prob: 'Maison, a new independent luxury interiors magazine, needed a visual system capable of celebrating architectural photography while maintaining coherent brand expression across 120 pages of dense, varied content per issue — all on a lean production timeline.',
    proc: 'I developed the complete editorial design system from scratch: a typographic hierarchy using a classical Didone serif for display paired with a humanist sans for body copy; a modular 12-column grid with flexible breakpoints; custom column rules and ornamental dividers; and an iconographic language for section openers. I art-directed photography briefs for the first three issues to ensure visual consistency throughout.',
    out: 'Maison\'s debut issue sold out within three weeks of launch at international newsstands. It earned a D&AD pencil nomination for editorial design and press coverage in Creative Review. The system I built allows the in-house team to produce subsequent issues with full consistency and speed.'
  },
  flora: {
    cat: 'Packaging Design',
    title: 'Flora Botanicals',
    bg: 'linear-gradient(145deg,#AAC4BC,#7AA09A)',
    client: 'Flora Botanicals Ltd.',
    year: '2024',
    role: 'Packaging Designer',
    dur: '10 weeks',
    prob: 'Flora, a sustainable botanical skincare brand, was launching their hero product line but had packaging indistinguishable from mass-market competitors. They needed designs communicating artisan quality, ingredient provenance, and eco-luxury simultaneously.',
    proc: 'The creative concept centred on "botanical cartography" — each product\'s packaging featuring a hand-drawn illustration of its hero ingredient\'s origin region, rendered in a detailed engraving style. I designed all four SKU variations, specified sustainable materials including FSC-certified kraft card and soy-based inks, and created complete production artwork for both retail and e-commerce formats.',
    out: 'Flora sold through their initial run of 4,000 units in 11 weeks. The packaging earned coverage in Wallpaper* and Refinery29, and a major UK retailer approached them about nationwide stocking within two months of launch. It is now a Pentawards 2025 finalist.'
  },
  nuance: {
    cat: 'Brand System',
    title: 'Nuance Agency',
    bg: 'linear-gradient(145deg,#C8C0D8,#A89EC0)',
    client: 'Nuance Creative Agency',
    year: '2025',
    role: 'Brand Identity Designer',
    dur: '6 weeks',
    prob: 'Nuance, a boutique creative agency, had grown significantly but their brand still looked like a two-person startup. They needed a full identity system projecting confidence and creative authority, without losing the warmth that made clients love working with them.',
    proc: 'The identity was built around the tension in the agency\'s name — Nuance — and the idea of signal emerging from noise. The wordmark uses a custom geometric typeface with deliberate optical inconsistencies that reward close inspection. The colour system pairs deep plum with warm gold and chalk, built to be legible from a Twitter avatar to a conference backdrop.',
    out: 'Within 90 days of the rebrand, Nuance won two pitches they attribute directly to the credibility the new brand conveyed, increased proposal acceptance rates by 22%, and received three inbound enquiries referencing their visual presence.'
  },
  soie: {
    cat: 'Luxury Branding',
    title: 'Soie Parfums',
    bg: 'linear-gradient(145deg,#D4B8A8,#BC9478)',
    client: 'Soie Parfums',
    year: '2025',
    role: 'Creative Director',
    dur: '16 weeks',
    prob: 'Soie, an independent French perfume house, was launching their debut collection targeting the ultra-luxury segment. Every touchpoint — from bottle to website to press kit — needed to communicate that this was an object of genuine cultural significance, not simply a product.',
    proc: 'Working closely with the founder and the perfumer, I developed a complete brand world: a calligraphic wordmark referencing the fluid movement of silk; a visual identity in deep parchment and midnight with oxidised gold; bottle label designs featuring original etchings by a Parisian illustrator I commissioned; and a 40-page brand bible governing every expression of the identity.',
    out: 'Soie\'s debut collection launched at Harrods and Le Bon Marche simultaneously. The Sunday Times Style described their packaging as "some of the most beautiful objects produced by an independent perfume house in a decade." All six fragrances sold out within the first month.'
  }
};

// ====================================
// MODAL / CASE STUDY FUNCTIONS
// ====================================

function openCase(k) {
  const c = cases[k];

  document.getElementById('mcat2').textContent = c.cat;
  document.getElementById('mtitle2').textContent = c.title;

  const t = document.getElementById('mthumb');
  t.style.background = c.bg;
  t.innerHTML = '<svg width="120" height="80" viewBox="0 0 120 80" fill="none"><rect x="10" y="10" width="100" height="60" rx="8" fill="rgba(255,255,255,.15)"/><rect x="20" y="22" width="60" height="8" rx="4" fill="rgba(255,255,255,.3)"/><rect x="20" y="36" width="40" height="5" rx="2.5" fill="rgba(255,255,255,.2)"/><circle cx="90" cy="50" r="14" fill="rgba(255,255,255,.2)"/></svg>';

  document.getElementById('mmeta').innerHTML =
    '<div class="mmi"><span>Client</span><span>' + c.client + '</span></div>' +
    '<div class="mmi"><span>Year</span><span>' + c.year + '</span></div>' +
    '<div class="mmi"><span>My Role</span><span>' + c.role + '</span></div>' +
    '<div class="mmi"><span>Duration</span><span>' + c.dur + '</span></div>';

  document.getElementById('mprob').textContent = c.prob;
  document.getElementById('mproc').textContent = c.proc;
  document.getElementById('mout').textContent = c.out;

  document.getElementById('mov').classList.add('open');
  document.getElementById('mp').classList.add('open');
  document.getElementById('mp').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeCase() {
  document.getElementById('mov').classList.remove('open');
  document.getElementById('mp').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeCase();
  }
});
