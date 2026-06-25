# Project guide for Claude

## What this project is
A static, single-page web tool (`index.html`) that converts voltage-vs-time data
into heat flux using the Cook-Felderman method. **No build step, no framework, no
Node project** — plain HTML/CSS/JS, with libraries loaded via CDN.

## Animations — ALWAYS reuse `assets/motion-animations.js`
When building **any new web page or section** in this repo, use the shared
animation helpers instead of hand-writing animation JS or pulling in another
library. They are built on **Motion** (the vanilla-JS library by the Framer
Motion team) and work with simple HTML attributes.

### How to add animations to a new page
1. Mark up elements with `data-animate`:
   ```html
   <h1 data-animate="fade-up">Title</h1>
   <div data-animate="zoom-in" data-animate-delay="0.2">Card</div>
   ```
2. Initialise once, near the end of `<body>`:
   ```html
   <script type="module">
     import { initAnimations } from "./assets/motion-animations.js";
     initAnimations();
   </script>
   ```
   (Adjust the relative path to `assets/` for pages in subfolders.)

### Available attributes
- `data-animate`: `fade-in`, `fade-up`, `fade-down`, `fade-left`, `fade-right`,
  `zoom-in`, `zoom-out`.
- `data-animate-on`: `scroll` (default — animates when scrolled into view) or
  `load` (animates immediately).
- `data-animate-delay`: delay in seconds (e.g. `0.2`).
- `data-animate-duration`: duration in seconds (default `0.6`).
- `data-animate-stagger` (on a **container**): stagger its direct
  `[data-animate]` children by N seconds, e.g. `data-animate-stagger="0.1"`.
- `data-hover="lift"`: gentle lift on hover (good for buttons/cards).

For advanced needs, the raw Motion API is re-exported:
```js
import { animate, inView, stagger } from "./assets/motion-animations.js";
```

### Conventions
- Prefer declarative `data-animate` attributes over custom JS.
- Keep elements visible by default (progressive enhancement) so content still
  shows if the CDN is blocked.
- `prefers-reduced-motion` is respected automatically by `initAnimations()`.
- Motion is pinned to `motion@11.11.13` via jsDelivr — keep the version in sync
  if you upgrade.
