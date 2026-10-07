import { FaMapMarkerAlt, FaClock, FaDirections } from "react-icons/fa";
import studioDetail from "../assets/studio/lebih detail depan studio.jpeg";
import WorldSeam from "../scroll/WorldSeam";
import { SECTION_COLORS } from "../theme/sectionColors";

const ADDRESS =
  "Jl. Mulyosari Timur No.42, Kalisari, Kec. Mulyorejo, Surabaya, Jawa Timur 60112";

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS
)}`;

const StudioLocation = () => {
  return (
    <section id="studio-location" className="relative py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="max-w-2xl mb-14" data-aos="fade-up">
          <span className="kicker text-lemon-dark mb-4 block">Kunjungi Kami</span>
          <h2 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight text-ink mb-4">
            Studio Kami
          </h2>
          <p className="text-ink/60 leading-relaxed">
            Studio nyata tempat setiap karya Studio Minilemon dirancang, diproduksi,
            dan tempat peserta magang belajar langsung di lingkungan kerja kreatif.
          </p>
        </div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-6 md:gap-8 items-stretch">
          {/* Map — dominant column on large screens */}
          <div
            data-aos="fade-right"
            className="photo-frame relative rounded-2xl overflow-hidden min-h-[340px] md:min-h-[420px]"
          >
            <iframe
              title="Lokasi Studio Minilemon"
              src={MAPS_EMBED_SRC}
              className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Studio photo + info card */}
          <div data-aos="fade-left" className="flex flex-col gap-6">
            <div className="photo-frame relative rounded-2xl overflow-hidden group">
              <img
                src={studioDetail}
                alt="Fasad Studio Minilemon"
                className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="card-soft relative flex-1 bg-white rounded-2xl p-6 md:p-7">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-cyan/15 flex items-center justify-center text-sky-dark">
                    <FaMapMarkerAlt />
                  </span>
                  <span className="text-ink/70 text-sm leading-relaxed">{ADDRESS}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-gold/15 flex items-center justify-center text-lemon-dark">
                    <FaClock />
                  </span>
                  <span className="text-ink/70 text-sm leading-relaxed">
                    Senin – Jumat, 09.00 – 17.00 WIB
                  </span>
                </li>
              </ul>

              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-solid mt-6 inline-flex items-center gap-2 bg-ink text-cream font-display font-semibold px-5 py-2.5 text-sm"
              >
                <FaDirections /> Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <WorldSeam topColor={SECTION_COLORS.cream} bottomColor={SECTION_COLORS.void} />
    </section>
  );
};

export default StudioLocation;
