
const PRODUCTS = [
  { id: 'p1', name: 'Crimson Rose Bunch', price: 24.99, oldPrice: 32.99, cat: 'roses', img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&q=75', rating: 5, badge: '24% OFF' },
  { id: 'p2', name: 'Blush Garden Roses', price: 29.99, oldPrice: null, cat: 'roses', img: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500&q=75', rating: 4 },
  { id: 'p3', name: 'Golden Tulip Trio', price: 18.5, oldPrice: 22.0, cat: 'tulips', img: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500&q=75', rating: 5, badge: 'NEW' },
  { id: 'p4', name: 'Lavender Tulip Mix', price: 21.0, oldPrice: null, cat: 'tulips', img: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=500&q=75', rating: 4 },
  { id: 'p5', name: 'White Lily Elegance', price: 27.5, oldPrice: null, cat: 'lilies', img: 'https://images.unsplash.com/photo-1588625500633-a0cd518f2a8e?w=500&q=75', rating: 5 },
  { id: 'p6', name: 'Pink Lily Whisper', price: 25.0, oldPrice: 30.0, cat: 'lilies', img: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=500&q=75', rating: 4, badge: '17% OFF' },
  { id: 'p7', name: "Florist's Choice Bouquet", price: 39.99, oldPrice: 49.99, cat: 'bouquets', img: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500&q=75', rating: 5, badge: 'BEST SELLER' },
  { id: 'p8', name: 'Pastel Dream Bouquet', price: 34.5, oldPrice: null, cat: 'bouquets', img: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&q=75', rating: 5 },
];

const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&q=75', cat: 'roses' },
  { img: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500&q=75', cat: 'bouquets' },
  { img: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500&q=75', cat: 'tulips' },
  { img: 'https://images.unsplash.com/photo-1588625500633-a0cd518f2a8e?w=500&q=75', cat: 'lilies' },
  { img: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=75', cat: 'roses' },
  { img: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&q=75', cat: 'bouquets' },
  { img: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=600&q=75', cat: 'tulips' },
  { img: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=500&q=75', cat: 'lilies' },
  { img: 'https://images.unsplash.com/photo-1595351298020-038700609655?w=600&q=75', cat: 'bouquets' },
];

const REVIEWS = [
  { name: 'Amara Khan', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=75', text: 'The bouquet arrived in perfect condition and lasted almost two weeks. Absolutely stunning arrangement.', rating: 5 },
  { name: 'Sara Malik', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=75', text: 'Same-day delivery saved my anniversary. The roses were fresher than anything I have bought in store.', rating: 5 },
  { name: 'Bilal Ahmed', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&q=75', text: 'Customer support helped me pick the perfect arrangement for my mother. Wonderful experience overall.', rating: 4 },
  { name: 'Hina Raza', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=75', text: 'Beautiful packaging and the flowers smell incredible. Will definitely be ordering again soon.', rating: 5 },
];

/* ---------------------------------------------------------
   STATE (persisted to localStorage)
--------------------------------------------------------- */
let cart = JSON.parse(localStorage.getItem('bh_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('bh_wishlist') || '[]');

function saveCart() { localStorage.setItem('bh_cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('bh_wishlist', JSON.stringify(wishlist)); }

/* ---------------------------------------------------------
   LOADER
--------------------------------------------------------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 900);
});

/* ---------------------------------------------------------
   DARK / LIGHT MODE
--------------------------------------------------------- */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('bh_theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('bh_theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('bh_theme', 'dark');
  }
});

/* ---------------------------------------------------------
   STICKY NAVBAR + SCROLL PROGRESS + BACK TO TOP
--------------------------------------------------------- */
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);
  backToTop.classList.toggle('show', scrollY > 500);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${(scrollY / docHeight) * 100}%`;

  // parallax hero
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
  }
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Active nav link highlighting + smooth scroll (native CSS scroll-behavior handles smoothness) */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], .hero[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ---------------------------------------------------------
   MOBILE MENU
--------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navLinksWrap = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksWrap.classList.toggle('open');
});
navLinksWrap.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navLinksWrap.classList.remove('open');
}));

/* ---------------------------------------------------------
   SEARCH OVERLAY
--------------------------------------------------------- */
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchBtn.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  setTimeout(() => searchInput.focus(), 300);
});
searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) searchOverlay.classList.remove('active'); });

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';
  if (!q) return;
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.cat.includes(q));
  if (matches.length === 0) {
    searchResults.innerHTML = `<div class="search-result-item">No blooms found for "${q}"</div>`;
    return;
  }
  matches.forEach(p => {
    const div = document.createElement('div');
    div.className = 'search-result-item';
    div.textContent = `${p.name} — $${p.price.toFixed(2)}`;
    div.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    searchResults.appendChild(div);
  });
});

/* ---------------------------------------------------------
   CART DRAWER
--------------------------------------------------------- */
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartClose = document.getElementById('cartClose');
const overlay = document.getElementById('overlay');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');

function openDrawer(drawer) { drawer.classList.add('open'); overlay.classList.add('active'); }
function closeDrawers() {
  cartDrawer.classList.remove('open');
  overlay.classList.remove('active');
}
cartBtn.addEventListener('click', () => { renderCart(); openDrawer(cartDrawer); });
cartClose.addEventListener('click', closeDrawers);
overlay.addEventListener('click', closeDrawers);

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  updateCartCount(true);
  showOrderNotif(`${product.name} added to your basket`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartCount(false);
  renderCart();
}

function updateCartCount(bump) {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  cartCountEl.textContent = total;
  if (bump) {
    cartCountEl.classList.remove('bump');
    void cartCountEl.offsetWidth;
    cartCountEl.classList.add('bump');
  }
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your basket is feeling a little empty 🌸</p>`;
    cartTotalEl.textContent = '$0.00';
    return;
  }
  let total = 0;
  cartItemsEl.innerHTML = cart.map(c => {
    const p = PRODUCTS.find(pp => pp.id === c.id);
    total += p.price * c.qty;
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="cart-item-info">
          <h5>${p.name}</h5>
          <span>Qty ${c.qty} · $${(p.price * c.qty).toFixed(2)}</span>
        </div>
        <button data-remove="${c.id}"><i class="fa-solid fa-trash"></i></button>
      </div>`;
  }).join('');
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
  cartItemsEl.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
  });
}
updateCartCount(false);

/* checkout -> confetti */
document.querySelector('.cart-footer .btn-primary').addEventListener('click', () => {
  if (cart.length === 0) return;
  launchConfetti();
  cart = [];
  saveCart();
  updateCartCount(false);
  renderCart();
  closeDrawers();
  showOrderNotif('Order placed! Thank you for choosing Bloom Haven 🎉');
});

/* ---------------------------------------------------------
   PRODUCT GRID (render + filter + wishlist + add to cart)
--------------------------------------------------------- */
const productGrid = document.getElementById('productGrid');

function renderProducts() {
  productGrid.innerHTML = PRODUCTS.map(p => {
    const isWished = wishlist.includes(p.id);
    return `
    <div class="product-card" data-cat="${p.cat}">
      <div class="product-media">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <button class="wishlist-btn ${isWished ? 'active' : ''}" data-wish="${p.id}" aria-label="Add to wishlist">
          <i class="fa-solid fa-heart"></i>
        </button>
        <div class="quick-view" data-quickview="${p.id}">Quick View</div>
      </div>
      <div class="product-info">
        <h4>${p.name}</h4>
        <div class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}</div>
        <div class="price-row">
          <span class="price-now">$${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="add-cart-btn" data-add="${p.id}">Add to Cart</button>
      </div>
    </div>`;
  }).join('');

  productGrid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', e => { addToCart(btn.dataset.add); createRipple(e, btn); });
  });
  productGrid.querySelectorAll('[data-wish]').forEach(btn => {
    btn.addEventListener('click', () => toggleWishlist(btn.dataset.wish, btn));
  });
  productGrid.querySelectorAll('[data-quickview]').forEach(el => {
    el.addEventListener('click', () => {
      const p = PRODUCTS.find(pp => pp.id === el.dataset.quickview);
      showOrderNotif(`${p.name} — $${p.price.toFixed(2)} · ${p.rating}★`);
    });
  });
}

function toggleWishlist(id, btn) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
    btn.classList.remove('active');
  } else {
    wishlist.push(id);
    btn.classList.add('active');
  }
  saveWishlist();
}

renderProducts();

/* Filter bar (shop) */
document.querySelectorAll('.filter-bar .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
    });
  });
});

/* Ripple effect for buttons */
function createRipple(e, el) {
  const rect = el.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  el.style.position = 'relative';
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => createRipple(e, btn));
});

/* ---------------------------------------------------------
   GALLERY (masonry + filter + lightbox)
--------------------------------------------------------- */
const masonry = document.getElementById('masonry');
masonry.innerHTML = GALLERY.map(g => `
  <div class="g-item" data-cat="${g.cat}"><img src="${g.img}" alt="Flower gallery"></div>
`).join('');

document.querySelectorAll('.gallery-filter .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gallery-filter .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.gfilter;
    document.querySelectorAll('.g-item').forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
masonry.addEventListener('click', e => {
  const item = e.target.closest('.g-item');
  if (!item) return;
  lightboxImg.src = item.querySelector('img').src;
  lightbox.classList.add('active');
});
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });

/* ---------------------------------------------------------
   TESTIMONIAL SLIDER (auto-sliding)
--------------------------------------------------------- */
const track = document.getElementById('testimonialTrack');
const dotsWrap = document.getElementById('tDots');
let tIndex = 0;
let tTimer;

track.innerHTML = REVIEWS.map((r, i) => `
  <div class="t-slide ${i === 0 ? 'active' : ''}">
    <img src="${r.img}" alt="${r.name}">
    <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
    <p>"${r.text}"</p>
    <h5>${r.name}</h5>
  </div>
`).join('');
dotsWrap.innerHTML = REVIEWS.map((_, i) => `<span class="t-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></span>`).join('');

const slides = track.querySelectorAll('.t-slide');
const dots = dotsWrap.querySelectorAll('.t-dot');

function goToSlide(i) {
  slides[tIndex].classList.remove('active');
  dots[tIndex].classList.remove('active');
  tIndex = (i + slides.length) % slides.length;
  slides[tIndex].classList.add('active');
  dots[tIndex].classList.add('active');
}
function nextSlide() { goToSlide(tIndex + 1); }
function prevSlide() { goToSlide(tIndex - 1); }

document.getElementById('tNext').addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
document.getElementById('tPrev').addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
dots.forEach(dot => dot.addEventListener('click', () => { goToSlide(+dot.dataset.dot); resetAutoSlide(); }));

function resetAutoSlide() { clearInterval(tTimer); tTimer = setInterval(nextSlide, 5000); }
resetAutoSlide();

/* ---------------------------------------------------------
   COUNTDOWN TIMER (special offer)
--------------------------------------------------------- */
const countdownTarget = new Date();
countdownTarget.setDate(countdownTarget.getDate() + 3);
countdownTarget.setHours(23, 59, 59, 0);

function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, countdownTarget - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  document.getElementById('cdDays').textContent = String(d).padStart(2, '0');
  document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
  document.getElementById('cdMins').textContent = String(m).padStart(2, '0');
  document.getElementById('cdSecs').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* Sparkles for offer section */
const sparklesWrap = document.getElementById('sparkles');
for (let i = 0; i < 25; i++) {
  const s = document.createElement('div');
  s.className = 'sparkle';
  s.style.left = `${Math.random() * 100}%`;
  s.style.top = `${Math.random() * 100}%`;
  s.style.animationDelay = `${Math.random() * 2}s`;
  sparklesWrap.appendChild(s);
}

/* ---------------------------------------------------------
   NEWSLETTER
--------------------------------------------------------- */
const newsletterForm = document.getElementById('newsletterForm');
const planeIcon = document.getElementById('planeIcon');
let newsletterSuccessEl;

newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  planeIcon.classList.remove('sent');
  void planeIcon.offsetWidth;
  planeIcon.classList.add('sent');

  if (!newsletterSuccessEl) {
    newsletterSuccessEl = document.createElement('div');
    newsletterSuccessEl.className = 'newsletter-success';
    newsletterSuccessEl.textContent = '🌸 Subscribed! Watch your inbox for fresh offers.';
    document.body.appendChild(newsletterSuccessEl);
  }
  newsletterSuccessEl.classList.add('show');
  setTimeout(() => newsletterSuccessEl.classList.remove('show'), 3200);
  newsletterForm.reset();
});

/* ---------------------------------------------------------
   CONTACT FORM VALIDATION
--------------------------------------------------------- */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const fields = [
    { input: 'cName', err: 'errName', test: v => v.trim().length >= 2, msg: 'Please enter your full name.' },
    { input: 'cEmail', err: 'errEmail', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email.' },
    { input: 'cSubject', err: 'errSubject', test: v => v.trim().length >= 3, msg: 'Subject is too short.' },
    { input: 'cMessage', err: 'errMessage', test: v => v.trim().length >= 10, msg: 'Message should be at least 10 characters.' },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.input);
    const errEl = document.getElementById(f.err);
    const group = el.closest('.form-group');
    if (!f.test(el.value)) {
      group.classList.add('error');
      errEl.textContent = f.msg;
      valid = false;
    } else {
      group.classList.remove('error');
      errEl.textContent = '';
    }
  });

  const successEl = document.getElementById('formSuccess');
  if (valid) {
    successEl.classList.add('show');
    contactForm.reset();
    setTimeout(() => successEl.classList.remove('show'), 4000);
  } else {
    successEl.classList.remove('show');
  }
});

/* ---------------------------------------------------------
   TYPING EFFECT (hero heading)
--------------------------------------------------------- */
function typeText(el, text, speed, cb) {
  let i = 0;
  el.style.width = 'auto';
  function step() {
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) setTimeout(step, speed);
    else if (cb) cb();
  }
  step();
}
window.addEventListener('DOMContentLoaded', () => {
  const l1 = document.getElementById('typeLine1');
  const l2 = document.getElementById('typeLine2');
  setTimeout(() => {
    typeText(l1, 'Fresh Flowers for', 45, () => {
      typeText(l2, 'Every Occasion', 45);
    });
  }, 1000);
});

/* ---------------------------------------------------------
   SCROLL REVEAL (IntersectionObserver)
--------------------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-up');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ---------------------------------------------------------
   FLOATING PETALS (global, continuous)
--------------------------------------------------------- */
const petalsField = document.getElementById('petalsField');
const petalEmojis = ['🌸', '🌺', '🌷', '💮'];
function spawnPetal() {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty('--drift', `${Math.random() * 160 - 80}px`);
  const duration = 8 + Math.random() * 8;
  petal.style.animationDuration = `${duration}s`;
  petal.style.fontSize = `${1 + Math.random()}rem`;
  petalsField.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000);
}
setInterval(spawnPetal, 900);
for (let i = 0; i < 6; i++) setTimeout(spawnPetal, i * 300);

/* ---------------------------------------------------------
   BUTTERFLIES (hero only)
--------------------------------------------------------- */
const butterfliesWrap = document.getElementById('butterflies');
function spawnButterfly() {
  const b = document.createElement('span');
  b.className = 'butterfly';
  b.textContent = '🦋';
  b.style.top = `${10 + Math.random() * 60}%`;
  const duration = 10 + Math.random() * 8;
  b.style.animationDuration = `${duration}s, .4s`;
  butterfliesWrap.appendChild(b);
  setTimeout(() => b.remove(), duration * 1000);
}
for (let i = 0; i < 3; i++) setTimeout(spawnButterfly, i * 1500);
setInterval(spawnButterfly, 6000);

/* ---------------------------------------------------------
   CURSOR GLOW
--------------------------------------------------------- */
const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', e => {
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
});

/* ---------------------------------------------------------
   TILT ANIMATION (category cards)
--------------------------------------------------------- */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ---------------------------------------------------------
   BACKGROUND PARTICLES (canvas)
--------------------------------------------------------- */
const particlesCanvas = document.getElementById('particles');
const pctx = particlesCanvas.getContext('2d');
let particles = [];

function resizeParticles() {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
}
resizeParticles();
window.addEventListener('resize', resizeParticles);

function initParticles() {
  particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * particlesCanvas.width,
    y: Math.random() * particlesCanvas.height,
    r: 1 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  }));
}
initParticles();

function animateParticles() {
  pctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  pctx.fillStyle = isDark ? 'rgba(233,168,196,0.35)' : 'rgba(183,159,217,0.3)';
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > particlesCanvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > particlesCanvas.height) p.vy *= -1;
    pctx.beginPath();
    pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    pctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ---------------------------------------------------------
   ORDER NOTIFICATION POPUP
--------------------------------------------------------- */
const orderNotif = document.getElementById('orderNotif');
let notifTimeout;
function showOrderNotif(msg) {
  orderNotif.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  orderNotif.classList.add('show');
  clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => orderNotif.classList.remove('show'), 3000);
}

/* Simulated live order popups */
const sampleNames = ['Amina', 'Zara', 'Hassan', 'Ali', 'Fatima', 'Usman'];
const sampleFlowers = ['Rose Bouquet', 'Tulip Bunch', 'Lily Arrangement', 'Bloom Basket'];
function simulateLiveOrder() {
  const name = sampleNames[Math.floor(Math.random() * sampleNames.length)];
  const flower = sampleFlowers[Math.floor(Math.random() * sampleFlowers.length)];
  showOrderNotif(`${name} just ordered a ${flower}`);
}
setTimeout(simulateLiveOrder, 15000);
setInterval(simulateLiveOrder, 45000);

/* ---------------------------------------------------------
   CHATBOT (UI only)
--------------------------------------------------------- */
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotBody = document.getElementById('chatbotBody');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('open'));
chatbotClose.addEventListener('click', () => chatbotWindow.classList.remove('open'));

const botReplies = [
  "That sounds lovely! I'd recommend our Bouquets collection for that. 💐",
  "Our best sellers section has some gorgeous options for any budget!",
  "Same-day delivery is available if you order before 2pm 🌷",
  "I'd suggest roses for romance, lilies for elegance, or sunflowers for joy!",
];
function sendChatMessage() {
  const val = chatbotInput.value.trim();
  if (!val) return;
  const userMsg = document.createElement('div');
  userMsg.className = 'user-msg';
  userMsg.textContent = val;
  chatbotBody.appendChild(userMsg);
  chatbotInput.value = '';
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-msg';
    botMsg.textContent = botReplies[Math.floor(Math.random() * botReplies.length)];
    chatbotBody.appendChild(botMsg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }, 600);
}
chatbotSend.addEventListener('click', sendChatMessage);
chatbotInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendChatMessage(); });

/* ---------------------------------------------------------
   CONFETTI ANIMATION (on successful order)
--------------------------------------------------------- */
const confettiCanvas = document.getElementById('confettiCanvas');
const cctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

function launchConfetti() {
  const colors = ['#E9A8C4', '#B79FD9', '#D8A657', '#93AE8C', '#FBF6EF'];
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -20,
    r: 4 + Math.random() * 5,
    vy: 2 + Math.random() * 3,
    vx: (Math.random() - 0.5) * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 10,
  }));
  let frame = 0;
  function tick() {
    frame++;
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      cctx.save();
      cctx.translate(p.x, p.y);
      cctx.rotate(p.rot * Math.PI / 180);
      cctx.fillStyle = p.color;
      cctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
      cctx.restore();
    });
    if (frame < 140) requestAnimationFrame(tick);
    else cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
  tick();
}
