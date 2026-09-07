import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import tariq from "@/assets/tariq-azeemi.jpeg";
import suresh from "@/assets/suresh-kumar.jpg";
import zaim from "@/assets/zaim.jpg";

export type Leader = {
  name: string;
  role: string;
  tag: string;
  shortBio: string;
  fullBio: string[];
  image: string;
  accent: "berry" | "azure";
};

export const LEADERS: Leader[] = [
  {
    name: "Tariq Azeemi",
    role: "Partner",
    tag: "",
    shortBio:
      "A dynamic, results-driven entrepreneur with 15+ years across retail banking, corporate services, and cross-border business structuring in Pakistan and the UAE.",
    fullBio: [
      "Tariq is a dynamic, results-driven entrepreneur with years of progressive experience. He is a performance-driven, insightful, high-potential professional with comprehensive experience as a business consultant — directing sales, customer services, business strategy, planning, and development.",
      "He has over 15 years of experience ranging from Retail Sales Network Supervision to Retail Banking and Corporate Services in Pakistan and the UAE.",
      "His expertise spans advisory on all legal forms of businesses, including Sole Proprietor Companies, Limited Liability Companies, Partnership Companies, Free Zone Companies, and Offshore Companies — followed by structuring and re-structuring of legal entities, setting up holding companies, and branch companies.",
      "His role includes helping companies incorporate their businesses in the UAE and GCC by assisting them in obtaining licenses from the relevant regulatory authorities.",
    ],
    image: tariq,
    accent: "berry",
  },
  {
    name: "Suresh Kumar",
    role: "Partner",
    tag: "",
    shortBio:
      "Brings 12+ years in Corporate Services across Free Zone, Mainland DED, and Offshore jurisdictions — with deep expertise in medical-establishment setups across Dubai.",
    fullBio: [
      "Suresh Kumar joined Red Berry Corporate Services Provider — Dubai as a Partner. He brings with him more than 6 years of experience in Corporate Services, assisting investors to set up companies in Free Zone, Mainland DED, and he is an expert in setting up Offshore Companies in Dubai and other reputed international offshore jurisdictions.",
      "He has provided Director services to companies registered in the UAE and holds 18 years of Pharma sales experience.",
      "He holds a Bachelor's Degree from Calicut University, Kerala, India. He has a special interest in setting up Dental Clinics, Poly Clinics, and other medical establishments in Dubai Mainland and Free Zones.",
    ],
    image: suresh,
    accent: "azure",
  },
  {
    name: "Muhammad Zaim",
    role: "Chief Operations Officer",
    tag: "",
    shortBio:
      "A self-driven tourism professional with 20+ years in Hospitality, Travel & Tourism across the Middle East, Africa & Europe — delivering bespoke FIT, Groups & MICE experiences worldwide.",
    fullBio: [
      "Muhammad Zaim is a self-driven tourism passionate with more than 20 years of experience in Hospitality, Travel & Tourism across the Middle East, Africa & Europe.",
      "He holds MA English (PAK), LLB (PAK), MBA (UK), and an Associate Master's in Hospitality (USA).",
      "Zaim served as a Sales & Marketing professional in well-known 5 Star hotels across Saudi Arabia & the United Arab Emirates.",
      "For the past 6 years, he has been working as a Tourism Consultant, giving bespoke experiences to clients all over the world. His expertise spans not only FIT Business but also Groups & MICE Business across the globe.",
    ],
    image: zaim,
    accent: "azure",
  },
];

export function LeadershipSection() {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);

  return (
    <section className="relative overflow-hidden bg-[oklch(0.16_0.03_250)] text-white">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(800px 500px at 10% 20%, oklch(0.45 0.18 25 / 0.25), transparent 60%), radial-gradient(700px 500px at 90% 80%, oklch(0.55 0.16 245 / 0.22), transparent 60%)",
        }}
      />

      <div className="container-rb relative py-20 md:py-28">
        <div className="max-w-3xl mb-16 md:mb-24">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--azure-soft)" }}>
            The People Behind Red Berry
          </p>
          <h2 className="text-4xl md:text-6xl font-display leading-[1.05] text-white mb-5">
            Leadership
          </h2>
          <p className="text-lg text-white/65 leading-relaxed max-w-2xl">
            A small, senior team built to handle the cross-border complexity ambitious operators face in the GCC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {LEADERS.map((leader, idx) => (
            <LeaderCard
              key={leader.name}
              leader={leader}
              index={idx}
              onOpen={() => setActiveLeader(leader)}
            />
          ))}
        </div>

        <div className="mt-20 md:mt-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <div>
            <h3 className="text-2xl md:text-3xl font-display text-white">Work with the team directly.</h3>
            <p className="mt-2 text-white/60 max-w-lg">
              Every engagement is led by a partner. Start with a confidential conversation about what you are building.
            </p>
          </div>
          <Link
            to="/about/contact"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all shrink-0"
            style={{ background: "var(--gradient-berry)" }}
          >
            Talk To An Advisor
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {activeLeader && (
        <LeaderDialog leader={activeLeader} onClose={() => setActiveLeader(null)} />
      )}
    </section>
  );
}

function LeaderCard({
  leader,
  index,
  onOpen,
}: {
  leader: Leader;
  index: number;
  onOpen: () => void;
}) {
  const accentColor = leader.accent === "berry" ? "var(--berry)" : "var(--azure)";
  const offsetClass = index === 1 ? "md:mt-16" : index === 2 ? "md:mt-8" : "";

  return (
    <div className={`group relative flex flex-col ${offsetClass}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-ink border-l border-t border-white/10">
        <img
          src={leader.image}
          alt={`Portrait of ${leader.name}`}
          width={1024}
          height={1344}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" aria-hidden />
       
        <div
          className="absolute -left-[1px] top-10 w-[2px] h-20 group-hover:h-32 transition-all duration-500"
          style={{ background: accentColor }}
          aria-hidden
        />
      </div>

      <div className="mt-[-48px] z-10 pl-6 pr-2">
        <span
          className="block text-[10px] uppercase tracking-[0.3em] font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: accentColor }}
        >
          {leader.tag}
        </span>
        <h3 className="text-white text-4xl md:text-5xl font-display uppercase leading-none mb-1">
          {leader.name.split(" ").map((part) => (
            <span key={part} className="block">
              {part}
            </span>
          ))}
        </h3>
        <p
          className="text-sm font-semibold tracking-wider uppercase mb-4 italic"
          style={{ color: accentColor }}
        >
          {leader.role}
        </p>

        {/* Scrollable bio teaser */}
        <div
          className="relative max-h-[140px] overflow-y-auto pr-3 border-l border-white/10 pl-4 py-1 leadership-scroller"
          style={{ scrollbarWidth: "thin" }}
        >
          <p className="text-white/65 text-sm leading-relaxed">{leader.shortBio}</p>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] font-semibold pb-1 border-b transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          Read Full Bio
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function LeaderDialog({ leader, onClose }: { leader: Leader; onClose: () => void }) {
  const accentColor = leader.accent === "berry" ? "var(--berry)" : "var(--azure)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${leader.name} biography`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-auto bg-[oklch(0.16_0.03_250)] border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[2fr_3fr] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[480px] overflow-hidden">
          <img
            src={leader.image}
            alt={`Portrait of ${leader.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden />
          <div
            className="absolute left-0 top-12 w-[3px] h-28"
            style={{ background: accentColor }}
            aria-hidden
          />
        </div>

        <div className="flex flex-col max-h-[70vh] md:max-h-none">
          <div className="px-7 md:px-10 pt-10 pb-5 border-b border-white/10">
            <span
              className="block text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
              style={{ color: accentColor }}
            >
              {leader.tag}
            </span>
            <h3 className="text-white text-3xl md:text-4xl font-display uppercase leading-[1.05] mb-2">
              {leader.name}
            </h3>
            <p
              className="text-sm font-semibold tracking-wider uppercase italic"
              style={{ color: accentColor }}
            >
              {leader.role}
            </p>
          </div>

          <div className="overflow-y-auto px-7 md:px-10 py-7 leadership-scroller flex-1">
            <div className="space-y-5">
              {leader.fullBio.map((para, i) => (
                <p key={i} className="text-white/75 text-[15px] leading-[1.75]">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .leadership-scroller::-webkit-scrollbar { width: 6px; }
        .leadership-scroller::-webkit-scrollbar-track { background: transparent; }
        .leadership-scroller::-webkit-scrollbar-thumb {
          background: oklch(0.45 0.18 25 / 0.5);
          border-radius: 3px;
        }
        .leadership-scroller::-webkit-scrollbar-thumb:hover {
          background: oklch(0.45 0.18 25 / 0.8);
        }
      `}</style>
    </div>
  );
}
