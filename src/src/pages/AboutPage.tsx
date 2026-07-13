import { SEO, webPageSchema } from "../components/SEO";
import { Shield, Award, TrendingUp, Clock, ArrowRight, Globe, GraduationCap, BookOpen, Dumbbell, Cross, Landmark, Medal, Building2, Share2, Home } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <SEO
        title="About Garner Financial Partners | Our Mission & Team"
        description="Learn about Garner Financial Partners - our mission to provide world-class financial education, asset protection, and wealth building tools to every American."
        keywords={["about Garner Financial Partners", "financial education company", "wealth building mission"]}
        canonicalUrl="https://garnerfinancialpartners.com/about"
        structuredData={webPageSchema("About Garner Financial Partners", "Our mission and team", "https://garnerfinancialpartners.com/about")}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C5963A]/[0.04] to-transparent rounded-full -translate-y-1/4 translate-x-1/4" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
              <GraduationCap className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Education-First Financial Empowerment</span>
            </div>
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              About <span className="text-gold-gradient">Garner Financial</span>
            </h1>
            <p className="fade-up fade-up-delay-2 text-lg text-white/50 leading-relaxed">
              A financial education company powered by A.I., equipping athletes, influencers, creators, families, and business owners with the knowledge, tools, and strategies to go from contributor to controller of their financial future.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Mission, Education First */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal>
              <div>
                <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Our Mission</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">
                  Education Is the Foundation of{" "}
                  <span className="text-gold-gradient">Generational Wealth</span>
                </h2>
                <div className="space-y-5 text-white/50 leading-relaxed">
                  <p>
                    At Garner Financial Partners, we believe that true wealth starts with knowledge. Before you can protect what you earn, you need to understand how money works, how to save it, grow it, and pass it on. That's why education is at the center of everything we do.
                  </p>
                  <p>
                    Through our seven proprietary learning portals - <span className="text-white/80 font-medium">Athlete U™</span>, <span className="text-white/80 font-medium">Business U™</span>, <span className="text-white/80 font-medium">Christian U™</span>, <span className="text-white/80 font-medium">Real Estate U™</span>, <span className="text-white/80 font-medium">Social Media U™</span>, <span className="text-white/80 font-medium">Veterans U™</span>, and <span className="text-white/80 font-medium">Wealth U™</span> - we deliver free, on-demand financial education tailored to unique communities that are often underserved by the traditional financial industry.
                  </p>
                  <p>
                    With 20+ years of industry expertise, a licensed insurance practice since 2010, and A.I.-powered marketing and automation systems, Garner Financial Partners has positioned itself as both a trusted educator and a disruptor, helping individuals, families, and entrepreneurs take control of their financial future.
                  </p>
                  <p>
                    Our team has delivered results for nine-figure influencers, global brands, and high-growth startups, generating over $100M in online sales and launching multi-million-dollar software platforms. Now, we're channeling that same innovation into financial literacy for every community we serve.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: GraduationCap, value: "7", label: "Free Learning Portals" },
                  { icon: Clock, value: "20+", label: "Years Experience" },
                  { icon: TrendingUp, value: "$100M+", label: "Sales Generated" },
                  { icon: Award, value: "Since 2010", label: "Licensed Professional" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="glass-card rounded-xl p-6 text-center">
                    <Icon className="size-6 text-[#C5963A] mx-auto mb-3" />
                    <p className="text-2xl font-serif font-bold text-white mb-1">{value}</p>
                    <p className="text-xs text-white/40">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* The U™ Portals, Education Platforms */}
      <section id="portals" className="py-24 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Our Education Platforms</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Learn. Protect. <span className="text-gold-gradient">Grow.</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
                Six free portals designed to meet you where you are - whether you're an athlete, a business owner, a person of faith, a creator, a veteran, or anyone ready to take control of their finances.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Dumbbell,
                title: "Athlete U™",
                desc: "Financial literacy built for athletes and high-earners. Learn how to protect your income, avoid common pitfalls, and build wealth that outlasts your career.",
                href: "https://athlete.garnerfinancialpartners.com/",
                tag: "FREE",
              },
              {
                icon: Building2,
                title: "Business U™",
                desc: "Financial education built for entrepreneurs and business owners. Master entity structuring, cash flow systems, exit planning, and strategies to protect and scale your business.",
                href: "https://business.garnerfinancialpartners.com/",
                tag: "FREE",
              },
              {
                icon: Home,
                title: "Real Estate U™",
                desc: "Real estate investing education from fix & flips to apartment complexes. Learn wholesaling, portfolio building, LLC structuring, and how to protect every property inside a living trust.",
                href: "https://realestate.garnerfinancialpartners.com/",
                tag: "FREE",
              },
              {
                icon: Cross,
                title: "Christian U™",
                desc: "Faith-based financial education rooted in Biblical principles. Discover how to steward your resources wisely and create a legacy of generational blessings.",
                href: "https://christian.garnerfinancialpartners.com/",
                tag: "FREE",
              },
              {
                icon: Share2,
                title: "Social Media U™",
                desc: "Everything you need to grow, monetize, and master social media. Learn the attention economy, content strategy, list building, and how to turn followers into income.",
                href: "https://social.garnerfinancialpartners.com/",
                tag: "FREE",
              },
              {
                icon: Medal,
                title: "Veteran U™",
                desc: "Financial education built for veterans and military families. Navigate VA benefits, transition planning, and wealth-building strategies tailored to those who served.",
                href: "https://veterans.garnerfinancialpartners.com/",
                tag: "FREE",
              },
              {
                icon: Landmark,
                title: "Wealth U™",
                desc: "Comprehensive wealth-building education for individuals and families. Master credit repair, identity protection, tax strategy, and smart money management.",
                href: "https://wealth.garnerfinancialpartners.com/",
                tag: "FREE",
              },
            ].map(({ icon: Icon, title, desc, href, tag }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-8 text-center h-full block group hover:border-[#C5963A]/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C5963A]/20 transition-colors">
                    <Icon className="size-8 text-[#C5963A]" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-4">
                    <span className="text-[10px] font-semibold text-[#C5963A] tracking-wider">{tag}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-3">Our Values</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                What Drives <span className="text-gold-gradient">Us</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: "Education First",
                desc: "We lead with knowledge. Every service, product, and strategy starts with ensuring our clients truly understand their financial landscape.",
              },
              {
                icon: Shield,
                title: "Protection Always",
                desc: "Knowledge without action leaves you exposed. We pair education with real implementation tools so you can take control and protect your family and assets.",
              },
              {
                icon: Globe,
                title: "Generational Impact",
                desc: "Our mission goes beyond today. We build systems and educate communities so that wealth and wisdom pass from one generation to the next.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="glass-card rounded-xl p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mx-auto mb-6">
                    <Icon className="size-8 text-[#C5963A]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-white mb-6">
                Start Your <span className="text-gold-gradient">Financial Education</span> Today
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed">
                Whether you're an athlete looking to protect your earnings, a veteran navigating your next chapter, a family building a faith-based financial plan, or an entrepreneur ready to scale, your journey starts with education. Enroll in a free portal or book a one-on-one Blueprint Call.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button type="button"
                  onClick={() => { (window as any).openVapiWidget?.(); }}
                  className="group px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/25 flex items-center gap-2"
                >
                  Speak to Us
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("portals");
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-medium rounded-xl transition-all duration-300"
                >
                  Explore Free Portals
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
