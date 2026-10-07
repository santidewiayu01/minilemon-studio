import { useEffect, useRef } from "react";

// The <spline-viewer> tag is a third-party custom element that mutates
// its own children internally (loading state, canvas, overlays). If we
// render it directly as JSX, React "owns" it in the fiber tree and, on
// route/section changes, races with the element's own internal DOM
// mutations — that race is what throws "Failed to execute removeChild"
// and can abort a page transition.
//
// The fix: React only ever manages the plain <div> host below. The
// spline-viewer element itself is created/appended/removed by hand, so
// React's reconciler never touches it and can never fight it. Shared
// between the homepage Hero drone and the Activities page hero model
// so every Spline embed on the site gets the same safe lifecycle.
const SplineViewer = ({ url, className = "" }) => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", url);
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.display = "block";
    viewer.style.background = "transparent";
    host.appendChild(viewer);

    return () => {
      // Release the WebGL context explicitly before removal, so the
      // viewer's internal render loop can't keep drawing into a
      // detached/zero-size canvas after we navigate away (the source
      // of the endless "Framebuffer is incomplete" console spam).
      try {
        const canvas = viewer.querySelector("canvas");
        const gl = canvas?.getContext("webgl2") || canvas?.getContext("webgl");
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        /* best-effort cleanup only */
      }
      try {
        if (viewer.parentNode === host) host.removeChild(viewer);
      } catch {
        /* element may have already detached itself, that's fine */
      }
    };
  }, [url]);

  return <div ref={hostRef} className={`h-full w-full overflow-hidden ${className}`} />;
};

export default SplineViewer;
