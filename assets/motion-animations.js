// motion-animations.js
// Reusable animation helpers built on Motion (the vanilla-JS library by the
// Framer Motion team). Drop this into ANY webpage and animate elements with
// simple HTML attributes — no per-page JavaScript required.
//
// USAGE (in any HTML file):
//   <script type="module">
//     import { initAnimations } from "./assets/motion-animations.js";
//     initAnimations();
//   </script>
//
// Then mark up elements:
//   <h1 data-animate="fade-up">Hello</h1>
//   <div data-animate="zoom-in" data-animate-delay="0.2">Card</div>
//
//   <!-- Stagger children of a container: -->
//   <div data-animate-stagger="0.1">
//     <div data-animate="fade-up">1</div>
//     <div data-animate="fade-up">2</div>
//   </div>
//
//   <!-- Animate on scroll instead of on load: -->
//   <section data-animate="fade-up" data-animate-on="scroll">...</section>
//
//   <!-- Continuous hover lift: -->
//   <button data-hover="lift">Click me</button>
//
// Supported data-animate values: fade-in, fade-up, fade-down, fade-left,
// fade-right, zoom-in, zoom-out.
// Optional: data-animate-delay (seconds), data-animate-duration (seconds),
// data-animate-on ("load" | "scroll", default "scroll").

import {
  animate,
  inView,
  stagger,
} from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

// Re-export the raw Motion API so advanced pages can use it directly.
export { animate, inView, stagger };

const PRESETS = {
  "fade-in": { opacity: [0, 1] },
  "fade-up": { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0)"] },
  "fade-down": { opacity: [0, 1], transform: ["translateY(-24px)", "translateY(0)"] },
  "fade-left": { opacity: [0, 1], transform: ["translateX(24px)", "translateX(0)"] },
  "fade-right": { opacity: [0, 1], transform: ["translateX(-24px)", "translateX(0)"] },
  "zoom-in": { opacity: [0, 1], transform: ["scale(0.92)", "scale(1)"] },
  "zoom-out": { opacity: [0, 1], transform: ["scale(1.08)", "scale(1)"] },
};

const prefersReducedMotion = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function buildOptions(el) {
  const opts = { duration: 0.6 };
  const delay = parseFloat(el.getAttribute("data-animate-delay"));
  const duration = parseFloat(el.getAttribute("data-animate-duration"));
  if (!Number.isNaN(delay)) opts.delay = delay;
  if (!Number.isNaN(duration)) opts.duration = duration;
  return opts;
}

function play(el) {
  const keyframes = PRESETS[el.getAttribute("data-animate")] || PRESETS["fade-up"];
  animate(el, keyframes, buildOptions(el));
}

/**
 * Initialise all declarative animations on the page.
 * Safe to call once after the DOM is ready (or via `defer`/module scripts).
 */
export function initAnimations(root = document) {
  // If the user prefers reduced motion, ensure everything is simply visible.
  if (prefersReducedMotion()) {
    root.querySelectorAll("[data-animate]").forEach((el) => {
      el.style.opacity = "1";
    });
    return;
  }

  // 1) Staggered containers.
  root.querySelectorAll("[data-animate-stagger]").forEach((container) => {
    const amount = parseFloat(container.getAttribute("data-animate-stagger")) || 0.1;
    const children = container.querySelectorAll(":scope > [data-animate]");
    if (!children.length) return;
    const onScroll =
      (container.getAttribute("data-animate-on") || "scroll") === "scroll";
    const run = () => {
      const keyframes =
        PRESETS[children[0].getAttribute("data-animate")] || PRESETS["fade-up"];
      animate(children, keyframes, { duration: 0.6, delay: stagger(amount) });
    };
    if (onScroll) {
      inView(container, () => run(), { amount: 0.2 });
    } else {
      run();
    }
  });

  // 2) Standalone elements (skip those already handled inside a stagger group).
  root.querySelectorAll("[data-animate]").forEach((el) => {
    if (el.closest("[data-animate-stagger]") && el.parentElement.matches("[data-animate-stagger]")) {
      return; // handled by its stagger container
    }
    const mode = el.getAttribute("data-animate-on") || "scroll";
    if (mode === "load") {
      play(el);
    } else {
      inView(el, () => play(el), { amount: 0.2 });
    }
  });

  // 3) Hover interactions.
  root.querySelectorAll('[data-hover="lift"]').forEach((el) => {
    el.style.willChange = "transform";
    el.addEventListener("mouseenter", () =>
      animate(el, { transform: "translateY(-4px)" }, { duration: 0.2 })
    );
    el.addEventListener("mouseleave", () =>
      animate(el, { transform: "translateY(0)" }, { duration: 0.2 })
    );
  });
}

// Auto-init when loaded with the `data-auto` flag, e.g.:
//   <script type="module" src="./assets/motion-animations.js" data-auto></script>
if (document.currentScript && document.currentScript.hasAttribute("data-auto")) {
  if (document.readyState !== "loading") initAnimations();
  else document.addEventListener("DOMContentLoaded", () => initAnimations());
}
