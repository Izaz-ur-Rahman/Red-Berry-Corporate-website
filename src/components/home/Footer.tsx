import logo from "@/assets/rb-logo.png.asset.json";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Instagram, Facebook } from "lucide-react";

type FooterItem = { label: string; href?: string };
const COLS: { h: string; items: (string | FooterItem)[] }[] = [
  {
    h: "Ambitions",
    items: [
      { label: "Launch A Business", href: "/launch-a-business" },
      { label: "Expand Into The GCC", href: "/expand-into-gcc" },
      { label: "Grow & Protect Wealth", href: "/grow-and-protect-wealth" },
      { label: "Create Family Security", href: "/create-family-security" },
      { label: "Increase Global Freedom", href: "/increase-global-freedom" },
      { label: "Build A Hospitality Venture", href: "/build-a-hospitality-venture" },
    ],
  },
  {
    h: "Infrastructure",
    items: [
      { label: "Foundation Build", href: "/foundation-build" },
      "Financial Infrastructure",
      "Wealth Structure Design",
      "Identity Foundation",
      "Venture Architecture",
      "Sovereign Freedom",
      "Legacy & Life Architecture",
    ],
  },

  {
    h: "Resources Hub",
    items: ["Ambition Library", "GCC Ambition Index", "Infrastructure Reports", "Cost of Wrong Structure", "Building in the GCC"],
  },
  { h: "Company", items: ["About Red Berry", "Contact", "Privacy Policy", "Terms"] },
];

export function Footer() {
  return (
    <footer id="about" className="relative pt-14 pb-10 mt-6">
      <div className="container-rb">
        <div className="rounded-3xl glass p-8 md:p-12">
          <div className="grid lg:grid-cols-[1.1fr_2fr] gap-10">
            <div>
              <img src={logo.url} alt="Red Berry" className="h-10 w-auto" />
              <h2 className="mt-8 text-3xl md:text-5xl font-display text-gradient leading-tight">
                Continue Building.
              </h2>
              <p className="mt-4 text-foreground/65 max-w-md">
                Red Berry builds the infrastructure ambitious people rely on when their next move matters.
              </p>
              <a
                href="/blueprint-tool"
                className="mt-6 group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                style={{ background: "var(--gradient-berry)" }}
              >
                Architect My Blueprint
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {COLS.map((c) => (
                <div key={c.h}>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-foreground/50">{c.h}</div>
                  <ul className="mt-4 space-y-2.5">
                    {c.items.map((raw) => {
                      const it = typeof raw === "string" ? { label: raw } : raw;
                      return (
                        <li key={it.label}>
                          <a href={it.href ?? "#"} className="text-sm text-foreground/75 hover:text-primary transition-colors">
                            {it.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-foreground/50">
            <div>© {new Date().getFullYear()} Red Berry Corporate Services. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Dubai · UAE · GCC</span>
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
              <Link to="/terms-and-conditions" className="hover:text-foreground">Terms</Link>
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/red-berry-corporate-services-provider-llc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-foreground/50 hover:text-berry transition-all hover:scale-110 active:scale-95"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/redberrytt?igsh=MTVyZ2IwMDFwdnMxOA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-foreground/50 hover:text-berry transition-all hover:scale-110 active:scale-95"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/197zRb1tBC/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-foreground/50 hover:text-berry transition-all hover:scale-110 active:scale-95"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
