import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import divisions from "../data/divisions";
import DivisionIcon from "./DivisionIcon";

gsap.registerPlugin(ScrollTrigger);

import imgKeseluruhan from "../assets/dokumentasi/keseluruhan.jpeg";
import imgIlustrasi from "../assets/dokumentasi/ilustrasi.jpeg";
import imgModeling from "../assets/dokumentasi/modeling.jpeg";
import imgRigging from "../assets/dokumentasi/rigging.jpeg";
import imgAnimasi from "../assets/dokumentasi/animasi.jpeg";
import imgEditing from "../assets/dokumentasi/editing.jpeg";
import imgBroadcasting from "../assets/dokumentasi/broadcasting.jpeg";
import imgBranding from "../assets/dokumentasi/branding.jpeg";
import imgSoftware from "../assets/dokumentasi/software.jpeg";

const imageByDivision = {
  illustration: imgIlustrasi,
  modeling: imgModeling,
  rigging: imgRigging,
  animation: imgAnimasi,
  editing: imgEditing,
  broadcasting: imgBroadcasting,
  branding: imgBranding,
  "software-development": imgSoftware,
};

// "Living Studio Wall" — replaces the old three-pane command-center
// console (channel list you had to click, one photo visible at a
// time). Nobody clicks anything here: every division is on screen at
// once, in a hand-composed bento/masonry grid instead of a repeating
// row of identical tiles, so the section reads as a wall of a working
// studio rather than a dashboard with a menu.
//
// Each division carries its own card "shape" (hero / portrait /
// landscape / medium), a couple of cards are nudged upward with a
// negative margin + raised z-index so they read as physically
// layered rather than sitting in strict grid boxes, and every card
// gets a small floating index chip that pokes out past its own top
// edge — the one recurring "signature" detail that ties the whole
// wall together.
// Two entirely different layout strategies, split cleanly at `lg`:
//
// Below `lg` (mobile + tablet), the grid is gone. The wall becomes a
// CSS multi-column masonry (`columns-1 sm:columns-2` on the parent) —
// each card's height comes purely from its own `ratio` (aspect-ratio),
// never from a hardcoded row-span. That's what makes it self-balancing
// on any screen width: there's no pixel-row math to break, so cards
// can never look cramped, overlap, or leave a stray gap. `colSpanAll`
// marks the two "banner" cards (Overview, Software Development) to
// bridge both columns at the sm/tablet 2-up step, same hero treatment
// they get on desktop.
//
// At `lg`, it switches to the hand-composed 12-column bento grid. Every
// "row" of the composition below sums to exactly 12 columns, so dense
// packing never has to guess — no card is left dramatically bigger
// than its neighbors, which is what made Software Development balloon
// out into its own oversized full-width band before.
const LAYOUT = {
  overview: {
    span: "lg:col-span-7 lg:row-span-3",
    ratio: "aspect-[16/11] lg:aspect-auto",
    colSpanAll: true,
    parallax: true,
    corners: true,
  },
  illustration: {
    span: "lg:col-span-5 lg:row-span-3",
    ratio: "aspect-[3/4] lg:aspect-auto",
  },
  modeling: {
    span: "lg:col-span-3 lg:row-span-2",
    ratio: "aspect-[4/3] lg:aspect-auto",
  },
  rigging: {
    span: "lg:col-span-3 lg:row-span-2",
    ratio: "aspect-square lg:aspect-auto",
  },
  editing: {
    span: "lg:col-span-3 lg:row-span-2",
    ratio: "aspect-[16/9] lg:aspect-auto",
  },
  branding: {
    span: "lg:col-span-3 lg:row-span-2",
    ratio: "aspect-[4/3] lg:aspect-auto",
  },
  animation: {
    span: "lg:col-span-5 lg:row-span-3",
    ratio: "aspect-[16/10] md:aspect-[3/4] lg:aspect-auto",
    parallax: true,
  },
  broadcasting: {
    span: "lg:col-span-3 lg:row-span-3",
    ratio: "aspect-[4/5] lg:aspect-auto",
    offset: "lg:-mt-7 lg:z-20",
  },
  "software-development": {
    // Full-width 21/9 only kicks in once the card actually has the
    // width to carry it (sm+, once colSpanAll bridges both columns).
    // At a single mobile column that ratio would come out too short
    // for the name/description/tool-chip stack to breathe.
    span: "lg:col-span-4 lg:row-span-3",
    ratio: "aspect-[4/3] sm:aspect-[21/9] lg:aspect-auto",
    colSpanAll: true,
    parallax: true,
  },
};

const STATUS = {
  overview: "Live Sekarang",
  illustration: "Sedang Proses",
  modeling: "Sedang Proses",
  rigging: "Antre",
  animation: "Rendering",
  editing: "Sedang Proses",
  broadcasting: "Live",
  branding: "Review",
  "software-development": "Deploy",
};

const ACTIVITIES = [
  {
    id: "overview",
    name: "Studio Overview",
    icon: null,
    image: imgKeseluruhan,
    accent: "#6EE7FF",
    description:
      "Ruang produksi bersama tempat seluruh divisi bekerja berdampingan, setiap hari.",
    tools: ["Sony A7 III"],
  },
  ...divisions.map((d) => ({
    id: d.id,
    name: d.name,
    icon: d.icon,
    image: imageByDivision[d.id],
    accent: d.accent,
    description: d.description,
    tools: d.tools,
  })),
].map((a) => ({ ...a, ...LAYOUT[a.id], status: STATUS[a.id] }));

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// Image layer with an optional scroll-linked drift — scoped to the
// card itself (not the whole grid) so each one tracks its own
// position and the effect stays cheap even with nine cards on screen.
const CardMedia = ({ src, alt, parallax }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-5%", "5%"] : ["0%", "0%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 h-[112%] w-full -top-[6%] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.09]"
        loading="lazy"
      />
    </div>
  );
};

const ActivityCard = ({ activity, index, total }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 5) * 0.07 }}
      whileHover={{ y: -8 }}
      className={`group relative mb-5 block w-full break-inside-avoid rounded-[1.75rem] last:mb-0 lg:mb-0 ${
        activity.colSpanAll ? "sm:[column-span:all] lg:[column-span:auto]" : ""
      } ${activity.span} ${activity.ratio} ${activity.offset ?? ""}`}
      style={{ "--card-glow": activity.accent }}
    >
      {/* Floating index chip — pokes past the card's own top edge, the
          one repeated device that reads as this wall's signature and
          gives every card a touch of layered depth even where the
          grid itself doesn't overlap. */}
      <div
        className="animate-float-avatar absolute -top-3.5 left-5 z-30 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-ink/10 pl-1.5 pr-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,31,58,0.35)]"
        style={{ animationDelay: `${(index % 5) * 0.4}s` }}
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
          style={{ backgroundColor: `${activity.accent}22`, color: activity.accent }}
        >
          {activity.icon ? <DivisionIcon icon={activity.icon} /> : <span className="block w-1.5 h-1.5 rounded-full" style={{ background: activity.accent }} />}
        </span>
        <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-ink/60">
          {number}/{String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_20px_45px_-24px_rgba(15,31,58,0.45)] transition-shadow duration-500 group-hover:shadow-[0_32px_60px_-20px_rgba(15,31,58,0.55)]">
        <div className="tech-grid absolute inset-0 z-[1] opacity-[0.12] mix-blend-overlay pointer-events-none" aria-hidden="true" />

        <CardMedia src={activity.image} alt={`Aktivitas divisi ${activity.name} di Studio Minilemon`} parallax={activity.parallax} />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" aria-hidden="true" />

        {/* Thin technical corner brackets — reserved for the hero card
            only, so the device reads as a deliberate accent rather
            than noise repeated nine times. */}
        {activity.corners &&
          ["top-4 left-4 border-t-2 border-l-2", "top-4 right-4 border-t-2 border-r-2", "bottom-4 left-4 border-b-2 border-l-2", "bottom-4 right-4 border-b-2 border-r-2"].map((pos) => (
            <span
              key={pos}
              className={`absolute z-[2] w-4 h-4 opacity-70 ${pos}`}
              style={{ borderColor: activity.accent }}
              aria-hidden="true"
            />
          ))}

        {/* Status indicator */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-ink/55 backdrop-blur-sm border border-frost/15 pl-2 pr-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-80" style={{ background: activity.accent }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: activity.accent }} />
          </span>
          <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-frost/85">
            {activity.status}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6">
          <h3 className="font-display font-bold text-frost text-lg md:text-xl leading-tight mb-1.5">
            {activity.name}
          </h3>
          <p className="text-frost/65 text-xs md:text-[0.83rem] leading-relaxed line-clamp-2 mb-3.5 max-w-md">
            {activity.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {activity.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-frost/18 bg-white/[0.04] px-2.5 py-1 text-[0.65rem] text-frost/70 backdrop-blur-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const StudioMoments = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // The wall's vertical entrance (stagger fade-up per card) already
  // existed; what it never had was any lateral read — every other
  // living-world chapter drifts diagonally or sideways as you pass
  // it, this one only ever moved straight up. A few percent of
  // horizontal drift on the grid itself, scrubbed to real scroll
  // position across the section's own span, is enough to make the
  // wall feel like it's gliding past rather than just rising into
  // place — without touching the responsive grid/column logic above.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { xPercent: -3 },
        {
          xPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="studio-moments" className="relative py-24 md:py-36 overflow-hidden">
      <div className="tech-grid-ink absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 hidden lg:block animate-float-slower"
      >
        <div className="orbit-ring orbit-ring--ink h-80 w-80" />
        <div className="orbit-ring orbit-ring--ink absolute inset-8" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16" data-aos="fade-up">
          <div className="max-w-2xl">
            <span className="kicker text-lemon-dark mb-4 block">Aktivitas Divisi</span>
            <h2 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight text-ink mb-4">
              Delapan ruang kerja, hidup dalam satu dinding studio.
            </h2>
            <p className="text-ink/55 leading-relaxed">
              Bukan galeri yang perlu dijelajahi satu per satu — ini seluruh studio kami,
              tampil sekaligus, sedang berjalan di ruangnya masing-masing.
            </p>
          </div>

          <div className="glass-panel-light rounded-full px-4 py-2 inline-flex items-center gap-2 self-start md:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf-dark opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-leaf-dark" />
            </span>
            <span className="text-[11px] font-mono font-semibold tracking-[0.12em] text-ink/70">
              {divisions.length} DIVISI AKTIF
            </span>
          </div>
        </div>

        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 sm:gap-5 lg:columns-auto lg:grid lg:grid-cols-12 lg:gap-6 lg:auto-rows-[112px] lg:[grid-auto-flow:dense] will-change-transform"
        >
          {ACTIVITIES.map((activity, i) => (
            <ActivityCard key={activity.id} activity={activity} index={i} total={ACTIVITIES.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioMoments;
