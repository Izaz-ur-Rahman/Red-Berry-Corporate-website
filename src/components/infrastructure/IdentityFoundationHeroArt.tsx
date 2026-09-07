// Conceptual illustration for the Identity Foundation hero.
// Narrative: a constellation of identity nodes — trademark shields,
// fingerprint patterns, name rights, and digital identity marks — all
// orbiting a central identity core, connected by protection threads.

export function IdentityFoundationHeroArt() {
  const nodes = [
    { x: 200, y: 220, r: 28, label: "TRADEMARK", type: "shield" },
    { x: 560, y: 220, r: 28, label: "BRAND", type: "shield" },
    { x: 140, y: 420, r: 24, label: "IP", type: "circle" },
    { x: 620, y: 420, r: 24, label: "DIGITAL", type: "circle" },
    { x: 240, y: 620, r: 22, label: "NAME", type: "hex" },
    { x: 520, y: 620, r: 22, label: "ENTITY", type: "hex" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="An identity constellation showing trademark, brand, IP, digital identity, name rights, and entity identity all orbiting a central identity core, connected by protection threads."
    >
      <defs>
        <radialGradient id="id-core">
          <stop offset="0%" stopColor="oklch(0.92 0.10 200)" stopOpacity="0.95" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 200)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 240)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="id-node">
          <stop offset="0%" stopColor="oklch(0.92 0.10 200)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 200)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 240)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="id-thread" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 200)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 240)" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="id-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 200)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 200)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="id-glow">
          <stop offset="0%" stopColor="oklch(0.92 0.10 200)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 200)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="380" cy="450" rx="360" ry="380" fill="url(#id-field)" />

      {/* CENTRAL IDENTITY CORE */}
      <g transform="translate(380 380)">
        <circle r="56" fill="url(#id-core)" opacity="0.85" />
        {/* Fingerprint rings */}
        <circle r="42" fill="none" stroke="oklch(0.62 0.16 200)" strokeWidth="0.8" opacity="0.7" />
        <circle r="32" fill="none" stroke="oklch(0.78 0.12 200)" strokeWidth="0.6" opacity="0.6" />
        <circle r="22" fill="none" stroke="oklch(0.85 0.10 200)" strokeWidth="0.5" opacity="0.5" />
        {/* Core dot */}
        <circle r="7" fill="oklch(0.55 0.20 240)" opacity="0.95" />
        <circle r="2.5" fill="oklch(0.96 0.06 200)" />
        <text
          x="0" y="76"
          textAnchor="middle"
          fontSize="9" letterSpacing="3"
          fill="oklch(0.85 0.08 200)" opacity="0.9"
          fontFamily="ui-sans-serif, system-ui"
        >
          IDENTITY CORE
        </text>
      </g>

      {/* PROTECTION THREADS from core to nodes */}
      <g fill="none" stroke="url(#id-thread)" strokeWidth="1.4" opacity="0.85">
        {nodes.map((n, i) => {
          const d = `M380,380 Q ${(380 + n.x) / 2},${(380 + n.y) / 2 - 20} ${n.x},${n.y}`;
          return <path key={`t-${i}`} d={d} />;
        })}
      </g>

      {/* IDENTITY NODES */}
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.x} cy={n.y} r={n.r + 14} fill="url(#id-node)" opacity="0.7" />
          {n.type === "shield" ? (
            <>
              <path
                d={`M${n.x},${n.y - n.r + 4} L${n.x + n.r - 4},${n.y - n.r * 0.3} L${n.x + n.r - 8},${n.y + n.r - 6} Q${n.x},${n.y + n.r + 2} ${n.x - n.r + 8},${n.y + n.r - 6} L${n.x - n.r + 4},${n.y - n.r * 0.3} Z`}
                fill="none"
                stroke="oklch(0.72 0.14 200)"
                strokeWidth="1.1"
                opacity="0.9"
              />
              <circle cx={n.x} cy={n.y - n.r + 10} r="2.5" fill="oklch(0.92 0.10 200)" />
            </>
          ) : n.type === "hex" ? (
            <polygon
              points={`${n.x},${n.y - n.r} ${n.x + n.r * 0.87},${n.y - n.r * 0.5} ${n.x + n.r * 0.87},${n.y + n.r * 0.5} ${n.x},${n.y + n.r} ${n.x - n.r * 0.87},${n.y + n.r * 0.5} ${n.x - n.r * 0.87},${n.y - n.r * 0.5}`}
              fill="none"
              stroke="oklch(0.72 0.14 200)"
              strokeWidth="1"
              opacity="0.9"
            />
          ) : (
            <>
              <circle
                cx={n.x} cy={n.y} r={n.r}
                fill="none"
                stroke="oklch(0.72 0.14 200)"
                strokeWidth="1"
                opacity="0.95"
              />
              <circle cx={n.x} cy={n.y} r={n.r - 6} fill="none" stroke="oklch(0.62 0.16 200)" strokeWidth="0.5" opacity="0.65" />
              <circle cx={n.x} cy={n.y} r="3" fill="oklch(0.92 0.10 200)" />
            </>
          )}
          <text
            x={n.x} y={n.y + n.r + 16}
            textAnchor="middle"
            fontSize="8" letterSpacing="2.4"
            fill="oklch(0.85 0.08 200)" opacity="0.9"
            fontFamily="ui-sans-serif, system-ui"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* PROTECTION RING */}
      <ellipse cx="380" cy="450" rx="310" ry="340" fill="none" stroke="oklch(0.62 0.16 200)" strokeWidth="0.5" opacity="0.35" strokeDasharray="4 8" />
      <ellipse cx="380" cy="450" rx="270" ry="290" fill="none" stroke="oklch(0.78 0.12 200)" strokeWidth="0.4" opacity="0.25" strokeDasharray="2 6" />

      {/* PROTECTION LABEL */}
      <g>
        <line x1="100" y1="780" x2="660" y2="780" stroke="oklch(0.55 0.20 240)" strokeWidth="1" opacity="0.6" />
        <text
          x="380" y="800"
          textAnchor="middle"
          fontSize="8" letterSpacing="3.2"
          fill="oklch(0.78 0.10 200)" opacity="0.75"
          fontFamily="ui-sans-serif, system-ui"
        >
          PROTECTION · REGISTRATION · CONTINUITY
        </text>
      </g>

      {/* Pulses down the threads */}
      <g>
        {nodes.map((n, i) => {
          const d = `M380,380 Q ${(380 + n.x) / 2},${(380 + n.y) / 2 - 20} ${n.x},${n.y}`;
          return (
            <circle key={`p-${i}`} r="2" fill="oklch(0.92 0.10 200)">
              <animateMotion dur={`${5 + i}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;0" dur={`${5 + i}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
