import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo/logo.webp";
import { scrollToTarget } from "../scroll/lenis";

// Anchor links scroll within the homepage; `route` links are real pages.
// Keeping the navbar to five destinations (plus the CTA) is deliberate —
// every item here answers a distinct question a visitor has ("what is
// this studio", "what do they actually make", "how do I join") instead of
// exposing every section of the homepage as its own link.
const navLinks = [
  { label: "Beranda", type: "anchor", to: "hero" },
  { label: "Tentang Studio", type: "anchor", to: "about-studio" },
  { label: "Aktivitas Divisi", type: "route", to: "/kegiatan-studio" },
  { label: "Magang", type: "anchor", to: "internship" },
  { label: "Kontak", type: "anchor", to: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The homepage opens on the new cinematic (dark) Hero, so the navbar
  // needs light text there — but every other route still opens on the
  // legacy light/cream palette, so only the un-scrolled homepage should
  // ever get the "on dark video" treatment.
  const onDarkHero = location.pathname === "/" && !scrolled;

  const handleNav = (sectionId) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToTarget(sectionId), 150);
    } else {
      scrollToTarget(sectionId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="Mini Lemon" className="h-8 md:h-9 w-auto" />
        </Link>

        <ul
          className={`hidden md:flex items-center gap-9 lg:gap-10 font-display font-medium transition-colors duration-300 ${
            onDarkHero ? "text-frost" : "text-ink"
          }`}
        >
          {navLinks.map((link) =>
            link.type === "route" ? (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`relative py-1 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0 after:transition-all hover:after:w-full ${
                    onDarkHero ? "hover:text-gold after:bg-gold" : "hover:text-leaf-dark after:bg-lemon-dark"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.to}>
                <button
                  onClick={() => handleNav(link.to)}
                  className={`relative py-1 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0 after:transition-all hover:after:w-full ${
                    onDarkHero ? "hover:text-gold after:bg-gold" : "hover:text-leaf-dark after:bg-lemon-dark"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            )
          )}
        </ul>

        <button
          onClick={() => handleNav("contact")}
          className={`hidden md:inline-flex items-center gap-2 font-display font-semibold px-5 py-2.5 ${
            onDarkHero ? "btn-studio-solid" : "btn-solid bg-ink text-cream"
          }`}
        >
          Gabung Yuk!
        </button>

        <button
          className={`md:hidden text-3xl transition-colors duration-300 ${onDarkHero ? "text-frost" : "text-ink"}`}
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-cream border-t border-ink/10 mt-3">
          <ul className="flex flex-col px-5 py-4 gap-1 font-display font-medium">
            {navLinks.map((link) => (
              <li key={link.to}>
                {link.type === "route" ? (
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block w-full text-left py-3 border-b border-ink/8 text-ink"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNav(link.to)}
                    className="w-full text-left py-3 border-b border-ink/8 text-ink"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
            <li className="pt-3">
              <button
                onClick={() => handleNav("contact")}
                className="btn-solid w-full bg-ink text-cream font-semibold px-5 py-3"
              >
                Gabung Yuk!
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
