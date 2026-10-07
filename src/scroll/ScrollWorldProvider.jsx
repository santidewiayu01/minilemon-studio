import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setWorldProgress, setChapterProgress, setActiveChapter } from "./worldProgress";
import { CHAPTERS, WORLD_START_ID, WORLD_END_ID } from "./chapters";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mount once per page that has a living world (currently just Home).
 * Renders nothing — it only drives the shared progress store
 * (worldProgress.js) that ScrollWorld's background and every chapter
 * component (division pipeline, portfolio, studio moments, the
 * finale pull-back, ...) read from instead of each running its own
 * independent "where am I in the page" ScrollTrigger.
 *
 * Two layers of tracking, both driven off the same CHAPTERS registry
 * so adding/reordering a chapter there is the only edit ever needed:
 *
 *   1. One global ScrollTrigger spanning the first chapter's top to
 *      the last chapter's bottom → overall journey progress (0→1).
 *   2. One local ScrollTrigger PER chapter, scoped to just that
 *      section being in the viewport → that chapter's own 0→1, plus
 *      an active-chapter flag while it's centered.
 */
const ScrollWorldProvider = () => {
  useLayoutEffect(() => {
    const startEl = document.getElementById(WORLD_START_ID);
    const endEl = document.getElementById(WORLD_END_ID);
    if (!startEl || !endEl) return;

    const triggers = [];

    // Global journey progress — unchanged contract from before this
    // registry existed, still what ScrollWorld's backdrop (and the
    // future finale pull-back) reads for "how far through the whole
    // world are we".
    triggers.push(
      ScrollTrigger.create({
        trigger: startEl,
        start: "top top",
        endTrigger: endEl,
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setWorldProgress(self.progress),
        onLeaveBack: () => setWorldProgress(0),
        onLeave: () => setWorldProgress(1),
      })
    );

    // Per-chapter local progress + "which chapter is active right
    // now". Missing sections are skipped rather than throwing, since
    // not every page mounts every chapter (e.g. a future page might
    // reuse a subset).
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => setChapterProgress(id, self.progress),
        })
      );

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveChapter(id);
          },
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
};

export default ScrollWorldProvider;
