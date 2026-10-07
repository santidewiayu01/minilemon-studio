import { FaFilm, FaGraduationCap, FaBookOpen, FaMobileAlt } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import SectionDivider from "./SectionDivider";
import { SECTION_COLORS } from "../theme/sectionColors";
import { LeafMotif, LemonSlice, SparkleShape } from "./SceneDecor";

const offerings = [
  {
    icon: <FaFilm />,
    title: "Animation Production",
    desc: "Produksi film dan serial animasi dari konsep, storyboard, hingga render akhir.",
    bg: "bg-lemon-light",
    ring: "#F3B900",
  },
  {
    icon: <GiFruitBowl />,
    title: "Character Development",
    desc: "Merancang karakter dengan kepribadian dan nilai yang kuat, siap membawa cerita apa pun.",
    bg: "bg-sky-light",
    ring: "#3FB7E0",
  },
  {
    icon: <FaGraduationCap />,
    title: "Educational Content",
    desc: "Menyusun materi belajar yang dikemas menjadi pengalaman yang mudah dicerna anak-anak.",
    bg: "bg-leaf-light",
    ring: "#2F9354",
  },
  {
    icon: <FaBookOpen />,
    title: "Creative Storytelling",
    desc: "Meracik naskah dan alur cerita yang membawa pesan moral tanpa terasa menggurui.",
    bg: "bg-lemon-light",
    ring: "#F3B900",
  },
  {
    icon: <FaMobileAlt />,
    title: "Digital Media",
    desc: "Menghadirkan karya lewat platform digital: aplikasi, media sosial, hingga siaran langsung.",
    bg: "bg-sky-light",
    ring: "#3FB7E0",
  },
];

const WhatWeCreate = () => {
  return (
    <section id="what-we-create" className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <div className="lemon-dot-pattern absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true" />
      <LeafMotif className="absolute top-14 right-[6%] w-16 h-16 text-leaf/20 rotate-[16deg] animate-float hidden lg:block" />
      <LemonSlice className="absolute bottom-16 left-[6%] w-12 h-12 text-lemon-dark/20 rotate-[-12deg] animate-float-slower hidden md:block" />
      <SparkleShape className="absolute top-[20%] left-[20%] w-4 h-4 text-sky-dark/50 animate-sparkle hidden md:block" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
          <span className="inline-block bg-white text-leaf-dark font-display font-semibold px-4 py-2 rounded-full border-2 border-ink text-sm mb-4">
            Apa yang Kami Kerjakan
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-3">
            What We Create
          </h2>
          <p className="text-ink/70">
            Lima bidang kreatif yang saling terhubung dalam setiap karya Mini Lemon.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((o, i) => (
            <div
              key={o.title}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="sticker-card group relative bg-white rounded-3xl p-7 overflow-hidden"
            >
              <span
                className={`w-14 h-14 rounded-2xl border-3 border-ink flex items-center justify-center text-2xl mb-5 ${o.bg} transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6`}
                style={{ color: o.ring }}
              >
                {o.icon}
              </span>
              <h3 className="font-display font-bold text-lg text-ink mb-2">{o.title}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider topColor={SECTION_COLORS.cream} bottomColor={SECTION_COLORS.midnight} />
    </section>
  );
};

export default WhatWeCreate;
