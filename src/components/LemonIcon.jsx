import lemonIconVideo from "../assets/icons/Desain tanpa judul.mp4";

/**
 * Animated lemon mascot icon (loops forever) used to replace the
 * static lemon icon in the Navbar and Footer. Pass a `className`
 * that sets the exact width/height so the video always matches the
 * size of the icon it replaces.
 */
const LemonIcon = ({ className = "" }) => (
  <video
    className={`object-cover pointer-events-none ${className}`}
    src={lemonIconVideo}
    autoPlay
    loop
    muted
    playsInline
  />
);

export default LemonIcon;
