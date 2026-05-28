import { useMemo } from "react";

/**
 * Lightweight ambient particles. Heavy per-particle effects (box-shadow,
 * blur) are intentionally avoided — they're the #1 cause of jank on this
 * site. The `.particles-layer` class lets CSS hide the whole layer on
 * mobile via a single media query in styles.css.
 */
export function Particles({ count = 14 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1.2 + Math.random() * 1.8,
        delay: -Math.random() * 18,
        duration: 18 + Math.random() * 14,
        opacity: 0.22 + Math.random() * 0.35,
      })),
    [count]
  );
  return (
    <div
      aria-hidden
      className="particles-layer absolute inset-0 overflow-hidden pointer-events-none"
    >
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute bottom-[-10vh] rounded-full"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            background: "oklch(0.78 0.14 290)",
            opacity: d.opacity,
            animation: `particle-rise ${d.duration}s linear ${d.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
