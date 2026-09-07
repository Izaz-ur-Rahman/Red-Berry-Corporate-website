import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Sparkles,
  Layers,
  Building2,
  LineChart,
  Plane,
Landmark,
  Download,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  AMBITION_OPTIONS,
  SITUATION_OPTIONS,
  PRESSURE_Q1,
  PRESSURE_Q2,
  QUESTIONS,
  LAYERS,
  layerLabel,
  layerMessage,
  overallStatus,
  STRENGTH_MESSAGES,
  IMPROVE_MESSAGES,
  EXPOSED_MESSAGES,
  ROADMAPS,
  detectPatterns,
  pickPathway,
  type LayerKey,
} from "./data";
import { downloadBlueprintPdf } from "./pdf";
import { submitBlueprint, type BlueprintSubmission } from "@/services/blueprintApi";
import { RECAPTCHA_SITE_KEY, RECAPTCHA_CONFIG } from "@/lib/recaptcha";

type Step =
  | "welcome"
  | "how"
  | "ambition"
  | "situation"
  | "pressure1"
  | "pressure2"
  | "pressureReveal"
  | "layerIntro"
  | "question"
  | "layerDone"
  | "complete"
  | "contact"
  | "result";

const LAYER_ICONS: Record<LayerKey, typeof Building2> = {
  corporate: Building2,
  financial: LineChart,
  market: Plane,
  legacy: Landmark,
};

function BlueprintToolInner() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [step, setStep] = useState<Step>("welcome");
  const [ambition, setAmbition] = useState<string>("");
  const [situation, setSituation] = useState<string>("");
  const [pressure, setPressure] = useState<{ q1: number | null; q2: number | null }>({ q1: null, q2: null });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [layerIdx, setLayerIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0); // 0..4 within current layer
  const [contact, setContact] = useState({
    name: "", email: "", whatsapp: "", company: "", location: "",
    stage: "", review: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const layerQuestions = (k: LayerKey) => QUESTIONS.filter((q) => q.layer === k);
  const currentLayer = LAYERS[layerIdx];
  const currentQs = currentLayer ? layerQuestions(currentLayer.key) : [];
  const currentQ = currentQs[qIdx];

  const scores: Record<LayerKey, number> = useMemo(() => {
    const s: Record<LayerKey, number> = { corporate: 0, financial: 0, market: 0, legacy: 0 };
    for (const q of QUESTIONS) {
      const v = answers[q.id];
      if (typeof v === "number") s[q.layer] += v;
    }
    return s;
  }, [answers]);

  const total = scores.corporate + scores.financial + scores.market + scores.legacy;

  // progress calculation
  const totalSteps = 2 + 2 + 20; // ambition+situation, pressure1+pressure2, 20 questions
  const completedSteps =
    (ambition ? 1 : 0) + (situation ? 1 : 0) +
    (pressure.q1 !== null ? 1 : 0) + (pressure.q2 !== null ? 1 : 0) +
    Object.keys(answers).length;
  const progress = Math.min(100, Math.round((completedSteps / totalSteps) * 100));

  const pressureScore = (pressure.q1 ?? 0) + (pressure.q2 ?? 0);
  const pressureLabel = pressureScore <= 3 ? "Low" : pressureScore <= 5 ? "Moderate" : "High";

  const result = useMemo(() => {
    const entries = (Object.entries(scores) as [LayerKey, number][]);
    const strongest = entries.slice().sort((a, b) => b[1] - a[1])[0][0];
    const exposed = entries.slice().sort((a, b) => a[1] - b[1])[0][0];
    const improvements = entries.filter(([, v]) => v >= 5 && v <= 12).map(([k]) => k);
    const patterns = detectPatterns(scores, ambition, answers["c5"] ?? 3);
    const pathway = pickPathway(total, ambition, scores);
    return { strongest, exposed, improvements, patterns, pathway };
  }, [scores, ambition, answers, total]);

  const goNext = () => {
    if (step === "welcome") setStep("how");
    else if (step === "how") setStep("ambition");
    else if (step === "ambition") setStep("situation");
    else if (step === "situation") setStep("pressure1");
    else if (step === "pressure1") setStep("pressure2");
    else if (step === "pressure2") setStep("pressureReveal");
    else if (step === "pressureReveal") { setLayerIdx(0); setQIdx(0); setStep("layerIntro"); }
    else if (step === "layerIntro") setStep("question");
    else if (step === "question") {
      if (qIdx < currentQs.length - 1) setQIdx(qIdx + 1);
      else setStep("layerDone");
    }
    else if (step === "layerDone") {
      if (layerIdx < LAYERS.length - 1) { setLayerIdx(layerIdx + 1); setQIdx(0); setStep("layerIntro"); }
      else setStep("complete");
    }
    else if (step === "complete") setStep("contact");
    else if (step === "contact") setStep("result");
  };

  const goBack = () => {
    if (step === "how") setStep("welcome");
    else if (step === "ambition") setStep("how");
    else if (step === "situation") setStep("ambition");
    else if (step === "pressure1") setStep("situation");
    else if (step === "pressure2") setStep("pressure1");
    else if (step === "pressureReveal") setStep("pressure2");
    else if (step === "layerIntro") {
      if (layerIdx === 0) setStep("pressureReveal");
      else { setLayerIdx(layerIdx - 1); setStep("layerDone"); }
    }
    else if (step === "question") {
      if (qIdx > 0) setQIdx(qIdx - 1);
      else setStep("layerIntro");
    }
    else if (step === "layerDone") { setQIdx(currentQs.length - 1); setStep("question"); }
  };

  const handleContactSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Check if reCAPTCHA is ready
      if (!executeRecaptcha) {
        setSubmitError("reCAPTCHA not ready. Please refresh the page and try again.");
        setIsSubmitting(false);
        return;
      }

      // Generate reCAPTCHA token with proper action
      console.log("=== reCAPTCHA v3 Token Generation (Blueprint) ===");
      console.log("Site Key:", RECAPTCHA_SITE_KEY.substring(0, 15) + "..." + RECAPTCHA_SITE_KEY.substring(RECAPTCHA_SITE_KEY.length - 10));
      console.log("Action: blueprint");
      console.log("executeRecaptcha available:", !!executeRecaptcha);
      
      const captchaToken = await executeRecaptcha("blueprint");
      
      console.log("✅ Token generated successfully");
      console.log("Token length:", captchaToken.length);
      console.log("Token (first 30 chars):", captchaToken.substring(0, 30) + "...");
      console.log("Token (last 30 chars):", "..." + captchaToken.substring(captchaToken.length - 30));
      console.log("Token type:", typeof captchaToken);
      console.log("Full token:", captchaToken);

      // Map stage and review method to numeric values according to API documentation
      const stageMap: Record<string, number> = {
        "Idea / Planning": 1,           // IdeaPlanning
        "New Setup": 2,                 // NewSetup
        "Operating": 3,                 // Operating
        "Scaling": 4,                   // Scaling
        "Restructuring": 5,             // Restructuring
        "Preparing for Investment": 6,  // PreparingForInvestment
      };

      const reviewMap: Record<string, number> = {
        "WhatsApp": 1,          // WhatsApp
        "Phone Call": 2,        // PhoneCall
        "Private Meeting": 3,   // PrivateMeeting
      };

      // Prepare the submission data
      const submission: BlueprintSubmission = {
        name: contact.name,
        email: contact.email,
        whatsapp: contact.whatsapp,
        company: contact.company,
        location: contact.location || "",
        businessStage: stageMap[contact.stage] || 0,
        reviewMethod: reviewMap[contact.review] || 0,
        message: contact.message || "",
        CaptchaToken: captchaToken, // Backend expects "CaptchaToken" with capital C
        result: {
          ambition: ambition,
          totalScore: total,
          corporateScore: scores.corporate,
          financialScore: scores.financial,
          marketScore: scores.market,
          legacyScore: scores.legacy,
          strongestLayer: LAYERS.find(l => l.key === result.strongest)?.title || "",
          exposedLayer: LAYERS.find(l => l.key === result.exposed)?.title || "",
          improvementLayers: result.improvements.map(k => LAYERS.find(l => l.key === k)?.title || ""),
          recommendedPathway: result.pathway.name,
          overallStatus: overallStatus(total).status,
          patterns: result.patterns.map(p => ({
            title: p.title,
            description: p.message,
          })),
        },
      };

      // ===== COMPREHENSIVE FORM DATA LOGGING =====
      console.log("╔═══════════════════════════════════════════════════════════════╗");
      console.log("║          BLUEPRINT FORM SUBMISSION - ALL DATA                 ║");
      console.log("╚═══════════════════════════════════════════════════════════════╝");
      console.log("");
      
      console.log("📝 CONTACT INFORMATION:");
      console.log("  Name:", contact.name);
      console.log("  Email:", contact.email);
      console.log("  WhatsApp:", contact.whatsapp);
      console.log("  Company:", contact.company);
      console.log("  Location:", contact.location);
      console.log("  Business Stage:", contact.stage, `(Mapped to: ${stageMap[contact.stage]})`);
      console.log("  Review Method:", contact.review, `(Mapped to: ${reviewMap[contact.review]})`);
      console.log("  Message:", contact.message);
      console.log("");
      
      console.log("🎯 AMBITION & SITUATION:");
      console.log("  Ambition:", ambition);
      console.log("  Situation:", situation);
      console.log("");
      
      console.log("💪 PRESSURE SCORES:");
      console.log("  Pressure Q1:", pressure.q1);
      console.log("  Pressure Q2:", pressure.q2);
      console.log("  Total Pressure Score:", pressureScore);
      console.log("  Pressure Level:", pressureLabel);
      console.log("");
      
      console.log("📊 LAYER SCORES:");
      console.log("  Corporate Layer:", scores.corporate, "/20");
      console.log("  Financial Layer:", scores.financial, "/20");
      console.log("  Market/Mobility Layer:", scores.market, "/20");
      console.log("  Legacy Layer:", scores.legacy, "/20");
      console.log("  TOTAL SCORE:", total, "/80");
      console.log("");
      
      console.log("🔍 ANALYSIS RESULTS:");
      console.log("  Strongest Layer:", LAYERS.find(l => l.key === result.strongest)?.title);
      console.log("  Most Exposed Layer:", LAYERS.find(l => l.key === result.exposed)?.title);
      console.log("  Improvement Needed:", result.improvements.map(k => LAYERS.find(l => l.key === k)?.title).join(", ") || "None");
      console.log("  Recommended Pathway:", result.pathway.name);
      console.log("  Overall Status:", overallStatus(total).status);
      console.log("");
      
      console.log("🎨 DETECTED PATTERNS:");
      result.patterns.forEach((pattern, idx) => {
        console.log(`  Pattern ${idx + 1}:`);
        console.log(`    - Title: ${pattern.title}`);
        console.log(`    - Message: ${pattern.message}`);
      });
      console.log("");
      
      console.log("❓ ALL QUESTION ANSWERS:");
      Object.entries(answers).forEach(([questionId, score]) => {
        const question = QUESTIONS.find(q => q.id === questionId);
        if (question) {
          console.log(`  ${questionId} (${LAYERS.find(l => l.key === question.layer)?.title}):`, score, "/4");
          console.log(`    Question: ${question.prompt}`);
        }
      });
      console.log("");
      
      console.log("📦 COMPLETE SUBMISSION PAYLOAD:");
      console.log(JSON.stringify(submission, null, 2));
      console.log("");
      console.log("═══════════════════════════════════════════════════════════════");

      console.log("=== API Request Payload (Blueprint) ===");
      console.log("Endpoint: /Blueprint/create");
      console.log("Payload keys:", Object.keys(submission));
      console.log("Has CaptchaToken property:", 'CaptchaToken' in submission);
      console.log("CaptchaToken value type:", typeof submission.CaptchaToken);
      console.log("CaptchaToken matches original:", submission.CaptchaToken === captchaToken);

      // Submit to API
      console.log("Submitting blueprint to API...");
      const response = await submitBlueprint(submission);

      if (response.success) {
        // Success - proceed to result screen
        console.log("Blueprint submitted successfully");
        setStep("result");
      } else {
        setSubmitError(response.message || "Failed to submit blueprint. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting blueprint:", error);
      setSubmitError("An error occurred while submitting your blueprint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();
  const goBackPage = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen relative" style={{ background: "var(--gradient-base)" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container-rb flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            {step === "welcome" && (
              <button
                onClick={goBackPage}
                className="inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "var(--berry)" }} />
              <span className="font-display tracking-tight">Ambition Infrastructure Blueprint</span>
            </div>
          </div>
          {step !== "welcome" && step !== "how" && step !== "result" && (
            <div className="hidden sm:flex items-center gap-3 w-72">
              <div className="flex-1 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-berry)" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-xs text-foreground/60 tabular-nums">{progress}%</span>
            </div>
          )}
        </div>
      </div>

      <div className="container-rb py-10 md:py-16">
        <AnimatePresence mode="wait">
          {step === "welcome" && <Welcome key="w" onStart={() => setStep("how")} />}
          {step === "how" && <HowItWorks key="h" onStart={() => setStep("ambition")} onBack={goBack} />}

          {step === "ambition" && (
            <ChoiceScreen
              key="amb"
              eyebrow="Business Ambition"
              title="What serious move is your business preparing for?"
              options={AMBITION_OPTIONS}
              selected={ambition}
              onSelect={(v) => { setAmbition(v); setTimeout(goNext, 250); }}
              onBack={goBack}
            />
          )}
          {step === "situation" && (
            <ChoiceScreen
              key="sit"
              eyebrow="Current Situation"
              title="Which statement feels closest to your current situation?"
              options={SITUATION_OPTIONS}
              selected={situation}
              onSelect={(v) => { setSituation(v); setTimeout(goNext, 250); }}
              onBack={goBack}
            />
          )}

          {step === "pressure1" && (
            <ScoredChoice
              key="p1"
              eyebrow="Structural Pressure Check · 1 of 2"
              title="What is creating the most pressure right now?"
              options={PRESSURE_Q1}
              selected={pressure.q1}
              onSelect={(score) => { setPressure((p) => ({ ...p, q1: score })); setTimeout(goNext, 250); }}
              onBack={goBack}
            />
          )}
          {step === "pressure2" && (
            <ScoredChoice
              key="p2"
              eyebrow="Structural Pressure Check · 2 of 2"
              title="What would be most costly if it went wrong?"
              options={PRESSURE_Q2}
              selected={pressure.q2}
              onSelect={(score) => { setPressure((p) => ({ ...p, q2: score })); setTimeout(goNext, 250); }}
              onBack={goBack}
            />
          )}

          {step === "pressureReveal" && (
            <PressureReveal key="pr" level={pressureLabel} onNext={goNext} onBack={goBack} />
          )}

          {step === "layerIntro" && currentLayer && (
            <LayerIntro
              key={`li-${currentLayer.key}`}
              index={layerIdx}
              layer={currentLayer}
              onNext={goNext}
              onBack={goBack}
            />
          )}

          {step === "question" && currentLayer && currentQ && (
            <QuestionCard
              key={currentQ.id}
              layerTitle={currentLayer.title}
              layerKey={currentLayer.key}
              questionIdx={qIdx}
              totalInLayer={currentQs.length}
              prompt={currentQ.prompt}
              options={currentQ.options}
              selected={answers[currentQ.id] ?? null}
              onSelect={(score) => {
                setAnswers((a) => ({ ...a, [currentQ.id]: score }));
                setTimeout(goNext, 260);
              }}
              onBack={goBack}
            />
          )}

          {step === "layerDone" && currentLayer && (
            <LayerCheckpoint
              key={`done-${currentLayer.key}`}
              layer={currentLayer}
              layerIdx={layerIdx}
              onNext={goNext}
            />
          )}

          {step === "complete" && (
            <Unlocking key="unlock" onNext={() => setStep("contact")} />
          )}

          {step === "contact" && (
            <ContactScreen
              key="contact"
              contact={contact}
              setContact={setContact}
              onSubmit={handleContactSubmit}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}

          {step === "result" && (
            <ResultDashboard
              key="result"
              scores={scores}
              total={total}
              contact={contact}
              ambition={ambition}
              {...result}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============== Screen Components ============== */

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35 },
};

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <motion.div {...fade} className="max-w-4xl mx-auto text-center pt-6 md:pt-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs tracking-[0.18em] uppercase text-foreground/70">
        <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--berry)" }} />
        Private Infrastructure Diagnostic
      </div>
      <h1 className="mt-6 text-4xl md:text-6xl font-display text-gradient leading-[1.05]">
        Your ambition may be clear.<br />But is your structure ready to carry it?
      </h1>
      <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
        Most businesses do not struggle because the ambition is weak. They struggle because the
        structure underneath the ambition was not built clearly enough.
      </p>
      <p className="mt-4 text-foreground/65 max-w-2xl mx-auto">
        This private diagnostic maps your business across four infrastructure layers: corporate
        structure, financial control, UAE/GCC market mobility, and business legacy. In a few minutes,
        you will see where your business is strong, where it needs refinement, and where it may be exposed.
      </p>
      <button
        onClick={onStart}
        className="mt-10 group inline-flex items-center gap-2 px-7 py-4 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
        style={{ background: "var(--gradient-berry)" }}
      >
        Start My Blueprint
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      <p className="mt-6 text-xs tracking-wide text-foreground/55">
        Built for founders, investors, entrepreneurs, and business owners preparing for their next serious move.
      </p>
    </motion.div>
  );
}

function HowItWorks({ onStart, onBack }: { onStart: () => void; onBack: () => void }) {
  const steps = [
    { icon: CheckCircle2, title: "Answer guided questions", desc: "One question at a time. Each click sharpens the picture." },
    { icon: Layers, title: "Map your infrastructure layers", desc: "Corporate, Financial, Market & Mobility, Legacy." },
    { icon: ShieldCheck, title: "Discover hidden gaps", desc: "See the structural risks behind your ambition." },
    { icon: Download, title: "Receive your branded Blueprint", desc: "A private PDF, ready to download and review." },
  ];
  return (
    <motion.div {...fade} className="max-w-5xl mx-auto">
      <BackBtn onBack={onBack} />
      <h2 className="text-3xl md:text-5xl font-display text-gradient text-center">How it works</h2>
      <p className="mt-4 text-center text-foreground/65 max-w-2xl mx-auto">
        This is not a quote form. It is a business infrastructure diagnostic designed to help you
        see what your ambition needs next.
      </p>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative p-6 rounded-2xl glass border border-border/60 shadow-[var(--shadow-soft)]"
          >
            <div className="absolute -top-3 left-5 text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-full" style={{ background: "var(--gradient-berry)", color: "white" }}>
              Step {i + 1}
            </div>
            <s.icon className="h-7 w-7" style={{ color: "var(--berry)" }} />
            <div className="mt-4 font-display text-lg">{s.title}</div>
            <p className="mt-1.5 text-sm text-foreground/65">{s.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
          style={{ background: "var(--gradient-berry)" }}
        >
          Architect My Blueprint
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

function BackBtn({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="mb-6 inline-flex items-center gap-1.5 text-xs tracking-wide uppercase text-foreground/55 hover:text-foreground transition"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back
    </button>
  );
}

function ChoiceScreen({
  eyebrow, title, options, selected, onSelect, onBack,
}: {
  eyebrow: string; title: string; options: string[]; selected: string;
  onSelect: (v: string) => void; onBack: () => void;
}) {
  return (
    <motion.div {...fade} className="max-w-3xl mx-auto">
      <BackBtn onBack={onBack} />
      <div className="text-xs tracking-[0.2em] uppercase text-foreground/55">{eyebrow}</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-display text-foreground">{title}</h2>
      <div className="mt-8 space-y-3">
        {options.map((opt, i) => {
          const isSel = selected === opt;
          return (
            <motion.button
              key={opt}
              whileHover={{ x: 4 }}
              onClick={() => onSelect(opt)}
              className={`w-full text-left p-5 rounded-xl border transition-all flex items-center gap-4 group ${
                isSel
                  ? "border-primary/60 shadow-[var(--shadow-glow)] bg-card"
                  : "border-border/60 bg-background/60 hover:bg-card hover:border-border"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg grid place-items-center text-xs font-medium flex-shrink-0 transition-all ${
                  isSel ? "text-white" : "text-foreground/60 bg-foreground/5"
                }`}
                style={isSel ? { background: "var(--gradient-berry)" } : undefined}
              >
                {String.fromCharCode(65 + i)}
              </div>
              <div className="flex-1 text-foreground/85">{opt}</div>
              <ArrowRight className={`h-4 w-4 transition ${isSel ? "text-primary translate-x-1" : "text-foreground/30 group-hover:translate-x-0.5"}`} />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function ScoredChoice({
  eyebrow, title, options, selected, onSelect, onBack,
}: {
  eyebrow: string; title: string;
  options: { label: string; score: number }[];
  selected: number | null;
  onSelect: (score: number) => void; onBack: () => void;
}) {
  return (
    <motion.div {...fade} className="max-w-3xl mx-auto">
      <BackBtn onBack={onBack} />
      <div className="text-xs tracking-[0.2em] uppercase text-foreground/55">{eyebrow}</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-display text-foreground">{title}</h2>
      <div className="mt-8 space-y-3">
        {options.map((opt, i) => {
          const isSel = selected === opt.score;
          return (
            <motion.button
              key={opt.label}
              whileHover={{ x: 4 }}
              onClick={() => onSelect(opt.score)}
              className={`w-full text-left p-5 rounded-xl border transition-all flex items-center gap-4 ${
                isSel
                  ? "border-primary/60 shadow-[var(--shadow-glow)] bg-card"
                  : "border-border/60 bg-background/60 hover:bg-card"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg grid place-items-center text-xs font-medium ${isSel ? "text-white" : "text-foreground/60 bg-foreground/5"}`}
                style={isSel ? { background: "var(--gradient-berry)" } : undefined}
              >
                {String.fromCharCode(65 + i)}
              </div>
              <div className="flex-1 text-foreground/85">{opt.label}</div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function PressureReveal({ level, onNext, onBack }: { level: string; onNext: () => void; onBack: () => void }) {
  const color = level === "Low" ? "var(--azure)" : level === "Moderate" ? "var(--berry-soft)" : "var(--berry)";
  return (
    <motion.div {...fade} className="max-w-2xl mx-auto text-center">
      <BackBtn onBack={onBack} />
      <div className="text-xs tracking-[0.2em] uppercase text-foreground/55">Structural Pressure Level</div>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="mx-auto mt-6 w-40 h-40 rounded-full grid place-items-center"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)` }}
      >
        <div className="text-3xl font-display" style={{ color }}>{level}</div>
      </motion.div>
      <p className="mt-8 text-foreground/70">
        Your answers suggest that your business structure may deserve a deeper review before the next major move.
      </p>
      <button
        onClick={onNext}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
        style={{ background: "var(--gradient-berry)" }}
      >
        Continue to Infrastructure Map
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function InfrastructureMap({ activeIdx }: { activeIdx: number }) {
  return (
    <div className="mx-auto max-w-md">
      <svg viewBox="0 0 400 120" className="w-full h-auto">
        <defs>
          <linearGradient id="bp-line" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.48 0.18 25)" />
            <stop offset="1" stopColor="oklch(0.62 0.16 240)" />
          </linearGradient>
        </defs>
        <line x1="40" y1="60" x2="360" y2="60" stroke="url(#bp-line)" strokeWidth="2" strokeDasharray="4 4" />
        {[0,1,2,3].map((i) => {
          const x = 40 + i * (320/3);
          const isActive = i <= activeIdx;
          const isCurrent = i === activeIdx;
          return (
            <g key={i}>
              <circle cx={x} cy={60} r={isCurrent ? 18 : 12} fill={isActive ? "oklch(0.48 0.18 25)" : "oklch(0.9 0.01 250)"} />
              {isCurrent && <circle cx={x} cy={60} r={26} fill="none" stroke="oklch(0.48 0.18 25)" strokeWidth="1" opacity="0.4">
                <animate attributeName="r" values="22;30;22" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>}
              <text x={x} y={64} textAnchor="middle" fill="white" fontSize="10" fontWeight="600">{i+1}</text>
              <text x={x} y={100} textAnchor="middle" fill="oklch(0.48 0.03 250)" fontSize="9">
                {["Corporate","Financial","Mobility","Legacy"][i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LayerIntro({
  index, layer, onNext, onBack,
}: { index: number; layer: typeof LAYERS[number]; onNext: () => void; onBack: () => void }) {
  const Icon = LAYER_ICONS[layer.key];
  return (
    <motion.div {...fade} className="max-w-3xl mx-auto text-center">
      <BackBtn onBack={onBack} />
      <InfrastructureMap activeIdx={index} />
      <div className="mt-6 text-xs tracking-[0.2em] uppercase text-foreground/55">Layer {index + 1} of 4</div>
      <div className="mt-3 inline-flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl grid place-items-center" style={{ background: "var(--gradient-berry)" }}>
          <Icon className="h-5 w-5 text-white" />
        </span>
        <h2 className="text-3xl md:text-4xl font-display text-gradient">{layer.title}</h2>
      </div>
      <p className="mt-5 text-foreground/70 max-w-2xl mx-auto">{layer.intro}</p>
      <button
        onClick={onNext}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
        style={{ background: "var(--gradient-berry)" }}
      >
        Begin layer
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function QuestionCard({
  layerTitle, layerKey, questionIdx, totalInLayer, prompt, options, selected, onSelect, onBack,
}: {
  layerTitle: string; layerKey: LayerKey; questionIdx: number; totalInLayer: number;
  prompt: string; options: { label: string; score: number }[];
  selected: number | null; onSelect: (s: number) => void; onBack: () => void;
}) {
  const Icon = LAYER_ICONS[layerKey];
  return (
    <motion.div {...fade} className="max-w-3xl mx-auto">
      <BackBtn onBack={onBack} />
      <div className="flex items-center justify-between text-xs tracking-[0.18em] uppercase text-foreground/55">
        <span className="inline-flex items-center gap-2"><Icon className="h-3.5 w-3.5" style={{ color: "var(--berry)" }} />{layerTitle}</span>
        <span>Question {questionIdx + 1} / {totalInLayer}</span>
      </div>
      {/* layer progress */}
      <div className="mt-3 h-1 rounded-full bg-foreground/10 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: "var(--gradient-berry)" }}
          initial={{ width: 0 }}
          animate={{ width: `${((questionIdx + (selected !== null ? 1 : 0)) / totalInLayer) * 100}%` }}
        />
      </div>
      <h2 className="mt-6 text-2xl md:text-3xl font-display text-foreground leading-snug">{prompt}</h2>
      <div className="mt-7 grid gap-3">
        {options.map((opt, i) => {
          const isSel = selected === opt.score;
          return (
            <motion.button
              key={opt.label}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(opt.score)}
              className={`text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                isSel ? "border-primary/60 bg-card shadow-[var(--shadow-glow)]" : "border-border/60 bg-background/60 hover:bg-card"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg grid place-items-center text-xs font-medium flex-shrink-0 ${isSel ? "text-white" : "text-foreground/60 bg-foreground/5"}`}
                style={isSel ? { background: "var(--gradient-berry)" } : undefined}
              >
                {String.fromCharCode(65 + i)}
              </div>
              <div className="flex-1 text-foreground/85 leading-relaxed">{opt.label}</div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function LayerCheckpoint({ layer, layerIdx, onNext }: { layer: typeof LAYERS[number]; layerIdx: number; onNext: () => void }) {
  const Icon = LAYER_ICONS[layer.key];
  return (
    <motion.div {...fade} className="max-w-xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto w-20 h-20 rounded-full grid place-items-center shadow-[var(--shadow-glow)]"
        style={{ background: "var(--gradient-berry)" }}
      >
        <CheckCircle2 className="h-10 w-10 text-white" />
      </motion.div>
      <div className="mt-6 text-xs tracking-[0.22em] uppercase text-foreground/55 inline-flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" style={{ color: "var(--berry)" }} />
        Checkpoint
      </div>
      <h3 className="mt-3 text-3xl font-display text-gradient">{layer.checkpoint}</h3>
      <p className="mt-3 text-foreground/65">Your progress is being assembled into your private Blueprint.</p>
      <button
        onClick={onNext}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)]"
        style={{ background: "var(--gradient-berry)" }}
      >
        {layerIdx < LAYERS.length - 1 ? "Continue to next layer" : "Assemble my Blueprint"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function Unlocking({ onNext }: { onNext: () => void }) {
  return (
    <motion.div {...fade} className="max-w-xl mx-auto text-center py-10">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="mx-auto w-24 h-24 rounded-2xl grid place-items-center shadow-[var(--shadow-lift)]"
        style={{ background: "var(--gradient-berry)" }}
      >
        <Lock className="h-10 w-10 text-white" />
      </motion.div>
      <h3 className="mt-8 text-3xl md:text-4xl font-display text-gradient">Your Blueprint is ready to unlock</h3>
      <p className="mt-4 text-foreground/70">
        We have mapped your business across four infrastructure layers and identified where your structure
        is strong, where it needs improvement, and where it may be exposed.
      </p>
      <button
        onClick={onNext}
        className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)]"
        style={{ background: "var(--gradient-berry)" }}
      >
        Unlock My Blueprint
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

type ContactData = { name: string; email: string; whatsapp: string; company: string; location: string; stage: string; review: string; message: string };

function ContactScreen({
  contact, setContact, onSubmit, isSubmitting, submitError,
}: {
  contact: ContactData;
  setContact: React.Dispatch<React.SetStateAction<ContactData>>;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}) {
  const required = contact.name.trim() && /.+@.+\..+/.test(contact.email) && contact.whatsapp.trim() && contact.company.trim();
  return (
    <motion.div {...fade} className="max-w-3xl mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-foreground/55">
          <Lock className="h-3.5 w-3.5" style={{ color: "var(--berry)" }} />
          Result Locked
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display text-gradient">Your Blueprint Is Ready</h2>
        <p className="mt-3 text-foreground/65 max-w-2xl mx-auto">
          Enter your details to unlock your full Ambition Infrastructure Blueprint and download your branded PDF report.
        </p>
      </div>

      <div className="mt-10 p-6 md:p-8 rounded-2xl glass border border-border/60 shadow-[var(--shadow-soft)]">
        {submitError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-red-900 dark:text-red-200">Submission Error</div>
              <div className="mt-1 text-sm text-red-700 dark:text-red-300">{submitError}</div>
            </div>
          </div>
        )}
        
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} disabled={isSubmitting} />
          <Field label="Email Address" type="email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} disabled={isSubmitting} />
          <Field label="WhatsApp Number" value={contact.whatsapp} onChange={(v) => setContact({ ...contact, whatsapp: v })} disabled={isSubmitting} />
          <Field label="Company Name" value={contact.company} onChange={(v) => setContact({ ...contact, company: v })} disabled={isSubmitting} />
          <Field label="Current Business Location" value={contact.location} onChange={(v) => setContact({ ...contact, location: v })} disabled={isSubmitting} />
          <SelectField
            label="Business Stage"
            value={contact.stage}
            onChange={(v) => setContact({ ...contact, stage: v })}
            options={["Idea / Planning","New Setup","Operating","Scaling","Restructuring","Preparing for Investment"]}
            disabled={isSubmitting}
          />
          <SelectField
            label="Preferred Review Method"
            value={contact.review}
            onChange={(v) => setContact({ ...contact, review: v })}
            options={["WhatsApp","Phone Call","Private Meeting"]}
            disabled={isSubmitting}
          />
        </div>
        <div className="mt-4">
          <label className="text-xs tracking-[0.18em] uppercase text-foreground/55">What are you building next? <span className="lowercase tracking-normal text-foreground/45">(optional)</span></label>
          <textarea
            value={contact.message}
            onChange={(e) => setContact({ ...contact, message: e.target.value })}
            rows={3}
            className="mt-2 w-full p-3 rounded-lg bg-background border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
        </div>
        <button
          disabled={!required || isSubmitting}
          onClick={onSubmit}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{ background: "var(--gradient-berry)" }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Unlock My Blueprint
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="mt-4 text-xs text-foreground/50">
          Your information is used only to send your Blueprint and support your requested infrastructure review.
        </p>
        
        {/* reCAPTCHA Notice */}
        <div className="mt-3 text-xs text-foreground/45">
          This site is protected by reCAPTCHA and the Google{" "}
          <a 
            href="https://policies.google.com/privacy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground/60"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a 
            href="https://policies.google.com/terms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground/60"
          >
            Terms of Service
          </a>{" "}
          apply.
        </div>
      </div>
    </motion.div>
  );
}

function Field({ label, value, onChange, type = "text", disabled = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.18em] uppercase text-foreground/55">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-2 w-full px-3 py-2.5 rounded-lg bg-background border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options, disabled = false }: { label: string; value: string; onChange: (v: string) => void; options: string[]; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.18em] uppercase text-foreground/55">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-2 w-full px-3 py-2.5 rounded-lg bg-background border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function ResultDashboard({
  scores, total, contact, ambition, strongest, exposed, improvements, patterns, pathway,
}: {
  scores: Record<LayerKey, number>; total: number;
  contact: { name: string; company: string };
  ambition: string;
  strongest: LayerKey; exposed: LayerKey; improvements: LayerKey[];
  patterns: { title: string; message: string }[];
  pathway: { name: string; message: string };
}) {
  const status = overallStatus(total);

  return (
    <motion.div {...fade} className="max-w-5xl mx-auto">
      <div className="text-center">
        <div className="text-xs tracking-[0.2em] uppercase text-foreground/55">Ambition Infrastructure Blueprint</div>
        <h1 className="mt-2 text-3xl md:text-5xl font-display text-gradient">{status.status}</h1>
        <p className="mt-3 text-foreground/65 max-w-3xl mx-auto">{status.message}</p>
        <div className="mt-6 inline-flex items-center gap-6 p-5 rounded-2xl glass border border-border/60">
          <ScoreRing value={total} max={60} size={120} />
          <div className="text-left">
            <div className="text-xs tracking-[0.18em] uppercase text-foreground/55">Total Score</div>
            <div className="text-3xl font-display"><span className="text-gradient">{total}</span><span className="text-foreground/50 text-lg"> / 60</span></div>
            {ambition && <div className="mt-2 text-xs text-foreground/55">Ambition: {ambition}</div>}
          </div>
        </div>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LAYERS.map((l) => {
          const sc = scores[l.key];
          const lbl = layerLabel(sc);
          const Icon = LAYER_ICONS[l.key];
          return (
            <div key={l.key} className="p-5 rounded-2xl glass border border-border/60">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5" style={{ color: "var(--berry)" }} />
                <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-full" style={{
                  background: lbl.tone === "strong" ? "oklch(0.85 0.13 80 / 0.2)" : lbl.tone === "developing" ? "oklch(0.62 0.16 240 / 0.12)" : "oklch(0.55 0.20 25 / 0.12)",
                  color: lbl.tone === "strong" ? "oklch(0.45 0.13 80)" : lbl.tone === "developing" ? "var(--azure)" : "var(--berry)",
                }}>{lbl.label}</span>
              </div>
              <div className="mt-3 text-sm font-display">{l.title}</div>
              <div className="mt-3 flex items-end gap-2">
                <div className="text-3xl font-display text-gradient">{sc}</div>
                <div className="text-foreground/40 text-sm pb-1">/ 15</div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                <motion.div className="h-full" style={{ background: "var(--gradient-berry)" }} initial={{ width: 0 }} animate={{ width: `${(sc/15)*100}%` }} transition={{ duration: 0.8 }} />
              </div>
            </div>
          );
        })}
      </div>

      <Section title="What Your Business Is Already Doing Well" tone="strong">
        <p>{STRENGTH_MESSAGES[strongest]}</p>
      </Section>

      {improvements.length > 0 && (
        <Section title="What Needs Improvement" tone="warn">
          <div className="space-y-3">
            {improvements.map((k) => (
              <div key={k}>
                <div className="font-medium text-foreground/90">{LAYERS.find((l) => l.key === k)!.title}</div>
                <p className="mt-1 text-foreground/70 text-sm">{IMPROVE_MESSAGES[k]}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="Your Most Exposed Infrastructure Layer" tone="critical">
        <p>{EXPOSED_MESSAGES[exposed]}</p>
        {(() => {
          const lm = layerMessage(scores[exposed]);
          return <p className="mt-3 text-foreground/65 text-sm"><strong>{layerLabel(scores[exposed]).label}.</strong> {lm.message} {lm.recommendation}</p>;
        })()}
      </Section>

      {patterns.length > 0 && (
        <Section title="Hidden Pattern Diagnosis" tone="info">
          <div className="grid md:grid-cols-2 gap-4">
            {patterns.map((p) => (
              <div key={p.title} className="p-4 rounded-xl bg-background/60 border border-border/60">
                <div className="font-display text-base" style={{ color: "var(--berry)" }}>{p.title}</div>
                <p className="mt-2 text-sm text-foreground/70">{p.message}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title={`Recommended Roadmap — ${ROADMAPS[exposed].title}`} tone="info">
        <p>{ROADMAPS[exposed].recommendation}</p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-2">
          {ROADMAPS[exposed].focus.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />{f}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={`Recommended Red Berry Pathway — ${pathway.name}`} tone="strong">
        <p>{pathway.message}</p>
      </Section>

      {/* Final CTA + PDF */}
      <div className="mt-10 p-8 rounded-3xl text-white shadow-[var(--shadow-lift)]" style={{ background: "linear-gradient(135deg, oklch(0.22 0.03 250), oklch(0.32 0.08 25))" }}>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-display">Request a Private Infrastructure Review</h3>
            <p className="mt-3 text-white/75">
              Your Blueprint has shown where your business is strong, where it needs improvement, and where it may be exposed.
              The next step is to review the structure behind the score and understand what needs to be built, corrected, or strengthened.
            </p>
            <p className="mt-3 text-sm text-white/55">Tell us what you are building. We will show you what it needs.</p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => downloadBlueprintPdf({
                name: contact.name, company: contact.company,
                scores, total, strongest, exposed, improvements, patterns, pathway,
              })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-foreground font-medium hover:bg-white/90 transition"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium shadow-[var(--shadow-glow)]"
              style={{ background: "var(--gradient-berry)", color: "white" }}
            >
              Request My Review
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Return to Homepage */}
      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border/60 text-foreground/80 hover:text-foreground hover:bg-card transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Homepage
        </Link>
      </div>
    </motion.div>
  );
}

function Section({ title, tone, children }: { title: string; tone: "strong" | "warn" | "critical" | "info"; children: React.ReactNode }) {
  const colors = {
    strong: { bar: "oklch(0.6 0.13 150)", chip: "Strength" },
    warn: { bar: "oklch(0.7 0.15 70)", chip: "Improvement" },
    critical: { bar: "var(--berry)", chip: "Exposure" },
    info: { bar: "var(--azure)", chip: "Insight" },
  }[tone];
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="mt-10 p-6 md:p-8 rounded-2xl glass border border-border/60 shadow-[var(--shadow-soft)]"
    >
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-6 rounded-full" style={{ background: colors.bar }} />
        <h3 className="text-xl md:text-2xl font-display">{title}</h3>
      </div>
      <div className="mt-4 text-foreground/75 leading-relaxed">{children}</div>
    </motion.section>
  );
}

function ScoreRing({ value, max, size = 100 }: { value: number; max: number; size?: number }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="ring-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.55 0.20 25)" />
          <stop offset="1" stopColor="oklch(0.62 0.16 240)" />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="oklch(0.9 0.01 250 / 0.6)" strokeWidth={stroke} />
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#ring-g)" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - c * pct }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      <text x={size/2} y={size/2 + 6} textAnchor="middle" fontSize={size/4} fill="oklch(0.22 0.03 250)" fontWeight="600" fontFamily="Fraunces, serif">
        {value}
      </text>
    </svg>
  );
}

/**
 * BlueprintTool component wrapped with Google reCAPTCHA v3 provider
 * This is the main export that should be used in routes
 */
export function BlueprintTool() {
  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={RECAPTCHA_SITE_KEY}
      language={RECAPTCHA_CONFIG.language}
      useRecaptchaNet={RECAPTCHA_CONFIG.useRecaptchaNet}
      useEnterprise={RECAPTCHA_CONFIG.useEnterprise}
    >
      <BlueprintToolInner />
    </GoogleReCaptchaProvider>
  );
}
