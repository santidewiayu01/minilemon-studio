import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaLightbulb, FaPaintbrush, FaCube, FaFilm, FaScissors, FaRocket } from "react-icons/fa6";
import { GiSkeleton } from "react-icons/gi";
import WorldSeam from "../scroll/WorldSeam";
import { SECTION_COLORS } from "../theme/sectionColors";

// The seven real stages a piece of work passes through end to end. This
// is a genuine sequence (order carries information — you cannot rig
// before you model), so numbering it is earning its keep here, unlike
// a numbered list applied to content that isn't actually ordered.
const STAGES = [
  { id: "concept", label: "Concept", icon: FaLightbulb, note: "Ide, riset, dan arah cerita" },
  { id: "illustration", label: "Illustration", icon: FaPaintbrush, note: "Desain karakter & concept art" },
  { id: "modeling", label: "Modeling", icon: FaCube, note: "Aset & environment 3D" },
  { id: "rigging", label: "Rigging", icon: GiSkeleton, note: "Struktur gerak karakter" },
  { id: "animation", label: "Animation", icon: FaFilm, note: "Menghidupkan gerakan" },
  { id: "editing", label: "Editing", icon: FaScissors, note: "Penyusunan & color grading" },
  { id: "delivery", label: "Final Delivery", icon: FaRocket, note: "Siap tayang ke audiens" },
];

const CreativeProcess = () => {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="production-pipeline" className="relative pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-16 md:mb-24"
        >
          <span className="kicker-studio">Production Pipeline</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-frost mt-3 leading-[1.05]">
            Dari ide sampai tayang,
            <br className="hidden md:block" /> tujuh tahap yang sama setiap kali.
          </h2>
        </motion.div>

        {/* Desktop: horizontal flow with a fill-on-scroll connecting line. */}
        <div ref={trackRef} className="hidden lg:block relative">
          <div className="absolute left-0 right-0 top-7 h-px bg-frost/12" />
          <motion.div
            style={{ scaleX: lineScale }}
            className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-gold via-gold to-cyan origin-left"
          />
          <div className="grid grid-cols-7 gap-4">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-start"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-void-2 border border-frost/20">
                  <stage.icon className="text-lg text-gold" />
                </div>
                <span className="font-display font-semibold text-frost text-sm mt-4">
                  {stage.label}
                </span>
                <span className="text-frost/45 text-xs mt-1.5 leading-snug">{stage.note}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/tablet: vertical version of the same flow. */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-[1.6rem] top-2 bottom-2 w-px bg-frost/12" />
          <div className="space-y-10">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-start gap-5"
              >
                <div className="absolute -left-8 flex h-12 w-12 items-center justify-center rounded-full bg-void-2 border border-frost/20">
                  <stage.icon className="text-base text-gold" />
                </div>
                <div className="pt-1">
                  <span className="font-display font-semibold text-frost">{stage.label}</span>
                  <p className="text-frost/45 text-sm mt-1">{stage.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <WorldSeam topColor={SECTION_COLORS.voidBlue} bottomColor={SECTION_COLORS.voidBlue} />
    </section>
  );
};

export default CreativeProcess;
