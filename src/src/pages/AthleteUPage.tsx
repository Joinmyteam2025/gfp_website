import { SEO, courseSchema } from "../components/SEO";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
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
  Trophy,
  Users
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Features ─── */
const features = [
  { name: "T.A.I.R. Curriculum", icon: GraduationCap, value: "$997", desc: "Comprehensive financial literacy courses designed specifically for athletes. Learn contracts, taxes, investing, and retirement planning." },
  { name: "NIL Deal Marketplace", icon: Trophy, value: "$2,000+", desc: "Browse and apply to brand partnerships. Wendy's, Crumbl, Dr Pepper, and more. New deals added weekly." },
  { name: "Estate Document Center", icon: FileText, value: "$5,000", desc: "Living trust, will, power of attorney - all 10+ legal documents generated for your state in minutes." },
  { name: "Asset Protection Suite", icon: Shield, value: "$2,000", desc: "Credit monitoring, identity protection, dispute tools, and $1M ID theft insurance. Guard everything you earn." },
  { name: "Real Estate Portal", icon: Building2, value: "$1,500", desc: "Investment properties, VA loans, real estate education. Build wealth beyond your sport." },
  { name: "Athlete Community", icon: Users, value: "$997", desc: "Connect with other athletes building generational wealth. Share strategies, get support, grow together." },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is Athlete U™?",
    a: "Athlete U™ is a free education platform built specifically for athletes. It includes the T.A.I.R. curriculum (financial literacy), an NIL deal marketplace, estate planning tools, real estate resources, and a community of athletes building generational wealth.",
  },
  {
    q: "Is it really free?",
    a: "Yes - creating an account and accessing the core platform is 100% free. We offer an optional Pro upgrade ($75/mo) that unlocks premium tools like credit repair, identity protection, the full estate document center, and professional services.",
  },
  {
    q: "What are NIL Deals?",
    a: "NIL (Name, Image, Likeness) deals are brand partnerships where athletes get paid to promote products and services. Our marketplace connects you directly with brands looking for athlete ambassadors.",
  },
  {
    q: "What is the T.A.I.R. curriculum?",
    a: "T.A.I.R. stands for our core curriculum tracks covering taxes, asset protection, investing, and retirement. Each course is designed by financial professionals specifically for athletes.",
  },
  {
    q: "Do I need to be a pro athlete?",
    a: "No! Athlete U is for athletes at every level - college, amateur, semi-pro, and professional. The earlier you start building your financial foundation, the better.",
  },
  {
    q: "What if I want to upgrade later?",
    a: "You can upgrade to Pro anytime from your dashboard. The Pro Bundle unlocks all premium features for $75/month with no long-term commitment.",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "500+", label: "Athletes Enrolled" },
  { number: "$2M+", label: "NIL Deals Tracked" },
  { number: "15+", label: "T.A.I.R. Courses" },
  { number: "FREE", label: "To Get Started" },
];

export function AthleteUPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Athlete U™ | NIL Deals, Brand Partnerships & Financial Education for Athletes"
        description="Protect your career and build your legacy. Athlete U provides NIL deal guidance, brand partnership strategies, contract education, and financial planning for college and pro athletes. Free signup."
        keywords={["NIL deals for athletes", "NIL deal marketplace", "college athlete NIL opportunities", "athlete brand deals", "NIL financial education", "athlete financial planning", "athlete wealth building", "name image likeness deals", "college athlete money management", "sports brand partnerships"]}
        canonicalUrl="https://garnerfinancialpartners.com/athlete-u"
        structuredData={courseSchema("Athlete U", "NIL deals, brand partnerships, and financial education designed specifically for college and professional athletes.", "https://garnerfinancialpartners.com/athlete-u")}
      />
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#DC2626]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#DC2626]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 mb-8">
              <Trophy className="size-4 text-[#DC2626]" />
              <span className="text-xs font-semibold text-[#DC2626] tracking-wider uppercase">Athlete U™</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              Your NIL Strategy,{" "}
              <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Maximized & Protected</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
              The all-in-one platform for athletes to land NIL deals, manage contracts, build partnerships, protect career earnings, and create generational wealth. Your career starts here - and your legacy lives forever.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://athlete.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#DC2626]/30 text-lg flex items-center gap-3"
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
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#DC2626] mb-1">{number}</div>
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
                dangerouslySetInnerHTML={{ __html: `Without a Strategy, Athletes Get <span class="text-red-400">Left Behind</span>` }} />
              <p className="text-white/40 leading-relaxed">
                78% of NFL players face financial hardship within 2 years of retirement. College athletes with NIL deals often have zero protection. Without proper planning:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Missed NIL Deals", desc: "Top brands want athletes with a platform. Without the right tools and visibility, you're leaving money on the table every single day.", icon: Trophy },
              { title: "No Asset Protection", desc: "One bad contract, one lawsuit, one injury - and everything you've earned can vanish overnight without proper legal structure.", icon: FileText },
              { title: "No Financial Education", desc: "Schools don't teach money management. Most athletes learn the hard way - after the damage is already done.", icon: Users },
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 mb-6">
                <Sparkles className="size-4 text-[#DC2626]" />
                <span className="text-xs font-medium text-[#DC2626] uppercase tracking-wider">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Athlete U™ <span class="text-gold-gradient">Changes the Game</span>` }} />
              <p className="text-white/40 leading-relaxed">
                We built the platform we wish existed when we were competing. Everything an athlete needs to earn, protect, and grow their wealth - in one place.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Your Free Account", desc: "Sign up in 30 seconds. Get instant access to the T.A.I.R. curriculum, NIL marketplace, and financial tools." },
              { step: "02", title: "Build Your NIL Portfolio", desc: "Browse brand deals, submit proposals, and manage contracts - all from your dashboard. We handle the paperwork." },
              { step: "03", title: "Protect Your Future", desc: "Estate docs, asset protection, credit building, and real estate tools to secure generational wealth." },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="size-7 text-[#DC2626]" />
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
                Everything Inside <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Athlete U™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                All the tools, courses, and resources you need to build real wealth. And it starts completely free.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {features.map(({ name, icon: Icon, value, desc }, i) => (
              <ScrollReveal key={name} delay={i * 40}>
                <div className="glass-card rounded-xl p-5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#DC2626]/10 border border-[#DC2626]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#DC2626]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">{value}</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#DC2626]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal delay={features.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#DC2626]/30 bg-gradient-to-br from-[#DC2626]/10 to-[#DC2626]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">All of this is</p>
                <p className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent mb-3">FREE</p>
                <p className="text-sm text-white/40 mb-6">Create your account and start learning today. Upgrade to Pro ($75/mo) anytime for premium tools.</p>
                <a
                  href="https://athlete.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-12 py-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#DC2626]/30 text-lg"
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
                Real People, <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Real Results</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Marcus J.", location: "D1 Football", text: "I landed my first NIL deal within 2 weeks of joining Athlete U. The marketplace made it so easy to connect with brands.", stars: 5 },
              { name: "Aliyah W.", location: "Track & Field", text: "I had no idea about trusts or asset protection before this. Now my NIL earnings are protected and I have a real financial plan.", stars: 5 },
              { name: "Devon R.", location: "Basketball", text: "The T.A.I.R. courses are fire. I finally understand contracts, taxes, and how to actually keep the money I'm making.", stars: 5 },
            ].map(({ name, location, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#DC2626] fill-[#DC2626]" />
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
                Frequently Asked <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Questions</span>
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
                      <ChevronUp className="size-5 text-[#DC2626] flex-shrink-0" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#DC2626]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Your Career Has an Expiration Date. Your <span class="text-gold-gradient">Wealth</span> Doesn't Have To.` }} />
              <p className="text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                Every day without a financial plan is a day closer to becoming a statistic. Join thousands of athletes who are taking control of their future.
              </p>
              <a
                href="https://athlete.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#DC2626]/30 text-lg"
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
