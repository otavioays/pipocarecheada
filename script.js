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

let selectedSize = '';
let selectedPrice = '';
let selectedPopcorn = '';

const sizeButtons = document.querySelectorAll('[data-size]');
const popcornButtons = document.querySelectorAll('[data-popcorn]');
const filling1 = document.querySelector('#filling-1');
const filling2 = document.querySelector('#filling-2');
const summaryText = document.querySelector('#builder-summary-text');
const builderOrder = document.querySelector('#builder-order');

function updateBuilderSummary() {
  const first = filling1?.value || '';
  const second = filling2?.value || '';

  const parts = [];
  if (selectedSize) parts.push(`${selectedSize} (${selectedPrice})`);
  if (selectedPopcorn) parts.push(`pipoca ${selectedPopcorn}`);
  if (first || second) {
    const fillings = [first, second].filter(Boolean).join(' + ');
    if (fillings) parts.push(fillings);
  }

  if (summaryText) {
    summaryText.textContent = parts.length
      ? parts.join(' · ')
      : 'Escolha o tamanho, a pipoca e os dois recheios.';
  }

  const isComplete = Boolean(selectedSize && selectedPopcorn && first && second);
  if (builderOrder) {
    builderOrder.classList.toggle('disabled', !isComplete);
    if (isComplete) {
      builderOrder.removeAttribute('aria-disabled');
      builderOrder.setAttribute('href', '#monte');
    } else {
      builderOrder.setAttribute('aria-disabled', 'true');
      builderOrder.setAttribute('href', '#monte');
    }
  }
}

sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedSize = button.dataset.size || '';
    selectedPrice = button.dataset.price || '';

    sizeButtons.forEach((item) => {
      item.classList.remove('active');
      item.textContent = 'Escolher';
    });

    button.classList.add('active');
    button.textContent = 'Selecionado ✓';
    updateBuilderSummary();

    document.querySelector('#monte')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

popcornButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedPopcorn = button.dataset.popcorn || '';
    popcornButtons.forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
    updateBuilderSummary();
  });
});

filling1?.addEventListener('change', updateBuilderSummary);
filling2?.addEventListener('change', updateBuilderSummary);

builderOrder?.addEventListener('click', (event) => {
  const first = filling1?.value || '';
  const second = filling2?.value || '';
  const isComplete = Boolean(selectedSize && selectedPopcorn && first && second);

  if (!isComplete) {
    event.preventDefault();
    return;
  }

  builderOrder.textContent = 'Combinação pronta ✓';
});

const revealTargets = document.querySelectorAll('.section-heading, .product-card, .builder-head, .builder-step, .why-copy, .why-visual');
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
