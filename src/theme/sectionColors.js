// Single source of truth for the background colors that sit on either side
// of a wave/scallop divider.
//
// These are NOT new colors — they simply point at the CSS custom properties
// already defined once in `index.css` (`@theme { --color-cream: ...; }`).
// A divider should never hardcode a hex value. Instead it references
// `var(--color-x)`, so if the palette in index.css ever changes, every
// divider updates automatically instead of silently going stale.
//
// If you introduce a new section background, add it here once and import
// it wherever a divider touches that section — never inline a hex string
// next to a <SectionDivider />.
export const SECTION_COLORS = {
  cream: "var(--color-cream)",
  skyLight: "var(--color-sky-light)",
  leafLight: "var(--color-leaf-light)",
  plum: "var(--color-plum)",
  buttermilk: "var(--color-buttermilk)",
  midnight: "var(--color-midnight)",
  ink: "var(--color-ink)",
  // ----------------------------------------------------------------
  // Homepage v2 palette. The redesigned homepage is being migrated,
  // section by section, onto exactly THREE main backgrounds so the
  // page reads as one continuous journey instead of switching color
  // every section:
  //   1. Dark Navy  → `void`     — bookends (Hero, Contact)
  //   2. Dark Blue  → `voidBlue` — showcase/process blocks (Featured
  //                                 Works, Production Pipeline, Division
  //                                 Experience)
  //   3. Warm Cream → `cream`    — human/story blocks (About, Internship
  //                                 journey, Studio Moments)
  // The legacy pastel tones above (skyLight, leafLight, plum,
  // buttermilk) are NOT used by any v2 section — they stay only for
  // pages/components not yet migrated.
  // ----------------------------------------------------------------
  void: "var(--color-void)",
  voidBlue: "var(--color-void-2)",
  // Deliberately a literal, not a CSS var pointing at the shared navy
  // palette: the storytelling frame-sequence section requires true
  // #000000 canvas letterboxing (per its own design spec), which is a
  // one-off, not a reusable brand color — so it doesn't belong in
  // index.css's @theme block alongside the real palette.
  black: "#000000",
};
