import { useParams, Link, Navigate } from "react-router-dom";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import characters from "../data/characters";
import CharacterCard from "../components/CharacterCard";
import { useFooterDividerColor } from "../context/FooterDividerContext";
import { SECTION_COLORS } from "../theme/sectionColors";
import {
  LeafMotif,
  LemonSlice,
  BubbleShape,
  SparkleShape,
} from "../components/SceneDecor";

const CharacterDetail = () => {
  const { id } = useParams();
  const character = characters.find((c) => c.id === id);

  // This page has a single section (bg-cream) that sits directly above
  // the Footer. Registered unconditionally at the top so hook order stays
  // stable even though the component can return early below.
  useFooterDividerColor(SECTION_COLORS.cream);

  if (!character) return <Navigate to="/" replace />;

  const others = characters.filter((c) => c.id !== id).slice(0, 3);

  return (
    <section className="relative pt-32 pb-24 bg-cream min-h-screen overflow-hidden">
      {/* ---- Partikel dekoratif di background ---- */}
      <div className="lemon-dot-pattern absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true" />

      <LeafMotif className="absolute top-24 left-[5%] w-14 h-14 text-leaf/20 rotate-[-16deg] animate-float hidden md:block" />
      <LeafMotif className="absolute bottom-28 right-[8%] w-16 h-16 text-leaf-dark/20 rotate-[10deg] animate-float-slower hidden lg:block" />

      <LemonSlice className="absolute top-40 right-[6%] w-14 h-14 text-lemon-dark/20 rotate-[16deg] animate-float-slower hidden lg:block" />
      <LemonSlice className="absolute bottom-16 left-[8%] w-12 h-12 text-lemon-dark/20 rotate-[-12deg] animate-float hidden md:block" />

      <BubbleShape className="absolute top-[22%] left-[14%] w-6 h-6 border-white/50 bg-white/10 animate-drift hidden md:block" />
      <BubbleShape className="absolute bottom-[20%] right-[12%] w-8 h-8 border-white/50 bg-white/10 animate-drift" style={{ animationDelay: "1.5s" }} />

      <SparkleShape className="absolute top-[16%] right-[30%] w-4 h-4 text-lemon-dark animate-sparkle hidden md:block" />
      <SparkleShape className="absolute bottom-[30%] left-[26%] w-3 h-3 text-sky-dark animate-sparkle" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-display font-semibold text-ink/70 hover:text-leaf-dark mb-8 transition-colors"
        >
          <FaArrowLeft /> Kembali ke Beranda
        </Link>

        <div
          className="relative overflow-hidden bg-white rounded-[2rem] border-4 border-ink p-6 md:p-10 shadow-[8px_8px_0px_0px_var(--color-ink)] grid md:grid-cols-[280px_1fr] gap-10 items-start"
          style={{ "--card-glow": `${character.color}66` }}
          data-aos="fade-up"
        >
          {/* Warna wash + aksen blur, disamakan dengan gaya card karakter saat ini */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: `linear-gradient(135deg, ${character.color}22, transparent 60%)` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full blur-2xl opacity-40"
            style={{ backgroundColor: character.color }}
          />

          <div className="relative z-10 w-56 h-56 md:w-64 md:h-64 mx-auto">
            <div
              className="absolute inset-0 rounded-full border-4 border-ink overflow-hidden"
              style={{ backgroundColor: character.color }}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-contain p-3"
              />
            </div>
            <div
              className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full border-3 border-ink flex items-center justify-center text-white"
              style={{ backgroundColor: character.ring }}
            >
              <FaStar />
            </div>
          </div>

          <div className="relative z-10">
            <span
              className="inline-block font-display font-semibold px-4 py-1.5 rounded-full border-2 border-ink text-sm mb-3"
              style={{ backgroundColor: character.color }}
            >
              Asal {character.subject}
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-ink mb-1">
              {character.name}
            </h1>
            <p className="font-semibold mb-4" style={{ color: character.ring }}>
              {character.role}
            </p>
            <p className="text-ink/75 leading-relaxed mb-6">
              {character.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {character.traits.map((trait) => (
                <span
                  key={trait}
                  className="text-xs font-semibold bg-cream border-2 border-ink/15 text-ink/70 px-3 py-1.5 rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>

            <div className="bg-cream rounded-2xl border-2 border-ink/10 p-4 inline-block">
              <p className="text-xs text-ink/50 mb-1">Barang Favorit</p>
              <p className="font-display font-semibold text-ink">
                {character.favThing}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl text-ink mb-6" data-aos="fade-up">
            Kenalan Juga Sama Teman Lainnya
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {others.map((c, i) => (
              <CharacterCard character={c} index={i} key={c.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterDetail;
