import { SEO, webPageSchema } from "../components/SEO";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StripeCheckoutModal } from "../components/StripeCheckoutModal";
import {
  Zap,
  ArrowRight,
  Handshake,

  CheckCircle2,
  Shield,
  Building2,
  Medal,
  Sparkles,
  GraduationCap,
  Trophy,
  BookOpen,
  TrendingUp,
  ExternalLink,
  Share2,
  Crown,
  Home,
  Rocket,
  Paintbrush,
  DollarSign,
  LayoutDashboard,
  Target,
  Mail,
  Bot,
  Phone,
  Globe,
  Video,
  Mic,
  Image,
  BarChart3,
  Users,
  Star,
  MessageCircle,
  Layers,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── White-Label NexSuite Data ─── */

const WHITELABEL_FEATURES = [
  { icon: LayoutDashboard, name: "Full CRM Platform", desc: "Contacts, deals, pipeline, calendar, tasks" },
  { icon: Target, name: "Sales Funnels & Landing Pages", desc: "Drag-and-drop builder with templates" },
  { icon: Mail, name: "Email & SMS Marketing", desc: "Broadcast, drip sequences, automations" },
  { icon: Bot, name: "AI Chatbot & Support", desc: "24/7 AI customer support for your clients" },
  { icon: Phone, name: "Power Dialer & Call Tracking", desc: "Click-to-call, recording, local presence" },
  { icon: Globe, name: "Social Media Automation", desc: "Schedule, publish, auto-generate content" },
  { icon: Video, name: "AI Video Creator", desc: "Generate video ads and content with AI" },
  { icon: Sparkles, name: "AI Content Generator", desc: "Emails, scripts, posts, ad copy in seconds" },
  { icon: Mic, name: "AI Voice & Text-to-Speech", desc: "Professional voiceovers for any content" },
  { icon: Image, name: "AI Image Generator", desc: "Create branded graphics and ad creatives" },
  { icon: BarChart3, name: "Analytics & Reporting", desc: "Dashboard metrics, ROI tracking, insights" },
  { icon: Users, name: "Lead Prospecting & Buying", desc: "Google Maps scraping, data enrichment" },
  { icon: Star, name: "Reputation Management", desc: "Review monitoring, AI replies, 5-star campaigns" },
  { icon: MessageCircle, name: "2-Way SMS & Chat", desc: "Unified inbox across all channels" },
  { icon: Layers, name: "Workflow Automations", desc: "Plain-English builder for any business process" },
  { icon: Building2, name: "Courses & Memberships", desc: "Online courses, communities, products" },
];

const SETUP_STEPS = [
  { step: 1, title: "Subscribe to White-Label", desc: "Sign up for $297/mo (or $2,970/yr) and get instant access to the full NexSuite™ White-Label platform.", icon: Rocket, color: "#C5963A" },
  { step: 2, title: "Add Your Brand", desc: "Upload your logo, set your business name, pick your colors. The entire platform becomes yours.", icon: Paintbrush, color: "#6C5CE7" },
  { step: 3, title: "Set Your Price", desc: "Decide what to charge your clients — $97/mo, $297/mo, $997/mo — it's completely up to you.", icon: DollarSign, color: "#00C853" },
  { step: 4, title: "Start Selling", desc: "Share your branded platform. Every client who signs up pays you directly. You keep 100% of the revenue.", icon: TrendingUp, color: "#1E88E5" },
];

const CALC_PRESETS = [
  { label: "Side Hustle", clients: 5, price: 97, growth: 2 },
  { label: "Small Agency", clients: 15, price: 197, growth: 3 },
  { label: "Growth Mode", clients: 30, price: 297, growth: 5 },
  { label: "Full Scale", clients: 75, price: 497, growth: 10 },
];

const COMPETITORS = [
  { name: "GoHighLevel", price: "$297" },
  { name: "ClickFunnels", price: "$297" },
  { name: "HubSpot", price: "$800+" },
  { name: "Salesforce", price: "$300+" },
  { name: "Mailchimp", price: "$99" },
  { name: "Monday.com", price: "$72" },
  { name: "Zapier", price: "$169" },
  { name: "ChatGPT", price: "$200" },
  { name: "ElevenLabs", price: "$99" },
  { name: "Canva", price: "$15" },
  { name: "Calendly", price: "$16" },
];

/* ─── Earnings Calculator Component ─── */

function WhiteLabelCalculator() {
  const [clients, setClients] = useState(15);
  const [pricePerClient, setPricePerClient] = useState(197);
  const [monthlyGrowth, setMonthlyGrowth] = useState(3);
  const [activePreset, setActivePreset] = useState(1);

  const WHITELABEL_COST = 297;
  const monthlyRevenue = clients * pricePerClient;
  const monthlyProfit = monthlyRevenue - WHITELABEL_COST;
  const profitMargin = monthlyRevenue > 0 ? Math.round((monthlyProfit / monthlyRevenue) * 100) : 0;

  const projectionMonths = Array.from({ length: 12 }, (_, i) => {
    const projectedClients = Math.round(clients * Math.pow(1 + monthlyGrowth / 100, i));
    const rev = projectedClients * pricePerClient;
    return { month: i + 1, clients: projectedClients, revenue: rev, profit: rev - WHITELABEL_COST };
  });
  const month12 = projectionMonths[11];
  const yearTotalProfit = projectionMonths.reduce((sum, m) => sum + m.profit, 0);
  const maxRevenue = Math.max(...projectionMonths.map((m) => m.revenue), 1);

  const fmt = (n: number) => n.toLocaleString("en-US");

  const applyPreset = (idx: number) => {
    setActivePreset(idx);
    setClients(CALC_PRESETS[idx].clients);
    setPricePerClient(CALC_PRESETS[idx].price);
    setMonthlyGrowth(CALC_PRESETS[idx].growth);
  };

  return (
    <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#0a1628] via-[#0d1d35] to-[#0a1628] p-6 md:p-10 border border-[#C5963A]/15 overflow-hidden">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/30 mb-4">
          <BarChart3 className="w-3.5 h-3.5 text-[#C5963A]" />
          <span className="text-[#C5963A] text-xs font-semibold uppercase tracking-wider">Interactive Calculator</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">White-Label Earnings Calculator</h3>
        <p className="text-white/40 max-w-lg mx-auto text-sm">Customize the numbers below to see exactly how much you could earn reselling NexSuite™ under your brand.</p>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {CALC_PRESETS.map((p, i) => (
          <button key={p.label} onClick={() => applyPreset(i)} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activePreset === i ? "bg-[#C5963A] text-white shadow-lg shadow-[#C5963A]/20" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"}`}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="flex items-center justify-between text-sm text-white/60 mb-2">
            <span>Clients</span>
            <span className="text-[#C5963A] font-bold">{clients}</span>
          </label>
          <input type="range" min={1} max={100} value={clients} onChange={(e) => setClients(Number(e.target.value))} className="w-full accent-[#C5963A]" />
        </div>
        <div>
          <label className="flex items-center justify-between text-sm text-white/60 mb-2">
            <span>Price / Client</span>
            <span className="text-[#C5963A] font-bold">${pricePerClient}</span>
          </label>
          <input type="range" min={47} max={997} step={10} value={pricePerClient} onChange={(e) => setPricePerClient(Number(e.target.value))} className="w-full accent-[#C5963A]" />
        </div>
        <div>
          <label className="flex items-center justify-between text-sm text-white/60 mb-2">
            <span>Monthly Growth</span>
            <span className="text-[#C5963A] font-bold">{monthlyGrowth}%</span>
          </label>
          <input type="range" min={0} max={20} value={monthlyGrowth} onChange={(e) => setMonthlyGrowth(Number(e.target.value))} className="w-full accent-[#C5963A]" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Monthly Revenue</p>
          <p className="text-xl font-bold text-white">${fmt(monthlyRevenue)}</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Monthly Profit</p>
          <p className={`text-xl font-bold ${monthlyProfit > 0 ? "text-emerald-400" : "text-red-400"}`}>${fmt(monthlyProfit)}</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 text-center">
          <p className="text-xs text-white/40 mb-1">Profit Margin</p>
          <p className="text-xl font-bold text-white">{profitMargin}%</p>
        </div>
        <div className="rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 p-4 text-center">
          <p className="text-xs text-[#C5963A]/70 mb-1">Year 1 Profit</p>
          <p className="text-xl font-bold text-[#C5963A]">${fmt(yearTotalProfit)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
        <p className="text-xs text-white/30 mb-3">12-Month Revenue Projection</p>
        <div className="flex items-end gap-1.5 h-32">
          {projectionMonths.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t bg-gradient-to-t from-[#C5963A] to-[#C5963A]/60 transition-all duration-500" style={{ height: `${(m.revenue / maxRevenue) * 100}%`, minHeight: 4 }} />
              <span className="text-[9px] text-white/25">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-white/30">
          <span>Month 1: ${fmt(projectionMonths[0].revenue)}/mo</span>
          <span className="text-[#C5963A] font-semibold">Month 12: ${fmt(month12.revenue)}/mo ({month12.clients} clients)</span>
        </div>
      </div>
    </div>
  );
}

export function ServicesPage() {
  const [checkoutProduct, setCheckoutProduct] = useState<string | null>(null);

  const productInfo: Record<string, { name: string; price: string; type: "one-time" | "subscription" }> = {
    nexcrm: { name: "NexCRM™", price: "$57/mo", type: "subscription" },
    nexsuite: { name: "NexSuite™", price: "$197/mo", type: "subscription" },
    "revenue-share": { name: "Revenue Share Growth Partnership", price: "$2,997/mo", type: "subscription" },
    "whitelabel-nexsuite": { name: "White-Label NexSuite™", price: "$297/mo or $2,970/yr", type: "subscription" },
  };

  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Services | Garner Financial Partners - Fortress Programs & Education Portals"
        description="Explore Garner Financial Partners services: Family Fortress, Business Fortress, Military Fortress, and specialized U education portals for athletes, veterans, entrepreneurs, and more."
        keywords={["financial services", "fortress programs", "financial education services", "asset protection services", "wealth building services"]}
        canonicalUrl="https://garnerfinancialpartners.com/services"
        structuredData={webPageSchema("Services", "Fortress Programs and education portals", "https://garnerfinancialpartners.com/services")}
      />
      {/* University Programs - Free Portals (Hero) */}
      <section className="relative pt-32 pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-[#C5963A]/[0.04] to-transparent rounded-full -translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5963A]/[0.02] to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <GraduationCap className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A]">Free Education Portals</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
                Learn, Grow, <span className="text-gold-gradient">Transform</span>
              </h1>
              <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                World-class education platforms designed to empower athletes, families of faith, and future wealth builders. Free to join, built to change lives.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Trophy,
                title: "Athlete U™",
                tagline: "The Playbook for Generational Wealth",
                desc: "A complete financial education platform built for athletes. 18 video lessons, NIL marketplace, 7 financial calculators, and the T.A.I.R. program for life after the game.",
                highlights: ["18 Video Lessons", "7 Financial Calculators", "NIL Marketplace", "T.A.I.R. Retirement Program", "Get Paid To Promote"],
                href: "https://athlete.garnerfinancialpartners.com/",
                gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
              },
              {
                icon: Building2,
                title: "Business U™",
                tagline: "The Playbook for Business Owners",
                desc: "Financial education built for entrepreneurs and business owners. 18 video lessons on entity structuring, cash flow systems, exit planning, and the CVA Strategy for business.",
                highlights: ["18 Video Lessons", "7 Financial Calculators", "Real Estate Marketplace", "Business Entity Structuring", "Get Paid To Promote"],
                href: "https://business.garnerfinancialpartners.com/",
                gradient: "from-blue-500/20 via-slate-500/10 to-transparent",
              },
              {
                icon: Home,
                title: "Real Estate U™",
                tagline: "The Playbook for Real Estate Investors",
                desc: "Master every real estate strategy from fix & flips to apartment complexes. 18 video lessons on wholesaling, multifamily, AirBnBs, land flipping, portfolio building, and asset protection through LLCs and living trusts.",
                highlights: ["18 Video Lessons", "7 Financial Calculators", "RE Deal Marketplace", "LLC & Trust Structuring", "Get Paid To Promote"],
                href: "https://realestate.garnerfinancialpartners.com/",
                gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
              },
              {
                icon: BookOpen,
                title: "Christian U™",
                tagline: "Bring the Heroes of the Bible to Life",
                desc: "Animated video lessons, collectible figures, story books, and coloring activities for the whole family. 50 character lessons covering Old and New Testament heroes.",
                highlights: ["50 Character Video Lessons", "Collectible Figures & Books", "Family Learning Together", "Mission-Driven Impact", "Get Paid To Promote"],
                href: "https://christian.garnerfinancialpartners.com/",
                gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
              },
              {
                icon: Share2,
                title: "Social Media U™",
                tagline: "The Playbook for Influencers & Creators",
                desc: "Everything you need to grow, monetize, and master social media. 18 video lessons on the attention economy, content strategy, list building, and turning followers into income.",
                highlights: ["18 Video Lessons", "7 Financial Calculators", "Influencer Deals Marketplace", "Monetization Strategies", "Get Paid To Promote"],
                href: "https://social.garnerfinancialpartners.com/",
                gradient: "from-pink-500/20 via-purple-500/10 to-transparent",
              },
              {
                icon: Medal,
                title: "Veterans U™",
                tagline: "The Playbook for Veterans & Military Families",
                desc: "Financial education built for those who served. 18 video lessons on VA benefits, military estate planning, 7 financial calculators, and tools to protect your service-built wealth.",
                highlights: ["18 Video Lessons", "7 Financial Calculators", "VA Benefits Guidance", "Military Estate Planning", "Get Paid To Promote"],
                href: "https://veterans.garnerfinancialpartners.com/",
                gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
              },
              {
                icon: TrendingUp,
                title: "Wealth U™",
                tagline: "Master the Money Game",
                desc: "A self-paced wealth education curriculum covering everything from the basics to dynasty trusts and the CVA Strategy. 18 lessons, 7 calculators, and expert support.",
                highlights: ["18 Video Lessons", "7 Financial Calculators", "Expert Support Access", "Fortress Program Integration", "Get Paid To Promote"],
                href: "https://wealth.garnerfinancialpartners.com/",
                gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
              },
            ].map(({ icon: Icon, title, tagline, desc, highlights, href }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="glass-card rounded-2xl overflow-hidden group hover:border-[#C5963A]/30 transition-all duration-500 h-full flex flex-col relative">
                  {/* FREE Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/25 text-[10px] font-bold text-emerald-400 uppercase tracking-wider rounded-full">
                      Free
                    </span>
                  </div>

                  {/* Card Header */}
                  <div className="p-8 pb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center group-hover:bg-[#C5963A]/20 transition-colors">
                        <Icon className="size-6 text-[#C5963A]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-1">{title}</h3>
                    <p className="text-xs font-medium text-[#C5963A]/70 tracking-wide mb-4">{tagline}</p>
                    <p className="text-sm text-white/40 leading-relaxed mb-6">{desc}</p>
                  </div>

                  {/* Highlights */}
                  <div className="px-8 pb-4 flex-1">
                    <div className="space-y-2.5">
                      {highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2.5">
                          <CheckCircle2 className="size-3.5 text-[#C5963A] flex-shrink-0" />
                          <span className="text-sm text-white/50">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-8 pt-4">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5963A]/10 hover:bg-[#C5963A] border border-[#C5963A]/30 hover:border-[#C5963A] text-[#C5963A] hover:text-white font-semibold rounded-xl transition-all duration-300 group/btn"
                    >
                      Join Free
                      <ExternalLink className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Fortress Programs. Featured */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C5963A]/[0.02] via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Shield className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A]">Fortress Programs™</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Protect What <span className="text-gold-gradient">Matters Most</span>
              </h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                Comprehensive protection programs for your family, business, and those who served. One-time investment, lifetime of security.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Family Fortress Program™",
                price: "$297",
                value: "$32,500+",
                desc: "Complete family trust and estate planning system with education and implementation tools. Everything you need to secure your family's future.",
                highlights: ["Living Trust & Estate Plan", "Financial Power of Attorney", "Healthcare Directives", "Asset Protection Strategy"],
                href: "/ffp",
                color: "from-[#C5963A]/20 to-[#C5963A]/5",
              },
              {
                icon: Building2,
                title: "Business Fortress Program™",
                price: "$997",
                value: "$105,500+",
                desc: "Full business entity structuring, asset protection, compliance framework, and growth infrastructure for entrepreneurs.",
                highlights: ["Business Entity Structuring", "Operating Agreements", "Compliance Framework", "Tax Strategy Blueprint"],
                href: "/bfp",
                color: "from-[#C5963A]/20 to-[#C5963A]/5",
              },
              {
                icon: Medal,
                title: "Military Fortress Program™",
                price: "$197",
                value: "$34,500+",
                desc: "Veteran-focused estate planning, VA benefits optimization, and family protection. Built by those who understand your service.",
                highlights: ["VA Benefits Optimization", "Military Estate Planning", "SGLI/VGLI Review", "Survivor Benefit Planning"],
                href: "/mfp",
                color: "from-[#C5963A]/20 to-[#C5963A]/5",
              },
            ].map(({ icon: Icon, title, price, value, desc, highlights, href }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="glass-card rounded-2xl overflow-hidden group hover:border-[#C5963A]/30 transition-all duration-500 h-full flex flex-col">
                  {/* Card Header */}
                  <div className="p-8 pb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center group-hover:bg-[#C5963A]/20 transition-colors">
                        <Icon className="size-6 text-[#C5963A]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-1">{title}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-[#C5963A]">{price}</span>
                      <span className="text-sm text-white/30">one-time</span>
                      <span className="ml-auto text-xs text-white/20 line-through">{value}*</span>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed mb-6">{desc}</p>
                  </div>

                  {/* Highlights */}
                  <div className="px-8 pb-4 flex-1">
                    <div className="space-y-2.5">
                      {highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2.5">
                          <CheckCircle2 className="size-3.5 text-[#C5963A] flex-shrink-0" />
                          <span className="text-sm text-white/50">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-8 pt-4">
                    <Link
                      to={href}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5963A]/10 hover:bg-[#C5963A] border border-[#C5963A]/30 hover:border-[#C5963A] text-[#C5963A] hover:text-white font-semibold rounded-xl transition-all duration-300 group/btn"
                    >
                      Learn More & Enroll
                      <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <p className="text-center text-xs text-white/20 mt-6">*Based on national average retail values</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Growth & Automation Offers */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5963A]/[0.02] to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Zap className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A]">Growth & Automation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Scale Your <span className="text-gold-gradient">Business</span>
              </h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                Powerful tools and partnerships to automate your operations, close more deals, and grow faster.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* ── NexCRM $57 ── */}
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl overflow-hidden group hover:border-[#C5963A]/30 transition-all duration-500 h-full flex flex-col">
                <div className="p-8 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center group-hover:bg-[#C5963A]/20 transition-colors">
                      <Zap className="size-6 text-[#C5963A]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-1">NexCRM™</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-[#C5963A]">$57</span>
                    <span className="text-sm text-white/30">/month</span>
                  </div>
                  <p className="text-xs text-white/30 mb-4">or <span className="text-[#C5963A] font-semibold">$570/year</span> <span className="text-emerald-400">(Save 2 Months)</span></p>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">
                    One platform to replace your CRM, email marketing, funnel builder, and more. Cancel the subscriptions you're overpaying for and save hundreds every month.
                  </p>
                </div>
                <div className="px-8 pb-4 flex-1">
                  <div className="space-y-2.5">
                    {["Lead Capture & Nurture", "Pipeline Automation", "SMS & Email Sequences", "Appointment Booking", "Funnel & Website Builder"].map((h) => (
                      <div key={h} className="flex items-center gap-2.5">
                        <CheckCircle2 className="size-3.5 text-[#C5963A] flex-shrink-0" />
                        <span className="text-sm text-white/50">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 pt-4">
                  <button onClick={() => setCheckoutProduct("nexcrm")} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5963A]/10 hover:bg-[#C5963A] border border-[#C5963A]/30 hover:border-[#C5963A] text-[#C5963A] hover:text-white font-semibold rounded-xl transition-all duration-300 group/btn">
                    Get Started
                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* ── NexSuite $197 ── */}
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl overflow-hidden group hover:border-[#C5963A]/30 transition-all duration-500 h-full flex flex-col relative">
                <div className="absolute -top-px left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5963A] to-transparent" />
                <div className="p-8 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center group-hover:bg-[#C5963A]/20 transition-colors">
                      <Sparkles className="size-6 text-[#C5963A]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-serif font-bold text-white">NexSuite™</h3>
                    <span className="px-2 py-0.5 bg-[#C5963A]/15 border border-[#C5963A]/25 text-[9px] font-bold text-[#C5963A] uppercase tracking-wider rounded-full">Most Popular</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-[#C5963A]">$197</span>
                    <span className="text-sm text-white/30">/month</span>
                  </div>
                  <p className="text-xs text-white/30 mb-4">or <span className="text-[#C5963A] font-semibold">$1,970/year</span> <span className="text-emerald-400">(Save 2 Months)</span></p>
                  <p className="text-sm text-white/40 leading-relaxed mb-5">
                    Everything in NexCRM™ plus every AI-powered tool we build - one subscription, unlimited access. Your entire business on autopilot.
                  </p>
                </div>
                <div className="px-8 pb-4 flex-1">
                  <div className="space-y-2.5">
                    {["Everything in NexCRM™", "AI Power Dialer & Closer", "Social Media & Video Automation", "Landing Page & Funnel Builder", "Full Reporting & Analytics"].map((h) => (
                      <div key={h} className="flex items-center gap-2.5">
                        <CheckCircle2 className="size-3.5 text-[#C5963A] flex-shrink-0" />
                        <span className="text-sm text-white/50">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 pt-4">
                  <button onClick={() => setCheckoutProduct("nexsuite")} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5963A] hover:bg-[#9E7730] border border-[#C5963A] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#C5963A]/20 group/btn">
                    Get Started
                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Revenue Share ── */}
            <ScrollReveal delay={200}>
              <div className="glass-card rounded-2xl overflow-hidden group hover:border-[#C5963A]/30 transition-all duration-500 h-full flex flex-col">
                <div className="p-8 pb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center group-hover:bg-[#C5963A]/20 transition-colors">
                      <Handshake className="size-6 text-[#C5963A]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-1">Revenue Share</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-[#C5963A]">Custom</span>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">
                    We invest our expertise in your business for a share of the growth. We only win when you win. True partnership.
                  </p>
                </div>
                <div className="px-8 pb-4 flex-1">
                  <div className="space-y-2.5">
                    {["Performance-Based", "Aligned Incentives", "Strategic Partnership", "Done-With-You Execution", "Shared Success"].map((h) => (
                      <div key={h} className="flex items-center gap-2.5">
                        <CheckCircle2 className="size-3.5 text-[#C5963A] flex-shrink-0" />
                        <span className="text-sm text-white/50">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 pt-4">
                  <button onClick={() => setCheckoutProduct("revenue-share")} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5963A]/10 hover:bg-[#C5963A] border border-[#C5963A]/30 hover:border-[#C5963A] text-[#C5963A] hover:text-white font-semibold rounded-xl transition-all duration-300 group/btn">
                    Apply Now
                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ WHITE-LABEL NEXSUITE ═══ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5963A]/[0.03] to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">

          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Crown className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A]">White-Label Opportunity</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                Build Your Own <span className="text-gold-gradient">SaaS Empire</span>
              </h2>
              <p className="text-lg text-white/40 max-w-3xl mx-auto leading-relaxed mb-3">
                White-Label NexSuite™ as Your Own Platform
              </p>
              <p className="text-base text-white/30 max-w-2xl mx-auto leading-relaxed">
                Put your name, logo, and brand on the entire NexSuite™ platform. Resell it to your clients at any price you choose — and keep 100% of the revenue. All for just <span className="text-[#C5963A] font-semibold">$297/month or $2,970/year</span>.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Your Brand / Your Price / Your Revenue ── */}
          <ScrollReveal delay={50}>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              {[
                { label: "Your Brand", desc: "Your logo, your colors, your domain. Clients see only you.", icon: Paintbrush, accent: "#C5963A" },
                { label: "Your Price", desc: "Charge $97, $297, $997/mo — whatever you want. No limits.", icon: DollarSign, accent: "#00C853" },
                { label: "Your Revenue", desc: "Keep 100% of every dollar your clients pay. Every month.", icon: TrendingUp, accent: "#1E88E5" },
              ].map(({ label, desc, icon: Icon, accent }) => (
                <div key={label} className="text-center p-8 rounded-2xl glass-card hover:border-[#C5963A]/30 transition-all duration-500 group">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
                    <Icon className="size-8" style={{ color: accent }} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{label}</h3>
                  <p className="text-sm text-white/40">{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* ── What's Replaces / Competitor Stack ── */}
          <ScrollReveal delay={100}>
            <div className="max-w-5xl mx-auto mb-16 rounded-2xl glass-card p-8 md:p-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                  Replace <span className="text-gold-gradient">$2,700+</span> in Monthly Software
                </h3>
                <p className="text-sm text-white/40">Everything your clients need — bundled inside one platform, under your brand.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {COMPETITORS.map((c) => (
                  <div key={c.name} className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-sm text-white/60 font-medium">{c.name}</span>
                    <span className="text-xs text-red-400/80 line-through font-mono">{c.price}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 col-span-1">
                  <Crown className="size-4 text-[#C5963A]" />
                  <span className="text-sm text-[#C5963A] font-bold">NexSuite™ $297</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── 16 Included Features ── */}
          <ScrollReveal delay={150}>
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                16 AI-Powered Tools. <span className="text-gold-gradient">All Included.</span>
              </h3>
              <p className="text-sm text-white/40 max-w-xl mx-auto">Everything your clients get when they sign up for your platform.</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
            {WHITELABEL_FEATURES.map((f, i) => (
              <ScrollReveal key={f.name} delay={i * 25}>
                <div className="glass-card rounded-xl p-5 h-full group hover:border-[#C5963A]/20 transition-all duration-500">
                  <div className="w-10 h-10 rounded-lg bg-[#C5963A]/10 flex items-center justify-center mb-3 group-hover:bg-[#C5963A]/20 transition-colors">
                    <f.icon className="size-5 text-[#C5963A]" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{f.name}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* ── 4-Step Setup ── */}
          <ScrollReveal delay={200}>
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                Launch in <span className="text-gold-gradient">4 Simple Steps</span>
              </h3>
              <p className="text-sm text-white/40 max-w-lg mx-auto">From sign-up to first client in under an hour.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {SETUP_STEPS.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 80}>
                <div className="relative text-center group">
                  {/* Step number */}
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center border transition-all duration-500 group-hover:scale-110" style={{ background: `${s.color}15`, borderColor: `${s.color}30` }}>
                    <s.icon className="size-7" style={{ color: s.color }} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: `${s.color}90` }}>Step {s.step}</div>
                  <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
                  {/* Connector line */}
                  {i < 3 && (
                    <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-white/10 to-white/5" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* ── Earnings Calculator ── */}
          <ScrollReveal delay={250}>
            <div className="max-w-5xl mx-auto mb-16">
              <WhiteLabelCalculator />
            </div>
          </ScrollReveal>

          {/* ── Pricing CTA ── */}
          <ScrollReveal delay={300}>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C5963A]/20 via-[#C5963A]/10 to-[#C5963A]/20" />
                <div className="absolute -top-px left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5963A] to-transparent" />
                <div className="relative glass-card border-[#C5963A]/20 rounded-2xl p-10 md:p-14 text-center">
                  <Crown className="size-10 text-[#C5963A] mx-auto mb-4" />
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                    White-Label NexSuite™
                  </h3>
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-5xl font-bold text-[#C5963A]">$297</span>
                    <span className="text-lg text-white/30">/month</span>
                  </div>
                  <p className="text-sm text-white/30 mb-4">or <span className="text-[#C5963A] font-semibold">$2,970/year</span> <span className="text-emerald-400">(Save 2 Months)</span></p>
                  <p className="text-sm text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
                    Full platform. Your brand. Your clients. Your revenue. Everything included — 16 AI tools, CRM, funnels, email, SMS, dialer, video, social media, and more.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setCheckoutProduct("whitelabel-nexsuite")}
                      className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                    >
                      <Rocket className="size-5" />
                      Start Your SaaS Empire
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                  <p className="text-[10px] text-white/20 mt-4">Secure checkout powered by Stripe. Cancel anytime. 30-day money-back guarantee.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-white mb-6">
                Not Sure Where to <span className="text-gold-gradient">Start</span>?
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed">
                Book a free blueprint call and we'll map out the perfect strategy for your goals. Whether it's protecting your family, scaling your business, or launching a new venture.
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

      {/* ═══ CHECKOUT MODAL ═══ */}
      {checkoutProduct && productInfo[checkoutProduct] && (
        <StripeCheckoutModal
          open={true}
          onClose={() => setCheckoutProduct(null)}
          productKey={checkoutProduct}
          productName={productInfo[checkoutProduct].name}
          priceDisplay={productInfo[checkoutProduct].price}
          priceType={productInfo[checkoutProduct].type}
          showSetupBump={["nexcrm", "nexsuite", "whitelabel-nexsuite"].includes(checkoutProduct)}
        />
      )}
    </div>
  );
}
