import { SEO, courseSchema } from "../components/SEO";
import { useState } from "react";
import {
  ArrowRight,
  Award,
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
  Users
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Features ─── */
const features = [
  { name: "Military Financial Courses", icon: GraduationCap, value: "$997", desc: "Courses designed for service members covering transition planning, VA benefits, TSP optimization, and civilian financial strategy." },
  { name: "VA Real Estate Portal", icon: Building2, value: "$2,000", desc: "VA loan education, investment properties, and real estate tools. Use your hard-earned benefits to build wealth through real estate." },
  { name: "Estate Document Center", icon: FileText, value: "$5,000", desc: "Living trust, will, power of attorney, healthcare directives - all 10+ legal documents, including military-specific provisions." },
  { name: "Asset Protection Suite", icon: Shield, value: "$2,000", desc: "Credit monitoring, identity protection, dispute tools, and $1M ID theft insurance. Protect what you've earned." },
  { name: "Fortress Planning", icon: Award, value: "$1,500", desc: "Comprehensive financial strategy covering insurance, investments, tax planning, and retirement - built for military families." },
  { name: "Veterans Community", icon: Users, value: "$997", desc: "Connect with fellow service members building generational wealth. Share strategies, get support, honor the mission together." },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is Veterans U™?",
    a: "Veterans U™ is a free education platform built specifically for military service members, veterans, and their families. It includes military financial courses, VA benefit resources, estate planning tools, real estate education, and a community of fellow service members building wealth.",
  },
  {
    q: "Is it really free?",
    a: "Yes - creating an account and accessing the core platform is 100% free. We offer an optional Pro upgrade ($75/mo) that unlocks premium tools like the full estate document center, credit repair, identity protection, and professional services.",
  },
  {
    q: "Do I have to be a veteran?",
    a: "While Veterans U is designed for the military community, anyone who wants to learn about VA benefits, military financial planning, or wants access to our education and tools is welcome to join.",
  },
  {
    q: "What VA benefits does this cover?",
    a: "Our courses cover VA home loans, VA disability, GI Bill education benefits, TSP/retirement planning, TRICARE, and many other benefits available to service members and veterans.",
  },
  {
    q: "Is this affiliated with the VA?",
    a: "No. Veterans U is an independent education platform by Garner Financial Partners. We are not affiliated with the Department of Veterans Affairs. We provide education about VA benefits and financial planning.",
  },
  {
    q: "What if I want to upgrade later?",
    a: "You can upgrade to Pro anytime from your dashboard. The Pro Bundle unlocks all premium features for $75/month with no long-term commitment.",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "20+", label: "Military Courses" },
  { number: "$0 Down", label: "VA Loan Access" },
  { number: "10+", label: "Legal Documents" },
  { number: "FREE", label: "To Get Started" },
];

export function VeteransUPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Veterans U™ | Financial Education & Wealth Building for Military Veterans"
        description="Served your country. Now secure your family. Veterans U provides financial education, VA benefits guidance, and wealth building strategies for military veterans and their families. Free signup."
        keywords={["veteran financial education", "military financial planning", "veteran wealth building", "VA benefits education", "military retirement planning", "veteran financial literacy", "military transition financial planning", "military spouse financial education", "VA home loan education", "military family financial planning"]}
        canonicalUrl="https://garnerfinancialpartners.com/veterans-u"
        structuredData={courseSchema("Veterans U", "Financial education and wealth building strategies designed for military veterans and families.", "https://garnerfinancialpartners.com/veterans-u")}
      />
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#8B9A46]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#8B9A46]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8B9A46]/10 border border-[#8B9A46]/20 mb-8">
              <Shield className="size-4 text-[#8B9A46]" />
              <span className="text-xs font-semibold text-[#8B9A46] tracking-wider uppercase">Veterans U™</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              Financial Readiness,{" "}
              <span className="bg-gradient-to-r from-[#8B9A46] to-[#8B9A46]/70 bg-clip-text text-transparent">Mission Accomplished</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
              A platform built to honor your service by equipping you with the financial tools, education, and resources you've earned. From VA loans to estate planning - your next mission starts here.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://veterans.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-[#8B9A46] hover:bg-[#6B7A36] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B9A46]/30 text-lg flex items-center gap-3"
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
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#8B9A46] mb-1">{number}</div>
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
                dangerouslySetInnerHTML={{ __html: `Without a Plan, Veterans Face <span class="text-red-400">Unnecessary Risk</span>` }} />
              <p className="text-white/40 leading-relaxed">
                You served to protect our freedom. But too many veterans come home without the financial tools to protect their own families:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Unused VA Benefits", desc: "Most veterans don't fully utilize their VA benefits. VA loans alone can save you hundreds of thousands over a lifetime - but only if you know how to use them.", icon: Shield },
              { title: "No Estate Protection", desc: "Service members face unique legal situations. Without proper estate planning, your family could face years of probate and thousands in legal fees.", icon: FileText },
              { title: "No Transition Support", desc: "Going from military to civilian financial life is one of the hardest transitions. Without proper education, many veterans struggle financially.", icon: Users },
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B9A46]/10 border border-[#8B9A46]/20 mb-6">
                <Sparkles className="size-4 text-[#8B9A46]" />
                <span className="text-xs font-medium text-[#8B9A46] uppercase tracking-wider">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Veterans U™ Has Your <span class="text-gold-gradient">Six</span>` }} />
              <p className="text-white/40 leading-relaxed">
                We built this platform specifically for those who served. Every resource, course, and tool is designed with the military community in mind.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Your Free Account", desc: "Sign up and get instant access to military financial courses, VA resources, and estate planning tools." },
              { step: "02", title: "Master Your Benefits", desc: "Learn to maximize VA loans, understand your benefits, and build a financial strategy for civilian life." },
              { step: "03", title: "Secure Your Family's Future", desc: "Estate documents, asset protection, and wealth-building tools to create the legacy your service deserves." },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-[#8B9A46]/10 border border-[#8B9A46]/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="size-7 text-[#8B9A46]" />
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
                Everything Inside <span className="bg-gradient-to-r from-[#8B9A46] to-[#8B9A46]/70 bg-clip-text text-transparent">Veterans U™</span>
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
                  <div className="w-10 h-10 rounded-lg bg-[#8B9A46]/10 border border-[#8B9A46]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#8B9A46]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">{value}</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#8B9A46]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal delay={features.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#8B9A46]/30 bg-gradient-to-br from-[#8B9A46]/10 to-[#8B9A46]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">All of this is</p>
                <p className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#8B9A46] to-[#8B9A46]/70 bg-clip-text text-transparent mb-3">FREE</p>
                <p className="text-sm text-white/40 mb-6">Create your account and start learning today. Upgrade to Pro ($75/mo) anytime for premium tools.</p>
                <a
                  href="https://veterans.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-12 py-5 bg-[#8B9A46] hover:bg-[#6B7A36] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B9A46]/30 text-lg"
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
                Real People, <span className="bg-gradient-to-r from-[#8B9A46] to-[#8B9A46]/70 bg-clip-text text-transparent">Real Results</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "SGT Mike D.", location: "US Army (Ret.)", text: "I had no idea I was leaving so much money on the table with my VA benefits. Veterans U showed me how to use my VA loan to buy my first investment property.", stars: 5 },
              { name: "CPO Sarah T.", location: "US Navy (Ret.)", text: "The transition from military to civilian finances was overwhelming until I found Veterans U. The courses are straightforward and actually relevant to veterans.", stars: 5 },
              { name: "SSG Rodriguez Family", location: "US Marines", text: "We finally have a trust, a will, and a real financial plan for our family. Veterans U made it simple and affordable. This is what we needed.", stars: 5 },
            ].map(({ name, location, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#8B9A46] fill-[#8B9A46]" />
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
                Frequently Asked <span className="bg-gradient-to-r from-[#8B9A46] to-[#8B9A46]/70 bg-clip-text text-transparent">Questions</span>
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
                      <ChevronUp className="size-5 text-[#8B9A46] flex-shrink-0" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B9A46]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `You Protected Our Country. Now Let Us Help <span class="text-gold-gradient">Protect</span> Your Family.` }} />
              <p className="text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                Your service earned you benefits most veterans never use. Don't leave money on the table. Start building the legacy your family deserves.
              </p>
              <a
                href="https://veterans.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#8B9A46] hover:bg-[#6B7A36] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B9A46]/30 text-lg"
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
