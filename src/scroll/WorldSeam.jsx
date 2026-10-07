import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Resolves a "var(--color-x)" string (exactly what theme/sectionColors.js
// hands every caller) down to its real computed value, so GSAP always has
// an actual color to interpolate rather than a nested var() reference it
// can't reliably tween to.
const resolveColor = (value) => {
  if (!value) return value;
  const match = value.match(/^var\((--[\w-]+)\)$/);
  if (!match) return value;
  return getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim();
};

/**
 * WorldSeam — same prop contract as the old <SectionDivider>
 * (topColor / bottomColor / flip), used as a straight swap wherever a
 * divider used to sit between two sections. Instead of painting a
 * scallop border AT the seam, it drives the shared `--world-color`
 * custom property (read by <ScrollWorld>'s fixed background) so the
 * whole page bed morphs from topColor to bottomColor exactly as the
 * boundary crosses the viewport — the seam disappears because there's
 * no second flat-colored box for it to butt against any more.
 *
 * Sections that used this color pair to also paint their own solid
 * `bg-*` class should drop that class (make the section transparent)
 * once a WorldSeam covers its boundaries, or the section's own opaque
 * background will simply hide the world layer behind it.
 */
const WorldSeam = ({ topColor, bottomColor, flip = false }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (!topColor || !bottomColor || topColor === bottomColor) return;

    const section = markerRef.current?.closest("section") || markerRef.current?.parentElement;
    if (!section) return;

    const from = resolveColor(topColor);
    const to = resolveColor(bottomColor);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No scroll-tied animation — just make sure the world lands on
      // the right color once this section is the one in view.
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: () => gsap.set(document.documentElement, { "--world-color": to }),
        onEnterBack: () => gsap.set(document.documentElement, { "--world-color": from }),
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        document.documentElement,
        { "--world-color": from },
        {
          "--world-color": to,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            // flip = this instance lives in the section that OWNS the
            // bottom color, morphing as its own top edge arrives.
            // non-flip = this instance lives in the section that owns
            // the top color, morphing as its own bottom edge departs.
            start: flip ? "top 90%" : "bottom 90%",
            end: flip ? "top 10%" : "bottom 10%",
            scrub: 0.4,
          },
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topColor, bottomColor, flip]);

  return (
    <span
      ref={markerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute h-px w-px opacity-0 ${flip ? "top-0" : "bottom-0"} left-0`}
    />
  );
};

export default WorldSeam;
