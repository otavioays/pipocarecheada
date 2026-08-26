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

const visitorCity = document.querySelector('#visitor-city');
const locationStatus = document.querySelector('#location-status');

async function loadVisitorCity() {
  if (!visitorCity) return;

  try {
    const response = await fetch('https://ipwho.is/');
    if (!response.ok) throw new Error('Falha ao consultar localização');

    const data = await response.json();
    if (!data.success || !data.city) throw new Error('Cidade indisponível');

    const region = data.region_code || data.region || '';
    visitorCity.textContent = region ? `${data.city}, ${region}` : data.city;
    if (locationStatus) locationStatus.textContent = '· localização aproximada pelo IP';
  } catch (error) {
    visitorCity.textContent = 'sua região';
    if (locationStatus) locationStatus.textContent = '· localização aproximada indisponível';
  }
}

loadVisitorCity();

const productButtons = document.querySelectorAll('[data-product]');
const selectedProduct = document.querySelector('#selected-product');
const selectedHelper = document.querySelector('#selected-helper');
const orderButton = document.querySelector('#order-button');

productButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;

    productButtons.forEach((item) => {
      item.classList.remove('active');
      item.textContent = 'Quero esse';
    });

    button.classList.add('active');
    button.textContent = 'Selecionado ✓';

    selectedProduct.textContent = product;
    selectedHelper.textContent = 'Perfeito. Agora esse botão pode ser conectado ao seu WhatsApp, checkout ou formulário.';
    orderButton.classList.remove('disabled');
    orderButton.removeAttribute('aria-disabled');
    orderButton.setAttribute('href', '#pedido');

    document.querySelector('#pedido')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

const revealTargets = document.querySelectorAll('.section-heading, .product-card, .process-header, .step-card, .why-copy, .why-visual, .order-copy, .order-box');
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
