// Conceptual transparent illustration for the Launch A Business hero.
// Narrative: an ambitious founder walking forward along an elegant elevated
// pathway. Behind them: fragmented uncertainty (scattered shards, broken grid).
// Beneath and ahead: architectural infrastructure emerging — foundations,
// blueprint geometry, structural ribs, support columns — resolving into a
// future destination of abstract premium GCC-inspired forms (arches, sails,
// portals) that read as opportunity, not skyline.
//
// Red Berry appears as the invisible infrastructure layer (warm berry/gold
// pathway + structural framework), never as a logo.

export function LaunchHeroArt() {
  return (
    <svg
      viewBox="0 0 720 900"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="A founder walking forward along an elevated pathway as fragmented uncertainty gives way to emerging architectural infrastructure and a luminous future destination."
    >
      <defs>
        <linearGradient id="lb-path" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
          <stop offset="20%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.55" />
          <stop offset="55%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lb-deck" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lb-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="lb-sail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
          <stop offset="45%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.55 0.16 245)" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="lb-glow-future">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lb-glow-past">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lb-node">
          <stop offset="0%" stopColor="oklch(0.88 0.12 70)" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lb-figure" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.05 70)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Ambient field glows */}
      <ellipse cx="120" cy="650" rx="220" ry="180" fill="url(#lb-glow-past)" />
      <ellipse cx="560" cy="360" rx="260" ry="240" fill="url(#lb-glow-future)" />

      {/* ===== LEFT: fragmented uncertainty (broken grid, drifting shards) ===== */}
      <g opacity="0.55">
        {/* Broken blueprint grid */}
        <g stroke="oklch(0.55 0.20 25)" strokeWidth="0.5" fill="none" opacity="0.35">
          <path d="M30,720 L130,720" />
          <path d="M50,690 L150,690" />
          <path d="M20,750 L110,750" />
          <path d="M70,780 L170,780" />
          <path d="M40,720 L40,790" />
          <path d="M90,700 L90,770" />
          <path d="M140,690 L140,760" />
        </g>
        {/* Drifting shards */}
        <g fill="oklch(0.55 0.20 25)" opacity="0.4">
          <path d="M40,640 l18,4 l-6,16 z" />
          <path d="M90,610 l22,6 l-8,18 z" />
          <path d="M150,650 l16,2 l-4,14 z" />
          <path d="M70,560 l20,4 l-6,14 z" />
          <path d="M170,580 l14,2 l-4,12 z" />
        </g>
        {/* Scattered dots — particulate uncertainty */}
        {Array.from({ length: 26 }).map((_, i) => {
          const seed = (i * 9973) % 1000;
          const x = 20 + ((seed * 13) % 200);
          const y = 520 + ((seed * 17) % 320);
          const r = 0.8 + ((seed % 22) / 18);
          return (
            <circle
              key={`shard-${i}`}
              cx={x}
              cy={y}
              r={r}
              fill="oklch(0.72 0.14 70)"
              opacity={0.18 + ((seed % 50) / 120)}
            />
          );
        })}
      </g>

      {/* ===== INFRASTRUCTURE LAYER — emerging beneath the path ===== */}
      {/* Foundation slabs (lower, repeating, gaining clarity rightward) */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.55" fill="none">
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 8;
          const x = 120 + i * 64;
          const y = 800 - t * 90;
          const w = 56 + t * 14;
          const h = 14 + t * 6;
          return (
            <rect
              key={`slab-${i}`}
              x={x}
              y={y}
              width={w}
              height={h}
              opacity={0.18 + t * 0.55}
            />
          );
        })}
      </g>

      {/* Support columns rising from foundations */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.55" opacity="0.5">
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 8;
          const x = 148 + i * 64;
          const top = 560 - t * 220;
          const bot = 800 - t * 90;
          return <line key={`col-${i}`} x1={x} y1={top} x2={x} y2={bot} opacity={0.25 + t * 0.6} />;
        })}
      </g>

      {/* Compliance lattice ribs beneath the deck */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.5" opacity="0.6">
        {Array.from({ length: 18 }).map((_, i) => {
          const t = i / 17;
          const x = 110 + t * 560;
          const yDeck = 600 - t * 240;
          const yBase = 760 - t * 180;
          return <line key={`rib-${i}`} x1={x} y1={yDeck} x2={x} y2={yBase} opacity={0.2 + t * 0.7} />;
        })}
      </g>

      {/* Blueprint horizon lines, low opacity */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.4" opacity="0.28" fill="none">
        <path d="M0,500 L720,420" />
        <path d="M0,560 L720,470" />
      </g>

      {/* ===== THE PATHWAY — elevated, rising from lower-left to upper-right ===== */}
      {/* Wider deck shadow / structural underline */}
      <path
        d="M70,640 C 260,540 480,460 720,380"
        fill="none"
        stroke="url(#lb-deck)"
        strokeWidth="6"
        opacity="0.6"
      />
      {/* Primary luminous walkway */}
      <path
        d="M70,628 C 260,528 480,448 720,368"
        fill="none"
        stroke="url(#lb-path)"
        strokeWidth="2.2"
      />
      {/* Outer glow trace */}
      <path
        d="M70,628 C 260,528 480,448 720,368"
        fill="none"
        stroke="oklch(0.78 0.12 70)"
        strokeWidth="0.6"
        opacity="0.55"
      />

      {/* Pathway plank ticks */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.6" opacity="0.55">
        {Array.from({ length: 26 }).map((_, i) => {
          const t = i / 25;
          const x = 70 + t * 650;
          const y = 628 - t * 260;
          return <line key={`tick-${i}`} x1={x - 3} y1={y + 5} x2={x + 3} y2={y - 5} />;
        })}
      </g>

      {/* Governance / opportunity nodes along the path */}
      {[
        { x: 200, y: 555 }, { x: 320, y: 500, r: 4 }, { x: 440, y: 455 },
        { x: 560, y: 410, r: 4 }, { x: 660, y: 380 },
      ].map((n, i) => (
        <g key={`pn-${i}`}>
          <circle cx={n.x} cy={n.y} r={(n.r ?? 3) + 7} fill="url(#lb-node)" opacity="0.65" />
          <circle cx={n.x} cy={n.y} r={n.r ?? 3} fill="oklch(0.88 0.12 70)" />
          <circle cx={n.x} cy={n.y} r={(n.r ?? 3) - 1.4} fill="oklch(1 0 0)" opacity="0.9" />
        </g>
      ))}

      {/* ===== THE FOUNDER — walking forward, mid-path ===== */}
      <g transform="translate(232 498)">
        {/* Subtle ground-shadow ellipse on the path */}
        <ellipse cx="0" cy="62" rx="22" ry="3" fill="oklch(0.55 0.20 25)" opacity="0.22" />
        {/* Head */}
        <circle cx="0" cy="-46" r="7.5" fill="url(#lb-figure)" />
        {/* Torso — slight forward lean, purposeful */}
        <path
          d="M-6,-38 C -10,-22 -10,-6 -6,8 L 6,8 C 10,-6 10,-22 6,-38 Z"
          fill="url(#lb-figure)"
          opacity="0.95"
        />
        {/* Forward arm reaching ahead */}
        <path
          d="M5,-30 C 14,-26 20,-18 22,-8"
          stroke="oklch(0.55 0.20 25)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        {/* Back arm */}
        <path
          d="M-5,-30 C -10,-22 -12,-12 -10,-2"
          stroke="oklch(0.55 0.20 25)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        {/* Forward leg — stepping ahead onto the next plank */}
        <path
          d="M3,8 C 8,22 14,34 18,46"
          stroke="oklch(0.55 0.20 25)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Trailing leg */}
        <path
          d="M-3,8 C -6,22 -10,36 -12,52"
          stroke="oklch(0.55 0.20 25)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        {/* Aura of light around the figure — infrastructure presence */}
        <circle cx="0" cy="-20" r="34" fill="url(#lb-glow-future)" opacity="0.5" />
      </g>

      {/* ===== FUTURE DESTINATION — abstract GCC-inspired architectural forms ===== */}
      <g>
        {/* Central pointed arch (modern mashrabiya / portal) */}
        <path
          d="M540,360 C 540,260 620,260 620,360 L620,420 L540,420 Z"
          fill="none"
          stroke="url(#lb-arch)"
          strokeWidth="1.2"
          opacity="0.9"
        />
        {/* Inner sub-arch */}
        <path
          d="M555,360 C 555,278 605,278 605,360 L605,420 L555,420 Z"
          fill="none"
          stroke="oklch(0.78 0.12 70)"
          strokeWidth="0.6"
          opacity="0.6"
        />
        {/* Triple slim arches — interconnected gateways */}
        <g stroke="url(#lb-arch)" strokeWidth="0.9" fill="none" opacity="0.7">
          <path d="M470,400 C 470,330 510,330 510,400 L510,440 L470,440 Z" />
          <path d="M640,400 C 640,330 680,330 680,400 L680,440 L640,440 Z" />
        </g>

        {/* Sail-shaped form — referencing modern GCC architecture without cliché */}
        <path
          d="M430,440 C 460,360 500,290 510,200 L514,440 Z"
          fill="url(#lb-sail)"
          opacity="0.55"
        />
        <path
          d="M430,440 C 460,360 500,290 510,200"
          fill="none"
          stroke="oklch(0.55 0.16 245)"
          strokeWidth="0.7"
          opacity="0.7"
        />

        {/* Vertical luminous lines — expansion corridors */}
        <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.6" opacity="0.45">
          <line x1="582" y1="180" x2="582" y2="360" />
          <line x1="600" y1="220" x2="600" y2="360" />
          <line x1="566" y1="240" x2="566" y2="360" />
        </g>

        {/* Floating geometric platforms — opportunity layers */}
        <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.55" fill="none">
          <path d="M480,250 L540,232 L600,250 L540,268 Z" />
          <path d="M500,200 L548,186 L596,200 L548,214 Z" />
          <path d="M514,160 L552,148 L590,160 L552,172 Z" />
        </g>

        {/* Apex point — the destination spark */}
        <circle cx="552" cy="140" r="3" fill="oklch(0.92 0.12 70)" />
        <circle cx="552" cy="140" r="10" fill="url(#lb-node)" opacity="0.7" />
      </g>

      {/* ===== TOP CANOPY — emerging blueprint of the future ===== */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.45" opacity="0.32" fill="none">
        <path d="M260,90 L520,80 L600,110" />
        <path d="M300,140 L580,130" />
        <rect x="320" y="60" width="40" height="26" />
        <rect x="400" y="80" width="34" height="22" />
        <rect x="460" y="58" width="30" height="30" />
      </g>

      {/* Faint floating intelligence nodes above the journey */}
      {[
        { x: 280, y: 160 }, { x: 380, y: 200 }, { x: 480, y: 150 },
        { x: 200, y: 260 }, { x: 600, y: 240 },
      ].map((n, i) => (
        <g key={`fn-${i}`} opacity="0.5">
          <circle cx={n.x} cy={n.y} r="7" fill="url(#lb-node)" />
          <circle cx={n.x} cy={n.y} r="1.6" fill="oklch(0.88 0.12 70)" />
        </g>
      ))}

      {/* Motion pulses traveling forward along the path */}
      <g>
        <circle r="2.4" fill="oklch(0.88 0.12 70)">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M70,628 C 260,528 480,448 720,368"
          />
          <animate attributeName="opacity" values="0;1;0" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle r="1.8" fill="oklch(0.55 0.20 25)">
          <animateMotion
            dur="9s"
            begin="2s"
            repeatCount="indefinite"
            path="M70,628 C 260,528 480,448 720,368"
          />
          <animate attributeName="opacity" values="0;1;0" dur="9s" begin="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
