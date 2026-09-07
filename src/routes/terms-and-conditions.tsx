
import { SiteLayout } from "@/components/site/SiteLayout";

function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="mt-5 text-lg text-foreground/70">
            Last updated: {new Date().toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-12 space-y-10 text-foreground/80">
            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing or using the Red Berry website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">2. Services Overview</h2>
              <p className="leading-relaxed">
                Red Berry provides corporate, financial, sovereign, and legacy infrastructure advisory services. Information on this website is for general guidance only and does not constitute legal, tax, financial, or professional advice. A formal engagement is required for advisory work.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">3. Use of the Website</h2>
              <p className="leading-relaxed">
                You agree to use the website lawfully and not to submit false or misleading information. You may not copy, distribute, modify, or reverse-engineer any part of the website without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content on this website, including text, graphics, logos, and tools, is the property of Red Berry or its licensors and is protected by intellectual property laws. Unauthorized use is prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">5. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by law, Red Berry is not liable for any indirect, incidental, or consequential damages arising from your use of the website or reliance on any information contained herein.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">6. Confidentiality</h2>
              <p className="leading-relaxed">
                Information submitted through our forms or Blueprint Tool will be handled in accordance with our Privacy Policy and applicable professional obligations. Submission does not create a solicitor-client or fiduciary relationship unless a formal engagement is agreed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">7. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms & Conditions are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">8. Changes to These Terms</h2>
              <p className="leading-relaxed">
                We may update these Terms & Conditions from time to time. Continued use of the website after changes constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display text-foreground mb-3">9. Contact</h2>
              <p className="leading-relaxed">
                For questions about these Terms & Conditions, please contact us at{" "}
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

export default TermsPage;
