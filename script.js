const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const eventCards = Array.from(document.querySelectorAll('.event-card'));
const emptyState = document.getElementById('emptyState');
const mobileQuery = window.matchMedia('(max-width: 991px)');

let activeFilter = 'all';
let searchTerm = '';

// Helper function to escape special characters for regex search
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Update active cards based on search and filters
function updateEvents() {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  let visibleCount = 0;

  eventCards.forEach((card) => {
    const category = card.dataset.category;
    const name = card.dataset.name;
    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = !normalizedSearch || name.toLowerCase().includes(normalizedSearch);
    const shouldShow = matchesFilter && matchesSearch;

    card.classList.toggle('hidden', !shouldShow);

    // Text highlighting for search matches
    const heading = card.querySelector('h3');
    if (normalizedSearch && shouldShow) {
      const regex = new RegExp(`(${escapeRegExp(normalizedSearch)})`, 'gi');
      heading.innerHTML = name.replace(regex, '<mark>$1</mark>');
    } else {
      heading.textContent = name;
    }

    if (shouldShow) {
      visibleCount += 1;
      // Staggered micro-animations
      card.style.animationDelay = `${(visibleCount - 1) * 0.05}s`;
      card.classList.add('card-animate');
    } else {
      card.classList.remove('card-animate');
    }
  });

  // Update dynamic count indicator
  const counterElement = document.getElementById('eventCounter');
  if (counterElement) {
    counterElement.textContent = `Showing ${visibleCount} of ${eventCards.length} events`;
  }

  emptyState.hidden = visibleCount !== 0;
}

// Toggle mobile menu state
function toggleMobileMenu(forceState) {
  const isOpen = typeof forceState === 'boolean' ? forceState : navLinks.classList.toggle('open');
  if (typeof forceState === 'boolean') {
    navLinks.classList.toggle('open', isOpen);
  }
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
}

// Event Listeners for Filters
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    updateEvents();
  });
});

// Event Listener for Search Input
searchInput.addEventListener('input', (event) => {
  searchTerm = event.target.value;
  updateEvents();
});

// Mobile menu toggle click
menuToggle.addEventListener('click', () => {
  toggleMobileMenu();
});

// Escape key to close mobile menu
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    toggleMobileMenu(false);
    menuToggle.focus();
  }
});

// Click nav link to close menu
navLinks.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    toggleMobileMenu(false);
  }
});

// Cleanup when resizing back to desktop sizes
window.addEventListener('resize', () => {
  if (!mobileQuery.matches) {
    toggleMobileMenu(false);
  }
});

// Custom FAQ accordion functionality via JS
const faqTriggers = document.querySelectorAll('.faq-trigger');
faqTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    // Accordion mode: Close all other panels
    faqTriggers.forEach((otherTrigger) => {
      if (otherTrigger !== trigger) {
        otherTrigger.setAttribute('aria-expanded', 'false');
        const otherPanel = document.getElementById(otherTrigger.getAttribute('aria-controls'));
        otherPanel.hidden = true;
        otherTrigger.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
      }
    });

    trigger.setAttribute('aria-expanded', String(!isExpanded));
    panel.hidden = isExpanded;
    trigger.querySelector('.faq-icon').style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
  });
});

// Scroll progress bar and floating Back-to-Top button
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }

  if (backToTop) {
    if (winScroll > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initial triggers
updateEvents();
