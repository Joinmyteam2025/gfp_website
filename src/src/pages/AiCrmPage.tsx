import { useState } from "react";
import { Link } from "react-router-dom";
import { CompetitorComparisonChart } from "../components/CompetitorComparisonChart";
import { StripeCheckoutModal } from "../components/StripeCheckoutModal";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  Phone,
  Users,
  Target,
  Bot,
  BarChart3,
  Shield,
  Sparkles,
  TrendingUp,
  Star,
  MessageSquare,
  Calendar,
  Mail,
  Globe,
  Megaphone,
  Search,
  FileText,
  Headphones,
  Check,
  Crown,
  Rocket,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Features ─── */
const features = [
  { icon: Users, title: "Client Management & CRM", desc: "Full contact database, conversations, notes, tasks, and opportunity pipelines - all in one place." },
  { icon: Target, title: "Marketing Suite", desc: "Social media planner, email marketing, ad manager, and Google Maps prospecting built in." },
  { icon: Bot, title: "Automation Engine", desc: "Build workflows for follow-ups, social messaging, email/SMS sequences, and lead nurture - on autopilot." },
  { icon: Phone, title: "NexDial™ Power Dialer", desc: "AI-powered dialer with preview, power, and multi-line modes. Make 300+ calls per hour." },
  { icon: TrendingUp, title: "Lead Store & Management", desc: "Order real-time and aged leads, track performance, and manage your entire pipeline." },
  { icon: Sparkles, title: "AI Prospecting", desc: "Search Google Maps, pull owner data, social profiles, and import directly to your CRM." },
  { icon: Calendar, title: "Calendar & Booking", desc: "Built-in scheduling with automated reminders, round-robin assignments, and Calendly-like booking pages." },
  { icon: MessageSquare, title: "Conversations Hub", desc: "Unified inbox for SMS, email, Facebook, Instagram, WhatsApp, and Google Business Messages." },
  { icon: Mail, title: "Email & SMS Campaigns", desc: "Broadcast campaigns, drip sequences, and automated follow-ups across email and SMS." },
  { icon: Globe, title: "Website & Funnel Builder", desc: "Drag-and-drop landing pages, funnels, and full websites with hosting included." },
  { icon: Megaphone, title: "Reputation Management", desc: "Automated review requests, monitoring, and response management across Google, Facebook, and more." },
  { icon: Search, title: "Reporting & Analytics", desc: "Track conversions, ad spend, pipeline value, and team performance with detailed dashboards." },
  { icon: BarChart3, title: "Scripts & Resources", desc: "Insurance-specific scripts, objection handlers, and training materials to close more deals." },
  { icon: Shield, title: "Spam Protection", desc: "AI-powered caller ID reputation management to keep your numbers clean and answer rates high." },
  { icon: FileText, title: "Commission Tracking", desc: "Track first-year, renewal, and override commissions across all carriers in one dashboard." },
  { icon: Headphones, title: "Priority Support", desc: "Dedicated onboarding specialist and priority support for all CRM subscribers." },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Marcus T.", role: "Final Expense Producer", quote: "Went from 5 to 22 appointments per week after switching to the CRM. The automation alone is worth 10x the price.", stars: 5 },
  { name: "Sarah K.", role: "IUL Agent", quote: "The AI prospecting tool found 40 new qualified clients in my first month. This system pays for itself on day one.", stars: 5 },
  { name: "David R.", role: "Team Lead", quote: "My team's close rate jumped 35% with the automation workflows. We're making more money working fewer hours.", stars: 5 },
];

/* ─── Stats ─── */
const stats = [
  { label: "More Appointments", value: "+340%", icon: TrendingUp },
  { label: "Time Saved / Week", value: "12hrs", icon: Zap },
  { label: "Close Rate Increase", value: "+28%", icon: Target },
  { label: "Active Producers", value: "500+", icon: Users },
];

export function AiCrmPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly");
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <div className="relative overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#C5963A]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#1a3a6b]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-8">
              <Zap className="size-4 text-[#C5963A]" />
              <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">NexSuite™</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Everything You Need to{" "}
              <span className="text-gold-gradient">Close More Business</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-8">
              The all-in-one AI CRM built for producers and business owners. Manage clients, automate follow-ups, 
              order leads, prospect with AI, and power-dial through your pipeline - all from one platform.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Get Started for $57/mo
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

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-4">
                  <s.icon className="size-5 text-[#C5963A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ FEATURES GRID ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                What's <span className="text-gold-gradient">Inside</span>
              </h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                All features included with your subscription. No hidden fees, no add-ons.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 30}>
                <div className="glass-card rounded-xl p-5 h-full group hover:border-[#C5963A]/20 transition-all duration-500">
                  <div className="w-10 h-10 rounded-lg bg-[#C5963A]/10 flex items-center justify-center mb-3 group-hover:bg-[#C5963A]/20 transition-colors">
                    <f.icon className="size-5 text-[#C5963A]" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{f.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-serif font-bold text-white text-center mb-10">
              What Producers Are <span className="text-gold-gradient">Saying</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="glass-card rounded-xl p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, idx) => (
                      <Star key={idx} className="size-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/70 italic leading-relaxed mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#C5963A]/10 flex items-center justify-center text-sm text-[#C5963A] font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t.name}</p>
                      <p className="text-xs text-white/40">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
                <span className="text-xs font-medium text-[#C5963A]">Simple Pricing</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                One Subscription. <span className="text-gold-gradient">Everything Included.</span>
              </h2>
              <p className="text-lg text-white/40 max-w-xl mx-auto">
                No hidden fees. No per-seat charges. Full platform access.
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
                  <span className="text-4xl font-bold text-white">$57</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <p className="text-xs text-white/30 mt-2">Cancel anytime. No commitment.</p>
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
                  Save $114 - 2 Months Free
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
                  <span className="text-4xl font-bold text-white">$570</span>
                  <span className="text-white/40 text-sm">/year</span>
                </div>
                <p className="text-xs text-white/30 mt-1">
                  Just $39.17/mo. <span className="text-green-400 font-medium">Best Value</span>
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="max-w-md mx-auto space-y-4">
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#C5963A]/20 text-lg flex items-center justify-center gap-3"
              >
                <Rocket className="size-5" />
                {selectedPlan === "monthly" ? "Start for $57/month" : "Start for $570/year - Save $114"}
              </button>
              <p className="text-[10px] text-white/25 text-center">
                Secure checkout powered by Stripe. Cancel anytime. 30-day money-back guarantee.
              </p>
            </div>
          </ScrollReveal>

          {/* What's included summary */}
          <ScrollReveal delay={300}>
            <div className="max-w-md mx-auto mt-8 p-5 rounded-xl glass-card">
              <p className="text-xs font-semibold text-white mb-3 flex items-center gap-1.5">
                <Headphones className="size-3.5 text-[#C5963A]" /> Everything Included:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "Client Management",
                  "Marketing Suite",
                  "Automation Engine",
                  "NexDial™ Dialer",
                  "Lead Store Access",
                  "AI Prospecting",
                  "Scripts & Resources",
                  "Reputation Management",
                  "Spam Protection",
                  "Commission Tracking",
                  "Priority Support",
                  "Mobile Responsive",
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

      {/* ═══ COMPETITOR COMPARISON ═══ */}
      <CompetitorComparisonChart />

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-white mb-6">
                Ready to <span className="text-gold-gradient">Scale Your Business</span>?
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed">
                Join hundreds of producers and business owners already using NexSuite™ to close more deals and grow faster.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleCheckout}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                >
                  Start Your Free Trial
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
        productKey="nexcrm"
        productName="NexCRM™"
        priceDisplay="$57/mo"
        priceType="subscription"
      />
    </div>
  );
}
