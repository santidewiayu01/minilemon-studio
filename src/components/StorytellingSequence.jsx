import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorldSeam from "../scroll/WorldSeam";
import { SECTION_COLORS } from "../theme/sectionColors";

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------
// FRAME LOADER
// ------------------------------------------------------------------
// Every image in `src/assets/storytelling scroll/` is picked up
// automatically via import.meta.glob — nothing here is hardcoded to a
// filename or a frame count, so dropping more/fewer frames into that
// folder is the only thing needed to change the sequence. `eager: true`
// resolves them at build time to their final hashed asset URLs (no
// runtime dynamic-import waterfall); we still explicitly preload the
// actual pixels below before the section is allowed to animate.
const frameModules = import.meta.glob("/src/assets/storytelling scroll/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

// Object key order from import.meta.glob isn't guaranteed to be
// numeric, so we sort the paths ourselves — this is what keeps
// "frame-2" from ever landing after "frame-10".
const FRAME_URLS = Object.keys(frameModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => frameModules[key]);

// Storytelling captions, evenly spaced across the sequence's scroll
// progress. Edit freely — the fade logic below just walks this list.
const STAGES = [
  { label: "Idea", from: 0, to: 0.25 },
  { label: "Storyboard", from: 0.25, to: 0.5 },
  { label: "Animation", from: 0.5, to: 0.75 },
  { label: "Final Production", from: 0.75, to: 1.001 },
];

const stageIndexForProgress = (progress) => {
  const i = STAGES.findIndex((s) => progress >= s.from && progress < s.to);
  return i === -1 ? STAGES.length - 1 : i;
};

const StorytellingSequence = () => {
  const wrapRef = useRef(null); // tall scroll-distance container (replaces GSAP's pin-spacer)
  const sectionRef = useRef(null); // sticky-positioned viewport-height stage
  const canvasRef = useRef(null);
  const stageRef = useRef(null); // fade-in/out wrapper around canvas + text
  const labelRefs = useRef([]);
  const progressBarRef = useRef(null);

  const imagesRef = useRef([]); // decoded HTMLImageElement cache, index-aligned with FRAME_URLS
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);
  const activeStageRef = useRef(-1);

  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ----------------------------------------------------------------
  // Preload every frame before the section is interactive. Loading
  // in the background (not blocking the rest of the page) while
  // showing a minimal progress readout — a stalled/blank canvas on
  // the first scroll would read as broken, not premium.
  // ----------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    const total = FRAME_URLS.length;
    let loaded = 0;

    if (total === 0) {
      console.warn(
        "StorytellingSequence: no frames found in `src/assets/storytelling scroll/` — add sequential images there."
      );
      return;
    }

    const images = new Array(total);
    FRAME_URLS.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      const onDone = () => {
        loaded += 1;
        if (!cancelled) setLoadProgress(loaded / total);
        if (loaded === total && !cancelled) {
          imagesRef.current = images;
          setReady(true);
        }
      };
      img.onload = onDone;
      img.onerror = onDone; // don't let one bad frame block the whole sequence
      images[i] = img;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Size the tall wrapper: one viewport's worth of height for the sticky
  // stage itself, plus extra scroll distance for how long it should stay
  // pinned. This is the sticky-positioning equivalent of what GSAP's
  // pin-spacer used to add automatically — computed by hand so we never
  // need GSAP to touch the DOM structure at all.
  const [wrapHeight, setWrapHeight] = useState(null);
  useEffect(() => {
    const recalc = () => {
      const vh = window.innerHeight;
      const scrollDistance = Math.max(2000, vh * 3);
      setWrapHeight(vh + scrollDistance);
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  // ----------------------------------------------------------------
  // Canvas draw — "cover" fit, device-pixel-ratio aware. Kept outside
  // GSAP entirely: ScrollTrigger only ever decides *which* frame index
  // is current; drawing is coalesced through a single rAF slot so a
  // burst of scroll events never queues up more than one paint.
  // ----------------------------------------------------------------
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;

    let dw, dh, dx, dy;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  const requestDraw = (index) => {
    currentFrameRef.current = index;
    if (rafIdRef.current) return;
    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(currentFrameRef.current);
      rafIdRef.current = null;
    });
  };

  // Resize canvas to its container at the current devicePixelRatio,
  // then redraw whatever frame is currently active so a resize never
  // leaves a stretched/blank canvas behind.
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const container = sectionRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      drawFrame(currentFrameRef.current);
      ScrollTrigger.refresh();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // ----------------------------------------------------------------
  // ScrollTrigger: pin the section, scrub frame progress, crossfade
  // the caption when its stage changes, and fade the whole stage in
  // on entry / out on exit.
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!ready || wrapHeight == null) return;

    const total = FRAME_URLS.length;
    drawFrame(0);
    let trigger;

    const ctx = gsap.context(() => {
      trigger = ScrollTrigger.create({
        // Tracking the tall wrapper's own top/bottom against the
        // viewport reproduces exactly the scroll distance a pinned
        // section would have consumed, without GSAP ever pinning or
        // reparenting anything — the CSS `sticky` section below does
        // the visual "staying in place" on its own.
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Frame scrub
          const idx = Math.min(total - 1, Math.round(progress * (total - 1)));
          requestDraw(idx);

          // Caption crossfade — only touch the DOM when the active
          // stage actually changes, not on every scroll tick.
          const stageIdx = stageIndexForProgress(progress);
          if (stageIdx !== activeStageRef.current) {
            activeStageRef.current = stageIdx;
            labelRefs.current.forEach((el, i) => {
              if (!el) return;
              gsap.to(el, {
                opacity: i === stageIdx ? 1 : 0,
                y: i === stageIdx ? 0 : 12,
                duration: 0.5,
                ease: "power2.out",
              });
            });
          }

          // Entry / exit fade for the whole stage
          let stageOpacity = 1;
          if (progress < 0.05) stageOpacity = progress / 0.05;
          else if (progress > 0.95) stageOpacity = (1 - progress) / 0.05;
          if (stageRef.current) stageRef.current.style.opacity = stageOpacity;

          // Progress rail
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }
        },
      });
    }, sectionRef);

    return () => {
      // No `pin: true` here anymore — the sticky section below never
      // gets reparented into a GSAP-managed spacer, so there's no DOM
      // restructuring for a route change to race against. Reverting
      // the GSAP context is all the cleanup this ever needs.
      trigger?.kill();
      ctx.revert();

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, wrapHeight]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ height: wrapHeight != null ? `${wrapHeight}px` : "400svh" }}
    >
      <section
        ref={sectionRef}
        id="storytelling-sequence"
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black"
      >
        <div ref={stageRef} className="absolute inset-0" style={{ opacity: 0 }}>
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {/* Subtle readability scrim so captions hold up over any frame */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

          {/* Captions — stacked in the same spot, crossfaded by index */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-start px-6 pb-20 md:px-16 md:pb-28">
            <div className="relative h-16 md:h-24">
              {STAGES.map((s, i) => (
                <h2
                  key={s.label}
                  ref={(el) => (labelRefs.current[i] = el)}
                  className="absolute left-0 bottom-0 font-display font-bold uppercase tracking-tight text-frost text-4xl md:text-6xl lg:text-7xl"
                  style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? "translateY(0)" : "translateY(12px)" }}
                >
                  {s.label}
                </h2>
              ))}
            </div>
          </div>

          {/* Kicker */}
          <div className="pointer-events-none absolute left-6 top-24 md:left-16 md:top-28 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-orbit-pulse" />
            <span className="kicker-studio text-frost/60">Behind The Scenes</span>
          </div>

          {/* Progress rail */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-frost/10">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left bg-gold"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* Loading state — minimal, on-brand, gone the moment frames are ready */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="kicker-studio text-frost/50">Loading Sequence</span>
            <div className="h-px w-40 bg-frost/15 overflow-hidden">
              <div
                className="h-full bg-gold transition-[width] duration-200 ease-out"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
          </div>
        )}

        <WorldSeam topColor={SECTION_COLORS.black} bottomColor={SECTION_COLORS.voidBlue} />
      </section>
    </div>
  );
};

export default StorytellingSequence;
