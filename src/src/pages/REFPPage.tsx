import { useUnmute, UnmuteButton, ExitIntentPopup, VslEnhancementStyles } from "../components/VslEnhancements";
import { VslTracker } from "../components/VslTracker";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { StripeCheckoutModal } from "../components/StripeCheckoutModal";
import { Footer } from "../components/Footer";
import {
  Shield,
  CheckCircle2,
  ArrowRight,
  FileText,
  Lock,
  Scale,
  Users,
  Star,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Landmark,
  Target,
  Play,
  AlertTriangle,
  Zap,
  TrendingUp,
  Building2,
  GraduationCap,
  Briefcase,
  Crown,
  X,
  Phone,
  Home,
  DollarSign,
  Layers,
  Globe,
  Rocket,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ═══════════════════════════════════════════════════════════
   REAL ESTATE FORTRESS PROGRAM™ — VSL FUNNEL PAGE
   garnerfinancialpartners.com/refp
   ═══════════════════════════════════════════════════════════ */

/* ─── Config ─── */
const VSL_VIDEO_URL = ""; // Replace with YouTube/Vimeo embed URL when ready
const REFP_PRICE = 497;
const REFP_PRICE_DISPLAY = "$497";
const REFP_TOTAL_VALUE_LOW = 21000;
const REFP_TOTAL_VALUE_HIGH = 35000;

/* ─── Value Stack ─── */
const valueStack = [
  { name: "Real Estate Trust Formation", icon: Landmark, value: 5000, desc: "Custom living trust designed to hold your real estate portfolio, shield properties from probate, lawsuits, and creditors, and create a tax-efficient ownership structure for every property you own." },
  { name: "Property Holding LLC Setup", icon: Building2, value: 5000, desc: "Complete LLC holding structure to separate each property, limit personal liability, and create a corporate veil that protects your portfolio and personal assets from tenant lawsuits." },
  { name: "Operating Agreements & Entity Docs", icon: FileText, value: 4000, desc: "Comprehensive operating agreements for your real estate LLCs and partnerships. Drafted to protect all parties, define ownership stakes, and prevent partner disputes." },
  { name: "Real Estate Tax Strategy Blueprint", icon: DollarSign, value: 5000, desc: "Personalized tax optimization strategy including depreciation schedules, 1031 exchange planning, cost segregation strategies, and legal deductions that minimize your tax burden." },
  { name: "Portfolio Structure Blueprint", icon: Layers, value: 4000, desc: "Custom entity structure designed for maximum asset protection, tax efficiency, and seamless scaling as you acquire more properties and grow your portfolio." },
  { name: "Asset Protection Planning", icon: Shield, value: 5000, desc: "Multi-layer asset protection using trusts, LLCs, and corporate structures to shield your properties, rental income, and personal wealth from lawsuits, tenants, and unforeseen threats." },
  { name: "CVA Strategy Blueprint", icon: TrendingUp, value: 3500, desc: "Cash value accumulation framework using permanent life insurance for maximum capital efficiency and tax-advantaged growth inside your trust — the ultimate real estate banking strategy." },
  { name: "Succession & Legacy Planning", icon: Users, value: 5000, desc: "Complete succession plan so your real estate empire thrives whether you sell, retire, or pass it to the next generation. Your legacy portfolio lives on." },
  { name: "Property Valuation Framework", icon: Target, value: 3000, desc: "Professional valuation framework that helps you understand your portfolio's true worth, identify under-performing assets, and position properties for maximum appreciation or sale." },
  { name: "Investor Wealth Strategy", icon: Crown, value: 3500, desc: "Personal wealth-building strategies designed specifically for real estate professionals. Leverage your properties to build compound wealth that works while you sleep." },
  { name: "REFP™ Investor Community (Lifetime)", icon: Globe, value: 2997, desc: "Exclusive community of real estate investors sharing deal flow, strategies, and partnerships that accelerate portfolio growth. Your network determines your net worth." },
  { name: "Real Estate Masterclasses & Training", icon: GraduationCap, value: 2500, desc: "Ongoing masterclasses, workshops, and live Q&A sessions on scaling portfolios, tax strategy, asset protection, 1031 exchanges, and legacy building." },
];

/* ─── What You'll Learn ─── */
const learnBullets = [
  "Why 87% of investors plateau at 1–3 properties — and how to break through",
  "How to legally structure your properties to lower taxes and protect assets",
  "The blueprint to go from landlord to portfolio architect",
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is the Real Estate Fortress Program™?",
    a: "REFP™ is a comprehensive done-with-you real estate protection and growth program. We set up your property trust, holding LLCs, entity structure, tax strategy, and succession plan — plus give you lifetime access to our investor community and professional support network. It's everything a real estate professional needs to protect their portfolio and scale what's next.",
  },
  {
    q: "I only have one rental property. Is this too advanced for me?",
    a: "Absolutely not. In fact, the earlier you build proper structure, the more protected you are. Whether you own one rental property or a 50-unit portfolio, REFP™ is designed to meet you where you are and build the foundation you need. Most investors wish they had done this before their first tenant lawsuit.",
  },
  {
    q: "How is this different from hiring a real estate attorney?",
    a: "A typical real estate attorney charges $300–$500/hour and works on individual pieces. REFP™ provides the complete solution — trust formation, LLC structure, tax strategy, succession planning, AND ongoing support — for a fraction of the cost. Our team includes attorneys, CPAs, and real estate strategists who work together on your case.",
  },
  {
    q: "How long does the setup process take?",
    a: "Most clients have their complete real estate structure documented within 14–21 business days. Full implementation, including entity formations and property transfers, typically takes 60–90 days.",
  },
  {
    q: "I already have an LLC for my properties. Do I still need this?",
    a: "A single LLC is not a fortress. Most investors with one LLC have zero real asset protection — one slip-and-fall lawsuit can pierce that veil. REFP™ builds the complete structure — trust, holding company, separate property LLCs, tax strategy — that turns a basic LLC into a bulletproof real estate fortress.",
  },
  {
    q: "What if I already have a CPA or financial advisor?",
    a: "Great — this complements what they do. Most CPAs focus on filing taxes correctly. We focus on structuring your real estate holdings to legally minimize what you owe in the first place. Your CPA will actually appreciate having the right structure to work with — especially with depreciation and 1031 exchange strategies.",
  },
  {
    q: "What happens after I purchase?",
    a: "You'll receive immediate access to the Real Estate U™ Portal where you'll complete a comprehensive property and portfolio questionnaire. Our team analyzes your holdings, designs your optimal structure, and begins building everything within the first week. You'll also get instant access to the investor community and education resources.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes. We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your Real Estate Fortress Program™ experience, we'll work with you to make it right. Your portfolio's protection is our #1 priority.",
  },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "James & Linda T.", role: "Multi-Family Investors, Phoenix AZ", text: "We had 8 rental units all under one LLC. REFP™ restructured everything — separate LLCs, a holding trust, and a tax strategy that saved us over $22K in year one. Absolute game changer.", stars: 5 },
  { name: "Carlos M.", role: "Fix & Flip Investor, Dallas TX", text: "I was one tenant lawsuit away from losing everything. The asset protection planning alone was worth 10x what I paid. Now my personal assets are completely shielded from my business risk.", stars: 5 },
  { name: "Sarah K.", role: "Rental Property Owner, Scottsdale AZ", text: "The 1031 exchange planning and depreciation strategy saved me more in taxes than I've ever saved. My CPA was impressed with the structure. Best $497 I've ever invested in my portfolio.", stars: 5 },
];

/* ─── Stats ─── */
const stats = [
  { number: "87%", label: "Of Investors Plateau at 1–3 Properties", sub: "Never scale beyond the basics" },
  { number: "60%", label: "Of Landlords Have No Exit Plan", sub: "Leaving their family exposed" },
  { number: "$0", label: "Asset Protection For Most Investors", sub: "One lawsuit away from losing it all" },
  { number: "7+", label: "Steps In Your Fortress", sub: "Done-for-you, each valued $3K–$5K" },
];

/* ─── Video Player Component ─── */
function VideoPlayer({ onShowCheckout }: { onShowCheckout: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = useQuery(api.storage.getVideoUrl, { name: "refp_vsl" });
  const [isPlaying, setIsPlaying] = useState(false);
  const { isMuted, unmute } = useUnmute(videoRef);

  // Auto-play when video URL loads
  useEffect(() => {
    if (videoUrl) setIsPlaying(true);
  }, [videoUrl]);

  // If we have a self-hosted video URL from Convex storage
  if (videoUrl && isPlaying) {
    return (
      <>
        <div className="relative w-full overflow-hidden shadow-2xl shadow-black/50" style={{ aspectRatio: "16/9" }}>
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-contain bg-black"
            controls
            controlsList="nodownload"
            autoPlay
            muted
            playsInline
            
          />
          {isMuted && <UnmuteButton onUnmute={unmute} />}
        </div>
        <ExitIntentPopup
          headline="Wait — Don't Leave Yet"
          body="You're about to miss out on the Real Estate Fortress Program™. This offer won't last forever — protect your future today."
          ctaText="Get Started Now"
          onCtaClick={onShowCheckout}
        />
      </>
    );
  }

  // If we have an external embed URL (YouTube/Vimeo)
  if (VSL_VIDEO_URL && isPlaying) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        <iframe
          src={`${VSL_VIDEO_URL}?autoplay=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const hasVideo = !!videoUrl || !!VSL_VIDEO_URL;

  return (
    <button
      onClick={() => hasVideo && setIsPlaying(true)}
      className={`relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group ${hasVideo ? "cursor-pointer" : "cursor-default"}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1917] via-[#0C0A09] to-[#1C1917]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(197,150,58,0.15) 80px, rgba(197,150,58,0.15) 81px)"
          }} />
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#C5963A]/30 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#C5963A]/30 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#C5963A]/30 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#C5963A]/30 rounded-br-2xl" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="relative mb-6">
          {hasVideo && <div className="absolute inset-0 rounded-full bg-[#DC2626]/30 animate-ping" style={{ animationDuration: "2s" }} />}
          <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center shadow-2xl shadow-[#DC2626]/30 ${hasVideo ? "group-hover:scale-110" : ""} transition-transform duration-300`}>
            <Play className="size-8 md:size-10 text-white ml-1" fill="white" />
          </div>
        </div>
        <p className="text-white/80 font-semibold text-sm md:text-lg tracking-wide uppercase">
          Watch the Free Training
        </p>
        <p className="text-white/40 text-xs md:text-sm mt-1">
          {hasVideo ? "Click to play" : "Video coming soon"}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DC2626] to-transparent opacity-60" />
    </button>
  );
}

/* ─── Countdown Timer (Urgency) ─── */
function CountdownTimer() {
  const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    setTime({ hours: h, minutes: m, seconds: s });

    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="size-4 text-[#C5963A]" />
      <span className="text-white/60 text-xs uppercase tracking-wider">Offer expires in:</span>
      <div className="flex gap-1">
        {[
          { value: pad(time.hours), label: "HR" },
          { value: pad(time.minutes), label: "MIN" },
          { value: pad(time.seconds), label: "SEC" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-1">
            {i > 0 && <span className="text-[#C5963A] font-bold">:</span>}
            <div className="bg-[#C5963A]/10 border border-[#C5963A]/20 rounded px-2 py-1 min-w-[36px] text-center">
              <span className="text-white font-mono font-bold text-sm">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ MAIN PAGE ═══ */
export function REFPPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsSticky(heroBottom < -200);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col">
      <VslEnhancementStyles />
      <VslTracker page="refp" />
      {/* ═══ MINIMAL HEADER (no nav links) ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/90 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Shield className="size-8 md:size-9 text-[#C5963A] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-[#C5963A]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h1 className="text-base md:text-lg font-serif font-bold text-white tracking-wide leading-tight">
                  GARNER
                </h1>
                <p className="text-[8px] md:text-[9px] text-[#C5963A]/70 tracking-[0.2em] uppercase font-medium -mt-0.5">
                  Financial Partners
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3 md:gap-4">
              <a
                href="tel:+15204626447"
                className="hidden sm:flex items-center gap-1.5 text-sm text-white/60 hover:text-[#C5963A] transition-colors font-medium"
              >
                <Phone className="size-3.5" />
                (520) 462-6447
              </a>
              <button
                type="button"
                onClick={() => { (window as any).openVapiWidget?.(); }}
                className="px-4 md:px-6 py-2 md:py-2.5 bg-[#C5963A] hover:bg-[#9E7730] text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#C5963A]/20"
              >
                Speak to Us
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">

      {/* ═══ STICKY CTA BAR ═══ */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${isSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className="bg-[#0A1628]/95 backdrop-blur-xl border-t border-[#C5963A]/20 py-3 px-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <Home className="size-5 text-[#C5963A]" />
              <span className="text-white font-semibold text-sm">Real Estate Fortress Program™</span>
              <span className="text-white/40 text-sm">Total Value: ${REFP_TOTAL_VALUE_LOW.toLocaleString()}–${REFP_TOTAL_VALUE_HIGH.toLocaleString()}</span>
              <ArrowRight className="size-3 text-[#C5963A]" />
              <span className="text-[#C5963A] font-bold">{REFP_PRICE_DISPLAY}</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="group px-6 py-2.5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-lg transition-all duration-300 text-sm flex items-center gap-2 whitespace-nowrap"
            >
              Build Your Fortress Now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══ HERO — VSL SECTION ═══ */}
      <section ref={heroRef} className="relative pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#C5963A]/[0.04] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C5963A]/10 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
              <Home className="size-4 text-[#C5963A]" />
              <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">Free Training for Real Estate Professionals & Investors</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-5 leading-[1.15]">
              The Blueprint to{" "}
              <span className="text-gold-gradient">Legally Protect</span>{" "}
              Your Properties and{" "}
              <span className="text-white/50">Build a Portfolio Legacy</span>
            </h1>

            {/* Subheadline */}
            <p className="fade-up fade-up-delay-2 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl mx-auto mb-4">
              <span className="text-white font-semibold uppercase tracking-wide text-sm md:text-base">Watch This:</span>{" "}
              The exact structure to protect your portfolio, scale faster, and build generational wealth.
            </p>

            {/* Video Player */}
            <div className="fade-up fade-up-delay-3 max-w-3xl mx-auto mb-10">
              <VideoPlayer onShowCheckout={() => setShowCheckout(true)} />
            </div>

            {/* Countdown + CTA */}
            <div className="fade-up fade-up-delay-4 flex flex-col items-center gap-5">
              <CountdownTimer />
              <button
                onClick={() => setShowCheckout(true)}
                className="group relative px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg flex items-center gap-3"
              >
                <span>Get the Real Estate Fortress Program™ — {REFP_PRICE_DISPLAY}</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-xl animate-pulse-gold pointer-events-none" />
              </button>
              <p className="text-xs text-white/30">One-time setup fee · Instant portal access · 30-day guarantee</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ WHAT YOU'LL LEARN ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Left - Text */}
              <div>
                <ScrollReveal>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                    Here's What You'll{" "}
                    <span className="text-gold-gradient">Discover</span>
                  </h2>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">
                    What separates investors who build empires from those who stay stuck.
                  </p>
                </ScrollReveal>

                <div className="space-y-4">
                  {learnBullets.map((bullet, i) => (
                    <ScrollReveal key={i} delay={i * 60}>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="size-3.5 text-[#C5963A]" />
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">{bullet}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Right - Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ number, label, sub }, i) => (
                  <ScrollReveal key={label} delay={i * 80}>
                    <div className="glass-card rounded-xl p-5 text-center">
                      <div className="text-2xl md:text-3xl font-serif font-bold text-[#C5963A] mb-1">{number}</div>
                      <div className="text-xs font-semibold text-white/70 mb-1">{label}</div>
                      <div className="text-[10px] text-white/30">{sub}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THE PROBLEM — TWO TEAMS ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Scale className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">Two Types of Real Estate Investors</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Which One Are{" "}
                <span className="text-gold-gradient">You?</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                There are only two types of real estate investors. One collects properties. The other builds an empire around them.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* The Landlord */}
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8 border-white/5 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="size-6 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white/60">The Landlord</h3>
                    <p className="text-xs text-white/30">Where most investors stay stuck</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Collecting properties with no real structure",
                    "One tenant lawsuit could wipe out everything",
                    "Paying way more in taxes than necessary",
                    "No exit plan — portfolio dies when they do",
                    "Personal assets fully exposed to business risk",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                      <X className="size-4 text-red-400/60 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* The Portfolio Architect */}
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8 border-[#C5963A]/20 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5963A] to-[#9E7730]" />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold text-[#C5963A] uppercase tracking-wider bg-[#C5963A]/10 px-3 py-1 rounded-full border border-[#C5963A]/20">Goal</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                    <Crown className="size-6 text-[#C5963A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">The Portfolio Architect</h3>
                    <p className="text-xs text-[#C5963A]/60">Where REFP™ takes you</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Every property structured in its own protected LLC",
                    "Legally shielded — personal assets untouchable",
                    "Tax-optimized with depreciation and 1031 strategies",
                    "Clear succession plan — portfolio outlives them",
                    "Compound wealth growing inside protected structures",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                      <CheckCircle2 className="size-4 text-[#C5963A] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THE LIE — ONE DAY ═══ */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] to-[#070F1D]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  Nobody Taught You How to{" "}
                  <span className="text-gold-gradient">Protect Your Portfolio</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: "The Hustle",
                  icon: GraduationCap,
                  text: "Society tells you to buy more properties, get more doors, scale faster. But nobody teaches you how to protect what you're building from being taken away in one lawsuit.",
                  color: "#C5963A",
                },
                {
                  label: "The Lie",
                  icon: AlertTriangle,
                  text: "\"Once I have more properties, I'll set up the right structure.\" But that day never comes — and every day without protection is a day you're gambling your entire portfolio.",
                  color: "#DC2626",
                },
                {
                  label: "The Reality",
                  icon: Target,
                  text: "You're losing money to taxes you don't need to pay, exposed to lawsuits that could wipe you out, and building a portfolio that disappears if you do. Time to fix that.",
                  color: "#C5963A",
                },
              ].map(({ label, icon: Icon, text, color }, i) => (
                <ScrollReveal key={label} delay={i * 100}>
                  <div className="glass-card rounded-2xl p-7 text-center h-full">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}>
                      <Icon className="size-6" style={{ color }} />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-white mb-3">{label}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={300}>
              <div className="max-w-xl mx-auto text-center p-6 rounded-2xl bg-[#C5963A]/5 border border-[#C5963A]/20">
                <p className="text-sm text-[#C5963A] font-semibold uppercase tracking-wider mb-2">The Mission</p>
                <p className="text-lg text-white/70 font-serif">
                  Help you build a <span className="text-gold-gradient font-bold">Real Estate Fortress</span> that protects, leverages, and multiplies every property you own.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THREE PILLARS — PROTECT · CONTROL · ACCELERATE ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Your Trust is the{" "}
                <span className="text-gold-gradient">Foundation</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                The Real Estate Fortress Program™ is built on three pillars — with your Trust at the center holding it all together.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                title: "PROTECT",
                icon: Shield,
                desc: "Shield every property from lawsuits, tenants, creditors, and external threats. Your personal assets and other properties stay untouchable.",
                color: "#C5963A",
              },
              {
                title: "CONTROL",
                icon: Landmark,
                desc: "Keep what you own and love in the same place. Your trust gives you total control over every property, decision, and legacy plan.",
                color: "#C5963A",
              },
              {
                title: "ACCELERATE",
                icon: Rocket,
                desc: "Open opportunities to leverage equity, 1031 exchange, and compound wealth. Your fortress becomes the engine for exponential portfolio growth.",
                color: "#C5963A",
              },
            ].map(({ title, icon: Icon, desc }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-r from-[#C5963A]/20 to-[#C5963A]/5 px-6 py-3 border-b border-[#C5963A]/10">
                    <span className="text-sm font-bold text-[#C5963A] uppercase tracking-wider">{title}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mb-4">
                      <Icon className="size-6 text-[#C5963A]" />
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed flex-1">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ PARADIGM SHIFT ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Zap className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">Paradigm Shift</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Stop Playing the{" "}
                <span className="text-white/40 line-through decoration-red-500/60">Old Game</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-stretch">
            {/* Old Way */}
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8 border-white/5 h-full relative">
                <h3 className="text-xl font-serif font-bold text-white/40 mb-6 uppercase tracking-wider">The Old Way</h3>
                <div className="space-y-5">
                  {[
                    { step: "1", text: "Buy properties with no structure. Hope for the best." },
                    { step: "2", text: "Keep every property under one LLC — or worse, your personal name." },
                    { step: "3", text: "Overpay on taxes because nobody showed you the deductions." },
                    { step: "4", text: "Pray you never get sued by a tenant or partner." },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-white/20 bg-white/5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{step}</span>
                      <p className="text-sm text-white/40 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* New Way */}
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8 border-[#C5963A]/20 h-full relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5963A] to-[#9E7730]" />
                <h3 className="text-xl font-serif font-bold text-[#C5963A] mb-6 uppercase tracking-wider">The New Way</h3>
                <div className="space-y-5">
                  {[
                    { step: "1", text: "Set up your Real Estate Trust as the foundation — immediately." },
                    { step: "2", text: "Structure each property in its own LLC for maximum protection." },
                    { step: "3", text: "Optimize taxes with depreciation, cost seg, and 1031 exchanges." },
                    { step: "4", text: "Build compound wealth inside protected structures that outlive you." },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-white bg-[#C5963A] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{step}</span>
                      <p className="text-sm text-white/70 leading-relaxed font-medium">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200}>
            <div className="max-w-xl mx-auto text-center mt-10">
              <p className="text-white/40 text-sm mb-4">Ready to build the fortress your portfolio deserves?</p>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/20"
              >
                Start Your Real Estate Fortress
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THE COMPLETE PICTURE ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                The <span className="text-gold-gradient">Complete Picture</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Most investors have scattered pieces — a property here, an LLC there, maybe a bank account. Without a Trust at the center, it's all exposed. REFP™ brings every piece together.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "LEVERAGE: Equity & OPM", desc: "Use strategic leverage, equity lines, and OPM to acquire more properties without risking what you've already built.", icon: TrendingUp },
                { label: "ASSETS: Acquire & Protect", desc: "Focus on acquiring cash-flowing properties inside structures that protect them from tenants, lawsuits, and threats.", icon: Home },
                { label: "STRUCTURE: Legal Foundation", desc: "Your Trust and property LLCs form the legal backbone that shields everything you own from everything you risk.", icon: Shield },
              ].map(({ label, desc, icon: Icon }, i) => (
                <ScrollReveal key={label} delay={i * 80}>
                  <div className="glass-card rounded-xl p-6 text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="size-6 text-[#C5963A]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#C5963A] mb-2 uppercase tracking-wider">{label}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={300}>
              <div className="max-w-2xl mx-auto rounded-2xl border-2 border-[#C5963A]/30 bg-gradient-to-br from-[#C5963A]/10 to-[#C5963A]/5 p-8 md:p-10 text-center">
                <Shield className="size-12 text-[#C5963A] mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                  Your <span className="text-gold-gradient">Real Estate Trust</span> is the Foundation
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-6">
                  Every property you own — rentals, flips, commercial, land, investment accounts, and personal assets — should flow through your trust. It's the fortress that holds everything together.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["Rental Properties", "Commercial Real Estate", "Land & Lots", "Fix & Flips", "Bank Accounts", "Investment Accounts", "Life Insurance", "Vehicles", "Equipment", "Personal Residence", "Retirement Funds"].map((item) => (
                    <span key={item} className="text-xs px-3 py-1.5 bg-[#C5963A]/10 border border-[#C5963A]/20 rounded-full text-[#C5963A]/80">{item}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ VALUE STACK ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Sparkles className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">What's Included</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Everything Inside the{" "}
                <span className="text-gold-gradient">Real Estate Fortress Program™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Your complete legal, financial, and strategic toolkit for real estate. Each step valued at $3,000–$5,000. Total value: $21,000–$35,000. Yours for one simple setup fee.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {valueStack.map(({ name, icon: Icon, value, desc }, i) => (
              <ScrollReveal key={name} delay={i * 40}>
                <div className="glass-card rounded-xl p-5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#C5963A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">${value.toLocaleString()}*</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#C5963A]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* Price anchor */}
            <ScrollReveal delay={valueStack.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#C5963A]/30 bg-gradient-to-br from-[#C5963A]/10 to-[#C5963A]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Total National Average Retail Value</p>
                <p className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">
                  <span className="line-through decoration-red-500/60 decoration-[3px]">${REFP_TOTAL_VALUE_LOW.toLocaleString()} – ${REFP_TOTAL_VALUE_HIGH.toLocaleString()}</span>
                </p>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                  <span className="text-sm text-[#C5963A] font-semibold uppercase tracking-wider">One Simple Setup Fee</span>
                  <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                </div>
                <p className="text-6xl md:text-7xl font-serif font-bold text-gold-gradient mb-3">
                  {REFP_PRICE_DISPLAY}
                </p>
                <p className="text-sm text-white/40 mb-2">One-time payment · No hidden fees · Instant access</p>
                <p className="text-xs text-green-400 font-semibold bg-green-400/10 px-3 py-1 rounded-full inline-block mb-6">
                  SAVE UP TO ${(REFP_TOTAL_VALUE_HIGH - REFP_PRICE).toLocaleString()} TODAY
                </p>
                <div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                  >
                    Claim Your Real Estate Fortress
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <p className="text-[10px] text-white/20 mt-4">*Values represent national average retail prices for comparable services. This is for informational purposes only.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ WHO IS ZACH ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Who's Behind <span className="text-gold-gradient">This Program?</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[#C5963A]/20 to-[#C5963A]/5 border border-[#C5963A]/20 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    <Shield className="size-12 md:size-16 text-[#C5963A]" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">Zach Garner</h3>
                    <p className="text-sm text-[#C5963A] font-semibold mb-4">Founder, Garner Financial Partners</p>

                    <div className="space-y-3 mb-6">
                      {[
                        "Got his insurance license in 2011",
                        "Started and sold 6 different businesses",
                        "Real estate investor and portfolio builder",
                        "Had his \"aha moment\" after a $217,000 tax bill",
                        "Founded Garner Financial Partners to help others avoid the same mistakes",
                        "Husband, father, and investor building generational wealth",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded bg-[#C5963A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="size-3 text-[#C5963A]" />
                          </div>
                          <p className="text-sm text-white/50 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-white/40 leading-relaxed italic">
                      "I created the Real Estate Fortress Program™ because I watched too many real estate investors build incredible portfolios and then lose properties, equity, or everything to one lawsuit, one tax mistake, or one divorce. This program is what I wish someone had given me before that $217K tax bill."
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THE PATH — LANDLORD TO ARCHITECT ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                From Landlord to{" "}
                <span className="text-gold-gradient">Portfolio Architect</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Stop managing properties scared. Start building a real estate empire.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Briefcase,
                title: "Partner With Us",
                desc: "Complete your portfolio assessment. We analyze your current holdings, identify gaps, and design your optimal real estate fortress.",
                color: "#C5963A",
              },
              {
                step: "02",
                icon: Layers,
                title: "Build Your Fortress",
                desc: "We set up your trust, property LLCs, tax strategy, and protection layers. Everything custom-built for your real estate portfolio.",
                color: "#C5963A",
              },
              {
                step: "03",
                icon: Crown,
                title: "Scale & Protect",
                desc: "Grow with confidence. Your portfolio is shielded, your taxes are optimized, and your legacy is secured for generations.",
                color: "#C5963A",
              },
            ].map(({ step, icon: Icon, title, desc, color }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden h-full">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl border flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}>
                    <Icon className="size-7" style={{ color }} />
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

      {/* ═══ GUARANTEE ═══ */}
      <section className="py-16 md:py-20 bg-[#070F1D]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-[#C5963A]/10 border-2 border-[#C5963A]/30 flex items-center justify-center mx-auto mb-6">
                <Shield className="size-10 text-[#C5963A]" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                100% Satisfaction <span className="text-gold-gradient">Guarantee</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                If you're not completely satisfied with your Real Estate Fortress Program™ experience within 30 days, we'll work with you to make it right.
                Your portfolio's protection is our #1 priority. No questions. No hassle.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Real Estate Investors Who{" "}
                <span className="text-gold-gradient">Took Action</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map(({ name, role, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#C5963A] fill-[#C5963A]" />
                    ))}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 italic">"{text}"</p>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-xs text-white/30">{role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ FAQ ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Frequently Asked{" "}
                <span className="text-gold-gradient">Questions</span>
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
                      <ChevronUp className="size-5 text-[#C5963A] flex-shrink-0" />
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
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0A1628] to-[#070F1D]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5963A]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Your Portfolio Deserves a{" "}
                <span className="text-gold-gradient">Fortress.</span>{" "}
                <br className="hidden md:block" />
                Your Family Deserves a <span className="text-gold-gradient">Legacy.</span>
              </h2>
              <p className="text-white/40 leading-relaxed mb-4 max-w-xl mx-auto">
                Every day without proper structure is a day your properties — and your family's future — are exposed.
                The real estate investors who win long-term build their fortress today.
              </p>

              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Start Your Real Estate Fortress Now
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30 flex-wrap">
                <span className="flex items-center gap-1.5"><Lock className="size-3" /> Secure Payment</span>
                <span className="flex items-center gap-1.5"><Shield className="size-3" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Instant Access</span>
                <span className="flex items-center gap-1.5"><Home className="size-3" /> Full Portal Access</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ DISCLAIMER ═══ */}
      <section className="py-6 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[10px] md:text-xs text-white/20 leading-relaxed">
              <strong className="text-white/30">Disclaimer:</strong> This presentation is for education and entertainment purposes only, and should <em>not</em> be taken as legal, tax advice or financial advice. Garner Financial Partners is an education platform, not a law firm, CPA firm, or registered investment adviser. All legal documents are generated through licensed third-party providers. Individual results may vary. Past performance is not indicative of future results. Consult with qualified professionals before making financial or legal decisions.
            </p>
          </div>
        </div>
      </section>

      </main>

      <Footer />

      {/* ═══ CHECKOUT MODAL ═══ */}
      <StripeCheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productKey="refp"
        productName="Real Estate Fortress Program™"
        priceDisplay="$497"
        priceType="one-time"
      />
    </div>
  );
}
