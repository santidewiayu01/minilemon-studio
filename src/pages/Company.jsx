import { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaBullseye, FaCircleCheck, FaRocket, FaUsers, FaLightbulb, FaLayerGroup, FaHandshakeAngle, FaArrowsRotate } from "react-icons/fa6";
import companyData from "../data/company";
import divisions from "../data/divisions";
import DivisionIcon from "../components/DivisionIcon";
import SectionDivider from "../components/SectionDivider";
import SplineViewer from "../components/SplineViewer";
import { useFooterDividerColor } from "../context/FooterDividerContext";
import { scrollToTarget } from "../scroll/lenis";
import { SECTION_COLORS } from "../theme/sectionColors";

const ABOUT_HERO_SPLINE_URL = "https://prod.spline.design/y5sYJhz3RUKe-1Vc/scene.splinecode";

const { about, journey, vision, mission, founders, team } = companyData;

// "How We Create" — the studio's real working principles, not a set of
// invented dates or numbers. Sits between the Journey and the eight
// Divisions on purpose: this is the connective "how" before the "who
// does what" grid that follows it.
const PRINCIPLES = [
  {
    icon: FaLightbulb,
    title: "Concept-First",
    text: "Setiap proyek dimulai dari riset dan ide yang matang, sebelum satu frame pun dieksekusi.",
  },
  {
    icon: FaLayerGroup,
    title: "Satu Alur Produksi",
    text: "Delapan divisi bekerja dalam satu pipeline yang saling terhubung, dari konsep sampai delivery.",
  },
  {
    icon: FaHandshakeAngle,
    title: "Mentorship Nyata",
    text: "Tim profesional membimbing langsung di setiap tahap — termasuk peserta magang yang ikut produksi.",
  },
  {
    icon: FaArrowsRotate,
    title: "Iterasi & Kualitas",
    text: "Review dan revisi berkelanjutan sampai setiap karya memenuhi standar industri, bukan sekadar selesai.",
  },
];

// Ambient particle field — same recipe as the homepage Hero and the
// Aktivitas Divisi pipeline hero, generated once at module scope since
// it's purely decorative and never needs to change.
const HERO_PARTICLES = Array.from({ length: 22 }).map((_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  top: Math.round(Math.random() * 100),
  size: 1.5 + Math.random() * 2.5,
  duration: 9 + Math.random() * 9,
  delay: Math.random() * 8,
  x: Math.round((Math.random() - 0.5) * 60),
  y: -Math.round(40 + Math.random() * 80),
  opacity: 0.18 + Math.random() * 0.3,
}));

const HeroParticleField = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {HERO_PARTICLES.map((p) => (
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

// Idle spin on the model's stage while it's in view — same slow-float
// language as the homepage drone and the pipeline hero model, so all
// three Spline stages across the site feel like the same object.
// Skipped for reduced-motion.
const AboutHeroModel = () => {
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
      <SplineViewer url={ABOUT_HERO_SPLINE_URL} />
    </div>
  );
};

const Company = () => {
  // Team is the true last section on this page — announce Dark Navy so
  // the Footer (also Dark Navy) meets it without a seam.
  useFooterDividerColor(SECTION_COLORS.void);
  const navigate = useNavigate();
  const location = useLocation();

  // Same "navigate home first if needed, then ease-scroll" behavior used
  // by the Navbar and Footer for in-page anchors that live on the
  // homepage — this page isn't "/", so the plain hash trick a <Link>
  // would otherwise rely on never actually scrolls anywhere.
  const handleAnchor = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToTarget(sectionId), 150);
    } else {
      scrollToTarget(sectionId);
    }
  };

  return (
    <div>
      {/* 1. Who We Are — dark navy futuristic hero, same visual language
          as the homepage Hero and the Aktivitas Divisi pipeline hero:
          tech grid, particle field, orbit rings, and the studio's own
          3D Spline model, so this page opens as part of the same world
          instead of a separate, static company-profile page. */}
      <section className="relative bg-void pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="tech-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/92 to-void" aria-hidden="true" />
        <div className="light-sweep" aria-hidden="true" />
        <HeroParticleField />

        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-20 hidden lg:block">
          <div className="orbit-ring animate-orbit h-[26rem] w-[26rem]" />
          <div className="orbit-ring orbit-ring--gold animate-orbit-reverse absolute inset-[3rem]" />
          <div
            className="orbit-ring orbit-ring--cyan animate-orbit absolute inset-[6rem]"
            style={{ animationDuration: "34s" }}
          />
          <span className="animate-orbit-pulse absolute left-[3rem] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(255,216,77,0.5)]" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          <Link
            to="/"
            className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 font-display font-semibold text-frost/65 hover:text-gold mb-10 transition-colors text-sm"
          >
            <FaArrowLeft className="text-xs" /> Kembali ke Beranda
          </Link>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-8 items-center">
            <div data-aos="fade-right">
              <span className="kicker-studio mb-4 block">{about.title}</span>
              <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-[3.4rem] leading-[0.98] tracking-tight text-frost mb-6">
                Satu studio, <span className="text-gold">delapan divisi</span> kreatif.
              </h1>
              <div className="space-y-4 text-frost/55 leading-relaxed max-w-lg">
                {about.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-10">
                <button
                  type="button"
                  onClick={() => handleAnchor("studio-life")}
                  className="btn-studio-solid inline-flex items-center gap-2.5 font-display font-semibold px-7 py-3.5"
                >
                  Lihat Divisi Kami
                  <FaArrowRight className="text-sm" />
                </button>
                <Link
                  to="/kegiatan-studio"
                  className="btn-studio-ghost inline-flex items-center gap-2.5 font-display font-semibold px-7 py-3.5"
                >
                  Aktivitas Studio
                </Link>
              </div>
            </div>

            <div
              className="relative h-[280px] sm:h-[360px] lg:h-[480px] w-full"
              data-aos="fade-left"
              data-aos-delay="120"
            >
              <AboutHeroModel />
            </div>
          </div>
        </div>

        <SectionDivider topColor={SECTION_COLORS.void} bottomColor={SECTION_COLORS.cream} />
      </section>

      {/* 2. Our Journey */}
      <section className="relative bg-cream pb-24 md:pb-36 overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 md:px-8 relative z-10">
          <div className="mb-14" data-aos="fade-up">
            <span className="kicker text-lemon-dark mb-4 block">Perjalanan Studio</span>
            <h2 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight text-ink">
              Bagaimana kami sampai di sini.
            </h2>
          </div>

          <div className="relative pl-8 md:pl-10 border-l-2 border-ink/10 space-y-14">
            {journey.map((step, i) => (
              <div key={step.label} data-aos="fade-up" data-aos-delay={i * 60} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.55rem] md:-left-[3.05rem] top-1 w-3.5 h-3.5 rounded-full bg-lemon-dark ring-4 ring-cream"
                />
                <span className="kicker text-ink/35 mb-2 block">{step.label}</span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-ink mb-2">{step.title}</h3>
                <p className="text-ink/55 leading-relaxed max-w-xl">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How We Create */}
      <section className="relative bg-void-2 pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          <div className="max-w-2xl mb-14" data-aos="fade-up">
            <span className="kicker-studio mb-4 block">How We Create</span>
            <h2 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight text-frost">
              Prinsip kerja, bukan slogan.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center text-xl text-gold mb-5">
                  <p.icon />
                </span>
                <h3 className="font-display font-semibold text-frost mb-2">{p.title}</h3>
                <p className="text-frost/50 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Eight Creative Divisions */}
      <section className="relative bg-void-2 pt-4 pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          <div className="max-w-2xl mb-14" data-aos="fade-up">
            <span className="kicker-studio mb-4 block">Delapan Divisi</span>
            <h2 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight text-frost">
              Divisi kreatif Studio Minilemon.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {divisions.map((d, i) => (
              <div
                key={d.id}
                data-aos="fade-up"
                data-aos-delay={(i % 4) * 60}
                className="group bg-void-2 p-6 md:p-7 hover:bg-white/[0.03] transition-colors duration-300"
              >
                <span className="text-2xl mb-4 block transition-transform duration-300 group-hover:-translate-y-0.5" style={{ color: d.accent }}>
                  <DivisionIcon icon={d.icon} />
                </span>
                <h3 className="font-display font-semibold text-frost mb-1.5">{d.name}</h3>
                <p className="text-frost/45 text-xs leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Vision & Mission */}
      <section className="relative bg-cream py-24 md:py-36 overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 md:px-8 relative z-10 grid md:grid-cols-2 gap-6 md:gap-8">
          <div data-aos="fade-right" className="card-soft group bg-white rounded-2xl p-8 md:p-10">
            <span className="w-12 h-12 rounded-full bg-cyan/15 flex items-center justify-center text-xl text-sky-dark mb-5">
              <FaBullseye />
            </span>
            <h3 className="font-display font-bold text-2xl text-ink mb-4">{vision.title}</h3>
            <div className="space-y-3 text-ink/60 leading-relaxed text-[15px]">
              {vision.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div data-aos="fade-left" className="card-soft group bg-void-2 rounded-2xl p-8 md:p-10">
            <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl text-gold mb-5">
              <FaRocket />
            </span>
            <h3 className="font-display font-bold text-2xl text-frost mb-4">{mission.title}</h3>
            <ul className="space-y-3 text-[15px]">
              {mission.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-frost/70">
                  <FaCircleCheck className="text-gold mt-1 shrink-0 text-xs" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Founders */}
      <section className="relative bg-void py-24 md:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 md:px-8 relative z-10">
          <div className="max-w-2xl mb-14" data-aos="fade-up">
            <span className="kicker-studio mb-4 block">Di Balik Layar</span>
            <h2 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight text-frost">
              Para pendiri.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-10 md:gap-12 max-w-3xl">
            {founders.map((f, i) => (
              <div key={f.name} data-aos="fade-up" data-aos-delay={i * 80} className="group text-center sm:text-left">
                <div className="w-24 h-24 mx-auto sm:mx-0 mb-4 rounded-full overflow-hidden ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-1">
                  <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display font-bold text-frost">{f.name}</h3>
                <p className="text-sm text-gold/80">{f.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Studio Team */}
      <section className="relative bg-void pt-4 pb-20 md:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12" data-aos="fade-up">
            <div>
              <span className="kicker-studio mb-4 block">Tim Kami</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-frost">{team.title}</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 font-display font-semibold text-xs text-frost/50">
              <FaUsers className="text-[11px]" /> {team.members.length} Anggota
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-6 md:gap-8">
            {team.members.map((member, i) => (
              <div
                key={member.name + i}
                data-aos="fade-up"
                data-aos-delay={(i % 8) * 50}
                className="text-center group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full overflow-hidden ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-1">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs md:text-[13px] font-display font-semibold leading-snug text-frost/75">
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Closing CTA — the page's real last word before the Footer.
          Same Dark Navy as Team and Footer on purpose (no seam needed,
          see useFooterDividerColor above): a bordered glass band that
          gives the page a deliberate, designed ending instead of just
          letting the team grid trail off into the footer's padding. */}
      <section className="relative bg-void pb-24 md:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          <div
            data-aos="fade-up"
            className="glass-panel rounded-3xl px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 text-center md:text-left"
          >
            <div className="max-w-lg">
              <span className="kicker-studio mb-3 block">Gabung Bersama Kami</span>
              <h3 className="font-display font-bold text-2xl md:text-[2rem] leading-[1.1] tracking-tight text-frost mb-3">
                Ingin belajar langsung di dalam studio produksi kami?
              </h3>
              <p className="text-frost/55 leading-relaxed">
                Lihat bagaimana delapan divisi kami bekerja setiap hari, atau daftar
                sebagai peserta magang dan ikut memproduksi karya nyata bersama tim.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto md:w-auto">
              <Link
                to="/kegiatan-studio"
                className="btn-studio-solid inline-flex items-center justify-center gap-2.5 font-display font-semibold px-7 py-3.5 whitespace-nowrap"
              >
                Lihat Aktivitas Divisi
                <FaArrowRight className="text-sm" />
              </Link>
              <button
                onClick={() => handleAnchor("internship")}
                className="btn-studio-ghost inline-flex items-center justify-center gap-2.5 font-display font-semibold px-7 py-3.5 whitespace-nowrap"
              >
                Info Program Magang
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
