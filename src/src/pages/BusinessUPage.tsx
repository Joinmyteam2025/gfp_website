import { SEO, courseSchema } from "../components/SEO";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  GraduationCap,
  Lock,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Building2,
  Calculator,
  DollarSign,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Features ─── */
const features = [
  { name: "18 Video Lessons", icon: GraduationCap, value: "$997", desc: "Self-paced business education covering entity structuring, cash flow systems, tax strategy, exit planning, and the CVA Strategy™ for business owners." },
  { name: "7 Financial Calculators", icon: Calculator, value: "$500", desc: "Business valuation, retirement gap, tax optimization, cash flow projection, and more — run the numbers that actually matter." },
  { name: "Entity Structuring Guide", icon: Building2, value: "$2,000", desc: "LLC, S-Corp, C-Corp — learn which structure protects your assets and minimizes taxes for your specific business." },
  { name: "Estate Document Center", icon: FileText, value: "$5,000", desc: "Living trust, will, power of attorney — all 10+ legal documents generated for your state in minutes. Protect your business legacy." },
  { name: "Get Paid To Promote", icon: DollarSign, value: "$1,000+", desc: "Earn commissions by referring other business owners to the platform. Built-in affiliate system — your network becomes revenue." },
  { name: "Business Owner Community", icon: Users, value: "$997", desc: "Connect with entrepreneurs building real wealth. Share strategies, get accountability, and grow together." },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is Business U™?",
    a: "Business U™ is a free education platform built specifically for entrepreneurs and business owners. It includes 18 video lessons on entity structuring, cash flow management, exit planning, tax strategy, and the CVA Strategy™ — plus financial calculators, estate planning tools, and a community of business owners.",
  },
  {
    q: "Is it really free?",
    a: "Yes — creating an account and accessing all 18 video lessons, calculators, and the community is 100% free. We offer an optional Pro upgrade that unlocks premium tools like the full estate document center, credit repair, identity protection, and professional services.",
  },
  {
    q: "What is the CVA Strategy™?",
    a: "The CVA Strategy™ (Cash Value Accumulation) is a proprietary wealth-building approach using permanent life insurance as a financial tool. Inside Business U™, you'll learn how business owners use this strategy for tax-advantaged growth, business financing, and succession planning.",
  },
  {
    q: "I already have an LLC. Is this still useful?",
    a: "Absolutely. Most business owners have the wrong entity structure — or the right one set up incorrectly. Business U™ covers advanced topics like asset protection layering, holding company structures, and how to move profits into tax-advantaged vehicles.",
  },
  {
    q: "What kind of businesses is this for?",
    a: "Any business owner — whether you're a solopreneur, franchise owner, agency, contractor, or running a multi-million dollar operation. The financial principles apply across all industries.",
  },
  {
    q: "How is this different from a business course?",
    a: "Business U™ isn't about marketing or sales tactics. It's about the financial architecture of your business — entity structure, tax strategy, asset protection, exit planning, and building generational wealth through your business.",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "18", label: "Video Lessons" },
  { number: "7", label: "Financial Calculators" },
  { number: "$10K+", label: "Avg. Tax Savings" },
  { number: "FREE", label: "To Get Started" },
];

export function BusinessUPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Business U™ | Business Strategy, Asset Protection & Financial Education"
        description="Build. Scale. Protect. Business U helps entrepreneurs master business strategy, asset protection, tax optimization, and wealth building through expert financial education. Free signup."
        keywords={["business financial education", "entrepreneur financial planning", "small business asset protection", "business tax strategy", "entrepreneur wealth building", "business owner financial literacy", "business scaling strategies", "business succession planning", "asset protection for business owners", "small business growth strategies"]}
        canonicalUrl="https://garnerfinancialpartners.com/business-u"
        structuredData={courseSchema("Business U", "Business strategy, asset protection, and financial education for entrepreneurs and business owners.", "https://garnerfinancialpartners.com/business-u")}
      />
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#C5963A]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C5963A]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-8">
              <Briefcase className="size-4 text-[#C5963A]" />
              <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">Business U™</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              The Financial Playbook for{" "}
              <span className="bg-gradient-to-r from-[#C5963A] to-[#C5963A]/70 bg-clip-text text-transparent">Business Owners</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
              Master entity structuring, tax strategy, exit planning, and the CVA Strategy™. 18 video lessons, 7 financial calculators, and the tools to protect and scale your business — all free.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://business.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg flex items-center gap-3"
              >
                <span>Create Free Account</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-sm text-white/30">100% Free · No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ STATS BAR ═══ */}
      <section className="py-12 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ number, label }) => (
              <ScrollReveal key={label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#C5963A] mb-1">{number}</div>
                  <div className="text-sm text-white/40">{label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ PROBLEM ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Most Business Owners Are <span class="text-red-400">Financially Exposed</span>` }} />
              <p className="text-white/40 leading-relaxed">
                You built the business. But is it structured to protect you? 60% of small businesses don't survive a major lawsuit. Most owners overpay tens of thousands in taxes every year. Without proper planning:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Wrong Entity Structure", desc: "Sole prop, LLC, S-Corp — the wrong structure costs you thousands in taxes every year and leaves your personal assets exposed to business liabilities.", icon: Building2 },
              { title: "No Exit Strategy", desc: "82% of business owners have no succession plan. When it's time to sell, retire, or pass it down — most are completely unprepared.", icon: TrendingUp },
              { title: "Zero Asset Protection", desc: "Your business and personal assets are intertwined. One lawsuit, one bad partner, one audit — and everything you've built is at risk.", icon: Shield },
            ].map(({ title, desc, icon: Icon }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 border-red-500/10 hover:border-red-500/20 text-center">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="size-7 text-red-400" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-3">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ SOLUTION ═══ */}
      <section className="py-24 bg-[#070F1D]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Sparkles className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Business U™ Gives You the <span class="text-gold-gradient">Financial Edge</span>` }} />
              <p className="text-white/40 leading-relaxed">
                The financial education business schools don't teach. Learn how to structure, protect, and scale your business — then build generational wealth from it.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Your Free Account", desc: "Sign up in 30 seconds. Get instant access to all 18 video lessons, 7 financial calculators, and the business owner community." },
              { step: "02", title: "Master Your Business Finances", desc: "Learn entity structuring, tax optimization, cash flow management, and the CVA Strategy™ at your own pace." },
              { step: "03", title: "Protect & Scale Your Empire", desc: "Generate estate documents, build asset protection layers, create your exit strategy, and start building wealth beyond your business." },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="size-7 text-[#C5963A]" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-3">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ FEATURE STACK ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Everything Inside <span className="bg-gradient-to-r from-[#C5963A] to-[#C5963A]/70 bg-clip-text text-transparent">Business U™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                All the education, tools, and resources you need to build a financially bulletproof business. And it starts completely free.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {features.map(({ name, icon: Icon, value, desc }, i) => (
              <ScrollReveal key={name} delay={i * 40}>
                <div className="glass-card rounded-xl p-5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#C5963A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">{value}</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#C5963A]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal delay={features.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#C5963A]/30 bg-gradient-to-br from-[#C5963A]/10 to-[#C5963A]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">All of this is</p>
                <p className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#C5963A] to-[#C5963A]/70 bg-clip-text text-transparent mb-3">FREE</p>
                <p className="text-sm text-white/40 mb-6">Create your account and start learning today. Upgrade to Pro anytime for premium tools.</p>
                <a
                  href="https://business.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                >
                  Get Started Free
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Real Owners, <span className="bg-gradient-to-r from-[#C5963A] to-[#C5963A]/70 bg-clip-text text-transparent">Real Results</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "James K.", location: "Restaurant Owner, TX", text: "I was running my restaurant as a sole prop for 6 years. Business U showed me I was overpaying $18,000/year in taxes. Restructured to an S-Corp and the savings were immediate.", stars: 5 },
              { name: "Maria S.", location: "Agency Owner, FL", text: "The exit planning module opened my eyes. I had no succession plan, no asset protection — nothing. Now my business and personal wealth are properly structured and protected.", stars: 5 },
              { name: "David P.", location: "Contractor, AZ", text: "I always thought estate planning was for rich people. Business U showed me how a living trust protects my contracting business from probate and lawsuits. Game changer.", stars: 5 },
            ].map(({ name, location, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#C5963A] fill-[#C5963A]" />
                    ))}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 italic">"{text}"</p>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-xs text-white/30">{location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ FAQ ═══ */}
      <section className="py-24 bg-[#070F1D]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Frequently Asked <span className="bg-gradient-to-r from-[#C5963A] to-[#C5963A]/70 bg-clip-text text-transparent">Questions</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map(({ q, a }, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="glass-card rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-white pr-4">{q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="size-5 text-[#C5963A] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="size-5 text-white/30 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-sm text-white/40 leading-relaxed">{a}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0A1628] to-[#070F1D]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5963A]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Your Business Is Your Greatest Asset. <span class="text-gold-gradient">Protect It.</span>` }} />
              <p className="text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                Every day without proper financial structure is a day you're leaving money on the table — and leaving your business exposed. Join thousands of owners who are taking control.
              </p>
              <a
                href="https://business.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Create Free Account
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30">
                <span className="flex items-center gap-1.5"><Lock className="size-3" /> Secure Platform</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3" /> 100% Free</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Instant Access</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
