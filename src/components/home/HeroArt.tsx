// Native SVG hero illustration — fully transparent, portrait composition
// designed to fill the right column vertically alongside the headline.
// Concept: Red Berry "Ambition Infrastructure" — desert uncertainty (top-left)
// resolves through a luminous infrastructure bridge into a tall Gulf skyline.

export function HeroArt() {
  return (
    <svg
      viewBox="0 0 720 1040"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="Red Berry Ambition Infrastructure — desert uncertainty transforms through a luminous bridge of compliance, financial and governance pathways into a confident Gulf skyline."
    >
      <defs>
        <linearGradient id="ha-deck" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
          <stop offset="22%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.6" />
          <stop offset="55%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ha-gold" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.78 0.12 70)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ha-azure" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.55 0.16 245)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ha-spire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0" />
          <stop offset="35%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="ha-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
          <stop offset="40%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.55 0.16 245)" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="ha-node">
          <stop offset="0%" stopColor="oklch(0.88 0.12 70)" />
          <stop offset="60%" stopColor="oklch(0.72 0.14 70)" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ha-glow">
          <stop offset="0%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 70)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ha-glow2">
          <stop offset="0%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glows — anchor top and bottom of composition */}
      <ellipse cx="500" cy="200" rx="280" ry="220" fill="url(#ha-glow2)" />
      <ellipse cx="380" cy="780" rx="360" ry="160" fill="url(#ha-glow)" />

      {/* ===== TOP: ascending blueprint framework + floating company blocks ===== */}
      <g opacity="0.55" stroke="oklch(0.55 0.20 25)" strokeWidth="0.7" fill="none">
        <rect x="120" y="90" width="60" height="40" />
        <rect x="210" y="60" width="44" height="44" />
        <rect x="290" y="110" width="70" height="30" />
        <rect x="400" y="70" width="36" height="50" />
        <path d="M180,110 L210,82" />
        <path d="M254,82 L290,125" />
        <path d="M360,125 L400,95" />
      </g>

      {/* Vertical blueprint columns rising from bridge to top */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.32" fill="none">
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 140 + i * 60;
          const top = 140 + (i % 2) * 30;
          return <line key={`vc-${i}`} x1={x} y1={top} x2={x} y2={520} />;
        })}
        <path d="M140,180 L680,180" />
        <path d="M180,250 L660,250" />
        <path d="M160,330 L670,330" />
      </g>

      {/* Floating governance nodes scattered above bridge */}
      {[
        { x: 160, y: 200 }, { x: 280, y: 160 }, { x: 360, y: 240 },
        { x: 460, y: 180 }, { x: 540, y: 260 }, { x: 620, y: 200 },
        { x: 220, y: 320 }, { x: 420, y: 340 }, { x: 580, y: 360 },
      ].map((n, i) => (
        <g key={`tn-${i}`}>
          <circle cx={n.x} cy={n.y} r="9" fill="url(#ha-node)" opacity="0.5" />
          <circle cx={n.x} cy={n.y} r="2.4" fill="oklch(0.78 0.12 70)" />
        </g>
      ))}

      {/* ===== LEFT: dissolving desert / uncertainty ===== */}
      <g>
        {Array.from({ length: 38 }).map((_, i) => {
          const x = 10 + Math.random() * 220;
          const y = 480 + Math.random() * 380;
          const s = 1 + Math.random() * 2.4;
          return (
            <circle
              key={`d-${i}`}
              cx={x}
              cy={y}
              r={s}
              fill="oklch(0.72 0.14 70)"
              opacity={0.12 + Math.random() * 0.45}
            />
          );
        })}
        <path
          d="M0,760 Q70,720 150,740 T300,750 L300,860 L0,860 Z"
          fill="oklch(0.72 0.14 70)"
          opacity="0.12"
        />
        <path
          d="M0,800 Q90,775 180,790 T320,798 L320,880 L0,880 Z"
          fill="oklch(0.55 0.20 25)"
          opacity="0.08"
        />
        <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.8" fill="none" opacity="0.35">
          <rect x="50" y="540" width="40" height="28" />
          <rect x="105" y="580" width="22" height="22" />
          <path d="M30,610 L80,610 M60,590 L60,630" />
          <path d="M140,540 L180,540 L180,562" />
        </g>
      </g>

      {/* ===== BRIDGE — diagonal, rising from lower-left to upper-right ===== */}
      <path
        d="M80,760 C 260,640 460,560 700,500"
        fill="none"
        stroke="url(#ha-azure)"
        strokeWidth="1.4"
        opacity="0.75"
      />
      <path
        d="M60,720 C 260,600 480,520 720,460"
        fill="none"
        stroke="url(#ha-deck)"
        strokeWidth="3"
      />
      <path
        d="M80,700 C 280,585 480,510 720,448"
        fill="none"
        stroke="url(#ha-gold)"
        strokeWidth="1.2"
      />

      {/* Suspension ribs along the bridge */}
      <g stroke="oklch(0.72 0.14 70)" strokeWidth="0.6" opacity="0.55">
        {Array.from({ length: 22 }).map((_, i) => {
          const t = i / 21;
          const x = 80 + t * 640;
          const yDeck = 720 - t * 270;
          const yBase = 780 - t * 230;
          return <line key={`rib-${i}`} x1={x} y1={yDeck} x2={x} y2={yBase} />;
        })}
      </g>

      {/* Compliance lattice / reflection beneath the bridge */}
      <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.4" opacity="0.28" fill="none">
        <path d="M100,780 C 280,680 480,610 720,560" />
        <path d="M120,820 C 290,720 480,650 720,600" />
        <path d="M140,860 C 300,760 480,690 720,640" />
        {Array.from({ length: 18 }).map((_, i) => {
          const t = i / 17;
          const x = 100 + t * 620;
          const y1 = 720 - t * 250;
          const y2 = y1 + 90 + t * 20;
          return <line key={`lat-${i}`} x1={x} y1={y1} x2={x + 14} y2={y2} />;
        })}
      </g>

      {/* Governance nodes along bridge deck */}
      {[
        { x: 130, y: 690 }, { x: 230, y: 660, r: 4 }, { x: 330, y: 620 },
        { x: 430, y: 580, r: 4 }, { x: 530, y: 540 }, { x: 630, y: 500 },
        { x: 700, y: 470, r: 4 },
      ].map((n, i) => (
        <g key={`bn-${i}`}>
          <circle cx={n.x} cy={n.y} r={(n.r ?? 3) + 7} fill="url(#ha-node)" opacity="0.6" />
          <circle cx={n.x} cy={n.y} r={n.r ?? 3} fill="oklch(0.78 0.12 70)" />
          <circle cx={n.x} cy={n.y} r={(n.r ?? 3) - 1.4} fill="oklch(1 0 0)" opacity="0.9" />
        </g>
      ))}

      {/* ===== RIGHT: tall Gulf skyline rising from end of bridge ===== */}
      <g>
        {/* Burj-like central spire — tall */}
        <path
          d="M500,520 L516,80 L532,520 Z"
          fill="url(#ha-spire)"
          opacity="0.85"
        />
        <g stroke="oklch(0.78 0.12 70)" strokeWidth="0.6" opacity="0.7">
          <line x1="510" y1="140" x2="522" y2="140" />
          <line x1="510" y1="200" x2="522" y2="200" />
          <line x1="508" y1="260" x2="524" y2="260" />
          <line x1="508" y1="320" x2="524" y2="320" />
          <line x1="506" y1="380" x2="526" y2="380" />
          <line x1="506" y1="440" x2="526" y2="440" />
        </g>

        {/* Sail-shaped tower */}
        <path
          d="M420,540 C 440,440 470,340 480,200 L484,540 Z"
          fill="url(#ha-tower)"
          opacity="0.75"
        />
        <path
          d="M420,540 C 440,440 470,340 480,200"
          fill="none"
          stroke="oklch(0.55 0.16 245)"
          strokeWidth="0.8"
          opacity="0.7"
        />

        {/* Twin pencil spires */}
        <path d="M560,520 L568,220 L576,520 Z" fill="url(#ha-spire)" opacity="0.7" />
        <path d="M590,520 L598,260 L606,520 Z" fill="url(#ha-tower)" opacity="0.7" />
        <path d="M620,520 L626,180 L632,520 Z" fill="url(#ha-spire)" opacity="0.6" />
        <path d="M650,520 L656,300 L662,520 Z" fill="url(#ha-tower)" opacity="0.55" />
        <path d="M680,520 L685,240 L690,520 Z" fill="url(#ha-spire)" opacity="0.55" />

        {/* Dome */}
        <path
          d="M380,520 C 380,478 440,478 440,520"
          fill="none"
          stroke="oklch(0.72 0.14 70)"
          strokeWidth="1"
          opacity="0.85"
        />
        <line x1="410" y1="478" x2="410" y2="458" stroke="oklch(0.72 0.14 70)" strokeWidth="1" />
        <circle cx="410" cy="456" r="2.4" fill="oklch(0.72 0.14 70)" />

        {/* Subtle structural columns inside skyline */}
        <g stroke="oklch(0.62 0.16 240)" strokeWidth="0.5" opacity="0.35">
          <line x1="470" y1="540" x2="470" y2="320" />
          <line x1="548" y1="540" x2="548" y2="380" />
          <line x1="670" y1="540" x2="670" y2="360" />
        </g>
      </g>

      {/* Horizon baseline — ultra subtle */}
      <line
        x1="220"
        y1="540"
        x2="710"
        y2="540"
        stroke="oklch(0.62 0.16 240)"
        strokeOpacity="0.22"
        strokeWidth="0.6"
      />

      {/* Motion pulses traveling across bridge */}
      <g>
        <circle r="2.4" fill="oklch(0.78 0.12 70)">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M60,720 C 260,600 480,520 720,460"
          />
          <animate attributeName="opacity" values="0;1;0" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle r="1.8" fill="oklch(0.55 0.20 25)">
          <animateMotion
            dur="10s"
            begin="2s"
            repeatCount="indefinite"
            path="M80,700 C 280,585 480,510 720,448"
          />
          <animate attributeName="opacity" values="0;1;0" dur="10s" begin="2s" repeatCount="indefinite" />
        </circle>
        <circle r="1.4" fill="oklch(0.62 0.16 240)">
          <animateMotion
            dur="9s"
            begin="4s"
            repeatCount="indefinite"
            path="M80,760 C 260,640 460,560 700,500"
          />
          <animate attributeName="opacity" values="0;1;0" dur="9s" begin="4s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
