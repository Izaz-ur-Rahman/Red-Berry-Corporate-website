import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/rb-logo.png.asset.json";
import { SECTIONS } from "@/lib/platform";
import logo1 from "@/assets/rb-logo.png";
export function SiteFooter() {
  return (
    <footer className="relative pt-20 pb-10 mt-10">
      <div className="container-rb">
        <div className="rounded-3xl glass p-5 sm:p-8 md:p-12">
          <div className="grid lg:grid-cols-[1.1fr_2fr] gap-8 lg:gap-10">
            <div>
              <Link to="/"><img src={logo1} alt="Red Berry" className="h-8 sm:h-10 w-auto" /></Link>
              <h2 className="mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-gradient leading-tight">
                Continue Building.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-foreground/65 max-w-md">
                Red Berry builds the corporate, financial, sovereign, and legacy infrastructure ambitious people rely on when their next move matters.
              </p>
              <Link
                to="/blueprint-tool"
                className="mt-6 group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                style={{ background: "var(--gradient-berry)" }}
              >
                Architect My Blueprint
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {SECTIONS.slice(0, 6).map((s) => (
                <div key={s.key} className="min-w-0">
                  <Link to={s.to} className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground">
                    {s.label}
                  </Link>
                  <ul className="mt-4 space-y-2.5">
                    {s.groups.flatMap((g) => g.items).slice(0, 5).map((it) => (
                      <li key={it.slug}>
                        <Link
                          to={`${s.to}/${it.slug}`}
                          className="text-xs sm:text-sm text-foreground/75 hover:text-primary transition-colors line-clamp-2"
                        >
                          {it.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 pt-6 border-t border-border/60 flex flex-col gap-4 text-xs text-foreground/50">
            <div className="text-center sm:text-left">© {new Date().getFullYear()} Red Berry Corporate Services. All rights reserved.</div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-4 gap-y-2">
              <span>Dubai · UAE · GCC</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-foreground/30" />
              <Link to="/about/contact" className="hover:text-foreground">Contact</Link>
              <Link to="/about/philosophy" className="hover:text-foreground">Philosophy</Link>
              <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
              <Link to="/terms-and-conditions" className="hover:text-foreground">Terms</Link>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-foreground/30" />
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
