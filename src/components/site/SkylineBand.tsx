import { useEffect, useRef, useState } from "react";
import dubaiSkyline from "@/assets/remote-uae-guide.png";

/**
 * Cinematic transition band: Dubai skyline immersed in lavender fog,
 * ground bloom, ambient particles, and a very subtle parallax.
 * Sits between Hero and the next section as a seamless bridge.
 */
export function SkylineBand() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // -1 .. 1 progress while band is in viewport
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        // very subtle: skyline drifts up slower than scroll
        setOffset(Math.max(-40, Math.min(40, progress * -36)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative -mt-10 md:-mt-16 h-[44vh] min-h-[320px] md:h-[52vh] md:min-h-[420px] overflow-hidden"
    >
      {/* seamless top blend with hero */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      {/* seamless bottom blend with next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />

      {/* lavender ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_75%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]" />
      <div className="absolute -left-40 bottom-0 w-[520px] h-[520px] rounded-full bg-[color-mix(in_oklab,var(--primary)_18%,transparent)] blur-3xl opacity-70" />
      <div className="absolute -right-40 bottom-10 w-[560px] h-[560px] rounded-full bg-[color-mix(in_oklab,var(--primary)_12%,transparent)] blur-3xl opacity-60" />

      {/* soft light rays from above */}
      <div className="absolute inset-x-0 top-0 h-2/3 bg-[conic-gradient(from_180deg_at_50%_-10%,transparent_0deg,color-mix(in_oklab,var(--primary)_8%,transparent)_18deg,transparent_36deg,transparent_324deg,color-mix(in_oklab,var(--primary)_8%,transparent)_342deg,transparent_360deg)] opacity-60 [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent_75%)]" />

      {/* skyline with parallax */}
      <div
        className="absolute inset-x-0 bottom-12 md:bottom-16 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <img
          src={dubaiSkyline}
          alt=""
          className="pointer-events-none select-none mx-auto w-full max-w-[1800px] h-[28vh] md:h-[34vh] object-contain object-bottom"
          style={{
            filter:
              "drop-shadow(0 18px 28px color-mix(in oklab, var(--primary) 22%, transparent)) drop-shadow(0 2px 0 color-mix(in oklab, var(--primary) 14%, transparent))",
          }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Burj bloom — soft vertical halo behind the tallest tower */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-24 md:bottom-28 w-[180px] md:w-[240px] h-[55%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_70%)] blur-2xl opacity-80" />

      {/* ground diffusion / horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-28 md:h-32 bg-[radial-gradient(120%_100%_at_50%_100%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%)]" />
      {/* reflective ground line */}
      <div className="absolute inset-x-0 bottom-16 md:bottom-20 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--primary)_45%,transparent)] to-transparent opacity-70" />
      {/* base fog */}
      <div className="absolute inset-x-0 bottom-0 h-20 md:h-24 backdrop-blur-[2px] bg-gradient-to-t from-background via-background/70 to-transparent" />

      {/* ambient drifting particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => {
          const left = ((i * 37) % 100) + (i % 3) * 0.5;
          const delay = (i * 1.37) % 8;
          const dur = 12 + ((i * 7) % 9);
          const size = 2 + (i % 3);
          return (
            <span
              key={i}
              className="absolute rounded-full bg-[color-mix(in_oklab,var(--primary)_70%,white)] opacity-60"
              style={{
                left: `${left}%`,
                bottom: `${10 + (i % 5) * 6}%`,
                width: size,
                height: size,
                filter: "blur(0.5px)",
                animation: `skyline-drift ${dur}s ease-in-out ${-delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes skyline-drift {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: .35; }
          50% { transform: translate3d(0, -18px, 0); opacity: .75; }
        }
      `}</style>
    </section>
  );
}
