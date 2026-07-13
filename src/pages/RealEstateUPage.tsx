import { SEO, courseSchema } from "../components/SEO";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  GraduationCap,
  Home,
  Lock,
  MapPin,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Calculator,
  DollarSign,
  Building2,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Features ─── */
const features = [
  { name: "18 Video Lessons", icon: GraduationCap, value: "$997", desc: "Comprehensive real estate education covering wholesaling, fix & flips, multifamily, AirBnBs, land flipping, portfolio building, and asset protection." },
  { name: "7 Financial Calculators", icon: Calculator, value: "$500", desc: "Deal analyzer, cash-on-cash return, cap rate, mortgage comparison, rehab estimator, and portfolio projection tools." },
  { name: "RE Deal Marketplace", icon: MapPin, value: "$2,000+", desc: "Browse investment properties, connect with wholesalers, and find off-market deals. New opportunities added regularly." },
  { name: "LLC & Trust Structuring", icon: Shield, value: "$3,000", desc: "Learn how to hold properties in LLCs, layer asset protection, and use living trusts to avoid probate on your entire portfolio." },
  { name: "Estate Document Center", icon: FileText, value: "$5,000", desc: "Living trust, will, power of attorney — all 10+ legal documents generated for your state. Protect every property you own." },
  { name: "Get Paid To Promote", icon: DollarSign, value: "$1,000+", desc: "Earn commissions by referring other investors to the platform. Built-in affiliate system — grow your portfolio and your income." },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is Real Estate U™?",
    a: "Real Estate U™ is a free education platform for aspiring and experienced real estate investors. It covers every strategy — wholesaling, fix & flips, buy & hold, multifamily, AirBnBs, land flipping, and more — plus financial calculators, deal analysis tools, an investment marketplace, and estate planning resources.",
  },
  {
    q: "Is it really free?",
    a: "Yes — creating an account and accessing all 18 video lessons, calculators, and the deal marketplace is 100% free. We offer an optional Pro upgrade that unlocks premium tools like the full estate document center, credit repair, identity protection, and professional services.",
  },
  {
    q: "I'm brand new to real estate. Is this for beginners?",
    a: "Absolutely. The curriculum starts with foundational concepts and progresses to advanced strategies. Whether you've never bought a property or you own 50 units, there's something for every level.",
  },
  {
    q: "What real estate strategies are covered?",
    a: "Wholesaling, fix & flips, BRRRR method, buy & hold rentals, multifamily apartments, AirBnB/short-term rentals, land flipping, commercial real estate, and portfolio scaling — plus LLC structuring and asset protection for every strategy.",
  },
  {
    q: "How does the Deal Marketplace work?",
    a: "The marketplace connects you with investment opportunities, wholesalers, and off-market properties. You can browse deals, analyze returns with our built-in calculators, and connect directly with sellers.",
  },
  {
    q: "Why do I need estate planning for real estate?",
    a: "If you own property without a living trust, your heirs face probate — a costly, public court process that can take years. Real Estate U™ shows you how to hold every property in the right structure so your portfolio transfers seamlessly.",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "18", label: "Video Lessons" },
  { number: "7", label: "Financial Calculators" },
  { number: "6+", label: "RE Strategies Covered" },
  { number: "FREE", label: "To Get Started" },
];

export function RealEstateUPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Real Estate U\u2122 | Real Estate Investing & Property Strategy Education"
        description="Build wealth through real estate. Real Estate U provides comprehensive education on real estate investing, property analysis, rental income strategies, and asset protection. Free signup."
        keywords={["real estate investing education", "real estate investment courses", "property investment education", "real estate wealth building", "rental property education", "real estate passive income", "real estate tax strategy", "real estate investing for beginners", "investment property education", "real estate portfolio building"]}
        canonicalUrl="https://garnerfinancialpartners.com/realestate-u"
        structuredData={courseSchema("Real Estate U", "Real estate investing education including property analysis, rental income, and asset protection.", "https://garnerfinancialpartners.com/realestate-u")}
      />
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#0D9488]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0D9488]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 mb-8">
              <Home className="size-4 text-[#0D9488]" />
              <span className="text-xs font-semibold text-[#0D9488] tracking-wider uppercase">Real Estate U™</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              Build Your Real Estate{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#0D9488]/70 bg-clip-text text-transparent">Empire</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
              Master every real estate strategy — wholesaling, fix & flips, multifamily, AirBnBs, and more. 18 video lessons, deal analysis tools, and asset protection education to build and protect your portfolio.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://realestate.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-[#0D9488] hover:bg-[#0A7A70] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#0D9488]/30 text-lg flex items-center gap-3"
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
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#0D9488] mb-1">{number}</div>
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
                dangerouslySetInnerHTML={{ __html: `Most Investors Are <span class="text-red-400">One Lawsuit Away</span> From Losing Everything` }} />
              <p className="text-white/40 leading-relaxed">
                You're building a portfolio. But are your properties protected? Most real estate investors hold assets in their personal name — exposing everything to lawsuits, probate, and unnecessary taxes.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "No Entity Structure", desc: "Holding properties in your personal name means one slip-and-fall lawsuit can take everything — your rental portfolio, your savings, your home.", icon: Building2 },
              { title: "Bad Deal Analysis", desc: "Most new investors lose money on their first deal because they don't know how to properly analyze returns, estimate rehab costs, or calculate true cash flow.", icon: TrendingUp },
              { title: "No Estate Plan", desc: "Without a living trust, your properties go through probate — a public, expensive court process that can freeze your portfolio for years after you're gone.", icon: FileText },
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 mb-6">
                <Sparkles className="size-4 text-[#0D9488]" />
                <span className="text-xs font-medium text-[#0D9488] uppercase tracking-wider">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Real Estate U™ Is Your <span class="text-gold-gradient">Complete Playbook</span>` }} />
              <p className="text-white/40 leading-relaxed">
                From your first wholesale deal to a 100-unit apartment complex — learn every strategy, analyze every deal, and protect every asset.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Your Free Account", desc: "Sign up in 30 seconds. Get instant access to all 18 video lessons, deal calculators, and the investor community." },
              { step: "02", title: "Learn Every Strategy", desc: "Wholesaling, fix & flips, BRRRR, multifamily, AirBnB, land flipping — master the strategies that build real wealth." },
              { step: "03", title: "Build & Protect Your Portfolio", desc: "Analyze deals with pro tools, structure properties in LLCs and trusts, and create a portfolio that grows for generations." },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="size-7 text-[#0D9488]" />
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
                Everything Inside <span className="bg-gradient-to-r from-[#0D9488] to-[#0D9488]/70 bg-clip-text text-transparent">Real Estate U™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                All the education, calculators, and deal tools you need to invest with confidence. And it starts completely free.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {features.map(({ name, icon: Icon, value, desc }, i) => (
              <ScrollReveal key={name} delay={i * 40}>
                <div className="glass-card rounded-xl p-5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#0D9488]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">{value}</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#0D9488]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal delay={features.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#0D9488]/30 bg-gradient-to-br from-[#0D9488]/10 to-[#0D9488]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">All of this is</p>
                <p className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#0D9488] to-[#0D9488]/70 bg-clip-text text-transparent mb-3">FREE</p>
                <p className="text-sm text-white/40 mb-6">Create your account and start investing smarter today. Upgrade to Pro anytime for premium tools.</p>
                <a
                  href="https://realestate.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-12 py-5 bg-[#0D9488] hover:bg-[#0A7A70] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#0D9488]/30 text-lg"
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
                Real Investors, <span className="bg-gradient-to-r from-[#0D9488] to-[#0D9488]/70 bg-clip-text text-transparent">Real Results</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Carlos M.", location: "Wholesaler, TX", text: "Real Estate U taught me how to analyze deals properly. My first wholesale assignment netted $12,000 — and I structured it through an LLC from day one thanks to what I learned here.", stars: 5 },
              { name: "Rachel T.", location: "Rental Investor, GA", text: "I had 4 rental properties all in my personal name. The asset protection lessons showed me how exposed I was. Now everything is in LLCs under a living trust. Peace of mind is priceless.", stars: 5 },
              { name: "Brandon W.", location: "Fix & Flip, AZ", text: "The rehab estimator and deal calculator alone saved me from a bad flip that would have cost me $40K. This platform pays for itself — and it's free.", stars: 5 },
            ].map(({ name, location, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#0D9488] fill-[#0D9488]" />
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
                Frequently Asked <span className="bg-gradient-to-r from-[#0D9488] to-[#0D9488]/70 bg-clip-text text-transparent">Questions</span>
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
                      <ChevronUp className="size-5 text-[#0D9488] flex-shrink-0" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0D9488]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Real Estate Builds Wealth. <span class="text-gold-gradient">Education Protects It.</span>` }} />
              <p className="text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                Every deal you do without the right education and structure is a gamble. Join thousands of investors who are building portfolios the smart way.
              </p>
              <a
                href="https://realestate.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#0D9488] hover:bg-[#0A7A70] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#0D9488]/30 text-lg"
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
