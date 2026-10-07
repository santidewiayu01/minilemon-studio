import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import logo from "../assets/logo/logo.webp";
import { scrollToTarget } from "../scroll/lenis";

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  // Same "navigate home first if needed, then ease-scroll" behavior as
  // the Navbar, kept local since the Footer's link list has a slightly
  // different shape (plain <a href="#id">, not a data-driven array).
  const handleAnchor = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToTarget(sectionId), 150);
    } else {
      scrollToTarget(sectionId);
    }
  };

  return (
    <footer className="relative bg-void text-frost pt-16 pb-8 overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-3">
            <img src={logo} alt="Studio Minilemon" className="h-7 w-auto" />
          </Link>
          <p className="text-frost/60 text-sm max-w-xs">
            Studio kreatif yang memproduksi konten visual, animasi, branding,
            dan media digital, sekaligus tempat magang industri kreatif.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-gold">Jelajahi</h4>
          <ul className="space-y-2 text-sm text-frost/70">
            <li><a href="#hero" onClick={(e) => handleAnchor(e, "hero")} className="hover:text-gold transition-colors">Beranda</a></li>
            <li><a href="#about-studio" onClick={(e) => handleAnchor(e, "about-studio")} className="hover:text-gold transition-colors">Tentang Studio</a></li>
            <li><Link to="/kegiatan-studio" className="hover:text-gold transition-colors">Aktivitas Divisi</Link></li>
            <li><a href="#internship" onClick={(e) => handleAnchor(e, "internship")} className="hover:text-gold transition-colors">Program Magang</a></li>
            <li><a href="#studio-location" onClick={(e) => handleAnchor(e, "studio-location")} className="hover:text-gold transition-colors">Studio Kami</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-gold">Dukungan</h4>
          <ul className="space-y-2 text-sm text-frost/70">
            <li><a href="#contact" className="hover:text-gold transition-colors">Kontak</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Kebijakan Privasi</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-gold">Ikuti Kami</h4>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/minilemonn_studio/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-frost/10 flex items-center justify-center hover:bg-gold hover:text-void transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/channel/UCeXErtwoUyyszVj6lODbAAQ"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-frost/10 flex items-center justify-center hover:bg-gold hover:text-void transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.tiktok.com/@minilemon.community"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-frost/10 flex items-center justify-center hover:bg-gold hover:text-void transition-colors"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 border-t border-frost/15 pt-6 text-center text-sm text-frost/50">
        © {year} Studio Minilemon. Studio kreatif, produksi, dan tempat magang industri kreatif.
      </div>
    </footer>
  );
};

export default Footer;
