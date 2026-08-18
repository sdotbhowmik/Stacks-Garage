# StackGarage — Website
Preview: https://sdotbhowmik.github.io/Stacks-Garage/

Professional, multi-page website for **StackGarage**, a Bangladesh-based software firm offering web development, mobile apps, hosting, domain registration, software customization and more.

> **Status:** Frontend-only (no backend). Pure HTML5 + CSS + vanilla JS — no frameworks, no build step.

---

## ✨ Highlights

- **Pages:** Home, Services, Portfolio, About, Pricing, Contact
- **Languages:** English + Bengali (toggle in navbar, persisted in `localStorage`)
- **Alternating theme:** Dark teal + Light teal sections alternate down every page (no toggle complexity, every section reads as fresh)
- **Logo auto-swap:** `WhiteLogo.png` shows on dark sections, `blacklogo.png` on light — driven by IntersectionObserver
- **Hero:** Futuristic orbitals, perspective grid, cityscape, floating tech icons, sci-fi chamfered CTA — refactored from the original `Programming Hero teal clone` sample
- **Typewriter** cycles through phrases defined in `lang/*.json`
- **Animations:** Orbital spins, parallax floaters, scroll-reveal, count-up counters, marquee tech stack, testimonial carousel, FAQ accordion
- **Responsive:** Mobile-first with breakpoints at 1280 / 1024 / 900 / 640 / 380
- **Accessible:** Semantic HTML, ARIA labels, keyboard-friendly nav/drawer/FAQ, `prefers-reduced-motion` respected
- **Form validation:** Client-side validation + success toast (no backend wired)
- **Performance:** Zero external runtime dependencies (only Google Fonts), lazy-loaded images

---

## 📁 Project Structure

```
StackGarage/
├── index.html              # Home — hero, trust, services, why, stack,
│                           #        process, portfolio preview, stats,
│                           #        testimonials, CTA, FAQ
├── services.html           # All 6 services detailed with feature lists
├── portfolio.html          # 9 project grid with category filter
├── about.html              # Story, team (4), mission/vision/values
├── pricing.html            # Hosting plans + project starting prices + FAQ
├── contact.html            # Form (with validation) + contact info + map
│
├── css/
│   ├── base.css            # Tokens, reset, typography, both themes
│   ├── layout.css          # Header, footer, section frames, hero frame
│   ├── components.css      # Cards, buttons, forms, FAQ, accordion, marquee, ...
│   ├── animations.css      # All keyframes (float, spin, marquee, blink, reveal, ...)
│   └── responsive.css      # All breakpoints
│
├── js/
│   ├── i18n.js             # EN/BN toggle + dictionary lookup + form placeholders
│   ├── typewriter.js       # Hero animation, reads phrases from i18n
│   ├── menu.js             # Burger + drawer + logo swap + scroll-spy
│   ├── animations.js       # Reveal-on-scroll, counter, back-to-top
│   ├── carousel.js         # Testimonial arrow nav (CSS scroll-snap)
│   ├── portfolio.js        # Category filter
│   ├── faq.js              # FAQ accordion
│   ├── form-validation.js  # Validation + success toast
│   └── main.js             # Smooth-scroll anchors + hero parallax
│
├── lang/
│   ├── en.json             # All English copy, nested by section
│   └── bn.json             # All Bengali copy, mirrored structure
│
└── assets/
    ├── img/
    │   ├── logos/          # blacklogo.png, WhiteLogo.png (your originals)
    │   └── portfolio/      # 9 SVG project placeholders (vector, theme-matched)
    └── icons/              # Reserved for any extracted SVG icons
```

---

## 🚀 Run locally

This project is fully static — just open `index.html` in any modern browser. For best results (so `fetch('lang/*.json')` works for the language toggle), serve via any tiny static server:

```powershell
# From the project root (any of these works):
python -m http.server 8080
# or:
npx serve .
# then open http://localhost:8080
```

> The language toggle uses `fetch()` to load `lang/en.json` / `lang/bn.json`. Opening `index.html` directly with `file://` works fine in most browsers because i18n graceful-degrades if fetch fails (English copy is also authored directly in the HTML as a fallback).

---

## 🌐 Internationalization

- Toggle: top-right of navbar (`EN` / `বাং`)
- Selection persisted in `localStorage.sg_lang`
- Add a new language:
  1. Copy `lang/en.json` → `lang/ar.json` (or any code)
  2. Translate every string
  3. In `js/i18n.js`, add another `<button data-lang="ar">` to `.lang-toggle`
  4. Add the `<link>` font for that language in every HTML page's `<head>`

Every translatable string in HTML uses `data-i18n="path.to.string"` (text) or `data-i18n-placeholder="path.to.string"` (input placeholder) or `data-i18n-options="path.to.array"` (select options).

---

## 🎨 Design System

### Colors (defined in `css/base.css :root`)
| Token              | Dark value | Light value (in `.section-light`) |
| ------------------ | ---------- | --------------------------------- |
| `--bg`             | `#010b0f`  | `#f8fafc`                         |
| `--text`           | `#ffffff`  | `#0f172a`                         |
| `--accent`         | `#00f2fe`  | `#0d9488`                         |
| `--border`         | rgba teal  | rgba teal                         |

### Typography
- **Inter** — body
- **Space Grotesk** — display/headings
- **Noto Sans Bengali** — body in Bengali mode

### Logo rules
- **`WhiteLogo.svg`** — 175×80 (Layout A), pure SVG vector. Use on dark backgrounds (default body, `.section--dark`, `.site-footer`)
- **`blacklogo.svg`** — 175×80 (Layout A), pure SVG vector with teal-dark palette. Use on light backgrounds (`.section-light`)
- **`StackGarage-mark.svg`** — 200×200 pure vector mark. Used as favicon + hero watermark
- Composition: pentagon-star network mark on the left + **"STACKS GARAGE"** wordmark on the right (Space Grotesk Bold, drawn via SVG `<text>` so it scales without artifacts)
- Wordmark uses `textLength` + `lengthAdjust="spacingAndGlyphs"` to lock consistent width across renderers
- Original PNGs preserved in `assets/img/logos/legacy/` for fallback / brand reference
- Logos auto-swap — `js/menu.js:initLogoSwap` watches section classes via IntersectionObserver
- All three logos animate:
  - One-shot hero-load line draw + node scale-in (handled inside each SVG)
  - Idle 4.4s breathing pulse on network nodes
  - Hover via `:hover` in SVG `<style>` brightens nearest nodes
  - `js/logo.js` re-triggers hero draw when the tab regains visibility
- All animation is wrapped in `@media (prefers-reduced-motion: reduce)`
- If Space Grotesk font fails to load, fallback to `system-ui → -apple-system → Inter` — still readable

---

## ✏️ Editing content

### Company info, addresses, phone numbers
- Address, phone, email, hours → `contact.html` (look for the `contact-info__item` blocks) **and** `lang/en.json` → `contact.info.*`

### Services
- Card titles/text → `index.html` (`#services` section) **and** `lang/en.json` → `services.items.*`
- Detailed service pages → `services.html`

### Portfolio projects
- Add an `<article class="portfolio-card" data-category="web|apps|hosting|custom software">` block in `portfolio.html`
- Drop the project thumbnail as `assets/img/portfolio/yourname.svg` (or `.jpg/.png` — keep size < 80 KB)

### Testimonials
- `index.html` → `#testimonials .testimonials__track` (each card has the same shape)

### Pricing
- Hosting plans → `pricing.html` (`.plan` cards) **and** `lang/en.json` → `pricing.plans`

### Team
- `about.html` → `#team .team__card` (4 cards by default)

---

## 🖼 Replacing placeholder SVGs

All 9 project thumbnails in `assets/img/portfolio/*.svg` are vector placeholders matching the teal theme. To use real screenshots:
1. Export PNG/JPG screenshots from your projects (recommended 1200×800, < 200 KB each)
2. Replace the file at the same path with the same name (or edit `src=` in `index.html` / `portfolio.html`)
3. Keep `loading="lazy"` attribute for performance

---

## 🔧 Adding new pages

1. Copy any existing page (e.g., `about.html`) as a template
2. Update the `<title>`, meta description and `page-hero` content
3. Mark the right nav link with `class="nav__link is-active"`
4. Update `lang/en.json` if you want it translated to Bengali as well
5. Don't forget to link all CSS files in the `<head>` and all JS files before `</body>`

---

## 📜 Browser support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+

Uses: CSS Grid, custom properties, IntersectionObserver, scroll-snap, clip-path. Falls back gracefully on older browsers.

---

## 📝 License & Credits

- Brand assets (`blacklogo.png`, `WhiteLogo.png`): owned by StackGarage
- Icons: Inline SVG, original
- Fonts: [Inter](https://rsms.me/inter/) (OFL), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (OFL), [Noto Sans Bengali](https://fonts.google.com/noto/specimen/Noto+Sans+Bengali) (OFL)
- Map embed: OpenStreetMap (ODbL)

---

**Built with care in Dhaka, Bangladesh.** 🇧🇩
"# Stacks-Garage" 
