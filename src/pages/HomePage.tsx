import { SEO, organizationSchema } from "../components/SEO";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  ChevronRight,
  ArrowRight,
  Star,
  TrendingUp,
  Building2,
  FileText,
  Zap,
  Brain,
  Globe,
  Lock,
  Sparkles,
  Target,
  Rocket,
  Medal,
  Trophy,
  DollarSign,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Partner logos ─── */
const partners = [
  "Mutual of Omaha",
  "InstaBrain",
  "HighLevel",
  "Brokers Alliance",
  "Lincoln Financial",
  "North American",
  "Pacific Life",
  "National Life Group",
  "Fidelity Life",
];

/* ─── Marketplace brands ─── */
const marketplaceBrands = [
  { name: "Nike", logo: "https://logo.clearbit.com/nike.com" },
  { name: "Gatorade", logo: "https://logo.clearbit.com/gatorade.com" },
  { name: "Under Armour", logo: "https://logo.clearbit.com/underarmour.com" },
  { name: "Beats by Dre", logo: "https://logo.clearbit.com/beatsbydre.com" },
  { name: "State Farm", logo: "https://logo.clearbit.com/statefarm.com" },
  { name: "Fanatics", logo: "https://logo.clearbit.com/fanatics.com" },
  { name: "Chipotle", logo: "https://logo.clearbit.com/chipotle.com" },
  { name: "Cash App", logo: "https://logo.clearbit.com/cash.app" },
  { name: "Oakley", logo: "https://logo.clearbit.com/oakley.com" },
  { name: "Bose", logo: "https://logo.clearbit.com/bose.com" },
  { name: "Celsius", logo: "https://logo.clearbit.com/celsius.com" },
  { name: "Sleep Number", logo: "https://logo.clearbit.com/sleepnumber.com" },
  { name: "Barstool Sports", logo: "https://logo.clearbit.com/barstoolsports.com" },
  { name: "Raising Cane's", logo: "https://logo.clearbit.com/raisingcanes.com" },
];

/* ─── Animated counter ─── */
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = end / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [end, started]);

  return (
    <span
      ref={(el) => {
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
        }, { threshold: 0.5 });
        obs.observe(el);
      }}
    >
      {prefix}{count}{suffix}
    </span>
  );
}

export function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Garner Financial Partners | Financial Education, Protection & Wealth Building"
        description="Garner Financial Partners provides comprehensive financial education, asset protection strategies, and wealth building tools. Fortress Programs and specialized U portals help you protect what matters most."
        keywords={["financial education company", "wealth building education", "asset protection education", "financial literacy platform", "Garner Financial Partners", "fortress program", "financial education platform", "wealth management education", "financial independence education", "generational wealth education"]}
        canonicalUrl="https://garnerfinancialpartners.com/"
        structuredData={organizationSchema()}
      />
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#C5963A]/[0.04] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
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
              <Sparkles className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Financial Education · Vision · Implementation</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
              Contributor to{" "}
              <span className="text-gold-gradient">Controller</span>
            </h1>

            {/* Subheading */}
            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              Transition from 'Contributor' to outdated systems, vulnerable to increasing taxes & inflation, to becoming a 'Controller' — the new way of structuring trusts, assets and wealth.
            </p>

            {/* CTA buttons */}
            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button type="button"
                onClick={() => { (window as any).openVapiWidget?.(); }}
                className="group px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/25 flex items-center gap-2 text-lg"
              >
                Speak to Us
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                to="/about"
                className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                Learn More
                <ChevronRight className="size-4 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Stats bar */}
            <div className="fade-up fade-up-delay-4 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
              {[
                { value: 20, suffix: "+", label: "Years Experience" },
                { value: 100, prefix: "$", suffix: "M+", label: "Online Sales Generated" },
                { value: 500, suffix: "+", label: "Clients Protected" },
                { value: 15, suffix: "+", label: "Financial Calculators" },
              ].map(({ value, suffix, prefix, label }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl md:text-4xl font-serif font-bold text-gold-gradient">
                    <Counter end={value} suffix={suffix} prefix={prefix} />
                  </p>
                  <p className="text-xs text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] text-white/50 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#C5963A] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══ PARTNER LOGOS ═══ */}
      <section className="py-12 border-y border-white/5 bg-[#070F1D]/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-white/30 tracking-widest uppercase mb-8">Trusted Partners & Carriers</p>
          <div className="relative overflow-hidden">
            <div className="logo-scroll flex items-center gap-16 whitespace-nowrap">
              {[...partners, ...partners].map((name, i) => (
                <span key={i} className="text-white/20 font-semibold text-sm tracking-wide flex-shrink-0">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1D3A]/50 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">What We Do</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Financial <span className="text-gold-gradient">Excellence</span>, Redefined
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto">
                We combine cutting-edge AI technology with proven financial strategies to protect and grow your wealth.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI-Powered Education",
                desc: "Leverage artificial intelligence and automation to enhance your financial education and streamline your strategy implementation.",
              },
              {
                icon: Shield,
                title: "Asset Protection Education",
                desc: "Learn how legal structures like trusts, wills, and power of attorney documents can help protect your family and assets.",
              },
              {
                icon: TrendingUp,
                title: "Business Growth",
                desc: "Proven systems that have generated over $100M in online sales. From CRM automation to full-funnel marketing strategies.",
              },
              {
                icon: Lock,
                title: "Estate Planning",
                desc: "Done-with-you estate planning programs generating up to 11 legal documents customized to your state and situation.",
              },
              {
                icon: Globe,
                title: "Digital Marketing",
                desc: "Custom websites, landing pages, funnels, and ad campaigns built by experts who've scaled nine-figure brands.",
              },
              {
                icon: Zap,
                title: "Sales Automation",
                desc: "Full CRM implementation, workflow automation, and lead generation systems that work for you 24/7.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="glass-card rounded-xl p-8 h-full group">
                  <div className="w-12 h-12 rounded-lg bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mb-5 group-hover:bg-[#C5963A]/20 transition-colors">
                    <Icon className="size-6 text-[#C5963A]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMS (FFP / BFP) ═══ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Our Programs</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Build Your <span className="text-gold-gradient">Fortress</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto">
                Comprehensive estate planning, business protection, and veteran-focused programs designed for families, entrepreneurs, and those who served.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Family Fortress */}
            <ScrollReveal delay={0}>
              <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-[#C5963A]/30 to-[#1a3a6b]/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                      <Shield className="size-6 text-[#C5963A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">Family Fortress</h3>
                      <p className="text-[10px] text-[#C5963A]/60 tracking-wide">ESTATE PLANNING PROGRAM</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-5">
                    Done-with-you estate planning that generates comprehensive legal documents including trusts, wills, power of attorney, healthcare directives, and more. Customized for your state.
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {["Revocable Living Trust", "Last Will & Testament", "Power of Attorney", "Healthcare Directive", "Medical Consent", "Certificate of Trust"].map((doc) => (
                      <div key={doc} className="flex items-center gap-2">
                        <FileText className="size-3.5 text-[#C5963A] flex-shrink-0" />
                        <span className="text-xs text-white/50">{doc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-3xl font-serif font-bold text-white">$297</span>
                      <span className="text-sm text-white/30 ml-2">one-time</span>
                    </div>
                    <Link
                      to="/ffp"
                      className="px-5 py-2.5 bg-[#C5963A] hover:bg-[#9E7730] text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                      Get Started <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Business Fortress */}
            <ScrollReveal delay={150}>
              <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-[#1a3a6b]/30 to-[#C5963A]/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                      <Building2 className="size-6 text-[#C5963A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">Business Fortress</h3>
                      <p className="text-[10px] text-[#C5963A]/60 tracking-wide">BUSINESS PROTECTION PROGRAM</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-5">
                    Comprehensive business entity structuring for holding companies, business trusts, and asset protection. The same 7-step process used by high-net-worth entrepreneurs.
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {["Holding Company Setup", "Business Trust", "Asset Protection", "Entity Structuring", "Liability Shield", "Tax Optimization"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Building2 className="size-3.5 text-[#C5963A] flex-shrink-0" />
                        <span className="text-xs text-white/50">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-3xl font-serif font-bold text-white">$997</span>
                      <span className="text-sm text-white/30 ml-2">one-time</span>
                    </div>
                    <Link
                      to="/bfp"
                      className="px-5 py-2.5 bg-[#C5963A] hover:bg-[#9E7730] text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                      Get Started <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Military Fortress */}
            <ScrollReveal delay={300}>
              <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-[#C5963A]/30 to-[#1a3a6b]/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                      <Medal className="size-6 text-[#C5963A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">Military Fortress</h3>
                      <p className="text-[10px] text-[#C5963A]/60 tracking-wide">VETERAN PROTECTION PROGRAM</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-5">
                    Purpose-built estate planning and asset protection for veterans, active-duty service members, and military families. Honoring your service by securing your legacy.
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {["Revocable Living Trust", "VA Benefit Protection", "Power of Attorney", "Healthcare Directive", "Military Asset Shield", "Survivor Planning"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Medal className="size-3.5 text-[#C5963A] flex-shrink-0" />
                        <span className="text-xs text-white/50">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-3xl font-serif font-bold text-white">$97</span>
                      <span className="text-sm text-white/30 ml-2">one-time</span>
                    </div>
                    <Link
                      to="/mfp"
                      className="px-5 py-2.5 bg-[#C5963A] hover:bg-[#9E7730] text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                      Get Started <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ MARKETPLACE TEASER ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50 overflow-hidden">
        {/* Subtle glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C5963A]/[0.03] rounded-full blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <DollarSign className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A]">Earn While You Learn</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Access Real <span className="text-gold-gradient">Brand Deals</span> Inside Our Portals
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto">
                Our members don't just learn — they earn. Browse deals from brands like Nike, Gatorade, Under Armour, and more.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {/* Athletes Card */}
            <ScrollReveal delay={0}>
              <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-[#C5963A]/30 to-[#1a3a6b]/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                      <Trophy className="size-6 text-[#C5963A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">For Athletes</h3>
                      <p className="text-[10px] text-[#C5963A]/60 tracking-wide uppercase">NIL Marketplace</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-5">
                    Browse 268+ verified brands offering $800 – $15,000+ per deal. Social media posts, brand ambassador programs, appearances, and more.
                  </p>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex -space-x-2">
                      {marketplaceBrands.slice(0, 5).map((b) => (
                        <img
                          key={b.name}
                          src={b.logo}
                          alt={b.name}
                          className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0A1628] object-contain p-1"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/30">+263 more brands</span>
                  </div>
                  <a
                    href="https://athlete.garnerfinancialpartners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto group/btn w-full py-3 bg-[#C5963A] hover:bg-[#9E7730] text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Explore NIL Deals
                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Creators Card */}
            <ScrollReveal delay={150}>
              <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-[#1a3a6b]/30 to-[#C5963A]/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                      <Sparkles className="size-6 text-[#C5963A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">For Creators & Influencers</h3>
                      <p className="text-[10px] text-[#C5963A]/60 tracking-wide uppercase">Influencer Marketplace</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-5">
                    Affiliate programs, brand ambassadorships, and paid content opportunities. Whether you have 1K or 1M followers — there are deals for you.
                  </p>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex -space-x-2">
                      {marketplaceBrands.slice(5, 10).map((b) => (
                        <img
                          key={b.name}
                          src={b.logo}
                          alt={b.name}
                          className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0A1628] object-contain p-1"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/30">+263 more brands</span>
                  </div>
                  <a
                    href="https://social.garnerfinancialpartners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto group/btn w-full py-3 bg-[#C5963A] hover:bg-[#9E7730] text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Explore Influencer Deals
                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Brand logo ticker */}
          <ScrollReveal delay={200}>
            <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 py-6 max-w-5xl mx-auto">
              <div className="brand-logo-scroll flex items-center gap-10 whitespace-nowrap">
                {[...marketplaceBrands, ...marketplaceBrands].map((brand, i) => (
                  <div key={i} className="flex items-center gap-2.5 flex-shrink-0">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-7 h-7 rounded-md object-contain bg-white/10 p-0.5"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <span className="text-white/25 font-semibold text-xs tracking-wide">{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-6">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 text-[#C5963A] hover:text-[#F5E6C8] font-medium text-sm transition-colors"
              >
                See all deals and brands <ArrowRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">The Process</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                How It <span className="text-gold-gradient">Works</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: Target,
                title: "Book Your Call",
                desc: "Schedule a free blueprint call where we understand your goals, assets, and family needs.",
              },
              {
                step: "02",
                icon: FileText,
                title: "Custom Strategy",
                desc: "We build a personalized plan using AI-powered tools and proven legal frameworks tailored to your state.",
              },
              {
                step: "03",
                icon: Shield,
                title: "Fortress Built",
                desc: "Your legal documents are generated, reviewed, and delivered. With ongoing support through your client portal.",
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 150}>
                <div className="text-center relative">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#C5963A]/30 to-transparent" />
                  )}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-[#C5963A]/5 border border-[#C5963A]/15 mb-6">
                    <Icon className="size-10 text-[#C5963A]" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#C5963A] text-white text-xs font-bold flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Testimonials</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Client <span className="text-gold-gradient">Success Stories</span>
              </h2>
              <p className="text-white/40 max-w-xl mx-auto">
                Get systems working for you 24/7
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Curtis",
                role: "CEO",
                quote: "We hired Garner Financial Partners in 2018 as our Marketing Contractor, and my agency grew from $2M to $30M in 24 months.",
              },
              {
                name: "Kimberly",
                role: "CEO",
                quote: "Garner Financial Partners knew what was needed and how to implement it. Was a huge time, money and energy saver.",
              },
              {
                name: "David",
                role: "CEO",
                quote: "Garner Financial Partners' experience with lead generation helped us scale our revenue and overall profit.",
              },
            ].map(({ name, role, quote }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-xl p-8 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="size-4 text-[#C5963A] fill-[#C5963A]" />
                    ))}
                  </div>
                  <blockquote className="text-white/60 text-sm leading-relaxed mb-6 flex-1 italic">
                    "{quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                      <span className="text-sm font-serif font-bold text-[#C5963A]">{name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{name}</p>
                      <p className="text-xs text-white/30">{role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TOOLS SECTION ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Free Tools</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Financial <span className="text-gold-gradient">Calculators</span>
              </h2>
              <p className="text-white/40 max-w-xl mx-auto">
                Plan your financial future with our suite of professional calculators.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Savings", icon: "💰" },
              { name: "Compound Interest", icon: "📈" },
              { name: "Retirement", icon: "🏖️" },
              { name: "Mortgage", icon: "🏠" },
              { name: "IRA", icon: "📊" },
              { name: "Income", icon: "💵" },
              { name: "529 Plan", icon: "🎓" },
              { name: "Auto Loan", icon: "🚗" },
            ].map(({ name, icon }, i) => (
              <ScrollReveal key={name} delay={i * 50}>
                <Link
                  to="/calculators"
                  className="glass-card rounded-xl p-5 text-center group block"
                >
                  <span className="text-2xl mb-3 block">{icon}</span>
                  <p className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{name}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div className="text-center mt-10">
              <Link
                to="/calculators"
                className="inline-flex items-center gap-2 text-[#C5963A] hover:text-[#F5E6C8] font-medium transition-colors"
              >
                View all 15+ calculators <ArrowRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
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
                <Rocket className="size-10 text-[#C5963A]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Ready to Build Your <span className="text-gold-gradient">Financial Fortress</span>?
              </h2>
              <p className="text-lg text-white/40 mb-10 leading-relaxed">
                Speak to Us, our AI receptionist, and get instant answers about to protect your family, grow your wealth, and secure your legacy.
              </p>
              <button type="button"
                onClick={() => { (window as any).openVapiWidget?.(); }}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Speak to Us
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-4 text-sm text-white/20">No obligation. 100% free consultation.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
