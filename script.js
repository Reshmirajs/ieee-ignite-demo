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

function toggleMobileMenu(forceState) {
  const isOpen = typeof forceState === 'boolean' ? forceState : navLinks.classList.toggle('open');
  if (typeof forceState === 'boolean') {
    navLinks.classList.toggle('open', isOpen);
  }
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
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
  toggleMobileMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    toggleMobileMenu(false);
    menuToggle.focus();
  }
});

navLinks.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    toggleMobileMenu(false);
  }
});

window.addEventListener('resize', () => {
  if (!mobileQuery.matches) {
    toggleMobileMenu(false);
  }
});

updateEvents();
