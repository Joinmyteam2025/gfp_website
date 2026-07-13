import { FileText } from "lucide-react";

export function TermsOfUsePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C5963A]/[0.04] to-transparent rounded-full -translate-y-1/4 translate-x-1/4" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
              <FileText className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Legal Agreement</span>
            </div>
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Terms of <span className="text-gold-gradient">Use</span>
            </h1>
            <p className="fade-up fade-up-delay-2 text-lg text-white/50 leading-relaxed">
              Last updated: April 23, 2026
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-12">

            <PolicySection title="Agreement to Terms">
              <p>
                Welcome to garnerfinancialpartners.com (the "Website"), operated by Garner Financial Partners ("we," "us," or "our"). By accessing or using our Website, purchasing any product or service, or engaging with any of our content, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Website.
              </p>
            </PolicySection>

            <PolicySection title="Scope">
              <p>
                These Terms of Use apply to Garner Financial Partners, its affiliated entities, and all related domains and platforms operated by or on behalf of the company, including but not limited to portal.garnerfinancialpartners.com, business.garnerfinancialpartners.com, veterans.garnerfinancialpartners.com, and agent.garnerfinancialpartners.com.
              </p>
            </PolicySection>

            <PolicySection title="Educational Purpose Disclaimer">
              <p>
                All information, content, materials, and services provided through this Website. Including but not limited to the Family Fortress Program™ (FFP™), Business Fortress Program™ (BFP™), and Military Fortress Program™ (MFP™). Are for educational and informational purposes only.
              </p>
              <div className="glass-card p-5 mt-4 border-l-2 border-[#C5963A]/40">
                <p className="text-white/70 font-medium mb-3">Important:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/50">
                  <li>Garner Financial Partners is <span className="text-white/70 font-medium">not</span> a law firm and cannot provide legal advice.</li>
                  <li>We are <span className="text-white/70 font-medium">not</span> a licensed financial institution, registered investment advisor, broker-dealer, or insurance company.</li>
                  <li>Nothing on this Website constitutes legal, financial, tax, investment, or insurance advice.</li>
                  <li>We provide information, educational software, and tools. You are responsible for appropriately using this material and consulting licensed professionals for personalized guidance.</li>
                  <li>All legal documents generated through our programs are templates based on general legal frameworks and should be reviewed by a qualified attorney in your jurisdiction before execution.</li>
                </ul>
              </div>
            </PolicySection>

            <PolicySection title="No Guarantees">
              <p>
                We make no guarantees, representations, or warranties of any kind regarding outcomes, results, or the effectiveness of any product, service, or strategy provided. By using our Website or any related materials, you agree to take full responsibility for your own results, or lack thereof.
              </p>
              <p>
                Any testimonials, case studies, or examples presented are illustrative only and do not guarantee similar outcomes. Past performance is not an indication of future results. Individual outcomes depend on many factors unique to each user.
              </p>
            </PolicySection>

            <PolicySection title="Intellectual Property">
              <p>
                All content on this Website. Including but not limited to text, graphics, logos, images, software, trademarks, and service marks. Is the property of Garner Financial Partners or its licensors and is protected by applicable intellectual property laws. The names "Family Fortress Program™," "Business Fortress Program™," "Military Fortress Program™," "Fortress Program™," and associated logos are trademarks of Garner Financial Partners.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from this Website without prior written consent.
              </p>
            </PolicySection>

            <PolicySection title="User Accounts and Access">
              <p>
                Certain features of our Website and programs require you to create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-white/50">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activity that occurs under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="mt-4">
                We reserve the right to suspend or terminate your account at our sole discretion if we believe you have violated these Terms of Use.
              </p>
            </PolicySection>

            <PolicySection title="Acceptable Use">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-white/50">
                <li>Use the Website for any unlawful purpose or in violation of any applicable laws</li>
                <li>Attempt to gain unauthorized access to any part of the Website or its systems</li>
                <li>Transmit viruses, malware, or any other malicious code</li>
                <li>Interfere with the proper functioning of the Website</li>
                <li>Share, resell, or redistribute any content, materials, or program access without written authorization</li>
                <li>Misrepresent your identity or affiliation</li>
              </ul>
            </PolicySection>

            <PolicySection title="Third-Party Links">
              <p>
                Our Website may contain links to third-party websites or services that are not owned or controlled by Garner Financial Partners. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be liable for any damage or loss arising from your use of any third-party website.
              </p>
            </PolicySection>

            <PolicySection title="Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, Garner Financial Partners, its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Website or any services, even if we have been advised of the possibility of such damages.
              </p>
              <p>
                Our total liability to you for any claims arising under these Terms shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
              </p>
            </PolicySection>

            <PolicySection title="Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless Garner Financial Partners, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising from your use of the Website, your violation of these Terms, or your violation of any rights of a third party.
              </p>
            </PolicySection>

            <PolicySection title="Investment and Financial Risk Disclaimer">
              <p>
                Our tools, calculators, and content are for informational and educational purposes only and do not constitute financial advice. Consult a licensed financial professional for personalized guidance. Results presented are hypothetical and do not account for changes in market conditions or personal circumstances. Investing comes with inherent risks and you should always invest within your means and risk tolerance.
              </p>
            </PolicySection>

            <PolicySection title="Governing Law">
              <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of the State of Arizona, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved exclusively in the state or federal courts located in Arizona.
              </p>
            </PolicySection>

            <PolicySection title="Changes to Terms">
              <p>
                We reserve the right to modify these Terms of Use at any time. Changes become effective immediately upon posting to this Website. Your continued use of the Website after any changes constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.
              </p>
            </PolicySection>

            <PolicySection title="Contact Us">
              <p>
                If you have any questions about these Terms of Use, please contact us at{" "}
                <a href="mailto:contact@garnerfinancialpartners.com" className="text-[#C5963A] hover:underline">
                  contact@garnerfinancialpartners.com
                </a>.
              </p>
            </PolicySection>

          </div>
        </div>
      </section>
    </div>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-white mb-4">{title}</h2>
      <div className="space-y-4 text-white/50 leading-relaxed">{children}</div>
    </div>
  );
}
