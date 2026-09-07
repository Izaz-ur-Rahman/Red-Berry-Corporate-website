// Conceptual transparent illustration for the Build A Hospitality Venture hero.
// Narrative: a hospitality vision rising into a thriving destination — concept,
// guests, experience, and growth — all anchored by invisible operational and
// financial infrastructure beneath. No logos. No buildings rendered literally.
// Only vision, structure, and the architecture behind great hospitality.

export function HospitalityHeroArt() {
  const orbits = [
    { x: 200, y: 230, r: 22, label: "GUESTS" },
    { x: 560, y: 230, r: 22, label: "EXPERIENCE" },
    { x: 120, y: 410, r: 20, label: "OPERATIONS" },
    { x: 640, y: 410, r: 20, label: "GROWTH" },
    { x: 230, y: 560, r: 18, label: "BRAND" },
    { x: 530, y: 560, r: 18, label: "INVESTMENT" },
    { x: 380, y: 130, r: 26, label: "VISION", primary: true },
  ];

  const arc = [
    { x: 380, y: 720, label: "CONCEPT" },
    { x: 380, y: 760, label: "VENTURE" },
    { x: 380, y: 800, label: "DESTINATION" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A hospitality vision rising into a thriving destination, connected to guests, experience, operations, growth, brand, and investment, supported by invisible infrastructure beneath."
    >
      <defs>
        <radialGradient id="hv-core">
          <stop offset="0%" stopColor="oklch(0.94 0.08 70)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hv-node">
          <stop offset="0%" stopColor="oklch(0.94 0.08 70)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hv-thread" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="hv-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hv-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hv-spire" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="oklch(0.94 0.08 70)" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Ambient field */}
      <ellipse cx="380" cy="420" rx="370" ry="380" fill="url(#hv-field)" />

      {/* Concentric infrastructure rings */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.32" fill="none">
        <ellipse cx="380" cy="400" rx="320" ry="300" />
        <ellipse cx="380" cy="400" rx="260" ry="240" opacity="0.7" />
        <ellipse cx="380" cy="400" rx="190" ry="170" opacity="0.55" />
      </g>

      {/* Abstract destination spires — vision rising */}
      <g opacity="0.55">
        <path d="M340 380 L340 150 L380 110 L420 150 L420 380 Z" fill="url(#hv-spire)" stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" />
        <path d="M300 400 L300 240 L330 210 L360 240 L360 400 Z" fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.6" />
        <path d="M400 400 L400 240 L430 210 L460 240 L460 400 Z" fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.6" />
      </g>

      {/* Threads connecting vision to facets */}
      <g fill="none">
        {orbits.map((h, i) => {
          const cx = 380, cy = 400;
          const mx = (cx + h.x) / 2;
          const my = (cy + h.y) / 2 - 18;
          const d = `M${cx},${cy} Q ${mx},${my} ${h.x},${h.y}`;
          return (
            <g key={`t-${i}`}>
              <path d={d} stroke="url(#hv-thread)" strokeWidth="1.4" opacity="0.85" />
              <path d={d} stroke="oklch(0.78 0.12 70)" strokeWidth="0.4" opacity="0.5" strokeDasharray="2 5" />
            </g>
          );
        })}
      </g>

      {/* Facet nodes */}
      {orbits.map((h, i) => (
        <g key={`o-${i}`}>
          <circle cx={h.x} cy={h.y} r={h.r + 14} fill="url(#hv-node)" opacity="0.7" />
          <circle
            cx={h.x} cy={h.y} r={h.r}
            fill="none"
            stroke={h.primary ? "oklch(0.55 0.20 25)" : "oklch(0.72 0.14 70)"}
            strokeWidth={h.primary ? 1.3 : 0.9}
            opacity="0.95"
          />
          <circle cx={h.x} cy={h.y} r={h.r - 7} fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.7" />
          <circle cx={h.x} cy={h.y} r={h.primary ? 5 : 3.5} fill="oklch(0.94 0.08 70)" />
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

      {/* Center — the destination heart */}
      <g transform="translate(380 400)">
        <circle r="48" fill="url(#hv-core)" opacity="0.95" />
        <circle r="32" fill="none" stroke="oklch(0.55 0.20 25)" strokeWidth="1" opacity="0.85" />
        <circle r="22" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
        <text
          x="0" y="3"
          textAnchor="middle"
          fontSize="8" letterSpacing="3"
          fill="oklch(0.94 0.08 70)" opacity="0.95"
          fontFamily="ui-sans-serif, system-ui"
        >
          DESTINATION
        </text>
      </g>

      {/* Infrastructure foundation beneath */}
      <g transform="translate(380 640)">
        <ellipse cx="0" cy="20" rx="240" ry="16" fill="url(#hv-base)" opacity="0.75" />
        <ellipse cx="0" cy="28" rx="180" ry="7" fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.5" />
        <ellipse cx="0" cy="34" rx="120" ry="4" fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.45" />
        <text
          x="0" y="0"
          textAnchor="middle"
          fontSize="9" letterSpacing="4"
          fill="oklch(0.86 0.08 70)" opacity="0.9"
          fontFamily="ui-sans-serif, system-ui"
        >
          INFRASTRUCTURE
        </text>
        <line x1="-110" y1="6" x2="-30" y2="6" stroke="oklch(0.72 0.14 70)" strokeWidth="0.4" opacity="0.6" />
        <line x1="30" y1="6" x2="110" y2="6" stroke="oklch(0.72 0.14 70)" strokeWidth="0.4" opacity="0.6" />
      </g>

      {/* Vertical link — foundation to destination */}
      <line x1="380" y1="450" x2="380" y2="620" stroke="oklch(0.55 0.20 25)" strokeWidth="1" opacity="0.7" strokeDasharray="2 5" />

      {/* Continuity arc */}
      <g>
        {arc.map((s, i) => (
          <g key={`a-${i}`} opacity={0.85 - i * 0.18}>
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

      {/* Floating motes — guest signals */}
      {[
        { x: 80, y: 280 }, { x: 700, y: 280 }, { x: 380, y: 60 },
        { x: 100, y: 520 }, { x: 670, y: 520 }, { x: 380, y: 870 },
      ].map((n, i) => (
        <g key={`m-${i}`} opacity="0.55">
          <circle cx={n.x} cy={n.y} r="5" fill="url(#hv-node)" />
          <circle cx={n.x} cy={n.y} r="1.4" fill="oklch(0.94 0.08 70)" />
        </g>
      ))}

      {/* Motion pulses — experience flowing outward */}
      <g>
        {orbits.slice(0, 5).map((h, i) => {
          const cx = 380, cy = 400;
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
