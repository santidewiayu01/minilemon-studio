import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa6";
import { scrollToTarget } from "../scroll/lenis";
import SplineViewer from "./SplineViewer";

gsap.registerPlugin(ScrollTrigger);

const SPLINE_SCENE_URL = "https://prod.spline.design/0X3hOnG5vnkeLOHD/scene.splinecode";

// Ambient particles, same recipe used elsewhere in the studio system
// (StudioShowcase / InternshipProgram / ImpactValues) — generated once
// at module scope since they're purely decorative and never change.
const PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  top: Math.round(Math.random() * 100),
  size: 1.5 + Math.random() * 2,
  duration: 9 + Math.random() * 8,
  delay: Math.random() * 8,
  x: Math.round((Math.random() - 0.5) * 50),
  y: -Math.round(40 + Math.random() * 70),
  opacity: 0.15 + Math.random() * 0.25,
}));

const ParticleField = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {PARTICLES.map((p) => (
      <span
        key={p.id}
        className="particle-dot text-frost"
        style={{
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: p.size,
          height: p.size,
          "--particle-duration": `${p.duration}s`,
          "--particle-x": `${p.x}px`,
          "--particle-y": `${p.y}px`,
          "--particle-opacity": p.opacity,
          animationDelay: `${p.delay}s`,
        }}
      />
    ))}
  </div>
);

// A modern creative-technology hero: no video, no busy layout — a
// headline on one side, a Spline drone on the other, and three thin
// layers of GSAP-driven motion instead of one heavy scroll-jacked
// sequence: (1) the drone idles with a slow float + tilt on its own,
// (2) it trails the cursor with a subtle 3D parallax, (3) the whole
// hero drifts and fades as the visitor starts scrolling toward the
// frame-sequence section that follows.
const Hero = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const droneWrapRef = useRef(null); // perspective parent
  const droneStageRef = useRef(null); // mouse-parallax target (x/y/rotation)
  const droneFloatRef = useRef(null); // idle float/rotate loop
  const vignetteRef = useRef(null);

  // Idle float + scroll-tied drift, both scoped/cleaned up via gsap.context.
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduceMotion && droneFloatRef.current) {
        gsap.to(droneFloatRef.current, {
          y: -18,
          rotateZ: 1.6,
          duration: 4.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (sectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        tl.to(droneWrapRef.current, { yPercent: -9, ease: "none" }, 0)
          .to(contentRef.current, { yPercent: -12, opacity: 0, ease: "none" }, 0)
          .to(vignetteRef.current, { opacity: 0.78, ease: "none" }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cursor-follow parallax on the drone — a small, eased translate +
  // 3D tilt so it trails the pointer instead of snapping to it. Skipped
  // on touch devices and when the visitor prefers reduced motion.
  useEffect(() => {
    const section = sectionRef.current;
    const stage = droneStageRef.current;
    if (!section || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const xTo = gsap.quickTo(stage, "x", { duration: 1.1, ease: "power3.out" });
    const yTo = gsap.quickTo(stage, "y", { duration: 1.1, ease: "power3.out" });
    const rotYTo = gsap.quickTo(stage, "rotationY", { duration: 1.3, ease: "power3.out" });
    const rotXTo = gsap.quickTo(stage, "rotationX", { duration: 1.3, ease: "power3.out" });

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(px * 24);
      yTo(py * 16);
      rotYTo(px * 7);
      rotXTo(-py * 5);
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-void"
    >
      {/* Deep-black atmosphere — layered gradients instead of a flat
          fill, so the section reads as premium studio dark rather than
          a plain color block. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-void to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,rgba(110,231,255,0.09),transparent_55%)]" />

      {/* Soft spotlight glow seated behind the drone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-1/2 hidden h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,216,77,0.15),transparent_65%)] blur-3xl lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[54%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,216,77,0.13),transparent_65%)] blur-3xl lg:hidden"
      />

      <ParticleField />
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        ref={vignetteRef}
        className="pointer-events-none absolute inset-0 opacity-45 bg-[radial-gradient(ellipse_at_center,transparent_38%,#000_100%)]"
      />

      {/* Content */}
      <div className="relative z-10 min-h-[100svh] max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-6 lg:gap-4">
        <div ref={contentRef} className="order-2 lg:order-1 pt-2 pb-14 lg:py-0 will-change-transform">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-orbit-pulse" />
            <span className="kicker-studio">Minilemon Studio</span>
            <span className="h-px w-8 bg-frost/25" />
            <span className="kicker-studio text-frost/45">Creative Technology Studio</span>
          </div>

          <h1 className="font-display font-bold text-[2.25rem] sm:text-5xl lg:text-[4rem] leading-[0.98] tracking-tight text-frost max-w-xl">
            Creating Characters,
            <br />
            Stories &amp; Digital
            <br />
            <span className="text-gold">Experiences.</span>
          </h1>

          <p className="mt-6 text-frost/50 text-sm md:text-base leading-relaxed max-w-md">
            Satu studio produksi untuk karakter, animasi, dan pengalaman digital —
            dari konsep sampai rilis.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToTarget("studio-life")}
              className="btn-studio-solid group inline-flex items-center gap-2.5 font-display font-semibold px-7 py-3.5"
            >
              Explore Works
              <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToTarget("internship")}
              className="btn-studio-ghost inline-flex items-center gap-2.5 font-display font-semibold px-7 py-3.5"
            >
              Join Internship
            </button>
          </div>
        </div>

        {/* Drone stage — perspective lives on this wrapper so the
            mouse-tilt on droneStageRef renders as real 3D, not a flat
            skew. Never overlaps the copy: it's its own grid column on
            desktop, and stacks below the headline on small screens. */}
        <div
          ref={droneWrapRef}
          className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[620px] w-full will-change-transform"
          style={{ perspective: "1400px" }}
        >
          <div
            ref={droneStageRef}
            className="absolute inset-0 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div ref={droneFloatRef} className="h-full w-full">
              <SplineViewer url={SPLINE_SCENE_URL} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="kicker-studio text-[0.65rem] text-frost/40">Scroll</span>
        <span className="relative h-9 w-5 rounded-full border border-frost/25 overflow-hidden">
          <span className="scroll-cue-dot absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
