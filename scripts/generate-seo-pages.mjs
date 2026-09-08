import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const INDEX_FILE = path.join(DIST_DIR, "index.html");

const SITE_URL = "https://redberry.ae";
const OG_IMAGE = `${SITE_URL}/og-image1.jpg`;

const SEO_CONFIG = {
  "/": {
    title: "Red Berry | Ambition Infrastructure for the UAE & GCC",
    description:
      "Red Berry builds the corporate, financial, sovereign and legacy infrastructure ambitious founders, investors and families need to build in the UAE.",
  },

  // Outcome Pages
  "/launch-a-business": {
    title: "Launch a Business in the UAE | Red Berry",
    description:
      "Set up in the UAE on foundations built to hold. Licence, structure, banking and residency handled as one build, not a checklist. Start with clarity.",
  },

  "/expand-into-gcc": {
    title: "Expand Into the GCC | Red Berry",
    description:
      "Take a proven business into Saudi, Qatar and the wider GCC. Entity structure, licensing and local requirements mapped before you commit capital.",
  },

  "/grow-and-protect-wealth": {
    title: "Grow & Protect Wealth in the UAE | Red Berry",
    description:
      "Wealth needs architecture as much as it needs returns. Structures that let capital grow in the UAE while staying protected across borders and time.",
  },

  "/create-family-security": {
    title: "Create Family Security | Red Berry",
    description:
      "Security for a family is a structure, not a sentiment. Residency, succession and asset protection arranged so the people you build for stay covered.",
  },

  "/increase-global-freedom": {
    title: "Increase Global Freedom | Red Berry",
    description:
      "Freedom of movement is engineered. Residency, second citizenship and tax positioning in the UAE, built to widen where you can live, bank and travel.",
  },

  "/build-a-hospitality-venture": {
    title: "Build a Hospitality Venture in the UAE | Red Berry",
    description:
      "Hospitality in the UAE rewards operators who structure early. Licensing, permits, ownership and compliance built for a venture meant to last.",
  },

  // Capability Pages
  "/foundation-build": {
    title: "Foundation Build | Red Berry",
    description:
      "The first structure everything else rests on. Company formation, licensing and residency in the UAE, built once and built to carry what comes next.",
  },

  "/financial-infrastructure": {
    title: "Financial Infrastructure | Red Berry",
    description:
      "Banking, treasury and compliance arranged so money moves without friction. The financial rails ambitious businesses in the UAE and GCC run on.",
  },

  "/wealth-structure-design": {
    title: "Wealth Structure Design | Red Berry",
    description:
      "Holding companies, foundations and trusts designed around your assets and intentions. Wealth structuring in the UAE for founders and families.",
  },

  "/identity-foundation": {
    title: "Identity Foundation | Red Berry",
    description:
      "Residency, visas and status form the base layer of everything you build. Identity structured in the UAE so your position is secure before you scale.",
  },

  "/venture-architecture": {
    title: "Venture Architecture | Red Berry",
    description:
      "Design a venture that can take investment, partners and growth. Ownership, entities and governance shaped before the pressure of scale arrives.",
  },

  "/sovereign-freedom": {
    title: "Sovereign Freedom | Red Berry",
    description:
      "Citizenship, residency and jurisdiction chosen deliberately. Sovereign positioning that gives founders real optionality over where they live and hold.",
  },

  "/legacy-life-architecture": {
    title: "Legacy & Life Architecture | Red Berry",
    description:
      "What outlasts you should be designed, not left to chance. Succession, governance and legacy planning for families building across generations.",
  },

  // About Pages
  "/about/leadership": {
    title: "Leadership | Red Berry",
    description:
      "The people behind Red Berry. Advisors who have built, structured and protected businesses across the UAE and GCC, and now do it for other founders.",
  },

  "/about/why-red-berry-exists": {
    title: "Why We Exist | Red Berry",
    description:
      "Ambition in the UAE fails on structure, not on ideas. Why Red Berry was built to give founders, investors and families infrastructure worth trusting.",
  },

  "/about/contact": {
    title: "Contact Red Berry | UAE & GCC Advisory",
    description:
      "Start a conversation about what you are building. Red Berry works with founders, investors and families establishing themselves in the UAE and GCC.",
  },
};

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function replaceTitle(html, title) {
  return html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`
  );
}

function replaceMeta(html, attribute, key, content) {
  const escapedContent = escapeHtml(content);

  const regex = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${escapeRegex(key)}["'][^>]*\\/?>`,
    "i"
  );

  const replacement = `<meta ${attribute}="${key}" content="${escapedContent}" />`;

  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }

  return html.replace(
    /<\/head>/i,
    `    ${replacement}\n  </head>`
  );
}

function replaceCanonical(html, url) {
  const escapedUrl = escapeHtml(url);

  const regex =
    /<link\s+[^>]*rel=["']canonical["'][^>]*\/?>/i;

  const replacement =
    `<link rel="canonical" href="${escapedUrl}" />`;

  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }

  return html.replace(
    /<\/head>/i,
    `    ${replacement}\n  </head>`
  );
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildHtml(baseHtml, route, seo) {
  const url = `${SITE_URL}${route === "/" ? "/" : route}`;

  let html = baseHtml;

  // Basic SEO
  html = replaceTitle(html, seo.title);

  html = replaceMeta(
    html,
    "name",
    "description",
    seo.description
  );

  // Canonical
  html = replaceCanonical(html, url);

  // Open Graph
  html = replaceMeta(html, "property", "og:type", "website");
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:title", seo.title);
  html = replaceMeta(
    html,
    "property",
    "og:description",
    seo.description
  );
  html = replaceMeta(
    html,
    "property",
    "og:image",
    OG_IMAGE
  );
  html = replaceMeta(
    html,
    "property",
    "og:image:alt",
    seo.title
  );
  html = replaceMeta(
    html,
    "property",
    "og:site_name",
    "Red Berry"
  );

  // Twitter
  html = replaceMeta(
    html,
    "name",
    "twitter:card",
    "summary_large_image"
  );

  html = replaceMeta(
    html,
    "name",
    "twitter:url",
    url
  );

  html = replaceMeta(
    html,
    "name",
    "twitter:title",
    seo.title
  );

  html = replaceMeta(
    html,
    "name",
    "twitter:description",
    seo.description
  );

  html = replaceMeta(
    html,
    "name",
    "twitter:image",
    OG_IMAGE
  );

  html = replaceMeta(
    html,
    "name",
    "twitter:image:alt",
    seo.title
  );

  return html;
}

function generateSeoPages() {
  console.log("");
  console.log("==========================================");
  console.log(" Red Berry SEO HTML Generator");
  console.log("==========================================");
  console.log("");

  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(
      `dist directory does not exist: ${DIST_DIR}`
    );
  }

  if (!fs.existsSync(INDEX_FILE)) {
    throw new Error(
      `dist/index.html does not exist: ${INDEX_FILE}`
    );
  }

  const baseHtml = fs.readFileSync(INDEX_FILE, "utf8");

  let generated = 0;

  for (const [route, seo] of Object.entries(SEO_CONFIG)) {
    // Homepage is already dist/index.html.
    if (route === "/") {
      continue;
    }

    const routeWithoutLeadingSlash = route.replace(/^\/+/, "");

    const outputDirectory = path.join(
      DIST_DIR,
      routeWithoutLeadingSlash
    );

    const outputFile = path.join(
      outputDirectory,
      "index.html"
    );

    fs.mkdirSync(outputDirectory, {
      recursive: true,
    });

    const html = buildHtml(
      baseHtml,
      route,
      seo
    );

    fs.writeFileSync(
      outputFile,
      html,
      "utf8"
    );

    generated++;

    console.log(`✓ ${route}`);
    console.log(`  → ${path.relative(ROOT_DIR, outputFile)}`);
  }

  console.log("");
  console.log(
    `Generated ${generated} SEO pages successfully.`
  );
  console.log("");
}

try {
  generateSeoPages();
} catch (error) {
  console.error("");
  console.error("SEO page generation failed.");
  console.error(error);
  console.error("");
  process.exit(1);
}