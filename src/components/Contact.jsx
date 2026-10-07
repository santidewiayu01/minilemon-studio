import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFooterDividerColor } from "../context/FooterDividerContext";
import { SECTION_COLORS } from "../theme/sectionColors";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useFooterDividerColor(SECTION_COLORS.void);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const formRef = useRef(null);

  // The rest of the journey settles into place as it scrolls in; the
  // finale shouldn't just appear — it should feel like it's the thing
  // the pulled-back camera (ScrollWorld's finale effect) was revealing
  // all along. A slightly larger, slower settle than the rest of the
  // site's standard fade-ups, timed to roughly match that pull-back.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      if (copyRef.current) {
        tl.from(copyRef.current.children, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        });
      }
      if (formRef.current) {
        tl.from(
          formRef.current,
          { y: 40, opacity: 0, scale: 0.97, duration: 0.9, ease: "power3.out" },
          "<0.1"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative text-frost py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14 lg:gap-16 relative z-10">
        <div ref={copyRef}>
          <span className="kicker-studio mb-4 block">Hubungi Kami</span>
          <h2 className="font-display font-bold text-3xl md:text-[2.75rem] leading-[1.05] tracking-tight mb-6">
            Yuk, berkarya bersama
            <br />
            Studio Minilemon.
          </h2>
          <p className="text-frost/55 mb-9 max-w-md leading-relaxed">
            Tertarik berkolaborasi, ingin mendaftar program magang, atau punya
            proyek kreatif yang ingin digarap bersama? Kirim pesan, tim kami
            akan segera merespons.
          </p>

          <ul className="space-y-4 mb-9">
            <li className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-gold">
                <FaEnvelope />
              </span>
              <span className="text-frost/75">halo@minilemon.co.id</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-cyan">
                <FaPhoneAlt />
              </span>
              <span className="text-frost/75">(021) 555-0123</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-cyan">
                <FaMapMarkerAlt />
              </span>
              <span className="text-frost/75">
                Jl. Mulyosari Timur No.42, Kalisari, Kec. Mulyorejo, Surabaya, Jawa Timur 60112
              </span>
            </li>
          </ul>

          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/minilemonn_studio/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-frost hover:bg-gold hover:text-void hover-wiggle transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/channel/UCeXErtwoUyyszVj6lODbAAQ"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-frost hover:bg-gold hover:text-void hover-wiggle transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.tiktok.com/@minilemon.community"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-frost hover:bg-gold hover:text-void hover-wiggle transition-colors"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white/[0.04] rounded-2xl border border-white/10 p-6 md:p-8 space-y-4"
        >
          <div>
            <label className="block font-display font-semibold text-sm text-frost/80 mb-1.5">
              Nama Kamu
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Tulis nama di sini"
              className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-gold outline-none transition-colors bg-white/[0.03] text-frost placeholder:text-frost/30"
            />
          </div>
          <div>
            <label className="block font-display font-semibold text-sm text-frost/80 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-gold outline-none transition-colors bg-white/[0.03] text-frost placeholder:text-frost/30"
            />
          </div>
          <div>
            <label className="block font-display font-semibold text-sm text-frost/80 mb-1.5">
              Pesan
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Ceritakan sesuatu ke kami..."
              className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-gold outline-none transition-colors bg-white/[0.03] text-frost placeholder:text-frost/30 resize-none"
            />
          </div>
          <button
            type="submit"
            className="btn-studio-solid w-full font-display font-semibold py-3.5"
          >
            {sent ? "Terkirim! 🎉" : "Kirim Pesan"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
