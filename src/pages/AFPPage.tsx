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
  Heart,
  Scale,
  Users,
  Star,
  Clock,
  Sparkles,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Trophy,
  Award,
  Landmark,
  Target,
  Play,
  AlertTriangle,
  Zap,
  TrendingUp,
  Building2,
  GraduationCap,
  Swords,
  Crown,
  X,
  Phone,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ═══════════════════════════════════════════════════════════
   ATHLETE FORTRESS PROGRAM™ — VSL FUNNEL PAGE
   garnerfinancialpartners.com/afp
   ═══════════════════════════════════════════════════════════ */

/* ─── Config ─── */
const VSL_VIDEO_URL = ""; // Replace with YouTube/Vimeo embed URL when ready
const AFP_PRICE = 97;
const AFP_PRICE_DISPLAY = "$97";
const AFP_ORIGINAL_PRICE = 997;

/* ─── Value Stack ─── */
const valueStack = [
  { name: "Revocable Living Trust", icon: Landmark, value: 5000, desc: "State-specific trust designed to protect your assets from probate, lawsuits, and creditors. The legal foundation every athlete needs." },
  { name: "Last Will & Testament", icon: FileText, value: 3000, desc: "Ensures your wishes are legally honored. Protects your family and your legacy if the unexpected happens." },
  { name: "Power of Attorney", icon: Scale, value: 2500, desc: "Designate a trusted person to handle financial decisions if you're injured, traveling, or unable to act." },
  { name: "Healthcare Directive", icon: Heart, value: 2500, desc: "Your medical wishes documented and legally binding. Critical for contact sports and high-risk careers." },
  { name: "Medical Consent Form", icon: BadgeCheck, value: 1500, desc: "Authorize trusted individuals to make medical decisions on your behalf. Essential for athletes on the road." },
  { name: "Bill of Transfer", icon: FileText, value: 2000, desc: "Legally transfer assets into your trust. The critical step most athletes never take." },
  { name: "Certificate of Trust", icon: Award, value: 1500, desc: "Official document proving your trust exists. Required by banks, agents, and financial institutions." },
  { name: "Collateral Assignment Contract", icon: Lock, value: 2500, desc: "Protect life insurance proceeds and ensure they flow directly into your trust structure." },
  { name: "Athlete U™ Portal Access", icon: Trophy, value: 997, desc: "Full access to the Athlete U™ education platform. NIL marketplace, T.A.I.R. curriculum, real estate tools, and more." },
  { name: "CVA Strategy Blueprint", icon: TrendingUp, value: 3500, desc: "Custom cash value accumulation strategy. Grow wealth inside your trust using specially-designed permanent life insurance." },
  { name: "AFP™ Athlete Community (Lifetime)", icon: Users, value: 1997, desc: "Exclusive community of athletes building generational wealth. Connect, learn, and grow together." },
  { name: "Continued Education & Training", icon: GraduationCap, value: 1500, desc: "Ongoing masterclasses, workshops, and live Q&A sessions on wealth building, NIL strategies, and financial literacy." },
];


/* ─── What You'll Learn ─── */
const learnBullets = [
  "Why 78% of athletes go broke — and the framework to make sure you don't",
  "How to legally structure your income using a Living Trust",
  "The blueprint to protect your NIL, contracts, and endorsements",
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is the Athlete Fortress Program™?",
    a: "AFP™ is a done-with-you estate planning and asset protection program built specifically for athletes. We generate custom legal documents, build your private living trust, create a personalized wealth strategy, and give you lifetime access to the Athlete U™ portal, community, and professional support network.",
  },
  {
    q: "I'm a college athlete. Is this too early for me?",
    a: "Absolutely not. In fact, this is the BEST time. If you're earning NIL money, you need protection now. The earlier you set up your trust and legal structures, the more time compound interest has to work for you. Most athletes wish they had started sooner.",
  },
  {
    q: "Do I need a lawyer to use these documents?",
    a: "No. Our documents are generated using state-specific legal templates reviewed by attorneys. However, we always recommend having a local attorney review any legal documents. Our professional network includes attorneys who can review your documents at a fraction of the typical cost.",
  },
  {
    q: "How long does the process take?",
    a: "Most athletes receive their complete document package within 7-10 business days. The full trust setup, including asset transfers and funding, typically takes 30-60 days.",
  },
  {
    q: "What if I already have an agent or financial advisor?",
    a: "Great. This program complements what they do. Most agents focus on getting you deals. We focus on making sure you keep what you earn. Your advisor will actually appreciate that you have a proper legal structure in place.",
  },
  {
    q: "Is this only for professional athletes?",
    a: "No. AFP™ is designed for athletes at every level. High school athletes with NIL potential, college athletes earning NIL income, and professional athletes with contracts and endorsements. The earlier you build your fortress, the stronger it becomes.",
  },
  {
    q: "What happens after I purchase?",
    a: "You'll get immediate access to the Athlete U™ portal where you'll complete a guided onboarding questionnaire. Our team uses your answers to generate all your legal documents and your custom wealth blueprint. You'll also get instant access to the community and education resources.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes. We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your Athlete Fortress Program™ experience, we'll work with you to make it right.",
  },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Marcus J.", role: "D1 Football", text: "I had no idea how exposed my NIL earnings were. AFP™ gave me a trust, legal documents, and a real plan. My agent was impressed I had everything structured.", stars: 5 },
  { name: "Aliyah W.", role: "Track & Field", text: "I was quoted $8,000 by a lawyer for a basic trust. This program gave me everything plus a wealth strategy and community for a fraction of that. Game changer.", stars: 5 },
  { name: "Devon R.", role: "Basketball", text: "The T.A.I.R. courses alone changed how I think about money. Now I have my trust set up, my assets protected, and I'm actually building wealth. Wish I started sooner.", stars: 5 },
];

/* ─── Stats ─── */
const stats = [
  { number: "78%", label: "Of Pro Athletes Face Financial Hardship", sub: "Within 5 years of retirement" },
  { number: "60%", label: "Of NBA Players Go Broke", sub: "Within 5 years" },
  { number: "$0", label: "Financial Education in Schools", sub: "Zero courses required" },
  { number: "8", label: "Legal Documents Included", sub: "State-specific & customized" },
];

/* ─── Video Player Component ─── */
function VideoPlayer({ onShowCheckout }: { onShowCheckout: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = useQuery(api.storage.getVideoUrl, { name: "afp_vsl" });
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
            onLoadedMetadata={(e) => { const v = e.target as HTMLVideoElement; v.currentTime = 6; }}
          />
          {isMuted && <UnmuteButton onUnmute={unmute} />}
        </div>
        <ExitIntentPopup
          headline="Wait — Don't Leave Yet"
          body="You're about to miss out on the Athlete Fortress Program™. This offer won't last forever — protect your future today."
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
    // Calculate time until midnight
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
      <Clock className="size-4 text-[#DC2626]" />
      <span className="text-white/60 text-xs uppercase tracking-wider">Offer expires in:</span>
      <div className="flex gap-1">
        {[
          { value: pad(time.hours), label: "HR" },
          { value: pad(time.minutes), label: "MIN" },
          { value: pad(time.seconds), label: "SEC" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-1">
            {i > 0 && <span className="text-[#DC2626] font-bold">:</span>}
            <div className="bg-[#DC2626]/10 border border-[#DC2626]/20 rounded px-2 py-1 min-w-[36px] text-center">
              <span className="text-white font-mono font-bold text-sm">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ MAIN PAGE ═══ */
export function AFPPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Show sticky CTA bar after scrolling past hero
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
      <VslTracker page="afp" />
      {/* ═══ MINIMAL HEADER (no nav links) ═══ */}
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
        <div className="bg-[#0A1628]/95 backdrop-blur-xl border-t border-[#DC2626]/20 py-3 px-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <Trophy className="size-5 text-[#DC2626]" />
              <span className="text-white font-semibold text-sm">Athlete Fortress Program™</span>
              <span className="text-white/40 text-sm line-through decoration-red-500/60 decoration-[3px]">${AFP_ORIGINAL_PRICE}</span>
              <ArrowRight className="size-3 text-[#DC2626]" />
              <span className="text-[#DC2626] font-bold">{AFP_PRICE_DISPLAY}</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="group px-6 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-lg transition-all duration-300 text-sm flex items-center gap-2 whitespace-nowrap"
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
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#DC2626]/[0.04] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#DC2626]/10 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 mb-6">
              <Trophy className="size-4 text-[#DC2626]" />
              <span className="text-xs font-semibold text-[#DC2626] tracking-wider uppercase">Free Training for Athletes</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-5 leading-[1.15]">
              How Athletes{" "}
              <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Legally Protect</span>{" "}
              Their Income and Build{" "}
              <span className="text-white/50">Generational Wealth</span>
            </h1>

            {/* Subheadline */}
            <p className="fade-up fade-up-delay-2 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl mx-auto mb-4">
              <span className="text-white font-semibold uppercase tracking-wide text-sm md:text-base">Watch This:</span>{" "}
              The exact blueprint to protect your earnings, avoid probate, and build lasting wealth.
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
                className="group relative px-10 py-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#DC2626]/30 text-lg flex items-center gap-3"
              >
                <span>Get the Athlete Fortress Program™ - {AFP_PRICE_DISPLAY}</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-xl animate-pulse-gold pointer-events-none" style={{ boxShadow: "0 0 0 0 rgba(220,38,38,0.4)" }} />
              </button>
              <p className="text-xs text-white/30">One-time payment · Instant portal access · 30-day guarantee</p>
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
                    <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Discover</span>
                  </h2>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">
                    What separates athletes who build wealth from those who lose it all.
                  </p>
                </ScrollReveal>

                <div className="space-y-4">
                  {learnBullets.map((bullet, i) => (
                    <ScrollReveal key={i} delay={i * 60}>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="size-3.5 text-[#DC2626]" />
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
                      <div className="text-2xl md:text-3xl font-serif font-bold text-[#DC2626] mb-1">{number}</div>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 mb-6">
                <Swords className="size-4 text-[#DC2626]" />
                <span className="text-xs font-medium text-[#DC2626] uppercase tracking-wider">Two Teams in the Game</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Which Team Are{" "}
                <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">You On?</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                There are only two types of people in the financial game. One earns money. The other controls it.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Contributor */}
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8 border-white/5 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="size-6 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white/60">The Contributor</h3>
                    <p className="text-xs text-white/30">Where most athletes start</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Focused on earning income",
                    "Trades time and body for money",
                    "Limited to their own ability, time & energy",
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

            {/* Controller */}
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8 border-[#DC2626]/20 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC2626] to-[#C5963A]" />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider bg-[#DC2626]/10 px-3 py-1 rounded-full border border-[#DC2626]/20">Goal</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/20 flex items-center justify-center">
                    <Crown className="size-6 text-[#DC2626]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">The Controller</h3>
                    <p className="text-xs text-[#DC2626]/60">Where AFP™ takes you</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Focused on asset acquisition",
                    "Makes legal structures their assets",
                    "Leverages OPT/OPM strategically",
                    "Long-term compound interest working 24/7",
                    "Works with professionals to save on taxes",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                      <CheckCircle2 className="size-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
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
                  We Were Never Taught How to{" "}
                  <span className="text-gold-gradient">Keep It</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: "The Training",
                  icon: GraduationCap,
                  text: "Society trains you to grind, compete, and earn. But never teaches you how to protect, leverage, and compound your wealth.",
                  color: "#C5963A",
                },
                {
                  label: "The Lie",
                  icon: AlertTriangle,
                  text: "\"One day I'll finally make enough to set up my future.\" But that day never comes unless you build the structure first.",
                  color: "#DC2626",
                },
                {
                  label: "The Reality",
                  icon: Target,
                  text: "You are losing compound interest years and leaking generational wealth by putting off foundational structures. Every day costs you.",
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

            {/* Intention callout */}
            <ScrollReveal delay={300}>
              <div className="max-w-xl mx-auto text-center p-6 rounded-2xl bg-[#C5963A]/5 border border-[#C5963A]/20">
                <p className="text-sm text-[#C5963A] font-semibold uppercase tracking-wider mb-2">Our Intention</p>
                <p className="text-lg text-white/70 font-serif">
                  Motivate you to apply <span className="text-gold-gradient font-bold">compound interest</span> - starting today.
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
                Stop Playing the{" "}
                <span className="text-white/40 line-through decoration-[#DC2626]/60">Old Game</span>
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
                    { step: "1", text: "Grind and hustle for every dollar." },
                    { step: "2", text: "Invest randomly without a shield." },
                    { step: "3", text: "Get rich (maybe)." },
                    { step: "4", text: "Finally set up a trust to protect what's left." },
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
              <div className="glass-card rounded-2xl p-8 border-[#DC2626]/20 h-full relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC2626] to-[#C5963A]" />
                <h3 className="text-xl font-serif font-bold text-[#DC2626] mb-6 uppercase tracking-wider">The New Way</h3>
                <div className="space-y-5">
                  {[
                    { step: "1", text: "Set up a Trust immediately as your foundation." },
                    { step: "2", text: "Use the Trust to protect and leverage assets." },
                    { step: "3", text: "Accelerate wealth with compounding interest." },
                    { step: "4", text: "Build your financial reality with layered protection." },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-white bg-[#DC2626] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{step}</span>
                      <p className="text-sm text-white/70 leading-relaxed font-medium">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Arrow CTA */}
          <ScrollReveal delay={200}>
            <div className="max-w-xl mx-auto text-center mt-10">
              <p className="text-white/40 text-sm mb-4">Ready to play the new game?</p>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#DC2626]/20"
              >
                Start Your Athlete Fortress
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
                Most athletes have scattered pieces - a bank account here, an investment there, maybe some real estate. But without a Living Trust at the center, it's all exposed. AFP™ brings every piece together.
              </p>
            </div>
          </ScrollReveal>

          {/* Puzzle pieces → Living Trust */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "Leverage / OPM", desc: "Use Other People's Money to responsibly accelerate growth.", icon: TrendingUp },
                { label: "Acquire Assets", desc: "Focus on cash-flowing assets that build value over time.", icon: Building2 },
                { label: "Legal Structures", desc: "A Trust is the legal foundation for protecting your wealth.", icon: Shield },
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

            {/* Central callout */}
            <ScrollReveal delay={300}>
              <div className="max-w-2xl mx-auto rounded-2xl border-2 border-[#C5963A]/30 bg-gradient-to-br from-[#C5963A]/10 to-[#C5963A]/5 p-8 md:p-10 text-center">
                <Shield className="size-12 text-[#C5963A] mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                  Your <span className="text-gold-gradient">Living Trust</span> is the Foundation
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-6">
                  Every asset you own - your NIL deals, bank accounts, real estate, businesses, investments - should flow through your trust. It's the frame that holds the complete picture together.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["401(k)", "Roth IRA", "Bank Accounts", "Home", "Stock Market", "Real Estate", "NIL Deals", "Brand", "Cash Flow Assets", "Credit/OPM", "Life Insurance"].map((item) => (
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 mb-6">
                <Sparkles className="size-4 text-[#DC2626]" />
                <span className="text-xs font-medium text-[#DC2626] uppercase tracking-wider">What's Included</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Everything Inside the{" "}
                <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Athlete Fortress Program™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Your complete legal, financial, and educational toolkit. Built for athletes, by people who understand the game.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {valueStack.map(({ name, icon: Icon, value, desc }, i) => (
              <ScrollReveal key={name} delay={i * 40}>
                <div className="glass-card rounded-xl p-5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#DC2626]/10 border border-[#DC2626]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#DC2626]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">${value.toLocaleString()}*</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#DC2626]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* Price anchor */}
            <ScrollReveal delay={valueStack.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#DC2626]/30 bg-gradient-to-br from-[#DC2626]/10 to-[#DC2626]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Regular Price</p>
                <p className="text-5xl md:text-6xl font-serif font-bold text-white mb-1 line-through decoration-red-500/60 decoration-[3px]">
                  ${AFP_ORIGINAL_PRICE}
                </p>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="h-px flex-1 bg-[#DC2626]/20 max-w-[100px]" />
                  <span className="text-sm text-[#DC2626] font-semibold uppercase tracking-wider">Today Only</span>
                  <div className="h-px flex-1 bg-[#DC2626]/20 max-w-[100px]" />
                </div>
                <p className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent mb-3">
                  {AFP_PRICE_DISPLAY}
                </p>
                <p className="text-sm text-white/40 mb-2">One-time payment · No hidden fees · Instant portal access</p>
                <p className="text-xs text-green-400 font-semibold bg-green-400/10 px-3 py-1 rounded-full inline-block mb-6">
                  YOU SAVE ${AFP_ORIGINAL_PRICE - AFP_PRICE} TODAY
                </p>
                <div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="group inline-flex items-center gap-3 px-12 py-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#DC2626]/30 text-lg"
                  >
                    Claim Your Athlete Fortress
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
                  {/* Avatar placeholder */}
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
                      "I created the Athlete Fortress Program™ because I watched too many athletes earn millions and lose everything. This isn't about making money - it's about keeping it, protecting it, and building something that lasts beyond your career."
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
                <span className="bg-gradient-to-r from-[#DC2626] to-[#C5963A] bg-clip-text text-transparent">Controller</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Stop spectating. Start playing and winning.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Users,
                title: "Partner With Us",
                desc: "Structure strategies to bridge the gaps in your financial plan. We meet you where you are.",
                color: "#C5963A",
              },
              {
                step: "02",
                icon: Target,
                title: "Identify Opportunity",
                desc: "Compile your legal financial fortress. Trust, estate docs, asset protection - all customized to your situation.",
                color: "#DC2626",
              },
              {
                step: "03",
                icon: Trophy,
                title: "Build Cash Value",
                desc: "Achieve the financial status of Controller. Your assets work for you, protected by legal structures.",
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
              <div className="w-20 h-20 rounded-full bg-[#DC2626]/10 border-2 border-[#DC2626]/30 flex items-center justify-center mx-auto mb-6">
                <Shield className="size-10 text-[#DC2626]" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                100% Satisfaction <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Guarantee</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                If you're not completely satisfied with your Athlete Fortress Program™ experience within 30 days, we'll work with you to make it right.
                Your protection is our #1 priority. No questions. No hassle.
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
                Athletes Who{" "}
                <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Took Action</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map(({ name, role, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#DC2626] fill-[#DC2626]" />
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
                <span className="bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">Questions</span>
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
                      <ChevronUp className="size-5 text-[#DC2626] flex-shrink-0" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#DC2626]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Your Career Has an Expiration Date.{" "}
                <br className="hidden md:block" />
                Your <span className="text-gold-gradient">Wealth</span> Doesn't Have To.
              </h2>
              <p className="text-white/40 leading-relaxed mb-4 max-w-xl mx-auto">
                Every day without a financial plan is a day closer to becoming a statistic. 
                The athletes who win the game of money start building their fortress today.
              </p>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-2xl font-bold text-white/40 line-through decoration-red-500/60 decoration-[3px]">${AFP_ORIGINAL_PRICE}</span>
                <ArrowRight className="size-5 text-[#DC2626]" />
                <span className="text-4xl font-serif font-bold bg-gradient-to-r from-[#DC2626] to-[#DC2626]/70 bg-clip-text text-transparent">{AFP_PRICE_DISPLAY}</span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#DC2626]/30 text-lg"
              >
                Start Your Athlete Fortress Now
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30 flex-wrap">
                <span className="flex items-center gap-1.5"><Lock className="size-3" /> Secure Payment</span>
                <span className="flex items-center gap-1.5"><Shield className="size-3" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Instant Access</span>
                <span className="flex items-center gap-1.5"><Trophy className="size-3" /> Full Portal Access</span>
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
            Athlete Fortress Program™ is a trademark of Garner Financial Partners.
          </p>
        </div>
      </section>

      <FunnelOptIn
        contentName="Athlete Fortress Program (AFP)"
        source="afp"
        headline="Send me the Athlete Fortress Program (AFP) briefing"
        freeAccess
        compact
      />

      {/* ═══ STRIPE CHECKOUT MODAL ═══ */}
      <StripeCheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productKey="afp"
        productName="Athlete Fortress Program™"
        priceDisplay={AFP_PRICE_DISPLAY}
        priceType="one-time"
      />

      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
