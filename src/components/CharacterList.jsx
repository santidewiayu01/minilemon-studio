import { useMemo, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import characters from "../data/characters";
import CharacterCard from "./CharacterCard";
import SectionDivider from "./SectionDivider";
import { SECTION_COLORS } from "../theme/sectionColors";
import {
  LeafMotif,
  LemonSlice,
  CloudShape,
  BubbleShape,
  SparkleShape,
} from "./SceneDecor";

// Canonical region order requested for the filter chips. Any character
// whose `subject` isn't one of these (e.g. joke/non-regional characters
// like the robot sidekick) still stays reachable through "Lainnya" instead
// of silently disappearing, and through "Semua" either way.
const REGION_ORDER = ["Papua", "Jawa", "Sunda", "Batak", "Bali", "Tionghoa"];
const OTHER_LABEL = "Lainnya";

const CharacterList = () => {
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("Semua");

  const filterOptions = useMemo(() => {
    const subjects = new Set(characters.map((c) => c.subject));
    const known = REGION_ORDER.filter((r) => subjects.has(r));
    const hasOther = [...subjects].some((s) => !REGION_ORDER.includes(s));
    return ["Semua", ...known, ...(hasOther ? [OTHER_LABEL] : [])];
  }, []);

  // Karakter utama (spotlight) — ganti FEATURED_ID untuk mengganti karakter
  // yang tampil di card utama, tanpa perlu mengubah urutan data asli.
  const FEATURED_ID = "togar";
  const featured = characters.find((c) => c.id === FEATURED_ID) ?? characters[0];
  const rest = characters.filter((c) => c.id !== featured.id);

  const matchesRegion = (char) => {
    if (activeRegion === "Semua") return true;
    if (activeRegion === OTHER_LABEL) return !REGION_ORDER.includes(char.subject);
    return char.subject === activeRegion;
  };

  const matchesQuery = (char) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      char.name.toLowerCase().includes(q) ||
      char.subject.toLowerCase().includes(q) ||
      char.role.toLowerCase().includes(q)
    );
  };

  const filteredRest = rest.filter((c) => matchesRegion(c) && matchesQuery(c));
  const featuredVisible = matchesRegion(featured) && matchesQuery(featured);
  const isFiltering = query.trim() !== "" || activeRegion !== "Semua";
  const totalVisible = filteredRest.length + (featuredVisible ? 1 : 0);

  return (
    <section
      id="characters"
      className="relative bg-sky-light pt-20 pb-28 md:pt-28 md:pb-32 overflow-hidden"
    >
      {/* ---- Living background: leaves, lemon slices, clouds, bubbles, sparkles ---- */}
      <div className="lemon-dot-pattern absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true" />

      <LeafMotif className="absolute top-10 left-[4%] w-16 h-16 text-leaf/25 rotate-[-18deg] animate-float hidden md:block" />
      <LeafMotif className="absolute bottom-16 left-[10%] w-12 h-12 text-leaf/20 rotate-[12deg] animate-float-slower hidden md:block" />
      <LeafMotif className="absolute bottom-24 right-[14%] w-14 h-14 text-leaf-dark/20 rotate-[-10deg] animate-float" />

      <LemonSlice className="absolute top-24 right-[6%] w-16 h-16 text-lemon-dark/25 rotate-[18deg] animate-float-slower hidden lg:block" />
      <LemonSlice className="absolute bottom-32 left-[3%] w-12 h-12 text-lemon-dark/20 rotate-[-14deg] animate-float hidden md:block" />

      <CloudShape className="absolute top-16 left-[22%] w-28 h-16 text-white/70 animate-drift hidden lg:block" />
      <CloudShape className="absolute top-40 right-[24%] w-20 h-12 text-white/60 animate-drift hidden xl:block" style={{ animationDelay: "2s" }} />

      <BubbleShape className="absolute top-[30%] left-[16%] w-6 h-6 border-white/40 bg-white/10 animate-drift hidden md:block" />
      <BubbleShape className="absolute bottom-[22%] right-[8%] w-10 h-10 border-white/40 bg-white/10 animate-drift" style={{ animationDelay: "1.5s" }} />
      <BubbleShape className="absolute top-[55%] right-[30%] w-4 h-4 border-white/40 bg-white/10 animate-drift hidden lg:block" style={{ animationDelay: "3s" }} />

      <SparkleShape className="absolute top-[18%] right-[38%] w-4 h-4 text-lemon-dark animate-sparkle hidden md:block" />
      <SparkleShape className="absolute bottom-[38%] left-[28%] w-3 h-3 text-sky-dark animate-sparkle" style={{ animationDelay: "1s" }} />
      <SparkleShape className="absolute top-[65%] right-[12%] w-3 h-3 text-berry animate-sparkle hidden lg:block" style={{ animationDelay: "0.5s" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 bg-white text-sky-dark font-display font-semibold px-4 py-2 rounded-full border-2 border-ink text-sm mb-4">
            <LeafMotif className="w-4 h-4 text-leaf-dark" /> Kenalan Yuk!
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-3">
            Sahabat-Sahabat di Lemon Squad
          </h2>
          <p className="text-ink/70">
            Setiap karakter punya keahlian dan pelajaran serunya sendiri.
            Cari atau saring berdasarkan daerah, lalu klik salah satu untuk
            berkenalan lebih dekat!
          </p>
        </div>

        {/* ---- Search + region filter ---- */}
        <div
          className="flex flex-col md:flex-row md:items-center gap-4 mb-10 bg-white/80 backdrop-blur-sm border-2 border-ink/10 rounded-2xl p-3 md:p-4 shadow-sm"
          data-aos="fade-up"
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 text-sm" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama karakter…"
              className="w-full rounded-xl border-2 border-ink/15 bg-cream pl-10 pr-9 py-2.5 text-sm font-body outline-none transition-colors focus:border-sky-dark"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setActiveRegion(option)}
                className={`px-3.5 py-1.5 rounded-full border-2 text-xs md:text-sm font-display font-semibold transition-colors ${
                  activeRegion === option
                    ? "bg-leaf-dark border-ink text-cream"
                    : "bg-cream border-ink/15 text-ink/70 hover:border-leaf-dark hover:text-leaf-dark"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* ---- Roster: spotlight featured card + dynamic grid ---- */}
        {totalVisible === 0 ? (
          <div
            className="text-center bg-white/70 border-2 border-dashed border-ink/20 rounded-3xl py-16 px-6"
            data-aos="fade-up"
          >
            <HiSparkles className="mx-auto text-4xl text-lemon-dark mb-3" />
            <p className="font-display font-semibold text-ink mb-1">
              Karakternya belum ketemu, nih!
            </p>
            <p className="text-ink/60 text-sm">
              Coba kata kunci lain atau pilih filter daerah yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
            {featuredVisible && (
              <CharacterCard character={featured} index={0} featured />
            )}
            {filteredRest.map((char, i) => (
              <CharacterCard character={char} index={i + 1} key={char.id} />
            ))}
          </div>
        )}

        {isFiltering && totalVisible > 0 && (
          <p className="text-center text-sm text-ink/50 mt-6">
            Menampilkan {totalVisible} dari {characters.length} karakter
          </p>
        )}
      </div>

      {/* Scallop transition to next section (Produk Kita) */}
      <SectionDivider topColor={SECTION_COLORS.skyLight} bottomColor={SECTION_COLORS.leafLight} />
    </section>
  );
};

export default CharacterList;
