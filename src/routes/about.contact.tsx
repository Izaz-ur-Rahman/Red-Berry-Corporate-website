import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ArrowRight, MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { submitContactForm, ApiError } from "@/services/api";
import { RECAPTCHA_SITE_KEY, RECAPTCHA_CONFIG } from "@/lib/recaptcha";
import { SEOHead } from "@/components/common/SEOHead";
const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please share your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(5, "Enter a reachable phone").max(40),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  interest: z.string().trim().min(1, "Pick a focus area").max(80),
  message: z
    .string()
    .trim()
    .min(10, "A few sentences help us prepare")
    .max(1500, "Keep it under 1500 characters"),
});

type Interest =
  | "Launch A Business"
  | "Expand Into The GCC"
  | "Grow & Protect Wealth"
  | "Create Family Security"
  | "Increase Global Freedom"
  | "Build A Hospitality Venture"
  | "Foundation Build"
  | "Other";

const INTERESTS: Interest[] = [
  "Launch A Business",
  "Expand Into The GCC",
  "Grow & Protect Wealth",
  "Create Family Security",
  "Increase Global Freedom",
  "Build A Hospitality Venture",
  "Foundation Build",
  "Other",
];

const CONTACT = {
  phone: "+971 4 385 1002",
  phoneHref: "tel:+97143851002",
  email: "info@redberry.ae",
  address: "1408, Opal Tower, Business Bay",
  city: "Dubai, United Arab Emirates",
  hours: "Sunday – Thursday · 9:00 – 18:00 GST",
};

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.5207187704796!2d55.275683699999995!3d25.185656299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f697eebb15f3b%3A0x416f3d9264b69d08!2sRED%20BERRY%20CORPORATE%20SERVICE%20PROVIDER%20LLC!5e0!3m2!1sen!2sae!4v1781068926956!5m2!1sen!2sae";

function ContactPage() {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Debug: Log when reCAPTCHA is ready
  console.log("reCAPTCHA executeRecaptcha available:", !!executeRecaptcha);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (submitting) {
      return;
    }

    // Check if reCAPTCHA is ready
    if (!executeRecaptcha) {
      console.error("reCAPTCHA not ready");
      toast.error("reCAPTCHA not ready. Please try again in a moment.");
      return;
    }

    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());
    
    // Client-side validation
    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        map[String(issue.path[0])] = issue.message;
      }
      setErrors(map);
      return;
    }
    
    // Clear previous errors and start submission
    setErrors({});
    setSubmitting(true);

    try {
      // Generate reCAPTCHA token with proper action
      console.log("=== reCAPTCHA v3 Token Generation ===");
      console.log("Site Key:", RECAPTCHA_SITE_KEY.substring(0, 15) + "..." + RECAPTCHA_SITE_KEY.substring(RECAPTCHA_SITE_KEY.length - 10));
      console.log("Action: contact");
      console.log("executeRecaptcha available:", !!executeRecaptcha);
      
      const captchaToken = await executeRecaptcha("contact");
      
      console.log("✅ Token generated successfully");
      console.log("Token length:", captchaToken.length);
      console.log("Token (first 30 chars):", captchaToken.substring(0, 30) + "...");
      console.log("Token (last 30 chars):", "..." + captchaToken.substring(captchaToken.length - 30));
      console.log("Token type:", typeof captchaToken);
      console.log("Full token:", captchaToken);
      
      // Prepare data for API
      const contactData = {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        company: parsed.data.company || undefined,
        interest: parsed.data.interest,
        message: parsed.data.message,
        CaptchaToken: captchaToken, // Backend expects "CaptchaToken" with capital C
      };

      console.log("=== API Request Payload ===");
      console.log("Endpoint: /contact/create");
      console.log("Payload keys:", Object.keys(contactData));
      console.log("Has CaptchaToken property:", 'CaptchaToken' in contactData);
      console.log("CaptchaToken value type:", typeof contactData.CaptchaToken);
      console.log("CaptchaToken matches original:", contactData.CaptchaToken === captchaToken);
      console.log("Full payload:", JSON.stringify(contactData, null, 2));
      
      // Submit to backend API
      const response = await submitContactForm(contactData);

      console.log("=== API Response ===");
      console.log("Response received:", response);
      console.log("Response success:", response?.success);

      console.log("API response received:", response);

      if (response && response.success) {
        console.log("Form submission successful, showing toast and redirecting...");
        
        // Reset form FIRST (before navigation)
        try {
          e.currentTarget.reset();
          console.log("Form reset successful");
        } catch (resetError) {
          console.error("Form reset error:", resetError);
        }
        
        // Show success toast
        toast.success("Contact submitted successfully.", {
          description: "We'll get back to you within one business day.",
        });
        
        // Redirect to thank-you page for conversion tracking
        // Use setTimeout to allow toast to render before navigation
        setTimeout(() => {
          try {
            console.log("Navigating to /contact-thank-you");
            navigate("/contact-thank-you");
          } catch (navError) {
            console.error("Navigation error:", navError);
          }
        }, 100);
      } else {
        console.error("Response does not have success property:", response);
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      
      // Handle API errors
      if (error instanceof ApiError) {
        console.error("ApiError details:", {
          message: error.message,
          statusCode: error.statusCode,
          errors: error.errors
        });
        
        // Display field-specific errors if available
        if (error.errors) {
          const fieldErrors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(error.errors)) {
            fieldErrors[field] = messages[0]; // Take first error message
          }
          setErrors(fieldErrors);
          toast.error("Please check the form for errors.");
        } else {
          // Display general error message
          const errorMessage = error.message || "Failed to submit contact form.";
          console.error("Showing error to user:", errorMessage);
          toast.error(errorMessage, {
            description: error.statusCode === 400 
              ? "The captcha verification failed. Please refresh the page and try again."
              : "Please try again later."
          });
        }
      } else {
        // Unknown error
        console.error("Unknown error type:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
       <SEOHead
      title="Contact Red Berry | UAE & GCC Advisory"
      description="Start a conversation about what you are building. Red Berry works with founders, investors and families establishing themselves in the UAE and GCC."
      url="https://redberry.ae/about/contact"
    />
      {/* Hero */}
      <section className="relative pt-12 md:pt-20 pb-10">
        <div
          className="absolute inset-x-0 top-0 h-[480px] -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="container-rb">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Talk To An Advisor</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display text-gradient leading-[1.05] max-w-3xl">
            A Confidential Conversation. A Clear Next Step.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-foreground/70">
            Share a little about what you are building. A Red Berry advisor will reply within one business day with a focused plan — no obligation, no script.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-3xl">
            {[
              { icon: Phone, label: "Call us", value: CONTACT.phone, href: CONTACT.phoneHref },
              { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { icon: MapPin, label: "Visit", value: CONTACT.address },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href ?? "#location"}
                className="group rounded-2xl glass p-4 border border-border/60 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-foreground/55">
                  <c.icon className="h-3.5 w-3.5" /> {c.label}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {c.value}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-10 md:py-14">
        <div className="container-rb grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
          {/* Form card */}
          <div className="relative rounded-3xl glass p-6 md:p-10 overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-display">Tell us what you are building</h2>
              <p className="mt-2 text-sm text-foreground/65 max-w-md">
                The more specific you are, the sharper our first response will be.
              </p>

              <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" name="name" error={errors.name} required />
                    <Field label="Email" name="email" type="email" error={errors.email} required />
                    <Field label="Phone" name="phone" type="tel" error={errors.phone} required />
                    <Field label="Company (optional)" name="company" error={errors.company} />
                  </div>

                  <div>
                    <label className="text-xs tracking-[0.16em] uppercase text-foreground/60">
                      Focus area <span className="text-primary">*</span>
                    </label>
                    <select
                      name="interest"
                      defaultValue=""
                      className="mt-2 w-full rounded-xl bg-background/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="" disabled>
                        Select a focus area
                      </option>
                      {INTERESTS.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    {errors.interest && (
                      <p className="mt-1 text-xs text-destructive">{errors.interest}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs tracking-[0.16em] uppercase text-foreground/60">
                      What are you building? <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      maxLength={1500}
                      placeholder="A few sentences about the move, the timeline, and what you've tried."
                      className="mt-2 w-full rounded-xl bg-background/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: "var(--gradient-berry)" }}
                    >
                      {submitting ? "Submitting..." : "Request A Conversation"}
                      <ArrowRight className={`h-4 w-4 transition-transform ${submitting ? "" : "group-hover:translate-x-0.5"}`} />
                    </button>
                    <p className="text-xs text-foreground/55">
                      We reply within one business day. Your details stay private.
                    </p>
                  </div>

                  {/* reCAPTCHA Notice */}
                  <div className="text-xs text-foreground/50 pt-2">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground/70"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a 
                      href="https://policies.google.com/terms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground/70"
                    >
                      Terms of Service
                    </a>{" "}
                    apply.
                  </div>
                </form>
            </div>
          </div>

          {/* Info panel */}
          <aside className="space-y-4">
            <div className="rounded-3xl glass p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-foreground/55">
                <Building2 className="h-3.5 w-3.5" /> Red Berry Headquarters
              </div>
              <h3 className="mt-3 text-xl font-display">Opal Tower, Business Bay</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                  <div>
                    <div className="font-medium">{CONTACT.address}</div>
                    <div className="text-foreground/65">{CONTACT.city}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-0.5 text-primary" />
                  <a href={CONTACT.phoneHref} className="hover:text-primary transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-0.5 text-primary" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-primary transition-colors">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-0.5 text-primary" />
                  <span className="text-foreground/75">{CONTACT.hours}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl glass p-6 md:p-8">
              <div className="text-xs tracking-[0.18em] uppercase text-foreground/55">
                Prefer to self-serve?
              </div>
              <p className="mt-3 text-sm text-foreground/75">
                Use the Blueprint Tool to scope your infrastructure in minutes — then bring the output to your advisor call.
              </p>
              <Link
                to="/blueprint-tool"
                className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                style={{ background: "var(--gradient-berry)" }}
              >
                Architect My Blueprint
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section id="location" className="pb-20">
        <div className="container-rb">
          <div className="rounded-3xl glass overflow-hidden border border-border/60">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Find Us</p>
                <h2 className="mt-2 text-2xl md:text-3xl font-display">Opal Tower, Business Bay</h2>
              </div>
              <a
                href="https://www.google.com/maps/place/RED+BERRY+CORPORATE+SERVICE+PROVIDER+LLC/@25.1856563,55.2756837,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/70 border border-border font-medium hover:bg-foreground/5 transition-colors text-sm"
              >
                Open in Google Maps
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="relative w-full h-[420px] md:h-[520px]">
              <iframe
                title="Red Berry — Opal Tower, Business Bay, Dubai"
                src={MAP_SRC}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs tracking-[0.16em] uppercase text-foreground/60">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="mt-2 w-full rounded-xl bg-background/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function ContactPageWithRecaptcha() {
  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={RECAPTCHA_SITE_KEY}
      language={RECAPTCHA_CONFIG.language}
      useRecaptchaNet={RECAPTCHA_CONFIG.useRecaptchaNet}
      useEnterprise={RECAPTCHA_CONFIG.useEnterprise}
    >
      <ContactPage />
    </GoogleReCaptchaProvider>
  );
}
