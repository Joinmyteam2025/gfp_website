import {
  ArrowRight,
  Zap,
  Target,
  Users,
  BarChart3,
  Bot,
  Rocket,
  Star,
  LayoutDashboard,
  Megaphone,
  GitBranch,
  BookOpen,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export function TeamPage() {
  return (
    <div className="relative overflow-hidden">
      {/* ═══ Hero / Recruiting Header ═══ */}
      <section className="py-28 pt-32 relative overflow-hidden">
        {/* Dramatic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#C5963A]/[0.06] to-transparent rounded-full -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#1a3a6b]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#C5963A]/[0.04] to-transparent rounded-full translate-y-1/3 translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Zap className="size-4 text-[#C5963A]" />
                <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">Now Recruiting Licensed Producers</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-[1.1]">
                Invest in Yourself.{" "}
                <span className="text-gold-gradient">Unleash an Army of AI.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-2">
                Up to <strong className="text-white">250 free leads</strong> on day one, AI contacts, qualifies, and books your first appointments automatically.
              </p>
              <p className="text-sm text-white/35 max-w-2xl mx-auto">
                Join Garner Financial Partners and let our AI workforce do the heavy lifting.{" "}
                <strong className="text-white/55">We work smarter, not harder.</strong>
              </p>
            </div>
          </ScrollReveal>

          {/* Animated divider */}
          <div className="flex justify-center mb-16">
            <div className="w-24 h-px gold-shimmer rounded-full" />
          </div>

          {/* Feature Grid - The Arsenal */}
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-2">Your Complete Producer Arsenal</p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                Everything You Need to <span className="text-gold-gradient">Dominate</span>
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-16">
            {[
              { icon: Target, title: "Up to 250 Free Leads", desc: "One-time welcome bonus delivered straight to your CRM. AI contacts, qualifies, and books appointments for you, automatically.", tag: "DAY ONE" },
              { icon: Bot, title: "AI-Powered CRM", desc: "NexCRM™ and NexSuite™ handle your entire pipeline, automated follow-ups, AI dialer, lead scoring, and smart nurture sequences that close while you sleep.", tag: "NEXSUITE™" },
              { icon: LayoutDashboard, title: "Production Dashboard", desc: "Real-time visibility into every metric that matters. Track policies, premiums, commissions, and conversion rates from a single command center.", tag: "LIVE DATA" },
              { icon: BookOpen, title: "Training Academy", desc: "On-demand video courses, certifications, and sales playbooks built by top producers. Get licensed faster and close bigger.", tag: "EDUCATION" },
              { icon: Users, title: "Downline & Recruiting", desc: "Full recruiting CRM with unique producer codes, team hierarchy tracking, and automated onboarding for every agent you bring in.", tag: "BUILD A TEAM" },
              { icon: BarChart3, title: "Real-Time Analytics", desc: "Know your closing ratio, average premium, lead-to-appointment rate, and pipeline velocity. All updated in real-time.", tag: "ANALYTICS" },
              { icon: Megaphone, title: "Brand & Marketing", desc: "Done-for-you social content, branded collateral, email campaigns, and marketing assets. Professionally designed and ready to deploy.", tag: "DFY CONTENT" },
              { icon: GitBranch, title: "Automated Workflows", desc: "From lead capture to policy delivery, every step is automated. AI handles the busywork so you can focus on what matters: closing.", tag: "AUTOMATION" },
              { icon: Rocket, title: "Portal & Client Tracking", desc: "Your own branded portal experience. Track every client, every policy, every milestone. Your entire book of business, managed for you.", tag: "YOUR PORTAL" },
            ].map(({ icon: Icon, title, desc, tag }, i) => (
              <ScrollReveal key={title} delay={i * 60}>
                <div className="glass-card rounded-xl p-6 h-full group hover:border-[#C5963A]/30 transition-all duration-500 relative overflow-hidden">
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#C5963A]/[0.04] to-transparent rounded-bl-[40px]" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center group-hover:bg-[#C5963A]/20 transition-colors">
                        <Icon className="size-6 text-[#C5963A]" />
                      </div>
                      <span className="text-[9px] font-bold text-[#C5963A]/70 tracking-widest bg-[#C5963A]/5 border border-[#C5963A]/10 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-white mb-2">{title}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* The Comparison - Why GFP */}
          <ScrollReveal>
            <div className="max-w-5xl mx-auto mb-16">
              <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5963A]/[0.03] to-transparent" />
                <div className="relative">
                  <div className="text-center mb-10">
                    <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-2">The GFP Advantage</p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                      Other Agencies vs. <span className="text-gold-gradient">Garner Financial Partners</span>
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Other agencies */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                          <span className="text-red-400 text-sm font-bold">✕</span>
                        </div>
                        <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">Traditional Agencies</h4>
                      </div>
                      {[
                        "Buy your own leads - $20-$50 each",
                        "Manual dialing and follow-up",
                        "No CRM or outdated spreadsheets",
                        "Generic training, if any",
                        "No marketing support",
                        "No tech, no AI, no automation",
                        "You figure it out alone",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-white/30">
                          <span className="text-red-400/60 mt-0.5 shrink-0">✕</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    {/* GFP */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                          <Star className="size-4 text-[#C5963A]" />
                        </div>
                        <h4 className="text-sm font-bold text-[#C5963A] uppercase tracking-wider">Garner Financial Partners</h4>
                      </div>
                      {[
                        "Up to 250 free leads on day one",
                        "AI dials, qualifies & books appointments",
                        "Full NexSuite™ CRM, built for producers",
                        "Certified training academy & video courses",
                        "Done-for-you brand, social & marketing assets",
                        "AI automation handles your entire workflow",
                        "Dedicated support, team, and community",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-white/70">
                          <span className="text-[#C5963A] mt-0.5 shrink-0">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Bar */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {[
                { value: "250", label: "Free Leads on Day One", suffix: "+" },
                { value: "24/7", label: "AI Works While You Sleep", suffix: "" },
                { value: "100", label: "Online Sales Generated", suffix: "M+" },
                { value: "0", label: "Cold Calls Required", suffix: "" },
              ].map(({ value, label, suffix }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#C5963A] mb-1">
                    {value === "0" ? "$" : ""}{value}{suffix}
                  </div>
                  <p className="text-xs text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Final CTA */}
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="glass-card rounded-2xl p-10 md:p-14 relative overflow-hidden gold-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5963A]/[0.06] via-transparent to-[#1a3a6b]/[0.06]" />
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                    The Industry Is Evolving.{" "}
                    <span className="text-gold-gradient">Are You?</span>
                  </h3>
                  <p className="text-white/40 text-base mb-8 leading-relaxed max-w-xl mx-auto">
                    Every day without AI-powered tools is a day your competitors get further ahead. 
                    Stop grinding. Start building. Apply to join the team that's rewriting the playbook for insurance producers.
                  </p>
                  <a
                    href="https://agent.garnerfinancialpartners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg relative"
                  >
                    <span>Apply Now, Join Our Team</span>
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 rounded-xl animate-pulse-gold pointer-events-none" />
                  </a>
                  <p className="text-xs text-white/25 mt-4">Free to apply · Payment only after approval · Limited spots available</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
