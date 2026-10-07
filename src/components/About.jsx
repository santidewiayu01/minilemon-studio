import { Link } from "react-router-dom";
import { FaBookReader, FaPalette, FaHeart, FaArrowRight } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import characters from "../data/characters";
import {
  LeafMotif,
  LemonSlice,
  CloudShape,
  BubbleShape,
  SparkleShape,
  BlobShape,
} from "./SceneDecor";

const values = [
  {
    icon: <FaBookReader />,
    title: "Belajar Sambil Bermain",
    desc: "Setiap materi dikemas jadi permainan dan cerita seru, bukan hafalan yang membosankan.",
    bg: "bg-lemon-light",
  },
  {
    icon: <FaPalette />,
    title: "Kreativitas Tanpa Batas",
    desc: "Anak-anak bebas berekspresi lewat gambar, musik, dan cerita bersama Lemon Squad.",
    bg: "bg-sky-light",
  },
  {
    icon: <FaHeart />,
    title: "Tumbuh dengan Karakter Baik",
    desc: "Nilai kebaikan, berbagi, dan percaya diri diselipkan di setiap petualangan.",
    bg: "bg-leaf-light",
  },
];

// Presentation-only: pick 3 existing characters straight from the real
// character data (same source CharacterList.jsx uses) to build the hero
// illustration cluster. No character data is added or modified.
const heroCast = ["togar", "wayan", "memey"]
  .map((id) => characters.find((c) => c.id === id))
  .filter(Boolean);

// Small floating stat chips around the illustration. Purely decorative
// copy suggested by the redesign brief ("jika memungkinkan tambahkan
// statistik kecil") — not sourced from any data file, so feel free to
// edit the labels below.
const miniStats = [
  { emoji: "🍋", label: "Sejak 2020" },
  { emoji: "👦", label: "Ribuan Anak" },
  { emoji: "🎬", label: "Film Animasi" },
  { emoji: "🎮", label: "Program Edukasi" },
];

const About = () => {
  return (
    <section id="about" className="relative bg-cream py-24 md:py-32 overflow-hidden">
      {/* ---------------------------------------------------------------- */}
      {/* Background: soft pattern + low-opacity decorative shapes         */}
      {/* ---------------------------------------------------------------- */}
      <div className="lemon-dot-pattern absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.35] hidden md:block"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-50 120 C 250 40, 450 220, 750 120 S 1150 60, 1250 160"
          stroke="var(--color-leaf)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-50 560 C 250 640, 470 480, 760 580 S 1150 640, 1250 540"
          stroke="var(--color-sky-dark)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <BlobShape className="absolute -top-16 -left-20 w-80 h-80 text-leaf/10 hidden lg:block" />
      <BlobShape className="absolute -bottom-24 -right-16 w-96 h-96 text-sky/10 hidden lg:block" />

      <LeafMotif className="absolute top-16 left-[4%] w-14 h-14 text-leaf/20 rotate-[-16deg] animate-float hidden md:block" />
      <LeafMotif className="absolute bottom-20 right-[6%] w-16 h-16 text-leaf-dark/20 rotate-[12deg] animate-float-slower hidden lg:block" />
      <LemonSlice className="absolute top-[12%] right-[10%] w-12 h-12 text-lemon-dark/25 rotate-[14deg] animate-float-slower hidden lg:block" />
      <LemonSlice className="absolute bottom-[10%] left-[8%] w-10 h-10 text-lemon-dark/25 rotate-[-10deg] animate-float hidden md:block" />
      <CloudShape className="absolute top-10 right-[22%] w-20 h-12 text-white hidden lg:block" />
      <CloudShape className="absolute bottom-16 left-[20%] w-16 h-10 text-white/80 hidden md:block" />
      <SparkleShape className="absolute top-[26%] left-[30%] w-4 h-4 text-sky-dark/60 animate-sparkle hidden md:block" />
      <SparkleShape className="absolute bottom-[30%] right-[28%] w-3.5 h-3.5 text-berry/60 animate-pulse hidden md:block" />
      <FaStar className="absolute top-[8%] left-[42%] w-4 h-4 text-lemon-dark/30 animate-float rotate-[-8deg] hidden lg:block" aria-hidden="true" />
      <FaStar className="absolute bottom-[6%] right-[18%] w-3 h-3 text-sky-dark/25 animate-float-slower rotate-[10deg] hidden md:block" aria-hidden="true" />
      <BubbleShape className="absolute top-[45%] right-[6%] w-6 h-6 border-ink/10 bg-white/40 animate-drift hidden lg:block" />
      <BubbleShape className="absolute bottom-[8%] right-[38%] w-4 h-4 border-ink/10 bg-white/40 animate-drift" style={{ animationDelay: "1.4s" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* -------------------------------------------------------------- */}
        {/* Left: character illustration cluster + floating stat cards     */}
        {/* -------------------------------------------------------------- */}
        <div data-aos="fade-right">
          <div className="relative w-full max-w-md mx-auto aspect-square">
            {/* Soft glow behind the whole cluster for depth */}
            <div
              className="absolute inset-8 rounded-full bg-gradient-to-br from-lemon-light/70 via-sky-light/40 to-transparent blur-2xl"
              aria-hidden="true"
            />

            {/* Back character (top-right, muted, tilted) */}
            {heroCast[1] && (
              <div
                className="absolute top-0 right-2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-ink overflow-hidden shadow-[4px_4px_0px_0px_var(--color-ink)] rotate-[10deg] animate-float-slower z-10"
                style={{ backgroundColor: heroCast[1].color }}
              >
                <img
                  src={heroCast[1].image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Back character (bottom-left, muted, tilted the other way) */}
            {heroCast[2] && (
              <div
                className="absolute bottom-4 left-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-ink overflow-hidden shadow-[4px_4px_0px_0px_var(--color-ink)] rotate-[-12deg] animate-float z-10"
                style={{ backgroundColor: heroCast[2].color }}
              >
                <img
                  src={heroCast[2].image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Main character, front and center */}
            {heroCast[0] && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div
                  className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-[45%_55%_60%_40%/55%_45%_55%_45%] border-4 border-ink overflow-hidden shadow-[8px_8px_0px_0px_var(--color-ink)] animate-float-avatar"
                  style={{ backgroundColor: heroCast[0].color }}
                >
                  <img
                    src={heroCast[0].image}
                    alt={heroCast[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -top-4 right-10 w-11 h-11 rounded-full bg-white border-3 border-ink flex items-center justify-center text-lemon-dark shadow-[3px_3px_0px_0px_var(--color-ink)] rotate-12"
                >
                  <HiSparkles />
                </span>
              </div>
            )}

            {/* Mini floating stat chips */}
            {miniStats[1] && (
              <div
                className="hidden sm:flex absolute top-3 left-0 items-center gap-1.5 bg-white/95 backdrop-blur-sm border-2 border-ink rounded-full px-3 py-1.5 shadow-[3px_3px_0px_0px_var(--color-ink)] font-display font-semibold text-xs text-ink animate-float z-30"
                style={{ animationDelay: "0.5s" }}
              >
                <span>{miniStats[1].emoji}</span> {miniStats[1].label}
              </div>
            )}
            {miniStats[2] && (
              <div
                className="hidden sm:flex absolute bottom-24 right-0 items-center gap-1.5 bg-white/95 backdrop-blur-sm border-2 border-ink rounded-full px-3 py-1.5 shadow-[3px_3px_0px_0px_var(--color-ink)] font-display font-semibold text-xs text-ink animate-float-slower z-30"
              >
                <span>{miniStats[2].emoji}</span> {miniStats[2].label}
              </div>
            )}
            {miniStats[3] && (
              <div
                className="hidden md:flex absolute top-[38%] -left-4 items-center gap-1.5 bg-white/95 backdrop-blur-sm border-2 border-ink rounded-full px-3 py-1.5 shadow-[3px_3px_0px_0px_var(--color-ink)] font-display font-semibold text-xs text-ink animate-float z-30"
                style={{ animationDelay: "0.9s" }}
              >
                <span>{miniStats[3].emoji}</span> {miniStats[3].label}
              </div>
            )}

            {/* "Sejak 2020" — main floating stat card, in front of the illustration */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-64 animate-float z-30"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative bg-gradient-to-br from-white via-white to-lemon-light/50 rounded-[1.75rem] border-4 border-ink p-5 shadow-[6px_6px_0px_0px_var(--color-ink)]">
                <span
                  aria-hidden="true"
                  className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-berry border-3 border-ink"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-leaf-light border-3 border-ink"
                />
                <div className="relative flex items-center gap-3">
                  <span className="w-14 h-14 shrink-0 rounded-2xl bg-lemon-light border-3 border-ink flex items-center justify-center shadow-[3px_3px_0px_0px_var(--color-ink)]">
                    <GiFruitBowl className="text-3xl text-lemon-dark" />
                  </span>
                  <div>
                    <p className="font-display font-bold text-lg text-ink leading-tight">
                      {miniStats[0].emoji} Sejak 2020
                    </p>
                    <p className="text-ink/65 text-xs leading-snug mt-0.5">
                      MiniLemon menemani ribuan anak Indonesia belajar
                      dengan gembira, satu cerita ceria setiap harinya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Right: heading, copy, feature cards, CTA                       */}
        {/* -------------------------------------------------------------- */}
        <div data-aos="fade-left">
          <span className="inline-flex items-center gap-2 bg-leaf-light text-leaf-dark font-display font-semibold px-4 py-2 rounded-full border-2 border-ink text-sm mb-5 shadow-[2px_2px_0px_0px_var(--color-ink)]">
            <GiFruitBowl className="text-base animate-pulse" /> Tentang Kami
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-ink mb-5">
            Rumah Ceria untuk
            <br /> Tumbuh Kembang{" "}
            <span className="text-lemon-dark relative inline-block">
              Si Kecil
              <svg
                className="absolute left-0 -bottom-1.5 w-full"
                height="10"
                viewBox="0 0 160 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8 Q 40 1, 80 7 T 158 5"
                  stroke="#4CB56F"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-ink/70 text-base leading-relaxed mb-9 max-w-lg">
            MiniLemon lahir dari mimpi sederhana: membuat belajar menjadi
            momen yang paling dinanti anak-anak setiap hari. Bersama geng
            Lemon Squad, si kecil diajak menjelajahi dunia membaca,
            berhitung, seni, sains, olahraga, hingga musik lewat cerita dan
            aktivitas yang penuh warna.
          </p>

          <div className="space-y-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`group flex items-start gap-4 p-5 rounded-2xl border-3 border-ink/80 bg-gradient-to-br ${v.bg} to-white/40 shadow-[3px_3px_0px_0px_rgba(44,58,52,0.15)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[5px_8px_0px_0px_rgba(44,58,52,0.2)]`}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <span className="text-3xl text-ink bg-white w-14 h-14 flex items-center justify-center rounded-full border-3 border-ink shrink-0 shadow-[2px_2px_0px_0px_var(--color-ink)] transition-transform duration-300 group-hover:scale-110">
                  {v.icon}
                </span>
                <div>
                  <h3 className="font-display font-bold text-ink mb-1 text-lg">
                    {v.title}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/tentang"
            className="group inline-flex items-center gap-2 mt-9 bg-lemon text-ink font-display font-semibold px-7 py-3.5 rounded-full border-3 border-ink shadow-[4px_4px_0px_0px_var(--color-ink)] transition-all duration-300 hover:scale-105 hover:shadow-[6px_6px_0px_0px_var(--color-ink)] hover:-translate-y-0.5"
          >
            Lihat Selengkapnya{" "}
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;