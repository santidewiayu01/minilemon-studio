// Small, reusable decorative shapes used to give sections an "alive"
// storybook background without competing with real content. Every shape
// is a plain currentColor/fill SVG or CSS shape so it inherits Tailwind
// color + opacity utilities from the className passed in, and every shape
// is aria-hidden since it is purely decorative.

export const LeafMotif = ({ className, style }) => (
  <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
    <path
      d="M32 4C14 4 4 20 4 36c0 14 12 24 28 24s28-10 28-24C60 20 50 4 32 4Z"
      fill="currentColor"
    />
    <path
      d="M32 8v52"
      stroke="var(--color-ink)"
      strokeOpacity="0.25"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const LemonSlice = ({ className, style }) => (
  <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
    <circle cx="32" cy="32" r="29" fill="currentColor" opacity="0.9" />
    <circle cx="32" cy="32" r="23" fill="var(--color-lemon-light)" />
    {Array.from({ length: 8 }).map((_, i) => (
      <line
        key={i}
        x1="32"
        y1="32"
        x2={32 + 21 * Math.cos((i * Math.PI) / 4)}
        y2={32 + 21 * Math.sin((i * Math.PI) / 4)}
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ))}
    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.35" />
  </svg>
);

export const CloudShape = ({ className, style }) => (
  <svg viewBox="0 0 100 56" className={className} style={style} aria-hidden="true">
    <path
      d="M20 46C9 46 2 39 2 30c0-8 6-14 14-15C18 6 27 0 37 0c9 0 16 5 19 12 2-1 4-1 6-1 10 0 18 8 18 18 0 9-7 17-17 17H20Z"
      fill="currentColor"
    />
  </svg>
);

export const BubbleShape = ({ className, style }) => (
  <div
    aria-hidden="true"
    className={`rounded-full border-2 ${className}`}
    style={style}
  />
);

export const SparkleShape = ({ className, style }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
    <path
      d="M12 0c.9 4.9 2.1 8.6 3.6 10.1S20.1 13.7 24 14.5c-3.9.8-7 2.4-8.4 3.9S13 24 12 24s-1.4-4.8-3.6-6.6S3.9 15.3 0 14.5c3.9-.8 7-2.4 8.4-3.9S11 4.9 12 0Z"
      fill="currentColor"
    />
  </svg>
);

export const BlobShape = ({ className, style }) => (
  <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
    <path
      d="M52 20C82 2 128 0 156 24c28 24 36 66 20 98s-58 46-94 40-64-38-68-74S22 38 52 20Z"
      fill="currentColor"
    />
  </svg>
);
