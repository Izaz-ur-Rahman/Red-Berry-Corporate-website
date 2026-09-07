const NODES = [
  { id: "corp", label: "Corporate", x: 50, y: 12 },
  { id: "fin", label: "Financial", x: 86, y: 32 },
  { id: "sov", label: "Sovereign", x: 86, y: 70 },
  { id: "id", label: "Identity", x: 50, y: 92 },
  { id: "leg", label: "Legacy", x: 14, y: 70 },
  { id: "ven", label: "Venture", x: 14, y: 32 },
];

export function InfrastructureEngine({ formed = false }: { formed?: boolean }) {
  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      {/* Soft glow */}
      <div
        className="absolute inset-8 rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, oklch(0.62 0.16 240 / 0.35), transparent 70%)" }}
      />
      <div
        className="absolute inset-16 rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.20 25 / 0.35), transparent 70%)" }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="core">
            <stop offset="0%" stopColor="oklch(0.55 0.20 25)" />
            <stop offset="100%" stopColor="oklch(0.62 0.16 240)" />
          </radialGradient>
        </defs>

        {/* Outer ring */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.62 0.16 240 / 0.18)" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="oklch(0.55 0.20 25 / 0.18)" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="oklch(0.62 0.16 240 / 0.22)" strokeWidth="0.3" />

        {/* Connections from center */}
        {NODES.map((n) => (
          <line
            key={`l-${n.id}`}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke="url(#line)" strokeWidth="0.35"
            className={formed ? "animate-dash" : ""}
          />
        ))}
        {/* Polygon link */}
        <polygon
          points={NODES.map((n) => `${n.x},${n.y}`).join(" ")}
          fill="oklch(0.62 0.16 240 / 0.04)"
          stroke="url(#line)"
          strokeWidth="0.3"
        />

        {/* Nodes */}
        {NODES.map((n, i) => (
          <g key={n.id} style={{ animationDelay: `${i * 0.4}s` }} className="animate-pulse-node origin-center">
            <circle cx={n.x} cy={n.y} r="2.6" fill="white" stroke="oklch(0.55 0.20 25)" strokeWidth="0.4" />
            <circle cx={n.x} cy={n.y} r="1.1" fill="oklch(0.55 0.20 25)" />
          </g>
        ))}

        {/* Core */}
        <circle cx="50" cy="50" r="6" fill="url(#core)" opacity="0.95" />
        <circle cx="50" cy="50" r="2.2" fill="white" />
      </svg>

      {/* Node labels */}
      {NODES.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] md:text-xs font-medium tracking-wide text-foreground/80"
          style={{ left: `${n.x}%`, top: `${n.y}%`, marginTop: n.y > 50 ? 18 : -22 }}
        >
          <span className="px-2 py-1 rounded-md glass">{n.label}</span>
        </div>
      ))}

      {/* Center label */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-10 text-center">
        <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/60">Ambition</div>
        <div className="text-sm font-display text-foreground/90">Infrastructure Engine</div>
      </div>
    </div>
  );
}
