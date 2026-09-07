import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Share2, ChevronUp, Sparkles, Linkedin, Twitter, Check, Copy, Mail, MessageCircle, Link2 } from "lucide-react";
import coverImage from "@/assets/uae-ambition-cover.jpg";

const SECTIONS = [
  { id: "why-uae", label: "Why the UAE" },
  { id: "residency", label: "Residency & Visas" },
  { id: "company", label: "Company Setup" },
  { id: "banking", label: "Banking & Capital" },
  { id: "tax", label: "Tax & Compliance" },
  { id: "network", label: "Network & Talent" },
  { id: "roadmap", label: "90-Day Roadmap" },
  { id: "faq", label: "FAQ" },
];

const FAQ = [
  {
    q: "Do I need to live in the UAE full-time to build a business there?",
    a: "No. Most founders operate with a residence visa that only requires periodic entry (typically once every 180 days) while running operations remotely, with core team on the ground.",
  },
  {
    q: "Which is better for a global founder: mainland or free zone?",
    a: "Free zones (DIFC, ADGM, IFZA, DMCC) suit international-facing, holding, and digital businesses. Mainland is preferable when you need to sell directly to UAE consumers or public entities.",
  },
  {
    q: "How long does the full setup take?",
    a: "Realistically 4–8 weeks: 1–2 weeks for entity formation, 2–3 weeks for visa and Emirates ID, and 2–4 weeks for corporate banking.",
  },
  {
    q: "Is the UAE really tax-free?",
    a: "Personal income is 0%. Corporate tax is 9% on profits above AED 375,000, with 0% available for qualifying free zone income. VAT is 5%. Structuring matters — get it right on day one.",
  },
];

export function HowToBuildAmbitiouslyUAE() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
      setShowTop(scrolled > 600);

      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-40"
        aria-hidden
      >
        <div
          className="h-full transition-[width] duration-100"
          style={{ width: `${progress}%`, background: "var(--berry)" }}
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-10 relative">
          <nav className="text-xs text-foreground/55 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/resources-hub" className="hover:text-foreground">Resources Hub</Link>
            <span>/</span>
            <Link to="/resources-hub/ambition-library" className="hover:text-foreground">Ambition Library</Link>
            <span>/</span>
            <span className="text-foreground/80">Building Ambitiously in the UAE</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
              Playbook · UAE
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient">
              How to Build Ambitiously In the UAE Setting Abroad
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground/75 leading-relaxed">
              A field-tested guide for global founders relocating capital, company, and life to the UAE — residency, structure, banking, tax, and a 90-day launch plan.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/60">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> 9 min read</span>
              <span>Updated July 2026</span>
              <ShareButton title="How to Build Ambitiously In the UAE Setting Abroad" />
            </div>
          </div>

          {/* Unique cover: offset frame + blueprint grid overlay + berry glow */}
          <figure className="mt-12 relative max-w-5xl mx-auto">
            <div
              className="absolute -inset-4 md:-inset-6 rounded-[28px] opacity-40 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(60% 60% at 30% 40%, var(--berry) 0%, transparent 70%)" }}
              aria-hidden
            />
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-[var(--shadow-soft)]">
              <img
                src={coverImage}
                alt="Editorial illustration of a UAE skyline over warm desert dunes at golden hour."
                width={1600}
                height={896}
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 blueprint-grid opacity-30 mix-blend-overlay pointer-events-none" aria-hidden />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
                aria-hidden
              />
              <figcaption className="absolute bottom-4 left-5 right-5 text-white/90 text-xs tracking-[0.22em] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                Field guide · United Arab Emirates
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* Body + TOC */}
      <section className="container-rb pb-24">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-3">On this page</p>
              <ul className="space-y-1.5 text-sm">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className={`text-left w-full py-1 border-l-2 pl-3 transition-colors ${
                        active === s.id
                          ? "border-[color:var(--berry)] text-foreground"
                          : "border-transparent text-foreground/55 hover:text-foreground/80"
                      }`}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article ref={articleRef} className="max-w-2xl prose-article">
            {/* Share-to-AI widget */}
            <ShareToAiCard title="How to Build Ambitiously In the UAE Setting Abroad" />

            <p className="text-lg text-foreground/80 leading-relaxed">
              The UAE has become the default landing pad for founders who want speed, stability, and access to capital without giving up global optionality. This guide walks through what actually works when you're building here from abroad — no fluff, just the sequence.
            </p>

            <h2 id="why-uae">Why the UAE</h2>
            <p>
              Zero personal income tax, a competitive 9% corporate tax with generous free zone regimes, direct flights to 240+ cities, and a founder-friendly regulatory posture. Beyond the numbers, the UAE offers something rarer: <strong>speed of execution</strong>. Licenses issue in days; banking is possible in weeks; talent arrives from every continent.
            </p>

            <h2 id="residency">Residency & Visas</h2>
            <p>
              Your foundation is a UAE residence visa. Common routes:
            </p>
            <ul>
              <li><strong>Golden Visa (10-year)</strong> — for investors, specialized talent, and select entrepreneurs.</li>
              <li><strong>Investor / Partner visa (2–3 years)</strong> — issued through your company license.</li>
              <li><strong>Employment visa</strong> — for founders operating as their own employee within their entity.</li>
            </ul>
            <p>
              Emirates ID follows within days. Maintain residency by entering the UAE at least once every 180 days.
            </p>

            <h2 id="company">Company Setup</h2>
            <p>
              Choose based on where your revenue comes from:
            </p>
            <ul>
              <li><strong>Free zone (DIFC, ADGM, IFZA, DMCC, RAKEZ)</strong> — 100% foreign ownership, international-facing, common for holdings, fintech, and digital businesses.</li>
              <li><strong>Mainland (DED)</strong> — required to invoice UAE consumers or bid on government contracts.</li>
              <li><strong>Offshore (JAFZA, RAK ICC)</strong> — asset holding only, no local operations.</li>
            </ul>
            <p>
              For most global founders, a DIFC or ADGM holding structure with an IFZA or mainland operating company underneath is the cleanest baseline.
            </p>

            <h2 id="banking">Banking & Capital</h2>
            <p>
              Corporate banking is the most underestimated step. Expect a 2–4 week onboarding with proper KYC — source of wealth, business plan, expected flows. Emirates NBD, Mashreq NEO, and Wio are common for early-stage; HSBC and Standard Chartered for scale. Personal banking opens quickly once your Emirates ID is active.
            </p>

            <h2 id="tax">Tax & Compliance</h2>
            <p>
              Get the structure right on day one, not day 300.
            </p>
            <ul>
              <li><strong>Personal income tax:</strong> 0%.</li>
              <li><strong>Corporate tax:</strong> 9% above AED 375,000 profit; 0% for qualifying free zone income.</li>
              <li><strong>VAT:</strong> 5%, registration required above AED 375,000 turnover.</li>
              <li><strong>Economic Substance & UBO filings:</strong> annual, non-negotiable.</li>
            </ul>

            <h2 id="network">Network & Talent</h2>
            <p>
              The UAE compresses relationship-building. One quarter of intentional meetings — DIFC Innovation Hub, Hub71, family office circles — will surface most of the operators, capital, and hires you need. Talent relocates fast because the personal math works.
            </p>

            <h2 id="roadmap">90-Day Roadmap</h2>
            <ol>
              <li><strong>Days 1–14:</strong> Choose jurisdiction, incorporate, apply for investor visa.</li>
              <li><strong>Days 15–30:</strong> Medical, Emirates ID, personal banking, lease a flexi-desk or residence.</li>
              <li><strong>Days 31–60:</strong> Open corporate banking, register for VAT if applicable, hire first local operator.</li>
              <li><strong>Days 61–90:</strong> Establish accounting, board cadence, and your first UAE customer or capital conversation.</li>
            </ol>

            <h2 id="faq">FAQ</h2>
            <div className="not-prose space-y-3 mt-4">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border/60 bg-background/40 p-5">
                  <summary className="cursor-pointer list-none font-medium text-foreground flex items-start justify-between gap-4">
                    <span>{f.q}</span>
                    <span className="text-foreground/40 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-foreground/75 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-14 p-6 rounded-2xl glass">
              <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Next step</p>
              <h3 className="mt-2 text-2xl font-display text-gradient">Build your ambition blueprint</h3>
              <p className="mt-2 text-foreground/70">Get a personalized UAE setup plan based on your profile in under 5 minutes.</p>
              <Link
                to="/blueprint-tool"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                style={{ background: "var(--berry)", color: "white" }}
              >
                Open the Blueprint Tool →
              </Link>
            </div>

            {/* Author profile */}
            <AuthorCard />

            <div className="mt-10">
              <Link
                to="/resources-hub/ambition-library"
                className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Ambition Library
              </Link>
            </div>
          </article>
        </div>
      </section>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full glass hover:shadow-[var(--shadow-soft)] transition-all"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      )}
    </>
  );
}

function ShareButton({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator).share({ title, url });
        setOpen(false);
        return true;
      } catch {}
    }
    return false;
  };

  const items = [
    { name: "Copy link", icon: copied ? Check : Link2, onClick: copy, keep: true },
    { name: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}` },
    { name: "X / Twitter", icon: Twitter, href: `https://twitter.com/intent/tweet?text=${text}&url=${link}` },
    { name: "WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${text}%20${link}` },
    { name: "Email", icon: Mail, href: `mailto:?subject=${text}&body=${link}` },
  ];

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={async () => {
          const shared = await nativeShare();
          if (!shared) setOpen((v) => !v);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
      >
        <Share2 className="h-4 w-4" /> Share
      </button>
      {open && (
        <div
          role="menu"
          className="absolute z-50 mt-2 right-0 sm:left-0 sm:right-auto w-56 rounded-xl border border-border/60 bg-background/95 backdrop-blur shadow-[var(--shadow-soft)] p-1.5"
        >
          {items.map((it) => {
            const Icon = it.icon;
            const inner = (
              <>
                <Icon className="h-4 w-4 text-foreground/60" />
                <span>{it.name === "Copy link" && copied ? "Link copied" : it.name}</span>
              </>
            );
            const cls = "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors";
            return "href" in it && it.href ? (
              <a
                key={it.name}
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                {inner}
              </a>
            ) : (
              <button
                key={it.name}
                onClick={() => it.onClick?.()}
                className={cls}
                role="menuitem"
              >
                {inner}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


function AuthorCard() {
  return (
    <aside
      className="not-prose mt-14 p-6 rounded-2xl border border-border/60 bg-background/40 flex flex-col sm:flex-row gap-5 items-start"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-display shrink-0"
        style={{ background: "linear-gradient(135deg, var(--berry), #7a1830)" }}
        aria-hidden
      >
        RB
      </div>
      <div className="flex-1">
        <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Written by</p>
        <p className="mt-1 text-lg font-display text-foreground" itemProp="name">
          Red Berry Editorial
        </p>
        <p className="mt-1 text-sm text-foreground/70" itemProp="description">
          Red Berry's in-house team of advisors, structuring specialists, and operators covering how ambitious founders build in the UAE and the wider GCC.
        </p>
        <div className="mt-3 flex items-center gap-3 text-foreground/60">
          <a
            href="https://www.linkedin.com/company/red-berry"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Red Berry on LinkedIn"
            className="hover:text-foreground transition-colors"
            itemProp="sameAs"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Red Berry on X"
            className="hover:text-foreground transition-colors"
            itemProp="sameAs"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <Link
            to="/about"
            className="ml-1 text-sm hover:text-foreground transition-colors"
          >
            About the team →
          </Link>
        </div>
      </div>
    </aside>
  );
}

function ShareToAiCard({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, []);

  const prompt = `Please read and summarize this article "${title}" in 5 concise, high-signal bullet points, then list 3 actionable takeaways for a founder relocating to the UAE. Article: ${url}`;

  const targets = [
    { name: "ChatGPT", href: `https://chat.openai.com/?q=${encodeURIComponent(prompt)}` },
    { name: "Claude", href: `https://claude.ai/new?q=${encodeURIComponent(prompt)}` },
    { name: "Perplexity", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}` },
    { name: "Gemini", href: `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}` },
  ];

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className="not-prose mb-8 rounded-xl p-[1px]"
      style={{ background: "linear-gradient(135deg, var(--berry), transparent 60%)" }}
    >
      <div className="rounded-xl bg-background/80 backdrop-blur p-3 sm:p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "color-mix(in oklab, var(--berry) 18%, transparent)" }}
            aria-hidden
          >
            <Sparkles className="h-4 w-4" style={{ color: "var(--berry)" }} />
          </div>
          <div className="flex-1 min-w-[180px]">
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">Share to AI</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">
              Summarize this article in your AI assistant
            </p>
          </div>
          <button
            onClick={copyPrompt}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium border border-border/60 hover:bg-background/60 transition-colors"
            aria-label="Copy prompt"
          >
            {copied ? (
              <><Check className="h-3 w-3" /> Copied</>
            ) : (
              <><Copy className="h-3 w-3" /> Copy</>
            )}
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap gap-2">
          {targets.map((t) => (
            <a
              key={t.name}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--berry)" }}
            >
              <Sparkles className="h-3 w-3" /> {t.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

