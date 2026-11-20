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
  GraduationCap,
  Crown,
  X,
  Phone,
  BarChart3,
  Layers,
  Globe,
  Rocket,
  Camera,
  Megaphone,
  Mic2,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ═══════════════════════════════════════════════════════════
   INFLUENCER FORTRESS PROGRAM™ — VSL FUNNEL PAGE
   garnerfinancialpartners.com/ifp
   ═══════════════════════════════════════════════════════════ */

/* ─── Config ─── */
const VSL_VIDEO_URL = ""; // Replace with YouTube/Vimeo embed URL when ready
const IFP_PRICE = 297;
const IFP_PRICE_DISPLAY = "$297";
const IFP_TOTAL_VALUE_LOW = 21000;
const IFP_TOTAL_VALUE_HIGH = 35000;

/* ─── Value Stack ─── */
const valueStack = [
  { name: "Influencer Living Trust", icon: Landmark, value: 5000, desc: "Custom living trust designed to protect your brand deals, content IP, and personal assets from lawsuits, creditors, and probate. The legal foundation every influencer needs." },
  { name: "Brand & IP Protection Setup", icon: Camera, value: 4000, desc: "Structure your personal brand, content library, and intellectual property inside protected entities so no one can take what you've built." },
  { name: "Content Creator LLC Formation", icon: FileText, value: 3500, desc: "Properly structured LLC to separate your personal assets from your business. Essential for brand deals, sponsorships, and collaborations." },
  { name: "Influencer Tax Strategy Blueprint", icon: BarChart3, value: 5000, desc: "Personalized tax optimization strategy for content creators — maximize deductions on equipment, travel, home office, and contractor costs." },
  { name: "Revenue Stream Protection", icon: Layers, value: 4000, desc: "Multi-layer protection for your income sources: sponsorships, ad revenue, merch sales, courses, and affiliate commissions — all legally shielded." },
  { name: "Asset Protection Planning", icon: Shield, value: 5000, desc: "Protect your home, investments, vehicles, and savings from business lawsuits and platform-related risks. Your personal life stays untouchable." },
  { name: "CVA Strategy Blueprint", icon: TrendingUp, value: 3500, desc: "Cash value accumulation framework using permanent life insurance for tax-advantaged growth and leverageable capital inside your trust." },
  { name: "Succession & Legacy Planning", icon: Users, value: 5000, desc: "Ensure your brand, content empire, and wealth transfer seamlessly to your family — whether you step away or pass it to the next generation." },
  { name: "Influencer Business Valuation", icon: Target, value: 3000, desc: "Understand what your brand is actually worth. Essential for negotiations, partnerships, acquisitions, or an eventual exit." },
  { name: "Personal Wealth Strategy", icon: Crown, value: 3500, desc: "Build wealth beyond social media. Diversify into real estate, investments, and compound-growth vehicles while your audience works for you." },
  { name: "IFP™ Creator Community (Lifetime)", icon: Globe, value: 2997, desc: "Exclusive network of influencers and creators building generational wealth together. Collaborations, referrals, and strategies that accelerate growth." },
  { name: "Creator Coaching & Training", icon: GraduationCap, value: 2500, desc: "Ongoing masterclasses on monetization, brand protection, tax strategy, and building a media empire that outlasts any algorithm change." },
];

/* ─── What You'll Learn ─── */
const learnBullets = [
  "Why 95% of influencers never build lasting wealth — and the mistake behind it",
  "How to legally protect your brand, content IP, and income streams",
  "The blueprint to go from chasing followers to owning real assets",
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is the Influencer Fortress Program™?",
    a: "IFP™ is a comprehensive done-with-you protection and wealth-building program designed specifically for social media influencers and content creators. We set up your living trust, content creator LLC, brand protection, tax strategy, and legacy plan — plus give you lifetime access to our creator community and professional support network. It's everything an influencer needs to protect what they've built and scale what's next.",
  },
  {
    q: "I'm a smaller creator. Is this too advanced for me?",
    a: "Not at all. In fact, the earlier you build proper structure, the more protected you are. Whether you have 5K followers or 5 million, if you're earning income from content creation — sponsorships, ad revenue, merch, courses — you need this foundation. Most creators wish they had done this before their first big deal.",
  },
  {
    q: "How is this different from hiring a regular attorney?",
    a: "Most attorneys don't understand the influencer economy. They don't know about content IP protection, brand deal structures, or platform-specific risks. IFP™ provides a complete solution — trust formation, LLC setup, tax strategy, brand protection, AND ongoing support — built specifically for creators, at a fraction of what piecemeal legal services would cost.",
  },
  {
    q: "How long does the setup process take?",
    a: "Most creators have their complete legal structure documented within 14–21 business days. Full implementation, including entity formations and asset transfers, typically takes 60–90 days.",
  },
  {
    q: "I already have an LLC. Do I still need this?",
    a: "An LLC alone is not a fortress. Most influencers with a single LLC have zero real asset protection. IFP™ builds the complete structure — trust, LLC, operating agreements, brand protection, tax strategy — that turns a basic LLC into a bulletproof fortress for your entire creator business.",
  },
  {
    q: "What if I already have a manager or accountant?",
    a: "Great — IFP™ complements what they do. Most managers focus on getting you deals. Most accountants focus on filing taxes. We focus on structuring your empire to legally minimize taxes, protect your assets, and build wealth that lasts beyond any platform. Your team will actually appreciate having the right structure in place.",
  },
  {
    q: "What happens after I purchase?",
    a: "You'll receive immediate access to the IFP™ Creator Portal where you'll complete a comprehensive questionnaire about your brand, income streams, and goals. Our team analyzes your situation, designs your optimal structure, and begins building everything within the first week. You'll also get instant access to the creator community and education resources.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes. We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your Influencer Fortress Program™ experience, we'll work with you to make it right. Your brand's protection is our #1 priority.",
  },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Jasmine T.", role: "Lifestyle Creator, 850K Followers", text: "I was making six figures from brand deals but had ZERO protection. One lawsuit could have wiped me out. IFP™ set up my trust, LLC, and tax strategy — I'm keeping $30K more per year just from the tax optimization alone. Best $297 I've ever spent.", stars: 5 },
  { name: "Marcus & DeAnna R.", role: "Couple Creators, 1.2M Combined", text: "We had no idea our content, our brand name, and our personal assets were all at risk. IFP™ built a structure that protects everything. We finally feel like real business owners, not just people posting videos.", stars: 5 },
  { name: "Chris L.", role: "Fitness Influencer, 400K Followers", text: "The legacy planning alone changed my entire perspective. I'm not just building a following — I'm building generational wealth. My family is protected no matter what happens to any platform.", stars: 5 },
];

/* ─── Stats ─── */
const stats = [
  { number: "95%", label: "Of Creators Go Broke", sub: "When the algorithm changes" },
  { number: "78%", label: "Have Zero Legal Protection", sub: "One lawsuit away from losing it all" },
  { number: "$0", label: "In Asset Protection", sub: "For the average influencer" },
  { number: "7+", label: "Steps In Your Fortress", sub: "Done-for-you, each valued $3K–$5K" },
];

/* ─── Video Player Component ─── */
function VideoPlayer({ onShowCheckout }: { onShowCheckout: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = useQuery(api.storage.getVideoUrl, { name: "ifp_vsl" });
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
            onLoadedMetadata={(e) => { const v = e.target as HTMLVideoElement; v.currentTime = 4.0; }}
          />
          {isMuted && <UnmuteButton onUnmute={unmute} />}
        </div>
        <ExitIntentPopup
          headline="Wait — Don't Leave Yet"
          body="You're about to miss out on the Insurance Fortress Program™. This offer won't last forever — protect your future today."
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
export function IFPPage() {
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
      <VslTracker page="ifp" />
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
              <Camera className="size-5 text-[#C5963A]" />
              <span className="text-white font-semibold text-sm">Influencer Fortress Program™</span>
              <span className="text-white/40 text-sm">Total Value: ${IFP_TOTAL_VALUE_LOW.toLocaleString()}–${IFP_TOTAL_VALUE_HIGH.toLocaleString()}</span>
              <ArrowRight className="size-3 text-[#C5963A]" />
              <span className="text-[#C5963A] font-bold">{IFP_PRICE_DISPLAY}</span>
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
              <Camera className="size-4 text-[#C5963A]" />
              <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">Free Training for Influencers & Creators</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-5 leading-[1.15]">
              You Built the Audience.{" "}
              <span className="text-gold-gradient">Now Build the Fortress.</span>
            </h1>

            {/* Subheadline */}
            <p className="fade-up fade-up-delay-2 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl mx-auto mb-4">
              <span className="text-white font-semibold uppercase tracking-wide text-sm md:text-base">Watch This:</span>{" "}
              How to protect your brand, income, and IP before one lawsuit or platform ban wipes it out.
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
                <span>Get the Influencer Fortress Program™ — {IFP_PRICE_DISPLAY}</span>
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
                    What separates creators who build empires from those who flame out.
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

      {/* ═══ THE PROBLEM — TWO TYPES ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Scale className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">Two Types of Influencers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Which One Are{" "}
                <span className="text-gold-gradient">You?</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                There are only two types of influencers. One chases followers. The other builds an empire.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* The Content Creator */}
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8 border-white/5 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="size-6 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white/60">The Content Creator</h3>
                    <p className="text-xs text-white/30">Where most influencers stay stuck</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Income disappears the moment they stop posting",
                    "One algorithm change could wipe out their revenue",
                    "Zero legal protection for their brand or content IP",
                    "No plan for when the platform dies or they burn out",
                    "Personal assets fully exposed to lawsuits and trolls",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                      <X className="size-4 text-red-400/60 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* The Empire Builder */}
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
                    <h3 className="text-xl font-serif font-bold text-white">The Empire Builder</h3>
                    <p className="text-xs text-[#C5963A]/60">Where IFP™ takes you</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Builds assets that generate income without posting",
                    "Brand and content IP legally protected in a trust",
                    "Tax-optimized to keep more of every brand deal dollar",
                    "Clear legacy plan — wealth outlives any platform",
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

      {/* ═══ THE LIE — NOBODY TAUGHT YOU ═══ */}
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
                  icon: Megaphone,
                  text: "Everyone tells you to post more, grow faster, land bigger deals. But nobody teaches you how to protect what you're building from being taken away overnight.",
                  color: "#C5963A",
                },
                {
                  label: "The Lie",
                  icon: AlertTriangle,
                  text: "\"Once I hit a million followers, I'll figure out the legal stuff.\" But that day never comes — and every day without protection is a day you're gambling your brand, your income, and your family's future.",
                  color: "#DC2626",
                },
                {
                  label: "The Reality",
                  icon: Target,
                  text: "You're losing money to taxes you don't need to pay, exposed to lawsuits that could wipe you out, and building on rented land that could disappear tomorrow. Time to fix that.",
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
                  Help you build an <span className="text-gold-gradient font-bold">Influencer Fortress</span> that protects, leverages, and multiplies everything you've worked for.
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
                The Influencer Fortress Program™ is built on three pillars — with your Trust at the center holding it all together.
              </p>
            </div>
          </ScrollReveal>

          {/* Trust graphic from Zach's image */}
          <ScrollReveal delay={50}>
            <div className="max-w-3xl mx-auto mb-12">
              <img src="/ifp-trust.jpg" alt="Influencer Fortress Program — Trust: Protect, Control, Accelerate" className="w-full rounded-2xl shadow-2xl shadow-black/40 border border-white/10" />
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                title: "PROTECT",
                icon: Shield,
                desc: "Shield what you've built from lawsuits, copycats, and external threats. Your personal assets and brand IP stay untouchable.",
              },
              {
                title: "CONTROL",
                icon: Landmark,
                desc: "Keep what you own and love in the same place. Your trust gives you total control over assets, content rights, and legacy.",
              },
              {
                title: "ACCELERATE",
                icon: Rocket,
                desc: "Open opportunities to leverage and compound wealth. Your fortress becomes the engine for exponential growth — beyond social media.",
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
                    { step: "1", text: "Post 3x a day. Chase every trend. Burn out constantly." },
                    { step: "2", text: "Hope the next brand deal is big enough to pay the bills." },
                    { step: "3", text: "Keep everything in your personal name — totally exposed." },
                    { step: "4", text: "Pray the platform doesn't ban you or change the algorithm." },
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
                    { step: "1", text: "Set up your Living Trust and LLC — protect everything immediately." },
                    { step: "2", text: "Structure your brand, content IP, and income streams inside a fortress." },
                    { step: "3", text: "Optimize your taxes so you keep more of every dollar you earn." },
                    { step: "4", text: "Build compound wealth inside protected structures that outlive any platform." },
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
              <p className="text-white/40 text-sm mb-4">Ready to build the fortress your brand deserves?</p>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/20"
              >
                Start Your Influencer Fortress
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
                Most influencers have scattered pieces — a personal bank account, maybe an LLC, brand deals paid to their name. Without a Trust at the center, it's all exposed. IFP™ brings every piece together.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "LEVERAGE: Your Audience", desc: "Turn your influence into leverageable assets — courses, licensing, partnerships — that generate income without posting.", icon: TrendingUp },
                { label: "ASSETS: Protect & Grow", desc: "Move beyond brand deals. Acquire real assets — real estate, investments, IP — inside structures that protect them forever.", icon: Camera },
                { label: "STRUCTURE: Legal Foundation", desc: "Your Trust and entities form the legal backbone that shields your brand, content, income, and personal wealth.", icon: Shield },
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
                  Your <span className="text-gold-gradient">Trust</span> is the Foundation
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-6">
                  Every asset you own — your brand, content library, sponsorship income, real estate, investments, merchandise rights — should flow through your trust. It's the fortress that holds everything together.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["Brand & Content IP", "Sponsorship Income", "Ad Revenue", "Merch Rights", "Real Estate", "Investments", "Bank Accounts", "Life Insurance", "Vehicles", "Courses & Digital Products", "Licensing Deals"].map((item) => (
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
                <span className="text-gold-gradient">Influencer Fortress Program™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Your complete legal, financial, and strategic toolkit. Each step valued at $3,000–$5,000. Total value: $21,000–$35,000. Yours for one simple setup fee.
              </p>
            </div>
          </ScrollReveal>

          {/* Value stack image from Zach */}
          <ScrollReveal delay={50}>
            <div className="max-w-3xl mx-auto mb-10">
              <img src="/ifp-value.jpg" alt="Influencer Fortress Program — Value Stack" className="w-full rounded-2xl shadow-2xl shadow-black/40 border border-white/10" />
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

            {/* Price anchor with Zach's price image */}
            <ScrollReveal delay={valueStack.length * 40 + 100}>
              <div className="mt-8">
                <img src="/ifp-price.jpg" alt="Influencer Fortress Program — Only $297" className="w-full rounded-2xl shadow-2xl shadow-black/40 border border-white/10 mb-8" />

                <div className="rounded-2xl border-2 border-[#C5963A]/30 bg-gradient-to-br from-[#C5963A]/10 to-[#C5963A]/5 p-8 text-center">
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Total National Average Retail Value</p>
                  <p className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">
                    <span className="line-through decoration-red-500/60 decoration-[3px]">${IFP_TOTAL_VALUE_LOW.toLocaleString()} – ${IFP_TOTAL_VALUE_HIGH.toLocaleString()}</span>
                  </p>
                  <div className="flex items-center justify-center gap-3 my-4">
                    <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                    <span className="text-sm text-[#C5963A] font-semibold uppercase tracking-wider">One Simple Setup Fee</span>
                    <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                  </div>
                  <p className="text-6xl md:text-7xl font-serif font-bold text-gold-gradient mb-3">
                    {IFP_PRICE_DISPLAY}
                  </p>
                  <p className="text-sm text-white/40 mb-2">One-time payment · No hidden fees · Instant access</p>
                  <p className="text-xs text-green-400 font-semibold bg-green-400/10 px-3 py-1 rounded-full inline-block mb-6">
                    SAVE UP TO ${(IFP_TOTAL_VALUE_HIGH - IFP_PRICE).toLocaleString()} TODAY
                  </p>
                  <div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                    >
                      Claim Your Influencer Fortress
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                  <p className="text-[10px] text-white/20 mt-4">*Values represent national average retail prices for comparable services. This is for informational purposes only.</p>
                </div>
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
                        "Founded Garner Financial Partners to help creators and influencers protect their wealth",
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
                      "I created the Influencer Fortress Program™ because I watched influencers build massive audiences, land huge brand deals, and then lose it all because they never built the structure to protect it. Your followers can disappear overnight — but a properly built fortress? That lasts forever."
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THE PATH — CREATOR TO EMPIRE BUILDER ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                From Creator to{" "}
                <span className="text-gold-gradient">Empire Builder</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Stop building on rented land. Start building an empire that lasts.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Mic2,
                title: "Partner With Us",
                desc: "Complete your creator assessment. We analyze your brand, income streams, and goals — then design your optimal fortress.",
              },
              {
                step: "02",
                icon: Layers,
                title: "Build Your Fortress",
                desc: "We set up your trust, LLC, brand protection, tax strategy, and legacy plan. Everything custom-built for your creator business.",
              },
              {
                step: "03",
                icon: Crown,
                title: "Scale & Protect",
                desc: "Grow with confidence. Your brand is shielded, your taxes are optimized, and your legacy is secured for generations — no matter what any platform does.",
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden h-full">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="size-7 text-[#C5963A]" />
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
                If you're not completely satisfied with your Influencer Fortress Program™ experience within 30 days, we'll work with you to make it right.
                Your brand's protection is our #1 priority. No questions. No hassle.
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
                Creators Who{" "}
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
                Your Brand Deserves a{" "}
                <span className="text-gold-gradient">Fortress.</span>{" "}
                <br className="hidden md:block" />
                Your Family Deserves a <span className="text-gold-gradient">Legacy.</span>
              </h2>
              <p className="text-white/40 leading-relaxed mb-4 max-w-xl mx-auto">
                Every day without proper structure is a day your brand — and your family's future — is one algorithm change, one lawsuit, or one bad deal away from disaster.
                The influencers who win long-term build their fortress today.
              </p>

              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Start Your Influencer Fortress Now
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30 flex-wrap">
                <span className="flex items-center gap-1.5"><Lock className="size-3" /> Secure Payment</span>
                <span className="flex items-center gap-1.5"><Shield className="size-3" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Instant Access</span>
                <span className="flex items-center gap-1.5"><Camera className="size-3" /> Full Portal Access</span>
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
              This presentation is for education and entertainment purposes only, and should not be taken as legal, tax advice or financial advice.
              Garner Financial Partners provides educational programs and facilitates connections with licensed professionals. Individual results vary.
              Past results do not guarantee future performance. Consult your own legal, tax, and financial advisors before making any decisions.
            </p>
          </div>
        </div>
      </section>

      </main>

      <Footer />

      {/* ═══ CHECKOUT MODAL ═══ */}
      <FunnelOptIn
        contentName="Influencer Fortress Program (IFP)"
        source="ifp"
        headline="Send me the Influencer Fortress Program briefing"
        freeAccess
        compact
      />
      <StripeCheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productKey="ifp"
        productName="Influencer Fortress Program™"
        priceDisplay="$297"
        priceType="one-time"
      />
    </div>
  );
}
