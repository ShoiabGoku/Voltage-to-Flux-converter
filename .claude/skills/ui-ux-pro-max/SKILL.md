---
name: ui-ux-pro-max
description: >-
  Premium UI/UX design system and checklist for building beautiful, modern,
  accessible web pages in this repo. Use this whenever the user asks to design,
  build, style, redesign, polish, or improve the look/feel of a web page,
  section, component, landing page, hero, card, form, or layout — or mentions
  UI, UX, design, styling, theme, "make it look good/professional/modern", or
  animations. Pairs with assets/motion-animations.js for motion.
---

# UI/UX Pro Max

A reusable, opinionated design system for crafting polished web pages in this
**plain HTML/CSS/JS** project (no framework, no build step). Apply this whenever
you create or improve any page or UI section.

## How to use this skill
1. Start from the **Design tokens** below — define them once as CSS custom
   properties in `:root`, then reference them everywhere. Never hardcode raw
   colors/sizes inline.
2. Build layout with the **Layout & spacing** rules (8px scale, max content
   width, generous whitespace).
3. Apply the **Component patterns** for buttons, cards, forms, navbars, heroes.
4. Add motion with the existing kit — see **Motion** section. Do NOT hand-write
   animation JS or add another animation library.
5. Before finishing, run the **Quality checklist**.

## Design tokens (drop into `:root`)
```css
:root {
  /* Color — pick ONE accent and stick to it */
  --bg:            #0b0f17;   /* page background (dark) */
  --surface:       #141a26;   /* cards / raised surfaces */
  --surface-2:     #1d2533;   /* hover / nested surfaces */
  --text:          #e6eaf2;   /* primary text */
  --text-muted:    #9aa6bd;   /* secondary text */
  --accent:        #4f8cff;   /* primary action */
  --accent-hover:  #6ba0ff;
  --border:        #263041;
  --success:       #3ddc97;
  --danger:        #ff5d6c;

  /* Typography */
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --fs-300: 0.875rem; --fs-400: 1rem; --fs-500: 1.25rem;
  --fs-600: 1.5rem;   --fs-700: 2rem; --fs-800: clamp(2.2rem, 5vw, 3.5rem);
  --lh-tight: 1.15; --lh-body: 1.6;

  /* Spacing — 8px scale */
  --sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px; --sp-4: 16px;
  --sp-6: 24px; --sp-8: 32px; --sp-12: 48px; --sp-16: 64px;

  /* Radius & shadow & motion */
  --radius:    14px;
  --radius-sm: 10px;
  --shadow:    0 8px 30px rgba(0,0,0,.25);
  --shadow-lg: 0 20px 60px rgba(0,0,0,.35);
  --ease:      cubic-bezier(.2,.7,.2,1);
  --maxw:      1100px;
}
```
> For a **light theme**, swap `--bg`/`--surface`/`--text` and keep the same
> structure. Always keep a single, consistent accent.

## Core principles
- **Hierarchy:** one clear focal point per screen. Size, weight, and color
  guide the eye. Don't make everything bold.
- **Whitespace is a feature.** Prefer more padding than feels necessary
  (`--sp-8`/`--sp-12` between sections).
- **Consistency:** reuse tokens, spacing scale, radius, and one accent color.
- **Contrast:** body text ≥ 4.5:1, large text ≥ 3:1 against its background.
- **Max ~70ch line length** for paragraphs; constrain content with `--maxw`.
- **Mobile-first & responsive:** design for small screens, enhance with
  `min-width` media queries and `clamp()` for fluid type.

## Layout & spacing
- Center content: `max-width: var(--maxw); margin-inline: auto; padding-inline: var(--sp-4);`
- Use CSS Grid for page sections and card galleries:
  `display:grid; gap:var(--sp-6); grid-template-columns:repeat(auto-fit,minmax(240px,1fr));`
- Use Flexbox for navbars, button rows, and inline alignment.
- Vertical rhythm: sections separated by `--sp-12`/`--sp-16`.

## Component patterns
**Button (primary):**
```css
.btn { font:600 var(--fs-400)/1 var(--font-sans); padding:var(--sp-3) var(--sp-6);
  border-radius:999px; border:1px solid transparent; cursor:pointer;
  transition:transform .15s var(--ease), background .15s var(--ease); }
.btn-primary { background:var(--accent); color:#fff; }
.btn-primary:hover { background:var(--accent-hover); transform:translateY(-2px); }
.btn-outline { background:transparent; color:var(--text); border-color:var(--border); }
:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
```
**Card:**
```css
.card { background:var(--surface); border:1px solid var(--border);
  border-radius:var(--radius); padding:var(--sp-6); box-shadow:var(--shadow);
  transition:transform .2s var(--ease), box-shadow .2s var(--ease); }
.card:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); }
```
**Navbar:** sticky, translucent, blurred:
`position:sticky; top:0; backdrop-filter:blur(10px); background:color-mix(in srgb, var(--bg) 80%, transparent); border-bottom:1px solid var(--border);`

**Hero:** big `--fs-800` headline, one-line value prop in `--text-muted`, a
primary + secondary CTA, plenty of top/bottom padding.

**Forms:** label every input, large hit targets (≥44px), visible focus,
inline validation, never rely on color alone for errors.

## Motion (reuse the existing kit)
Use `assets/motion-animations.js` (Motion by the Framer Motion team). Add
animations declaratively — never hand-roll animation JS or add another library.
```html
<h1 data-animate="fade-up">Title</h1>
<div data-animate-stagger="0.1">
  <div class="card" data-animate="fade-up">…</div>
  <div class="card" data-animate="fade-up">…</div>
</div>
<button class="btn btn-primary" data-hover="lift">Get started</button>
<script type="module">
  import { initAnimations } from "./assets/motion-animations.js";
  initAnimations();
</script>
```
Guidance: animate **on scroll** for below-the-fold content, **on load** only
for the hero; keep durations 0.4–0.6s; subtle distances (16–24px). Honor
`prefers-reduced-motion` (the kit already does).

## Accessibility (non-negotiable)
- Semantic HTML: `<header> <nav> <main> <section> <button> <a>` — not `<div>`s.
- All images need `alt`; decorative images use `alt=""`.
- Keyboard navigable; visible `:focus-visible` styles.
- Color contrast meets WCAG AA.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` where possible.

## Quality checklist (run before finishing)
- [ ] One accent color, tokens used consistently (no stray hex values).
- [ ] Clear visual hierarchy and a single focal point per section.
- [ ] Responsive at 360px, 768px, 1280px; no horizontal scroll.
- [ ] Text contrast passes AA; line length ≤ ~70ch.
- [ ] Buttons/links have hover + visible focus states.
- [ ] Semantic, accessible markup; images have alt text.
- [ ] Animations are subtle, reuse `motion-animations.js`, reduced-motion safe.
- [ ] Content still readable if the CDN/JS is blocked (progressive enhancement).
