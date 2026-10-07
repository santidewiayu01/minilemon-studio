import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------
// Site-wide smooth scroll. This is the thing that makes every GSAP
// scroll effect on the page (ScrollWorld's color morph, the drone
// parallax, the storytelling frame-scrub, every future ScrollTrigger)
// read as "premium" rather than "web page" — raw wheel/touch deltas
// get eased into momentum before anything else ever sees them.
//
// Deliberately a single module-scoped instance instead of a React
// context: nothing about "is the page smooth-scrolling" needs to be
// re-rendered from, it just needs to exist exactly once for the
// lifetime of the app and be reachable from anywhere (including
// non-component code like anchor click handlers).
// ------------------------------------------------------------------
let lenisInstance = null;
let rafRegistered = false;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initLenis() {
  if (lenisInstance || prefersReducedMotion()) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.1,
    // Storytelling section relies on native `position: sticky` + its
    // own ScrollTrigger scrub; Lenis smoothing the *real* scrollTop
    // (rather than a transformed virtual scroller) is what keeps that
    // untouched and working exactly as before.
    autoRaf: false,
  });

  // Keep every existing ScrollTrigger (Hero parallax, storytelling
  // scrub, future WorldSeam morphs) in sync with Lenis's eased
  // position instead of the raw native scroll event.
  lenisInstance.on("scroll", ScrollTrigger.update);

  if (!rafRegistered) {
    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });
    // Lenis already smooths the motion itself; GSAP's own lag
    // smoothing on top of that fights it during any frame hitch.
    gsap.ticker.lagSmoothing(0);
    rafRegistered = true;
  }

  document.documentElement.classList.add("lenis");
  return lenisInstance;
}

export function destroyLenis() {
  if (!lenisInstance) return;
  lenisInstance.destroy();
  lenisInstance = null;
  document.documentElement.classList.remove("lenis");
}

export function getLenis() {
  return lenisInstance;
}

/**
 * Scroll to an element/selector/id, routed through Lenis when it's
 * running so in-page anchors (nav links, the hero CTAs, the footer)
 * get the same eased motion as everything else instead of a native
 * instant/step scroll.
 */
export function scrollToTarget(target, options = {}) {
  const el =
    typeof target === "string"
      ? document.querySelector(target.startsWith("#") ? target : `#${target}`)
      : target;
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset: 0,
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      ...options,
    });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}
