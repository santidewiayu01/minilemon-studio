import { Link } from "react-router-dom";
import { FaArrowRight, FaLeaf, FaMapMarkerAlt, FaStar } from "react-icons/fa";

// Collectible-card style character tile. Pass `featured` for the single
// spotlight card shown at the top of the roster (bigger avatar, richer
// copy, horizontal layout); every other card renders the compact grid
// version. Both share the same data shape and the same visual language
// (ink outline, sticker shadow, folded corner) so the roster still reads
// as one consistent set even though sizes differ.
const CharacterCard = ({ character, index = 0, featured = false }) => {
  const { id, name, image, role, color, ring, subject, tagline, traits } = character;
  const isDark = index % 2 !== 0;
  const trait = traits?.[0];

  if (featured) {
    return (
      <Link
        to={`/karakter/${id}`}
        data-aos="fade-up"
        data-aos-duration="600"
        className="character-card group relative col-span-full flex flex-col md:flex-row items-center gap-6 md:gap-10 overflow-hidden rounded-[2rem] bg-white p-6 md:p-10"
        style={{ "--card-glow": `${color}66` }}
      >
        {/* Soft color wash + blurred accent circle behind everything */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: `linear-gradient(135deg, ${color}22, transparent 60%)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full blur-2xl opacity-40"
          style={{ backgroundColor: color }}
        />

        {/* Corner ribbon */}
        <span className="absolute top-4 left-4 md:top-6 md:left-6 z-10 inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-lemon px-3 py-1 text-xs font-display font-bold text-ink shadow-[3px_3px_0px_0px_var(--color-ink)]">
          <FaStar className="text-[10px]" /> Karakter Utama
        </span>

        <div className="relative shrink-0 w-40 h-40 md:w-52 md:h-52">
          <div className="w-full h-full animate-float-avatar transition-transform duration-500 group-hover:-translate-y-2">
            <div
              className="absolute inset-0 rounded-full border-4 border-ink overflow-hidden"
              style={{ backgroundColor: color }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full border-3 border-ink flex items-center justify-center text-white shadow-[3px_3px_0px_0px_var(--color-ink)]"
            style={{ backgroundColor: ring }}
          >
            <FaStar />
          </div>
        </div>

        <div className="relative z-10 text-center md:text-left flex-1">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 text-xs font-display font-semibold text-ink mb-3"
            style={{ backgroundColor: color }}
          >
            <FaMapMarkerAlt className="text-[10px]" /> {subject}
          </span>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-ink mb-1">{name}</h3>
          <p className="font-semibold mb-3" style={{ color: ring }}>
            {role}
          </p>
          <p className="text-ink/70 italic mb-4">&ldquo;{tagline}&rdquo;</p>

          {traits && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-5">
              {traits.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold bg-cream border-2 border-ink/15 text-ink/70 px-3 py-1.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-display font-semibold text-cream transition-all duration-300 group-hover:gap-3 group-hover:bg-leaf-dark">
            Kenalan Yuk <FaArrowRight className="text-sm" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/karakter/${id}`}
      data-aos="zoom-in"
      data-aos-delay={index * 60}
      data-aos-duration="500"
      data-aos-easing="ease-out-back"
      className={`character-card group relative flex flex-col rounded-3xl p-5 pt-7 overflow-hidden ${
        isDark ? "bg-midnight" : "bg-buttermilk"
      }`}
      style={{ "--card-glow": `${color}55` }}
    >
      {/* Subtle lemon-leaf watermark texture */}
      <FaLeaf
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -left-4 text-[80px] rotate-12 opacity-[0.1] transition-transform duration-300 group-hover:rotate-[24deg]"
        style={{ color }}
      />

      {/* Folded-corner accent */}
      <span
        aria-hidden="true"
        className={`absolute top-0 right-0 w-9 h-9 border-b-3 border-l-3 ${
          isDark ? "border-cream" : "border-ink"
        }`}
        style={{
          background: `linear-gradient(135deg, ${ring} 50%, transparent 50.5%)`,
          borderTopRightRadius: "1.5rem",
        }}
      />

      {/* Border-highlight ring that appears on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl border-2 opacity-0 scale-[1.03] transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
        style={{ borderColor: ring }}
      />

      <div className="relative w-24 h-24 mx-auto mb-3">
        <div className="w-full h-full animate-float-avatar transition-transform duration-300 group-hover:-translate-y-1.5">
          <div
            className={`absolute inset-0 rounded-full border-4 overflow-hidden ${
              isDark ? "border-cream" : "border-ink"
            }`}
            style={{ backgroundColor: color }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
        <div
          className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-3 flex items-center justify-center ${
            isDark ? "border-cream" : "border-ink"
          }`}
          style={{ backgroundColor: ring }}
        />
      </div>

      {/* Region badge */}
      <span
        className={`relative mx-auto mb-2 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border-2 ${
          isDark ? "bg-cream/10 border-cream/25 text-cream/85" : "bg-white/70 border-ink/15 text-ink/70"
        }`}
      >
        <FaMapMarkerAlt className="text-[9px]" /> {subject}
      </span>

      <h3
        className={`relative font-display font-bold text-lg text-center mb-1 ${
          isDark ? "text-cream" : "text-ink"
        }`}
      >
        {name}
      </h3>
      {trait && (
        <p
          className="relative text-center font-semibold text-xs mb-3"
          style={{ color: isDark ? "#ffd93d" : ring }}
        >
          {trait}
        </p>
      )}

      <div className="relative mt-auto pt-3">
        <span
          className={`flex items-center justify-center gap-1.5 w-full rounded-full border-2 py-2 text-sm font-display font-semibold transition-all duration-300 group-hover:gap-2.5 ${
            isDark
              ? "border-cream/25 text-cream group-hover:bg-lemon group-hover:text-ink group-hover:border-ink"
              : "border-ink/20 text-ink group-hover:bg-ink group-hover:text-cream group-hover:border-ink"
          }`}
        >
          Kenalan <FaArrowRight className="text-xs" />
        </span>
      </div>
    </Link>
  );
};

export default CharacterCard;
