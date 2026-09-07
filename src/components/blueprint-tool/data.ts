export type LayerKey = "corporate" | "financial" | "market" | "legacy";

export const LAYERS: { key: LayerKey; title: string; intro: string; checkpoint: string }[] = [
  {
    key: "corporate",
    title: "Corporate Infrastructure",
    intro:
      "Corporate Infrastructure checks whether your business is legally and operationally built on the right foundation.",
    checkpoint: "Foundation mapped.",
  },
  {
    key: "financial",
    title: "Financial Infrastructure",
    intro:
      "Financial Infrastructure checks whether your business has the financial clarity, tax discipline, and reporting control needed to grow confidently.",
    checkpoint: "Financial control layer mapped.",
  },
  {
    key: "market",
    title: "Market & Mobility Infrastructure",
    intro:
      "Market & Mobility Infrastructure checks whether your business, owners, and key people can operate smoothly in the UAE/GCC through residency, Golden Visa, banking, approvals, hiring, and government processes.",
    checkpoint: "Market access layer mapped.",
  },
  {
    key: "legacy",
    title: "Business Legacy Infrastructure",
    intro:
      "Business Legacy Infrastructure checks whether your business is being built as a durable commercial asset, not just a day-to-day operation.",
    checkpoint: "Business legacy layer mapped.",
  },
];

export type ScoredQuestion = {
  id: string;
  layer: LayerKey;
  prompt: string;
  options: { label: string; score: 0 | 1 | 2 | 3 }[];
};

export const QUESTIONS: ScoredQuestion[] = [
  // Corporate
  { id: "c1", layer: "corporate", prompt: "How confident are you that your current or planned company structure matches what the business actually wants to do?", options: [
    { label: "I am not sure which structure is right", score: 0 },
    { label: "I chose based on cost, speed, or someone's recommendation", score: 1 },
    { label: "It matches our current activity, but I am unsure about future expansion", score: 2 },
    { label: "It was selected based on activity, ownership, tax, banking, and expansion needs", score: 3 },
  ]},
  { id: "c2", layer: "corporate", prompt: "Does your licence fully support your real business activity, revenue model, and future services?", options: [
    { label: "I do not know", score: 0 },
    { label: "It covers the basic activity, but not everything we plan to do", score: 1 },
    { label: "It covers our current operations, but expansion may require review", score: 2 },
    { label: "Yes, the licence was chosen around current and future activity", score: 3 },
  ]},
  { id: "c3", layer: "corporate", prompt: "Are ownership, shareholders, signatories, and decision rights clearly structured and documented?", options: [
    { label: "No, it is informal or unclear", score: 0 },
    { label: "Basic documents exist, but roles are not deeply defined", score: 1 },
    { label: "Most responsibilities are clear, but not reviewed recently", score: 2 },
    { label: "Yes, ownership, control, authority, and responsibilities are properly documented", score: 3 },
  ]},
  { id: "c4", layer: "corporate", prompt: "If your business doubles in size or expands across the UAE/GCC, would the current structure still work?", options: [
    { label: "No, it would probably need to be rebuilt", score: 0 },
    { label: "Maybe, but we have not tested that", score: 1 },
    { label: "It can support some growth, but not all future scenarios", score: 2 },
    { label: "Yes, it was built with expansion in mind", score: 3 },
  ]},
  { id: "c5", layer: "corporate", prompt: "Who currently sees the full corporate picture of your business?", options: [
    { label: "No one; different people handle different tasks", score: 0 },
    { label: "One provider handles registration, but not the full business picture", score: 1 },
    { label: "We have an advisor, but only for certain areas", score: 2 },
    { label: "One team understands company, compliance, ownership, expansion, and risk together", score: 3 },
  ]},
  // Financial
  { id: "f1", layer: "financial", prompt: "How current and reliable are your accounting records?", options: [
    { label: "We update records only when required", score: 0 },
    { label: "Records exist, but they are not always current", score: 1 },
    { label: "Records are mostly current and usable", score: 2 },
    { label: "Records are current, reviewed, and decision-ready", score: 3 },
  ]},
  { id: "f2", layer: "financial", prompt: "How clearly do you understand your VAT and corporate tax position?", options: [
    { label: "I am not clear at all", score: 0 },
    { label: "I rely fully on someone else and do not understand the implications", score: 1 },
    { label: "I understand the basics, but need better strategic guidance", score: 2 },
    { label: "We understand obligations, timelines, risks, and planning implications", score: 3 },
  ]},
  { id: "f3", layer: "financial", prompt: "Can you clearly see your profit, cash flow, liabilities, and obligations without waiting for year-end reports?", options: [
    { label: "No", score: 0 },
    { label: "Only when we ask someone to prepare it", score: 1 },
    { label: "We see some reports, but not always with strategic interpretation", score: 2 },
    { label: "Yes, we have timely numbers and understand what they mean", score: 3 },
  ]},
  { id: "f4", layer: "financial", prompt: "Is your banking and transaction structure aligned with your business model and expected growth?", options: [
    { label: "No, banking is still difficult or unresolved", score: 0 },
    { label: "We have banking, but it is not ideal for our operations", score: 1 },
    { label: "It works now, but may need improvement as we scale", score: 2 },
    { label: "Yes, banking, transactions, and documentation are aligned with our business activity", score: 3 },
  ]},
  { id: "f5", layer: "financial", prompt: "Is your financial structure designed only for compliance, or also for growth?", options: [
    { label: "Only for basic compliance", score: 0 },
    { label: "Mostly compliance, with some advice when needed", score: 1 },
    { label: "We are starting to plan around growth and tax efficiency", score: 2 },
    { label: "Financial reporting, tax, cash flow, and growth planning are connected", score: 3 },
  ]},
  // Market & Mobility
  { id: "m1", layer: "market", prompt: "Do the owners or key decision-makers have the right UAE residency pathway for the business they are building?", options: [
    { label: "No clear pathway yet", score: 0 },
    { label: "Basic visa exists, but not aligned with long-term plans", score: 1 },
    { label: "Residency is in place, but Golden Visa or long-term options need review", score: 2 },
    { label: "Residency / Golden Visa pathway is aligned with business and leadership plans", score: 3 },
  ]},
  { id: "m2", layer: "market", prompt: "Have you assessed whether the UAE Golden Visa could support your business, investment, or leadership stability?", options: [
    { label: "No, we have not assessed it", score: 0 },
    { label: "We heard about it, but do not know eligibility", score: 1 },
    { label: "We checked eligibility but have not acted", score: 2 },
    { label: "Yes, eligibility, documents, and timing are clear", score: 3 },
  ]},
  { id: "m3", layer: "market", prompt: "How smooth are your approvals, renewals, visas, and government-related processes?", options: [
    { label: "Chaotic or dependent on last-minute fixes", score: 0 },
    { label: "Manageable, but stressful and reactive", score: 1 },
    { label: "Mostly smooth, with some recurring friction", score: 2 },
    { label: "Clear, planned, and handled before they become urgent", score: 3 },
  ]},
  { id: "m4", layer: "market", prompt: "Can your structure support hiring, visas, and team expansion as the business grows?", options: [
    { label: "No, we have not planned for this", score: 0 },
    { label: "We can hire, but the process is unclear or slow", score: 1 },
    { label: "We can support moderate hiring, but not rapid growth", score: 2 },
    { label: "Yes, visa capacity, approvals, and hiring needs are planned around growth", score: 3 },
  ]},
  { id: "m5", layer: "market", prompt: "If you needed to serve clients, partners, or opportunities beyond one emirate or across the GCC, would your current setup support it?", options: [
    { label: "No", score: 0 },
    { label: "Only with major changes", score: 1 },
    { label: "Partially, depending on activity and location", score: 2 },
    { label: "Yes, the structure was selected with regional access in mind", score: 3 },
  ]},
  // Legacy
  { id: "l1", layer: "legacy", prompt: "Is your business name, brand, trademark, or intellectual property protected in the markets where you operate or plan to grow?", options: [
    { label: "No", score: 0 },
    { label: "We use the name, but protection is unclear", score: 1 },
    { label: "Some protection exists, but not fully reviewed", score: 2 },
    { label: "Yes, brand, trademark, and identity protection are properly handled", score: 3 },
  ]},
  { id: "l2", layer: "legacy", prompt: "If an investor, bank, partner, or buyer reviewed your business tomorrow, would your records create confidence?", options: [
    { label: "No, documents are scattered or incomplete", score: 0 },
    { label: "Some documents exist, but not in a clean structure", score: 1 },
    { label: "Most documents are available, but need organization", score: 2 },
    { label: "Yes, documents, licences, financials, contracts, and compliance records are organized", score: 3 },
  ]},
  { id: "l3", layer: "legacy", prompt: "Could the business continue smoothly if the founder, manager, or key partner was unavailable for 30 days?", options: [
    { label: "No, everything depends on one person", score: 0 },
    { label: "It would continue, but with confusion", score: 1 },
    { label: "Key processes are known, but not fully documented", score: 2 },
    { label: "Yes, authority, records, processes, and responsibilities are clear", score: 3 },
  ]},
  { id: "l4", layer: "legacy", prompt: "Are ownership terms, partner expectations, financial records, and compliance strong enough for investment or strategic partnerships?", options: [
    { label: "No, we are not ready", score: 0 },
    { label: "We could explain it, but documents are not fully ready", score: 1 },
    { label: "We are mostly ready, but need refinement", score: 2 },
    { label: "Yes, the structure is ready for serious review", score: 3 },
  ]},
  { id: "l5", layer: "legacy", prompt: "Are you building the business in a way that increases long-term value beyond daily revenue?", options: [
    { label: "No, we are mainly focused on daily operations", score: 0 },
    { label: "We want to, but have not structured for it", score: 1 },
    { label: "Some parts are being built for long-term value", score: 2 },
    { label: "Yes, brand, structure, records, systems, and compliance are all being built for long-term value", score: 3 },
  ]},
];

export const AMBITION_OPTIONS = [
  "Entering the UAE or GCC market",
  "Setting up a new company or branch",
  "Expanding operations inside the UAE",
  "Building a tourism, hospitality, real estate, or service venture",
  "Restructuring tax, accounting, and compliance",
  "Preparing for investment, partnership, or scale",
  "Building a long-term regional business presence",
];

export const SITUATION_OPTIONS = [
  "The opportunity is clear, but the structure is not.",
  "The business is already moving, but the foundation feels scattered.",
  "We have providers, but no one owns the full picture.",
  "We are compliant, but not sure if we are structured for growth.",
  "We are preparing for a bigger move and cannot afford structural mistakes.",
];

export const PRESSURE_Q1 = [
  { label: "We need to move fast but do not know the right structure", score: 3 },
  { label: "We already started, but things feel disconnected", score: 2 },
  { label: "We are growing and need stronger control", score: 2 },
  { label: "We are preparing for investors, partners, or expansion", score: 3 },
  { label: "Nothing urgent; we just want to check our readiness", score: 1 },
];

export const PRESSURE_Q2 = [
  { label: "Choosing the wrong company structure", score: 3 },
  { label: "Misunderstanding tax, VAT, or accounting obligations", score: 3 },
  { label: "Delays in visas, approvals, banking, or government processes", score: 2 },
  { label: "Losing brand, ownership, or investor confidence", score: 3 },
  { label: "Depending on disconnected advisors", score: 2 },
];

export function layerLabel(score: number) {
  if (score <= 4) return { label: "Critical Infrastructure Gap", tone: "critical" as const };
  if (score <= 8) return { label: "Weak Infrastructure", tone: "weak" as const };
  if (score <= 12) return { label: "Developing Infrastructure", tone: "developing" as const };
  return { label: "Strong Infrastructure", tone: "strong" as const };
}

export function layerMessage(score: number) {
  if (score <= 4)
    return {
      message:
        "This is a serious structural weakness. It can affect compliance, banking, tax, ownership, expansion, investor confidence, or business continuity.",
      recommendation:
        "Prioritize this immediately. Your ambition may be moving faster than this layer can safely support.",
    };
  if (score <= 8)
    return {
      message:
        "This layer is creating avoidable risk. The business may still operate, but it is depending on incomplete structure, unclear responsibility, or reactive processes.",
      recommendation: "Stabilize this layer before making major growth decisions.",
    };
  if (score <= 12)
    return {
      message:
        "This layer is working, but it may not be fully ready for the next stage. The basics are in place, but growth, expansion, or external review may expose weaknesses.",
      recommendation:
        "Refine before scale. Small improvements now can prevent expensive restructuring later.",
    };
  return {
    message:
      "Your structure in this layer is supporting your ambition well. This is not the area holding you back.",
    recommendation: "Protect and review. Do not ignore it just because it is strong.",
  };
}

export function overallStatus(total: number) {
  if (total <= 18)
    return {
      status: "Infrastructure Exposed",
      message:
        "Your business ambition may be moving ahead without the structure needed to safely support it. Several layers appear reactive, unclear, or incomplete. Before making a bigger move, the priority is to strengthen the foundation.",
    };
  if (total <= 34)
    return {
      status: "Structure Under Pressure",
      message:
        "Your business has momentum, but the infrastructure underneath it is under pressure. Some areas may be working, but the structure is not yet connected enough to carry serious growth without friction.",
    };
  if (total <= 48)
    return {
      status: "Growth-Ready, But Incomplete",
      message:
        "Your business has a functional foundation, but certain layers need refinement before the next major move. The opportunity is not to rebuild everything, but to strengthen the parts that could limit scale, trust, or control.",
    };
  return {
    status: "Ambition-Ready Infrastructure",
    message:
      "Your business appears to have strong infrastructure across the main layers. The focus now is maintaining alignment, reviewing regularly, and ensuring the structure continues to serve your next level of ambition.",
  };
}

export const STRENGTH_MESSAGES: Record<LayerKey, string> = {
  corporate:
    "Your strongest layer is Corporate Infrastructure. This suggests that your business has taken its legal and operating foundation seriously. Your structure, licence, ownership, or expansion logic may already be stronger than many businesses entering or growing in the UAE.",
  financial:
    "Your strongest layer is Financial Infrastructure. This suggests that your business has better visibility, reporting discipline, tax awareness, or financial control than many businesses at your stage.",
  market:
    "Your strongest layer is Market & Mobility Infrastructure. This suggests that your UAE presence, residency pathway, Golden Visa relevance, approvals, or operating access may already be supporting your business ambition well.",
  legacy:
    "Your strongest layer is Business Legacy Infrastructure. This suggests that your business is not only operating; it is being built as a more durable commercial asset with stronger brand, documentation, continuity, or investor-readiness foundations.",
};

export const IMPROVE_MESSAGES: Record<LayerKey, string> = {
  corporate:
    "Your Corporate Infrastructure needs refinement. Your company structure, licence alignment, ownership documentation, or expansion readiness may need review before the business grows further.",
  financial:
    "Your Financial Infrastructure needs refinement. Accounting, VAT, corporate tax, reporting, banking, or growth planning may need to become more current, visible, and decision-ready.",
  market:
    "Your Market & Mobility Infrastructure needs refinement. Residency, Golden Visa relevance, approvals, hiring, banking, and regional access may need stronger alignment with your business plan.",
  legacy:
    "Your Business Legacy Infrastructure needs refinement. Brand protection, documentation, continuity, investor readiness, and long-term value structure may need to be strengthened.",
};

export const EXPOSED_MESSAGES: Record<LayerKey, string> = {
  corporate:
    "Corporate Infrastructure is your biggest gap. Your business may be operating or preparing to operate on a foundation that does not fully match its ambition. This can affect licence suitability, ownership clarity, expansion, and long-term operating flexibility.",
  financial:
    "Financial Infrastructure is your biggest gap. Your business may be compliant on the surface but not financially clear enough to support confident decisions. Reactive accounting, unclear tax position, or weak reporting can become expensive later.",
  market:
    "Market & Mobility Infrastructure is your biggest gap. Your business may exist, but its ability to operate smoothly through residency, Golden Visa pathways, approvals, hiring, banking, or GCC access may still be exposed.",
  legacy:
    "Business Legacy Infrastructure is your biggest gap. Your business may be operating, but not yet becoming a protected, transferable, investor-ready, long-term commercial asset.",
};

export const ROADMAPS: Record<LayerKey, { title: string; recommendation: string; focus: string[]; cta: string }> = {
  corporate: {
    title: "Foundation Repair",
    recommendation: "Your first priority is to review the legal and operating foundation of the business.",
    focus: ["Company structure", "Licence activity alignment", "Ownership and shareholder clarity", "Expansion flexibility", "Advisory ownership"],
    cta: "Review My Business Foundation",
  },
  financial: {
    title: "Financial Control Build",
    recommendation: "Your first priority is to make the business financially visible, compliant, and decision-ready.",
    focus: ["Accounting discipline", "VAT and corporate tax clarity", "Reporting structure", "Banking and transaction readiness", "Growth financial planning"],
    cta: "Strengthen My Financial Infrastructure",
  },
  market: {
    title: "UAE Mobility & Operating Access",
    recommendation: "Your first priority is to reduce friction around UAE presence, owner mobility, Golden Visa relevance, government processes, and operating access.",
    focus: ["Owner residency", "Golden Visa assessment", "Visa and approval process", "Hiring and team mobility", "UAE/GCC expansion access"],
    cta: "Map My UAE Mobility Pathway",
  },
  legacy: {
    title: "Business Asset & Legacy Build",
    recommendation: "Your first priority is to turn the business from an operating entity into a more durable commercial asset.",
    focus: ["Trademark and brand protection", "Documentation quality", "Continuity planning", "Partner and investor readiness", "Long-term value structure"],
    cta: "Build My Business Legacy Layer",
  },
};

export type Pathway = { name: string; message: string };

export function pickPathway(
  total: number,
  ambition: string,
  scores: Record<LayerKey, number>,
): Pathway {
  const lowest = (Object.entries(scores) as [LayerKey, number][]).sort((a, b) => a[1] - b[1])[0][0];
  const ambitionGroundwork = ["Entering the UAE or GCC market", "Setting up a new company or branch"].includes(ambition);
  const ambitionFramework = [
    "Expanding operations inside the UAE",
    "Restructuring tax, accounting, and compliance",
    "Preparing for investment, partnership, or scale",
  ].includes(ambition);
  const ambitionCornerstone = [
    "Building a long-term regional business presence",
    "Preparing for investment, partnership, or scale",
    "Building a tourism, hospitality, real estate, or service venture",
  ].includes(ambition);

  if (total > 40 && ambitionCornerstone && (scores.legacy >= 9 || scores.market >= 9)) {
    return {
      name: "Cornerstone",
      message:
        "Your business is becoming a long-term asset. The priority is to protect value, reduce dependency, strengthen external trust, and build infrastructure that can support serious growth over time.",
    };
  }
  if (total >= 30 && total <= 45 && ambitionFramework) {
    return {
      name: "Framework",
      message:
        "Your business is no longer one-dimensional. Corporate structure, financial control, mobility, and long-term value now need to work together. The priority is not one task. It is connected infrastructure.",
    };
  }
  if (total < 30 && (lowest === "corporate" || lowest === "financial") && ambitionGroundwork) {
    return {
      name: "Groundwork",
      message:
        "Your business needs a cleaner first foundation before wider growth. The priority is to build the company, compliance, identity, and financial basics correctly from the beginning.",
    };
  }
  // Defaults by total
  if (total < 30)
    return {
      name: "Groundwork",
      message:
        "Your business needs a cleaner first foundation before wider growth. The priority is to build the company, compliance, identity, and financial basics correctly from the beginning.",
    };
  if (total <= 45)
    return {
      name: "Framework",
      message:
        "Your business is no longer one-dimensional. Corporate structure, financial control, mobility, and long-term value now need to work together. The priority is not one task. It is connected infrastructure.",
    };
  return {
    name: "Cornerstone",
    message:
      "Your business is becoming a long-term asset. The priority is to protect value, reduce dependency, strengthen external trust, and build infrastructure that can support serious growth over time.",
  };
}

export function detectPatterns(
  scores: Record<LayerKey, number>,
  ambition: string,
  c5Score: number,
): { title: string; message: string }[] {
  const out: { title: string; message: string }[] = [];
  const fastAmbitions = [
    "Entering the UAE or GCC market",
    "Setting up a new company or branch",
    "Expanding operations inside the UAE",
    "Preparing for investment, partnership, or scale",
  ];
  if (scores.corporate < 8 && fastAmbitions.includes(ambition))
    out.push({
      title: "Fast Ambition, Weak Foundation",
      message:
        "You may be moving faster than your foundation. The next move may be commercially exciting, but the structure may not yet be strong enough to support it safely.",
    });
  if (scores.financial < 8)
    out.push({
      title: "Revenue Without Visibility",
      message:
        "Your business may be earning without seeing clearly. Revenue can hide weakness. Without current accounting, tax clarity, and decision-ready reporting, the business may grow without control.",
    });
  if (scores.market < 8)
    out.push({
      title: "Presence Without Mobility",
      message:
        "Your UAE presence may not yet be operationally smooth. The company may exist, but owners, visas, banking, approvals, hiring, or Golden Visa pathways may still create friction.",
    });
  if (scores.legacy < 8)
    out.push({
      title: "Operation Without Asset Value",
      message:
        "Your business may be operating, but not yet becoming an asset. A valuable business is not only measured by revenue. It is also measured by protected identity, clean documents, continuity, investor confidence, and transferability.",
    });
  const lowLayers = (Object.values(scores) as number[]).filter((s) => s < 9).length;
  if (c5Score <= 1 && lowLayers >= 2)
    out.push({
      title: "Fragmented Provider Risk",
      message:
        "Your business may be managed in pieces. Registration, accounting, visas, tax, and compliance may be handled by different people, but no one owns the full infrastructure picture.",
    });
  return out;
}
