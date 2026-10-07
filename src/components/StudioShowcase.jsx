import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import divisions from "../data/divisions";
import DivisionIcon from "./DivisionIcon";
import WorldSeam from "../scroll/WorldSeam";
import { SECTION_COLORS } from "../theme/sectionColors";

import imgIlustrasi from "../assets/dokumentasi/ilustrasi.jpeg";
import imgModeling from "../assets/dokumentasi/modeling.jpeg";
import imgRigging from "../assets/dokumentasi/rigging.jpeg";
import imgAnimasi from "../assets/dokumentasi/animasi.jpeg";
import imgEditing from "../assets/dokumentasi/editing.jpeg";
import imgBroadcasting from "../assets/dokumentasi/broadcasting.jpeg";
import imgBranding from "../assets/dokumentasi/branding.jpeg";
import imgSoftware from "../assets/dokumentasi/software.jpeg";

const DIVISION_IMAGES = {
  illustration: imgIlustrasi,
  modeling: imgModeling,
  rigging: imgRigging,
  animation: imgAnimasi,
  editing: imgEditing,
  broadcasting: imgBroadcasting,
  branding: imgBranding,
  "software-development": imgSoftware,
};

const PIPELINE = divisions.map((d) => ({ ...d, image: DIVISION_IMAGES[d.id] }));
const TOTAL = PIPELINE.length;

const AUTOPLAY_MS = 9000;
const RESUME_AFTER_MS = 14000;

// Ambient particles scattered across the panel background — generated
// once at module scope since they're purely decorative.
const PARTICLES = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  top: Math.round(Math.random() * 100),
  size: 1.5 + Math.random() * 2,
  duration: 9 + Math.random() * 8,
  delay: Math.random() * 8,
  x: Math.round((Math.random() - 0.5) * 60),
  y: -Math.round(40 + Math.random() * 70),
  opacity: 0.2 + Math.random() * 0.3,
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

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir >= 0 ? 48 : -48, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir >= 0 ? -48 : 48, scale: 0.98 }),
};

const StudioShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const resumeTimer = useRef(null);
  const active = PIPELINE[activeIndex];

  const goTo = (index, dir) => {
    setDirection(dir);
    setActiveIndex(index);
    setAutoplay(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setAutoplay(true), RESUME_AFTER_MS);
  };

  const next = () => goTo((activeIndex + 1) % TOTAL, 1);
  const prev = () => goTo((activeIndex - 1 + TOTAL) % TOTAL, -1);

  // Autoplay — cycles the active division on its own, pausing whenever
  // the visitor manually picks one, then quietly resuming later.
  useEffect(() => {
    if (!autoplay || hovered) return undefined;
    const id = setInterval(() => {
      setDirection(1);
      setActiveIndex((i) => (i + 1) % TOTAL);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, hovered]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <section id="studio-life" className="relative text-frost pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <ParticleField />

      {/* Reactive glow — shifts to the active division's neon accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[8%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[130px] transition-colors duration-[1200ms]"
        style={{ backgroundColor: active.accent, opacity: 0.16 }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 hidden lg:block">
        <div className="orbit-ring orbit-ring--cyan animate-orbit-reverse h-[24rem] w-[24rem]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 hidden lg:block">
        <div className="orbit-ring animate-orbit h-[22rem] w-[22rem]" />
        <div className="orbit-ring orbit-ring--gold animate-orbit-reverse absolute inset-[2.5rem]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-12 md:mb-16"
        >
          <span className="kicker-studio mb-4 block">Division Command Center</span>
          <h2 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight">
            Satu ruang kendali, delapan divisi produksi.
          </h2>
          <p className="text-frost/50 leading-relaxed mt-5">
            Pilih divisi untuk melihat aktivitas hariannya secara langsung — tanpa
            scroll panjang. Setiap panel menunjukkan siapa yang bekerja, apa yang
            mereka kerjakan, dan software yang mereka pakai.
          </p>
        </motion.div>

        {/* Main panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="glass-panel relative rounded-3xl overflow-hidden grid lg:grid-cols-[1.05fr_0.95fr]"
            style={{ "--panel-glow": active.accent }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Photo side */}
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={`Aktivitas divisi ${active.name} di Studio Minilemon`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>

              <div
                className="absolute inset-0 transition-[background] duration-700"
                style={{ background: `linear-gradient(to top, ${active.accent}70, transparent 55%)` }}
                aria-hidden="true"
              />
              <div className="scan-beam" aria-hidden="true" />

              <span
                aria-hidden="true"
                className="ghost-type absolute -top-4 -left-2 text-[6rem]"
                style={{ color: "var(--color-frost)", opacity: 0.09 }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="kicker-studio transition-colors duration-700" style={{ color: active.accent }}>
                  Divisi {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-frost mt-1.5">{active.name}</h3>
              </div>
            </div>

            {/* Detail side */}
            <div className="relative p-6 md:p-10 flex flex-col justify-center overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className="inline-flex items-center gap-2 font-display font-semibold text-xs mb-5"
                    style={{ color: active.accent }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                      style={{ backgroundColor: `${active.accent}22` }}
                    >
                      <DivisionIcon icon={active.icon} />
                    </span>
                    Workstation Aktif
                  </span>

                  <p className="text-frost/60 leading-relaxed mb-6 max-w-md">{active.description}</p>

                  <p className="text-[0.7rem] font-display font-semibold uppercase tracking-wide text-frost/35 mb-2.5">
                    Tugas Utama
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
                    {active.activities.map((act) => (
                      <span key={act} className="inline-flex items-center gap-1.5 text-sm text-frost/75">
                        <FaCheckCircle className="text-xs" style={{ color: active.accent }} />
                        {act}
                      </span>
                    ))}
                  </div>

                  <p className="text-[0.7rem] font-display font-semibold uppercase tracking-wide text-frost/35 mb-2.5">
                    Software
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {active.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-frost/15 px-2.5 py-1 text-xs text-frost/65"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="border-l-2 pl-4" style={{ borderColor: active.accent }}>
                    <p className="text-xs font-display font-semibold uppercase tracking-wide mb-1.5 text-frost/40">
                      Kontribusi ke Produksi
                    </p>
                    <p className="text-sm leading-relaxed text-frost/60">{active.contribution}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev / next controls */}
            <button
              type="button"
              onClick={prev}
              aria-label="Divisi sebelumnya"
              className="glass-panel absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full text-frost/70 hover:text-frost"
            >
              <FaArrowLeft className="text-sm" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Divisi berikutnya"
              className="glass-panel absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full text-frost/70 hover:text-frost"
            >
              <FaArrowRight className="text-sm" />
            </button>
          </div>

          {/* Division selector strip */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-wrap lg:justify-between lg:overflow-visible">
            {PIPELINE.map((d, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                  className="group relative flex shrink-0 flex-col items-center gap-2 rounded-xl px-3 py-3 transition-colors duration-300"
                  style={{
                    backgroundColor: isActive ? `${d.accent}18` : "transparent",
                    border: `1px solid ${isActive ? `${d.accent}55` : "rgba(248,250,252,0.08)"}`,
                  }}
                >
                  <span
                    className="pipeline-node flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300"
                    style={{
                      "--node-glow": d.accent,
                      borderColor: isActive ? d.accent : "rgba(248,250,252,0.2)",
                      backgroundColor: isActive ? d.accent : "transparent",
                      color: isActive ? "#071827" : "rgba(248,250,252,0.6)",
                    }}
                  >
                    <DivisionIcon icon={d.icon} className="text-xs" />
                  </span>
                  <span
                    className="font-display font-semibold text-[0.65rem] whitespace-nowrap transition-colors duration-300"
                    style={{ color: isActive ? "var(--color-frost)" : "rgba(248,250,252,0.4)" }}
                  >
                    {d.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Autoplay progress rail */}
          <div className="flex gap-1.5 mt-4">
            {PIPELINE.map((d, i) => (
              <span key={d.id} className="h-1 flex-1 rounded-full overflow-hidden bg-frost/10">
                {i === activeIndex && (
                  <motion.span
                    key={`${d.id}-${autoplay}`}
                    initial={{ width: autoplay ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: autoplay ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                    className="block h-full rounded-full"
                    style={{ backgroundColor: d.accent }}
                  />
                )}
                {i < activeIndex && (
                  <span className="block h-full rounded-full" style={{ backgroundColor: d.accent, opacity: 0.35 }} />
                )}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/kegiatan-studio"
            className="btn-studio-solid group inline-flex items-center gap-2.5 font-display font-semibold px-7 py-3.5"
          >
            Lihat Semua Aktivitas Divisi
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <WorldSeam topColor={SECTION_COLORS.voidBlue} bottomColor={SECTION_COLORS.cream} />
    </section>
  );
};

export default StudioShowcase;
