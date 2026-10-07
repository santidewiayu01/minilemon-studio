// ------------------------------------------------------------------
// Ordered registry of every section that belongs to the "living
// world" — the continuous scroll-driven experience that picks up
// right after the storytelling hand-off (DivisionPipeline) and runs
// through the finale (Contact).
//
// Order here must match DOM order in pages/Home.jsx. Each `id` is the
// section's real `id` attribute, so nothing here needs updating when
// content INSIDE a chapter changes — only when a chapter is added,
// removed, or reordered relative to the others.
//
// `tone` records which background family (see theme/sectionColors)
// the chapter sits in. Not consumed anywhere yet, but any future
// chapter-aware UI (a progress rail, a chapter-crossfade cue) should
// read it from here instead of re-deriving it per component.
//
// Adding a new chapter (e.g. a Portfolio section between
// "division-pipeline" and "production-pipeline"): give the section a
// stable `id`, insert one entry here in the matching position, done —
// ScrollWorldProvider below picks it up automatically.
// ------------------------------------------------------------------
export const CHAPTERS = [
  { id: "division-pipeline", label: "How We Work", tone: "voidBlue" },
  { id: "production-pipeline", label: "Production Pipeline", tone: "voidBlue" },
  { id: "studio-life", label: "Studio Life", tone: "voidBlue" },
  { id: "about-studio", label: "About Studio", tone: "cream" },
  { id: "studio-moments", label: "Studio Moments", tone: "cream" },
  { id: "internship", label: "Internship", tone: "voidBlue" },
  { id: "impact-values", label: "Impact & Values", tone: "voidBlue" },
  { id: "studio-location", label: "Studio Location", tone: "cream" },
  { id: "contact", label: "Finale", tone: "void" },
];

export const WORLD_START_ID = CHAPTERS[0].id;
export const WORLD_END_ID = CHAPTERS[CHAPTERS.length - 1].id;
