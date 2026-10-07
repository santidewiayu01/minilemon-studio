import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import { FaArrowRight, FaMapMarkerAlt, FaLayerGroup, FaUserGraduate, FaFilm } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import companyData from "../data/company";
import studioFront from "../assets/studio/gambar depan studio.png";
import studioDetail from "../assets/studio/lebih detail depan studio.jpeg";
import imgAnimasi from "../assets/dokumentasi/animasi.jpeg";
import imgBranding from "../assets/dokumentasi/branding.jpeg";

gsap.registerPlugin(ScrollTrigger);

const { about } = companyData;

// Same "count up once in view" device as the Hero stats — kept local
// (not shared) because that's the existing pattern in this codebase:
// each section owns its own small counter instead of a shared util.
const StatCounter = ({ value, suffix, label, icon, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="flex items-center gap-2.5">
      <span className="w-9 h-9 shrink-0 rounded-full bg-gold/12 text-lemon-dark flex items-center justify-center text-sm">
        {icon}
      </span>
      <div>
        <p className="font-display font-bold text-lg text-ink leading-none">
          {display}
          {suffix}
        </p>
        <p className="text-[11px] text-ink/50 mt-1 tracking-[0.08em] uppercase">{label}</p>
      </div>
    </div>
  );
};

// Static (non-numeric) companion chip for the two label-only micro
// stats — same visual weight as StatCounter so the strip reads as one
// consistent row instead of numbers-plus-afterthoughts.
const StatChip = ({ icon, lines }) => (
  <div className="flex items-center gap-2.5">
    <span className="w-9 h-9 shrink-0 rounded-full bg-gold/12 text-lemon-dark flex items-center justify-center text-sm">
      {icon}
    </span>
    <p className="font-display font-bold text-ink text-[13px] leading-tight">
      {lines[0]}
      <br />
      {lines[1]}
    </p>
  </div>
);

const AboutStudio = () => {
  const sectionRef = useRef(null);
  const frameRef = useRef(null); // main studio-photo frame
  const stackRef = useRef(null); // whole photo-stack column (depth/tilt target)

  // This chapter used to only ever animate once, the moment it first
  // scrolled into view (framer's `whileInView`) — after that it just
  // sat there, which is exactly the "normal website" flatness the
  // living-world chapters around it don't have. Two changes here fix
  // that without touching any copy or imagery:
  //
  //   1. The photo frame now drifts continuously off real scroll
  //      position (GSAP scrub) instead of a spring-settled framer
  //      value, matching how every other chapter's parallax works.
  //   2. The whole photo-stack column gets a very small scroll-tied
  //      3D tilt (rotateX/scale) — the same "camera moving past" read
  //      StudioShowcase/DivisionPipeline already have, just subtler
  //      since this is a calmer, human chapter.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      if (stackRef.current) {
        gsap.fromTo(
          stackRef.current,
          { rotateX: 4, scale: 0.97 },
          {
            rotateX: -2,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top 20%",
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-studio"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      {/* Ambient "production HQ" layer: ultra-subtle technical grid,
          drifting orbit rings, and two soft light blooms — the same
          devices as the Hero/Division sections, just ink-tinted so
          they sit quietly on cream instead of vanishing. */}
      <div className="tech-grid-ink absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 hidden lg:block"
      >
        <div className="orbit-ring orbit-ring--ink animate-orbit h-[28rem] w-[28rem]" />
        <div className="orbit-ring orbit-ring--gold animate-orbit-reverse absolute inset-[3.5rem]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-8 w-72 h-72 rounded-full bg-gold/10 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[38%] -top-10 w-56 h-56 rounded-full bg-cyan/10 blur-[80px]"
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">
        {/* Left: floating studio photo stack — the building shot stays
            the hero image, but it's no longer alone on the page. */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 md:order-1 pb-10 pr-4 md:pr-0"
          style={{ perspective: "1400px" }}
        >
        <div ref={stackRef} className="relative will-change-transform" style={{ transformStyle: "preserve-3d" }}>
          {/* Secondary layered card — sits behind the main frame,
              slightly rotated, like a second print pulled from the
              same shoot. */}
          <motion.div
            initial={{ opacity: 0, y: 18, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block absolute -left-8 md:-left-12 top-9 w-32 md:w-40 rounded-2xl overflow-hidden border-2 border-white shadow-[0_20px_44px_-18px_rgba(15,31,58,0.45)] -z-10"
          >
            <img
              src={studioDetail}
              alt="Detail area kerja Studio Minilemon"
              className="w-full h-28 md:h-36 object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Main frame — cinematic treatment: soft grade + a scanning
              light beam, the same accent used on the dark Division
              panels, so the two sections read as one system. */}
          <div
            ref={frameRef}
            className="relative rounded-[1.75rem] overflow-hidden border border-ink/8 shadow-[0_34px_74px_-30px_rgba(15,31,58,0.4)] will-change-transform"
          >
            <img
              src={studioFront}
              alt="Kantor Studio Minilemon"
              className="w-full h-72 md:h-[26rem] object-cover [filter:saturate(1.06)_contrast(1.04)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/45 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.06] via-transparent to-gold/[0.08]" />
            <span className="scan-beam" aria-hidden="true" />
          </div>

          {/* Small floating activity photos — team/production glimpses,
              not just the building. */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 right-6 sm:right-12 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-white shadow-[0_16px_32px_-14px_rgba(15,31,58,0.5)]"
          >
            <img
              src={imgAnimasi}
              alt="Aktivitas produksi animasi di studio"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="hidden sm:block absolute bottom-28 -right-3 md:right-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 border-white shadow-[0_16px_32px_-14px_rgba(15,31,58,0.5)]"
          >
            <img
              src={imgBranding}
              alt="Aktivitas branding di studio"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Studio HQ Card — replaces the old single-line location
              badge with the section's real "who/where/how active"
              summary, as a glass panel. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel-light absolute bottom-0 -right-2 sm:right-4 md:-right-8 rounded-2xl px-5 py-4 w-[15.5rem]"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-leaf-dark" />
              </span>
              <p className="text-[10px] font-display font-semibold tracking-[0.14em] uppercase text-ink/55">
                Aktif Berproduksi
              </p>
            </div>
            <p className="font-display font-bold text-ink text-sm leading-snug mb-2.5">
              Studio Minilemon HQ
            </p>
            <div className="flex items-center gap-1.5 text-ink/55 text-xs mb-1.5">
              <FaMapMarkerAlt className="text-[10px] shrink-0" />
              Surabaya, Indonesia
            </div>
            <div className="flex items-center gap-1.5 text-ink/55 text-xs">
              <FaLayerGroup className="text-[10px] shrink-0" />
              8 Divisi Kreatif · 6+ Tahun Berkarya
            </div>
          </motion.div>
        </div>
        </motion.div>

        {/* Right: who the studio is, in its own words — copy untouched */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2"
        >
          <span className="kicker text-lemon-dark mb-5 block">{about.title}</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.05] tracking-tight text-ink mb-6">
            Studio kreatif, produksi, dan tempat belajar —
            <span className="text-lemon-dark"> jadi satu.</span>
          </h2>

          <div className="space-y-4 text-ink/65 leading-relaxed mb-8 max-w-lg">
            {about.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Creative studio micro stats */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 mb-9 pb-8 border-b border-ink/8 max-w-lg">
            <StatCounter value={8} suffix="" label="Divisions" icon={<FaLayerGroup />} delay={0.05} />
            <StatCounter value={100} suffix="+" label="Interns" icon={<FaUserGraduate />} delay={0.15} />
            <StatChip icon={<FaFilm />} lines={["Creative", "Production House"]} />
            <StatChip icon={<FaMapMarkerAlt />} lines={["Based in", "Surabaya"]} />
          </div>

          <Link
            to="/tentang"
            className="btn-ghost group inline-flex items-center gap-2.5 text-ink font-display font-semibold px-7 py-3.5"
          >
            Kenali Studio Kami Lebih Jauh{" "}
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStudio;
