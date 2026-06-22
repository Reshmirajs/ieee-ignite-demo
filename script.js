const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const eventCards = Array.from(document.querySelectorAll('.event-card'));
const emptyState = document.getElementById('emptyState');
const mobileQuery = window.matchMedia('(max-width: 760px)');
const mobileMenuButton = document.getElementById('mobileMenuToggle');

let activeFilter = 'all';
let searchTerm = '';

function updateEvents() {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  let visibleCount = 0;

  eventCards.forEach((card) => {
    const category = card.dataset.category;
    const name = card.dataset.name.toLowerCase();
    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = !normalizedSearch || name.includes(normalizedSearch);
    const shouldShow = matchesFilter && matchesSearch;

    card.classList.toggle('hidden', !shouldShow);
    if (shouldShow) {
      visibleCount += 1;
    }
  });

  emptyState.hidden = visibleCount !== 0;
}

function updateMobileMenuState() {
  const isOpen = navLinks.classList.contains('open');
  const shouldShowMobileMenu = mobileQuery.matches && (window.scrollY > 120 || isOpen);

  document.body.classList.toggle('mobile-menu-ready', shouldShowMobileMenu);
  mobileMenuButton.setAttribute('aria-expanded', String(isOpen));

  // Toggle between hamburger and close icon
  menuToggle.textContent = isOpen ? '✕' : '☰';
  mobileMenuButton.textContent = isOpen ? '✕' : '☰';

  if (!mobileQuery.matches) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-ready');
    menuToggle.textContent = '☰';
    mobileMenuButton.textContent = '☰';
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    updateEvents();
  });
});

searchInput.addEventListener('input', (event) => {
  searchTerm = event.target.value;
  updateEvents();
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  updateMobileMenuState();
});

mobileMenuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
  updateMobileMenuState();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    updateMobileMenuState();
    (mobileQuery.matches ? mobileMenuButton : menuToggle).focus();
  }
});

navLinks.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    updateMobileMenuState();
  }
});

window.addEventListener('scroll', updateMobileMenuState, { passive: true });
window.addEventListener('resize', updateMobileMenuState);

updateMobileMenuState();

updateEvents();
