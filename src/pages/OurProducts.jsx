import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChild,
  FaTags,
  FaTv,
  FaFilm,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import products from "../data/products";
import { useFooterDividerColor } from "../context/FooterDividerContext";
import { SECTION_COLORS } from "../theme/sectionColors";
import {
  LeafMotif,
  LemonSlice,
  CloudShape,
  SparkleShape,
  BlobShape,
} from "../components/SceneDecor";

// Scroll-reveal variants shared by the hero copy and every product card.
// `custom` (the card's index) staggers each card's entrance slightly so
// the list "cascades" into place instead of popping in all at once.
const fadeUp = {
  hidden: { opacity: 0, y: 46 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Small metadata pill (usia / kategori / platform / jenis konten) shown
// under every product's description, each with a tiny icon for quick
// scanning.
const MetaPill = ({ icon, label, isDark }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-display font-semibold ${
      isDark
        ? "border-cream/25 bg-cream/10 text-cream/85"
        : "border-ink/15 bg-white/70 text-ink/70"
    }`}
  >
    <span className="text-[11px] opacity-80">{icon}</span>
    {label}
  </span>
);

// Playful wavy + lemon-slice divider dropped between each product card so
// the list doesn't read as one flat stack of boxes.
const ProductGap = () => (
  <div className="relative flex items-center justify-center py-1" aria-hidden="true">
    <svg
      className="w-full max-w-xs text-ink/15"
      height="16"
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
    >
      <path
        d="M0 8 Q 25 0, 50 8 T 100 8 T 150 8 T 200 8 T 250 8 T 300 8"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute w-11 h-11 rounded-full bg-white border-3 border-ink shadow-[3px_3px_0px_0px_var(--color-ink)] flex items-center justify-center animate-float-slower">
      <LemonSlice className="w-6 h-6 text-lemon-dark" />
    </div>
  </div>
);

const ProductBlock = ({ product, index }) => {
  const [expanded, setExpanded] = useState(false);
  const imageFirst = index % 2 === 0;
  const isDark = index % 2 !== 0;
  const glow = isDark ? "rgba(255, 217, 61, 0.35)" : "rgba(76, 181, 111, 0.3)";

  return (
    <motion.div
      id={product.id}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      whileHover={{ transition: { duration: 0.2 } }}
      className={`product-card-premium group scroll-mt-28 rounded-[2.5rem] p-6 md:p-10 grid md:grid-cols-2 gap-8 md:gap-10 items-center relative overflow-hidden ${
        isDark ? "bg-xanthous text-cream" : "bg-pale-oak text-ink"
      }`}
      style={{ "--card-glow": glow }}
    >
      {/* Subtle watermark leaf, purely decorative */}
      <LeafMotif
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-6 ${
          imageFirst ? "-right-6" : "-left-6"
        } w-28 h-28 opacity-[0.06] rotate-12 ${isDark ? "text-cream" : "text-ink"}`}
      />

      <div className={`relative ${imageFirst ? "md:order-1" : "md:order-2"}`}>
        <div
          className="poster-frame rounded-3xl overflow-hidden border-4 border-ink shadow-[6px_6px_0px_0px_var(--color-ink)] aspect-[3/4] max-w-[19rem] md:max-w-[22rem] mx-auto"
          style={{ "--tilt": imageFirst ? "-2deg" : "2deg" }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className={`relative ${imageFirst ? "md:order-2" : "md:order-1"}`}>
        <span
          className={`inline-block font-display font-semibold px-4 py-1.5 rounded-full border-2 border-ink text-sm mb-3 ${
            isDark ? "bg-lemon text-ink" : "bg-lemon-light text-lemon-dark"
          }`}
        >
          {product.category}
        </span>
        <h2
          className={`font-display font-bold text-2xl md:text-3xl mb-4 ${
            isDark ? "text-cream" : "text-ink"
          }`}
        >
          {product.title}
        </h2>

        <div
          className={`space-y-3 leading-relaxed ${
            isDark ? "text-cream/80" : "text-ink/75"
          }`}
        >
          <p>{product.description[0]}</p>
          {expanded &&
            product.description
              .slice(1)
              .map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {/* Metadata: usia, kategori, platform, jenis konten */}
        <div className="flex flex-wrap gap-2 mt-5">
          {product.ageRange && (
            <MetaPill icon={<FaChild />} label={product.ageRange} isDark={isDark} />
          )}
          {product.category && (
            <MetaPill icon={<FaTags />} label={product.category} isDark={isDark} />
          )}
          {product.platform && (
            <MetaPill icon={<FaTv />} label={product.platform} isDark={isDark} />
          )}
          {product.contentType && (
            <MetaPill icon={<FaFilm />} label={product.contentType} isDark={isDark} />
          )}
        </div>

        {product.description.length > 1 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className={`group/btn mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-display font-semibold transition-all duration-300 ${
              isDark
                ? "bg-cream/10 text-cream hover:bg-lemon hover:text-ink"
                : "bg-white text-ink hover:bg-ink hover:text-cream"
            }`}
          >
            {expanded ? "Baca Lebih Sedikit" : "Baca Selengkapnya"}
            <FaArrowRight
              className={`text-sm transition-transform duration-300 group-hover/btn:translate-x-1 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const OurProducts = () => {
  const location = useLocation();

  // This page has a single section (bg-plum) that sits directly above
  // the Footer.
  useFooterDividerColor(SECTION_COLORS.plum);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.hash]);

  return (
    <section className="relative bg-plum pt-32 pb-24 min-h-screen overflow-hidden">
      {/* Low-opacity lemon texture across the whole section background */}
      <div className="absolute inset-0 lemon-dot-pattern opacity-[0.05] pointer-events-none" aria-hidden="true" />

      {/* Organic blobs tucked into the corners of the page */}
      <BlobShape className="absolute -top-16 -left-20 w-72 h-72 text-lemon opacity-[0.12] pointer-events-none" />
      <BlobShape className="absolute -bottom-24 -right-16 w-80 h-80 text-leaf opacity-[0.1] rotate-45 pointer-events-none" />
      <BlobShape className="absolute top-1/3 -right-24 w-56 h-56 text-berry opacity-[0.08] pointer-events-none hidden md:block" />

      {/* Drifting clouds */}
      <CloudShape className="absolute top-20 right-[8%] w-24 h-24 text-white opacity-40 animate-drift pointer-events-none hidden sm:block" />
      <CloudShape className="absolute bottom-16 left-[6%] w-16 h-16 text-white opacity-30 animate-drift pointer-events-none hidden md:block" />

      {/* Hero decorations: clouds, leaves, lemon, sparkles, floating */}
      <LeafMotif className="absolute top-40 left-[4%] w-12 h-12 text-leaf opacity-20 animate-float pointer-events-none hidden sm:block" />
      <LemonSlice className="absolute top-24 right-[14%] w-14 h-14 text-lemon opacity-25 animate-float-slower pointer-events-none hidden sm:block" />
      <motion.div
        className="absolute top-48 right-[26%] pointer-events-none hidden md:block"
        animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <SparkleShape className="w-8 h-8 text-lemon-dark opacity-30" />
      </motion.div>
      <motion.div
        className="absolute top-32 left-[20%] pointer-events-none hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <SparkleShape className="w-6 h-6 text-berry opacity-25" />
      </motion.div>

      <div className="max-w-[1240px] mx-auto px-5 md:px-8 relative z-10">
        {/* ---------- Hero ---------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 bg-white text-leaf-dark font-display font-semibold px-4 py-2 rounded-full border-2 border-ink text-sm mb-5 shadow-[3px_3px_0px_0px_var(--color-ink)]"
          >
            <HiSparkles /> Karya Kami
          </motion.span>

          <motion.h1
            variants={staggerItem}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink mb-4 leading-tight"
          >
            Produk{" "}
            <span className="relative inline-block text-lemon-dark">
              Kita
              <svg
                className="absolute left-0 -bottom-2 w-full"
                height="12"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9 Q 50 2, 100 8 T 198 6"
                  stroke="#4CB56F"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={staggerItem} className="text-ink/70 text-lg mb-8">
            Kenalan lebih dekat dengan semua karya seru dari Lemon Squad —
            film, serial, permainan, hingga panggung boneka.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-ink font-display font-semibold px-7 py-3.5 rounded-full border-3 border-ink hover:bg-sky-light transition-colors"
            >
              <FaArrowLeft className="text-sm" /> Kembali ke Beranda
            </Link>
          </motion.div>
        </motion.div>

        {/* ---------- Product list ---------- */}
        <div className="space-y-8 md:space-y-10">
          {products.map((product, i) => (
            <div key={product.id}>
              <ProductBlock product={product} index={i} />
              {i < products.length - 1 && <ProductGap />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
