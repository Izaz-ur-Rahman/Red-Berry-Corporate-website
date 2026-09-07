// Conceptual transparent illustration for Financial Infrastructure.
// Narrative: a financial control system — ledger lines, flowing capital
// streams, a central reporting core, audit nodes, and treasury rails.
// No charts or fake currency. Pure infrastructure language.

export function FinancialHeroArt() {
  return (
    <svg
      viewBox="0 0 720 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A financial control system with ledger rails, flowing capital streams, and a central reporting core."
    >
      <defs>
        <linearGradient id="fi-berry" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="fi-azure" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.55 0.16 245)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="fi-core">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0" />
        </radialGradient>
        <pattern id="fi-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="oklch(0.62 0.16 240)" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>

      {/* blueprint backdrop */}
      <rect x="0" y="0" width="720" height="900" fill="url(#fi-grid)" />
      <circle cx="360" cy="450" r="270" fill="url(#fi-core)" />

      {/* ledger rails — horizontal accounting bands */}
      <g stroke="oklch(0.78 0.12 70)" strokeOpacity="0.45" strokeWidth="1">
        <line x1="80" y1="200" x2="640" y2="200" />
        <line x1="80" y1="240" x2="640" y2="240" strokeDasharray="2 6" />
        <line x1="80" y1="640" x2="640" y2="640" strokeDasharray="2 6" />
        <line x1="80" y1="680" x2="640" y2="680" />
      </g>

      {/* central reporting core — concentric rings */}
      <g fill="none" stroke="url(#fi-berry)" strokeWidth="1.8">
        <circle cx="360" cy="450" r="120" opacity="0.95" />
        <circle cx="360" cy="450" r="80" opacity="0.75" />
        <circle cx="360" cy="450" r="40" opacity="0.6" />
      </g>
      <circle cx="360" cy="450" r="8" fill="oklch(0.78 0.12 70)" />

      {/* capital flow streams — sweeping curves into the core */}
      <g fill="none" stroke="url(#fi-azure)" strokeWidth="2" opacity="0.9">
        <path d="M40 760 C 180 600, 220 540, 360 450" />
        <path d="M680 760 C 540 600, 500 540, 360 450" />
        <path d="M40 140 C 180 300, 220 360, 360 450" />
        <path d="M680 140 C 540 300, 500 360, 360 450" />
      </g>

      {/* treasury rails — vertical pillars */}
      <g stroke="url(#fi-berry)" strokeWidth="3" strokeLinecap="round" opacity="0.85">
        <line x1="160" y1="220" x2="160" y2="680" />
        <line x1="560" y1="220" x2="560" y2="680" />
      </g>

      {/* audit nodes — checkpoints along the rails */}
      <g fill="oklch(0.78 0.12 70)">
        <circle cx="160" cy="300" r="5" />
        <circle cx="160" cy="450" r="5" />
        <circle cx="160" cy="600" r="5" />
        <circle cx="560" cy="300" r="5" />
        <circle cx="560" cy="450" r="5" />
        <circle cx="560" cy="600" r="5" />
      </g>

      {/* ledger entries — small tick marks on the rails */}
      <g stroke="oklch(0.55 0.20 25)" strokeOpacity="0.6" strokeWidth="1.2">
        <line x1="100" y1="220" x2="140" y2="220" />
        <line x1="100" y1="260" x2="140" y2="260" />
        <line x1="100" y1="340" x2="140" y2="340" />
        <line x1="100" y1="380" x2="140" y2="380" />
        <line x1="580" y1="540" x2="620" y2="540" />
        <line x1="580" y1="580" x2="620" y2="580" />
        <line x1="580" y1="620" x2="620" y2="620" />
        <line x1="580" y1="660" x2="620" y2="660" />
      </g>

      {/* connecting bridges between rails and core */}
      <g stroke="oklch(0.62 0.16 240)" strokeOpacity="0.35" strokeWidth="1">
        <line x1="165" y1="450" x2="240" y2="450" />
        <line x1="555" y1="450" x2="480" y2="450" />
      </g>

      {/* corner brackets — frame */}
      <g stroke="oklch(0.62 0.16 240)" strokeOpacity="0.4" strokeWidth="1.4" fill="none">
        <path d="M40 140 L40 100 L80 100" />
        <path d="M680 140 L680 100 L640 100" />
        <path d="M40 760 L40 800 L80 800" />
        <path d="M680 760 L680 800 L640 800" />
      </g>

      {/* subtle dimension marks */}
      <g stroke="oklch(0.62 0.16 240)" strokeOpacity="0.25" strokeWidth="0.8">
        <line x1="30" y1="220" x2="30" y2="680" />
        <line x1="24" y1="220" x2="36" y2="220" />
        <line x1="24" y1="680" x2="36" y2="680" />
      </g>
    </svg>
  );
}
