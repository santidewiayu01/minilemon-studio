/**
 * SectionDivider — the ONE scallop/wave separator implementation for the
 * whole app.
 *
 * Every divider is a seam between exactly two background colors: the
 * section above the seam (`topColor`) and the section below it
 * (`bottomColor`). The component paints BOTH colors explicitly — nothing
 * is ever left to "transparent" revealing whatever happens to render
 * behind it. That old approach only looked right by coincidence: any
 * change to what sits behind the divider (a new decorative shape, a
 * z-index change, a route with a different last section) would bleed
 * through and make the wave look like it was floating, disconnected from
 * the real color border.
 *
 * There is intentionally NO default color. If a caller forgets to pass
 * `topColor` or `bottomColor`, the divider renders as an invisible flat
 * strip (an invalid CSS custom property makes the background-image
 * declaration a no-op) instead of silently painting the wrong color. A
 * missing divider is an obvious, easy-to-spot bug; a wrong-colored one is
 * not — so we fail toward "invisible", never toward "plausible but wrong".
 *
 * If the two sides are the same color, there is no visible seam to mark,
 * so the component renders nothing at all. This means callers don't need
 * to remember "only add a divider when colors differ" — it's handled here,
 * once, for every usage.
 *
 * Usage:
 *   <SectionDivider topColor={SECTION_COLORS.cream} bottomColor={SECTION_COLORS.skyLight} />
 *
 * Place it as the last child of the section that owns the TOP color
 * (default, unrotated — the bumps hang down from that section into the
 * next one). Pass `flip` only when the divider instead has to be attached
 * to the top of the section that owns the BOTTOM color (e.g. the Footer,
 * which is mounted separately from whatever page happens to precede it).
 */
const SectionDivider = ({ topColor, bottomColor, flip = false, className = "" }) => {
  if (!topColor || !bottomColor) {
    if (import.meta.env?.DEV) {
      console.warn(
        "SectionDivider: both topColor and bottomColor are required — skipping a divider instead of guessing a color would be worse, but this almost certainly means a section is missing its real color."
      );
    }
    return null;
  }

  // Same color on both sides = no real seam to mark. Rendering a divider
  // here would just be decorative noise sitting on a solid background.
  if (topColor === bottomColor) return null;

  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 right-0 h-6 scallop-divider ${
        flip ? "top-0" : "bottom-0"
      } ${className}`}
      style={{ "--divider-top": topColor, "--divider-bottom": bottomColor }}
    />
  );
};

export default SectionDivider;
