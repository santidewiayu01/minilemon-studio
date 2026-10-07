import { createContext, useContext, useEffect, useState } from "react";

/**
 * The Footer is mounted once, outside of <Routes>, so it has no built-in
 * way to know what background color the current page happens to end on
 * right above it — that used to be solved with a hardcoded
 * `PREV_SECTION_COLOR_BY_ROUTE` lookup keyed by pathname, which silently
 * went stale the moment a page's last section changed without someone
 * remembering to update the (completely disconnected) map.
 *
 * This context flips that relationship around: instead of the Footer
 * guessing based on the URL, whichever section is *actually* the last one
 * rendered on the current page announces its own real color, right where
 * that color already lives in the JSX. The Footer just reads it.
 *
 * If a page's last section forgets to call `useFooterDividerColor`, the
 * Footer simply renders without a top divider (see SectionDivider's
 * "missing color" behavior) — an obvious gap to notice and fix, rather
 * than a wave silently painted in the wrong color.
 */
const FooterDividerContext = createContext(null);

export const FooterDividerProvider = ({ children }) => {
  const [color, setColor] = useState(null);
  return (
    <FooterDividerContext.Provider value={{ color, setColor }}>
      {children}
    </FooterDividerContext.Provider>
  );
};

/**
 * Call this from the section that is visually the LAST one on the current
 * page (the one whose bottom edge touches the Footer), passing its own
 * real background color — the same value that section's `bg-*` class
 * represents, from `theme/sectionColors.js`.
 */
export const useFooterDividerColor = (color) => {
  const ctx = useContext(FooterDividerContext);
  useEffect(() => {
    // No provider, or nothing to publish (e.g. a non-last sibling that
    // chose not to participate) — do nothing, rather than clearing
    // whatever the real last section already set.
    if (!ctx || !color) return;
    ctx.setColor(color);
    // Clear on unmount (route change) so the next page can't ever
    // accidentally inherit a stale color if it forgets to set its own.
    return () => ctx.setColor(null);
  }, [ctx, color]);
};

/** Read the current color inside the Footer itself. */
export const useFooterDividerColorValue = () => {
  const ctx = useContext(FooterDividerContext);
  return ctx?.color ?? null;
};
