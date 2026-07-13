import { Heart } from "lucide-react";

export function AntiDiscriminationPage() {
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
              <Heart className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Diversity, Equity &amp; Inclusion</span>
            </div>
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Anti-Discrimination <span className="text-gold-gradient">Policy</span>
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

            <PolicySection title="Our Commitment">
              <p>
                Garner Financial Partners upholds a strict commitment to diversity, equity, and inclusion. We proudly serve individuals, families, veterans, and businesses from all walks of life and do not tolerate any form of discrimination.
              </p>
              <p>
                We believe that everyone deserves equal access to financial education, asset protection strategies, and the tools necessary to build a secure financial future. Regardless of background.
              </p>
            </PolicySection>

            <PolicySection title="Non-Discrimination Statement">
              <p>
                Garner Financial Partners does not, and will not, discriminate on the basis of:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {[
                  "Race or color",
                  "Ethnicity or national origin",
                  "Citizenship status",
                  "Religion or creed",
                  "Gender or sex",
                  "Gender identity or expression",
                  "Sexual orientation",
                  "Age",
                  "Disability (physical or mental)",
                  "Pregnancy or family status",
                  "Veteran or military status",
                  "Economic or socioeconomic status",
                  "Body type or physical appearance",
                  "Marital status",
                  "Political affiliation",
                  "Any other characteristic protected by law",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/50 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5963A] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4">
                This policy applies equally to all aspects of our business, including but not limited to: the sale and delivery of products and services, employment and hiring, partnerships and contractor relationships, and community engagement.
              </p>
            </PolicySection>

            <PolicySection title="User Expectations">
              <p>
                By using our platform, purchasing any of our services, or engaging with our community, you affirm that you do not engage in discriminatory practices of any kind. We expect all clients, team members, partners, and community participants to treat one another with dignity and respect.
              </p>
            </PolicySection>

            <PolicySection title="Enforcement">
              <p>
                Should we become aware. Through direct report, social media, public records, or other credible means. Of behavior that includes hate speech, harassment, bullying, or discriminatory conduct directed at any individual or group, we reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-white/50">
                <li>Deny, suspend, or terminate access to our products, services, and platforms at our sole discretion</li>
                <li>Remove the individual from our community spaces and programs</li>
                <li>Decline future business relationships</li>
                <li>Report conduct to appropriate authorities where warranted</li>
              </ul>
            </PolicySection>

            <PolicySection title="Reporting Discrimination">
              <p>
                If you experience or witness discrimination in connection with Garner Financial Partners or any of our programs, please report it immediately to{" "}
                <a href="mailto:contact@garnerfinancialpartners.com" className="text-[#C5963A] hover:underline">
                  contact@garnerfinancialpartners.com
                </a>. All reports will be taken seriously and investigated promptly.
              </p>
            </PolicySection>

            <div className="glass-card p-6 border-l-2 border-[#C5963A]/40 text-center">
              <p className="text-white/60 leading-relaxed italic font-serif text-lg">
                "We are dedicated to creating a respectful and inclusive environment for all clients, partners, veterans, and team members."
              </p>
              <p className="text-[#C5963A] text-sm mt-3 font-medium">– Garner Financial Partners</p>
            </div>

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
