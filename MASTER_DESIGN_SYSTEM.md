# MASTER DESIGN SYSTEM
**Project:** YOSIA Portfolio  
**Reference:** jorge-template.framer.website  
**Last Updated:** 2025-12-26

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0F0F0F` | Background |
| `--color-text` | `#FFFFFF` | Primary text |
| `--color-text-muted` | `#888888` | Secondary text |
| `--color-border` | `#2A2A2A` | Borders, dividers |
| `--color-card-bg` | `#1A1A1A` | Card backgrounds |
| `--color-placeholder` | `#333333` | Placeholder images |

---

## Typography

**Font Family:** Inter (Google Fonts)

| Size Token | Value | Usage |
|------------|-------|-------|
| `--text-hero` | `clamp(3rem, 10vw, 8rem)` | Hero title |
| `--text-4xl` | `3rem` | Page titles |
| `--text-3xl` | `2rem` | Section titles |
| `--text-lg` | `1.125rem` | Subtitles |
| `--text-sm` | `0.875rem` | Labels, nav links |

**Weights:** 300, 400, 500, 600, 700

---

## Components

### Navigation
- Fixed position, `z-index: 100`
- Logo: uppercase, letter-spacing 0.1em
- Links: uppercase, opacity 0.6 → 1 on hover/active
- Mobile: Full-screen overlay menu

### Hero Section
- Full viewport height
- Centered content
- Title: `--text-hero`, bold
- Subtitle: muted color, uppercase

### Project Cards
- Aspect ratio: 4:5
- Image with gradient overlay
- Hover: image scale 1.05
- Placeholder state: gray background

### Service Cards
- Aspect ratio: 3:4
- Title at bottom, uppercase
- Hover: image scale 1.05

### Footer
- Border-top separator
- CTA section with title and link
- Social links: uppercase, opacity transitions

---

## Animations

| Name | Duration | Easing |
|------|----------|--------|
| `fadeInUp` | 0.8s | ease-out |
| Reveal | 0.5s | ease-out |
| Hover transitions | 0.15s | ease-out |

**Scroll Reveal:** IntersectionObserver with 100px offset
**Reduced Motion:** Respects `prefers-reduced-motion`

---

## Folder Structure

```
portfolio/
├── index.html
├── works.html
├── contact.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── animations.css
├── js/
│   └── main.js
└── MASTER_DESIGN_SYSTEM.md
```

---

## Edit Guide

**To add a project:**
1. Open `index.html` and `works.html`
2. Replace placeholder card with:
```html
<article class="project-card reveal">
  <img src="assets/images/project-name.jpg" alt="Description" class="project-card__image">
  <div class="project-card__content">
    <h3 class="project-card__title">Project Name</h3>
    <p class="project-card__category">Category</p>
  </div>
</article>
```

**To update contact info:**
- Edit `yosiamanullang@gmail.com` in all 3 HTML files
- Edit WhatsApp number `62895360148909` in footer links
