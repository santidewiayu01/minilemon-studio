import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import divisions from "../data/divisions";
import DivisionIcon from "../components/DivisionIcon";
import SectionDivider from "../components/SectionDivider";
import SplineViewer from "../components/SplineViewer";
import { useFooterDividerColor } from "../context/FooterDividerContext";
import { SECTION_COLORS } from "../theme/sectionColors";

import imgIlustrasi from "../assets/dokumentasi/ilustrasi.jpeg";
import imgModeling from "../assets/dokumentasi/modeling.jpeg";
import imgRigging from "../assets/dokumentasi/rigging.jpeg";
import imgAnimasi from "../assets/dokumentasi/animasi.jpeg";
import imgEditing from "../assets/dokumentasi/editing.jpeg";
import imgBroadcasting from "../assets/dokumentasi/broadcasting.jpeg";
import imgBranding from "../assets/dokumentasi/branding.jpeg";
import imgSoftware from "../assets/dokumentasi/software.jpeg";
import showreel from "../assets/video/MINILEMON - INTRODUCTION CHARACTERS (1).mp4";

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

// The whole page reads off this one array: every section below is a
// different lens on the exact same eight divisions, in the exact same
// order, so the "pipeline" always tells one consistent story.
const PIPELINE = divisions.map((d) => ({ ...d, image: DIVISION_IMAGES[d.id] }));

const PIPELINE_HERO_SPLINE_URL = "https://prod.spline.design/y5sYJhz3RUKe-1Vc/scene.splinecode";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ------------------------------------------------------------------
// Ambient particle field — a handful of slow-drifting specks scattered
// across a dark section. Generated once at module scope (not on every
// render) since it's purely decorative and never needs to change.
// ------------------------------------------------------------------
const PARTICLES = Array.from({ length: 28 }).map((_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  top: Math.round(Math.random() * 100),
  size: 1.5 + Math.random() * 2.5,
  duration: 9 + Math.random() * 10,
  delay: Math.random() * 9,
  x: Math.round((Math.random() - 0.5) * 70),
  y: -Math.round(50 + Math.random() * 90),
  opacity: 0.2 + Math.random() * 0.35,
}));

const ParticleField = ({ count = 20, className = "" }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    {PARTICLES.slice(0, count).map((p) => (
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

// Idle spin on the model's stage while it's in view, same "slow float"
// language as the homepage Hero's drone — small, continuous, never
// distracting from the copy beside it. Skipped for reduced-motion.
const PipelineHeroModel = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = stageRef.current;
    if (!el) return;

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 1000;
      el.style.transform = `translateY(${Math.sin(t * 0.6) * 8}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={stageRef} className="h-full w-full will-change-transform">
      <SplineViewer url={PIPELINE_HERO_SPLINE_URL} />
    </div>
  );
};

// ------------------------------------------------------------------
// HERO — dark navy, tech grid, orbit rings, a light sweep, and a mini
// preview of the pipeline itself so the visitor knows what they're
// about to scroll through before they scroll through it.
// ------------------------------------------------------------------
const PipelineHero = () => (
  <section className="relative bg-void pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
    <div className="tech-grid absolute inset-0" aria-hidden="true" />
    <div className="absolute inset-0 bg-gradient-to-b from-void via-void/92 to-void" aria-hidden="true" />
    <div className="light-sweep" aria-hidden="true" />
    <ParticleField count={26} />

    <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 hidden lg:block">
      <div className="orbit-ring animate-orbit h-[28rem] w-[28rem]" />
      <div className="orbit-ring orbit-ring--gold animate-orbit-reverse absolute inset-[3rem]" />
      <div
        className="orbit-ring orbit-ring--cyan animate-orbit absolute inset-[6.5rem]"
        style={{ animationDuration: "34s" }}
      />
      <span className="animate-orbit-pulse absolute left-[3rem] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(255,216,77,0.5)]" />
    </div>

    <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 lg:gap-8">
      <div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link
            to="/"
            className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 font-display font-semibold text-frost/65 hover:text-gold mb-10 transition-colors text-sm"
          >
            <FaArrowLeft className="text-xs" /> Kembali ke Beranda
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2.5 mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-orbit-pulse" />
          <span className="kicker-studio">Animation Production Pipeline</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-4xl md:text-6xl lg:text-[3.4rem] leading-[0.98] tracking-tight text-frost max-w-xl"
        >
          Masuk ke dalam <span className="text-gold">alur produksi</span> studio kami.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-lg text-frost/55 max-w-xl mt-6"
        >
          Bukan galeri karya jadi — ini ruang produksi kami yang sesungguhnya. Delapan
          divisi, satu alur kerja yang sama setiap kali, dari ide pertama sampai siap tayang.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-x-1.5 gap-y-3"
        >
          {PIPELINE.map((d, i) => (
            <span key={d.id} className="flex items-center gap-1.5">
              <span className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-display font-semibold text-frost/80">
                <DivisionIcon icon={d.icon} className="text-[11px]" style={{ color: d.accent }} />
                {d.name}
              </span>
              {i < PIPELINE.length - 1 && <FaArrowRight className="text-frost/20 text-[10px]" />}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3D hero model — fixed-height glass stage so the (async-loading)
          Spline scene can never shift the layout around it or push the
          copy beside it while it boots up. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[280px] sm:h-[360px] lg:h-[520px] w-full"
      >
        <PipelineHeroModel />
      </motion.div>
    </div>

    <SectionDivider topColor={SECTION_COLORS.void} bottomColor={SECTION_COLORS.voidBlue} />
  </section>
);

// ------------------------------------------------------------------
// PRODUCTION PIPELINE — every division as a premium glass card: photo,
// main tasks, software stack, and what it hands off to the next stage.
// ------------------------------------------------------------------
const PipelineCard = ({ division, index, total }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel relative rounded-2xl overflow-hidden"
      style={{ "--panel-glow": division.accent }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={division.image}
          alt={`Aktivitas divisi ${division.name} di Studio Minilemon`}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.07]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-2 via-void-2/15 to-transparent" />
        <span className="absolute top-4 left-4 font-display font-bold text-frost/70 text-sm">
          {number}
          <span className="text-frost/30">/{String(total).padStart(2, "0")}</span>
        </span>
        <span
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: `${division.accent}26`, color: division.accent }}
        >
          <DivisionIcon icon={division.icon} className="text-sm" />
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display font-bold text-frost text-lg mb-2">{division.name}</h3>
        <p className="text-frost/50 text-sm leading-relaxed mb-4">{division.contribution}</p>

        <p className="text-[0.68rem] font-display font-semibold uppercase tracking-wide text-frost/35 mb-2">
          Tugas Utama
        </p>
        <ul className="space-y-1.5 mb-4">
          {division.activities.slice(0, 2).map((act) => (
            <li key={act} className="flex items-start gap-1.5 text-xs text-frost/65">
              <FaCheck className="mt-0.5 text-[9px] shrink-0" style={{ color: division.accent }} />
              {act}
            </li>
          ))}
        </ul>

        <p className="text-[0.68rem] font-display font-semibold uppercase tracking-wide text-frost/35 mb-2">
          Software
        </p>
        <div className="flex flex-wrap gap-1.5">
          {division.tools.map((tool) => (
            <span key={tool} className="rounded-full border border-frost/12 px-2.5 py-1 text-[0.68rem] text-frost/60">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProductionPipeline = () => (
  <section className="relative bg-void-2 pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
    <div className="tech-grid absolute inset-0 opacity-50" aria-hidden="true" />
    <ParticleField count={14} />

    <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mb-16 md:mb-20"
      >
        <span className="kicker-studio">Production Pipeline</span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-frost mt-3 leading-[1.05]">
          Delapan divisi, satu alur produksi yang saling menyambung.
        </h2>
        <p className="text-frost/50 leading-relaxed mt-5 max-w-xl">
          Setiap proyek melewati tahapan yang sama, satu demi satu — masing-masing kartu
          di bawah ini adalah satu simpul dalam alur itu, lengkap dengan tugas, software,
          dan kontribusinya terhadap produksi.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PIPELINE.map((d, i) => (
          <PipelineCard key={d.id} division={d} index={i} total={PIPELINE.length} />
        ))}
      </div>
    </div>

    <SectionDivider topColor={SECTION_COLORS.voidBlue} bottomColor={SECTION_COLORS.voidBlue} />
  </section>
);

// ------------------------------------------------------------------
// INSIDE THE DIVISION — cinematic horizontal scroll. A tall sticky
// track pins to the viewport while the page scrolls, translating a
// row of full-bleed division slides sideways; the backdrop glow tints
// itself toward each division's accent as it takes center stage.
// ------------------------------------------------------------------
const ProgressDot = ({ progress, index, total, accent }) => {
  const center = total > 1 ? index / (total - 1) : 0;
  const span = Math.max(0.5 / total, 0.06);
  const scale = useTransform(progress, [center - span, center, center + span], [1, 1.7, 1]);
  const opacity = useTransform(progress, [center - span, center, center + span], [0.3, 1, 0.3]);
  return (
    <motion.span
      style={{ scale, opacity, backgroundColor: accent }}
      className="h-1.5 w-1.5 rounded-full"
    />
  );
};

const DivisionSlide = ({ division, index, total }) => (
  <div className="w-screen h-full shrink-0 flex items-center">
    <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0"
      >
        <img
          src={division.image}
          alt={`Suasana kerja divisi ${division.name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${division.accent}55, transparent 55%)` }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex items-center gap-2 font-display font-semibold text-sm mb-5" style={{ color: division.accent }}>
          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[11px]">
            <DivisionIcon icon={division.icon} />
          </span>
          Divisi {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <h3 className="font-display font-bold text-3xl md:text-5xl text-frost mb-4 leading-[1.05]">
          {division.name}
        </h3>

        <p className="text-frost/60 leading-relaxed mb-7 max-w-md">{division.description}</p>

        <div className="mb-7">
          <p className="text-xs font-display font-semibold uppercase tracking-wide text-frost/40 mb-3">
            Aktivitas Utama
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {division.activities.map((act) => (
              <span key={act} className="inline-flex items-center gap-1.5 text-sm text-frost/75">
                <FaCheck className="text-xs" style={{ color: division.accent }} />
                {act}
              </span>
            ))}
          </div>
        </div>

        <div className="border-l-2 pl-4" style={{ borderColor: division.accent }}>
          <p className="text-xs font-display font-semibold uppercase tracking-wide mb-1.5 text-frost/40">Software</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {division.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-frost/15 px-2.5 py-1 text-xs text-frost/65">
                {tool}
              </span>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-frost/55">{division.contribution}</p>
        </div>
      </motion.div>
    </div>
  </div>
);

const InsideTheDivision = () => {
  const containerRef = useRef(null);
  const total = PIPELINE.length;
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", `-${(total - 1) * 100}%`]);
  const accentColor = useTransform(
    scrollYProgress,
    PIPELINE.map((_, i) => i / (total - 1)),
    PIPELINE.map((d) => d.accent)
  );
  const glowBackground = useMotionTemplate`radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, ${accentColor} 20%, var(--color-void-2)) 0%, var(--color-void-2) 72%)`;

  return (
    <section className="relative bg-void-2">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-14 md:pb-20 relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="kicker-studio">Inside The Division</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-frost mt-3 max-w-xl leading-[1.05]">
            Ikuti proyek berpindah dari satu divisi ke divisi berikutnya.
          </h2>
          <p className="text-frost/50 leading-relaxed mt-5 max-w-xl">
            Teruskan scroll — bagian ini bergerak menyamping mengikuti scroll halaman,
            membawamu masuk ke suasana kerja tiap divisi satu per satu.
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} style={{ height: `${total * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ background: glowBackground }} className="absolute inset-0" aria-hidden="true" />
          <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

          <motion.div style={{ x: trackX }} className="relative z-10 flex h-full">
            {PIPELINE.map((d, i) => (
              <DivisionSlide key={d.id} division={d} index={i} total={total} />
            ))}
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
            {PIPELINE.map((d, i) => (
              <ProgressDot key={d.id} progress={scrollYProgress} index={i} total={total} accent={d.accent} />
            ))}
          </div>
        </div>
      </div>

      <SectionDivider topColor={SECTION_COLORS.voidBlue} bottomColor={SECTION_COLORS.void} />
    </section>
  );
};

// ------------------------------------------------------------------
// ONE PRODUCTION, EIGHT DIVISIONS — replaces the old portfolio-style
// "Featured Works" idea entirely. A connected node diagram explaining
// how a single project flows through every division, not a gallery of
// finished pieces.
// ------------------------------------------------------------------
const OneProductionEightDivisions = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="relative bg-void pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <ParticleField count={16} />

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16 md:mb-24"
        >
          <span className="kicker-studio flex justify-center">One Production, Eight Divisions</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-frost mt-3 leading-[1.05]">
            Satu proyek, delapan tangan yang menyelesaikannya.
          </h2>
          <p className="text-frost/50 leading-relaxed mt-5">
            Bukan delapan tim yang bekerja sendiri-sendiri — setiap proyek berjalan melalui
            seluruh divisi ini secara berurutan, saling menyerahkan hasil kerja satu sama
            lain. Arahkan kursor atau fokus ke tiap simpul untuk melihat perannya.
          </p>
        </motion.div>

        <div className="relative px-2">
          <svg
            className="absolute left-0 right-0 top-7 w-full hidden sm:block"
            height="4"
            viewBox="0 0 800 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="2" x2="800" y2="2" stroke="rgba(248,250,252,0.16)" strokeWidth="1" strokeDasharray="1 7" />
          </svg>

          <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-y-10 gap-x-2">
            {PIPELINE.map((d) => (
              <button
                key={d.id}
                type="button"
                onMouseEnter={() => setActive(d.id)}
                onFocus={() => setActive(d.id)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                className="relative flex flex-1 min-w-[5.25rem] flex-col items-center gap-3 outline-none"
              >
                <span
                  className="pipeline-node relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-frost/20 bg-void-2 text-frost/70"
                  style={{ "--node-glow": d.accent }}
                >
                  <DivisionIcon icon={d.icon} className="text-base" />
                </span>
                <span className="font-display font-semibold text-[0.7rem] md:text-xs text-frost/60 text-center leading-tight">
                  {d.name}
                </span>

                <AnimatePresence>
                  {active === d.id && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="glass-panel absolute top-full mt-3 z-30 w-48 rounded-xl p-3.5 text-left"
                      style={{ "--panel-glow": d.accent }}
                    >
                      <p className="text-xs text-frost/70 leading-relaxed">{d.contribution}</p>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider topColor={SECTION_COLORS.void} bottomColor={SECTION_COLORS.void} />
    </section>
  );
};

// ------------------------------------------------------------------
// CLOSING CTA — looping studio footage, dark overlay, join-the-team copy.
// ------------------------------------------------------------------
const ClosingCTA = () => {
  useFooterDividerColor(SECTION_COLORS.void);

  return (
    <section className="relative bg-void py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <video
          className="h-full w-full object-cover opacity-45 [filter:saturate(1.05)_contrast(1.05)_brightness(0.7)]"
          src={showreel}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/72 to-void" aria-hidden="true" />
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kicker-studio flex justify-center mb-4"
        >
          Tertarik Belajar Langsung?
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-3xl md:text-5xl tracking-tight text-frost mb-8 leading-[1.05]"
        >
          Siap Bergabung Dengan Tim Kami?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/#internship"
            className="btn-studio-solid group inline-flex items-center gap-2.5 font-display font-semibold px-7 py-3.5"
          >
            Lihat Program Magang
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/#contact"
            className="btn-studio-ghost inline-flex items-center gap-2.5 font-display font-semibold px-7 py-3.5"
          >
            Hubungi Kami
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const KegiatanStudio = () => (
  <div className="bg-void">
    <PipelineHero />
    <ProductionPipeline />
    <InsideTheDivision />
    <OneProductionEightDivisions />
    <ClosingCTA />
  </div>
);

export default KegiatanStudio;
