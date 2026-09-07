// Conceptual illustration for the Wealth Structure Design hero.
// Narrative: a layered holding architecture. A protective holding shell
// at the top, an operating layer in the middle, and an asset layer below,
// connected by ownership threads to a central stewardship core.

export function WealthStructureHeroArt() {
  const operating = [
    { x: 200, y: 430, r: 22, label: "OPCO 1" },
    { x: 380, y: 430, r: 24, label: "OPCO 2", primary: true },
    { x: 560, y: 430, r: 22, label: "OPCO 3" },
  ];
  const assets = [
    { x: 150, y: 640, r: 18, label: "PROPERTY" },
    { x: 300, y: 640, r: 18, label: "IP" },
    { x: 460, y: 640, r: 18, label: "INVEST" },
    { x: 610, y: 640, r: 18, label: "RESERVE" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A layered wealth structure showing a holding shell at the top, operating companies in the middle, and protected assets below, connected through ownership threads to a stewardship core."
    >
      <defs>
        <radialGradient id="ws-core">
          <stop offset="0%" stopColor="oklch(0.92 0.10 70)" stopOpacity="0.95" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ws-node">
          <stop offset="0%" stopColor="oklch(0.92 0.10 70)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ws-thread" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="ws-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="380" cy="450" rx="360" ry="380" fill="url(#ws-field)" />

      {/* HOLDING SHELL — protective top layer */}
      <g>
        <path
          d="M120,180 Q 380,80 640,180 L 620,250 Q 380,170 140,250 Z"
          fill="oklch(0.62 0.16 240)"
          fillOpacity="0.08"
          stroke="oklch(0.62 0.16 240)"
          strokeWidth="0.7"
          opacity="0.85"
        />
        <text
          x="380" y="220" textAnchor="middle"
          fontSize="10" letterSpacing="3.5"
          fill="oklch(0.85 0.08 70)" opacity="0.9"
          fontFamily="ui-sans-serif, system-ui"
        >
          HOLDING
        </text>
        {/* keystone */}
        <circle cx="380" cy="150" r="6" fill="oklch(0.55 0.20 25)" opacity="0.9" />
        <circle cx="380" cy="150" r="14" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
      </g>

      {/* STEWARDSHIP CORE — center anchor */}
      <g transform="translate(380 320)">
        <circle r="42" fill="url(#ws-core)" opacity="0.85" />
        <polygon
          points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
          fill="none"
          stroke="oklch(0.62 0.16 240)"
          strokeWidth="0.8"
          opacity="0.85"
        />
        <circle r="7" fill="oklch(0.55 0.20 25)" opacity="0.95" />
        <circle r="2.5" fill="oklch(0.96 0.06 70)" />
        <text
          x="0" y="58" textAnchor="middle"
          fontSize="9" letterSpacing="3"
          fill="oklch(0.85 0.08 70)" opacity="0.9"
          fontFamily="ui-sans-serif, system-ui"
        >
          STEWARDSHIP
        </text>
      </g>

      {/* OWNERSHIP THREADS from core down to operating */}
      <g fill="none" stroke="url(#ws-thread)" strokeWidth="1.4" opacity="0.85">
        {operating.map((o, i) => {
          const d = `M380,360 Q ${(380 + o.x) / 2},${(360 + o.y) / 2 - 10} ${o.x},${o.y}`;
          return <path key={`ot-${i}`} d={d} />;
        })}
      </g>

      {/* OPERATING LAYER */}
      {operating.map((o, i) => (
        <g key={`op-${i}`}>
          <circle cx={o.x} cy={o.y} r={o.r + 12} fill="url(#ws-node)" opacity="0.7" />
          <circle
            cx={o.x} cy={o.y} r={o.r}
            fill="none"
            stroke={o.primary ? "oklch(0.55 0.20 25)" : "oklch(0.72 0.14 70)"}
            strokeWidth={o.primary ? 1.3 : 0.9}
            opacity="0.95"
          />
          <circle cx={o.x} cy={o.y} r={o.r - 7} fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.65" />
          <circle cx={o.x} cy={o.y} r={o.primary ? 4 : 3} fill="oklch(0.92 0.10 70)" />
          <text
            x={o.x} y={o.y + o.r + 14}
            textAnchor="middle"
            fontSize="8" letterSpacing="2.4"
            fill="oklch(0.85 0.08 70)" opacity="0.9"
            fontFamily="ui-sans-serif, system-ui"
          >
            {o.label}
          </text>
        </g>
      ))}

      {/* THREADS from operating to assets */}
      <g fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.7" opacity="0.55" strokeDasharray="2 4">
        {assets.map((a, i) => {
          const op = operating[Math.min(Math.floor((i + 0.5) * operating.length / assets.length), operating.length - 1)];
          return <path key={`at-${i}`} d={`M${op.x},${op.y + op.r} Q ${(op.x + a.x) / 2},${(op.y + a.y) / 2} ${a.x},${a.y - a.r}`} />;
        })}
      </g>

      {/* ASSET LAYER */}
      {assets.map((a, i) => (
        <g key={`as-${i}`}>
          <ellipse cx={a.x} cy={a.y + a.r + 14} rx={a.r + 16} ry="5" fill="oklch(0.55 0.20 25)" opacity="0.18" />
          <circle cx={a.x} cy={a.y} r={a.r + 8} fill="url(#ws-node)" opacity="0.55" />
          <circle cx={a.x} cy={a.y} r={a.r} fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="0.85" opacity="0.9" />
          <circle cx={a.x} cy={a.y} r="3" fill="oklch(0.92 0.10 70)" />
          <text
            x={a.x} y={a.y + a.r + 12}
            textAnchor="middle"
            fontSize="7.5" letterSpacing="2"
            fill="oklch(0.85 0.08 70)" opacity="0.85"
            fontFamily="ui-sans-serif, system-ui"
          >
            {a.label}
          </text>
        </g>
      ))}

      {/* GOVERNANCE FOUNDATION LINE */}
      <g>
        <line x1="100" y1="780" x2="660" y2="780" stroke="oklch(0.55 0.20 25)" strokeWidth="1" opacity="0.6" />
        <text
          x="380" y="800"
          textAnchor="middle"
          fontSize="8" letterSpacing="3.2"
          fill="oklch(0.78 0.10 70)" opacity="0.75"
          fontFamily="ui-sans-serif, system-ui"
        >
          GOVERNANCE · SUCCESSION · CONTINUITY
        </text>
      </g>

      {/* Pulses down the ownership threads */}
      <g>
        {operating.map((o, i) => {
          const d = `M380,360 Q ${(380 + o.x) / 2},${(360 + o.y) / 2 - 10} ${o.x},${o.y}`;
          return (
            <circle key={`p-${i}`} r="2" fill="oklch(0.92 0.10 70)">
              <animateMotion dur={`${6 + i}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;0" dur={`${6 + i}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
