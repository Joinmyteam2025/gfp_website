import { ReceiptText } from "lucide-react";

export function RefundPolicyPage() {
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
              <ReceiptText className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Purchase Terms</span>
            </div>
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Refund <span className="text-gold-gradient">Policy</span>
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

            <PolicySection title="All Sales Are Final">
              <p>
                All purchases made through this Website or any affiliated platform, including but not limited to the Family Fortress Program™ (FFP™), Business Fortress Program™ (BFP™), Military Fortress Program™ (MFP™), consulting sessions, digital products, training programs, and any related services, are <span className="text-white/70 font-medium">final and non-refundable</span>.
              </p>
              <p>
                By completing a purchase, you acknowledge and agree that Garner Financial Partners will provide educational and informational services only. No guarantees are made regarding legal outcomes, financial performance, funding approval, credit improvement, or any other specific result.
              </p>
            </PolicySection>

            <PolicySection title="Digital Delivery">
              <p>
                Because our services are delivered digitally and/or involve time-based access to educational content, tools, and community platforms, no refunds or chargebacks will be accepted under any circumstances once access has been granted.
              </p>
              <p>
                Upon purchase, you will receive immediate or near-immediate access to your program portal and associated materials. This digital delivery constitutes fulfillment of the purchase.
              </p>
            </PolicySection>

            <PolicySection title="Before You Purchase">
              <p>
                We strongly encourage all prospective clients to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-white/50">
                <li>Read all service descriptions, program details, and pricing carefully before purchasing</li>
                <li>Ask any questions via our support team or during a consultation call before committing</li>
                <li>Ensure you are fully committed to the program or product before proceeding with payment</li>
                <li>Review our Terms of Use and this Refund Policy in their entirety</li>
              </ul>
            </PolicySection>

            <PolicySection title="Chargebacks">
              <p>
                If a chargeback or payment dispute is filed after a purchase, we reserve the right to suspend access to all programs and portals associated with the account, provide transaction records and proof of delivery to the payment processor, and pursue recovery of the disputed amount plus any applicable fees.
              </p>
              <p>
                We make every effort to resolve concerns directly. If you have any issues with your purchase, please contact us before initiating a chargeback.
              </p>
            </PolicySection>

            <div className="glass-card p-6 border-l-2 border-[#C5963A]/40">
              <h3 className="text-xl font-serif font-bold text-white mb-3">Important Disclaimer</h3>
              <p className="text-white/50 leading-relaxed">
                Garner Financial Partners is not a law firm, licensed financial institution, registered investment advisor, broker-dealer, or insurance company. All information provided is for educational and informational purposes only and should not be construed as legal, financial, tax, or investment advice. You are responsible for your own decisions and actions based on the information provided. Consult licensed professionals for personalized guidance.
              </p>
            </div>

            <PolicySection title="Contact Us">
              <p>
                If you have questions about this Refund Policy or need assistance before making a purchase, please contact us at{" "}
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
