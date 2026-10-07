import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaPaperPlane,
  FaDoorOpen,
  FaGraduationCap,
  FaClapperboard,
  FaFolderOpen,
  FaRocket,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import divisions from "../data/divisions";
import DivisionIcon from "./DivisionIcon";
import WorldSeam from "../scroll/WorldSeam";
import { SECTION_COLORS } from "../theme/sectionColors";

import imgApply from "../assets/studio/gambar depan studio.png";
import imgOnboarding from "../assets/dokumentasi/keseluruhan.jpeg";
import imgTraining from "../assets/dokumentasi/modeling.jpeg";
import imgProduction from "../assets/dokumentasi/animasi.jpeg";
import imgPortfolio from "../assets/dokumentasi/editing.jpeg";
import imgCareer from "../assets/dokumentasi/broadcasting.jpeg";

// ------------------------------------------------------------------
// INTERN JOURNEY COMMAND CENTER
//
// This replaces the old vertical "company profile" timeline outright.
// That version told the internship as a list of steps to complete; this
// version tells it as a live system a participant moves through — one
// selected stage at a time, with a photo, a HUD-style "mission status"
// readout, and a progress rail that visibly advances (on its own, or on
// tap) exactly the way a production dashboard would track an active
// job. Order still carries meaning (you can't reach Portfolio before
// Production), it's just no longer expressed as a scrollable list of
// cards — it's expressed as one system with a current state.
// ------------------------------------------------------------------
const STAGES = [
  {
    id: "apply",
    code: "01",
    label: "Apply",
    tag: "INITIALIZING",
    icon: FaPaperPlane,
    accent: "#FFD84D",
    image: imgApply,
    title: "Kirim Aplikasi & Pilih Divisi",
    desc: "Mission briefing dimulai di sini — isi formulir pendaftaran dan pilih divisi kreatif sesuai minatmu, dari Illustration sampai Software Development.",
    activities: ["Mengisi formulir pendaftaran", "Memilih divisi minat", "Interview & seleksi berkas"],
    output: "Slot magang terkonfirmasi di divisi pilihan",
    learning: "Memahami struktur & alur kerja studio produksi",
  },
  {
    id: "onboarding",
    code: "02",
    label: "Onboarding",
    tag: "SYNCING ACCESS",
    icon: FaDoorOpen,
    accent: "#38BDF8",
    image: imgOnboarding,
    title: "Onboarding ke Sistem Studio",
    desc: "Masuk ke ekosistem studio sesungguhnya — orientasi tim, tools produksi, dan standar kerja yang berlaku di setiap divisi.",
    activities: ["Orientasi tim & studio", "Setup tools produksi", "Pengenalan SOP produksi"],
    output: "Akses penuh ke pipeline & tools divisi",
    learning: "Familiar dengan software dan ritme kerja studio",
  },
  {
    id: "training",
    code: "03",
    label: "Training",
    tag: "TRAINING MODE",
    icon: FaGraduationCap,
    accent: "#A78BFA",
    image: imgTraining,
    title: "Training & Mentorship Intensif",
    desc: "Dibimbing langsung mentor profesional di divisimu, mengasah skill teknis lewat studi kasus nyata sebelum masuk produksi.",
    activities: ["Sesi mentoring 1-on-1", "Studi kasus & simulasi tugas", "Review teknis berkala"],
    output: "Kompetensi teknis siap produksi",
    learning: "Menguasai workflow & standar kualitas divisi",
  },
  {
    id: "production",
    code: "04",
    label: "Production",
    tag: "LIVE PRODUCTION",
    icon: FaClapperboard,
    accent: "#FB923C",
    image: imgProduction,
    title: "Terjun ke Produksi Nyata",
    desc: "Bukan simulasi — kamu terlibat langsung dalam proyek klien dan produksi aktif yang sedang berjalan di studio.",
    activities: ["Mengerjakan task proyek klien", "Kolaborasi lintas divisi", "Deadline & review produksi"],
    output: "Kontribusi nyata pada proyek yang tayang",
    learning: "Bekerja dalam tekanan produksi profesional sungguhan",
  },
  {
    id: "portfolio",
    code: "05",
    label: "Portfolio",
    tag: "COMPILING OUTPUT",
    icon: FaFolderOpen,
    accent: "#4ADE80",
    image: imgPortfolio,
    title: "Kurasi Portofolio Produksi",
    desc: "Setiap hasil kerja selama magang dikurasi dan dipoles jadi portofolio nyata yang siap dibawa ke dunia kerja.",
    activities: ["Seleksi karya terbaik", "Penyusunan portofolio", "Feedback & polishing akhir"],
    output: "Portofolio produksi siap pakai",
    learning: "Mempresentasikan hasil kerja secara profesional",
  },
  {
    id: "career",
    code: "06",
    label: "Career",
    tag: "DEPLOYED",
    icon: FaRocket,
    accent: "#818CF8",
    image: imgCareer,
    title: "Peluncuran Karier",
    desc: "Performa terbaik membuka jalan direkrut penuh waktu atau direkomendasikan ke jaringan studio mitra.",
    activities: ["Evaluasi akhir performa", "Rekomendasi jaringan studio", "Peluang rekrutmen penuh waktu"],
    output: "Sertifikat & rekomendasi resmi studio",
    learning: "Siap memasuki industri kreatif secara profesional",
  },
];

const TOTAL = STAGES.length;
const AUTO_MS = 5200;

// Ambient particle field — generated once, matches the language already
// used on the dark "studio system" surfaces elsewhere in the app.
const PARTICLES = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  top: Math.round(Math.random() * 100),
  size: 1.5 + Math.random() * 2.5,
  duration: 9 + Math.random() * 10,
  delay: Math.random() * 9,
  x: Math.round((Math.random() - 0.5) * 70),
  y: -Math.round(50 + Math.random() * 90),
  opacity: 0.18 + Math.random() * 0.3,
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

const JourneyNode = ({ stage, index, isActive, onSelect, size = "lg" }) => {
  const dim = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
      aria-label={`${stage.code} ${stage.label}`}
      className="relative z-10 flex flex-col items-center gap-2.5 outline-none shrink-0"
    >
      <span
        className={`relative flex ${dim} items-center justify-center rounded-full transition-all duration-500`}
        style={{
          border: `2px solid ${isActive ? stage.accent : "rgba(248,250,252,0.18)"}`,
          backgroundColor: isActive ? `${stage.accent}1f` : "var(--color-void-2)",
          boxShadow: isActive
            ? `0 0 0 6px ${stage.accent}22, 0 0 28px 2px ${stage.accent}66`
            : "none",
        }}
      >
        {isActive && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: stage.accent, opacity: 0.25 }}
          />
        )}
        <stage.icon
          className={size === "lg" ? "relative text-base" : "relative text-sm"}
          style={{ color: isActive ? stage.accent : "rgba(248,250,252,0.55)" }}
        />
      </span>
      <span
        className="font-display font-bold text-[0.65rem] tracking-widest transition-colors duration-500"
        style={{ color: isActive ? stage.accent : "rgba(248,250,252,0.3)" }}
      >
        {stage.code}
      </span>
      <span
        className={`font-display font-semibold text-[0.7rem] md:text-xs text-center leading-tight transition-colors duration-500 ${
          isActive ? "text-frost" : "text-frost/40"
        }`}
      >
        {stage.label}
      </span>
    </button>
  );
};

const InternshipProgram = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = STAGES[active];

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % TOTAL);
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (i) => setActive(((i % TOTAL) + TOTAL) % TOTAL);

  return (
    <section id="internship" className="relative pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <ParticleField />

      <div aria-hidden="true" className="pointer-events-none absolute -left-28 -bottom-20 hidden lg:block">
        <div className="orbit-ring animate-orbit h-96 w-96" />
        <div className="orbit-ring orbit-ring--cyan animate-orbit-reverse absolute inset-10" />
        <div
          className="orbit-ring orbit-ring--gold animate-orbit absolute inset-20"
          style={{ animationDuration: "30s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <span className="kicker-studio flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-orbit-pulse" />
            Intern Journey Command Center
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-frost mt-3 leading-[1.05]">
            Bukan program pendaftaran — satu sistem produksi yang kamu masuki.
          </h2>
          <p className="text-frost/50 leading-relaxed mt-5 max-w-xl">
            Enam tahap, satu alur yang sama setiap kali: dari hari pertama daftar sampai
            ikut produksi nyata. Pilih atau biarkan berjalan sendiri — panel di bawah
            melacak status misimu secara langsung.
          </p>
        </motion.div>

        {/* Interactive command-center area */}
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Journey Progress System — desktop rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block relative pt-1"
          >
            <div className="absolute left-0 right-0 top-7 h-[3px] rounded-full bg-frost/10 overflow-hidden">
              <div className="energy-line-x h-full w-full opacity-30" />
            </div>
            <motion.div
              className="absolute left-0 top-7 h-[3px] rounded-full origin-left"
              style={{ background: `linear-gradient(to right, ${STAGES[0].accent}, ${stage.accent})` }}
              animate={{ width: `${(active / (TOTAL - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute top-7 -translate-y-1/2 h-3 w-3 rounded-full z-10"
              style={{
                boxShadow: "0 0 16px 4px currentColor, 0 0 4px 1px currentColor",
                color: stage.accent,
                backgroundColor: stage.accent,
              }}
              animate={{ left: `${(active / (TOTAL - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="grid grid-cols-6 gap-2">
              {STAGES.map((s, i) => (
                <JourneyNode key={s.id} stage={s} index={i} isActive={active === i} onSelect={goTo} />
              ))}
            </div>
          </motion.div>

          {/* Journey Progress System — mobile horizontal scroll strip */}
          <div className="md:hidden -mx-5 px-5 overflow-x-auto scrollbar-none">
            <div className="flex gap-5 pb-1 w-max">
              {STAGES.map((s, i) => (
                <JourneyNode key={s.id} stage={s} index={i} isActive={active === i} onSelect={goTo} size="sm" />
              ))}
            </div>
          </div>

          {/* Content: photo + mission status */}
          <div className="mt-12 md:mt-16 grid lg:grid-cols-[1fr_1.15fr] gap-7 lg:gap-12 items-stretch">
            {/* Left: activity photo */}
            <div
              className="glass-panel relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto min-h-[18rem]"
              style={{ "--panel-glow": stage.accent }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={stage.id}
                  src={stage.image}
                  alt={`Aktivitas tahap ${stage.label} program magang Studio Minilemon`}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-void-2 via-void-2/10 to-transparent" />
              <div className="scan-beam" aria-hidden="true" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="font-display font-bold text-frost/80 text-sm">
                  {stage.code}
                  <span className="text-frost/35">/{String(TOTAL).padStart(2, "0")}</span>
                </span>
              </div>
              <div
                className="absolute top-4 right-4 glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.62rem] font-display font-semibold tracking-wider text-frost/80"
                style={{ "--panel-glow": stage.accent }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-orbit-pulse"
                  style={{ backgroundColor: stage.accent }}
                />
                {stage.tag}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span
                  className="font-display font-bold text-lg md:text-xl text-frost drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                >
                  {stage.label}
                </span>
              </div>
            </div>

            {/* Right: MISSION STATUS panel */}
            <div
              className="glass-panel rounded-3xl p-6 md:p-9 relative flex flex-col"
              style={{ "--panel-glow": stage.accent }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="kicker-studio flex items-center gap-2 !text-frost/60">
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-orbit-pulse"
                    style={{ backgroundColor: stage.accent }}
                  />
                  Mission Status
                </span>
                <span className="font-display font-semibold text-xs text-frost/35 tracking-wide">
                  STAGE {stage.code}/{String(TOTAL).padStart(2, "0")}
                </span>
              </div>
              <div className="h-px bg-frost/10 mb-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  <span
                    className="text-xs font-display font-bold uppercase tracking-[0.2em]"
                    style={{ color: stage.accent }}
                  >
                    {stage.label}
                  </span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-frost mt-2 mb-4 leading-[1.1]">
                    {stage.title}
                  </h3>
                  <p className="text-frost/55 leading-relaxed mb-7 max-w-lg">{stage.desc}</p>

                  <p className="text-[0.68rem] font-display font-semibold uppercase tracking-wide text-frost/35 mb-2.5">
                    Aktivitas Utama
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {stage.activities.map((act) => (
                      <li key={act} className="flex items-start gap-2.5 text-sm text-frost/70">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: stage.accent }}
                        />
                        {act}
                      </li>
                    ))}
                  </ul>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border p-4" style={{ borderColor: `${stage.accent}33` }}>
                      <p className="text-[0.62rem] font-display font-semibold uppercase tracking-wide text-frost/35 mb-1.5">
                        Output
                      </p>
                      <p className="text-sm text-frost/80 leading-snug">{stage.output}</p>
                    </div>
                    <div className="rounded-xl border border-frost/12 p-4">
                      <p className="text-[0.62rem] font-display font-semibold uppercase tracking-wide text-frost/35 mb-1.5">
                        Hasil Belajar
                      </p>
                      <p className="text-sm text-frost/80 leading-snug">{stage.learning}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-7 pt-6 border-t border-frost/10">
                <div className="flex items-center gap-1.5">
                  {STAGES.map((s, i) => (
                    <span
                      key={s.id}
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: active === i ? "1.25rem" : "0.375rem",
                        backgroundColor: active === i ? s.accent : "rgba(248,250,252,0.15)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    aria-label="Tahap sebelumnya"
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-frost/15 text-frost/60 hover:text-frost hover:border-frost/35 transition-colors"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    aria-label="Tahap berikutnya"
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-frost/15 text-frost/60 hover:text-frost hover:border-frost/35 transition-colors"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisions open for internship + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20 flex flex-col items-center text-center"
        >
          <p className="text-[0.68rem] font-display font-semibold uppercase tracking-wide text-frost/35 mb-4">
            Divisi Terbuka untuk Magang
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-9 max-w-2xl">
            {divisions.map((d) => (
              <span
                key={d.id}
                className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-display font-semibold text-frost/75"
                style={{ "--panel-glow": d.accent }}
              >
                <DivisionIcon icon={d.icon} className="text-[11px]" style={{ color: d.accent }} />
                {d.name}
              </span>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-studio-solid group inline-flex items-center justify-center gap-2.5 font-display font-semibold px-8 py-4"
          >
            Mulai Misi: Daftar Program Magang
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* No bottom divider here — Impact & Values continues on the same
          dark void-2 bed, so there's no real color seam to mark. */}
      <WorldSeam topColor={SECTION_COLORS.cream} bottomColor={SECTION_COLORS.voidBlue} flip />
    </section>
  );
};

export default InternshipProgram;
