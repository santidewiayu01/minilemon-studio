import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPalette, FaUsers, FaGraduationCap, FaHeart } from "react-icons/fa6";
import WorldSeam from "../scroll/WorldSeam";
import { SECTION_COLORS } from "../theme/sectionColors";

// ------------------------------------------------------------------
// STUDIO DNA SYSTEM
//
// Replaces the old 4-card bento grid entirely. That layout told these
// four things as separate, independent boxes — closer to a company
// profile's "our values" slide than to how they actually function.
// In reality none of the four stands alone: Creativity needs Education
// to keep improving, Team is what makes both of those a daily habit
// rather than an intention, and Positive Values is the shared ground
// rule underneath all of it. So instead of four cards, this is one
// living network: four nodes wired to a central "Studio DNA" core,
// with the connection itself — not just the four boxes — as the point.
// ------------------------------------------------------------------
const CENTER = { x: 50, y: 50 };

const NODES = [
  {
    id: "creativity",
    icon: FaPalette,
    title: "Creativity",
    tag: "Exploration Engine",
    desc: "Setiap karya lahir dari eksplorasi ide tanpa batas — dari konsep mentah sampai visual akhir yang matang.",
    accent: "#FFD84D",
    x: 50,
    y: 13,
    labelPos: "below",
  },
  {
    id: "team",
    icon: FaUsers,
    title: "Professional Team",
    tag: "Connective Tissue",
    desc: "Tim lintas divisi yang saling mendukung di setiap proyek — inilah yang menyatukan tiga nilai lain jadi kebiasaan sehari-hari, bukan sekadar slogan.",
    accent: "#6EE7FF",
    x: 88,
    y: 50,
    labelPos: "below",
  },
  {
    id: "education",
    icon: FaGraduationCap,
    title: "Education",
    tag: "Growth Loop",
    desc: "Studio menjadi ruang belajar nyata bagi siswa dan mahasiswa lewat program magang — pengetahuan terus mengalir masuk ke sistem.",
    accent: "#38BDF8",
    x: 50,
    y: 87,
    labelPos: "above",
  },
  {
    id: "positive",
    icon: FaHeart,
    title: "Positive Values",
    tag: "Foundation Layer",
    desc: "Kejujuran, kolaborasi, dan kerja keras jadi fondasi tak terlihat di bawah setiap keputusan kreatif yang diambil studio.",
    accent: "#FB7185",
    x: 12,
    y: 50,
    labelPos: "below",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const ConnectionLine = ({ node, active }) => {
  const isActive = active === node.id;
  return (
    <motion.line
      x1={CENTER.x}
      y1={CENTER.y}
      x2={node.x}
      y2={node.y}
      stroke={node.accent}
      strokeLinecap="round"
      strokeDasharray="2.2 2.6"
      animate={{
        strokeDashoffset: [0, -9.6],
        strokeWidth: isActive ? 0.9 : 0.35,
        strokeOpacity: isActive ? 0.95 : 0.28,
      }}
      transition={{
        strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "linear" },
        strokeWidth: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        strokeOpacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
    />
  );
};

const ValueNode = ({ node, active, onEnter, onLeave }) => {
  const isActive = active === node.id;
  return (
    <div
      className={`absolute flex items-center gap-2 ${
        node.labelPos === "above" ? "flex-col-reverse" : "flex-col"
      }`}
      style={{ top: `${node.y}%`, left: `${node.x}%`, transform: "translate(-50%, -50%)" }}
    >
      <motion.button
        type="button"
        onMouseEnter={() => onEnter(node.id)}
        onFocus={() => onEnter(node.id)}
        onMouseLeave={onLeave}
        onBlur={onLeave}
        whileHover={{ scale: 1.14 }}
        whileFocus={{ scale: 1.14 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-label={node.title}
        className="relative flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full outline-none backdrop-blur-md"
        style={{
          backgroundColor: isActive ? `${node.accent}22` : "rgba(248,250,252,0.05)",
          border: `1.5px solid ${isActive ? node.accent : "rgba(248,250,252,0.16)"}`,
          boxShadow: isActive
            ? `0 0 0 7px ${node.accent}1f, 0 0 30px 4px ${node.accent}66`
            : "0 18px 34px -20px rgba(0,0,0,0.6)",
        }}
      >
        {isActive && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: node.accent, opacity: 0.22 }}
          />
        )}
        <node.icon
          className="relative text-lg md:text-2xl transition-colors duration-300"
          style={{ color: isActive ? node.accent : "rgba(248,250,252,0.7)" }}
        />
      </motion.button>
      <span
        className="font-display font-semibold text-[0.7rem] md:text-sm text-center leading-tight whitespace-nowrap transition-colors duration-300"
        style={{ color: isActive ? node.accent : "rgba(248,250,252,0.55)" }}
      >
        {node.title}
      </span>
    </div>
  );
};

const PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  top: Math.round(Math.random() * 100),
  size: 1.5 + Math.random() * 2.5,
  duration: 9 + Math.random() * 10,
  delay: Math.random() * 9,
  x: Math.round((Math.random() - 0.5) * 70),
  y: -Math.round(50 + Math.random() * 90),
  opacity: 0.16 + Math.random() * 0.28,
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

const ImpactValues = () => {
  const [active, setActive] = useState(null);
  const activeNode = NODES.find((n) => n.id === active) ?? null;
  const readoutGlow = activeNode?.accent ?? "var(--color-gold)";

  return (
    <section id="impact-values" className="relative pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <ParticleField />

      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-1/3 hidden lg:block">
        <div className="orbit-ring animate-orbit h-96 w-96" />
        <div className="orbit-ring orbit-ring--gold animate-orbit-reverse absolute inset-10" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="kicker-studio flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-orbit-pulse" />
            Studio DNA System
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-frost mt-3 leading-[1.05]">
            Empat nilai, satu ekosistem budaya yang hidup.
          </h2>
          <p className="text-frost/50 leading-relaxed mt-5 max-w-xl">
            Bukan empat kotak terpisah — arahkan kursor atau fokus ke tiap simpul untuk
            melihat bagaimana Creativity, Team, Education, dan Positive Values benar-benar
            saling menyalakan satu sama lain.
          </p>
        </motion.div>

        {/* Network diagram */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] md:max-w-[32rem] aspect-square"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {NODES.map((n) => (
              <ConnectionLine key={n.id} node={n} active={active} />
            ))}
          </svg>

          {/* Central core */}
          <div
            className="glass-panel absolute flex flex-col items-center justify-center rounded-full h-24 w-24 md:h-32 md:w-32 text-center"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", "--panel-glow": "var(--color-gold)" }}
          >
            <span className="orbit-ring animate-orbit absolute -inset-3 md:-inset-4" aria-hidden="true" />
            <span
              className="orbit-ring orbit-ring--cyan animate-orbit-reverse absolute -inset-6 md:-inset-8"
              aria-hidden="true"
            />
            <span className="relative font-display font-bold text-frost/80 text-[0.6rem] md:text-xs tracking-[0.2em]">
              STUDIO
            </span>
            <span className="relative font-display font-bold text-gold text-sm md:text-lg tracking-[0.2em] -mt-0.5">
              DNA
            </span>
          </div>

          {NODES.map((n) => (
            <ValueNode key={n.id} node={n} active={active} onEnter={setActive} onLeave={() => setActive(null)} />
          ))}
        </motion.div>

        {/* Dynamic readout panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass-panel mx-auto mt-12 md:mt-16 max-w-2xl rounded-3xl p-6 md:p-8 text-center"
          style={{ "--panel-glow": readoutGlow }}
        >
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="text-xs font-display font-bold uppercase tracking-[0.2em]"
                  style={{ color: activeNode.accent }}
                >
                  {activeNode.title} · {activeNode.tag}
                </span>
                <p className="text-frost/65 leading-relaxed mt-3 max-w-lg mx-auto">{activeNode.desc}</p>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="kicker-studio flex items-center justify-center gap-2 !text-frost/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-orbit-pulse" />
                  System Idle — Hover Simpul untuk Membaca
                </span>
                <p className="text-frost/50 leading-relaxed mt-3 max-w-lg mx-auto">
                  Keempat nilai ini tidak berdiri sendiri — setiap keputusan kreatif di
                  studio mengalir lewat keempatnya sekaligus, bukan salah satu saja.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <WorldSeam topColor={SECTION_COLORS.voidBlue} bottomColor={SECTION_COLORS.cream} />
    </section>
  );
};

export default ImpactValues;
