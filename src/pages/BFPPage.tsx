import { useUnmute, UnmuteButton, ExitIntentPopup, VslEnhancementStyles } from "../components/VslEnhancements";
import { VslTracker } from "../components/VslTracker";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { StripeCheckoutModal } from "../components/StripeCheckoutModal";
import { FunnelOptIn } from "../components/FunnelOptIn";
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
  BarChart3,
  Layers,
  Globe,
  Rocket,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ═══════════════════════════════════════════════════════════
   BUSINESS FORTRESS PROGRAM™ — VSL FUNNEL PAGE
   garnerfinancialpartners.com/bfp
   ═══════════════════════════════════════════════════════════ */

/* ─── Config ─── */
const VSL_VIDEO_URL = ""; // Replace with YouTube/Vimeo embed URL when ready
const BFP_PRICE = 997;
const BFP_PRICE_DISPLAY = "$997";
const BFP_TOTAL_VALUE_LOW = 21000;
const BFP_TOTAL_VALUE_HIGH = 35000;

/* ─── Value Stack ─── */
const valueStack = [
  { name: "Business Trust Formation", icon: Landmark, value: 5000, desc: "Custom business trust designed to protect your company assets, shield personal wealth from business liability, and create a tax-efficient ownership structure." },
  { name: "Holding Company Setup", icon: Building2, value: 5000, desc: "Complete holding company structure to separate assets, limit liability, and create a corporate veil that protects everything you own." },
  { name: "Operating Agreements & Bylaws", icon: FileText, value: 4000, desc: "Comprehensive operating agreements for LLCs, partnerships, and corporate entities. Drafted to protect all parties and prevent disputes." },
  { name: "Business Tax Strategy Blueprint", icon: BarChart3, value: 5000, desc: "Personalized tax optimization strategy that minimizes your burden while maximizing legitimate deductions and write-offs." },
  { name: "Corporate Structure Blueprint", icon: Layers, value: 4000, desc: "Custom corporate structure designed for asset protection, tax efficiency, and seamless scaling as your business grows." },
  { name: "Asset Protection Planning", icon: Shield, value: 5000, desc: "Multi-layer asset protection using trusts, LLCs, and corporate structures to shield your business from lawsuits, creditors, and unforeseen threats." },
  { name: "CVA Strategy Blueprint", icon: TrendingUp, value: 3500, desc: "Cash value accumulation framework using permanent life insurance for maximum capital efficiency and tax-advantaged growth inside your trust." },
  { name: "Succession & Exit Planning", icon: Users, value: 5000, desc: "Complete succession plan so your business thrives whether you sell, retire, or pass it to the next generation. Your legacy lives on." },
  { name: "Business Valuation Framework", icon: Target, value: 3000, desc: "Professional valuation framework that helps you understand your company's true worth and position it for maximum growth or sale." },
  { name: "Executive Wealth Strategy", icon: Crown, value: 3500, desc: "Personal wealth-building strategies designed specifically for business owners. Separate personal and business finances strategically." },
  { name: "BFP™ Business Community (Lifetime)", icon: Globe, value: 2997, desc: "Exclusive community of business owners sharing strategies, referrals, and partnerships that accelerate growth. Network = Net Worth." },
  { name: "Executive Coaching & Training", icon: Briefcase, value: 2500, desc: "Ongoing masterclasses, workshops, and live Q&A sessions on scaling, tax strategy, asset protection, and legacy building." },
];

// const totalRetailValue = valueStack.reduce((s, i) => s + i.value, 0);

/* ─── What You'll Learn ─── */
const learnBullets = [
  "Why 80% of small businesses fail — and the structural mistake behind it",
  "How to legally structure your business to protect assets and scale faster",
  "The blueprint to stop grinding and start building wealth that compounds",
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is the Business Fortress Program™?",
    a: "BFP™ is a comprehensive done-with-you business protection and growth program. We set up your business trust, holding company, corporate structure, tax strategy, and succession plan — plus give you lifetime access to our executive community and professional support network. It's everything a business owner needs to protect what they've built and scale what's next.",
  },
  {
    q: "I'm a small business owner. Is this too advanced for me?",
    a: "Absolutely not. In fact, the earlier you build proper structure, the more protected you are. Whether you're a solopreneur doing $100K or running a team doing $10M+, BFP™ is designed to meet you where you are and build the foundation you need. Most business owners wish they had done this sooner.",
  },
  {
    q: "How is this different from hiring a business attorney?",
    a: "A typical business attorney charges $300–$500/hour and works on individual pieces. BFP™ provides the complete solution — trust formation, corporate structure, tax strategy, succession planning, AND ongoing support — for a fraction of the cost. Our team includes attorneys, CPAs, and business strategists who work together on your case.",
  },
  {
    q: "How long does the setup process take?",
    a: "Most clients have their complete business structure documented within 14–21 business days. Full implementation, including entity formations and asset transfers, typically takes 60–90 days.",
  },
  {
    q: "I already have an LLC. Do I still need this?",
    a: "An LLC alone is not a fortress. Most business owners with a single LLC have zero real asset protection. BFP™ builds the complete structure — trust, holding company, operating agreements, tax strategy — that turns a basic LLC into a bulletproof business fortress.",
  },
  {
    q: "What if I already have a CPA or financial advisor?",
    a: "Great — this complements what they do. Most CPAs focus on filing taxes correctly. We focus on structuring your business to legally minimize what you owe in the first place. Your CPA will actually appreciate having the right structure to work with.",
  },
  {
    q: "What happens after I purchase?",
    a: "You'll receive immediate access to the BFP™ Business Portal where you'll complete a comprehensive business questionnaire. Our team analyzes your business, designs your optimal structure, and begins building everything within the first week. You'll also get instant access to the executive community and education resources.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes. We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your Business Fortress Program™ experience, we'll work with you to make it right. Your business's protection is our #1 priority.",
  },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Daniel M.", role: "Restaurant Owner, Austin TX", text: "My CPA told me I was paying $40K too much in taxes because of the wrong entity structure. BFP™ restructured everything and I'm keeping way more of what I earn. Best $997 I've ever spent.", stars: 5 },
  { name: "Rachel & Chris W.", role: "Multi-Business Owners, Scottsdale AZ", text: "We have three businesses and had zero real asset protection. BFP™ built a holding company structure that now shields everything we own. Pure peace of mind.", stars: 5 },
  { name: "Marcus J.", role: "Contractor, Miami FL", text: "The succession planning alone was worth 10x the price. I now have a clear exit strategy and my family is protected no matter what happens to me or the business.", stars: 5 },
];

/* ─── Stats ─── */
const stats = [
  { number: "80%", label: "Of Small Businesses Fail", sub: "Within the first 10 years" },
  { number: "60%", label: "Of Owners Have No Exit Plan", sub: "Leaving their family exposed" },
  { number: "$0", label: "Asset Protection For Most Owners", sub: "One lawsuit away from losing it all" },
  { number: "7+", label: "Steps In Your Fortress", sub: "Done-for-you, each valued $3K–$5K" },
];

/* ─── Video Player Component ─── */
function VideoPlayer({ onShowCheckout }: { onShowCheckout: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = useQuery(api.storage.getVideoUrl, { name: "bfp_vsl" });
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
            onLoadedMetadata={(e) => { const v = e.target as HTMLVideoElement; v.currentTime = 1.5; }}
          />
          {isMuted && <UnmuteButton onUnmute={unmute} />}
        </div>
        <ExitIntentPopup
          headline="Wait — Don't Leave Yet"
          body="You're about to miss out on the Business Fortress Program™. This offer won't last forever — protect your future today."
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
export function BFPPage() {
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
      <VslTracker page="bfp" />
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
              <Building2 className="size-5 text-[#C5963A]" />
              <span className="text-white font-semibold text-sm">Business Fortress Program™</span>
              <span className="text-white/40 text-sm">Total Value: ${BFP_TOTAL_VALUE_LOW.toLocaleString()}–${BFP_TOTAL_VALUE_HIGH.toLocaleString()}</span>
              <ArrowRight className="size-3 text-[#C5963A]" />
              <span className="text-[#C5963A] font-bold">{BFP_PRICE_DISPLAY}</span>
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
              <Building2 className="size-4 text-[#C5963A]" />
              <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">Free Training for Business Owners</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-5 leading-[1.15]">
              The Blueprint to{" "}
              <span className="text-gold-gradient">Legally Protect</span>{" "}
              Your Business and{" "}
              <span className="text-white/50">Build a Lasting Legacy</span>
            </h1>

            {/* Subheadline */}
            <p className="fade-up fade-up-delay-2 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl mx-auto mb-4">
              <span className="text-white font-semibold uppercase tracking-wide text-sm md:text-base">Watch This:</span>{" "}
              The exact structure to protect your business, lower taxes, and build real wealth.
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
                <span>Get the Business Fortress Program™ — {BFP_PRICE_DISPLAY}</span>
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
                    What separates business owners who build empires from those who build jobs.
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
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">Two Types of Business Owners</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Which One Are{" "}
                <span className="text-gold-gradient">You?</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                There are only two types of business owners. One works in the business. The other builds an empire around it.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* The Operator */}
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8 border-white/5 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="size-6 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white/60">The Operator</h3>
                    <p className="text-xs text-white/30">Where most business owners stay stuck</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Trading time for money every single day",
                    "Business can't run without them",
                    "One lawsuit could destroy everything",
                    "No plan for exit, retirement, or succession",
                    "Personal and business assets are fully exposed",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                      <X className="size-4 text-red-400/60 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* The Architect */}
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
                    <h3 className="text-xl font-serif font-bold text-white">The Architect</h3>
                    <p className="text-xs text-[#C5963A]/60">Where BFP™ takes you</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Builds systems that run without them",
                    "Legally structured to shield personal assets",
                    "Tax-optimized to keep more of every dollar",
                    "Clear succession plan — business outlives them",
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
                  <span className="text-gold-gradient">Keep It</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: "The Hustle",
                  icon: GraduationCap,
                  text: "Society tells you to grind harder, work more hours, make more sales. But nobody teaches you how to protect what you're building from being taken away.",
                  color: "#C5963A",
                },
                {
                  label: "The Lie",
                  icon: AlertTriangle,
                  text: "\"Once the business is bigger, I'll set up the right structure.\" But that day never comes — and every day without protection is a day you're gambling everything.",
                  color: "#DC2626",
                },
                {
                  label: "The Reality",
                  icon: Target,
                  text: "You're losing money to taxes you don't need to pay, exposed to lawsuits that could wipe you out, and building a business that dies if you do. Time to fix that.",
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
                  Help you build a <span className="text-gold-gradient font-bold">Business Fortress</span> that protects, leverages, and multiplies everything you've worked for.
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
                The Business Fortress Program™ is built on three pillars — with your Trust at the center holding it all together.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                title: "PROTECT",
                icon: Shield,
                desc: "Shield what you've built from lawsuits, creditors, and external threats. Your personal assets stay untouchable.",
                color: "#C5963A",
              },
              {
                title: "CONTROL",
                icon: Landmark,
                desc: "Keep what you own and love in the same place. Your trust gives you total control over assets, decisions, and legacy.",
                color: "#C5963A",
              },
              {
                title: "ACCELERATE",
                icon: Rocket,
                desc: "Open opportunities to leverage and compound wealth. Your fortress becomes the engine for exponential growth.",
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
                    { step: "1", text: "Grind 80 hours a week. Sacrifice everything." },
                    { step: "2", text: "Hope the business grows enough \"someday.\"" },
                    { step: "3", text: "Keep personal and business assets mixed together." },
                    { step: "4", text: "Pray you never get sued or face an audit." },
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
                    { step: "1", text: "Set up your Business Trust as the foundation — immediately." },
                    { step: "2", text: "Structure your entities for maximum protection and tax efficiency." },
                    { step: "3", text: "Separate and shield personal assets from business risk." },
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
              <p className="text-white/40 text-sm mb-4">Ready to build the fortress your business deserves?</p>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/20"
              >
                Start Your Business Fortress
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
                Most business owners have scattered pieces — an LLC here, a bank account there, maybe some equipment. Without a Trust at the center, it's all exposed. BFP™ brings every piece together.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "LEVERAGE: Other People's Money", desc: "Use strategic leverage and OPM to scale faster without risking what you've already built.", icon: TrendingUp },
                { label: "ASSETS: Acquire & Protect", desc: "Focus on acquiring cash-flowing assets inside structures that protect them from threats.", icon: Building2 },
                { label: "STRUCTURE: Legal Foundation", desc: "Your Trust and entities form the legal backbone that shields everything you own.", icon: Shield },
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
                  Your <span className="text-gold-gradient">Business Trust</span> is the Foundation
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-6">
                  Every asset you own — your business, bank accounts, real estate, investments, equipment, intellectual property — should flow through your trust. It's the fortress that holds everything together.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["Business Entities", "Bank Accounts", "Real Estate", "Equipment", "Investments", "IP & Brand", "Life Insurance", "Retirement Funds", "Vehicles", "Stock/Equity", "Cash Flow Assets"].map((item) => (
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
                <span className="text-gold-gradient">Business Fortress Program™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Your complete legal, financial, and strategic toolkit. Each step valued at $3,000–$5,000. Total value: $21,000–$35,000. Yours for one simple setup fee.
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
                  <span className="line-through decoration-red-500/60 decoration-[3px]">${BFP_TOTAL_VALUE_LOW.toLocaleString()} – ${BFP_TOTAL_VALUE_HIGH.toLocaleString()}</span>
                </p>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                  <span className="text-sm text-[#C5963A] font-semibold uppercase tracking-wider">One Simple Setup Fee</span>
                  <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                </div>
                <p className="text-6xl md:text-7xl font-serif font-bold text-gold-gradient mb-3">
                  {BFP_PRICE_DISPLAY}
                </p>
                <p className="text-sm text-white/40 mb-2">One-time payment · No hidden fees · Instant access</p>
                <p className="text-xs text-green-400 font-semibold bg-green-400/10 px-3 py-1 rounded-full inline-block mb-6">
                  SAVE UP TO ${(BFP_TOTAL_VALUE_HIGH - BFP_PRICE).toLocaleString()} TODAY
                </p>
                <div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                  >
                    Claim Your Business Fortress
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
                      "I created the Business Fortress Program™ because I watched too many business owners work their entire lives, build something incredible, and then lose it all because they never built the structure to protect it. This program is what I wish someone had given me before that $217K tax bill."
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THE PATH — OPERATOR TO ARCHITECT ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                From Operator to{" "}
                <span className="text-gold-gradient">Architect</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Stop running your business scared. Start building an empire.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Briefcase,
                title: "Partner With Us",
                desc: "Complete your business assessment. We analyze your current structure, identify gaps, and design your optimal fortress.",
                color: "#C5963A",
              },
              {
                step: "02",
                icon: Layers,
                title: "Build Your Fortress",
                desc: "We set up your trust, entities, tax strategy, and protection layers. Everything custom-built for your business.",
                color: "#C5963A",
              },
              {
                step: "03",
                icon: Crown,
                title: "Scale & Protect",
                desc: "Grow with confidence. Your business is shielded, your taxes are optimized, and your legacy is secured for generations.",
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
                If you're not completely satisfied with your Business Fortress Program™ experience within 30 days, we'll work with you to make it right.
                Your business's protection is our #1 priority. No questions. No hassle.
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
                Business Owners Who{" "}
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
                Your Business Deserves a{" "}
                <span className="text-gold-gradient">Fortress.</span>{" "}
                <br className="hidden md:block" />
                Your Family Deserves a <span className="text-gold-gradient">Legacy.</span>
              </h2>
              <p className="text-white/40 leading-relaxed mb-4 max-w-xl mx-auto">
                Every day without proper structure is a day your business — and your family's future — is exposed.
                The business owners who win long-term build their fortress today.
              </p>

              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Start Your Business Fortress Now
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30 flex-wrap">
                <span className="flex items-center gap-1.5"><Lock className="size-3" /> Secure Payment</span>
                <span className="flex items-center gap-1.5"><Shield className="size-3" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Instant Access</span>
                <span className="flex items-center gap-1.5"><Building2 className="size-3" /> Full Portal Access</span>
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
      <FunnelOptIn
        contentName="Business Fortress Program (BFP)"
        source="bfp"
        headline="Send me the Business Fortress Program briefing"
        freeAccess
        compact
      />
      <StripeCheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productKey="bfp"
        productName="Business Fortress Program™"
        priceDisplay="$997"
        priceType="one-time"
      />
    </div>
  );
}
