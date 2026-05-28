import logoUrl from "@/assets/logo-sb.webp";

interface LogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

/**
 * Soft Bridge brand mark. Renders the official circular SB logo.
 * Works on light and dark backgrounds. Pass `glow` for a soft premium halo.
 */
export function Logo({ size = 32, className = "", glow = false }: LogoProps) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full blur-md opacity-60"
          style={{ background: "radial-gradient(circle, oklch(0.75 0.12 290 / 0.55), transparent 70%)" }}
        />
      )}
      <img
        src={logoUrl}
        alt="Soft Bridge"
        width={size}
        height={size}
        className="relative w-full h-full object-contain select-none"
        draggable={false}
      />
    </span>
  );
}

export default Logo;
