import { useAction } from "convex/react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { safeLocalStorage } from "../../lib/safeTokenStorage";
import { StripeCheckoutModal } from "../components/StripeCheckoutModal";
import {
  ArrowRight,
  CheckCircle2,
  Handshake,
  Loader2,
  Tag,
  Zap,
  Globe,
  Layout,
  GitBranch,
  Megaphone,
  Bot,
  Palette,
  BarChart3,
  Shield,
  Target,
  TrendingUp,
  Users,
  Phone,
  Crown,
  Check,
  Rocket,
  X,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Everything Included ─── */
const included = [
  { icon: Zap, title: "Done-With-You AI CRM Setup", desc: "Full CRM build-out on GoHighLevel with custom pipelines, automations, workflows, and integrations tailored to your business." },
  { icon: Layout, title: "Done-With-You Landing Pages", desc: "High-converting landing pages designed, built, and optimized for your offers. Persuasive copy, premium visuals, and A/B testing." },
  { icon: GitBranch, title: "Done-With-You Funnel Build", desc: "Complete multi-step sales funnels with upsells, downsells, order bumps, email follow-ups, and checkout optimization." },
  { icon: Globe, title: "Full Website Build", desc: "Professional, modern website that establishes authority and trust. SEO optimized, fast loading, and mobile responsive." },
  { icon: Palette, title: "Creative & Copy", desc: "All creative assets, copywriting, brand design, and marketing collateral created by our in-house team." },
  { icon: Megaphone, title: "Ad Manager Build & Management", desc: "Full ad account setup, campaign creation, audience targeting, creative production, and ongoing optimization across Meta & Google." },
  { icon: Bot, title: "AI Automation Suite", desc: "Custom AI workflows, chatbots, lead scoring, and automated follow-up sequences that work 24/7." },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Custom dashboards tracking every metric that matters - conversions, ROAS, pipeline value, and revenue attribution." },
];

/* ─── Why Revenue Share ─── */
const whyRevShare = [
  { icon: Target, title: "Aligned Incentives", desc: "We only win when you win. Our 10% revenue share means we're invested in your growth, not just billing hours." },
  { icon: Shield, title: "Reduced Risk", desc: "Instead of paying massive agency retainers with no guarantees, you get a true partner who shares the risk and reward." },
  { icon: TrendingUp, title: "Proven Systems", desc: "We've generated over $100M in online sales. Now we bring those exact systems, strategies, and playbooks to your business." },
  { icon: Users, title: "Full Team Access", desc: "Designers, developers, copywriters, media buyers, automation experts - your dedicated growth team, without the overhead." },
];

/* ─── Stripe Payment Links (Revenue Share) ─── */

export function GrowthPartnerPage() {
  const validateCode = useAction(api.promoCodes.validatePromoCode);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly");
  const [searchParams] = useSearchParams();
  const [promoBypass, setPromoBypass] = useState(false);
  const [promoLabel, setPromoLabel] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoChecking, setPromoChecking] = useState(false);
  const [promoError, setPromoError] = useState("");

  async function handlePromoApply() {
    if (!promoCode.trim()) return;
    setPromoChecking(true);
    setPromoError("");
    try {
      const res = await validateCode({ code: promoCode.trim() });
      if (res.valid && res.isBypass) {
        setPromoBypass(true);
        setPromoLabel(res.label);
      } else {
        setPromoError("Invalid promo code");
      }
    } catch {
      setPromoError("Error validating code");
    } finally {
      setPromoChecking(false);
    }
  }

  // Track affiliate referral code
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      try {
        document.cookie = `affiliate_ref=${ref};path=/;max-age=${60 * 60 * 24 * 90};samesite=lax`;
      } catch {
        /* sandboxed document */
      }
      safeLocalStorage.setItem("affiliate_ref", ref);
    }
  }, [searchParams]);

  const [showCheckout, setShowCheckout] = useState(false);

  const handleApply = () => {
    setShowCheckout(true);
  };

  return (
    <div className="relative overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-[#C5963A]/[0.06] to-transparent rounded-full -translate-y-1/3 -translate-x-1/4" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#1a3a6b]/20 to-transparent rounded-full translate-y-1/3 translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-8">
              <Handshake className="size-4 text-[#C5963A]" />
              <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">Growth Partnership Model</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              We Build It. We Run It.{" "}
              <span className="text-gold-gradient">We Grow Together.</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-8">
              A true partnership where we invest our expertise, systems, and team in your business. 
              We handle everything - CRM, funnels, websites, ads, creative - and share in the results. 
              We only win when you win.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Apply for Partnership
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <button type="button"
                onClick={() => { (window as any).openVapiWidget?.(); }}
                className="inline-flex items-center gap-2 px-6 py-4 text-white/50 hover:text-white transition-colors"
              >
                <Phone className="size-4" />
                Speak to Us
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: "$100M+", label: "Revenue Generated" },
                { value: "15+", label: "Years Experience" },
                { value: "100%", label: "Aligned Incentives" },
                { value: "Full", label: "Team Included" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#C5963A]">{s.value}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ WHAT'S INCLUDED ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Everything You Get <span className="text-gold-gradient">Done-With-You</span>
              </h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                A complete business infrastructure built, managed, and optimized by our team - with you every step of the way.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {included.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="glass-card rounded-xl p-6 h-full group hover:border-[#C5963A]/20 transition-all duration-500">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C5963A]/20 transition-colors">
                      <item.icon className="size-6 text-[#C5963A]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ WHY REVENUE SHARE ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Why <span className="text-gold-gradient">Revenue Share</span>?
              </h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                Traditional agencies charge retainers regardless of results. We put our money where our mouth is.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyRevShare.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="glass-card rounded-xl p-6 h-full">
                  <item.icon className="size-8 text-[#C5963A] mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Comparison */}
          <ScrollReveal delay={200}>
            <div className="max-w-3xl mx-auto mt-14">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Traditional */}
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                  <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4">Traditional Agency</h4>
                  <ul className="space-y-3">
                    {[
                      "High monthly retainers ($5K-$20K+)",
                      "No performance guarantees",
                      "Misaligned incentives",
                      "Limited scope of work",
                      "You manage multiple vendors",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/40">
                        <span className="text-red-400 mt-0.5">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Revenue Share */}
                <div className="rounded-xl border border-[#C5963A]/30 bg-[#C5963A]/5 p-6">
                  <h4 className="text-sm font-bold text-[#C5963A] uppercase tracking-wider mb-4">Revenue Share Partnership</h4>
                  <ul className="space-y-3">
                    {[
                      "Affordable base + shared upside",
                      "Performance-driven results",
                      "100% aligned incentives",
                      "Full-stack services included",
                      "One partner handles everything",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                        <CheckCircle2 className="size-4 text-[#C5963A] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-24 scroll-mt-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Crown className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A]">Partnership Pricing</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Invest in <span className="text-gold-gradient">Growth</span>
              </h2>
              <p className="text-lg text-white/40 max-w-xl mx-auto">
                Base subscription + 10% revenue share. We only profit when you do.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
              {/* Monthly */}
              <div
                onClick={() => setSelectedPlan("monthly")}
                className={`cursor-pointer rounded-2xl border-2 p-8 transition-all duration-300 ${
                  selectedPlan === "monthly"
                    ? "border-[#C5963A] bg-[#C5963A]/5 shadow-lg shadow-[#C5963A]/10"
                    : "border-white/10 bg-white/[0.02] hover:border-[#C5963A]/30"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Monthly</h3>
                  <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPlan === "monthly" ? "border-[#C5963A] bg-[#C5963A]" : "border-white/20"
                  }`}>
                    {selectedPlan === "monthly" && <Check className="size-4 text-white" />}
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$2,997</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <p className="text-xs text-white/30 mt-2">+ 10% revenue share • Cancel anytime</p>
              </div>

              {/* Annual */}
              <div
                onClick={() => setSelectedPlan("annual")}
                className={`cursor-pointer rounded-2xl border-2 p-8 transition-all duration-300 relative ${
                  selectedPlan === "annual"
                    ? "border-[#C5963A] bg-[#C5963A]/5 shadow-lg shadow-[#C5963A]/10"
                    : "border-white/10 bg-white/[0.02] hover:border-[#C5963A]/30"
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Save $5,967 - 2 Months Free
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Annual</h3>
                  <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPlan === "annual" ? "border-[#C5963A] bg-[#C5963A]" : "border-white/20"
                  }`}>
                    {selectedPlan === "annual" && <Check className="size-4 text-white" />}
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$29,997</span>
                  <span className="text-white/40 text-sm">/year</span>
                </div>
                <p className="text-xs text-white/30 mt-1">
                  + 10% revenue share • <span className="text-green-400 font-medium">Best Value</span>
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="max-w-md mx-auto space-y-4">
              {promoBypass && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="size-4 text-green-400 shrink-0" />
                  <span className="text-xs font-medium text-green-400">{promoLabel} - 100% OFF applied</span>
                </div>
              )}
              <button
                onClick={promoBypass ? () => alert("✅ Partnership activated with promo code! A team member will reach out to get you started.") : handleApply}
                className={`w-full py-4 ${promoBypass ? "bg-green-600 hover:bg-green-700" : "bg-[#C5963A] hover:bg-[#9E7730]"} text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg text-lg flex items-center justify-center gap-3`}
              >
                <Rocket className="size-5" />
                {promoBypass
                  ? "Activate Partnership - FREE"
                  : selectedPlan === "monthly" ? "Apply - $2,997/month + 10% Rev Share" : "Apply - $29,997/year + 10% Rev Share"}
              </button>

              {/* Promo Code */}
              {promoBypass ? null : (
                <div className="space-y-2">
                  {!showPromo ? (
                    <button onClick={() => setShowPromo(true)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#C5963A] transition-colors mx-auto">
                      <Tag className="size-3" /> Have a promo code?
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-white/30" />
                        <input type="text" value={promoCode} onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); }} onKeyDown={(e) => e.key === "Enter" && handlePromoApply()} placeholder="Enter code" className="w-full pl-9 pr-3 h-9 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 focus:border-[#C5963A]/50 focus:outline-none transition-colors" />
                      </div>
                      <button onClick={handlePromoApply} disabled={!promoCode.trim() || promoChecking} className="h-9 px-3 text-xs bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
                        {promoChecking ? <Loader2 className="size-3.5 animate-spin" /> : "Apply"}
                      </button>
                      <button onClick={() => { setShowPromo(false); setPromoCode(""); setPromoError(""); }} className="h-9 w-9 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <X className="size-4" />
                      </button>
                    </div>
                  )}
                  {promoError && <p className="text-xs text-red-400 text-center">{promoError}</p>}
                </div>
              )}

              <p className="text-[10px] text-white/25 text-center">
                Limited partnerships available. Book a strategy call to see if you qualify.
              </p>
            </div>
          </ScrollReveal>

          {/* What's included summary */}
          <ScrollReveal delay={300}>
            <div className="max-w-md mx-auto mt-8 p-5 rounded-xl glass-card">
              <p className="text-xs font-semibold text-white mb-3 flex items-center gap-1.5">
                <Handshake className="size-3.5 text-[#C5963A]" /> Everything Included in Your Partnership:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "AI CRM Setup",
                  "Landing Pages",
                  "Sales Funnels",
                  "Full Website",
                  "Creative & Copy",
                  "Ad Management",
                  "AI Automations",
                  "Analytics Dashboard",
                  "Dedicated Team",
                  "Strategy Calls",
                  "Priority Support",
                  "Ongoing Optimization",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-[11px] text-white/50">
                    <CheckCircle2 className="size-3 text-green-400 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-white mb-6">
                Ready to Build <span className="text-gold-gradient">Together</span>?
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed">
                Limited growth partnerships available. Book a strategy call to see if your business qualifies for our revenue share model.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button type="button"
                  onClick={() => { (window as any).openVapiWidget?.(); }}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                >
                  Speak to Us
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-4 text-white/50 hover:text-white transition-colors"
                >
                  View All Services
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CHECKOUT MODAL ═══ */}
      <StripeCheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productKey="revenue-share"
        productName="Revenue Share Growth Partnership"
        priceDisplay="$2,997/mo"
        priceType="subscription"
      />
    </div>
  );
}
