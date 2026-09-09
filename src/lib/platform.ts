// Single source of truth for navigation, taxonomy, and content
// across the Red Berry platform. Keep this data-driven so we can
// scale to 500+ pages without forking layouts.

import {
  Building2, Coins, Globe2, ShieldCheck, Hotel, MapPin,
  Layers, Landmark, BarChart3, Fingerprint, Crown, Compass,
  BookOpen, LineChart, Users, Briefcase, Home,
  Sparkles, Calculator, ClipboardCheck, Network, Library, Code, DollarSign, FolderOpen, Palette,
  type LucideIcon,
} from "lucide-react";

export type NodeItem = {
  slug: string;
  title: string;
  tagline: string;
  outcome?: string;
  icon: LucideIcon;
  accent?: "berry" | "azure";
    metaTitle?: string;
  metaDescription?: string;
};

export type Section = {
  key: "ambitions" | "infrastructure" | "blueprint" | "resources-hub" | "about";
  label: string;
  to: string;
  panelTitle: string;
  panelKicker: string;
  panelDescription: string;
  groups: { heading?: string; items: NodeItem[] }[];
  cta?: { label: string; to: string };
};

export const AMBITIONS: NodeItem[] = [
  { slug: "launch-a-business", title: "Launch A Business", tagline: "For founders creating a new commercial presence in the GCC.", icon: Building2, accent: "berry",
    outcome: "Move from idea to a credible, operating company in the UAE and wider region." },
  { slug: "expand-into-the-gcc", title: "Expand Into The GCC", tagline: "For businesses entering UAE and regional markets.", icon: MapPin, accent: "azure",
    outcome: "A coordinated entry plan across UAE, KSA, and the wider GCC — without losing quarters." },
  { slug: "grow-and-protect-wealth", title: "Grow & Protect Wealth", tagline: "For investors and entrepreneurs building long-term financial strength.", icon: Coins, accent: "berry",
    outcome: "Hold, compound, and protect capital with intent — across cycles and jurisdictions." },
  { slug: "create-family-security", title: "Create Family Security", tagline: "For families building stability, continuity, and future opportunities.", icon: ShieldCheck, accent: "azure",
    outcome: "Stability and continuity for the people who come after you." },
  { slug: "increase-global-freedom", title: "Increase Global Freedom", tagline: "For individuals seeking mobility, residency, and cross-border flexibility.", icon: Globe2, accent: "berry",
    outcome: "Genuine mobility — residency, Golden Visa, and citizenship pathways that actually compound." },
  { slug: "build-a-hospitality-venture", title: "Build A Hospitality Venture", tagline: "For entrepreneurs launching tourism and hospitality businesses.", icon: Hotel, accent: "azure",
    outcome: "From concept and licensing to operating structure for hospitality, F&B, and experiential brands." },
];

// Ambition → recommended Infrastructure disciplines (slugs from DISCIPLINES).
// Powers internal linking from each Ambition page to the layers that build it.
export const AMBITION_INFRASTRUCTURE: Record<string, string[]> = {
  "launch-a-business": ["foundation-build", "financial-infrastructure", "identity-foundation"],
  "expand-into-the-gcc": ["foundation-build", "financial-infrastructure", "sovereign-freedom"],
  "grow-and-protect-wealth": ["wealth-structure-design", "financial-infrastructure", "legacy-life-architecture"],
  "create-family-security": ["legacy-life-architecture", "wealth-structure-design", "sovereign-freedom"],
  "increase-global-freedom": ["sovereign-freedom", "legacy-life-architecture", "identity-foundation"],
  "build-a-hospitality-venture": ["venture-architecture", "foundation-build", "financial-infrastructure"],
};

export const DISCIPLINES: NodeItem[] = [
  { slug: "foundation-build", title: "Foundation Build", tagline: "Company Formation & Corporate Structuring.", icon: Layers, accent: "berry",
    outcome: "A credible corporate spine — jurisdiction, entity, ownership, licensing." },
  { slug: "financial-infrastructure", title: "Financial Infrastructure", tagline: "Accounting, Reporting & Financial Visibility.", icon: BarChart3, accent: "azure",
    outcome: "Books, tax, and reporting aligned with how your value actually moves." },
  { slug: "wealth-structure-design", title: "Wealth Structure Design", tagline: "Tax Advisory & Wealth Optimization.", icon: Landmark, accent: "berry",
    outcome: "Holding architecture engineered for protection and compounding." },
  { slug: "identity-foundation", title: "Identity Foundation", tagline: "Trademark, Protection & Incorporation.", icon: Fingerprint, accent: "azure",
    outcome: "Founder, family, and entity identity structured with intent." },
  { slug: "venture-architecture", title: "Venture Architecture", tagline: "Hospitality & Tourism Ventures.", icon: Hotel, accent: "berry",
    outcome: "From concept to operational structure for hospitality and experiential ventures." },
  { slug: "sovereign-freedom", title: "Sovereign Freedom", tagline: "Residency, Golden Visa & Citizenship.", icon: Crown, accent: "azure",
    outcome: "Residency, Golden Visa, and citizenship pathways for genuine mobility." },
  { slug: "legacy-life-architecture", title: "Legacy & Life Architecture", tagline: "Family Governance, Succession & Long-Term Planning.", icon: Compass, accent: "berry",
    outcome: "Continuity for family, wealth, and the chapters that follow yours." },
];

export const BLUEPRINT_TOOLS: NodeItem[] = [
  { slug: "ambition-infrastructure-blueprint", title: "Ambition Infrastructure Blueprint", tagline: "Red Berry's flagship diagnostic.", icon: Sparkles, accent: "berry",
    outcome: "A personal infrastructure map across corporate, financial, sovereign, and legacy layers." },
];

export const BLUEPRINT_SECTION: Section = {
  key: "blueprint", label: "Blueprint", to: "/blueprint",
  panelKicker: "Tools & assessments",
  panelTitle: "Architect Your Future",
  panelDescription: "Begin with a diagnostic. Move with a plan. The Blueprint Tool is Red Berry's flagship asset.",
  groups: [{ items: BLUEPRINT_TOOLS }],
  cta: { label: "Open the Blueprint Tool", to: "/blueprint-tool" },
};

export const RESOURCES_HUB: NodeItem[] = [
  { slug: "ambition-library", title: "The Ambition Library", tagline: "Frameworks, primers, and field notes.", icon: Library, accent: "berry" },
  { slug: "the-ambition-library", title: "The Ambition Library", tagline: "All resources and insights.", icon: Library, accent: "berry" },
  { slug: "sovereign-freedom-open-world", title: "Sovereign Freedom & The Open World", tagline: "Residency, citizenship, optionality.", icon: Globe2, accent: "azure" },
  { slug: "sovereign-freedom-&-the-open-world", title: "Sovereign Freedom & The Open World", tagline: "Residency, citizenship, optionality.", icon: Globe2, accent: "azure" },
  { slug: "founder-resources", title: "Founder Resources", tagline: "For operators building from the front.", icon: Briefcase, accent: "berry" },
  { slug: "investor-resources", title: "Investor Resources", tagline: "For allocators deploying in the region.", icon: LineChart, accent: "azure" },
  { slug: "family-office-resources", title: "Family Office Resources", tagline: "For multi-generational capital.", icon: Home, accent: "berry" },
  { slug: "technology", title: "Technology", tagline: "Technology insights and innovations.", icon: Code, accent: "azure" },
  { slug: "finance", title: "Finance", tagline: "Financial insights and strategies.", icon: DollarSign, accent: "berry" },
  { slug: "azfa", title: "Azfa", tagline: "Resources and insights.", icon: FolderOpen, accent: "azure" },
  { slug: "business-teting", title: "Business Teting", tagline: "Business related resources.", icon: Briefcase, accent: "berry" },
  { slug: "testing-web-design-category", title: "Testing Web Design Category", tagline: "Web design resources.", icon: Palette, accent: "azure" },
];


export const ABOUT: NodeItem[] = [
  { slug: "philosophy", title: "Our Philosophy", tagline: "Why infrastructure precedes ambition.", icon: BookOpen, accent: "berry" },
  { slug: "method", title: "The Ambition Infrastructure Method", tagline: "Our six-layer framework.", icon: Network, accent: "azure" },
{
  slug: "leadership",
  title: "Leadership",
  tagline: "The people behind Red Berry.",
  icon: Users,
  accent: "berry",
  metaTitle: "Leadership | Red Berry",
  metaDescription:
    "The people behind Red Berry. Advisors who have built, structured and protected businesses across the UAE and GCC, and now do it for other founders.",
},
{
  slug: "why-red-berry-exists",
  title: "Why Red Berry Exists",
  tagline: "The category we are building.",
  icon: Sparkles,
  accent: "azure",
  metaTitle: "Why We Exist | Red Berry",
  metaDescription:
    "Ambition in the UAE fails on structure, not on ideas. Why Red Berry was built to give founders, investors and families infrastructure worth trusting.",
},
  { slug: "partner-network", title: "Partner Network", tagline: "Counsel, banking, and regulatory allies.", icon: Network, accent: "berry" },
  { slug: "contact", title: "Contact", tagline: "Talk to an advisor.", icon: MapPin, accent: "azure" },
];

export const SECTIONS: Section[] = [
  {
    key: "ambitions", label: "Ambitions", to: "/ambitions",
    panelKicker: "What are you trying to achieve?",
    panelTitle: "What Are You Building?",
    panelDescription: "Ambitions are outcomes — the future you are actually trying to build. Pick yours, and we work backwards from it.",
    groups: [{ items: AMBITIONS }],
    cta: { label: "See all ambitions", to: "/ambitions" },
  },
  {
    key: "infrastructure", label: "Infrastructure", to: "/infrastructure",
    panelKicker: "What does it take to achieve it?",
    panelTitle: "The Infrastructure Behind Ambition",
    panelDescription: "Infrastructure layers — not services. The load-bearing disciplines Red Berry assembles inside every ambition.",
    groups: [{ items: DISCIPLINES }],
    cta: { label: "Explore the infrastructure", to: "/infrastructure" },
  },
  {
  key: "resources-hub",
  label: "Resources Hub",
  to: "/resources-hub",
  panelKicker: "The resources platform",
  panelTitle: "A Private Resources Hub For Ambitious Operators",
  panelDescription:
    "Frameworks, reports, and indices for those building seriously in the GCC.",
  groups: [],
  cta: {
    label: "Browse Resources Hub",
    to: "/resources-hub",
  },
},
  // {
  //   key: "resources-hub", label: "Resources Hub", to: "/resources-hub",
  //   panelKicker: "The resources platform",
  //   panelTitle: "A Private Resources Hub For Ambitious Operators",
  //   panelDescription: "Frameworks, reports, and indices for those building seriously in the GCC.",
  //   groups: [
  //     { items: RESOURCES_HUB },
  //   ],
  //   cta: { label: "Browse Resources Hub", to: "/resources-hub" },
  // },
  {
    key: "about", label: "About", to: "/about",
    panelKicker: "The firm",
    panelTitle: "Red Berry, From The Inside",
    panelDescription: "Our philosophy, method, leadership, and the network we operate inside.",
    groups: [{ items: ABOUT }],
    cta: { label: "Why Red Berry exists", to: "/about/why-red-berry-exists" },
  },
];

export function findItem(section: Section["key"], slug: string): NodeItem | undefined {
  const map = { ambitions: AMBITIONS, infrastructure: DISCIPLINES, blueprint: BLUEPRINT_TOOLS, "resources-hub": RESOURCES_HUB, about: ABOUT } as const;
  return map[section].find((i) => i.slug === slug);
}

// Reverse map: for an Infrastructure discipline, which Ambitions rely on it.
export function ambitionsForDiscipline(disciplineSlug: string): NodeItem[] {
  return AMBITIONS.filter((a) => (AMBITION_INFRASTRUCTURE[a.slug] ?? []).includes(disciplineSlug));
}

export function infrastructureForAmbition(ambitionSlug: string): NodeItem[] {
  const slugs = AMBITION_INFRASTRUCTURE[ambitionSlug] ?? [];
  return slugs.map((s) => DISCIPLINES.find((d) => d.slug === s)).filter(Boolean) as NodeItem[];
}
