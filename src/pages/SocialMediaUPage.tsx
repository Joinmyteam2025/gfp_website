import { SEO, courseSchema } from "../components/SEO";
import { useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  GraduationCap,
  Lock,
  Share2,
  Shield,
  Sparkles,
  Star,
  Users
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Features ─── */
const features = [
  { name: "Creator Courses", icon: GraduationCap, value: "$997", desc: "Learn content strategy, audience growth, engagement tactics, and how to build a brand that lasts. Taught by successful creators." },
  { name: "Brand Deal Marketplace", icon: BadgeDollarSign, value: "$2,000+", desc: "Browse and apply to paid partnerships. Get matched with brands looking for creators in your niche." },
  { name: "Get Paid to Post", icon: Share2, value: "$1,500", desc: "Earn commissions by sharing products you love. Track earnings, manage campaigns, and scale your income." },
  { name: "Estate Document Center", icon: FileText, value: "$5,000", desc: "Living trust, will, power of attorney - protect your brand and earnings with proper legal documents." },
  { name: "Asset Protection Suite", icon: Shield, value: "$2,000", desc: "Credit monitoring, identity protection, dispute tools. Guard your brand and your finances." },
  { name: "Real Estate Portal", icon: Building2, value: "$1,500", desc: "Turn creator income into real assets. Investment properties, education, and tools for building long-term wealth." },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is Social Media U™?",
    a: "Social Media U™ is a free education platform for content creators and influencers. It includes creator courses, a brand deal marketplace, tools to get paid to post, estate planning, and financial education - all designed to help creators build sustainable income.",
  },
  {
    q: "Is it really free?",
    a: "Yes - creating an account and accessing the core platform is 100% free. We offer an optional Pro upgrade ($75/mo) that unlocks premium tools like the full estate document center, credit repair, identity protection, and professional services.",
  },
  {
    q: "How many followers do I need?",
    a: "Zero! Social Media U is designed for creators at every level - from just starting out to established influencers. In fact, the earlier you build your business foundation, the faster you'll grow.",
  },
  {
    q: "What kind of brand deals are available?",
    a: "Our marketplace includes partnerships with major brands across food, fashion, tech, fitness, and more. New deals are added weekly and range from product gifting to paid campaigns.",
  },
  {
    q: "Can I use this for any platform?",
    a: "Absolutely. Whether you're on TikTok, Instagram, YouTube, X, or any other platform, the strategies and tools in Social Media U work across all social media channels.",
  },
  {
    q: "What if I want to upgrade later?",
    a: "You can upgrade to Pro anytime from your dashboard. The Pro Bundle unlocks all premium features for $75/month with no long-term commitment.",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "1000+", label: "Brand Deals" },
  { number: "$50K+", label: "Creator Payouts" },
  { number: "15+", label: "Creator Courses" },
  { number: "FREE", label: "To Get Started" },
];

export function SocialMediaUPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Social Media U\u2122 | Social Media Marketing & Content Creation Education"
        description="Master your digital presence. Social Media U teaches content creation, social media marketing, personal branding, and monetization strategies for influencers and creators. Free signup."
        keywords={["social media education", "content creator courses", "social media marketing education", "influencer marketing education", "personal branding course", "social media monetization", "content creation education", "digital marketing education", "social media growth strategies", "creator economy education"]}
        canonicalUrl="https://garnerfinancialpartners.com/social-media-u"
        structuredData={courseSchema("Social Media U", "Social media marketing, content creation, and personal branding education.", "https://garnerfinancialpartners.com/social-media-u")}
      />
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#7C3AED]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#7C3AED]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-8">
              <Share2 className="size-4 text-[#7C3AED]" />
              <span className="text-xs font-semibold text-[#7C3AED] tracking-wider uppercase">Social Media U™</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              Your Brand Empire,{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/70 bg-clip-text text-transparent">Built & Monetized</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
              The ultimate platform for content creators and influencers to monetize their brand, land paid partnerships, grow their audience, and protect their earnings - all in one place.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://social.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#7C3AED]/30 text-lg flex items-center gap-3"
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
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#7C3AED] mb-1">{number}</div>
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
                dangerouslySetInnerHTML={{ __html: `Without a Strategy, Creators Get <span class="text-red-400">Burned Out</span>` }} />
              <p className="text-white/40 leading-relaxed">
                95% of creators make less than minimum wage. The creator economy is booming, but most creators don't have the business tools to capitalize:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "No Monetization Plan", desc: "Posting content without a monetization strategy is just a hobby. Most creators never learn how to turn followers into real income.", icon: Share2 },
              { title: "No Legal Protection", desc: "One bad brand deal, one copyright dispute, one stolen identity - and your entire brand can crumble without proper protection.", icon: FileText },
              { title: "No Business Education", desc: "Schools don't teach you how to be a creator. Without business fundamentals, most creators burn out within a year.", icon: Users },
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-6">
                <Sparkles className="size-4 text-[#7C3AED]" />
                <span className="text-xs font-medium text-[#7C3AED] uppercase tracking-wider">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Social Media U™ <span class="text-gold-gradient">Levels You Up</span>` }} />
              <p className="text-white/40 leading-relaxed">
                We built the platform we wish existed when we started creating. Everything a creator needs to build, monetize, and protect their brand empire.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Your Free Account", desc: "Sign up in 30 seconds. Get instant access to creator courses, brand deal marketplace, and financial tools." },
              { step: "02", title: "Land Your First Brand Deal", desc: "Browse paid partnerships, submit proposals, and get paid to post. New deals added weekly from top brands." },
              { step: "03", title: "Protect Your Empire", desc: "Estate docs, asset protection, credit building, and financial planning to secure your creator income long-term." },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="size-7 text-[#7C3AED]" />
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
                Everything Inside <span className="bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/70 bg-clip-text text-transparent">Social Media U™</span>
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
                  <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#7C3AED]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">{value}</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#7C3AED]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal delay={features.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#7C3AED]/30 bg-gradient-to-br from-[#7C3AED]/10 to-[#7C3AED]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">All of this is</p>
                <p className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/70 bg-clip-text text-transparent mb-3">FREE</p>
                <p className="text-sm text-white/40 mb-6">Create your account and start learning today. Upgrade to Pro ($75/mo) anytime for premium tools.</p>
                <a
                  href="https://social.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-12 py-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#7C3AED]/30 text-lg"
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
                Real People, <span className="bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/70 bg-clip-text text-transparent">Real Results</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Jasmine K.", location: "Content Creator", text: "I went from posting for fun to making $3K/month from brand deals within my first 3 months on Social Media U. The marketplace is a game-changer.", stars: 5 },
              { name: "Tyler M.", location: "YouTuber", text: "The creator courses taught me more in a week than I learned in 2 years of figuring things out on my own. Wish I found this sooner.", stars: 5 },
              { name: "Sophia R.", location: "Instagram Influencer", text: "I never thought about protecting my brand legally until Social Media U showed me how vulnerable I was. Now I have a trust and real asset protection.", stars: 5 },
            ].map(({ name, location, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#7C3AED] fill-[#7C3AED]" />
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
                Frequently Asked <span className="bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/70 bg-clip-text text-transparent">Questions</span>
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
                      <ChevronUp className="size-5 text-[#7C3AED] flex-shrink-0" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Stop Posting for Free. Start Building an <span class="text-gold-gradient">Empire</span>.` }} />
              <p className="text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                The creator economy waits for no one. Every day you're not monetizing is a day of lost income. Join the platform built to turn your content into a career.
              </p>
              <a
                href="https://social.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#7C3AED]/30 text-lg"
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
