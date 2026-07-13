import {
  ArrowRight,
  Calendar,
  Crown,
  Brain,
  TrendingUp,
  Sparkles,
  Rocket,
  GraduationCap,

} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

const events = [
  {
    slug: "masterclass",
    icon: GraduationCap,
    title: "Masterclass",
    tagline: "Deep-Dive Education Sessions",
    desc: "Comprehensive masterclass sessions covering financial strategies, AI marketing, wealth building, and business automation. Designed for action-takers.",
    type: "Educational",
    href: "https://business.garnerfinancialpartners.com/signup",
  },
  {
    slug: "mastermind",
    icon: Brain,
    title: "Mastermind",
    tagline: "Elite Group Coaching",
    desc: "High-level mastermind groups where entrepreneurs and professionals collaborate, share strategies, and accelerate growth together.",
    type: "Community",
    href: "https://business.garnerfinancialpartners.com/signup",
  },
  {
    slug: "mansion-mind",
    icon: Crown,
    title: "Mansion Mind",
    tagline: "Premium Retreat Experience",
    desc: "Exclusive in-person retreat combining luxury with high-impact strategy sessions. Network with top producers in an unforgettable setting.",
    type: "Exclusive",
    href: "https://business.garnerfinancialpartners.com/signup",
  },
  {
    slug: "ai-secrets",
    icon: Sparkles,
    title: "A.I. Secrets",
    tagline: "Cutting-Edge AI Strategies",
    desc: "Learn how to leverage artificial intelligence for marketing automation, lead generation, content creation, and business scaling.",
    type: "Technology",
    href: "https://business.garnerfinancialpartners.com/signup",
  },
  {
    slug: "wealth-secrets",
    icon: TrendingUp,
    title: "Wealth Secrets",
    tagline: "Financial Growth Strategies",
    desc: "Discover the wealth-building secrets used by high-net-worth individuals. From asset protection to passive income generation.",
    type: "Financial",
    href: "https://business.garnerfinancialpartners.com/signup",
  },
  {
    slug: "8figure-producer",
    icon: Rocket,
    title: "8-Figure Producer",
    tagline: "Scale to Eight Figures",
    desc: "The blueprint to scaling your business to eight figures. Systems, teams, marketing, and mindset from those who've done it.",
    type: "Business",
    href: "https://business.garnerfinancialpartners.com/signup",
  },

];

export function EventsPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C5963A]/[0.04] to-transparent rounded-full -translate-y-1/4 translate-x-1/4" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
              <Calendar className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Live Events & Training</span>
            </div>
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              <span className="text-gold-gradient">Events</span> & Experiences
            </h1>
            <p className="fade-up fade-up-delay-2 text-lg text-white/50 leading-relaxed">
              Transform your business and finances through immersive events, masterminds, and training programs.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Events Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map(({ slug, icon: Icon, title, tagline, desc, type, href }, i) => (
              <ScrollReveal key={slug} delay={i * 80}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-8 h-full flex flex-col group block"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-lg bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center group-hover:bg-[#C5963A]/20 transition-colors">
                      <Icon className="size-6 text-[#C5963A]" />
                    </div>
                    <span className="text-[10px] text-[#C5963A]/50 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-[#C5963A]/10">
                      {type}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-[#C5963A] transition-colors">{title}</h3>
                  <p className="text-xs text-[#C5963A]/50 mb-3">{tagline}</p>
                  <p className="text-sm text-white/40 leading-relaxed flex-1">{desc}</p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-sm text-white/40 group-hover:text-[#C5963A] transition-colors">
                    Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-white mb-6">
                Ready to <span className="text-gold-gradient">Level Up</span>?
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed">
                Don't just learn about success. Experience it. Book a call to find out which event or program is the best fit for your goals.
              </p>
              <button type="button"
                onClick={() => { (window as any).openVapiWidget?.(); }}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Speak to Us
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
