// Conceptual transparent illustration for the Expand Into The GCC hero.
// Narrative: a successful home-market business (a dense, structured node on
// the left) extends infrastructure pathways outward into six interconnected
// GCC opportunity markets. Each destination sits on a structural platform
// supported by foundation slabs (regulatory, financial, operational layers).
// Red Berry appears as the warm berry/gold connective infrastructure tying
// the markets together — never as a logo.

export function ExpandHeroArt() {
  const markets = [
    { x: 470, y: 200, r: 26, label: "UAE", primary: true },
    { x: 600, y: 320, r: 22, label: "KSA" },
    { x: 560, y: 470, r: 18, label: "QAT" },
    { x: 410, y: 540, r: 16, label: "BHR" },
    { x: 270, y: 540, r: 16, label: "KWT" },
    { x: 660, y: 600, r: 16, label: "OMN" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A successful home-market business extends infrastructure pathways into six interconnected GCC opportunity markets, each supported by structural foundation layers."
    >
      <defs>
        <linearGradient id="ex-corridor" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.1" />
          <stop offset="40%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="ex-market">
          <stop offset="0%" stopColor="oklch(0.92 0.10 70)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ex-origin">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ex-platform" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ex-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient field glow — regional opportunity space */}
      <ellipse cx="500" cy="430" rx="340" ry="320" fill="url(#ex-field)" />

      {/* Blueprint horizon lattice */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.4" opacity="0.25" fill="none">
        <path d="M0,300 L760,260" />
        <path d="M0,400 L760,360" />
        <path d="M0,500 L760,460" />
        <path d="M0,600 L760,560" />
      </g>

      {/* Foundation slabs beneath every destination — regulatory / financial layers */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.55" opacity="0.5" fill="none">
        {markets.map((m, i) => (
          <g key={`slab-${i}`}>
            <ellipse cx={m.x} cy={m.y + m.r + 22} rx={m.r + 18} ry="5" />
            <ellipse cx={m.x} cy={m.y + m.r + 34} rx={m.r + 12} ry="4" opacity="0.7" />
            <ellipse cx={m.x} cy={m.y + m.r + 46} rx={m.r + 6} ry="3" opacity="0.5" />
            <line x1={m.x - m.r} y1={m.y + m.r + 22} x2={m.x - m.r} y2={m.y + m.r + 46} />
            <line x1={m.x + m.r} y1={m.y + m.r + 22} x2={m.x + m.r} y2={m.y + m.r + 46} />
          </g>
        ))}
      </g>

      {/* Connective compliance ribs around the region */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.45" fill="none">
        <path d="M270,540 C 380,640 560,640 660,600" />
        <path d="M470,200 C 600,240 660,420 660,600" />
        <path d="M270,540 C 200,400 320,260 470,200" />
      </g>

      {/* ===== HOME-MARKET ORIGIN — a dense, structured node on the left ===== */}
      <g transform="translate(120 460)">
        <circle r="78" fill="url(#ex-origin)" opacity="0.55" />
        {/* Stacked structural frame */}
        <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.7" fill="none" opacity="0.85">
          <rect x="-44" y="-44" width="88" height="88" rx="6" />
          <rect x="-32" y="-32" width="64" height="64" rx="4" opacity="0.7" />
          <rect x="-20" y="-20" width="40" height="40" rx="3" opacity="0.5" />
        </g>
        {/* Internal infrastructure ticks */}
        <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.55" opacity="0.7">
          <line x1="-44" y1="-22" x2="44" y2="-22" />
          <line x1="-44" y1="0" x2="44" y2="0" />
          <line x1="-44" y1="22" x2="44" y2="22" />
          <line x1="-22" y1="-44" x2="-22" y2="44" />
          <line x1="0" y1="-44" x2="0" y2="44" />
          <line x1="22" y1="-44" x2="22" y2="44" />
        </g>
        {/* Core */}
        <circle r="9" fill="oklch(0.55 0.20 25)" opacity="0.95" />
        <circle r="3" fill="oklch(0.96 0.06 70)" />
        {/* Label */}
        <text
          x="0" y="92" textAnchor="middle"
          fontSize="10" letterSpacing="3"
          fill="oklch(0.78 0.10 70)" opacity="0.85"
          fontFamily="ui-sans-serif, system-ui"
        >
          HOME MARKET
        </text>
      </g>

      {/* ===== EXPANSION CORRIDORS — origin to every GCC market ===== */}
      <g fill="none">
        {markets.map((m, i) => {
          const ox = 120, oy = 460;
          const mx = (ox + m.x) / 2;
          const my = (oy + m.y) / 2 - 60;
          const d = `M${ox},${oy} Q ${mx},${my} ${m.x},${m.y}`;
          return (
            <g key={`corridor-${i}`}>
              <path d={d} stroke="url(#ex-corridor)" strokeWidth="2.2" opacity="0.9" />
              <path d={d} stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" opacity="0.55" strokeDasharray="2 5" />
            </g>
          );
        })}
      </g>

      {/* ===== GCC MARKET NODES — destinations on structural platforms ===== */}
      {markets.map((m, i) => (
        <g key={`mkt-${i}`}>
          {/* Platform glow */}
          <ellipse cx={m.x} cy={m.y + m.r + 18} rx={m.r + 20} ry="9" fill="url(#ex-platform)" opacity="0.55" />
          {/* Outer aura */}
          <circle cx={m.x} cy={m.y} r={m.r + 16} fill="url(#ex-market)" opacity="0.75" />
          {/* Ring */}
          <circle
            cx={m.x} cy={m.y} r={m.r}
            fill="none"
            stroke={m.primary ? "oklch(0.55 0.20 25)" : "oklch(0.72 0.14 70)"}
            strokeWidth={m.primary ? 1.4 : 1}
            opacity="0.95"
          />
          {/* Inner ring */}
          <circle
            cx={m.x} cy={m.y} r={m.r - 7}
            fill="none"
            stroke="oklch(0.62 0.16 240)"
            strokeWidth="0.5"
            opacity="0.7"
          />
          {/* Core */}
          <circle cx={m.x} cy={m.y} r={m.primary ? 5 : 3.5} fill="oklch(0.92 0.10 70)" />
          {m.primary && (
            <circle cx={m.x} cy={m.y} r="9" fill="none" stroke="oklch(0.55 0.20 25)" strokeWidth="0.6" opacity="0.85" />
          )}
          {/* Label */}
          <text
            x={m.x} y={m.y + m.r + 14}
            textAnchor="middle"
            fontSize="9" letterSpacing="2.4"
            fill="oklch(0.85 0.08 70)" opacity="0.9"
            fontFamily="ui-sans-serif, system-ui"
          >
            {m.label}
          </text>
        </g>
      ))}

      {/* Regional headquarters marker — UAE primary destination */}
      <g transform="translate(470 140)" opacity="0.85">
        <path
          d="M0,30 L-22,30 L-22,8 L0,-6 L22,8 L22,30 Z"
          fill="none"
          stroke="oklch(0.78 0.12 70)"
          strokeWidth="0.8"
        />
        <line x1="-10" y1="30" x2="-10" y2="14" stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" />
        <line x1="10" y1="30" x2="10" y2="14" stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" />
        <line x1="0" y1="30" x2="0" y2="6" stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" />
        <circle cx="0" cy="-12" r="2.5" fill="oklch(0.92 0.10 70)" />
      </g>

      {/* Top blueprint canopy — emerging regional plan */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.45" opacity="0.3" fill="none">
        <path d="M260,80 L580,70 L660,100" />
        <rect x="320" y="50" width="34" height="22" />
        <rect x="400" y="68" width="28" height="18" />
        <rect x="460" y="48" width="26" height="26" />
      </g>

      {/* Floating intelligence nodes — market signals */}
      {[
        { x: 220, y: 240 }, { x: 340, y: 160 }, { x: 540, y: 110 },
        { x: 690, y: 200 }, { x: 700, y: 460 },
      ].map((n, i) => (
        <g key={`fn-${i}`} opacity="0.55">
          <circle cx={n.x} cy={n.y} r="6" fill="url(#ex-market)" />
          <circle cx={n.x} cy={n.y} r="1.6" fill="oklch(0.92 0.10 70)" />
        </g>
      ))}

      {/* Motion pulses traveling outward into each market */}
      <g>
        {markets.slice(0, 4).map((m, i) => {
          const ox = 120, oy = 460;
          const mx = (ox + m.x) / 2;
          const my = (oy + m.y) / 2 - 60;
          const d = `M${ox},${oy} Q ${mx},${my} ${m.x},${m.y}`;
          return (
            <circle key={`pulse-${i}`} r="2.2" fill="oklch(0.92 0.10 70)">
              <animateMotion dur={`${6 + i}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;0" dur={`${6 + i}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
