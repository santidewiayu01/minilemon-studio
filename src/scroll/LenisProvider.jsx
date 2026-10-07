import { useEffect } from "react";
import { initLenis, destroyLenis } from "./lenis";

/**
 * Mounted once in App.jsx, outside of <Routes>. Owns the lifetime of
 * the single Lenis instance for the whole site.
 *
 * Route-change scroll reset used to live here too, but that needs to
 * run in useLayoutEffect (before paint) and coordinate with the
 * browser's own scroll-restoration setting — see <ScrollToTop /> for
 * both.
 */
const LenisProvider = () => {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return null;
};

export default LenisProvider;
