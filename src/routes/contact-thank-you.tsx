import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Phone, Mail, Clock, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const CONTACT = {
  phone: "+971 4 385 1002",
  phoneHref: "tel:+97143851002",
  email: "info@redberry.ae",
};

function ThankYouPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-16 md:pt-28 pb-10">
        <div
          className="absolute inset-x-0 top-0 h-[520px] -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="container-rb max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Message Received</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-display text-gradient leading-[1.05]">
            Thank You
          </h1>
          <p className="mt-5 text-lg text-foreground/70 max-w-lg mx-auto">
            A senior advisor will review your request and respond within one business day.
            In the meantime, here is what happens next.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-10 md:py-14">
        <div className="container-rb max-w-4xl">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Review",
                desc: "A senior advisor reads your request and maps it to the right team.",
              },
              {
                step: "02",
                title: "Respond",
                desc: "We reply within one business day with a focused plan and next steps.",
              },
              {
                step: "03",
                title: "Align",
                desc: "A confidential call to walk through options — no obligation, no script.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl glass p-6 md:p-8 border border-border/60"
              >
                <div className="text-xs tracking-[0.18em] uppercase text-primary font-medium">
                  Step {s.step}
                </div>
                <h3 className="mt-3 text-xl font-display">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/65">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact + CTA */}
      <section className="pb-20">
        <div className="container-rb max-w-4xl">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Contact card */}
            <div className="rounded-3xl glass p-6 md:p-8 border border-border/60">
              <div className="text-xs tracking-[0.18em] uppercase text-foreground/55">
                Need to reach us sooner?
              </div>
              <h3 className="mt-3 text-xl font-display">Contact Details</h3>
              <ul className="mt-5 space-y-4 text-sm">
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
                  <span className="text-foreground/75">Sunday – Thursday · 9:00 – 18:00 GST</span>
                </li>
              </ul>
            </div>

            {/* CTA card */}
            <div className="rounded-3xl glass p-6 md:p-8 border border-border/60 flex flex-col justify-between">
              <div>
                <div className="text-xs tracking-[0.18em] uppercase text-foreground/55">
                  While You Wait
                </div>
                <h3 className="mt-3 text-xl font-display">Explore the Blueprint Tool</h3>
                <p className="mt-2 text-sm text-foreground/65">
                  Scope your infrastructure in minutes and bring the output to your advisor call.
                </p>
              </div>
              <Link
                to="/blueprint-tool"
                className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                style={{ background: "var(--gradient-berry)" }}
              >
                <Calendar className="h-4 w-4" />
                Architect My Blueprint
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default ThankYouPage;
