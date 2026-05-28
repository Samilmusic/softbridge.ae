// Subtle Dubai skyline silhouette as SVG
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 360"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="skylineGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.84 0.10 82)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="oklch(0.84 0.10 82)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="skylineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.12 0.018 260)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(0.12 0.018 260)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* gold haze behind */}
      <rect x="0" y="120" width="1600" height="240" fill="url(#skylineGrad)" />

      {/* Distant layer (lighter) */}
      <g opacity="0.45" fill="oklch(0.30 0.03 260)">
        <rect x="0" y="240" width="60" height="120" />
        <rect x="70" y="220" width="40" height="140" />
        <rect x="120" y="250" width="80" height="110" />
        <rect x="210" y="200" width="40" height="160" />
        <rect x="260" y="230" width="60" height="130" />
        <rect x="330" y="210" width="50" height="150" />
        <rect x="390" y="240" width="90" height="120" />
        <rect x="490" y="220" width="40" height="140" />
        <rect x="540" y="200" width="60" height="160" />
        <rect x="610" y="230" width="50" height="130" />
        <rect x="670" y="210" width="80" height="150" />
        <rect x="760" y="240" width="40" height="120" />
        <rect x="810" y="220" width="60" height="140" />
        <rect x="880" y="240" width="100" height="120" />
        <rect x="990" y="210" width="50" height="150" />
        <rect x="1050" y="230" width="70" height="130" />
        <rect x="1130" y="220" width="40" height="140" />
        <rect x="1180" y="240" width="80" height="120" />
        <rect x="1270" y="210" width="60" height="150" />
        <rect x="1340" y="230" width="90" height="130" />
        <rect x="1440" y="240" width="50" height="120" />
        <rect x="1500" y="220" width="100" height="140" />
      </g>

      {/* Burj-style centerpiece */}
      <g fill="url(#skylineFill)">
        <polygon points="780,360 790,80 800,360" />
        <polygon points="775,360 785,140 795,360" opacity="0.8" />
      </g>

      {/* Foreground silhouette */}
      <g fill="url(#skylineFill)">
        <path d="M0,360 L0,300 L40,300 L40,260 L80,260 L80,290 L130,290 L130,250 L180,250 L180,275 L220,275 L220,230 L270,230 L270,260 L310,260 L310,210 L360,210 L360,250 L420,250 L420,220 L470,220 L470,260 L520,260 L520,200 L560,200 L560,240 L620,240 L620,210 L680,210 L680,180 L720,180 L720,230 L770,230 L770,360 Z" />
        <path d="M820,360 L820,210 L860,210 L860,250 L910,250 L910,220 L960,220 L960,260 L1020,260 L1020,200 L1070,200 L1070,240 L1120,240 L1120,210 L1170,210 L1170,260 L1220,260 L1220,220 L1280,220 L1280,250 L1330,250 L1330,200 L1380,200 L1380,240 L1440,240 L1440,210 L1490,210 L1490,260 L1540,260 L1540,230 L1600,230 L1600,360 Z" />
      </g>

      {/* Window light dots */}
      <g fill="oklch(0.84 0.10 82)" opacity="0.6">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 30 + i * 26;
          const y = 250 + ((i * 37) % 90);
          return <circle key={i} cx={x} cy={y} r="0.9" />;
        })}
      </g>
    </svg>
  );
}
