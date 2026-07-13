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

  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Phone,
  BookOpen,
  Award,
  Landmark,
  Play,
  AlertTriangle,
  Zap,
  TrendingUp,

  GraduationCap,
  Crown,
  X,
  Target,
  Swords,
  Cross,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ═══════════════════════════════════════════════════════════
   CHRISTIAN FORTRESS PROGRAM™ — VSL FUNNEL PAGE
   garnerfinancialpartners.com/cfp
   ═══════════════════════════════════════════════════════════ */

/* ─── Config ─── */
const VSL_VIDEO_URL = ""; // Replace with YouTube/Vimeo embed URL when ready
const CFP_PRICE_DISPLAY = "$297";
const CFP_ORIGINAL_PRICE = 997;

/* ─── Value Stack ─── */
const valueStack = [
  { name: "Revocable Living Trust", icon: Landmark, value: 5000, desc: "A trust built on biblical stewardship principles. Protects your family's assets from probate and keeps your estate private." },
  { name: "Last Will & Testament", icon: FileText, value: 3000, desc: "Ensures your wishes are honored and your loved ones are provided for. A faithful act of stewardship." },
  { name: "Power of Attorney", icon: Scale, value: 2500, desc: "Designate a trusted person to steward your financial decisions if you're unable to." },
  { name: "Healthcare Directive", icon: Heart, value: 2500, desc: "Document your medical wishes aligned with your faith and values. Peace of mind for your family." },
  { name: "Medical Consent Form", icon: BadgeCheck, value: 1500, desc: "Authorize trusted individuals to make medical decisions on your behalf in times of need." },
  { name: "Bill of Transfer", icon: FileText, value: 2000, desc: "Legally transfer assets into your trust. The critical step most families miss." },
  { name: "Certificate of Trust", icon: Award, value: 1500, desc: "Official document proving your trust exists. Required by banks, title companies & institutions." },
  { name: "Collateral Assignment Contract", icon: Lock, value: 2500, desc: "Protect life insurance proceeds and ensure they flow directly into your trust structure." },
  { name: "CVA Strategy Blueprint", icon: TrendingUp, value: 3500, desc: "Custom cash value accumulation strategy to grow wealth inside your trust — stewardship meets strategy." },
  { name: "Christian U™ Portal Access", icon: BookOpen, value: 997, desc: "Full access to the Christian U™ education platform. Faith-based financial literacy, biblical stewardship courses, and more." },
  { name: "CFP™ Faith Community (Lifetime)", icon: Users, value: 1997, desc: "Join a community of believers building generational wealth with biblical principles." },
  { name: "Continued Education & Training", icon: GraduationCap, value: 1500, desc: "Ongoing access to faith-based wealth-building masterclasses, workshops, and live sessions." },
];

const totalValue = valueStack.reduce((s, i) => s + i.value, 0);

/* ─── What You'll Learn ─── */
const learnBullets = [
  "Why faithful stewardship starts with legal protection — and why most Christian families are dangerously exposed",
  "How to honor God with your finances by structuring assets inside a Living Trust",
  "The biblical blueprint to protect your family, avoid probate, and build a legacy that outlasts you",
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is the Christian Fortress Program™?",
    a: "CFP™ is a done-with-you estate planning and asset protection program rooted in biblical stewardship. We generate custom legal documents, build your private family trust, create a personalized wealth strategy, and give you lifetime access to Christian U™ and our faith-based community.",
  },
  {
    q: "How is this different from secular estate planning?",
    a: "CFP™ is built on the principle that everything we have belongs to God — we are stewards. Our program combines professional-grade legal documents with faith-based financial education, biblical wealth principles, and a community of believers. The documents are the same legal quality; the framework and support are rooted in faith.",
  },
  {
    q: "Do I need a lawyer to use these documents?",
    a: "No. Our documents are generated using state-specific legal templates reviewed by attorneys. However, we always recommend having a local attorney review any legal documents. Our professional network includes attorneys who can review your documents at a fraction of the typical cost.",
  },
  {
    q: "How long does the process take?",
    a: "Most families receive their complete document package within 7–10 business days. The full trust setup, including asset transfers and funding, typically takes 30–60 days.",
  },
  {
    q: "Is this only for wealthy families?",
    a: "Absolutely not. God calls every family to be faithful stewards — regardless of the amount. In fact, families without trusts often suffer the most in probate court. The $297 investment today could save your family tens of thousands and years of heartache.",
  },
  {
    q: "What happens after I purchase?",
    a: "You'll receive immediate access to the Christian U™ portal where you'll complete a guided onboarding questionnaire. Our team generates all your legal documents and your custom wealth blueprint. You'll also get instant access to the faith community and education resources.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes. We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your Christian Fortress Program™ experience, we'll work with you to make it right.",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "68%", label: "Of Americans Have No Will", sub: "Let alone a trust" },
  { number: "$15K+", label: "Average Probate Cost", sub: "Without proper planning" },
  { number: "100%", label: "Biblical Foundation", sub: "Stewardship-first approach" },
  { number: "8", label: "Legal Documents Included", sub: "State-specific & customized" },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Pastor David M.", role: "Community Church", text: "CFP™ gave our family the protection we'd been praying for. The Christian U™ platform taught us stewardship principles we'd never heard in church. Truly a blessing.", stars: 5 },
  { name: "Rachel & James W.", role: "Faithful Stewards", text: "We knew we needed a trust but didn't know where to start. CFP™ made it simple, affordable, and faith-centered. Our family is finally protected.", stars: 5 },
  { name: "Timothy L.", role: "Business Owner", text: "The community of believers building wealth together has been incredible. We're not just protecting assets — we're building a legacy for God's kingdom.", stars: 5 },
];

/* ─── Video Player Component ─── */
function VideoPlayer({ onShowCheckout }: { onShowCheckout: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = useQuery(api.storage.getVideoUrl, { name: "cfp_vsl" });
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
          body="You're about to miss out on the Community Fortress Program™. This offer won't last forever — protect your future today."
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

/* ─── Countdown Timer ─── */
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
export function CFPPage() {
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
      <VslTracker page="cfp" />
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
              <Cross className="size-5 text-[#C5963A]" />
              <span className="text-white font-semibold text-sm">Christian Fortress Program™</span>
              <span className="text-white/40 text-sm line-through decoration-red-500/60 decoration-[3px]">${CFP_ORIGINAL_PRICE}</span>
              <ArrowRight className="size-3 text-[#C5963A]" />
              <span className="text-[#C5963A] font-bold">{CFP_PRICE_DISPLAY}</span>
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
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C5963A]/10 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
              <Cross className="size-4 text-[#C5963A]" />
              <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">Faith-Based Financial Training</span>
            </div>

            {/* Headline */}
            <h1 className="fade-up fade-up-delay-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-5 leading-[1.15]">
              Be a Faithful Steward:{" "}
              <span className="text-gold-gradient">Protect Your Family</span>{" "}
              and Build a{" "}
              <span className="text-white/50">Lasting Legacy</span>
            </h1>

            {/* Subheadline */}
            <p className="fade-up fade-up-delay-2 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl mx-auto mb-2">
              <span className="text-white font-semibold uppercase tracking-wide text-sm md:text-base">Watch This:</span>{" "}
              The biblical blueprint to protect your family's assets, avoid probate, and build generational wealth through faithful stewardship.
            </p>
            <p className="fade-up fade-up-delay-2 text-sm text-[#C5963A]/60 italic mb-6 max-w-2xl mx-auto">
              "A good man leaves an inheritance to his children's children." — Proverbs 13:22
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
                <span>Get the Christian Fortress Program™ — {CFP_PRICE_DISPLAY}</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-xl animate-pulse-gold pointer-events-none" style={{ boxShadow: "0 0 0 0 rgba(197,150,58,0.4)" }} />
              </button>
              <p className="text-xs text-white/30">One-time payment · Christian U™ access · 30-day guarantee</p>
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
              <div>
                <ScrollReveal>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                    Here's What You'll{" "}
                    <span className="text-gold-gradient">Discover</span>
                  </h2>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">
                    What separates families who steward faithfully from those who leave their legacy unprotected.
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

      {/* ═══ THE PROBLEM — TWO PATHS ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                <Swords className="size-4 text-[#C5963A]" />
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">Two Paths of Stewardship</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Which Path Is{" "}
                <span className="text-gold-gradient">Your Family On?</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Scripture calls us to be faithful stewards. There are two paths: one leaves your family exposed; the other builds a fortress.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Exposed */}
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8 border-white/5 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="size-6 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white/60">The Unprepared</h3>
                    <p className="text-xs text-white/30">Good intentions, no protection</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "No trust — estate goes through public probate",
                    "Assets exposed to lawsuits and creditors",
                    "Family left with confusion and disputes",
                    "Legacy scattered instead of preserved",
                    "No stewardship plan for the next generation",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                      <X className="size-4 text-red-400/60 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Protected */}
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
                    <h3 className="text-xl font-serif font-bold text-white">The Faithful Steward</h3>
                    <p className="text-xs text-[#C5963A]/60">Where CFP™ takes your family</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Living Trust protects your family's inheritance",
                    "Legal structures honor your stewardship calling",
                    "Healthcare and financial powers documented",
                    "Clear wishes preserve family unity",
                    "Wealth compounds for your children's children",
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
                  Good Intentions Don't{" "}
                  <span className="text-gold-gradient">Protect Your Family</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: "The Calling",
                  icon: BookOpen,
                  text: "God calls us to be faithful stewards. But most believers have no legal structure to protect what He's entrusted to them.",
                  color: "#C5963A",
                },
                {
                  label: "The Delay",
                  icon: AlertTriangle,
                  text: "\"We'll set up a trust someday.\" But tomorrow isn't promised. And probate doesn't wait for good intentions.",
                  color: "#DC2626",
                },
                {
                  label: "The Truth",
                  icon: Target,
                  text: "Faithful stewardship means acting now. The cost of waiting always exceeds the cost of obedience.",
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
                  Help believers become <span className="text-gold-gradient font-bold">faithful stewards</span> of everything God has entrusted to them.
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
                <span className="text-xs font-medium text-[#C5963A] uppercase tracking-wider">Kingdom Mindset</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Stop Playing the{" "}
                <span className="text-white/40 line-through decoration-[#C5963A]/60">World's Game</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-stretch">
            <ScrollReveal delay={0}>
              <div className="glass-card rounded-2xl p-8 border-white/5 h-full relative">
                <h3 className="text-xl font-serif font-bold text-white/40 mb-6 uppercase tracking-wider">The World's Way</h3>
                <div className="space-y-5">
                  {[
                    { step: "1", text: "Earn, spend, and hope for the best." },
                    { step: "2", text: "Put off planning — \"there's always tomorrow.\"" },
                    { step: "3", text: "Leave your family to figure it out." },
                    { step: "4", text: "Estate goes through probate. Legacy scattered." },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-white/20 bg-white/5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{step}</span>
                      <p className="text-sm text-white/40 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="glass-card rounded-2xl p-8 border-[#C5963A]/20 h-full relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5963A] to-[#C5963A]/50" />
                <h3 className="text-xl font-serif font-bold text-[#C5963A] mb-6 uppercase tracking-wider">The Kingdom Way</h3>
                <div className="space-y-5">
                  {[
                    { step: "1", text: "Set up a Living Trust as your foundation of stewardship." },
                    { step: "2", text: "Protect what God has entrusted to you." },
                    { step: "3", text: "Grow wealth with compound interest and faithful strategy." },
                    { step: "4", text: "Leave an inheritance to your children's children." },
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
              <p className="text-white/40 text-sm mb-4">Ready to be a faithful steward?</p>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/20"
              >
                Start Your Christian Fortress
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
                Most Christian families have scattered pieces — savings here, insurance there, a prayer for provision. But without a Living Trust at the center, it's all exposed. CFP™ brings every piece together under faithful stewardship.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "Legal Foundation", desc: "A Trust is the legal structure that protects your family's inheritance from probate and creditors.", icon: Shield },
                { label: "Faithful Growth", desc: "Use structured strategies to grow wealth with compound interest — stewardship in action.", icon: TrendingUp },
                { label: "Biblical Education", desc: "Christian U™ teaches your family the financial principles God designed for prosperity.", icon: BookOpen },
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
                <Cross className="size-12 text-[#C5963A] mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                  Your <span className="text-gold-gradient">Living Trust</span> is the Foundation
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-6">
                  Everything God has entrusted to you — your home, savings, investments, life insurance — should flow through your trust. It's the foundation of faithful stewardship.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["Home", "Savings", "Investments", "Life Insurance", "Tithe Planning", "Family Legacy"].map(item => (
                    <span key={item} className="text-xs font-medium text-[#C5963A]/70 bg-[#C5963A]/10 px-3 py-1.5 rounded-full border border-[#C5963A]/20">{item}</span>
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Everything You Get <span className="text-gold-gradient">Inside CFP™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Every document, strategy, and resource your family needs — bundled together at a fraction of what you'd pay separately.
              </p>
              <p className="text-xs text-white/20 mt-2 italic">*Based on national average retail values</p>
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

            <ScrollReveal delay={valueStack.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#C5963A]/30 bg-gradient-to-br from-[#C5963A]/10 to-[#C5963A]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Total Nat'l Avg. Retail Value</p>
                <p className="text-5xl md:text-6xl font-serif font-bold text-white mb-1 line-through decoration-red-500/60 decoration-[3px]">
                  ${totalValue.toLocaleString()}
                </p>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                  <span className="text-sm text-[#C5963A] font-semibold uppercase tracking-wider">Today Only</span>
                  <div className="h-px flex-1 bg-[#C5963A]/20 max-w-[100px]" />
                </div>
                <p className="text-6xl md:text-7xl font-serif font-bold text-gold-gradient mb-3">{CFP_PRICE_DISPLAY}</p>
                <p className="text-sm text-white/40">One-time payment · No hidden fees · Instant access</p>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="group mt-8 inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
                >
                  Claim Your Christian Fortress
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Believers <span className="text-gold-gradient">Trust Us</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map(({ name, role, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8">
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

      {/* ═══ GUARANTEE ═══ */}
      <section className="py-16 md:py-20">
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
                If you're not completely satisfied with your Christian Fortress Program™ experience within 30 days, we'll work with you to make it right. Your family's protection and faithful stewardship is our #1 priority.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ FAQ ═══ */}
      <section className="py-16 md:py-24 bg-[#070F1D]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Frequently Asked <span className="text-gold-gradient">Questions</span>
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
              <p className="text-sm text-[#C5963A]/60 italic mb-4">
                "The plans of the diligent lead surely to abundance." — Proverbs 21:5
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Your Family Deserves <span className="text-gold-gradient">Faithful Protection</span>
              </h2>
              <p className="text-white/40 leading-relaxed mb-4 max-w-xl mx-auto">
                Don't wait for a crisis to realize you needed a plan. Be the faithful steward God called you to be — protect your family today.
              </p>
              <div className="flex items-center justify-center gap-4 mb-10">
                <span className="text-2xl font-bold text-white/40 line-through decoration-red-500/60 decoration-[3px]">${totalValue.toLocaleString()}</span>
                <ArrowRight className="size-5 text-[#C5963A]" />
                <span className="text-4xl font-serif font-bold text-gold-gradient">{CFP_PRICE_DISPLAY}</span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Start Your Christian Fortress Now
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30">
                <span className="flex items-center gap-1.5"><Lock className="size-3" /> Secure Payment</span>
                <span className="flex items-center gap-1.5"><Shield className="size-3" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Instant Access</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      </main>

      <Footer />

      {/* ═══ CHECKOUT MODAL ═══ */}
      <StripeCheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productKey="cfp"
        productName="Christian Fortress Program™"
        priceDisplay={CFP_PRICE_DISPLAY}
        priceType="one-time"
      />
    </div>
  );
}
