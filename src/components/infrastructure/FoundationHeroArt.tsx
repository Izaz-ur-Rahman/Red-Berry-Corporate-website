// Conceptual transparent illustration for Foundation Build.
// Narrative: bedrock foundations being engineered beneath a future structure.
// Layered slabs (jurisdiction → entity → ownership → licensing), structural
// columns rising into a clean architectural frame, blueprint geometry,
// ground-line reinforcement bars. No skyline; the structure is the spine.

export function FoundationHeroArt() {
  return (
    <svg
      viewBox="0 0 720 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="Layered architectural foundations rising into a structural frame — the corporate spine being engineered before construction begins."
    >
      <defs>
        <linearGradient id="fb-berry" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="fb-azure" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="oklch(0.55 0.16 245)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fb-slab" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.05" />
          <stop offset="50%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="fb-core">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0" />
        </radialGradient>
        <pattern id="fb-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="oklch(0.62 0.16 240)" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>

      {/* blueprint backdrop */}
      <rect x="0" y="0" width="720" height="900" fill="url(#fb-grid)" />
      <circle cx="360" cy="470" r="260" fill="url(#fb-core)" />

      {/* upper frame — future structure */}
      <g stroke="url(#fb-azure)" strokeWidth="1.5" fill="none" opacity="0.85">
        <path d="M180 380 L180 120 L540 120 L540 380" />
        <path d="M240 380 L240 180" />
        <path d="M360 380 L360 80" />
        <path d="M480 380 L480 180" />
        <path d="M180 120 L360 60 L540 120" />
      </g>

      {/* horizontal beams */}
      <g stroke="oklch(0.78 0.12 70)" strokeOpacity="0.5" strokeWidth="1">
        <line x1="160" y1="200" x2="560" y2="200" />
        <line x1="160" y1="280" x2="560" y2="280" />
      </g>

      {/* foundation slabs — layered, labeled implicitly */}
      <g>
        <rect x="100" y="420" width="520" height="42" rx="6" fill="url(#fb-slab)" stroke="oklch(0.55 0.20 25)" strokeOpacity="0.55" />
        <rect x="80"  y="478" width="560" height="48" rx="6" fill="url(#fb-slab)" stroke="oklch(0.55 0.20 25)" strokeOpacity="0.65" />
        <rect x="60"  y="542" width="600" height="54" rx="6" fill="url(#fb-slab)" stroke="oklch(0.55 0.20 25)" strokeOpacity="0.75" />
        <rect x="40"  y="612" width="640" height="62" rx="8" fill="url(#fb-slab)" stroke="oklch(0.55 0.20 25)" strokeOpacity="0.85" />
      </g>

      {/* structural columns descending into bedrock */}
      <g stroke="url(#fb-berry)" strokeWidth="3" strokeLinecap="round">
        <line x1="200" y1="380" x2="200" y2="700" />
        <line x1="360" y1="380" x2="360" y2="740" />
        <line x1="520" y1="380" x2="520" y2="700" />
      </g>

      {/* reinforcement bars / ground line */}
      <g stroke="oklch(0.55 0.20 25)" strokeOpacity="0.55" strokeWidth="1.2">
        <line x1="20" y1="700" x2="700" y2="700" />
        <line x1="80" y1="720" x2="640" y2="720" strokeDasharray="2 6" />
        <line x1="120" y1="740" x2="600" y2="740" strokeDasharray="2 6" opacity="0.65" />
        <line x1="160" y1="760" x2="560" y2="760" strokeDasharray="2 6" opacity="0.45" />
      </g>

      {/* nodes — decision points */}
      <g fill="oklch(0.78 0.12 70)">
        <circle cx="200" cy="380" r="5" />
        <circle cx="360" cy="380" r="5" />
        <circle cx="520" cy="380" r="5" />
        <circle cx="100" cy="441" r="3.5" opacity="0.8" />
        <circle cx="620" cy="441" r="3.5" opacity="0.8" />
        <circle cx="80"  cy="502" r="3.5" opacity="0.8" />
        <circle cx="640" cy="502" r="3.5" opacity="0.8" />
        <circle cx="60"  cy="569" r="3.5" opacity="0.8" />
        <circle cx="660" cy="569" r="3.5" opacity="0.8" />
        <circle cx="40"  cy="643" r="3.5" opacity="0.8" />
        <circle cx="680" cy="643" r="3.5" opacity="0.8" />
      </g>

      {/* keystone — the load-bearing center */}
      <g>
        <polygon points="340,60 380,60 396,108 324,108" fill="oklch(0.55 0.20 25)" fillOpacity="0.55" stroke="oklch(0.78 0.12 70)" strokeOpacity="0.8" />
        <circle cx="360" cy="84" r="3" fill="oklch(0.78 0.12 70)" />
      </g>

      {/* subtle dimension marks */}
      <g stroke="oklch(0.62 0.16 240)" strokeOpacity="0.25" strokeWidth="0.8">
        <line x1="30" y1="420" x2="30" y2="674" />
        <line x1="24" y1="420" x2="36" y2="420" />
        <line x1="24" y1="674" x2="36" y2="674" />
      </g>
    </svg>
  );
}
