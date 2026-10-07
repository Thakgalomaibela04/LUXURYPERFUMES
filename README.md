# THE LUXURY PERFUMES

**Part 2:** Designing the Visuals – CSS Styling and Responsive Design  

A minimalist monochrome website for a luxury fragrance maison featuring curated collections from Chanel, Dior, Valentino, Versace and Dolce & Gabbana.

---

## Project Overview

This repository contains a multi-page static website built with semantic HTML5 and a single external CSS stylesheet. The site demonstrates:

- External CSS linked to every page
- CSS reset + consistent base styles (font family, colour scheme, spacing)
- Harmonious typography scale using relative units (`rem` / `em`)
- Modern layout techniques (CSS Flexbox and CSS Grid)
- Visual styling (colour, borders, box-shadow, hover / focus / active states)
- Fully responsive design with media queries and breakpoints
- Responsive images (`max-width: 100%`, proper `alt` attributes)
- Clean navigation that adapts from horizontal (desktop) to stacked (mobile)

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero section + featured fragrance houses |
| Products & Services | `products.html` | Product catalogue table + exclusive services |
| About Us | `about.html` | Brand story, fragrance pyramid & boutique philosophy |
| Enquiries | `enquiries.html` | Client enquiry form |
| Contacts | `contacts.html` | Flagship store locations + contact directory |
| Sign Up | `signup.html` | VIP registration form |
| Login | `login.html` | Client login form |

---

## Folder Structure
LUXURYPERFUMES/
├── CSS/
│   └── style.css          # Single external stylesheet
├── _image/                # Product & logo images
├── index.html
├── products.html
├── about.html
├── enquiries.html
├── contacts.html
├── signup.html
├── login.html
├── README.md              # This file (includes Changelog & References)
└── .gitattributes


---

## How to View / Test the Website

1. Clone or download this repository.
2. Open any `.html` file in a modern browser (Chrome, Firefox, Edge, Safari).
3. Use browser Developer Tools (F12) → Toggle device toolbar to test responsive breakpoints:
   - Desktop: ≥ 1025 px
   - Tablet: 769 px – 1024 px
   - Mobile: ≤ 768 px
   - Small mobile: ≤ 480 px
4. Resize the browser window or use device emulation to verify layout, typography, navigation and image behaviour.

---

## Technologies Used

- HTML5 (semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- CSS3
  - External stylesheet
  - CSS Reset
  - Custom properties (`:root` variables)
  - Flexbox & CSS Grid
  - Media queries
  - Relative units (`rem`, `em`, `%`)
  - Pseudo-classes (`:hover`, `:focus`, `:active`)
  - Transitions & box-shadow

---

## Changelog

All edits made after Part 1 feedback are recorded below so the lecturer can clearly see the improvements.

### [Part 2 – CSS & Responsive Design] – September 2026

#### Feedback Implementation (Part 1 corrections)

- **Navigation consistency:** Standardised the navigation bar across all pages (previously some pages used different spacing or bolding). Added a clear `.active` class so the current page is visually highlighted.
- **Image accessibility:** Added meaningful `alt` attributes to every product image and the logo for better accessibility and SEO.
- **Removed obsolete presentational markup:** Eliminated most `<font>`, `bgcolor`, `align`, and fixed-width table attributes. Styling is now controlled exclusively by the external CSS file (true cascading).
- **Semantic structure:** Replaced pure table-based layout with semantic HTML5 elements + CSS Grid / Flexbox while preserving the original content and luxury monochrome aesthetic.
- **Form improvements:** Added proper `<label>` elements linked to inputs (`for` / `id`), `required` attributes, and better keyboard focus styles.
- **Meta viewport:** Added `<meta name="viewport">` on every page so mobile browsers render the site correctly.

#### CSS Styling for Desktop (new)

- Created external stylesheet `CSS/style.css` and linked it on every page.
- Implemented a full CSS reset for consistent cross-browser rendering.
- Established a coherent base style: black-and-white colour scheme, Times New Roman serif typeface, consistent margin/padding scale.
- Built a clear typography scale (h1 → body) using relative units.
- Applied Flexbox for the main navigation and button groups.
- Applied CSS Grid for the featured houses section, location cards and communications grid.
- Added visual polish: subtle box-shadows, hover lift effects on cards, focus outlines for accessibility, and smooth transitions.
- Used the cascade effectively – most elements inherit from base rules, reducing the number of selectors needed.

#### Responsive Design (new)

- Defined three key breakpoints:
  - Tablet (max-width: 1024px) <img width="1060" height="933" alt="Screenshot 2026-09-16 144838" src="https://github.com/user-attachments/assets/ef8a1098-fd3f-48db-ae61-2fc91a7e8e1a" />


  - Mobile (max-width: 768px) <img width="820" height="954" alt="Screenshot 2026-09-16 144822" src="https://github.com/user-attachments/assets/6d1e7014-68b5-40c5-8026-1793ed907b9c" />

  - Small mobile (max-width: 480px)
- Converted multi-column layouts to single-column on smaller screens.
- Navigation changes from horizontal flex to vertical stacked menu on mobile.
- Product table becomes horizontally scrollable on small screens so data remains usable.
- All font sizes and spacing use relative units (`rem` / `%`) so they scale smoothly.
- Images are fully responsive (`max-width: 100%; height: auto`).
- Tested with browser developer tools across desktop, tablet and mobile viewports.

---

## References

Independent Institute of Education. 2026. *WEDE5020 – Web Development (Introduction) Module Guide*. Johannesburg: The Independent Institute of Education (Pty) Ltd.

Mozilla Developer Network (MDN). 2025. *CSS: Cascading Style Sheets*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed: 10 September 2026).

Mozilla Developer Network (MDN). 2025. *Using media queries*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries (Accessed: 12 September 2026).

Mozilla Developer Network (MDN). 2025. *CSS Flexible Box Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout (Accessed: 11 September 2026).

Mozilla Developer Network (MDN). 2025. *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed: 11 September 2026).

W3C. 2024. *HTML Living Standard*. Available at: https://html.spec.whatwg.org/ (Accessed: 8 September 2026).

Google. 2025. *Responsive web design basics*. Available at: https://web.dev/responsive-web-design-basics/ (Accessed: 13 September 2026).

