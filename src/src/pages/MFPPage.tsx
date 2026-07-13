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
  Heart,
  Scale,
  Users,
  Star,
  Clock,
  Sparkles,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Landmark,
  Target,
  Play,
  AlertTriangle,
  Zap,
  TrendingUp,

  GraduationCap,
  Swords,
  Crown,
  X,
  Phone,
  Flag,
  Medal,
  ShieldCheck,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ═══════════════════════════════════════════════════════════
   MILITARY FORTRESS PROGRAM™ — VSL FUNNEL PAGE
   garnerfinancialpartners.com/mfp
   ═══════════════════════════════════════════════════════════ */

/* ─── Config ─── */
const VSL_VIDEO_URL = ""; // Replace with YouTube/Vimeo embed URL when ready
const MFP_PRICE = 197;
const MFP_PRICE_DISPLAY = "$197";
const MFP_ORIGINAL_PRICE = 997;

/* ─── Value Stack ─── */
const valueStack = [
  { name: "Revocable Living Trust", icon: Landmark, value: 5000, desc: "State-specific trust designed to shield your assets from probate, lawsuits, and creditors. The legal bedrock every military family needs." },
  { name: "Last Will & Testament", icon: FileText, value: 3000, desc: "Legally binding will ensuring your family is protected while you serve. Especially critical before deployments." },
  { name: "Power of Attorney", icon: Scale, value: 2500, desc: "Designate a trusted person to handle finances during deployment, TDY, or disability. A non-negotiable for every service member." },
  { name: "Healthcare Directive", icon: Heart, value: 2500, desc: "Your medical wishes documented and legally binding. Essential for active-duty, reservists, and veterans alike." },
  { name: "Medical Consent Form", icon: BadgeCheck, value: 1500, desc: "Authorize trusted individuals to make medical decisions on your behalf during service or family emergencies." },
  { name: "Bill of Transfer", icon: FileText, value: 2000, desc: "Legally transfer assets into your trust. The critical step most veterans miss — and it costs them everything." },
  { name: "VA Benefits Optimization Blueprint", icon: Flag, value: 3000, desc: "Comprehensive strategy to maximize every VA benefit you've earned. Disability, healthcare, education, and housing." },
  { name: "Military Transition Planning", icon: Target, value: 2500, desc: "Custom financial roadmap for transitioning from active duty to civilian life. Protect your income, benefits, and family." },
  { name: "SGLI/VGLI Insurance Review", icon: Shield, value: 1500, desc: "Complete review of your Servicemembers' and Veterans' Group Life Insurance to ensure maximum coverage." },
  { name: "TSP & Military Retirement Blueprint", icon: Landmark, value: 2500, desc: "Optimize your Thrift Savings Plan and military retirement benefits for maximum long-term wealth accumulation." },
  { name: "CVA Strategy Blueprint", icon: TrendingUp, value: 3000, desc: "Custom cash value accumulation strategy using specially-designed permanent life insurance. Built for military families." },
  { name: "MFP™ Veteran Community (Lifetime)", icon: Users, value: 1997, desc: "Exclusive community of veterans and military families building generational wealth together. Lifetime access." },
  { name: "Continued Education & Training", icon: GraduationCap, value: 1500, desc: "Ongoing masterclasses, VA benefits workshops, wealth-building sessions, and live Q&A with veteran-focused professionals." },
  { name: "Veteran Support Network", icon: Phone, value: 2000, desc: "Direct access to veteran-focused licensed professionals, VA-accredited attorneys, and estate planners who understand military life." },
];

const totalValue = valueStack.reduce((s, i) => s + i.value, 0);

/* ─── What You'll Learn ─── */
const learnBullets = [
  "Why veterans leave $100B+ in VA benefits unclaimed — and how to claim yours",
  "How to legally structure your income and benefits using a Living Trust",
  "The blueprint to protect your TSP, pension, and disability pay",
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is the Military Fortress Program™?",
    a: "MFP™ is a comprehensive done-with-you estate planning and asset protection education program designed specifically for military service members, veterans, and their families. We create 8+ custom legal documents, build your private family trust, optimize your VA benefits strategy, and give you lifetime access to the veteran community and professional support network.",
  },
  {
    q: "Is this available for active-duty service members?",
    a: "Yes! MFP™ is designed for both active-duty service members and veterans. Having proper legal documents in place is even more critical for active-duty members who may face deployment. Power of Attorney and Healthcare Directives are essential before any deployment.",
  },
  {
    q: "How does this help with VA benefits?",
    a: "Our VA Benefits Optimization Blueprint analyzes your current benefits enrollment and identifies opportunities you may be missing. Many veterans leave thousands of dollars on the table each year in unclaimed benefits. We work with VA-accredited professionals to ensure you're maximizing every benefit you've earned through your service.",
  },
  {
    q: "Why is this only $197?",
    a: "Because we believe those who served our country deserve access to the same estate planning and financial strategies that typically cost $21,000–$35,000 at national retail prices. The $197 setup fee is our way of honoring your service while still delivering a premium, done-with-you program with real legal documents and lifetime support.",
  },
  {
    q: "Can my spouse complete this if I'm deployed?",
    a: "Absolutely. Your spouse will have full access to the MFP™ Veterans Portal and can complete the onboarding questionnaire on your behalf. The Power of Attorney documents we create ensure your family is protected even during deployment.",
  },
  {
    q: "What happens after I purchase?",
    a: "You'll receive immediate access to the MFP™ Veterans Portal where you'll complete a guided onboarding questionnaire. Our team uses your answers — including your military branch, rank, and years of service — to generate all legal documents, optimize your benefits strategy, and create your custom wealth blueprint. You'll also get instant access to the veteran community.",
  },
  {
    q: "Do I need a lawyer to use these documents?",
    a: "No. Our documents are generated using state-specific legal templates reviewed by attorneys. However, we always recommend having a local attorney review any legal documents. Our Veteran Support Network includes attorneys who can review your documents at a fraction of the typical cost.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes. We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your Military Fortress Program™ experience, we'll work with you to make it right. You served our country — the least we can do is serve your family with excellence.",
  },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Sgt. Robert M.", role: "US Army (Ret.)", text: "After 20 years in the Army, I had no estate plan. MFP™ gave me everything — trust, will, POA, healthcare directive — plus optimized my VA benefits. I was leaving money on the table and didn't even know it.", stars: 5 },
  { name: "CPO Maria S.", role: "US Navy (Ret.)", text: "As a military spouse and then veteran myself, I know how complicated our finances can be. MFP™ simplified everything. The transition planning alone saved us thousands.", stars: 5 },
  { name: "SSgt. Kevin D.", role: "US Marines (Ret.)", text: "At $197, there's zero excuse not to do this. I paid more for a single consultation with a civilian attorney. This program gave me more in one week than I got in years of VA visits.", stars: 5 },
];

/* ─── Stats ─── */
const stats = [
  { number: "70%", label: "Of Veterans Have No Estate Plan", sub: "Leaving families unprotected" },
  { number: "$100B+", label: "In VA Benefits Go Unclaimed", sub: "Every single year" },
  { number: "$0", label: "Financial Education in the Military", sub: "Zero required courses" },
  { number: "8+", label: "Legal Documents Included", sub: "State-specific & customized" },
];

/* ─── Video Player Component ─── */
function VideoPlayer({ onShowCheckout }: { onShowCheckout: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = useQuery(api.storage.getVideoUrl, { name: "mfp_vsl" });
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
          body="You're about to miss out on the Military Fortress Program™. This offer won't last forever — protect your future today."
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
export function MFPPage() {
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
      <VslTracker page="mfp" />
      {/* ═══ MINIMAL HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/90 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
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

            {/* Phone + CTA */}
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
              <Medal className="size-5 text-[#C5963A]" />
              <span className="text-white font-semibold text-sm">Military Fortress Program™</span>
              <span className="text-white/40 text-sm line-through decoration-red-500/60 decoration-[3px]">${MFP_ORIGINAL_PRICE}</span>
              <ArrowRight className="size-3 text-[#C5963A]" />
              <span className="text-[#C5963A] font-bold">{MFP_PRICE_DISPLAY}</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="group px-6 py-2.5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-lg transition-all duration-300 text-sm flex items-center gap-2 whitespace-nowrap"
            >
              Get Protected Now
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
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#1a3a6b]/15 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
              <Medal className="size-4 text-[#C5963A]" />
              <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">Free Training for Veterans & Military Families</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-5 leading-[1.15]">
              You Sacrificed for{" "}
              <span className="text-gold-gradient">Our Freedom.</span>{" "}
              <br className="hidden md:block" />
              <span className="text-gold-gradient">Now Let Us Serve You.</span>
            </h1>

            {/* Subheadline */}
            <p className="fade-up fade-up-delay-2 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl mx-auto mb-4">
              <span className="text-white font-semibold uppercase tracking-wide text-sm md:text-base">Watch This:</span>{" "}
              The blueprint to protect your assets, maximize VA benefits, and build generational wealth.
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
                <span>Get the Military Fortress Program™ — {MFP_PRICE_DISPLAY}</span>
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
                    What separates veterans who build wealth from those who struggle after service.
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
                <Swords className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">Two Types of Veterans</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Which Side of the{" "}
                <span className="text-gold-gradient">Mission</span> Are You On?
              </h2>
              <p className="text-white/40 leading-relaxed">
                In the military you learned discipline, structure, and mission planning. But when it comes to your finances, most veterans fall into one of two categories.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* The Contributor */}
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8 border-white/5 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="size-6 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white/60">The Contributor</h3>
                    <p className="text-xs text-white/30">Where most veterans end up</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Focused on earning income — paycheck to paycheck",
                    "Trades time and body for money after service",
                    "Leaves VA benefits and entitlements on the table",
                    "Little to no exposure to compound interest",
                    "Vulnerable to taxes, lawsuits & inflation",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                      <X className="size-4 text-red-400/60 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* The Controller */}
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8 border-[#C5963A]/20 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5963A] to-[#C5963A]/50" />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold text-[#C5963A] uppercase tracking-wider bg-[#C5963A]/10 px-3 py-1 rounded-full border border-[#C5963A]/20">Goal</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center">
                    <Crown className="size-6 text-[#C5963A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">The Controller</h3>
                    <p className="text-xs text-[#C5963A]/60">Where MFP™ takes you</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Focused on asset acquisition and wealth building",
                    "Uses legal structures to protect and grow assets",
                    "Maximizes every VA benefit they've earned",
                    "Leverages OPT/OPM strategically",
                    "Long-term compound interest working 24/7",
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

      {/* ═══ THE LIE — WE WERE NEVER TAUGHT ═══ */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] to-[#070F1D]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  The Military Trained You to Fight.{" "}
                  <span className="text-gold-gradient">Not to Build Wealth.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: "The Training",
                  icon: GraduationCap,
                  text: "You were trained to protect, serve, and sacrifice. But nobody taught you how to protect your own family's financial future after service.",
                  color: "#C5963A",
                },
                {
                  label: "The Lie",
                  icon: AlertTriangle,
                  text: "\"My VA benefits and military pension will be enough.\" But without legal structures, your benefits are exposed, your estate goes to probate, and your family pays the price.",
                  color: "#DC2626",
                },
                {
                  label: "The Reality",
                  icon: Target,
                  text: "Every day without a trust is a day your family is unprotected. You're losing compound interest years and leaking generational wealth. The mission isn't over — it's just beginning.",
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
                <p className="text-sm text-[#C5963A] font-semibold uppercase tracking-wider mb-2">Our Mission</p>
                <p className="text-lg text-white/70 font-serif">
                  Empower every veteran to apply <span className="text-gold-gradient font-bold">compound interest</span> — starting today.
                </p>
              </div>
            </ScrollReveal>
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
                Stop Running the{" "}
                <span className="text-white/40 line-through decoration-[#C5963A]/60">Old Playbook</span>
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
                    { step: "1", text: "Serve your country. Collect a paycheck." },
                    { step: "2", text: "Transition out with no financial plan." },
                    { step: "3", text: "Hope your pension and VA benefits are enough." },
                    { step: "4", text: "Maybe set up a trust — after the damage is done." },
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
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5963A] to-[#C5963A]/50" />
                <h3 className="text-xl font-serif font-bold text-[#C5963A] mb-6 uppercase tracking-wider">The Fortress Way</h3>
                <div className="space-y-5">
                  {[
                    { step: "1", text: "Build your Trust immediately — your financial foundation." },
                    { step: "2", text: "Maximize every VA benefit and military entitlement." },
                    { step: "3", text: "Accelerate wealth with compounding interest and OPM." },
                    { step: "4", text: "Protect, control, and multiply your family's legacy." },
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
              <p className="text-white/40 text-sm mb-4">Ready to build your fortress?</p>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/20"
              >
                Start Your Military Fortress
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THE COMPLETE PICTURE — PROTECT, CONTROL, ACCELERATE ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                The <span className="text-gold-gradient">Complete Fortress</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Most veterans have scattered pieces — a TSP here, VA benefits there, maybe some savings. Without a Living Trust at the center, it's all exposed. MFP™ brings every piece together into one fortified structure.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "PROTECT", desc: "Shield what you love and built from external threats — lawsuits, probate, creditors, and the unexpected.", icon: Shield },
                { label: "CONTROL", desc: "Keep what you own and love in the same place. Your trust is your command center for every asset.", icon: Lock },
                { label: "ACCELERATE", desc: "Open opportunities to leverage and compound. Use OPM, cash value strategies, and tax-advantaged growth.", icon: TrendingUp },
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
                  Your <span className="text-gold-gradient">Living Trust</span> is the Foundation
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-6">
                  Every asset you have — TSP, VA benefits, bank accounts, real estate, businesses, life insurance — should flow through your trust. It's the fortress that holds everything together and protects your family.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["TSP/401(k)", "VA Benefits", "Military Pension", "SGLI/VGLI", "Bank Accounts", "Home", "Real Estate", "Investments", "Stock Market", "Cash Flow Assets", "Life Insurance"].map((item) => (
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
                <span className="text-gold-gradient">Military Fortress Program™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Your complete legal, financial, and educational toolkit — built for those who served, by a team that understands the mission.
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
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Total Nat'l Avg. Retail Value</p>
                <p className="text-5xl md:text-6xl font-serif font-bold text-white mb-1 line-through decoration-red-500/60 decoration-[3px]">
                  ${totalValue.toLocaleString()}
                </p>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                  <span className="text-sm text-[#C5963A] font-semibold uppercase tracking-wider">One Simple Setup Fee</span>
                  <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                </div>
                <p className="text-6xl md:text-7xl font-serif font-bold text-gold-gradient mb-3">
                  {MFP_PRICE_DISPLAY}
                </p>
                <p className="text-sm text-white/40 mb-2">One-time payment · No hidden fees · Instant portal access</p>
                <p className="text-xs text-green-400 font-semibold bg-green-400/10 px-3 py-1 rounded-full inline-block mb-6">
                  YOU SAVE ${(totalValue - MFP_PRICE).toLocaleString()} TODAY
                </p>
                <div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                  >
                    Claim Your Military Fortress
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <p className="text-[10px] text-white/20 mt-4">*Values represent national average retail prices for comparable services. For informational purposes only.</p>
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
                  {/* Avatar */}
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
                        "Founded Garner Financial Partners to help families build and protect wealth",
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
                      "I created the Military Fortress Program™ because the men and women who serve our country deserve the same financial protection that's available to the wealthy. You put your life on the line for us. This is our way of serving you back — with real legal documents, real strategies, and real support."
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ THE PATH — CONTRIBUTOR TO CONTROLLER ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                From Contributor to{" "}
                <span className="text-gold-gradient">Controller</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Your service gave you the discipline. Now apply it to your financial future.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: Users, title: "Partner With Us", desc: "Complete your profile in the MFP™ Veterans Portal. We meet you where you are — active-duty, transitioning, or retired.", color: "#C5963A" },
              { step: "02", icon: Target, title: "Build Your Fortress", desc: "We generate your legal documents, optimize your VA benefits, and create your custom wealth blueprint.", color: "#C5963A" },
              { step: "03", icon: Flag, title: "Mission Complete", desc: "Your assets are protected, your benefits maximized, and your compound interest is working 24/7. Legacy secured.", color: "#C5963A" },
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
                <ShieldCheck className="size-10 text-[#C5963A]" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Our Promise to <span className="text-gold-gradient">Those Who Served</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                If you're not completely satisfied with your Military Fortress Program™ experience within 30 days, we'll work with you to make it right. You served our country with honor. The least we can do is serve your family with excellence. No questions. No hassle.
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
                Veterans Who{" "}
                <span className="text-gold-gradient">Built Their Fortress</span>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-8">
                <Medal className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">Thank You for Your Service</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                You Protected Our Nation.{" "}
                <br className="hidden md:block" />
                Now Let Us Protect{" "}
                <span className="text-gold-gradient">Your Legacy.</span>
              </h2>
              <p className="text-white/40 leading-relaxed mb-4 max-w-xl mx-auto">
                Every day without a financial plan is a day your family is unprotected. For less than a single legal consultation, secure everything you fought for.
              </p>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-2xl font-bold text-white/40 line-through decoration-red-500/60 decoration-[3px]">${totalValue.toLocaleString()}</span>
                <ArrowRight className="size-5 text-[#C5963A]" />
                <span className="text-4xl font-serif font-bold text-gold-gradient">{MFP_PRICE_DISPLAY}</span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Start Your Military Fortress Now
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30 flex-wrap">
                <span className="flex items-center gap-1.5"><Lock className="size-3" /> Secure Payment</span>
                <span className="flex items-center gap-1.5"><Shield className="size-3" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Instant Access</span>
                <span className="flex items-center gap-1.5"><Medal className="size-3" /> Full Portal Access</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ DISCLAIMER ═══ */}
      <section className="py-6 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-[10px] text-white/15 text-center max-w-4xl mx-auto leading-relaxed">
            This presentation is for education and entertainment purposes only, and should not be taken as legal, tax advice or financial advice.
            Garner Financial Partners is not a law firm, licensed financial institution, registered investment advisor, broker-dealer, or insurance company.
            Results are hypothetical and do not account for changes in market conditions or personal circumstances. Always consult independently licensed professionals for personalized guidance.
            Military Fortress Program™ is a trademark of Garner Financial Partners. VA Benefits Optimization is not affiliated with, endorsed by, or connected to the U.S. Department of Veterans Affairs.
          </p>
        </div>
      </section>

      {/* ═══ STRIPE CHECKOUT MODAL ═══ */}
      <StripeCheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productKey="mfp"
        productName="Military Fortress Program™"
        priceDisplay={MFP_PRICE_DISPLAY}
        priceType="one-time"
      />

      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}