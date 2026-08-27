const toggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

const shippingPopup = document.querySelector('#shipping-popup');
const shippingPlace = document.querySelector('#shipping-place');
const shippingNote = document.querySelector('#shipping-note');
const shippingClose = document.querySelector('#shipping-close');

function showShippingPopup() {
  if (!shippingPopup) return;
  requestAnimationFrame(() => shippingPopup.classList.add('is-visible'));
}

async function loadShippingLocation() {
  showShippingPopup();
  if (!shippingPlace) return;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);
    const response = await fetch('https://ipwho.is/', {
      signal: controller.signal,
      cache: 'no-store'
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error('Falha ao consultar localização');
    const data = await response.json();
    if (!data.success || !data.city) throw new Error('Cidade indisponível');

    const region = data.region_code || data.region || '';
    shippingPlace.textContent = region ? `${data.city}, ${region}` : data.city;
    if (shippingNote) shippingNote.textContent = 'Oferta liberada para a sua localização aproximada.';
  } catch (error) {
    shippingPlace.textContent = 'SUA REGIÃO';
    if (shippingNote) shippingNote.textContent = 'Oferta disponível na sua região.';
  }
}

shippingClose?.addEventListener('click', () => {
  shippingPopup?.classList.remove('is-visible');
});

loadShippingLocation();

const revealTargets = document.querySelectorAll('.section-heading, .product-card, .quiz-callout-card, .why-copy, .why-visual');
revealTargets.forEach((item) => item.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((item) => observer.observe(item));
