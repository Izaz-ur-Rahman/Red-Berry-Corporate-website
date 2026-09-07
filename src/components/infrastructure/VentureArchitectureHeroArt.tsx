// Conceptual illustration for the Venture Architecture hero.
// Narrative: a hospitality ecosystem — venue, experience, brand,
// operations, and guest flow — all connected through a central
// operational spine, with flowing pathways between concept and reality.

export function VentureArchitectureHeroArt() {
  const venues = [
    { x: 180, y: 260, r: 30, label: "VENUE", type: "hotel" },
    { x: 580, y: 260, r: 30, label: "F&B", type: "dining" },
    { x: 120, y: 480, r: 26, label: "EXPERIENCE", type: "circle" },
    { x: 640, y: 480, r: 26, label: "BRAND", type: "circle" },
  ];
  const operations = [
    { x: 230, y: 660, r: 20, label: "OPS" },
    { x: 380, y: 660, r: 20, label: "LICENSE" },
    { x: 530, y: 660, r: 20, label: "STAFF" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A hospitality ecosystem showing venue, F&B, experience, and brand nodes orbiting a central operational spine, connected by flowing pathways from concept to reality."
    >
      <defs>
        <radialGradient id="va-core">
          <stop offset="0%" stopColor="oklch(0.92 0.10 70)" stopOpacity="0.95" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="va-node">
          <stop offset="0%" stopColor="oklch(0.92 0.10 70)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="va-thread" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="va-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="380" cy="450" rx="360" ry="380" fill="url(#va-field)" />

      {/* CENTRAL OPERATIONAL SPINE */}
      <g transform="translate(380 420)">
        <circle r="50" fill="url(#va-core)" opacity="0.85" />
        {/* Building silhouette */}
        <rect x="-18" y="-22" width="36" height="44" rx="3" fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="1.2" opacity="0.85" />
        <rect x="-10" y="-14" width="8" height="8" rx="1" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
        <rect x="2" y="-14" width="8" height="8" rx="1" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
        <rect x="-10" y="-2" width="8" height="8" rx="1" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
        <rect x="2" y="-2" width="8" height="8" rx="1" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
        <circle cx="0" cy="12" r="4" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
        {/* Core dot */}
        <circle r="5" fill="oklch(0.55 0.20 25)" opacity="0.95" />
        <circle r="2" fill="oklch(0.96 0.06 70)" />
        <text
          x="0" y="72"
          textAnchor="middle"
          fontSize="9" letterSpacing="3"
          fill="oklch(0.85 0.08 70)" opacity="0.9"
          fontFamily="ui-sans-serif, system-ui"
        >
          OPERATIONAL SPINE
        </text>
      </g>

      {/* FLOW THREADS from core to venues */}
      <g fill="none" stroke="url(#va-thread)" strokeWidth="1.4" opacity="0.85">
        {venues.map((v, i) => {
          const d = `M380,420 Q ${(380 + v.x) / 2},${(420 + v.y) / 2 - 20} ${v.x},${v.y}`;
          return <path key={`vt-${i}`} d={d} />;
        })}
      </g>

      {/* VENUE NODES */}
      {venues.map((v, i) => (
        <g key={`v-${i}`}>
          <circle cx={v.x} cy={v.y} r={v.r + 14} fill="url(#va-node)" opacity="0.7" />
          {v.type === "hotel" ? (
            <>
              <rect x={v.x - v.r + 6} y={v.y - v.r * 0.6} width={(v.r - 6) * 2} height={v.r * 1.2} rx="3" fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="1" opacity="0.9" />
              <line x1={v.x - v.r * 0.3} y1={v.y - v.r * 0.6} x2={v.x - v.r * 0.3} y2={v.y + v.r * 0.6} stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" opacity="0.6" />
              <line x1={v.x + v.r * 0.3} y1={v.y - v.r * 0.6} x2={v.x + v.r * 0.3} y2={v.y + v.r * 0.6} stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" opacity="0.6" />
              <circle cx={v.x} cy={v.y - v.r * 0.2} r="2.5" fill="oklch(0.92 0.10 70)" />
            </>
          ) : v.type === "dining" ? (
            <>
              <path d={`M${v.x - v.r + 6},${v.y + v.r * 0.4} L${v.x},${v.y - v.r + 6} L${v.x + v.r - 6},${v.y + v.r * 0.4} Z`} fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="1" opacity="0.9" />
              <line x1={v.x} y1={v.y + v.r * 0.4} x2={v.x} y2={v.y - v.r * 0.15} stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
              <circle cx={v.x} cy={v.y - v.r * 0.25} r="2.5" fill="oklch(0.92 0.10 70)" />
            </>
          ) : (
            <>
              <circle cx={v.x} cy={v.y} r={v.r} fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="1" opacity="0.95" />
              <circle cx={v.x} cy={v.y} r={v.r - 6} fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.65" />
              <circle cx={v.x} cy={v.y} r="3" fill="oklch(0.92 0.10 70)" />
            </>
          )}
          <text
            x={v.x} y={v.y + v.r + 16}
            textAnchor="middle"
            fontSize="8" letterSpacing="2.4"
            fill="oklch(0.85 0.08 70)" opacity="0.9"
            fontFamily="ui-sans-serif, system-ui"
          >
            {v.label}
          </text>
        </g>
      ))}

      {/* THREADS from venues to operations */}
      <g fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.7" opacity="0.55" strokeDasharray="2 4">
        {operations.map((o, i) => {
          const venue = venues[Math.min(Math.floor((i + 0.5) * venues.length / operations.length), venues.length - 1)];
          return <path key={`ot-${i}`} d={`M${venue.x},${venue.y + venue.r} Q ${(venue.x + o.x) / 2},${(venue.y + o.y) / 2} ${o.x},${o.y - o.r}`} />;
        })}
      </g>

      {/* OPERATIONS LAYER */}
      {operations.map((o, i) => (
        <g key={`op-${i}`}>
          <circle cx={o.x} cy={o.y} r={o.r + 8} fill="url(#va-node)" opacity="0.55" />
          <circle cx={o.x} cy={o.y} r={o.r} fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="0.85" opacity="0.9" />
          <circle cx={o.x} cy={o.y} r="3" fill="oklch(0.92 0.10 70)" />
          <text
            x={o.x} y={o.y + o.r + 12}
            textAnchor="middle"
            fontSize="7.5" letterSpacing="2"
            fill="oklch(0.85 0.08 70)" opacity="0.85"
            fontFamily="ui-sans-serif, system-ui"
          >
            {o.label}
          </text>
        </g>
      ))}

      {/* GUEST FLOW ARC */}
      <path
        d="M80,200 Q380,120 680,200"
        fill="none"
        stroke="oklch(0.55 0.20 25)"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="4 8"
      />
      <text
        x="380" y="155"
        textAnchor="middle"
        fontSize="8" letterSpacing="3.2"
        fill="oklch(0.78 0.10 70)" opacity="0.75"
        fontFamily="ui-sans-serif, system-ui"
      >
        CONCEPT · DESIGN · OPERATE · SCALE
      </text>

      {/* FOUNDATION LINE */}
      <g>
        <line x1="100" y1="780" x2="660" y2="780" stroke="oklch(0.55 0.20 25)" strokeWidth="1" opacity="0.6" />
        <text
          x="380" y="800"
          textAnchor="middle"
          fontSize="8" letterSpacing="3.2"
          fill="oklch(0.78 0.10 70)" opacity="0.75"
          fontFamily="ui-sans-serif, system-ui"
        >
          GUEST EXPERIENCE · REGULATORY COMPLIANCE · RETURNS
        </text>
      </g>

      {/* Pulses down the venue threads */}
      <g>
        {venues.map((v, i) => {
          const d = `M380,420 Q ${(380 + v.x) / 2},${(420 + v.y) / 2 - 20} ${v.x},${v.y}`;
          return (
            <circle key={`p-${i}`} r="2" fill="oklch(0.92 0.10 70)">
              <animateMotion dur={`${5 + i}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;0" dur={`${5 + i}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
