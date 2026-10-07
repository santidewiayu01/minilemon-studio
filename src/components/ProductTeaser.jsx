import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import products from "../data/products";
import SectionDivider from "./SectionDivider";
import { SECTION_COLORS } from "../theme/sectionColors";

const ProductTeaser = () => {
  const scrollerRef = useRef(null);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 300;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="produk-kita" className="relative bg-leaf-light pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
          <span className="inline-block bg-white text-leaf-dark font-display font-semibold px-4 py-2 rounded-full border-2 border-ink text-sm mb-4">
            Karya Kami
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-3">
            Produk Kita
          </h2>
          <p className="text-ink/70">
            Dari film animasi sampai panggung boneka, ini dia karya-karya seru
            dari Lemon Squad!
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((p, i) => (
              <Link
                to={`/produk-kita#${p.id}`}
                key={p.id}
                data-card
                data-aos="zoom-in"
                data-aos-delay={i * 80}
                className="group shrink-0 w-64 sm:w-72 snap-start bg-white rounded-3xl border-4 border-ink overflow-hidden shadow-[6px_6px_0px_0px_var(--color-ink)] hover:shadow-[3px_3px_0px_0px_var(--color-ink)] hover:-translate-y-1 transition-all"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-cream">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block text-xs font-semibold bg-leaf-light text-leaf-dark px-3 py-1 rounded-full border border-ink/10 mb-2">
                    {p.category}
                  </span>
                  <h3 className="font-display font-bold text-ink leading-snug">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll arrows (desktop) */}
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Sebelumnya"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-3 border-ink items-center justify-center shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-lemon transition-colors"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Berikutnya"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-3 border-ink items-center justify-center shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-lemon transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="text-center mt-10" data-aos="fade-up">
          <Link
            to="/produk-kita"
            className="inline-flex items-center gap-2 bg-lemon text-ink font-display font-semibold px-7 py-3.5 rounded-full border-3 border-ink shadow-[5px_5px_0px_0px_var(--color-ink)] hover:shadow-[2px_2px_0px_0px_var(--color-ink)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            Lihat Selengkapnya <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Scallop transition to next section (About, bg-cream) */}
      <SectionDivider topColor={SECTION_COLORS.leafLight} bottomColor={SECTION_COLORS.cream} />
    </section>
  );
};

export default ProductTeaser;
