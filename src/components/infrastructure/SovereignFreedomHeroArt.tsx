// Conceptual transparent illustration for the Sovereign Freedom hero.
// Narrative: an individual at the center of a global mobility network,
// with radiating pathways to multiple jurisdictions. A golden crown motif
// represents the Golden Visa, and orbit rings suggest jurisdictional optionality.
// No passports. No flags. Only freedom, reach, and choice.

export function SovereignFreedomHeroArt() {
  const nodes = [
    { x: 170, y: 220, r: 22, label: "RESIDENCY" },
    { x: 380, y: 160, r: 26, label: "GOLDEN VISA", primary: true },
    { x: 590, y: 220, r: 22, label: "CITIZENSHIP" },
    { x: 110, y: 420, r: 20, label: "MOBILITY" },
    { x: 650, y: 420, r: 20, label: "OPTIONALITY" },
    { x: 230, y: 540, r: 18, label: "JURISDICTION" },
    { x: 530, y: 540, r: 18, label: "FREEDOM" },
  ];

  const orbit = [
    { x: 380, y: 720, label: "TODAY" },
    { x: 380, y: 760, label: "SOVEREIGN" },
    { x: 380, y: 800, label: "FUTURE" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="An individual at the center of a global mobility network, with radiating pathways to residency, Golden Visa, and citizenship across multiple jurisdictions."
    >
      <defs>
        <radialGradient id="sf-core">
          <stop offset="0%" stopColor="oklch(0.94 0.08 70)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sf-node">
          <stop offset="0%" stopColor="oklch(0.94 0.08 70)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-thread" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="sf-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sf-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.16 85)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Ambient field */}
      <ellipse cx="380" cy="420" rx="370" ry="380" fill="url(#sf-field)" />

      {/* Outer orbit rings — global reach */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.35" fill="none">
        <ellipse cx="380" cy="380" rx="320" ry="300" />
        <ellipse cx="380" cy="380" rx="260" ry="240" opacity="0.7" />
        <ellipse cx="380" cy="380" rx="190" ry="170" opacity="0.55" />
      </g>

      {/* Longitude/latitude — globe suggestion */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.4" opacity="0.3" fill="none">
        <path d="M380,80 Q 200,380 380,680" />
        <path d="M380,80 Q 560,380 380,680" />
        <path d="M60,380 Q 380,260 700,380" />
        <path d="M60,380 Q 380,500 700,380" />
      </g>

      {/* Threads from center to nodes */}
      <g fill="none">
        {nodes.map((h, i) => {
          const cx = 380, cy = 380;
          const mx = (cx + h.x) / 2;
          const my = (cy + h.y) / 2 - 18;
          const d = `M${cx},${cy} Q ${mx},${my} ${h.x},${h.y}`;
          return (
            <g key={`thread-${i}`}>
              <path d={d} stroke="url(#sf-thread)" strokeWidth="1.4" opacity="0.85" />
              <path d={d} stroke="oklch(0.78 0.12 70)" strokeWidth="0.4" opacity="0.5" strokeDasharray="2 5" />
            </g>
          );
        })}
      </g>

      {/* Opportunity nodes */}
      {nodes.map((h, i) => (
        <g key={`n-${i}`}>
          <circle cx={h.x} cy={h.y} r={h.r + 14} fill="url(#sf-node)" opacity="0.7" />
          <circle
            cx={h.x} cy={h.y} r={h.r}
            fill="none"
            stroke={h.primary ? "oklch(0.55 0.20 25)" : "oklch(0.72 0.14 70)"}
            strokeWidth={h.primary ? 1.3 : 0.9}
            opacity="0.95"
          />
          <circle cx={h.x} cy={h.y} r={h.r - 7} fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.7" />
          <circle cx={h.x} cy={h.y} r={h.primary ? 5 : 3.5} fill="oklch(0.94 0.08 70)" />
          {h.primary && (
            <circle cx={h.x} cy={h.y} r="9" fill="none" stroke="oklch(0.55 0.20 25)" strokeWidth="0.5" opacity="0.85" />
          )}
          <text
            x={h.x} y={h.y + h.r + 12}
            textAnchor="middle"
            fontSize="8" letterSpacing="2.2"
            fill="oklch(0.86 0.08 70)" opacity="0.9"
            fontFamily="ui-sans-serif, system-ui"
          >
            {h.label}
          </text>
        </g>
      ))}

      {/* ===== CENTER — the sovereign individual ===== */}
      <g transform="translate(380 380)">
        <circle r="46" fill="url(#sf-core)" opacity="0.95" />
        <circle r="30" fill="none" stroke="oklch(0.55 0.20 25)" strokeWidth="1" opacity="0.85" />
        <circle r="22" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
        {/* Crown motif */}
        <g fill="oklch(0.94 0.08 70)" opacity="0.95">
          <path d="M -8 -6 L -4 -14 L 0 -10 L 4 -14 L 8 -6 L 4 -2 L 0 -5 L -4 -2 Z" />
          <circle r="5.5" cy="6" />
          <path d="M -5 10 L -5 18 L 5 18 L 5 10 Z" />
        </g>
      </g>

      {/* ===== FOUNDATION — jurisdictional anchor ===== */}
      <g transform="translate(380 640)">
        <ellipse cx="0" cy="20" rx="220" ry="16" fill="url(#sf-base)" opacity="0.75" />
        <ellipse cx="0" cy="28" rx="170" ry="7" fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.5" />
        <ellipse cx="0" cy="34" rx="120" ry="4" fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.45" />
        <text
          x="0" y="0"
          textAnchor="middle"
          fontSize="9" letterSpacing="4"
          fill="oklch(0.86 0.08 70)" opacity="0.9"
          fontFamily="ui-sans-serif, system-ui"
        >
          JURISDICTIONAL BASE
        </text>
        <line x1="-100" y1="6" x2="-30" y2="6" stroke="oklch(0.72 0.14 70)" strokeWidth="0.4" opacity="0.6" />
        <line x1="30" y1="6" x2="100" y2="6" stroke="oklch(0.72 0.14 70)" strokeWidth="0.4" opacity="0.6" />
      </g>

      {/* Vertical link — foundation to center */}
      <line x1="380" y1="430" x2="380" y2="620" stroke="oklch(0.55 0.20 25)" strokeWidth="1" opacity="0.7" strokeDasharray="2 5" />

      {/* Continuity arc beneath */}
      <g>
        {orbit.map((s, i) => (
          <g key={`o-${i}`} opacity={0.85 - i * 0.18}>
            <text
              x={s.x} y={s.y}
              textAnchor="middle"
              fontSize="7.5" letterSpacing="3"
              fill="oklch(0.78 0.10 70)"
              fontFamily="ui-sans-serif, system-ui"
            >
              {s.label}
            </text>
          </g>
        ))}
      </g>

      {/* Floating motes — mobility signals */}
      {[
        { x: 80, y: 280 }, { x: 700, y: 280 }, { x: 380, y: 80 },
        { x: 90, y: 520 }, { x: 680, y: 520 }, { x: 380, y: 870 },
      ].map((n, i) => (
        <g key={`m-${i}`} opacity="0.55">
          <circle cx={n.x} cy={n.y} r="5" fill="url(#sf-node)" />
          <circle cx={n.x} cy={n.y} r="1.4" fill="oklch(0.94 0.08 70)" />
        </g>
      ))}

      {/* Motion pulses — freedom flowing outward */}
      <g>
        {nodes.slice(0, 5).map((h, i) => {
          const cx = 380, cy = 380;
          const mx = (cx + h.x) / 2;
          const my = (cy + h.y) / 2 - 18;
          const d = `M${cx},${cy} Q ${mx},${my} ${h.x},${h.y}`;
          return (
            <circle key={`p-${i}`} r="2" fill="oklch(0.94 0.08 70)">
              <animateMotion dur={`${6 + i}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;0" dur={`${6 + i}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
