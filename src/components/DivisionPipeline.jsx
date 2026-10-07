import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import divisions from "../data/divisions";
import DivisionIcon from "./DivisionIcon";
import WorldSeam from "../scroll/WorldSeam";
import { SECTION_COLORS } from "../theme/sectionColors";

gsap.registerPlugin(ScrollTrigger);

// Portfolio chapter. This used to be a flat row of icons walking a
// production line — informative, but a diagram, not a place a visitor
// wanted to linger. Same eight divisions, same data, same destination
// (Kegiatan Studio), but now presented as a field of cards floating at
// different depths that settle into place as the camera (the scroll)
// passes through them, in the spirit of a Lusion project wall rather
// than a flowchart.
//
// Index-based (not random) per-card vertical drift, so the "floating
// field" arrangement is stable across renders/SSR instead of reshuffling.
const DEPTH_OFFSET = [0, 46, 18, 58, 6, 50, 26, 64];

const DivisionPipeline = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const ctaRef = useRef(null);
  const threadRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const baseY = isDesktop ? DEPTH_OFFSET[i] * 0.4 : 0;

        if (reduceMotion) {
          gsap.set(card, { opacity: 1, y: baseY });
          return;
        }

        // Scroll-scrubbed emergence, not a one-shot fade: the card's
        // depth/scale/tilt is a direct function of scroll position, so
        // it drifts forward out of the fog as the visitor approaches
        // and drifts back if they scroll away, instead of a binary
        // "seen it once" trigger.
        gsap.fromTo(
          card,
          { opacity: 0, y: baseY + 90, z: -260, rotateX: 26, scale: 0.82 },
          {
            opacity: 1,
            y: baseY,
            z: 0,
            rotateX: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 58%",
              scrub: 0.6,
            },
          }
        );

        // Once alive, each card drifts on its own lazy vertical loop —
        // small amplitude, staggered timing, so the field never sits
        // dead still even between scroll input.
        gsap.to(card, {
          y: `+=${i % 2 === 0 ? -9 : 9}`,
          duration: 3.6 + (i % 3) * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.5 + i * 0.15,
        });
      });

      if (threadRef.current) {
        gsap.fromTo(
          threadRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "bottom 75%",
              scrub: true,
            },
          }
        );
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 92%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover lift is deliberately separate from the idle-float tween above
  // (which owns `y`) — this only touches `scale`/`z`, so the two never
  // fight for the same property.
  const handleEnter = (i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card, { scale: 1.045, z: 46, duration: 0.5, ease: "power3.out" });
  };
  const handleLeave = (i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card, { scale: 1, z: 0, duration: 0.6, ease: "power3.out" });
  };
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="division-pipeline"
      ref={sectionRef}
      className="relative pt-24 pb-28 md:pt-32 md:pb-40 overflow-hidden"
    >
      <div className="tech-grid absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28"
        >
          <div>
            <span className="kicker-studio">How We Work</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-frost mt-3 max-w-xl leading-[1.05]">
              Delapan divisi, bekerja sebagai satu mesin produksi.
            </h2>
          </div>
          <p className="text-frost/50 leading-relaxed max-w-sm">
            Setiap proyek berjalan lewat jalur yang sama, dari divisi ke divisi — bukan
            delapan tim yang bekerja terpisah. Jelajahi tiap tahapnya sambil menggulir.
          </p>
        </div>

        <div className="relative" style={{ perspective: "1800px" }}>
          <div
            ref={threadRef}
            aria-hidden="true"
            className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-frost/25 to-transparent"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-7 lg:gap-y-16">
            {divisions.map((d, i) => (
              <Link
                key={d.id}
                to="/kegiatan-studio"
                ref={(el) => (cardRefs.current[i] = el)}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
                onMouseMove={handleMove}
                className="division-float-card glass-panel spotlight-card group relative flex flex-col gap-4 rounded-2xl p-6 md:p-7"
                style={{ "--panel-glow": `${d.accent}55`, transformStyle: "preserve-3d" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-3 -right-1 text-5xl md:text-6xl font-display font-bold text-frost/[0.07] select-none pointer-events-none leading-none"
                >
                  0{i + 1}
                </span>

                <span
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border"
                  style={{ borderColor: `${d.accent}55`, backgroundColor: "rgba(248,250,252,0.04)" }}
                >
                  <DivisionIcon icon={d.icon} className="text-lg" style={{ color: d.accent }} />
                </span>

                <div className="relative z-10">
                  <h3 className="font-display font-semibold text-frost text-lg mb-1.5">{d.name}</h3>
                  <p className="text-frost/50 text-sm leading-relaxed">{d.contribution}</p>
                </div>

                <span
                  className="relative z-10 mt-auto inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wide opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: d.accent }}
                >
                  Lihat detail <FaArrowRight className="text-[10px]" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div ref={ctaRef} className="text-center mt-20 md:mt-24">
          <Link
            to="/kegiatan-studio"
            className="btn-studio-ghost inline-flex items-center gap-2.5 font-display font-semibold px-7 py-3.5"
          >
            Lihat Detail Aktivitas Divisi
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>

      <WorldSeam topColor={SECTION_COLORS.voidBlue} bottomColor={SECTION_COLORS.voidBlue} />
    </section>
  );
};

export default DivisionPipeline;
