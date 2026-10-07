import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Ambient depth blobs — same "glow" visual language already used in
// Hero/StudioShowcase (gold + cyan radial glows), just relocated onto
// one shared, persistent layer instead of being redrawn per-section.
// Each has its own parallax `depth` so they drift past the visitor at
// different rates — the actual thing that reads as "depth" while
// scrolling, rather than a single flat backdrop.
const BLOBS = [
  { size: 640, top: "4%", left: "-8%", hue: "gold", depth: 0.35 },
  { size: 820, top: "30%", right: "-16%", hue: "cyan", depth: 0.55 },
  { size: 560, top: "58%", left: "2%", hue: "gold", depth: 0.25 },
  { size: 900, top: "80%", right: "-10%", hue: "cyan", depth: 0.65 },
  { size: 520, top: "104%", left: "18%", hue: "gold", depth: 0.4 },
];

// A quiet field of drifting dust so dark and light chapters still feel
// like the same space rather than two different backdrops swapped
// underneath the visitor. Generated once at module scope.
const DUST = Array.from({ length: 26 }).map((_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  top: Math.round(Math.random() * 100),
  size: 1.5 + Math.random() * 2.5,
  depth: 0.2 + Math.random() * 0.6,
}));

const ScrollWorld = () => {
  const blobRefs = useRef([]);
  const dustRefs = useRef([]);
  const blobFieldRef = useRef(null); // the whole blob layer — finale scale/brighten target
  const dustFieldRef = useRef(null); // the whole dust layer — finale brighten target

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      };

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: -70 * BLOBS[i].depth,
          xPercent: i % 2 === 0 ? 6 * BLOBS[i].depth : -6 * BLOBS[i].depth,
          ease: "none",
          scrollTrigger,
        });
      });

      dustRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: -120 * DUST[i].depth,
          ease: "none",
          scrollTrigger,
        });
      });

      // Cinematic close: as the finale (#contact) arrives, the blob
      // field spreads and brightens and the dust thickens — read as
      // the camera pulling back far enough that the whole ambient
      // "universe" the visitor has been travelling through is finally
      // visible at once, instead of just the slice behind whichever
      // chapter is on screen. Guarded because Home is the only page
      // that currently mounts a #contact section.
      const finale = document.getElementById("contact");
      if (finale && blobFieldRef.current && dustFieldRef.current) {
        gsap.fromTo(
          blobFieldRef.current,
          { scale: 1, opacity: 0.7 },
          {
            scale: 1.35,
            opacity: 1,
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: {
              trigger: finale,
              start: "top bottom",
              end: "top 20%",
              scrub: 0.8,
            },
          }
        );
        gsap.fromTo(
          dustFieldRef.current,
          { scale: 1, filter: "brightness(1)" },
          {
            scale: 1.2,
            filter: "brightness(1.6)",
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: {
              trigger: finale,
              start: "top bottom",
              end: "top 20%",
              scrub: 0.8,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden="true" className="world-bg fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 world-bg-fill" />

      <div ref={blobFieldRef} className="absolute inset-0 opacity-70 mix-blend-screen">
        {BLOBS.map((b, i) => (
          <div
            key={i}
            ref={(el) => (blobRefs.current[i] = el)}
            className="absolute rounded-full blur-3xl will-change-transform"
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              right: b.right,
              background:
                b.hue === "gold"
                  ? "radial-gradient(circle, rgba(255,216,77,0.16), transparent 70%)"
                  : "radial-gradient(circle, rgba(110,231,255,0.13), transparent 70%)",
            }}
          />
        ))}
      </div>

      <div ref={dustFieldRef} className="absolute inset-0 will-change-transform">
        {DUST.map((d, i) => (
          <span
            key={d.id}
            ref={(el) => (dustRefs.current[i] = el)}
            className="absolute rounded-full world-dust will-change-transform"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
            }}
          />
        ))}
      </div>

      <div className="grain-overlay absolute inset-0" />
    </div>
  );
};

export default ScrollWorld;
