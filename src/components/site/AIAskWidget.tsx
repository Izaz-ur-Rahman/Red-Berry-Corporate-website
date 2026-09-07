import { useState, useEffect, useRef } from "react";
import { Sparkles, X, ExternalLink } from "lucide-react";

const HOME_URL = "https://redberry.ae";

const PREBUILT_PROMPT = `Please review the Red Berry website and help me understand how they support ambitious founders, investors, and families with corporate, financial, sovereign, and legacy infrastructure in the UAE and GCC. Here is the link: ${HOME_URL}`;

const PLATFORMS = [
  {
    name: "ChatGPT",
    href: `https://chat.openai.com/?q=${encodeURIComponent(PREBUILT_PROMPT)}`,
    color: "#10A37F",
  },
  {
    name: "Claude",
    href: `https://claude.ai/new?q=${encodeURIComponent(PREBUILT_PROMPT)}`,
    color: "#D97757",
  },
  {
    name: "Gemini",
    href: `https://gemini.google.com/app?prompt=${encodeURIComponent(PREBUILT_PROMPT)}`,
    color: "#4285F4",
  },
  {
    name: "Perplexity",
    href: `https://www.perplexity.ai/?q=${encodeURIComponent(PREBUILT_PROMPT)}`,
    color: "#1FB8CD",
  },
  {
    name: "Copilot",
    href: `https://copilot.microsoft.com/?q=${encodeURIComponent(PREBUILT_PROMPT)}`,
    color: "#0078D4",
  },
  {
    name: "redberry",
    href: `https://redberry.ae//?q=${encodeURIComponent(PREBUILT_PROMPT)}`,
    color: "#0078D4",
  },
];

export function AIAskWidget() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
      aria-label="Ask AI about Red Berry"
    >
      {open && (
        <div className="mb-2 w-64 rounded-2xl glass border border-border/60 shadow-[var(--shadow-lift)] p-4 animate-rise">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium tracking-wide text-foreground/80">
              Ask AI
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-foreground/5 text-foreground/50"
              aria-label="Close AI ask menu"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-foreground/55">
            Choose a platform and we’ll prefill the prompt with Red Berry’s home link.
          </p>
          <div className="mt-3 space-y-1.5">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-foreground/[0.04] hover:text-foreground transition-colors"
                style={{ borderLeft: `2px solid ${p.color}` }}
              >
                <span>{p.name}</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative group grid place-items-center w-11 h-11 rounded-full glass border border-border/60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all hover:scale-105 active:scale-95"
        aria-label="Ask AI about Red Berry"
        aria-expanded={open}
      >
        <span
          className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-60 transition-opacity"
          style={{ background: "var(--gradient-berry)", filter: "blur(8px)" }}
          aria-hidden
        />
        <span className="relative">
          <Sparkles
            className="h-5 w-5 transition-colors"
            style={{ color: "var(--berry)" }}
          />
        </span>
      </button>
    </div>
  );
}
