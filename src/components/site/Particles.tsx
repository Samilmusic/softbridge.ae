import { useMemo } from "react";

export function Particles({ count = 28 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        delay: -Math.random() * 18,
        duration: 14 + Math.random() * 18,
        opacity: 0.18 + Math.random() * 0.45,
      })),
    [count]
  );
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute bottom-[-10vh] rounded-full"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            background: "oklch(0.84 0.10 82)",
            opacity: d.opacity,
            filter: "blur(0.5px)",
            animation: `particle-rise ${d.duration}s linear ${d.delay}s infinite`,
            boxShadow: "0 0 8px oklch(0.84 0.10 82 / 0.5)",
          }}
        />
      ))}
    </div>
  );
}
