import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FamilyHeroArt } from "@/components/family/FamilyHeroArt";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, Sparkles,
  ShieldCheck, Home, Globe2, Compass, GraduationCap, Heart, Layers, Plane,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/common/SEOHead";
const FAQS: { q: string; a: string }[] = [
  { q: "Is the UAE a good place to raise a family?", a: "The UAE has become one of the most considered destinations in the world for families seeking long term stability. A safe environment, world class education, strong healthcare, a stable currency, and a globally connected position make it a durable platform for raising children with international outlook and access." },
  { q: "How can I relocate my family to the UAE?", a: "Family relocation works best when treated as a structural decision rather than a paperwork exercise. The right residency route is chosen against your profile — founder, investor, professional, or executive — and the supporting infrastructure of schooling, banking, healthcare, and housing is sequenced around the move." },
  { q: "What residency options exist for families in the UAE?", a: "Several long term routes exist, including investor residency, employment based residency, golden residency for qualifying profiles, and dependent residency that extends to spouse and children. The right route depends on what the family is building, not on what is fastest to obtain." },
  { q: "What is the difference between residency and citizenship?", a: "Residency gives a family the right to live, work, study, and build in a country. Citizenship is a deeper, longer term standing usually tied to nationality. Most families build long term stability through layered residencies rather than chasing citizenship as a single answer." },
  { q: "How can I improve family mobility?", a: "Mobility is the freedom to make choices without unnecessary limits. It is built through a combination of residencies, second residency options where appropriate, education abroad, and a financial structure that travels with the family. Mobility is infrastructure, not a passport." },
  { q: "Why do families seek a second residency?", a: "A second residency adds optionality. It gives families a credible alternative if circumstances change in their home country, expands the universe of schools and universities their children can access, and creates a wider platform for the next generation to choose from." },
  { q: "How can I create more opportunities for my children?", a: "Through three layers — environment, education, and exposure. Environment is the country and city the family lives in. Education is the quality and international recognition of the schools they attend. Exposure is the network, languages, and experiences they grow up inside." },
  { q: "What should families consider before relocating?", a: "Schooling continuity, healthcare access, residency stability, banking and financial structure, housing, the working profile of each parent, and how the move fits into a longer term plan for the family. Relocation is a structural decision with consequences that compound for years." },
  { q: "How does long term residency work in the UAE?", a: "Long term residency in the UAE typically runs in multi year cycles tied to investment, employment, business ownership, or qualifying profile. With the right structure in place, renewal becomes administrative rather than uncertain." },
  { q: "How do successful families structure their future?", a: "They treat the family as a long horizon project. Residency, schooling, mobility, healthcare, banking, and wealth structure are designed together so each decision reinforces the others rather than working against them." },
  { q: "Is the UAE safe for children?", a: "The UAE consistently ranks among the safest countries in the world for families. Low crime, strong public order, modern infrastructure, and a stable social environment make it a confident choice for raising children." },
  { q: "What is golden residency?", a: "Golden residency is a long term UAE residency category designed for qualifying investors, founders, executives, specialised professionals, and outstanding talent. It offers multi year stability and a stronger platform on which to build a long term life in the country." },
  { q: "How do I plan schooling when relocating?", a: "Schooling is usually the most sensitive part of any family move. The right approach maps the child's current curriculum and stage to suitable schools, secures placement in advance, and aligns timing with the academic calendar to avoid disruption." },
  { q: "What healthcare options exist for families?", a: "The UAE has a modern healthcare system with strong public and private options, internationally trained physicians, and access to world class private hospitals. Families typically combine mandatory health coverage with a tailored private health plan." },
  { q: "How is banking handled when relocating a family?", a: "Personal banking is set up against residency and proof of address. Families that arrive with structure — clean documentation, a clear income picture, and a coordinated approach across each member — open accounts and access services significantly faster." },
  { q: "Can my spouse and children join under my residency?", a: "Yes. Most long term UAE residency routes allow the principal holder to sponsor immediate family — spouse, children, and in many cases parents — under dependent residencies tied to the main holder." },
  { q: "How does residency support a child's education abroad?", a: "Stable UAE residency strengthens visa, school, and university applications in other countries. It provides a credible base, a stable address, a transparent income picture, and a clear platform for international applications." },
  { q: "What is family mobility planning?", a: "A structured approach to where the family can live, study, work, and travel with confidence. It combines residency choices, second residency where appropriate, education routes, and financial structure so future choices remain open rather than constrained." },
  { q: "How do international families maintain stability across countries?", a: "Through a clear home base, coordinated residencies, predictable schooling, and a financial structure designed to operate across borders. Stability for an international family is engineered, not assumed." },
  { q: "Can a business owner relocate the family alongside the business?", a: "Yes, and it is one of the most common patterns we see. The business move and the family move are designed together so company structure, residency, schooling, banking, and housing arrive in the right order rather than being improvised." },
  { q: "How can families create freedom without leaving their home country?", a: "By building a second base. A credible residency, a coordinated school option for the children, and a financial structure abroad give families the freedom to spend time in another country, prepare for the future, and respond if circumstances change at home." },
  { q: "What does long term family security really mean?", a: "It means the family has the structures it needs to absorb change. Stable residency, quality education, accessible healthcare, protected wealth, and the ability to move when needed. Security is the absence of forced choices." },
  { q: "How do families plan for the next generation?", a: "Through environment, education, and continuity. The country they grow up in, the schools and universities they have access to, and the financial and structural platform that will still be standing when they become adults." },
  { q: "How does cross border living work?", a: "Cross border living means a family operates intentionally across more than one country — a primary base, often a secondary base, schooling and healthcare in defined locations, and a financial structure designed to support life across each one cleanly." },
  { q: "Why work with Red Berry on family infrastructure?", a: "Most providers sell visas. Red Berry designs the infrastructure a family's long term life sits inside — residency strategy, mobility planning, schooling sequence, banking, and financial structure — coordinated as one architecture rather than separate transactions." },
];

const FRAMEWORK = [
  { icon: ShieldCheck, t: "Stability", d: "A secure environment, predictable laws, and a stable platform on which a family can build for years rather than months." },
  { icon: Home, t: "Residency", d: "The right long term residency for the principal, structured to extend cleanly to spouse, children, and dependents over a long horizon." },
  { icon: Plane, t: "Mobility", d: "Freedom to travel, study, work, and move with confidence. Built through residency choices, second residency options, and travel architecture that supports the life the family wants." },
  { icon: GraduationCap, t: "Opportunity", d: "Access to world class education, healthcare, professional networks, and international exposure that shape what the next generation can choose from." },
  { icon: ShieldCheck, t: "Protection", d: "Healthcare, safety, financial structure, and contingency designed so the family is protected against the things that can disrupt long term plans." },
  { icon: Layers, t: "Continuity", d: "An architecture that holds together as the family grows, as children leave home, and as parents transition through different phases of life." },
  { icon: Compass, t: "Confidence", d: "The quiet sense that the future is built on something solid. Decisions are made from a position of strength rather than from pressure or fear." },
];

const WHAT_FAMILIES_BUILD = [
  { icon: Home, t: "A Stable Home Base", d: "A confident, well chosen primary country and city where the family can build daily life with continuity and certainty." },
  { icon: GraduationCap, t: "Educational Opportunities", d: "Access to schools and universities aligned with where the family wants the next generation to be able to go in life." },
  { icon: Globe2, t: "Global Mobility", d: "Freedom to spend time across multiple countries for education, business, family, and personal choice." },
  { icon: Sparkles, t: "Future Flexibility", d: "Choices kept open. A platform that supports the life the family wants in five, ten, and twenty years — not just today." },
  { icon: ShieldCheck, t: "Cross Border Resilience", d: "A family that can keep functioning even when circumstances in one country change. Structure absorbs shocks." },
  { icon: Heart, t: "A Secure Environment", d: "Safety, healthcare, public order, and the everyday quality of life that allow children to grow up with confidence." },
];

const RESIDENCY_AS_INFRASTRUCTURE = [
  { t: "Stability", d: "A long horizon residency gives the family the right to plan beyond the next renewal cycle. Decisions become five and ten year decisions, not annual ones." },
  { t: "Access", d: "Residency unlocks schooling, banking, healthcare, housing, and the everyday access that turns a country into a real home rather than a destination." },
  { t: "Flexibility", d: "Layered residencies across more than one country give the family freedom to spend time where it makes sense — for school, business, lifestyle, or proximity to extended family." },
  { t: "Long Term Planning", d: "Stable residency lets parents make decisions for the next generation with confidence — schooling, university routes, and the platforms each child will operate from." },
  { t: "Opportunity", d: "Residency in the right country opens professional, educational, and social opportunities that simply do not exist for visitors or temporary residents." },
  { t: "Family Confidence", d: "Knowing the family has a credible long term place to live changes how parents make every other decision. Confidence is the quiet output of good infrastructure." },
];

const FREEDOM_THROUGH_STRUCTURE = [
  { t: "Mobility Planning", d: "A coordinated view of where each family member can live, study, work, and travel, designed against where the family wants to be able to go." },
  { t: "Second Residency Options", d: "A credible second base that gives the family room to move, prepare children for international universities, and stay open to future choices." },
  { t: "Citizenship Pathways", d: "Where appropriate, citizenship is treated as a longer term layer of a wider mobility plan rather than as a transactional purchase." },
  { t: "Global Access", d: "A coordinated set of residencies, school options, and travel infrastructure that gives the family meaningful access to the world." },
  { t: "Cross Border Flexibility", d: "Banking, schooling, and personal structure designed to operate across more than one country without friction at every step." },
  { t: "Long Term Positioning", d: "The decisions made today become the platform the family stands on in twenty years. Structure is the long view made tangible." },
];

const EDUCATION_BLOCKS = [
  { t: "Access To Quality Education", d: "Internationally recognised schools and universities chosen against the curriculum, ambition, and personality of each child." },
  { t: "Global Exposure", d: "Languages, cultures, friendships, and environments that broaden what the next generation considers possible." },
  { t: "Business Opportunities", d: "Growing up in a globally connected city quietly changes the kind of ventures, partners, and ideas a young adult is exposed to." },
  { t: "Career Opportunities", d: "International schooling, recognised qualifications, and global networks expand the range of careers the next generation can credibly pursue." },
  { t: "International Outlook", d: "An everyday environment of multiple nationalities, languages, and outlooks shapes how children think about the world they live in." },
  { t: "Future Readiness", d: "An education environment that prepares young people for a world that will look different from the one their parents grew up in." },
];

const COST_OF_WEAK = [
  "Restricted mobility for the family",
  "Limited options for the next generation",
  "Reactive decisions made under pressure",
  "Forced relocation when circumstances change",
  "Uncertainty around long term planning",
  "Administrative complexity that never settles",
  "Future constraints on schooling and careers",
  "Opportunities missed because the structure was not ready",
];

const QUESTIONS = [
  { q: "Is the UAE a good place to raise a family?", a: "Yes. A safe environment, modern healthcare, world class schools, and a stable currency make it one of the most considered destinations in the world for long term family planning." },
  { q: "How can I relocate my family to the UAE?", a: "Through a structural decision rather than a paperwork exercise. The right residency route, schooling, banking, and housing are sequenced together rather than handled piece by piece." },
  { q: "What residency options exist for families?", a: "Investor, employment, golden, and qualifying professional routes are the main long term options. Each carries different rights, renewal cycles, and dependents coverage." },
  { q: "What is the difference between residency and citizenship?", a: "Residency is the right to live and build in a country. Citizenship is a deeper, longer term standing. Most families build security through layered residencies, not single citizenship." },
  { q: "How can I improve family mobility?", a: "Through a coordinated set of residencies, second residency where appropriate, and a financial structure designed to operate across borders." },
  { q: "Why do families seek a second residency?", a: "To create optionality. A second base gives the family a credible alternative, expands education routes for the next generation, and protects the family against single country risk." },
  { q: "How can I create more opportunities for my children?", a: "Environment, education, and exposure. The country they live in, the schools they attend, and the world they grow up inside shape what they can choose from later." },
  { q: "What should families consider before relocating?", a: "Schooling continuity, healthcare access, residency stability, banking, housing, and how the move fits into a longer term plan. Relocation is a multi year decision, not a single event." },
  { q: "How does long term residency actually work?", a: "Long term residency runs in multi year cycles tied to investment, employment, business ownership, or qualifying profile. With the right structure in place, renewal becomes administrative." },
  { q: "How do successful families structure their future?", a: "They treat the family as a long horizon project. Residency, schooling, mobility, healthcare, banking, and wealth structure are designed as one coherent architecture." },
];

const AUDIENCES = [
  "Families Relocating To UAE", "Business Owners Moving With Family", "Investors Establishing Regional Presence",
  "Professionals Seeking Long Term Stability", "Parents Focused On Future Opportunity", "Families Exploring Mobility Options",
  "Families Seeking Greater Flexibility", "International Families",
];


function CreateFamilySecurityPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <SEOHead
        title="Create Family Security | Red Berry"
        description="Security for a family is a structure, not a sentiment. Residency, succession and asset protection arranged so the people you build for stay covered."
        url="https://redberry.ae/create-family-security"
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/ambitions" className="hover:text-foreground">Ambitions</Link>
            <span>/</span>
            <span className="text-foreground/80">Create Family Security</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                For Ambitious Families
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Build A Future Your Family Can Stand On With Confidence
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                Every ambitious family wants the same thing. Stability. Opportunity. Security. Freedom to make choices without unnecessary limitations.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Red Berry helps families build the infrastructure that supports those goals for years to come.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Start My Blueprint
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
              <FamilyHeroArt />
            </div>
          </div>
        </div>
      </section>

      {/* WHY FAMILY SECURITY REQUIRES MORE */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-more">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">A Long Horizon Decision</p>
          <h2 id="why-more" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Family Security Requires More Than Good Intentions
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Families that achieve long term security do not arrive there by accident. They face the same global uncertainties as everyone else — changing regulations, mobility limits, cross border complexity, evolving educational landscapes — and respond by building intentional structure around the things that matter most.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Global Uncertainty", d: "The world is moving faster than any single country can keep pace with. Families that plan structurally absorb the changes that catch others off guard." },
            { t: "Mobility Limitations", d: "Single passport, single residency, single country. Without layered mobility, every disruption becomes a forced decision." },
            { t: "Changing Regulations", d: "Tax, residency, and education rules shift across jurisdictions. A coordinated structure is far more resilient than a stack of separate arrangements." },
            { t: "Education Opportunities", d: "The schools and universities of the next decade demand earlier, more deliberate planning than the previous generation ever needed." },
            { t: "Cross Border Complexity", d: "International families need banking, residency, schooling, and tax positioning that work together, not against each other." },
            { t: "Long Term Planning", d: "Children grow into adults. Parents transition through life stages. Structure must hold across each one." },
            { t: "Residency Considerations", d: "The right long term residency is the platform every other family decision rests on. Choosing well early is worth far more than fixing it later." },
            { t: "Future Flexibility", d: "The decisions made today either keep future choices open or quietly close them. Good structure protects optionality." },
          ].map((e) => (
            <article key={e.t} className="p-5 rounded-2xl glass">
              <AlertTriangle className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-base font-display text-foreground">{e.t}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{e.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* THE FAMILY SECURITY FRAMEWORK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="framework">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Architecture</p>
          <h2 id="framework" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The Family Security Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven load bearing layers. Designed together, sequenced together, operated together — from the day the family decides to build something more deliberate, all the way through to the world they hand to the next generation.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FRAMEWORK.map((l, i) => (
            <article key={l.t} className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <div className="flex items-center justify-between">
                <span
                  className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card"
                  style={{ color: i % 2 ? "var(--azure)" : "var(--berry)" }}
                >
                  <l.icon className="h-5 w-5" aria-label={`${l.t} icon`} />
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                  L.{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-display text-foreground">{l.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{l.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHAT FAMILIES ARE REALLY BUILDING */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="building">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Beneath The Decision</p>
          <h2 id="building" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            What Families Are Really Building
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Families rarely come to us asking for paperwork. They come asking for a future. The conversation always returns to the same handful of things — a stable home, real opportunities for the children, freedom to choose, and the quiet confidence that comes from knowing the foundation is solid.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHAT_FAMILIES_BUILD.map((b) => (
            <article key={b.t} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <span className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card text-primary">
                <b.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-display text-foreground">{b.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{b.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* RESIDENCY AS INFRASTRUCTURE */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="residency">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-berry)" }}
            aria-hidden
          />
          <div className="relative">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Not Paperwork</p>
            <h2 id="residency" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
              Residency As Infrastructure
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-3xl">
              Treat residency as infrastructure rather than as a visa, and the entire conversation changes. It stops being a single transaction with an expiry date and becomes the foundation on which schooling, banking, healthcare, housing, and the family's long term plans sit.
            </p>
          </div>
          <div className="relative mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESIDENCY_AS_INFRASTRUCTURE.map((s) => (
              <div key={s.t} className="p-5 rounded-2xl bg-card/70 border border-border/50">
                <Home className="h-5 w-5 text-primary/80" aria-hidden />
                <h3 className="mt-3 text-base font-display text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATING FREEDOM THROUGH STRUCTURE */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="freedom">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Optionality</p>
          <h2 id="freedom" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Creating Freedom Through Structure
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Freedom is rarely the absence of structure. For families, it is almost always the result of better structure. The right combination of residency, mobility, and cross border architecture gives a family the freedom to act on opportunity rather than react to constraint.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FREEDOM_THROUGH_STRUCTURE.map((f) => (
            <article key={f.t} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <Plane className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-lg font-display text-foreground">{f.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* EDUCATION, OPPORTUNITY & FUTURE ACCESS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="education">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Next Generation</p>
          <h2 id="education" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Education, Opportunity & Future Access
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            For most parents, the conversation eventually returns to the children. What they will have access to, where they will be able to go, what their world will look like when they become adults. Family infrastructure is, at its heart, a quiet investment in what comes next.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EDUCATION_BLOCKS.map((e) => (
            <article key={e.t} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <GraduationCap className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-lg font-display text-foreground">{e.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{e.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* COST OF WEAK FAMILY INFRASTRUCTURE */}
      <section className="container-rb py-14 md:py-20">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-berry)" }}
            aria-hidden
          />
          <div className="relative max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Quiet Cost</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display text-foreground">
              The Cost Of Weak Family Infrastructure
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              Weak family infrastructure rarely shows itself as a single moment. It shows up as the slow accumulation of constraints, missed opportunities, and decisions made under pressure that better structure would have avoided.
            </p>
          </div>
          <div className="relative mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COST_OF_WEAK.map((x) => (
              <div key={x} className="p-5 rounded-2xl bg-card/80 border border-border/50">
                <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden />
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONS FAMILIES COMMONLY ASK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="questions">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Decision Inputs</p>
          <h2 id="questions" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Questions Families Commonly Ask
          </h2>
        </header>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {QUESTIONS.map((f) => (
            <article key={f.q} className="p-6 rounded-2xl glass">
              <h3 className="text-base font-display text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BLUEPRINT TOOL */}
      <section className="container-rb py-14 md:py-20">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden text-primary-foreground"
          style={{ background: "var(--gradient-berry)" }}
        >
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[10px] tracking-[0.22em] uppercase">
                <Sparkles className="h-3 w-3" /> Family Security Blueprint
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-[1.05]">
                Map The Infrastructure Your Family's Future Depends On
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">
                A strategic blueprint designed to identify the infrastructure your family may need to build stability, opportunity, mobility, and long term confidence.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-foreground font-medium hover:bg-white/90 transition-colors"
                >
                  Start My Blueprint
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={`/about/${"contact"}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 font-medium hover:bg-white/20 transition-colors"
                >
                  Talk To An Advisor
                </Link>
              </div>
            </div>
            <ul className="space-y-3" aria-label="Red Berry family security blueprint">
              {[
                "Residency strategy diagnosis",
                "Mobility and second residency review",
                "Schooling and education sequence",
                "Cross border family architecture",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 p-4 rounded-xl bg-white/10 border border-white/15">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
                  <span className="text-sm">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* WHO THIS IS FOR */}
      <section className="container-rb py-14 md:py-20">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Audience</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-display text-foreground">Who This Page Is For</h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Built for the people who are no longer asking whether to plan for the family's future, but how to build it deliberately.
          </p>
        </header>
        <div className="mt-8 flex flex-wrap gap-3">
          {AUDIENCES.map((a) => (
            <span key={a} className="px-4 py-2 rounded-full glass text-sm text-foreground/80">
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="faq">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Frequently Asked</p>
          <h2 id="faq" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Everything Families Ask About Long Term Security
          </h2>
        </header>
        <div className="mt-8 rounded-2xl glass p-2 md:p-4">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`q-${i}`} className="px-4">
                <AccordionTrigger className="text-left text-base font-display text-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/75 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-rb pb-24">
        <div className="rounded-3xl glass p-8 md:p-14 text-center">
          <h2 className="text-3xl md:text-5xl font-display text-gradient leading-tight">
            Build The Future Your Family Deserves
          </h2>
          <p className="mt-4 text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us what kind of future you are building and we will show you the infrastructure it needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/blueprint-tool"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
              style={{ background: "var(--gradient-berry)" }}
            >
              Start My Blueprint
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to={`/about/${"contact"}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
            >
              Talk To An Advisor
            </Link>
          </div>
          <div className="mt-8">
            <Link to="/ambitions" className="text-sm text-foreground/60 hover:text-foreground inline-flex items-center gap-1.5">
              Explore other ambitions <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default CreateFamilySecurityPage;
