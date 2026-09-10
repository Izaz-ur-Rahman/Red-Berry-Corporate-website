export interface SEOConfig {
  title: string;
  description: string;
  url: string;
}

const SITE_URL = "https://redberry.ae";

export const SEO_CONFIG: Record<string, SEOConfig> = {
  "/": {
    title: "Red Berry | Ambition Infrastructure for the UAE & GCC",
    description:
      "Red Berry builds the corporate, financial, sovereign and legacy infrastructure ambitious founders, investors and families need to build in the UAE.",
    url: `${SITE_URL}/`,
  },

  // Outcome Pages
  "/launch-a-business": {
    title: "Launch a Business in the UAE | Red Berry",
    description:
      "Set up in the UAE on foundations built to hold. Licence, structure, banking and residency handled as one build, not a checklist. Start with clarity.",
    url: `${SITE_URL}/launch-a-business`,
  },

  "/expand-into-gcc": {
    title: "Expand Into the GCC | Red Berry",
    description:
      "Take a proven business into Saudi, Qatar and the wider GCC. Entity structure, licensing and local requirements mapped before you commit capital.",
    url: `${SITE_URL}/expand-into-gcc`,
  },

  "/grow-and-protect-wealth": {
    title: "Grow & Protect Wealth in the UAE | Red Berry",
    description:
      "Wealth needs architecture as much as it needs returns. Structures that let capital grow in the UAE while staying protected across borders and time.",
    url: `${SITE_URL}/grow-and-protect-wealth`,
  },

  "/create-family-security": {
    title: "Create Family Security | Red Berry",
    description:
      "Security for a family is a structure, not a sentiment. Residency, succession and asset protection arranged so the people you build for stay covered.",
    url: `${SITE_URL}/create-family-security`,
  },

  "/increase-global-freedom": {
    title: "Increase Global Freedom | Red Berry",
    description:
      "Freedom of movement is engineered. Residency, second citizenship and tax positioning in the UAE, built to widen where you can live, bank and travel.",
    url: `${SITE_URL}/increase-global-freedom`,
  },

  "/build-a-hospitality-venture": {
    title: "Build a Hospitality Venture in the UAE | Red Berry",
    description:
      "Hospitality in the UAE rewards operators who structure early. Licensing, permits, ownership and compliance built for a venture meant to last.",
    url: `${SITE_URL}/build-a-hospitality-venture`,
  },

  // Capability Pages
  "/foundation-build": {
    title: "Foundation Build | Red Berry",
    description:
      "The first structure everything else rests on. Company formation, licensing and residency in the UAE, built once and built to carry what comes next.",
    url: `${SITE_URL}/foundation-build`,
  },

  "/financial-infrastructure": {
    title: "Financial Infrastructure | Red Berry",
    description:
      "Banking, treasury and compliance arranged so money moves without friction. The financial rails ambitious businesses in the UAE and GCC run on.",
    url: `${SITE_URL}/financial-infrastructure`,
  },

  "/wealth-structure-design": {
    title: "Wealth Structure Design | Red Berry",
    description:
      "Holding companies, foundations and trusts designed around your assets and intentions. Wealth structuring in the UAE for founders and families.",
    url: `${SITE_URL}/wealth-structure-design`,
  },

  "/identity-foundation": {
    title: "Identity Foundation | Red Berry",
    description:
      "Residency, visas and status form the base layer of everything you build. Identity structured in the UAE so your position is secure before you scale.",
    url: `${SITE_URL}/identity-foundation`,
  },

  "/venture-architecture": {
    title: "Venture Architecture | Red Berry",
    description:
      "Design a venture that can take investment, partners and growth. Ownership, entities and governance shaped before the pressure of scale arrives.",
    url: `${SITE_URL}/venture-architecture`,
  },

  "/sovereign-freedom": {
    title: "Sovereign Freedom | Red Berry",
    description:
      "Citizenship, residency and jurisdiction chosen deliberately. Sovereign positioning that gives founders real optionality over where they live and hold.",
    url: `${SITE_URL}/sovereign-freedom`,
  },

  "/legacy-life-architecture": {
    title: "Legacy & Life Architecture | Red Berry",
    description:
      "What outlasts you should be designed, not left to chance. Succession, governance and legacy planning for families building across generations.",
    url: `${SITE_URL}/legacy-life-architecture`,
  },

  // About Pages
  "/about/leadership": {
    title: "Leadership | Red Berry",
    description:
      "The people behind Red Berry. Advisors who have built, structured and protected businesses across the UAE and GCC, and now do it for other founders.",
    url: `${SITE_URL}/about/leadership`,
  },

  "/about/why-red-berry-exists": {
    title: "Why We Exist | Red Berry",
    description:
      "Ambition in the UAE fails on structure, not on ideas. Why Red Berry was built to give founders, investors and families infrastructure worth trusting.",
    url: `${SITE_URL}/about/why-red-berry-exists`,
  },

  "/about/contact": {
    title: "Contact Red Berry | UAE & GCC Advisory",
    description:
      "Start a conversation about what you are building. Red Berry works with founders, investors and families establishing themselves in the UAE and GCC.",
    url: `${SITE_URL}/about/contact`,
  },
};