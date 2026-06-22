# IEEE Ignite 2026

IEEE Ignite is a premium, single-page web portal designed for the **IEEE Student Branch LBSITW** annual flagship event. It features a filterable event catalog, interactive timetable timeline, custom animated accordion FAQs, and modern dark-mode aesthetics.

## 🌐 Live Demo

The website is deployed and hosted on GitHub Pages:
👉 **[https://reshmirajs.github.io/ieee-ignite-demo/](https://reshmirajs.github.io/ieee-ignite-demo/)**

---

## ✨ Features

- **Event Dashboard**: Dynamic list of sessions with tags, descriptions, speakers, times, and venues.
- **Advanced Categorization**: Tabbed category filters (Technical, Professional, Interactive) to easily explore events.
- **Real-time Search & Text Highlighting**: Instantaneous filtering as you type, complete with safe `<mark>` tags highlighting the matching keywords in headings.
- **Staggered Animations**: Fluid fade-in animations that stagger cards as they enter the screen.
- **Visual Timetable Timeline**: A vertical schedule timeline using custom gradients, dot indicators, and detail cards.
- **Animated FAQ Accordion**: Custom JavaScript accordion component utilizing modern accessibility controls (`aria-expanded`, `aria-controls`) and smooth arrow rotation.
- **Scroll Progress & Back-to-Top**: A progress indicator bar at the top of the viewport and a floating scroll-to-top button that fades in once you scroll past 300px.
- **Responsive Mobile Navigation**: Adaptive navigation bar with a hamburger-to-cross menu toggle button designed to wrap into a clean vertical dropdown on tablets and smartphones.

---

## 🛠️ Built With

- **HTML5**: Structured semantic markup, keyboard accessibility support (`skip-link`, `tabindex`, correct focus outlines).
- **CSS3 (Vanilla)**: High-end aesthetics featuring custom property tokens, glassmorphism (`backdrop-filter`), CSS Grid & Flexbox, smooth transition curves, and custom scrollbar definitions.
- **JavaScript (ES6+)**: Custom DOM manipulation, regex text highlighter, scroll listeners, and responsive event handlers.

---

## 📂 Project Structure

```text
├── index.html   # Main webpage markup containing sections (Hero, About, Events, Schedule, FAQ)
├── styles.css   # CSS style guidelines, color palettes, responsive media queries, and animations
├── script.js    # Client-side routing, filtering search query logic, FAQ triggers, and utilities
└── README.md    # Repository documentation and guide
```

---

## 🚀 Getting Started

Since this is a lightweight static site built with vanilla HTML, CSS, and JS, there are no dependencies to install!

### Method 1: Local Server (Recommended)
To run the project locally with correct absolute/relative path behaviors, you can start a simple server from the root directory:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

**Using Node.js (`http-server`):**
```bash
npx http-server
```

### Method 2: Direct Execution
Simply open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, Edge) by double-clicking it.

