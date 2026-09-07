// Conceptual transparent illustration for the Create Family Security hero.
// Narrative: a family moving confidently along a structured pathway toward
// a future built on opportunity. A protective canopy spans above; foundation
// platforms support every step; warm berry/azure connective tissue ties a
// stable home base to a horizon of education, mobility, opportunity, and
// long term stability. No visas. No passports. No government symbols.

export function FamilyHeroArt() {
  const horizons = [
    { x: 170, y: 250, r: 22, label: "STABILITY" },
    { x: 380, y: 200, r: 26, label: "OPPORTUNITY", primary: true },
    { x: 590, y: 250, r: 22, label: "MOBILITY" },
    { x: 140, y: 430, r: 18, label: "EDUCATION" },
    { x: 620, y: 430, r: 18, label: "GLOBAL ACCESS" },
    { x: 380, y: 480, r: 20, label: "BELONGING" },
  ];

  const steps = [
    { x: 230, y: 760, label: "TODAY" },
    { x: 380, y: 800, label: "FUTURE" },
    { x: 530, y: 760, label: "GENERATIONS" },
  ];

  return (
    <svg
      viewBox="0 0 760 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A family moving confidently along a structured pathway toward a future of stability, opportunity, mobility, education, and global access — supported by infrastructure beneath the journey."
    >
      <defs>
        <radialGradient id="f-core">
          <stop offset="0%" stopColor="oklch(0.94 0.08 70)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="f-node">
          <stop offset="0%" stopColor="oklch(0.94 0.08 70)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="f-thread" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="f-field">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="f-platform" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ambient protective field */}
      <ellipse cx="380" cy="430" rx="360" ry="380" fill="url(#f-field)" />

      {/* Protective canopy — security overhead */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.35" fill="none">
        <path d="M40,140 Q 380,40 720,140" />
        <path d="M80,180 Q 380,90 680,180" opacity="0.7" />
        <path d="M120,220 Q 380,140 640,220" opacity="0.5" />
        <path d="M150,160 L150,520" opacity="0.35" />
        <path d="M380,80 L380,500" opacity="0.5" />
        <path d="M610,160 L610,520" opacity="0.35" />
      </g>

      {/* Canopy keystones */}
      <g opacity="0.7">
        {[150, 380, 610].map((cx, i) => (
          <g key={`k-${i}`}>
            <circle cx={cx} cy={i === 1 ? 80 : 160} r="3" fill="oklch(0.94 0.08 70)" />
            <circle cx={cx} cy={i === 1 ? 80 : 160} r="8" fill="none" stroke="oklch(0.78 0.12 70)" strokeWidth="0.5" />
          </g>
        ))}
      </g>

      {/* ===== HOME BASE — the family's secure foundation ===== */}
      <g transform="translate(380 600)">
        {/* Foundation slab */}
        <ellipse cx="0" cy="40" rx="160" ry="14" fill="url(#f-platform)" opacity="0.7" />
        <ellipse cx="0" cy="48" rx="120" ry="6" fill="none" stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.5" />

        {/* Home structure — abstract */}
        <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.9" fill="none" opacity="0.85">
          <path d="M -38 20 L -38 -10 L 0 -34 L 38 -10 L 38 20 Z" />
          <path d="M -28 20 L -28 0 L 28 0 L 28 20" opacity="0.6" />
        </g>
        <circle r="3" fill="oklch(0.55 0.20 25)" opacity="0.9" />

        {/* Family silhouettes — three abstract figures, walking forward */}
        <g fill="oklch(0.94 0.08 70)" opacity="0.9">
          <g transform="translate(-22 14)">
            <circle r="3.5" cy="-12" />
            <path d="M -3.5 -8 L -3.5 6 L 0 14 L 3.5 6 L 3.5 -8 Z" />
          </g>
          <g transform="translate(0 14)">
            <circle r="4" cy="-14" />
            <path d="M -4 -10 L -4 8 L 0 16 L 4 8 L 4 -10 Z" />
          </g>
          <g transform="translate(20 14)">
            <circle r="3" cy="-10" />
            <path d="M -3 -7 L -3 4 L 0 12 L 3 4 L 3 -7 Z" />
          </g>
        </g>
      </g>

      {/* ===== HORIZONS — what the family is building toward ===== */}
      <g fill="none">
        {horizons.map((h, i) => {
          const cx = 380, cy = 600;
          const mx = (cx + h.x) / 2;
          const my = (cy + h.y) / 2 - 40;
          const d = `M${cx},${cy - 30} Q ${mx},${my} ${h.x},${h.y}`;
          return (
            <g key={`thread-${i}`}>
              <path d={d} stroke="url(#f-thread)" strokeWidth="1.4" opacity="0.85" />
              <path d={d} stroke="oklch(0.78 0.12 70)" strokeWidth="0.4" opacity="0.5" strokeDasharray="2 5" />
            </g>
          );
        })}
      </g>

      {horizons.map((h, i) => (
        <g key={`h-${i}`}>
          <ellipse cx={h.x} cy={h.y + h.r + 18} rx={h.r + 22} ry="7" fill="url(#f-platform)" opacity="0.55" />
          <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.45" fill="none">
            <ellipse cx={h.x} cy={h.y + h.r + 22} rx={h.r + 14} ry="3.5" />
            <ellipse cx={h.x} cy={h.y + h.r + 30} rx={h.r + 8} ry="2.5" opacity="0.7" />
          </g>
          <circle cx={h.x} cy={h.y} r={h.r + 14} fill="url(#f-node)" opacity="0.7" />
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

      {/* Horizon ring — interconnected opportunity */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.55" opacity="0.4" fill="none">
        <path d="M170,250 C 270,180 490,180 590,250" />
        <path d="M140,430 C 200,520 320,540 380,480" />
        <path d="M620,430 C 560,520 440,540 380,480" />
      </g>

      {/* ===== PATHWAY — today to future to generations ===== */}
      <g>
        <path
          d="M230,760 Q 380,820 530,760"
          fill="none"
          stroke="oklch(0.55 0.20 25)"
          strokeWidth="1.4"
          opacity="0.7"
        />
        <path
          d="M230,760 Q 380,820 530,760"
          fill="none"
          stroke="oklch(0.78 0.12 70)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          opacity="0.6"
        />
        {steps.map((s, i) => (
          <g key={`step-${i}`}>
            <circle cx={s.x} cy={s.y} r="9" fill="none" stroke="oklch(0.72 0.14 70)" strokeWidth="0.8" opacity="0.85" />
            <circle cx={s.x} cy={s.y} r="3.2" fill="oklch(0.94 0.08 70)" />
            <text
              x={s.x} y={s.y + 22}
              textAnchor="middle"
              fontSize="7.5" letterSpacing="2"
              fill="oklch(0.86 0.08 70)" opacity="0.85"
              fontFamily="ui-sans-serif, system-ui"
            >
              {s.label}
            </text>
          </g>
        ))}
        <text
          x="380" y="720"
          textAnchor="middle"
          fontSize="8" letterSpacing="3.2"
          fill="oklch(0.78 0.10 70)" opacity="0.7"
          fontFamily="ui-sans-serif, system-ui"
        >
          CONTINUITY
        </text>
      </g>

      {/* Floating motes — confidence signals */}
      {[
        { x: 90, y: 320 }, { x: 680, y: 320 }, { x: 380, y: 130 },
        { x: 110, y: 540 }, { x: 660, y: 540 },
      ].map((n, i) => (
        <g key={`m-${i}`} opacity="0.55">
          <circle cx={n.x} cy={n.y} r="5" fill="url(#f-node)" />
          <circle cx={n.x} cy={n.y} r="1.4" fill="oklch(0.94 0.08 70)" />
        </g>
      ))}

      {/* Motion pulses — family progress toward horizons */}
      <g>
        {horizons.slice(0, 4).map((h, i) => {
          const cx = 380, cy = 600;
          const mx = (cx + h.x) / 2;
          const my = (cy + h.y) / 2 - 40;
          const d = `M${cx},${cy - 30} Q ${mx},${my} ${h.x},${h.y}`;
          return (
            <circle key={`p-${i}`} r="2" fill="oklch(0.94 0.08 70)">
              <animateMotion dur={`${7 + i}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;0" dur={`${7 + i}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
