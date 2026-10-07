import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "./lenis";

/**
 * Resets scroll to the top of the page on every route change.
 *
 * Two things had to be true for the old "scroll opens near the
 * footer" bug to actually go away, and the previous implementation
 * (living inside <LenisProvider>) only had one of them:
 *
 *   1. Our own reset has to run before the browser ever paints the
 *      new route at the old scroll position. useLayoutEffect (fires
 *      synchronously after the DOM commits, before paint) instead of
 *      useEffect (deferred until after paint) is what actually
 *      guarantees that — the previous version's useEffect could let
 *      a frame of the new page render at the old scrollY first.
 *   2. The browser's own back/forward scroll memory
 *      (history.scrollRestoration) has to be turned off. It defaults
 *      to "auto", which silently restores the scroll position a
 *      history entry had *before* React Router or this effect ever
 *      runs — the one navigation path ("Browser route changes" /
 *      back-forward) no in-app scroll-to-top can out-race.
 *
 * Mounted once, globally, inside <BrowserRouter> (see App.jsx) so it
 * covers every navigation path: Navbar links, Footer links, CTA
 * buttons, programmatic `navigate()` calls, and back/forward.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isFirstRun = useRef(true);

  // Disabled once, up front — not per navigation — since it's a
  // one-time browser setting, not something tied to any single route.
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    // Skip the very first mount: the browser already opens whatever
    // URL was requested at the correct position (including deep links
    // like `/#contact`), and forcing scroll 0 here would fight that.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const lenis = getLenis();
    if (lenis) {
      // Routed through Lenis (rather than a raw window.scrollTo) so
      // the eased scroller and the real scrollTop never disagree
      // about where the page is — same reasoning as scrollToTarget.
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // The new route is an entirely different DOM tree/height — every
    // existing ScrollTrigger (this page's own, plus the global world
    // trackers on Home) needs to recompute against it. Deferred one
    // frame so it runs once the new page's own layout has settled,
    // rather than racing its first paint.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
