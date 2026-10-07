import { FaBook, FaPaintBrush, FaMusic, FaRunning, FaFlask, FaCalculator } from "react-icons/fa";

const moments = [
  { icon: <FaBook />, title: "Waktu Dongeng", color: "#FFD93D", rotate: "-rotate-2" },
  { icon: <FaCalculator />, title: "Berhitung Ceria", color: "#7FD6F5", rotate: "rotate-2" },
  { icon: <FaPaintBrush />, title: "Melukis Bersama", color: "#B48CE0", rotate: "-rotate-1" },
  { icon: <FaFlask />, title: "Eksperimen Seru", color: "#8FD14F", rotate: "rotate-3" },
  { icon: <FaRunning />, title: "Main di Luar", color: "#FF9640", rotate: "-rotate-2" },
  { icon: <FaMusic />, title: "Nyanyi Bareng", color: "#FF6B7A", rotate: "rotate-1" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="relative bg-leaf-light py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
          <span className="inline-block bg-white text-leaf-dark font-display font-semibold px-4 py-2 rounded-full border-2 border-ink text-sm mb-4">
            Galeri Momen
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-3">
            Setiap Hari, Petualangan Baru
          </h2>
          <p className="text-ink/70">
            Intip serunya aktivitas belajar bareng Lemon Squad!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {moments.map((m, i) => (
            <div
              key={m.title}
              data-aos="zoom-in"
              data-aos-delay={i * 80}
              className={`bg-white rounded-3xl p-6 md:p-8 border-4 border-ink text-center hover:rotate-0 transition-transform ${m.rotate} shadow-[6px_6px_0px_0px_var(--color-ink)]`}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center text-2xl md:text-3xl text-ink border-3 border-ink mb-4"
                style={{ backgroundColor: m.color }}
              >
                {m.icon}
              </div>
              <p className="font-display font-bold text-ink text-sm md:text-base">
                {m.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
