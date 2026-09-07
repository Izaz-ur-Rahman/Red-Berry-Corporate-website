import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, AlertTriangle, XCircle,
  BarChart3, Landmark, Crown, Crown as Sovereign,
  Sparkles, Building2, MapPin, Coins,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { IdentityFoundationHeroArt } from "@/components/infrastructure/IdentityFoundationHeroArt";
import { InfrastructureNavigator } from "@/components/infrastructure/InfrastructureNavigator";

// CONTENT for Identity Foundation

const EXECUTIVE_SUMMARY =
  "Identity Foundation is the protective layer that turns a name, a mark, a creation, and a digital presence into legally defensible assets. It covers trademarks, trade names, copyrights, patents, digital identity, domain architecture, and brand governance. Without it, a founder can spend years building recognition only to discover the brand is unprotected, the name is contested, or the digital footprint is owned by a contractor. Identity Foundation ensures that who you are and what you create remains yours.";

const WHY_MATTERS = [
  { t: "Purpose", d: "Identity Foundation protects the intangible value that customers, investors, and partners associate with the venture. It converts reputation into a legally enforceable asset." },
  { t: "Role", d: "It is the legal and digital armour around the brand, the IP, and the personal identity of the founder and the family. Every licensing, franchising, and capital event depends on it." },
  { t: "Importance", d: "A venture with unprotected IP or a contested name is a venture that cannot license, franchise, raise, or exit cleanly. Identity is often the first thing a buyer diligences." },
  { t: "Strategic Value", d: "Protected identity enables licensing revenue, brand extension, and clean transfer. Unprotected identity is a liability that shows up at the worst possible moment." },
  { t: "Long Term Impact", d: "The difference between a brand that compounds and a brand that is rebuilt every five years is the quality of its identity foundation." },
];

const RISKS = [
  { t: "Brand Theft", d: "A competitor registers the brand name or a similar mark in a key market. The founder is forced to rebrand, re-educate customers, and absorb the loss of recognition." },
  { t: "Contractor Owns The IP", d: "Software, designs, or content created by freelancers or agencies without assignment clauses become the contractor's property. The venture has no right to use what it paid for." },
  { t: "Domain And Digital Fragmentation", d: "Domains held in personal names, social accounts owned by employees, and digital presence scattered across personal and corporate identities. Control is illusory." },
  { t: "Name Conflict At Expansion", d: "A name that works locally conflicts with a registered mark in the next market. Expansion stalls while the dispute resolves, or the name changes." },
  { t: "Founder Name Becomes The Liability", d: "When the founder is the brand, personal events become business events. Without structural separation, reputation risk is concentrated in one person." },
];

const FRAMEWORK = [
  { n: "01", t: "Brand Audit", d: "A comprehensive inventory of every name, mark, logo, slogan, and trade dress the venture uses. Identifying what is protected, what is protectable, and what is exposed." },
  { n: "02", t: "Trademark Strategy", d: "Classes, jurisdictions, and registration pathways selected for the markets the venture operates in today and plans to enter within the next five years." },
  { n: "03", t: "IP Ownership Engineering", d: "Clear assignment of software, designs, content, and inventions from creators to the entity. No gaps, no ambiguity, no contractor claims." },
  { n: "04", t: "Trade Name And Domain Architecture", d: "Entity names, trade names, domain names, and social handles aligned under one coherent identity map. Held by the entity, not individuals." },
  { n: "05", t: "Digital Identity Governance", d: "Social accounts, email domains, cloud infrastructure, and digital assets owned by the entity with defined access, recovery, and continuity rules." },
  { n: "06", t: "Copyright And Patent Layer", d: "Registration of original works, inventions, and designs where protection adds value. Timed to commercial release, not left until imitation appears." },
  { n: "07", t: "Brand Governance", d: "Usage guidelines, licensing protocols, and enforcement procedures that keep the brand consistent, protected, and valuable as the venture scales." },
];

const MISTAKES = [
  { t: "Registering In One Class Only", d: "A trademark filed only in the class of the first product leaves every adjacent product, service, and revenue line exposed to imitation.", how: "File for the classes that cover the venture you are actually building, not the first SKU." },
  { t: "No IP Assignment In Contracts", d: "Every contractor, agency, and collaborator engaged without a written assignment of IP leaves the venture without clear ownership of what was created.", how: "Standard contracts with explicit work for hire and IP assignment clauses reviewed before the first engagement." },
  { t: "Domains In Personal Names", d: "The founder registers the domain personally. A dispute, divorce, or departure means the domain is a personal asset, not a corporate one.", how: "Hold all domains and social accounts in the entity name from day one. Document access and recovery procedures." },
  { t: "Ignoring Likely Expansion Markets", d: "Trademarks registered only in the home market are worthless when the venture expands. A competitor files first in the next market.", how: "Map the trademark pathway for the next three markets before the first expansion decision." },
  { t: "No Brand Usage Guidelines", d: "The logo, colours, and messaging used differently by every team member, partner, and agency. The brand becomes inconsistent and dilutes.", how: "A simple brand book with usage rules, approved assets, and a designated guardian. Updated annually." },
  { t: "Delaying Until Infringement Appears", d: "Waiting to register until a copycat appears. By then the mark may already be contested, and the cost of enforcement is multiples of the registration cost.", how: "Register protectable marks within six months of commercial use. Monitor and enforce from the beginning." },
];


const RELATED_AMBITIONS = [
  { slug: "launch-a-business", title: "Launch A Business", d: "Identity Foundation protects the brand from the first customer touchpoint.", icon: Building2, href: "/launch-a-business" },
  { slug: "expand-into-the-gcc", title: "Expand Into The GCC", d: "Regional expansion requires trademark and name protection in every target market.", icon: MapPin, href: "/expand-into-gcc" },
  { slug: "build-a-hospitality-venture", title: "Build A Hospitality Venture", d: "Hospitability lives and dies on brand. Identity Foundation makes it defensible.", icon: Sovereign, href: "/build-a-hospitality-venture" },
];

const RELATED_LAYERS = [
  { slug: "foundation-build", title: "Foundation Build", d: "The corporate spine that holds the trademark and IP registrations.", icon: Building2, href: "/foundation-build" },
  { slug: "financial-infrastructure", title: "Financial Infrastructure", d: "Valuation and licensing revenue that the identity layer enables.", icon: BarChart3, href: "/financial-infrastructure" },
  { slug: "sovereign-freedom", title: "Sovereign Freedom", d: "Founder residency and mobility built on the entity that holds the identity.", icon: Crown, href: "/infrastructure/sovereign-freedom" },
];

const FAQS_BEGINNER = [
  { q: "What does Identity Foundation include?", a: "Trademark registration, trade name protection, copyright and patent filing, IP ownership engineering, domain and digital identity governance, and brand usage guidelines." },
  { q: "Do I need a trademark for my business name?", a: "If the name has commercial value and you intend to scale, license, franchise, or raise, registration is essential. Common law rights are weak and expensive to enforce." },
  { q: "Can I trademark my personal name?", a: "Yes, if it is used as a brand in commerce. Many founders and creators register their personal brand as a trademark to protect licensing and partnership value." },
  { q: "What is the difference between a trade name and a trademark?", a: "A trade name is the legal name of the entity. A trademark is the brand mark used in commerce. They can be the same or different, and each requires separate protection." },
  { q: "Do I need to register in every country?", a: "Trademarks are territorial. Registration in the UAE does not protect the mark in KSA, the UK, or the US. A pathway strategy maps the markets that matter." },
  { q: "Who owns IP created by contractors?", a: "Without a written assignment, the contractor typically owns the IP. Every engagement should include a work for hire or IP assignment clause." },
  { q: "Should domains be in my personal name or the company name?", a: "Always in the entity name. Personal registration creates a gap between the business and its digital identity that becomes expensive to close." },
  { q: "How long does trademark registration take in the UAE?", a: "Typically six to twelve months from filing to certificate, assuming no objections or oppositions." },
];

const FAQS_INTERMEDIATE = [
  { q: "How many trademark classes should I file in?", a: "File in the classes that cover your current products and services, plus the classes you reasonably expect to enter in the next three to five years." },
  { q: "What is a trademark opposition?", a: "A third party can oppose your trademark application within a defined period after publication. Opposition requires a response and can delay or prevent registration." },
  { q: "How do I protect my brand on social media?", a: "Register handles early, claim verified status where available, document ownership, and include social account recovery procedures in your governance." },
  { q: "What is the Madrid Protocol and does it help?", a: "The Madrid Protocol allows a single international application based on a home country filing. It is efficient for multi-jurisdiction coverage if the home filing is strong." },
  { q: "How do I handle a copycat in another country?", a: "If you have registration in that country, enforcement through local counsel is straightforward. Without registration, you rely on common law claims which are weaker and slower." },
  { q: "Should I patent or keep my invention as a trade secret?", a: "Patents provide enforceable exclusivity but require public disclosure. Trade secrets protect without disclosure but are lost if leaked. The choice depends on the invention and the market." },
  { q: "What is a copyright and what does it protect?", a: "Copyright protects original works of authorship including software, designs, content, and creative materials. Registration strengthens enforcement but protection exists from creation." },
  { q: "How do I assign IP from a contractor to my company?", a: "A written assignment agreement signed before or contemporaneous with payment. The agreement should specify the work, the rights transferred, and the consideration." },
  { q: "What is brand governance?", a: "The set of rules, guidelines, and approvals that keep brand usage consistent across teams, partners, and markets. It prevents dilution and maintains value." },
  { q: "When should I file a patent?", a: "Before public disclosure, sale, or publication. Most jurisdictions bar patents for inventions already in the public domain." },
];

const FAQS_ADVANCED = [
  { q: "How does trademark interact with corporate tax?", a: "IP held in the right jurisdiction can generate licensing income subject to favourable tax treatment. The holding structure and the identity layer must be designed together." },
  { q: "What is the role of IP in a fundraising round?", a: "Investors diligence IP ownership, registration status, and encumbrances. Gaps reduce valuation and can block the round. A clean IP position is a diligence advantage." },
  { q: "How do I handle co founder IP contributions?", a: "Document the IP each founder brings, assign it to the entity, and address future IP creation in the shareholder agreement. Ambiguity here kills deals." },
  { q: "What is a licensing protocol?", a: "The documented terms under which the brand, IP, or content can be licensed to third parties. It defines scope, territory, duration, quality control, and royalties." },
  { q: "How is digital identity governed across jurisdictions?", a: "Domain registration, social accounts, cloud infrastructure, and email systems held under entity ownership with defined access, recovery, and succession procedures in every jurisdiction." },
  { q: "What is a defensive trademark strategy?", a: "Filing related marks, variations, and translations to prevent squatters and competitors from registering similar marks that dilute or confuse the brand." },
  { q: "How does identity foundation support franchising?", a: "A franchisable brand requires protected trademarks, documented usage guidelines, and a licensing protocol. Without these, franchise discussions stall at legal review." },
];

const FAQS_ALL = [...FAQS_BEGINNER, ...FAQS_INTERMEDIATE, ...FAQS_ADVANCED];

// HEALTH CHECK

const HEALTH_QUESTIONS = [
  { q: "Is your core brand name registered as a trademark in the markets you operate in?", k: "trademark" },
  { q: "Do all contractor and agency agreements include explicit IP assignment clauses?", k: "assignment" },
  { q: "Are your domains and social accounts held in the entity name, not a personal name?", k: "digital" },
  { q: "Have you mapped trademark protection for your next three expansion markets?", k: "expansion" },
  { q: "Is there a documented brand usage guideline that your team and partners follow?", k: "governance" },
  { q: "Have you reviewed IP ownership, copyright, and patent position in the last twelve months?", k: "review" },
  { q: "Could you prove ownership of your brand, content, and software in a dispute or diligence?", k: "proof" },
];

function HealthCheck() {
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | "unsure" | undefined>>({});
  const score = useMemo(() => {
    return HEALTH_QUESTIONS.reduce((acc, q) => {
      const v = answers[q.k];
      if (v === "yes") return acc + 2;
      if (v === "unsure") return acc + 1;
      return acc;
    }, 0);
  }, [answers]);
  const answered = HEALTH_QUESTIONS.every((q) => answers[q.k]);
  const tier = score >= 12 ? "Protected Grade" : score >= 7 ? "Workable" : "At Risk";
  const tierColor = tier === "Protected Grade" ? "var(--azure)" : tier === "Workable" ? "var(--berry)" : "oklch(0.62 0.20 25)";
  const tierNote =
    tier === "Protected Grade"
      ? "Your identity foundation is structurally sound. The work now is to keep it current as the brand scales into new markets and formats."
      : tier === "Workable"
        ? "Your identity operates but carries unaddressed exposures. A targeted reset would protect the brand before the next expansion or capital event."
        : "Your brand and IP are exposed at multiple points. A deliberate design now is materially cheaper than the enforcement or rebrand a future event will force.";

  return (
   
    <div className="rounded-3xl glass p-6 md:p-10">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <ol className="space-y-5">
          {HEALTH_QUESTIONS.map((q, i) => (
            <li key={q.k} className="border-b border-border/40 pb-5 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-[10px] tracking-[0.22em] uppercase text-foreground/45 pt-1">
                  Q{String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-foreground/85 leading-relaxed">{q.q}</p>
              </div>
              <div className="mt-3 ml-12 flex flex-wrap gap-2">
                {(["yes", "unsure", "no"] as const).map((opt) => {
                  const active = answers[q.k] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [q.k]: opt }))}
                      className={[
                        "px-4 py-1.5 rounded-full text-xs border transition-all capitalize",
                        active
                          ? "border-transparent text-primary-foreground shadow-[var(--shadow-glow)]"
                          : "border-border/60 text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                      ].join(" ")}
                      style={active ? { background: "var(--gradient-berry)" } : undefined}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>

        <aside className="rounded-2xl bg-card/70 border border-border/50 p-6 lg:sticky lg:top-40 self-start">
          <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/55">Live Result</div>
          {!answered ? (
            <p className="mt-4 text-sm text-foreground/65 leading-relaxed">
              Answer the seven questions. Your identity foundation tier appears here, with no lead form and no email required.
            </p>
          ) : (
            <>
              <div className="mt-4 text-3xl font-display" style={{ color: tierColor }}>
                {tier}
              </div>
              <div className="mt-1 text-xs text-foreground/55">Score {score} / 14</div>
              <p className="mt-4 text-sm text-foreground/75 leading-relaxed">{tierNote}</p>
              <Link
                to="/blueprint-tool"
                className="mt-6 group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-primary-foreground text-sm font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                style={{ background: "var(--gradient-berry)" }}
              >
                Assess My Identity
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

// ROUTE

function IdentityFoundationPage() {
  return (
    <SiteLayout>
      {/* HERO */}
       <SEOHead
        title="Identity Foundation | Red Berry"
        description="Residency, visas and status form the base layer of everything you build. Identity structured in the UAE so your position is secure before you scale."
        url="https://redberry.ae/identity-foundation"
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/infrastructure" className="hover:text-foreground">Infrastructure</Link>
            <span>/</span>
            <span className="text-foreground/80">Identity Foundation</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--azure)" }} />
                Infrastructure Layer · 04 / 07
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Identity Foundation
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                The protective layer that turns a name, a mark, a creation, and a digital presence into legally defensible assets.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Identity Foundation is not a logo. It is the system that ensures who you are and what you create remains yours, across markets, platforms, and generations.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Assess My Identity
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to={`/about/${"contact"}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
                >
                  Talk To An Advisor
                </Link>
              </div>
            </div>

            <div className="relative self-stretch flex items-stretch min-h-[320px] sm:min-h-[420px] lg:min-h-[560px] animate-float-soft">
              <IdentityFoundationHeroArt />
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="container-rb pb-10" aria-labelledby="exec-summary">
        <div className="rounded-3xl glass p-6 md:p-10">
          <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/55">Executive Summary</p>
          <h2 id="exec-summary" className="sr-only">Executive Summary</h2>
          <p className="mt-3 text-lg md:text-xl text-foreground/80 leading-relaxed speakable">
            {EXECUTIVE_SUMMARY}
          </p>
        </div>
      </section>

      {/* INFRASTRUCTURE NAVIGATOR */}
      <InfrastructureNavigator currentSlug="identity-foundation" />

      {/* WHY THIS LAYER MATTERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-matters">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Role</p>
          <h2 id="why-matters" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Identity Foundation Matters
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The value of most ventures today is not in the inventory or the equipment. It is in the name, the brand, the content, and the recognition. Identity Foundation protects that value.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_MATTERS.map((m) => (
            <article key={m.t} className="p-6 rounded-2xl glass">
              <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">{m.t}</div>
              <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{m.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHAT HAPPENS WITHOUT IT */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="without-it">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Cost Of Absence</p>
          <h2 id="without-it" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            What Happens Without A Real Identity Foundation
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Weak identity protection rarely fails on an ordinary day. It fails at the exact moment value matters most: a competitor's filing, an expansion, a fundraising round, or an exit.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {RISKS.map((r) => (
            <article key={r.t} className="p-5 rounded-2xl glass">
              <AlertTriangle className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-base font-display text-foreground">{r.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{r.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="framework">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Proprietary Framework</p>
          <h2 id="framework" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            The Identity Foundation Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven layers, engineered as one system. Each layer constrains or unlocks the next.
          </p>
        </header>

        <Accordion type="single" collapsible className="mt-10 rounded-2xl glass overflow-hidden">
          {FRAMEWORK.map((s) => (
            <AccordionItem key={s.n} value={s.n} className="border-b border-border/40 last:border-0 px-6">
              <AccordionTrigger className="py-5">
                <div className="flex items-center gap-4 text-left">
                  <span
                    className="text-[10px] tracking-[0.22em] uppercase font-medium"
                    style={{ color: "var(--azure)" }}
                  >
                    Layer {s.n}
                  </span>
                  <span className="text-lg font-display text-foreground">{s.t}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-foreground/75 leading-relaxed pb-2 pl-[88px]">{s.d}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* HEALTH CHECK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="health-check">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Interactive Self Diagnosis</p>
          <h2 id="health-check" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The Identity Foundation Health Check
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven questions. An immediate read on whether your identity foundation is At Risk, Workable, or Protected Grade. No form, no email, just structural clarity.
          </p>
        </header>
        <div className="mt-10">
          <HealthCheck />
        </div>
      </section>

      {/* MISTAKES */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="mistakes">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Field Notes</p>
          <h2 id="mistakes" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Common Identity Foundation Mistakes
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The most expensive identity mistakes look minor at the time. Each one quietly limits the brand for years.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MISTAKES.map((m) => (
            <article key={m.t} className="p-6 rounded-2xl glass">
              <XCircle className="h-5 w-5 text-destructive" aria-hidden />
              <h3 className="mt-3 text-lg font-display text-foreground">{m.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{m.d}</p>
              <div className="mt-4 pt-4 border-t border-border/40">
                <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/45">How To Prevent</div>
                <p className="mt-1.5 text-sm text-foreground/75 leading-relaxed">{m.how}</p>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* RELATED AMBITIONS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="related-ambitions">
        <header className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Ambitions This Layer Powers</p>
            <h2 id="related-ambitions" className="mt-3 text-3xl md:text-4xl font-display text-foreground">
              Where Identity Foundation Shows Up
            </h2>
          </div>
          <Link to="/ambitions" className="text-sm text-foreground/70 hover:text-foreground inline-flex items-center gap-1">
            See all ambitions <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {RELATED_AMBITIONS.map((a) => (
            <Link
              key={a.slug}
              to={a.href}
              className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid place-items-center w-9 h-9 rounded-lg border border-border/60 bg-card"
                  style={{ color: "var(--berry)" }}
                >
                  <a.icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-lg font-display">{a.title}</h3>
              </div>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{a.d}</p>
              <div className="mt-4 text-xs text-foreground/55 inline-flex items-center gap-1 group-hover:text-foreground transition-colors">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RELATED INFRASTRUCTURE LAYERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="related-layers">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Connected Layers</p>
          <h2 id="related-layers" className="mt-3 text-3xl md:text-4xl font-display text-foreground">
            Adjacent Infrastructure
          </h2>
          <p className="mt-4 text-foreground/65 text-base leading-relaxed">
            Identity Foundation does not stand alone. These layers attach directly to it.
          </p>
        </header>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {RELATED_LAYERS.map((l) => (
            <Link
              key={l.slug}
              to={l.href}
              className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid place-items-center w-9 h-9 rounded-lg border border-border/60 bg-card"
                  style={{ color: "var(--azure)" }}
                >
                  <l.icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-lg font-display">{l.title}</h3>
              </div>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{l.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ HUB */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="faq-hub">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">FAQ Hub</p>
          <h2 id="faq-hub" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Identity Foundation Questions
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Twenty five questions structured for beginners, operators, and advanced families.
          </p>
        </header>

        {[
          { h: "Beginner", items: FAQS_BEGINNER },
          { h: "Intermediate", items: FAQS_INTERMEDIATE },
          { h: "Advanced", items: FAQS_ADVANCED },
        ].map((group) => (
          <div key={group.h} className="mt-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--azure)" }}>
                {group.h}
              </span>
              <span className="h-px flex-1 bg-border/50" />
            </div>
            <Accordion type="single" collapsible className="mt-4 rounded-2xl glass overflow-hidden">
              {group.items.map((f, i) => (
                <AccordionItem key={f.q} value={`${group.h}-${i}`} className="border-b border-border/40 last:border-0 px-6">
                  <AccordionTrigger className="py-4 text-base font-display">{f.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-foreground/75 leading-relaxed pb-2">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>

      {/* BLUEPRINT INTEGRATION */}
      <section className="container-rb py-14 md:py-20">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden text-primary-foreground"
          style={{ background: "var(--gradient-berry)" }}
        >
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-[10px] tracking-[0.22em] uppercase">
                <Sparkles className="h-3 w-3" aria-hidden />
                Blueprint Integration
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-tight">
                Assess My Identity
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-2xl">
                Map your current trademark, IP ownership, digital identity, and brand governance positions against the structure your ambition will actually require.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link
                to="/blueprint-tool"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-foreground font-medium hover:bg-white/90 transition-colors"
              >
                Open The Blueprint Tool
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to={`/about/${"contact"}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-primary-foreground hover:bg-white/10 transition-colors"
              >
                Talk To An Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL INFRASTRUCTURE CTA */}
      <section className="container-rb pb-24" aria-labelledby="final-cta">
        <div className="rounded-3xl glass p-8 md:p-14 text-center">
          <h2 id="final-cta" className="text-3xl md:text-5xl font-display text-gradient">
            Identity Determines Value
          </h2>
          <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Tell us what you have built. We will show you which trademark, IP, and identity choices actually decide whether the value stays yours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/blueprint-tool"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
              style={{ background: "var(--gradient-berry)" }}
            >
              Start The Blueprint
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/infrastructure"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
            >
              See All Infrastructure Layers
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default IdentityFoundationPage;
