import { useEffect, useRef } from "react";
import skyline from "@/assets/dubai-skyline.png";
import { Particles } from "./Particles";

export function SkylineDivider() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = 1 - (rect.top + rect.height / 2) / vh;
        el.style.transform = `translate3d(0, ${progress * -24}px, 0)`;
        raf = 0;
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
      aria-hidden
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{ height: "clamp(260px, 38vw, 520px)" }}
    >
      {/* Soft lavender atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%), linear-gradient(to bottom, transparent, color-mix(in oklab, var(--primary) 4%, transparent))",
        }}
      />

      {/* Ambient glow halo behind the skyline */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-[70%] h-[55%] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary) 28%, transparent), transparent 70%)",
        }}
      />

      {/* Light rays */}
      <div
        className="absolute inset-x-0 top-0 h-full opacity-40 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 270deg at 50% 100%, transparent 0deg, color-mix(in oklab, var(--primary) 18%, transparent) 80deg, transparent 160deg, color-mix(in oklab, var(--primary) 14%, transparent) 240deg, transparent 320deg)",
          maskImage: "linear-gradient(to top, black, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent 80%)",
        }}
      />

      <Particles count={18} />

      {/* The skyline itself */}
      <img
        ref={imgRef}
        src={skyline}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] max-w-none object-contain will-change-transform"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          filter: "saturate(0.9)",
        }}
      />

      {/* Soft fade to background at bottom for seamless blend */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
