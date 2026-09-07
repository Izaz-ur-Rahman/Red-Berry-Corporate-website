import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/rb-logo.png.asset.json";

const NAV = [
  { label: "Ambitions", href: "#ambitions" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Resources Hub", href: "#resources-hub" },
  
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-rb">
        <nav
          className={`rounded-2xl flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "px-4 py-2 bg-background/90 backdrop-blur-xl border border-border/50 shadow-[var(--shadow-soft)]"
              : "px-5 py-3 glass"
          }`}
          aria-label="Primary"
        >
          <a href="#top" className="flex items-center gap-2 shrink-0" aria-label="Red Berry home">
            <img
              src={logo.url}
              alt="Red Berry Corporate Services Corp"
              width={160}
              height={36}
              className={`transition-all ${scrolled ? "h-7" : "h-9"} w-auto`}
            />
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="px-3 py-2 text-sm text-foreground/75 hover:text-foreground rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="/about/contact"
              className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              Talk To An Advisor
            </a>
            <a
              href="/blueprint-tool"
              className="px-4 py-2 text-sm font-medium rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
              style={{ background: "var(--gradient-berry)" }}
            >
              Architect My Blueprint
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-foreground/5"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl animate-rise">
          <div className="container-rb pt-6">
            <div className="flex items-center justify-between">
              <img src={logo.url} alt="Red Berry" className="h-9 w-auto" />
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-foreground/5"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-10 space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-3xl font-display tracking-tight border-b border-border/60"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="/blueprint-tool"
                onClick={() => setOpen(false)}
                className="px-5 py-4 text-center text-base font-medium rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-berry)" }}
              >
                Architect My Blueprint
              </a>
              <a
                href="/about/contact"
                onClick={() => setOpen(false)}
                className="px-5 py-4 text-center text-base rounded-xl border border-border"
              >
                Talk To An Advisor
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
