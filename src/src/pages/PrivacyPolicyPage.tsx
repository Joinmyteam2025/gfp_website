import { Shield } from "lucide-react";

export function PrivacyPolicyPage() {
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
              <Shield className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Your Privacy Matters</span>
            </div>
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Privacy <span className="text-gold-gradient">Policy</span>
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

            <PolicySection title="Introduction">
              <p>
                Garner Financial Partners ("we," "us," or "our") values your privacy very highly. Please read this Privacy Policy carefully before using our website at garnerfinancialpartners.com (the "Website"), as this Privacy Policy contains important information regarding your privacy and how we may use the information we collect about you.
              </p>
              <p>
                Your access to and use of the Website is conditional upon your acceptance of and compliance with this Privacy Policy. This Privacy Policy applies to everyone, including, but not limited to: visitors, users, clients, and others, who wish to access or use the Website.
              </p>
              <p>
                By accessing or using the Website, you agree to be bound by this Privacy Policy. If you disagree with any part of the Privacy Policy, then you do not have our permission to access or use the Website.
              </p>
            </PolicySection>

            <PolicySection title="What Information We Collect">
              <p>We collect any and all information that you enter on this Website. We may collect the following categories of information about you:</p>
              <div className="mt-4 space-y-3">
                <InfoRow category="Identifying Information" items={["Name", "Email address", "Phone number", "Mailing address"]} />
                <InfoRow category="Financial Information" items={["Billing and payment information"]} />
                <InfoRow category="Technical Information" items={["IP address", "Device identifier", "Browser type and version"]} />
                <InfoRow category="Usage Information" items={["Information regarding your interaction with our website or application", "Content preferences", "Usage behavior"]} />
                <InfoRow category="Demographic Data" items={["Language", "Age", "Location (city, state, zip)"]} />
              </div>
            </PolicySection>

            <PolicySection title="How We May Use Your Information">
              <p>We may use the information that you provide us for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-white/50">
                <li>Delivering and billing for our products and services, including the Fortress Programs™</li>
                <li>Communicating with you about your account, purchases, or support inquiries</li>
                <li>Sending updates, offers, and promotional materials (with your consent)</li>
                <li>Offering personalized experiences and content</li>
                <li>Analytics and improving our website performance</li>
                <li>Marketing and advertising</li>
                <li>Verifying customer information and preventing fraud</li>
                <li>Complying with applicable legal obligations</li>
              </ul>
            </PolicySection>

            <PolicySection title="How We Share Your Information">
              <p>We do not sell your personal information to third parties. We may share personal data only with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-white/50">
                <li>Trusted vendors or service providers under contract who assist us in operating our business (e.g., payment processors, email services)</li>
                <li>Legal authorities, when required by law, regulation, or legal process</li>
                <li>Parties in connection with a business transfer, merger, or acquisition</li>
              </ul>
            </PolicySection>

            <PolicySection title="Cookies and Tracking Technologies">
              <p>
                A cookie is a small piece of data sent from a website and stored on your device by your browser. This Website collects cookies and may use cookies for reasons including, but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-white/50">
                <li>Analyzing our Website traffic and performance</li>
                <li>Analyzing your interactions with content and advertisements</li>
                <li>Identifying if you are signed in to the Website</li>
                <li>Testing content on the Website</li>
                <li>Storing information about your preferences</li>
                <li>Recognizing when you return to the Website</li>
              </ul>
              <p className="mt-4">
                Most web browsers automatically accept cookies. However, you can modify your browser settings to decline cookies, if you prefer. This setting may prevent you from taking full advantage of the Website.
              </p>
            </PolicySection>

            <PolicySection title="Third-Party Services">
              <p>
                We may collect information through third-party platforms and may integrate third-party widgets (such as social share buttons or analytics tools). These third-party services may track your usage according to their own privacy policies. We encourage you to review the privacy policies of any third-party services you interact with through our Website.
              </p>
            </PolicySection>

            <PolicySection title="Data Security">
              <p>
                We use industry-standard security measures, including SSL encryption, to protect your personal data. While we take reasonable precautions to safeguard your information, no method of internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security of your data.
              </p>
            </PolicySection>

            <PolicySection title="Your Rights and Choices">
              <p>Depending on your location and applicable law, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-white/50">
                <li>Access, update, correct, or delete your personal data</li>
                <li>Object to processing or restrict the use of your data</li>
                <li>Request data portability</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Opt out of future sales of personal information by submitting a consumer request</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:contact@garnerfinancialpartners.com" className="text-[#C5963A] hover:underline">
                  contact@garnerfinancialpartners.com
                </a>.
              </p>
            </PolicySection>

            <PolicySection title="Children's Privacy">
              <p>
                This Website is intended for use by a general audience and does not offer services to children. We do not knowingly collect personal data from individuals under the age of 18. Should a child whom we know to be under 18 send personal information to us, we will use that information only to respond to that child to inform him or her that they cannot use this Website, and we will promptly delete such information.
              </p>
            </PolicySection>

            <PolicySection title="Do Not Track">
              <p>
                Do Not Track is a preference you can set on your browser to inform websites that you do not want to be tracked. We do not currently support Do Not Track ("DNT"). You can either enable or disable Do Not Track by visiting the Preferences or Settings page of your browser.
              </p>
            </PolicySection>

            <PolicySection title="International Users">
              <p>
                By using our services, you consent to your data being processed and stored in the United States. If you are accessing our Website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States.
              </p>
            </PolicySection>

            <PolicySection title="Changes to This Privacy Policy">
              <p>
                We reserve the right to amend this Privacy Policy at any time. We will notify you of any changes to this Privacy Policy by posting the updated Privacy Policy to this website. Your continued use of the Website after any changes constitutes your acceptance of the revised Privacy Policy.
              </p>
            </PolicySection>

            <PolicySection title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
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

function InfoRow({ category, items }: { category: string; items: string[] }) {
  return (
    <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
      <span className="text-[#C5963A] font-medium text-sm min-w-[180px]">{category}</span>
      <span className="text-white/50 text-sm">{items.join(", ")}</span>
    </div>
  );
}
