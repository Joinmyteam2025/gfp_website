
import {
  ArrowRight,
  Trophy,
  Sparkles,
  DollarSign,
  Users,
  TrendingUp,
  Building2,
  Star,
  ExternalLink,
  Megaphone,
  Camera,
  Handshake,
  Target,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Brand data ─── */
const brands = [
  { name: "Nike", logo: "https://logo.clearbit.com/nike.com", industry: "Sportswear & Apparel", avgDeal: "$5K – $15K", featured: true },
  { name: "Gatorade", logo: "https://logo.clearbit.com/gatorade.com", industry: "Food & Beverage", avgDeal: "$2K – $5K", featured: true },
  { name: "Under Armour", logo: "https://logo.clearbit.com/underarmour.com", industry: "Sportswear & Apparel", avgDeal: "$7K – $8K", featured: true },
  { name: "Beats by Dre", logo: "https://logo.clearbit.com/beatsbydre.com", industry: "Technology", avgDeal: "$4K – $6K", featured: true },
  { name: "State Farm", logo: "https://logo.clearbit.com/statefarm.com", industry: "Insurance & Finance", avgDeal: "$12K – $15K", featured: true },
  { name: "Fanatics", logo: "https://logo.clearbit.com/fanatics.com", industry: "Sports Merchandise", avgDeal: "$3K – $4K", featured: true },
  { name: "Chipotle", logo: "https://logo.clearbit.com/chipotle.com", industry: "Food & Beverage", avgDeal: "$1K – $3K", featured: false },
  { name: "Cash App", logo: "https://logo.clearbit.com/cash.app", industry: "Fintech", avgDeal: "$3K – $5K", featured: false },
  { name: "Oakley", logo: "https://logo.clearbit.com/oakley.com", industry: "Sportswear & Apparel", avgDeal: "$4K – $5K", featured: false },
  { name: "Bose", logo: "https://logo.clearbit.com/bose.com", industry: "Technology", avgDeal: "$5K – $8K", featured: false },
  { name: "Celsius", logo: "https://logo.clearbit.com/celsius.com", industry: "Health & Nutrition", avgDeal: "$1.5K – $2K", featured: false },
  { name: "Sleep Number", logo: "https://logo.clearbit.com/sleepnumber.com", industry: "Lifestyle & Wellness", avgDeal: "$8K – $10K", featured: false },
  { name: "Muscle Milk", logo: "https://logo.clearbit.com/musclemilk.com", industry: "Health & Nutrition", avgDeal: "$2K – $3.5K", featured: false },
  { name: "Barstool Sports", logo: "https://logo.clearbit.com/barstoolsports.com", industry: "Media & Entertainment", avgDeal: "$2K – $2.5K", featured: false },
  { name: "Raising Cane's", logo: "https://logo.clearbit.com/raisingcanes.com", industry: "Food & Beverage", avgDeal: "$800 – $1.5K", featured: false },
];

const dealTypes = [
  { icon: Camera, title: "Social Media Posts", desc: "Create branded content on Instagram, TikTok, or YouTube featuring partner products.", range: "$800 – $5,000" },
  { icon: Star, title: "Brand Ambassador", desc: "Long-term partnerships with exclusive gear, quarterly stipends, and performance bonuses.", range: "$8,000 – $15,000" },
  { icon: Megaphone, title: "Content Creation", desc: "Produce workout videos, lifestyle reels, or product reviews for brand channels.", range: "$2,000 – $4,000" },
  { icon: Handshake, title: "Appearances", desc: "In-person or virtual events, autograph signings, speaking engagements, and community events.", range: "$2,500 – $12,000" },
  { icon: TrendingUp, title: "Affiliate Programs", desc: "Earn commissions on every sale through your unique referral links and discount codes.", range: "5% – 30% commission" },
  { icon: Target, title: "Podcast & Interviews", desc: "Guest spots on branded podcasts, video interviews, and media appearances.", range: "$1,500 – $5,000" },
];

export function MarketplacePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#C5963A]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-[#1a3a6b]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
          {/* Floating particles */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#C5963A]/30 rounded-full animate-float" />
          <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-[#C5963A]/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-[#C5963A]/40 rounded-full animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-8">
              <DollarSign className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Brand Deals · NIL · Influencer Partnerships</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
              Real Brands.{" "}
              <span className="text-gold-gradient">Real Deals.</span>{" "}
              Real Money.
            </h1>

            {/* Subheading */}
            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              Our portals connect athletes and creators with verified brand partnerships — from Nike and Gatorade to Beats by Dre. Browse deals, apply instantly, and get paid.
            </p>

            {/* Stats */}
            <div className="fade-up fade-up-delay-3 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
              {[
                { icon: Building2, value: "268+", label: "Verified Brands" },
                { icon: DollarSign, value: "$15K+", label: "Top Deal Value" },
                { icon: Users, value: "500+", label: "Open Spots" },
                { icon: Zap, value: "FREE", label: "To Browse & Apply" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 mb-3">
                    <Icon className="size-5 text-[#C5963A]" />
                  </div>
                  <p className="text-2xl md:text-3xl font-serif font-bold text-gold-gradient">{value}</p>
                  <p className="text-xs text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="fade-up fade-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://athlete.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/25 flex items-center gap-2 text-lg"
              >
                <Trophy className="size-5" />
                Athletes — Browse NIL Deals
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://social.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#C5963A]/30 font-medium rounded-xl transition-all duration-300 flex items-center gap-2 text-lg"
              >
                <Sparkles className="size-5" />
                Creators — Browse Influencer Deals
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BRAND LOGO TICKER ═══ */}
      <section className="py-12 border-y border-white/5 bg-[#070F1D]/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-white/30 tracking-widest uppercase mb-8">Brands Available Inside Our Portals</p>
          <div className="relative overflow-hidden">
            <div className="logo-scroll flex items-center gap-12 whitespace-nowrap">
              {[...brands, ...brands].map((brand, i) => (
                <div key={i} className="flex items-center gap-3 flex-shrink-0">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-8 h-8 rounded-lg object-contain bg-white/10 p-1"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <span className="text-white/30 font-semibold text-sm tracking-wide">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEAL TYPES ═══ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1D3A]/50 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Types of Deals</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Multiple Ways to <span className="text-gold-gradient">Earn</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto">
                From quick social media posts to long-term brand ambassador partnerships — there's a deal for every audience size and every niche.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {dealTypes.map(({ icon: Icon, title, desc, range }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="glass-card rounded-xl p-8 h-full group">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-lg bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center group-hover:bg-[#C5963A]/20 transition-colors">
                      <Icon className="size-6 text-[#C5963A]" />
                    </div>
                    <span className="text-sm font-bold text-gold-gradient">{range}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED BRANDS GRID ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Brand Partners</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Verified <span className="text-gold-gradient">Brands</span> With Active Deals
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto">
                Every brand on our marketplace is verified. Real companies, real budgets, real opportunities.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {brands.map((brand, i) => (
              <ScrollReveal key={brand.name} delay={i * 60}>
                <div className="glass-card rounded-xl p-6 group hover:border-[#C5963A]/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2 group-hover:border-[#C5963A]/20 transition-colors">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.style.display = "none";
                          el.parentElement!.innerHTML = `<span class="text-xl font-serif font-bold text-[#C5963A]">${brand.name.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-serif font-bold text-white truncate">{brand.name}</h3>
                        {brand.featured && (
                          <CheckCircle2 className="size-4 text-[#C5963A] flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-white/30">{brand.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">Avg. Deal Range</p>
                      <p className="text-sm font-bold text-gold-gradient">{brand.avgDeal}</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20">
                      <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">Active</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TWO PORTALS ═══ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Choose Your Path</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Two Portals. <span className="text-gold-gradient">Unlimited Earning.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Athlete U */}
            <ScrollReveal delay={0}>
              <div className="relative group h-full">
                <div className="absolute -inset-px bg-gradient-to-r from-[#C5963A]/30 to-[#1a3a6b]/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card rounded-2xl p-8 lg:p-10 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                      <Trophy className="size-7 text-[#C5963A]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white">Athlete U™</h3>
                      <p className="text-xs text-[#C5963A]/60 tracking-wide uppercase">NIL Marketplace</p>
                    </div>
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    Built for athletes at every level. Browse NIL deals from brands like Nike, Gatorade, and Under Armour. Build your media kit, apply to deals, and get paid for your name, image, and likeness.
                  </p>

                  <div className="space-y-3 mb-8 flex-1">
                    {[
                      "268+ verified brand partners",
                      "Deals from $800 to $15,000+",
                      "Built-in media kit builder",
                      "NIL Prospector AI tool",
                      "Apply to deals in one click",
                      "Real estate & financial marketplaces included",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="size-4 text-[#C5963A] flex-shrink-0" />
                        <span className="text-sm text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://athlete.garnerfinancialpartners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn w-full py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#C5963A]/20 flex items-center justify-center gap-2 text-lg"
                  >
                    Explore NIL Deals
                    <ArrowRight className="size-5 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                  <p className="text-center text-xs text-white/20 mt-3">Free to sign up · No credit card required</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Social Media U */}
            <ScrollReveal delay={150}>
              <div className="relative group h-full">
                <div className="absolute -inset-px bg-gradient-to-r from-[#1a3a6b]/30 to-[#C5963A]/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card rounded-2xl p-8 lg:p-10 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                      <Sparkles className="size-7 text-[#C5963A]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white">Social Media U™</h3>
                      <p className="text-xs text-[#C5963A]/60 tracking-wide uppercase">Influencer Marketplace</p>
                    </div>
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    Built for creators, influencers, and content entrepreneurs. Browse affiliate programs, brand deals, and paid promotions. Whether you have 1K or 1M followers — there are deals for you.
                  </p>

                  <div className="space-y-3 mb-8 flex-1">
                    {[
                      "Affiliate programs with top brands",
                      "Brand ambassador partnerships",
                      "Paid content creation opportunities",
                      "Creator media kit builder",
                      "Commissions up to 30%",
                      "Real estate & financial marketplaces included",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="size-4 text-[#C5963A] flex-shrink-0" />
                        <span className="text-sm text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://social.garnerfinancialpartners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn w-full py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#C5963A]/20 flex items-center justify-center gap-2 text-lg"
                  >
                    Explore Influencer Deals
                    <ArrowRight className="size-5 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                  <p className="text-center text-xs text-white/20 mt-3">Free to sign up · No credit card required</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">The Process</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                How to Start <span className="text-gold-gradient">Earning</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Sign Up Free", desc: "Create your free account on Athlete U™ or Social Media U™ in under 60 seconds." },
              { step: "02", title: "Build Your Profile", desc: "Add your social media stats, niche, and what kind of deals you're looking for." },
              { step: "03", title: "Browse & Apply", desc: "Explore deals from verified brands. Filter by type, pay range, and sport/niche." },
              { step: "04", title: "Get Paid", desc: "Brands review your application. Get approved, create content, and earn." },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="text-center relative">
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#C5963A]/30 to-transparent" />
                  )}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C5963A]/5 border border-[#C5963A]/15 mb-5">
                    <span className="text-2xl font-serif font-bold text-[#C5963A]">{step}</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C5963A]/5 via-transparent to-[#1a3a6b]/5" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#C5963A]/10 border border-[#C5963A]/20 mb-8 animate-pulse-gold">
                <DollarSign className="size-10 text-[#C5963A]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Your Audience Is Worth <span className="text-gold-gradient">Real Money</span>
              </h2>
              <p className="text-lg text-white/40 mb-10 leading-relaxed">
                Stop leaving money on the table. Whether you're an athlete with NIL potential or a creator with an engaged audience — the deals are waiting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://athlete.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                >
                  <Trophy className="size-5" />
                  Athlete U™
                  <ExternalLink className="size-4 opacity-50" />
                </a>
                <a
                  href="https://social.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#C5963A]/30 font-semibold rounded-xl transition-all duration-300 text-lg"
                >
                  <Sparkles className="size-5" />
                  Social Media U™
                  <ExternalLink className="size-4 opacity-50" />
                </a>
              </div>
              <p className="mt-4 text-sm text-white/20">100% free. No credit card. Start earning today.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
