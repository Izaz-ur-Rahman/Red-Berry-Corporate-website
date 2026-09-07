// Conceptual transparent illustration for the Legacy & Life Architecture hero.
// Narrative: a generational tree rising from a quiet root, with branches that
// carry continuity nodes — values, governance, succession, philanthropy.
// A horizon line below suggests time, and three soft arcs above suggest
// the chapters that follow the founder. No people. No portraits. Only
// continuity, structure, and the long view.

export function LegacyLifeHeroArt() {
  const branches = [
    { x: 230, y: 200, r: 22, label: "VALUES" },
    { x: 530, y: 200, r: 22, label: "GOVERNANCE" },
    { x: 140, y: 340, r: 20, label: "SUCCESSION" },
    { x: 620, y: 340, r: 20, label: "PHILANTHROPY" },
    { x: 290, y: 460, r: 18, label: "TRUSTS" },
    { x: 470, y: 460, r: 18, label: "STEWARDSHIP" },
    { x: 380, y: 140, r: 24, label: "LEGACY", primary: true },
  ];

  const chapters = [
    { x: 380, y: 720, label: "FOUNDER" },
    { x: 380, y: 760, label: "SECOND" },
    { x: 380, y: 800, label: "THIRD GENERATION" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A generational tree rising from a quiet root, with branches carrying values, governance, succession, and philanthropy across the chapters that follow the founder."
    >
      <defs>
        <radialGradient id="ll-core">
          <stop offset="0%" stopColor="oklch(0.94 0.06 70)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ll-node">
          <stop offset="0%" stopColor="oklch(0.94 0.06 70)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ll-branch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.65" />
        </linearGradient>
        <radialGradient id="ll-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ll-root" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ambient field */}
      <ellipse cx="380" cy="400" rx="370" ry="380" fill="url(#ll-field)" />

      {/* Generational arcs above — chapters of the family */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.6" fill="none" opacity="0.45">
        <path d="M 100 240 Q 380 60 660 240" />
        <path d="M 140 300 Q 380 140 620 300" opacity="0.7" />
        <path d="M 180 360 Q 380 220 580 360" opacity="0.5" />
      </g>

      {/* Trunk — the spine that holds it all */}
      <g>
        <line x1="380" y1="170" x2="380" y2="640" stroke="url(#ll-branch)" strokeWidth="2.2" opacity="0.85" />
        <line x1="380" y1="170" x2="380" y2="640" stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" opacity="0.6" strokeDasharray="3 6" />
      </g>

      {/* Branches from trunk to each continuity node */}
      <g fill="none">
        {branches.filter((b) => !b.primary).map((b, i) => {
          const tx = 380;
          const ty = b.y;
          const mx = (tx + b.x) / 2;
          const my = ty - 20;
          const d = `M${tx},${ty} Q ${mx},${my} ${b.x},${b.y}`;
          return (
            <g key={`br-${i}`}>
              <path d={d} stroke="url(#ll-branch)" strokeWidth="1.3" opacity="0.8" />
              <path d={d} stroke="oklch(0.78 0.12 70)" strokeWidth="0.4" opacity="0.45" strokeDasharray="2 4" />
            </g>
          );
        })}
      </g>

      {/* Continuity nodes */}
      {branches.map((b, i) => (
        <g key={`n-${i}`}>
          <circle cx={b.x} cy={b.y} r={b.r + 14} fill="url(#ll-node)" opacity="0.7" />
          <circle
            cx={b.x} cy={b.y} r={b.r}
            fill="none"
            stroke={b.primary ? "oklch(0.55 0.20 25)" : "oklch(0.72 0.14 70)"}
            strokeWidth={b.primary ? 1.3 : 0.9}
            opacity="0.95"
          />
          <circle cx={b.x} cy={b.y} r={b.r - 7} fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.7" />
          <circle cx={b.x} cy={b.y} r={b.primary ? 5 : 3.5} fill="oklch(0.94 0.06 70)" />
          <text
            x={b.x} y={b.y + b.r + 12}
            textAnchor="middle"
            fontSize="8" letterSpacing="2.2"
            fill="oklch(0.86 0.08 70)" opacity="0.9"
            fontFamily="ui-sans-serif, system-ui"
          >
            {b.label}
          </text>
        </g>
      ))}

      {/* ===== CENTER MOTIF — quiet founder seed ===== */}
      <g transform="translate(380 410)">
        <circle r="46" fill="url(#ll-core)" opacity="0.95" />
        <circle r="30" fill="none" stroke="oklch(0.55 0.20 25)" strokeWidth="1" opacity="0.85" />
        <circle r="22" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7" />
        {/* Hourglass / continuity motif */}
        <g stroke="oklch(0.94 0.06 70)" strokeWidth="1.2" fill="none" opacity="0.9">
          <path d="M -10 -12 L 10 -12 L -10 12 L 10 12 Z" />
          <line x1="-12" y1="-12" x2="12" y2="-12" />
          <line x1="-12" y1="12" x2="12" y2="12" />
        </g>
      </g>

      {/* ===== ROOTS — what the family is grounded in ===== */}
      <g transform="translate(380 660)">
        <ellipse cx="0" cy="20" rx="220" ry="16" fill="url(#ll-root)" opacity="0.75" />
        <ellipse cx="0" cy="28" rx="170" ry="7" fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.5" />
        <ellipse cx="0" cy="34" rx="120" ry="4" fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.45" />
        <text
          x="0" y="0"
          textAnchor="middle"
          fontSize="9" letterSpacing="4"
          fill="oklch(0.86 0.08 70)" opacity="0.9"
          fontFamily="ui-sans-serif, system-ui"
        >
          FAMILY CONSTITUTION
        </text>
        <line x1="-110" y1="6" x2="-30" y2="6" stroke="oklch(0.72 0.14 70)" strokeWidth="0.4" opacity="0.6" />
        <line x1="30" y1="6" x2="110" y2="6" stroke="oklch(0.72 0.14 70)" strokeWidth="0.4" opacity="0.6" />
      </g>

      {/* Chapters timeline */}
      <g>
        {chapters.map((s, i) => (
          <g key={`c-${i}`} opacity={0.85 - i * 0.18}>
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

      {/* Floating motes — generational signals */}
      {[
        { x: 80, y: 260 }, { x: 700, y: 260 }, { x: 380, y: 70 },
        { x: 90, y: 540 }, { x: 680, y: 540 }, { x: 380, y: 870 },
      ].map((n, i) => (
        <g key={`m-${i}`} opacity="0.55">
          <circle cx={n.x} cy={n.y} r="5" fill="url(#ll-node)" />
          <circle cx={n.x} cy={n.y} r="1.4" fill="oklch(0.94 0.06 70)" />
        </g>
      ))}

      {/* Motion pulses — values flowing up the branches */}
      <g>
        {branches.filter((b) => !b.primary).slice(0, 5).map((b, i) => {
          const tx = 380, ty = b.y;
          const mx = (tx + b.x) / 2;
          const my = ty - 20;
          const d = `M${tx},${ty} Q ${mx},${my} ${b.x},${b.y}`;
          return (
            <circle key={`p-${i}`} r="2" fill="oklch(0.94 0.06 70)">
              <animateMotion dur={`${7 + i}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;0" dur={`${7 + i}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
