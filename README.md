# THE LUXURY PERFUMES

**Part 3:** Professional redesign — visual identity, interaction and responsive polish

A black-and-gold haute parfumerie website for a South African fragrance house featuring
curated collections from Chanel, Dior, Valentino, Versace and Dolce & Gabbana.

Live site: <https://thakgalomaibela04.github.io/LUXURYPERFUMES/>

---

## Visual Identity

The site now uses one deliberate palette instead of mixed themes. Every colour is a token
declared once in `CSS/style.css` under `:root`, so the whole site can be re-toned from one place.

| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#0a0a0b` | Page background |
| `--panel` | `#16161a` | Cards, panels, drawers |
| `--gold` | `#c6a15b` | Primary accent, rules, links, buttons |
| `--gold-soft` | `#e2c795` | Hover states, italic accents |
| `--ivory` | `#f7f3ea` | Headings on dark |
| `--text` | `#ece6db` | Body copy |
| `--muted` | `#a79e92` | Secondary copy |

**Typography:** Cormorant Garamond (display serif) paired with Jost (sans) for UI text —
a classic luxury pairing of high-contrast serif headlines with a geometric, quiet sans.

**Photography:** product shots sit on a warm ivory studio gradient (`mix-blend-mode: multiply`),
so bottles read cleanly against dark cards. Two new textures (black silk, gold-veined marble)
carry the hero and quote panels.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Silk hero, maisons strip, featured houses, signature selections, services, press quote, VIP band |
| The Collection | `products.html` | 10 fragrances, live search, category filter, price/name sort, sliding shopping bag |
| About Us | `about.html` | House story, the three layers of fragrance, working principles |
| Boutiques | `contacts.html` | Johannesburg, Cape Town and Pretoria cards, embedded map, concierge directory |
| Enquiries | `enquiries.html` | Validated enquiry form (sourcing, bespoke, gifting) |
| Client Login | `login.html` | Demonstration login |
| Create Account | `signup.html` | Demonstration registration |
| Sitemap | `sitemap.html` | Every page and supporting file |

---

## Folder Structure

```
LUXURYPERFUMES/
├── CSS/
│   └── style.css          # Single design-system stylesheet
├── images/                # Logo, product photography, silk & marble textures
├── js_assets/
│   ├── main.js            # Navigation, scroll reveal, filtering, cart drawer
│   ├── cart.js            # Shopping bag (localStorage)
│   └── forms.js           # Registration & login
├── index.html
├── products.html
├── about.html
├── enquiries.html
├── contacts.html
├── signup.html
├── login.html
├── sitemap.html
├── README.md
└── .gitattributes
```

---

## Interaction

- **Sticky, blur-backed header** that condenses on scroll.
- **Mobile navigation** with accessible toggle (`aria-expanded`, Escape to close).
- **Scroll reveal** on cards and sections via `IntersectionObserver` (respects `prefers-reduced-motion`).
- **Catalogue:** instant search, Women/Men filtering, sort by price or name, live result count and empty state.
- **Shopping bag:** slide-out drawer, quantity controls, subtotal, persisted in `localStorage`, badge count on every page.
- **Forms:** inline validation with accessible status messages (`role="status"`, `aria-live`).

---

## How to View / Test

1. Clone or download this repository.
2. Open `index.html` in a modern browser, or serve the folder:
   `python3 -m http.server 8000`
3. In DevTools → Toggle device toolbar, test the breakpoints:
   - Desktop ≥ 1181 px (full horizontal navigation)
   - ≤ 1180 px (navigation collapses to a menu button)
   - ≤ 1024 px (single-column feature and form layouts)
   - ≤ 620 px (single-column cards, full-width buttons)
   - ≤ 430 px

---

## Technologies Used

- **HTML5** — semantic elements: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
- **CSS3** — custom properties, Flexbox, Grid, `clamp()` fluid type, `aspect-ratio`, media queries,
  pseudo-elements, transitions, `backdrop-filter`, `mix-blend-mode`, reduced-motion support
- **JavaScript (ES5-safe)** — `IntersectionObserver`, `localStorage`, `CustomEvent`, `Intl.NumberFormat`
- **Google Fonts** — Cormorant Garamond, Jost (with local fallbacks)
- **GitHub Pages** — deployed via the Jekyll Pages workflow

---

## Changelog

### [Part 3 – Professional redesign] – October 2026

**Colour scheme fixed**
- Removed the conflicting `!important` overrides (dark theme + light theme + products-page theme all
  fighting for control of `body`, headings and links), which produced unpredictable colours per page.
- Introduced a single token palette (black, gold, ivory) documented above and applied consistently.

**Design**
- New display typography (Cormorant Garamond + Jost) replacing Times New Roman/Arial.
- Full-bleed silk hero, gold-veined marble quote panel, gold hairline rules and 0-radius detailing.
- Unified header with announcement bar, monogram lock-up and active-page state; shared four-column footer.
- Product photography normalised onto an ivory studio gradient for a consistent catalogue look.

**Content accuracy**
- Each product is now matched to the bottle actually photographed
  (Coco Mademoiselle Intense, Coco EDP, J'adore, Fahrenheit Parfum, Born In Roma Uomo / Uomo Intense,
  Bright Crystal, Crystal Noir, Pour Femme Intense, Light Blue Pour Homme).
- Removed duplicate products and duplicate cart IDs that merged separate bottles into one bag line.

**Functionality**
- Product filters and search now work (previously styled but not wired up).
- Shopping bag became a slide-out drawer with a live badge count across pages.
- Added sorting, result counts, empty states, deep links to products, and form validation messages.

**Images**
- `_image/` renamed to `images/` — Jekyll (GitHub Pages) ignores underscore-prefixed folders,
  which was why no images loaded on the live site.

### [Part 2 – CSS & Responsive Design] – September 2026

- Navigation standardised across pages; current page highlighted.
- Meaningful `alt` text on every product image and the logo.
- Removed obsolete presentational markup (`<font>`, `bgcolor`, `align`, fixed-width tables).
- Semantic HTML5 + CSS Grid/Flexbox layout replacing table layout.
- Proper `<label>`/`required` form fields and focus styles.
- `<meta name="viewport">` on every page.
- External stylesheet, CSS reset, typographic scale, box-shadow and hover states.
- Three responsive breakpoints; multi-column to single-column collapse; responsive images.

---

## References

Independent Institute of Education. 2026. *WEDE5020 – Web Development (Introduction) Module Guide*. Johannesburg: The Independent Institute of Education (Pty) Ltd.

Mozilla Developer Network (MDN). 2025. *CSS: Cascading Style Sheets*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed: 10 September 2026).

Mozilla Developer Network (MDN). 2025. *Using media queries*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries (Accessed: 12 September 2026).

Mozilla Developer Network (MDN). 2025. *CSS Flexible Box Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout (Accessed: 11 September 2026).

Mozilla Developer Network (MDN). 2025. *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed: 11 September 2026).

Mozilla Developer Network (MDN). 2025. *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 20 October 2026).

W3C. 2024. *HTML Living Standard*. Available at: https://html.spec.whatwg.org/ (Accessed: 8 September 2026).

Google. 2025. *Responsive web design basics*. Available at: https://web.dev/responsive-web-design-basics/ (Accessed: 13 September 2026).

Google Fonts. 2026. *Cormorant Garamond & Jost*. Available at: https://fonts.google.com/ (Accessed: 20 October 2026).
