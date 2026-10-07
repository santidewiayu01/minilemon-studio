import Hero from "../components/Hero";
import StorytellingSequence from "../components/StorytellingSequence";
import DivisionPipeline from "../components/DivisionPipeline";
import CreativeProcess from "../components/CreativeProcess";
import StudioShowcase from "../components/StudioShowcase";
import AboutStudio from "../components/AboutStudio";
import StudioMoments from "../components/StudioMoments";
import InternshipProgram from "../components/InternshipProgram";
import ImpactValues from "../components/ImpactValues";
import StudioLocation from "../components/StudioLocation";
import Contact from "../components/Contact";
import ScrollWorld from "../scroll/ScrollWorld";
import ScrollWorldProvider from "../scroll/ScrollWorldProvider";

// Vision & Mission and the founders' story already live on the full
// "Tentang Studio" page (/tentang) — repeating them here would just add
// scroll length without adding information, so the homepage links to
// that page instead of duplicating its content.
//
// Section order follows the "one continuous world" homepage flow:
// Hero (Dark Navy) -> Storytelling (frame sequence) -> the living
// world, one uninterrupted scroll-driven span from How We Work
// through the finale CTA, tracked by scroll/chapters.js + world
// Progress.js so every chapter below reads scroll position off the
// same shared store instead of running its own isolated trigger.
//
// How We Work -> Production Pipeline -> Studio Life (Dark Blue) ->
// About Studio -> Studio Moments (Cream) -> Internship -> Impact &
// Values (Dark Blue) -> Studio Location (Cream) -> Contact (Dark
// Navy, finale pull-back).
const Home = () => {
  return (
    <>
      {/* Fixed, always-mounted backdrop for the "living world" portion
          of the page (How We Work chapter through the CTA). Sits behind
          everything at -z-10; Hero and the storytelling sequence keep
          their own opaque backgrounds on top of it, so it only ever
          becomes visible once DivisionPipeline begins. */}
      <ScrollWorld />
      <ScrollWorldProvider />

      <Hero />
      <StorytellingSequence />
      <DivisionPipeline />
      <CreativeProcess />
      <StudioShowcase />
      <AboutStudio />
      <StudioMoments />
      <InternshipProgram />
      <ImpactValues />
      <StudioLocation />
      <Contact />
    </>
  );
};

export default Home;
