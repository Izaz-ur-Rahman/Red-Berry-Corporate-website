// Conceptual transparent illustration for the Grow & Protect Wealth hero.
// Narrative: a founder/investor wealth ecosystem — operating businesses,
// property, intellectual property, investments, ventures, and reserves —
// connected through invisible infrastructure layers. A protective canopy
// spans above; foundation slabs support every asset; warm berry/gold
// connective tissue ties everything to a central wealth core. No charts.
// No currency. No family imagery.

export function WealthHeroArt() {
  const assets = [
    { x: 200, y: 240, r: 26, label: "BUSINESS", primary: true },
    { x: 560, y: 240, r: 24, label: "PROPERTY" },
    { x: 130, y: 430, r: 20, label: "IP" },
    { x: 620, y: 430, r: 22, label: "INVESTMENTS" },
    { x: 240, y: 620, r: 18, label: "VENTURES" },
    { x: 520, y: 620, r: 18, label: "RESERVES" },
  ];

  const stages = [
    { x: 320, y: 760, label: "STRUCTURE" },
    { x: 380, y: 800, label: "GROWTH" },
    { x: 440, y: 760, label: "RESILIENCE" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A founder and investor wealth ecosystem — operating businesses, properties, intellectual property, investments, ventures, and reserves — connected through invisible infrastructure layers that protect, structure, and grow wealth."
    >
      <defs>
        <radialGradient id="w-core">
          <stop offset="0%" stopColor="oklch(0.92 0.10 70)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="w-asset">
          <stop offset="0%" stopColor="oklch(0.92 0.10 70)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="w-thread" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="w-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="w-platform" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ambient field — protective sphere */}
      <ellipse cx="380" cy="450" rx="360" ry="380" fill="url(#w-field)" />

      {/* Protective canopy lattice — governance / continuity layer */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.35" fill="none">
        <path d="M40,140 Q 380,40 720,140" />
        <path d="M80,180 Q 380,90 680,180" opacity="0.7" />
        <path d="M120,220 Q 380,140 640,220" opacity="0.5" />
        {/* Vertical ribs */}
        <path d="M150,160 L150,520" opacity="0.4" />
        <path d="M380,80 L380,520" opacity="0.5" />
        <path d="M610,160 L610,520" opacity="0.4" />
      </g>

      {/* Canopy markers — keystones of protection */}
      <g opacity="0.7">
        {[150, 380, 610].map((cx, i) => (
          <g key={`key-${i}`}>
            <circle cx={cx} cy={i === 1 ? 80 : 160} r="3" fill="oklch(0.92 0.10 70)" />
            <circle cx={cx} cy={i === 1 ? 80 : 160} r="8" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" />
          </g>
        ))}
      </g>

      {/* ===== CENTRAL WEALTH CORE — capital anchor ===== */}
      <g transform="translate(380 460)">
        <circle r="64" fill="url(#w-core)" opacity="0.85" />
        {/* Hexagonal stewardship frame */}
        <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.7" fill="none" opacity="0.85">
          <polygon points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23" />
          <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" opacity="0.6" />
        </g>
        {/* Internal continuity threads */}
        <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.7">
          <line x1="0" y1="-46" x2="0" y2="46" />
          <line x1="-40" y1="-23" x2="40" y2="23" />
          <line x1="-40" y1="23" x2="40" y2="-23" />
        </g>
        {/* Core orb */}
        <circle r="10" fill="oklch(0.55 0.20 25)" opacity="0.95" />
        <circle r="3.5" fill="oklch(0.96 0.06 70)" />
        <text
          x="0" y="80" textAnchor="middle"
          fontSize="9" letterSpacing="3.2"
          fill="oklch(0.85 0.08 70)" opacity="0.9"
          fontFamily="ui-sans-serif, system-ui"
        >
          WEALTH
        </text>
      </g>

      {/* ===== INFRASTRUCTURE THREADS — every asset to the legacy core ===== */}
      <g fill="none">
        {assets.map((a, i) => {
          const cx = 380, cy = 460;
          const mx = (cx + a.x) / 2;
          const my = (cy + a.y) / 2 - 30;
          const d = `M${cx},${cy} Q ${mx},${my} ${a.x},${a.y}`;
          return (
            <g key={`thread-${i}`}>
              <path d={d} stroke="url(#w-thread)" strokeWidth="1.6" opacity="0.85" />
              <path d={d} stroke="oklch(0.78 0.12 70)" strokeWidth="0.4" opacity="0.5" strokeDasharray="2 5" />
            </g>
          );
        })}
      </g>

      {/* ===== ASSET NODES — businesses, property, IP, investments, trust, family office ===== */}
      {assets.map((a, i) => (
        <g key={`asset-${i}`}>
          {/* Platform beneath every asset — structural foundation */}
          <ellipse cx={a.x} cy={a.y + a.r + 18} rx={a.r + 22} ry="8" fill="url(#w-platform)" opacity="0.55" />
          <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.45" fill="none">
            <ellipse cx={a.x} cy={a.y + a.r + 22} rx={a.r + 16} ry="4" />
            <ellipse cx={a.x} cy={a.y + a.r + 32} rx={a.r + 10} ry="3" opacity="0.7" />
          </g>
          {/* Aura */}
          <circle cx={a.x} cy={a.y} r={a.r + 14} fill="url(#w-asset)" opacity="0.7" />
          {/* Outer ring */}
          <circle
            cx={a.x} cy={a.y} r={a.r}
            fill="none"
            stroke={a.primary ? "oklch(0.55 0.20 25)" : "oklch(0.72 0.14 70)"}
            strokeWidth={a.primary ? 1.3 : 0.9}
            opacity="0.95"
          />
          {/* Inner ring — protective layer */}
          <circle cx={a.x} cy={a.y} r={a.r - 7} fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.7" />
          {/* Core */}
          <circle cx={a.x} cy={a.y} r={a.primary ? 5 : 3.5} fill="oklch(0.92 0.10 70)" />
          {a.primary && (
            <circle cx={a.x} cy={a.y} r="9" fill="none" stroke="oklch(0.55 0.20 25)" strokeWidth="0.5" opacity="0.85" />
          )}
          {/* Label */}
          <text
            x={a.x} y={a.y + a.r + 12}
            textAnchor="middle"
            fontSize="8" letterSpacing="2.4"
            fill="oklch(0.85 0.08 70)" opacity="0.9"
            fontFamily="ui-sans-serif, system-ui"
          >
            {a.label}
          </text>
        </g>
      ))}

      {/* Cross-asset governance arcs — wealth ring */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.55" opacity="0.4" fill="none">
        <path d="M200,240 C 320,180 440,180 560,240" />
        <path d="M130,430 C 130,540 240,620 240,620" />
        <path d="M620,430 C 620,540 520,620 520,620" />
        <path d="M240,620 C 320,680 440,680 520,620" />
      </g>

      {/* ===== GENERATIONAL TRANSFER — line of stewards beneath the ecosystem ===== */}
      <g>
        {/* Pathway */}
        <path
          d="M280,780 Q 380,820 480,780"
          fill="none"
          stroke="oklch(0.55 0.20 25)"
          strokeWidth="1.4"
          opacity="0.7"
        />
        <path
          d="M280,780 Q 380,820 480,780"
          fill="none"
          stroke="oklch(0.78 0.12 70)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          opacity="0.6"
        />
        {stages.map((g, i) => (
          <g key={`stage-${i}`}>
            <circle cx={g.x} cy={g.y} r="9" fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="0.8" opacity="0.85" />
            <circle cx={g.x} cy={g.y} r="3.2" fill="oklch(0.92 0.10 70)" />
            <text
              x={g.x} y={g.y + 22}
              textAnchor="middle"
              fontSize="7.5" letterSpacing="2"
              fill="oklch(0.85 0.08 70)" opacity="0.85"
              fontFamily="ui-sans-serif, system-ui"
            >
              {g.label}
            </text>
          </g>
        ))}
        {/* Compounding arrow */}
        <text
          x="380" y="720"
          textAnchor="middle"
          fontSize="8" letterSpacing="3.2"
          fill="oklch(0.78 0.10 70)" opacity="0.7"
          fontFamily="ui-sans-serif, system-ui"
        >
          COMPOUNDING
        </text>
      </g>

      {/* Floating intelligence motes — stewardship signals */}
      {[
        { x: 90, y: 320 }, { x: 680, y: 320 }, { x: 380, y: 200 },
        { x: 110, y: 540 }, { x: 660, y: 540 },
      ].map((n, i) => (
        <g key={`mote-${i}`} opacity="0.55">
          <circle cx={n.x} cy={n.y} r="5" fill="url(#w-asset)" />
          <circle cx={n.x} cy={n.y} r="1.4" fill="oklch(0.92 0.10 70)" />
        </g>
      ))}

      {/* Motion pulses — wealth flowing back toward legacy core */}
      <g>
        {assets.slice(0, 4).map((a, i) => {
          const cx = 380, cy = 460;
          const mx = (cx + a.x) / 2;
          const my = (cy + a.y) / 2 - 30;
          const d = `M${a.x},${a.y} Q ${mx},${my} ${cx},${cy}`;
          return (
            <circle key={`p-${i}`} r="2" fill="oklch(0.92 0.10 70)">
              <animateMotion dur={`${7 + i}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;0" dur={`${7 + i}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
