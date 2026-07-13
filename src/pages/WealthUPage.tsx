import { SEO, courseSchema } from "../components/SEO";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  Gem,
  Lock,
  Shield,
  Sparkles,
  Star,
  Calculator,
  DollarSign,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Features ─── */
const features = [
  { name: "18 Video Lessons", icon: GraduationCap, value: "$997", desc: "Complete wealth-building curriculum covering credit mastery, tax strategy, investing fundamentals, retirement planning, and the CVA Strategy™ for individuals and families." },
  { name: "7 Financial Calculators", icon: Calculator, value: "$500", desc: "Retirement gap analysis, compound interest, debt payoff, tax optimization, net worth tracker, and more — see exactly where you stand." },
  { name: "Credit Repair & Monitoring", icon: CreditCard, value: "$1,500", desc: "Dispute tools, score tracking, identity protection, and $1M ID theft insurance. Build and protect the credit that unlocks everything." },
  { name: "Estate Document Center", icon: FileText, value: "$5,000", desc: "Living trust, will, power of attorney — all 10+ legal documents generated for your state in minutes. Protect your family's future." },
  { name: "Fortress Program Integration", icon: Shield, value: "$2,000", desc: "Connect with the Family Fortress Program™ for comprehensive asset protection, estate planning, and wealth transfer strategies." },
  { name: "Get Paid To Promote", icon: DollarSign, value: "$1,000+", desc: "Earn commissions by referring others to the platform. Built-in affiliate system — help your community and earn while you learn." },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is Wealth U™?",
    a: "Wealth U™ is a free, self-paced wealth education platform covering everything from credit repair and budgeting to dynasty trusts and the CVA Strategy™. It includes 18 video lessons, 7 financial calculators, estate planning tools, and access to a community of people building real wealth.",
  },
  {
    q: "Is it really free?",
    a: "Yes — creating an account and accessing all 18 video lessons, calculators, and the community is 100% free. We offer an optional Pro upgrade that unlocks premium tools like the full estate document center, credit repair suite, identity protection, and professional services.",
  },
  {
    q: "What is the CVA Strategy™?",
    a: "The CVA Strategy™ (Cash Value Accumulation) is a wealth-building approach using permanent life insurance as a financial tool. You'll learn how families use this strategy for tax-advantaged growth, retirement income, and generational wealth transfer.",
  },
  {
    q: "I don't know anything about finance. Is this for me?",
    a: "This is exactly for you. Wealth U™ starts with the basics — budgeting, credit, saving — and builds up to advanced strategies like trusts, tax optimization, and wealth transfer. No finance background needed.",
  },
  {
    q: "How is this different from other financial education?",
    a: "Most financial education teaches theory. Wealth U™ gives you the actual tools — calculators to run your numbers, document generators for legal protection, credit repair tools, and a step-by-step curriculum that turns knowledge into action.",
  },
  {
    q: "Can this help me get out of debt?",
    a: "Yes. The debt payoff calculator, credit repair tools, and budgeting lessons are specifically designed to help you eliminate debt strategically while simultaneously building wealth. It's not either/or — you learn to do both.",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "18", label: "Video Lessons" },
  { number: "7", label: "Financial Calculators" },
  { number: "$0", label: "Cost To Start" },
  { number: "FREE", label: "Forever Plan" },
];

export function WealthUPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Wealth U\u2122 | Financial Education, Wealth Building & Investment Strategy"
        description="Master your financial future. Wealth U provides comprehensive financial education on wealth building, tax strategy, retirement planning, and investment strategies. Free signup."
        keywords={["financial education platform", "wealth building education", "personal finance courses", "financial literacy program", "investment education online", "wealth management education", "tax strategy education", "IUL education", "indexed universal life education", "financial freedom education"]}
        canonicalUrl="https://garnerfinancialpartners.com/wealth-u"
        structuredData={courseSchema("Wealth U", "Comprehensive financial education on wealth building, tax strategy, and investment strategies.", "https://garnerfinancialpartners.com/wealth-u")}
      />
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#16A34A]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#16A34A]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 mb-8">
              <Gem className="size-4 text-[#16A34A]" />
              <span className="text-xs font-semibold text-[#16A34A] tracking-wider uppercase">Wealth U™</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              Master the{" "}
              <span className="bg-gradient-to-r from-[#16A34A] to-[#16A34A]/70 bg-clip-text text-transparent">Money Game</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
              The comprehensive wealth-building education platform. From credit repair to dynasty trusts — 18 lessons, 7 calculators, and the tools to build generational wealth. Completely free.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://wealth.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#16A34A]/30 text-lg flex items-center gap-3"
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
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#16A34A] mb-1">{number}</div>
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
                dangerouslySetInnerHTML={{ __html: `The Wealth Gap Starts With a <span class="text-red-400">Knowledge Gap</span>` }} />
              <p className="text-white/40 leading-relaxed">
                Schools don't teach money. Most families pass down financial habits — not financial strategy. Without proper education, the cycle of living paycheck-to-paycheck never ends.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "No Financial Education", desc: "78% of Americans live paycheck to paycheck. Not because they don't work hard — because no one taught them how money actually works.", icon: GraduationCap },
              { title: "Credit Holds You Back", desc: "Bad credit costs the average person over $200,000 in their lifetime through higher interest rates, denied applications, and missed opportunities.", icon: CreditCard },
              { title: "No Estate Plan", desc: "67% of Americans have no will. No trust. No plan. When the unexpected happens, families lose everything to probate, taxes, and legal fees.", icon: FileText },
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 mb-6">
                <Sparkles className="size-4 text-[#16A34A]" />
                <span className="text-xs font-medium text-[#16A34A] uppercase tracking-wider">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Wealth U™ Gives You the <span class="text-gold-gradient">Blueprint</span>` }} />
              <p className="text-white/40 leading-relaxed">
                The step-by-step wealth education that schools never taught you. From fixing your credit to building a dynasty trust — it's all here, and it's free.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Your Free Account", desc: "Sign up in 30 seconds. Get instant access to all 18 video lessons, 7 financial calculators, and the wealth-building community." },
              { step: "02", title: "Build Your Foundation", desc: "Master credit repair, budgeting, debt elimination, and saving strategies. Fix the fundamentals that hold most people back." },
              { step: "03", title: "Build Generational Wealth", desc: "Learn investing, tax strategy, estate planning, and the CVA Strategy™ to create wealth that lasts beyond your lifetime." },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="size-7 text-[#16A34A]" />
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
                Everything Inside <span className="bg-gradient-to-r from-[#16A34A] to-[#16A34A]/70 bg-clip-text text-transparent">Wealth U™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                All the education, calculators, and tools you need to take control of your finances. And it starts completely free.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {features.map(({ name, icon: Icon, value, desc }, i) => (
              <ScrollReveal key={name} delay={i * 40}>
                <div className="glass-card rounded-xl p-5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#16A34A]/10 border border-[#16A34A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#16A34A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">{value}</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#16A34A]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal delay={features.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#16A34A]/30 bg-gradient-to-br from-[#16A34A]/10 to-[#16A34A]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">All of this is</p>
                <p className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#16A34A] to-[#16A34A]/70 bg-clip-text text-transparent mb-3">FREE</p>
                <p className="text-sm text-white/40 mb-6">Create your account and start building wealth today. Upgrade to Pro anytime for premium tools.</p>
                <a
                  href="https://wealth.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-12 py-5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#16A34A]/30 text-lg"
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
                Real People, <span className="bg-gradient-to-r from-[#16A34A] to-[#16A34A]/70 bg-clip-text text-transparent">Real Transformations</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Sarah M.", location: "Teacher, OH", text: "I went from a 540 credit score to 760 in 8 months using the credit repair tools. For the first time in my life, I qualified for a mortgage. Wealth U changed everything for my family.", stars: 5 },
              { name: "Anthony R.", location: "Sales Manager, CA", text: "I was making good money but had nothing to show for it. The budgeting and investing lessons gave me a system. In one year I saved more than I had in the previous five combined.", stars: 5 },
              { name: "Lisa & Marcus D.", location: "Young Family, NC", text: "We had no will, no trust, no life insurance plan. Wealth U walked us through everything. Now our kids are protected and we're actually building wealth instead of just surviving.", stars: 5 },
            ].map(({ name, location, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#16A34A] fill-[#16A34A]" />
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
                Frequently Asked <span className="bg-gradient-to-r from-[#16A34A] to-[#16A34A]/70 bg-clip-text text-transparent">Questions</span>
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
                      <ChevronUp className="size-5 text-[#16A34A] flex-shrink-0" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#16A34A]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Wealth Isn't Luck. It's a <span class="text-gold-gradient">System.</span>` }} />
              <p className="text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                The difference between financial freedom and financial stress is education. Start learning today — it's free, and it could change your family's future forever.
              </p>
              <a
                href="https://wealth.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#16A34A]/30 text-lg"
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
