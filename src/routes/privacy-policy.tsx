
import { SiteLayout } from "@/components/site/SiteLayout";

function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <section className="relative pt-12 md:pt-20 pb-16">
        <div
          className="absolute inset-x-0 top-0 h-[480px] -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="container-rb max-w-4xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">
            Legal
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display text-gradient leading-[1.05]">
            Privacy Policy
          </h1>
          <p className="mt-5 text-lg text-foreground/70">
            Last updated: {new Date().toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-12 space-y-10 text-foreground/80">
            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                Red Berry Corporate Services Corp. (“Red Berry,” “we,” “us,” or “our”) respects your privacy and is committed to protecting the personal information we collect. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use our advisory services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">2. Information We Collect</h2>
              <p className="leading-relaxed">
                We may collect personal information including your name, email address, phone number, company details, nationality, residency status, and any other information you provide when completing forms, requesting consultations, or using the Blueprint Tool.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">3. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use the information we collect to respond to your inquiries, provide advisory services, improve our website and tools, comply with legal and regulatory obligations, and communicate with you about relevant services and updates.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">4. Information Sharing</h2>
              <p className="leading-relaxed">
                We do not sell personal information. We may share information with trusted partners, regulators, and service providers where necessary to deliver our services or comply with legal obligations, and only under appropriate confidentiality and data-protection safeguards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement reasonable administrative, technical, and physical safeguards to protect your personal information. However, no transmission or storage system is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">6. Your Rights</h2>
              <p className="leading-relaxed">
                You may request access to, correction of, or deletion of your personal information by contacting us. We will respond in accordance with applicable data protection laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">7. Cookies and Tracking</h2>
              <p className="leading-relaxed">
                Our website may use cookies and similar technologies to improve user experience and analyze usage. You can adjust your browser settings to refuse cookies, though some features may not function properly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">8. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at{" "}
                <a href="mailto:info@redberry.ae" className="text-primary hover:underline">
                  info@redberry.ae
                </a>
                {" "}or at Opal Tower, Business Bay, Dubai, United Arab Emirates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default PrivacyPolicyPage;
