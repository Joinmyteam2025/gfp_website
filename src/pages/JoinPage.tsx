import { useState, useEffect, useRef, type FormEvent } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ScrollReveal } from "../components/ScrollReveal";
import { trackFunnelLead } from "../lib/metaPixel";
import {
  ArrowRight,
  Zap,
  Target,
  Bot,
  Rocket,
  Star,
  LayoutDashboard,
  Megaphone,
  BookOpen,
  Users,
  CheckCircle2,
  Shield,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Award,
  Phone,
  Mail,
  MapPin,
  User,
  DollarSign,
  Layers,
  Share2,
  Crown,
} from "lucide-react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

const STATE_NAMES: Record<string, string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",
  CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",
  IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",
  ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",
  MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",
  NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",
  OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",
  TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",
  WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",DC:"Washington DC",
};

/* ── Animated counter ── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-serif font-bold text-[#C5963A]">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

/* ── Floating particle background ── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#C5963A]/[0.04]"
          style={{
            width: `${60 + i * 40}px`,
            height: `${60 + i * 40}px`,
            left: `${10 + i * 15}%`,
            top: `${5 + (i % 3) * 30}%`,
            animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

export function JoinPage() {
  const submitLead = useMutation(api.recruitLeads.submit);
  const pushToGHL = useAction(api.recruitLeads.pushToGHL);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    isLicensed: null as boolean | null,
    yearsLicensed: "",
    agentType: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Parse UTM params from URL
  const [utm] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmContent: params.get("utm_content") || undefined,
    };
  });

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = "Required";
    if (!formData.lastName.trim()) e.lastName = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Valid email required";
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) e.phone = "10-digit phone required";
    if (!formData.city.trim()) e.city = "Required";
    if (!formData.state) e.state = "Required";
    if (formData.isLicensed === null) e.isLicensed = "Please select";
    if (formData.isLicensed === true && !formData.yearsLicensed) e.yearsLicensed = "Please select";
    if (formData.isLicensed === true && !formData.agentType) e.agentType = "Please select";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      const leadId = await submitLead({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: `+1${phoneDigits}`,
        city: formData.city.trim(),
        state: formData.state,
        isLicensed: formData.isLicensed!,
        yearsLicensed: formData.yearsLicensed || undefined,
        agentType: formData.agentType || undefined,
        ...utm,
      });

      // Fire and forget GHL push
      pushToGHL({
        leadId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: `+1${phoneDigits}`,
        city: formData.city.trim(),
        state: formData.state,
        isLicensed: formData.isLicensed!,
        yearsLicensed: formData.yearsLicensed || undefined,
        agentType: formData.agentType || undefined,
        ...utm,
      }).catch(() => {});

      trackFunnelLead(
        window.location.pathname === "/offer"
          ? "Garner Financial Partners Agent Offer"
          : "Join Garner Financial Partners",
        { freeAccess: true },
      );

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "https://agent.garnerfinancialpartners.com/";
      }, 400);
    } catch {
      setSubmitting(false);
    }
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════
           HERO — Full viewport, dramatic, conversion-focused
         ═══════════════════════════════════════════════════════════ */}
      <section className="min-h-[100dvh] flex items-center relative overflow-hidden pt-20">
        {/* Layered background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] bg-gradient-to-b from-[#C5963A]/[0.08] to-transparent rounded-full -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#1a3a6b]/25 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#C5963A]/[0.05] to-transparent rounded-full translate-x-1/4" />
          <FloatingParticles />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <div className="text-center lg:text-left">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
                  <Zap className="size-4 text-[#C5963A]" />
                  <span className="text-xs font-semibold text-[#C5963A] tracking-wider uppercase">
                    Now Recruiting Producers
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={60}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-serif font-bold text-white mb-6 leading-[1.08]">
                  Our AI Works Smarter
                  <br />
                  <span className="text-gold-gradient">So You Can Build Bigger.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <p className="text-lg md:text-xl text-white/55 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-3">
                  Technology that outworks every traditional agency in the industry.
                  Lead vending on demand, <strong className="text-white">AI that recruits for you</strong>, 7 levels of overrides, plus marketing and affiliate commissions on <em>everything</em> we offer.
                </p>
                <p className="text-sm text-white/30 max-w-lg mx-auto lg:mx-0">
                  We built what every agency promised but never delivered — the training, the tools, the platforms, and the infrastructure to help you build a <span className="text-white/50">nine-figure insurance career.</span>
                </p>
              </ScrollReveal>

              <ScrollReveal delay={180}>
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-base relative overflow-hidden"
                  >
                    <span className="relative z-10">Apply Now</span>
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 relative z-10" />
                    <div className="absolute inset-0 rounded-xl animate-pulse-gold pointer-events-none" />
                  </button>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="flex -space-x-2">
                      {["Z","M","K","J"].map((letter, i) => (
                        <div
                          key={letter}
                          className="w-9 h-9 rounded-full border-2 border-[#0A1628] bg-gradient-to-br from-[#C5963A]/30 to-[#1a3a6b]/50 flex items-center justify-center text-xs font-bold text-white/70"
                          style={{ zIndex: 4 - i }}
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-white/40">
                      <span className="text-[#C5963A] font-semibold">200+</span> producers onboarded
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Trust badges */}
              <ScrollReveal delay={240}>
                <div className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
                  {[
                    { icon: Shield, label: "All 50 States" },
                    { icon: Bot, label: "AI-Powered CRM" },
                    { icon: Award, label: "Top Carrier Access" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <Icon className="size-3.5 text-[#C5963A]/70" />
                      <span className="text-[11px] text-white/40 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right — The Form (hero-level placement for META ads) */}
            <ScrollReveal delay={100}>
              <div className="relative">
                {/* Glow behind the form */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#C5963A]/[0.08] via-transparent to-[#1a3a6b]/[0.08] rounded-3xl blur-2xl" />

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="relative glass-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C5963A]/20 transition-all"
                  style={{ boxShadow: "0 0 60px rgba(197,150,58,0.08)" }}
                >
                  {/* Form header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-3">
                      <Sparkles className="size-3 text-[#C5963A]" />
                      <span className="text-[10px] font-bold text-[#C5963A] tracking-wider uppercase">Free to Apply</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                      Join the Team
                    </h2>
                    <p className="text-sm text-white/40">
                      Complete this form and get instant access to the Agent Portal.
                    </p>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                          <input
                            type="text"
                            placeholder="First"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={`w-full pl-9 pr-3 py-3 bg-white/[0.04] border ${errors.firstName ? "border-red-500/50" : "border-white/10"} rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C5963A]/40 focus:bg-white/[0.06] transition-all`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                          <input
                            type="text"
                            placeholder="Last"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={`w-full pl-9 pr-3 py-3 bg-white/[0.04] border ${errors.lastName ? "border-red-500/50" : "border-white/10"} rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C5963A]/40 focus:bg-white/[0.06] transition-all`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full pl-9 pr-3 py-3 bg-white/[0.04] border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C5963A]/40 focus:bg-white/[0.06] transition-all`}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                        <input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                          className={`w-full pl-9 pr-3 py-3 bg-white/[0.04] border ${errors.phone ? "border-red-500/50" : "border-white/10"} rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C5963A]/40 focus:bg-white/[0.06] transition-all`}
                        />
                      </div>
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">City</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/20" />
                          <input
                            type="text"
                            placeholder="Your city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className={`w-full pl-9 pr-3 py-3 bg-white/[0.04] border ${errors.city ? "border-red-500/50" : "border-white/10"} rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C5963A]/40 focus:bg-white/[0.06] transition-all`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">State</label>
                        <div className="relative">
                          <select
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className={`w-full px-3 py-3 bg-white/[0.04] border ${errors.state ? "border-red-500/50" : "border-white/10"} rounded-xl text-white text-sm focus:outline-none focus:border-[#C5963A]/40 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer ${!formData.state ? "text-white/20" : ""}`}
                          >
                            <option value="" className="bg-[#0F2240]">Select state</option>
                            {US_STATES.map((s) => (
                              <option key={s} value={s} className="bg-[#0F2240] text-white">
                                {STATE_NAMES[s]}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-white/20 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Licensed? */}
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-2">Are you currently licensed?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: true, label: "Yes, I'm Licensed" },
                          { val: false, label: "Not Yet Licensed" },
                        ].map(({ val, label }) => (
                          <button
                            key={String(val)}
                            type="button"
                            onClick={() => setFormData({ ...formData, isLicensed: val, ...(val === false ? { yearsLicensed: "", agentType: "" } : {}) })}
                            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                              formData.isLicensed === val
                                ? "bg-[#C5963A]/15 border-[#C5963A]/40 text-[#C5963A]"
                                : `bg-white/[0.03] ${errors.isLicensed ? "border-red-500/50" : "border-white/10"} text-white/50 hover:border-white/20 hover:text-white/70`
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Conditional fields for licensed agents */}
                    {formData.isLicensed === true && (
                      <div className="space-y-4 pt-1 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                        {/* Years licensed */}
                        <div>
                          <label className="block text-xs font-medium text-white/50 mb-2">How long have you been licensed?</label>
                          <div className="grid grid-cols-5 gap-2">
                            {[
                              { val: "less-than-1", label: "<1 yr" },
                              { val: "1-3", label: "1-3 yrs" },
                              { val: "3-5", label: "3-5 yrs" },
                              { val: "5-10", label: "5-10 yrs" },
                              { val: "10+", label: "10+ yrs" },
                            ].map(({ val, label }) => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setFormData({ ...formData, yearsLicensed: val })}
                                className={`py-2.5 px-2 rounded-lg text-xs font-medium transition-all border ${
                                  formData.yearsLicensed === val
                                    ? "bg-[#C5963A]/15 border-[#C5963A]/40 text-[#C5963A]"
                                    : `bg-white/[0.03] ${errors.yearsLicensed ? "border-red-500/50" : "border-white/10"} text-white/50 hover:border-white/20`
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Agent type */}
                        <div>
                          <label className="block text-xs font-medium text-white/50 mb-2">Current status?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { val: "captive", label: "Captive Agent", desc: "Contracted with one carrier" },
                              { val: "independent", label: "Independent Agent", desc: "Work with multiple carriers" },
                            ].map(({ val, label, desc }) => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setFormData({ ...formData, agentType: val })}
                                className={`py-3 px-4 rounded-xl text-left transition-all duration-200 border ${
                                  formData.agentType === val
                                    ? "bg-[#C5963A]/15 border-[#C5963A]/40"
                                    : `bg-white/[0.03] ${errors.agentType ? "border-red-500/50" : "border-white/10"} hover:border-white/20`
                                }`}
                              >
                                <span className={`block text-sm font-medium ${formData.agentType === val ? "text-[#C5963A]" : "text-white/60"}`}>
                                  {label}
                                </span>
                                <span className="block text-[11px] text-white/30 mt-0.5">{desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-gradient-to-r from-[#C5963A] to-[#D4A94E] hover:from-[#9E7730] hover:to-[#C5963A] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#C5963A]/20 hover:shadow-xl hover:shadow-[#C5963A]/30 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 relative overflow-hidden"
                    >
                      {submitting ? (
                        <>
                          <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Apply Now — It's Free</span>
                          <ArrowRight className="size-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-white/25 mt-2">
                      By applying, you agree to be contacted about joining our team. No fees. No obligations.
                    </p>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SOCIAL PROOF STATS
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { target: 5, suffix: "", label: "Income Streams" },
                { target: 7, suffix: "", label: "Levels of Overrides" },
                { target: 50, suffix: "+", label: "Top-Rated Carriers" },
                { target: 100, suffix: "M+", label: "Online Sales Generated", prefix: "$" },
              ].map(({ target, suffix, label, prefix }) => (
                <div key={label} className="text-center">
                  <div className="flex items-baseline justify-center">
                    {prefix && <span className="text-4xl md:text-5xl font-serif font-bold text-[#C5963A]">{prefix}</span>}
                    <AnimatedNumber target={target} suffix={suffix} />
                  </div>
                  <p className="text-xs text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider mx-auto max-w-4xl" />

      {/* ═══════════════════════════════════════════════════════════
           INCOME STREAMS — The 5 Ways You Earn
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#C5963A]/[0.04] to-transparent rounded-full" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-2">Multiple Revenue Streams</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                5 Ways You <span className="text-gold-gradient">Get Paid</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-sm">
                Most agencies give you one income stream. We built five — and every single one compounds as you grow.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto mb-10">
            {[
              {
                icon: Target,
                title: "Lead Vending",
                desc: "Purchase leads on demand — fresh, exclusive, and delivered straight to your AI-powered CRM. No more begging for leads.",
                accent: "from-[#C5963A]",
                number: "01",
              },
              {
                icon: Bot,
                title: "AI Recruiting",
                desc: "Our AI doesn't just sell — it recruits for you. Build your downline on autopilot while AI qualifies and enrolls new producers.",
                accent: "from-[#3B82F6]",
                number: "02",
              },
              {
                icon: Layers,
                title: "7 Levels of Overrides",
                desc: "Earn overrides 7 levels deep. Every producer you bring in — and every producer they bring in — puts money in your pocket.",
                accent: "from-[#8B5CF6]",
                number: "03",
              },
              {
                icon: Megaphone,
                title: "Marketing Commissions",
                desc: "Earn commissions on every marketing service, branded asset, and campaign our producers purchase through the platform.",
                accent: "from-[#10B981]",
                number: "04",
              },
              {
                icon: Share2,
                title: "Affiliate Earnings",
                desc: "Earn affiliate commissions on everything GFP offers — portals, education platforms, events, and more. If we sell it, you earn on it.",
                accent: "from-[#F59E0B]",
                number: "05",
              },
            ].map(({ icon: Icon, title, desc, accent, number }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className="glass-card rounded-xl p-5 h-full group hover:border-[#C5963A]/30 transition-all duration-500 relative overflow-hidden text-center">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent} to-transparent opacity-40 group-hover:opacity-80 transition-opacity`} />
                  <div className="relative">
                    <span className="text-[10px] font-bold text-white/15 tracking-widest mb-3 block">{number}</span>
                    <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C5963A]/20 transition-colors">
                      <Icon className="size-6 text-[#C5963A]" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-white mb-2">{title}</h4>
                    <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Highlight callout */}
          <ScrollReveal delay={200}>
            <div className="max-w-3xl mx-auto">
              <div className="relative rounded-xl p-5 md:p-6 border border-[#C5963A]/20 bg-gradient-to-r from-[#C5963A]/[0.06] to-transparent">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#C5963A]/15 border border-[#C5963A]/25 flex items-center justify-center">
                    <Crown className="size-5 text-[#C5963A]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">The GFP Compound Effect</h4>
                    <p className="text-xs text-white/45 leading-relaxed">
                      Most agents have <strong className="text-white/60">one</strong> income stream — commissions. At GFP, you earn from personal production, override commissions 7 levels deep, AI-driven recruiting, marketing revenue, <em>and</em> affiliate income across our entire ecosystem of products and portals. Every stream compounds. That's how empires are built.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider mx-auto max-w-4xl" />

      {/* ═══════════════════════════════════════════════════════════
           THE ARSENAL — Feature Grid
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#C5963A]/[0.03] to-transparent rounded-full translate-x-1/4 -translate-y-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-2">Your Complete Producer Arsenal</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                Everything You Need to <span className="text-gold-gradient">Dominate</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto mt-3 text-sm">
                From AI-powered lead generation to branded marketing assets — we didn't just build a brokerage, we built a machine.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              { icon: Target, title: "Lead Vending on Demand", desc: "Purchase fresh, exclusive leads whenever you want — delivered straight to your AI-powered CRM. No waiting, no sharing, no limits.", tag: "LEADS" },
              { icon: Bot, title: "AI Recruiting Engine", desc: "Our AI doesn't just sell — it finds, qualifies, and enrolls new producers into your downline while you sleep. Build a team on autopilot.", tag: "AI RECRUIT" },
              { icon: Layers, title: "7 Levels of Overrides", desc: "Earn override commissions 7 levels deep. Every producer in your organization generates income for you — that's generational wealth.", tag: "OVERRIDES" },
              { icon: DollarSign, title: "Marketing Commissions", desc: "Earn commissions on every marketing service, branded asset, and campaign purchased through the platform. More products = more income.", tag: "REVENUE" },
              { icon: Share2, title: "Affiliate Earnings", desc: "Earn affiliate commissions on everything GFP offers — portals, education, events, and more. If we sell it, you earn on it.", tag: "AFFILIATE" },
              { icon: LayoutDashboard, title: "NexSuite™ AI CRM", desc: "Not a whitelabel — a $50M custom-built CRM and AI system. Automated follow-ups, AI dialer, lead scoring, and nurture sequences built from scratch.", tag: "CUSTOM BUILT" },
              { icon: BookOpen, title: "Training Academy", desc: "On-demand video courses, certifications, and sales playbooks built by top producers. Get licensed faster and close bigger.", tag: "EDUCATION" },
              { icon: Megaphone, title: "Brand & Marketing", desc: "Done-for-you social content, branded collateral, email campaigns, and marketing assets — professionally designed and ready to deploy.", tag: "DFY CONTENT" },
              { icon: Rocket, title: "Portal & Client Tracking", desc: "Your own branded portal experience. Track every client, every policy, every milestone. Your entire book of business, managed for you.", tag: "YOUR PORTAL" },
            ].map(({ icon: Icon, title, desc, tag }, i) => (
              <ScrollReveal key={title} delay={i * 60}>
                <div className="glass-card rounded-xl p-6 h-full group hover:border-[#C5963A]/30 transition-all duration-500 relative overflow-hidden">
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           $50M CUSTOM-BUILT — Anti-whitelabel callout
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto relative">
              <div className="rounded-2xl p-8 md:p-10 border border-[#C5963A]/25 bg-gradient-to-br from-[#C5963A]/[0.08] via-[#0F2240]/80 to-[#0A1628] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C5963A]/[0.06] to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#1a3a6b]/20 to-transparent rounded-tr-full" />
                <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#C5963A]/15 border border-[#C5963A]/30 flex items-center justify-center">
                        <Shield className="size-6 text-[#C5963A]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#C5963A]/70 tracking-widest uppercase">Custom Built From Scratch</p>
                        <h3 className="text-lg font-serif font-bold text-white">This Is Not a Whitelabel.</h3>
                      </div>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
                      We didn't slap a logo on someone else's software and call it ours. We invested <strong className="text-white/80">$50 million</strong> to custom-build NexSuite™ — a proprietary CRM and AI system engineered from the ground up for insurance producers. Every feature, every automation, every algorithm is built to help you outwork, out-produce, and outscale any competitor in the market.
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="text-5xl md:text-6xl font-serif font-bold text-[#C5963A] leading-none">$50M</div>
                    <p className="text-xs text-white/30 mt-1">invested in our<br />proprietary technology</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           COMPARISON — Traditional vs GFP
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5963A]/[0.03] to-transparent" />
                <div className="relative">
                  <div className="text-center mb-10">
                    <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-2">The GFP Advantage</p>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                      Other Agencies vs. <span className="text-gold-gradient">Garner Financial Partners</span>
                    </h2>
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
                        "Buy your own leads — $20-$50 each",
                        "Manual dialing and follow-up",
                        "No CRM or outdated spreadsheets",
                        "Generic training, if any",
                        "No marketing support or branding",
                        "Whitelabeled software with no real tech",
                        "Signed up, handed a contract, left in the dust",
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
                        "Lead vending — fresh leads on demand",
                        "AI recruits, dials, qualifies & books for you",
                        "7 levels of override commissions",
                        "Marketing & affiliate commissions on everything",
                        "$50M custom-built NexSuite™ CRM & AI system",
                        "Done-for-you brand, social & marketing assets",
                        "Training, tools, platforms & full infrastructure",
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           YOU'RE NEVER ALONE — Support & Infrastructure
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#1a3a6b]/15 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#C5963A]/[0.04] to-transparent rounded-full -translate-y-1/4 translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-2">You're Never Alone</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                We Don't Leave Producers in the Dust.{" "}
                <span className="text-gold-gradient">Ever.</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-sm">
                Most agencies hand you a contract and disappear. We built the training, resources, tools, platforms, and infrastructure to help you build a <strong className="text-white/60">nine-figure insurance agency</strong> — and we walk beside you every step of the way.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
            {[
              {
                icon: BookOpen,
                title: "World-Class Training",
                items: ["On-demand video courses", "Live coaching calls", "Sales scripts & playbooks", "Certification programs"],
              },
              {
                icon: LayoutDashboard,
                title: "Elite Technology",
                items: ["AI-powered NexSuite™ CRM", "Automated lead follow-up", "AI dialer & recruiting bot", "Real-time analytics dashboard"],
              },
              {
                icon: Megaphone,
                title: "Done-for-You Marketing",
                items: ["Branded social content", "Email & SMS campaigns", "Professional collateral", "Custom landing pages"],
              },
              {
                icon: Users,
                title: "Community & Support",
                items: ["Dedicated mentor assigned", "Private producer community", "Weekly strategy sessions", "24/7 team support channel"],
              },
            ].map(({ icon: Icon, title, items }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className="glass-card rounded-xl p-6 h-full group hover:border-[#C5963A]/30 transition-all duration-500">
                  <div className="w-11 h-11 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mb-4 group-hover:bg-[#C5963A]/20 transition-colors">
                    <Icon className="size-5 text-[#C5963A]" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white mb-3">{title}</h4>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-white/40">
                        <CheckCircle2 className="size-3 text-[#C5963A]/60 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Stock Options Callout */}
          <ScrollReveal delay={200}>
            <div className="max-w-3xl mx-auto">
              <div className="relative rounded-xl p-5 md:p-6 border border-[#C5963A]/25 bg-gradient-to-r from-[#C5963A]/[0.08] via-[#C5963A]/[0.04] to-transparent overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C5963A]/[0.06] to-transparent rounded-bl-full" />
                <div className="flex items-start gap-4 relative">
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-[#C5963A]/15 border border-[#C5963A]/30 flex items-center justify-center">
                    <TrendingUp className="size-5 text-[#C5963A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">Stock Options</h4>
                      <span className="text-[9px] font-bold text-[#C5963A] tracking-wider bg-[#C5963A]/10 border border-[#C5963A]/20 px-2 py-0.5 rounded-full">COMING SOON</span>
                    </div>
                    <p className="text-xs text-white/45 leading-relaxed">
                      We're building a nine-figure insurance agency — and we want our top producers to own a piece of it. Stock options are coming soon, giving you <strong className="text-white/60">real equity</strong> in the company you're helping build. This isn't just a paycheck. It's ownership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider mx-auto max-w-4xl" />

      {/* ═══════════════════════════════════════════════════════════
           HOW IT WORKS — 3 Steps
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C5963A] text-sm font-medium tracking-widest uppercase mb-2">Simple Process</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                Three Steps to <span className="text-gold-gradient">Getting Started</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: CheckCircle2,
                title: "Apply Right Here",
                desc: "Fill out the form above. No fees, no obligations. We'll review your application and reach out within 24 hours.",
              },
              {
                step: "02",
                icon: TrendingUp,
                title: "Onboard & Train",
                desc: "Get your welcome leads, set up NexSuite™ CRM, access the training academy, and let AI start working your pipeline.",
              },
              {
                step: "03",
                icon: Rocket,
                title: "Start Closing",
                desc: "Focus on what you do best — closing deals. AI handles prospecting, follow-ups, and scheduling. You build your empire.",
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="text-center relative">
                  {/* Connector line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#C5963A]/20 to-transparent" />
                  )}
                  <div className="relative mx-auto mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mx-auto">
                      <Icon className="size-7 text-[#C5963A]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#C5963A] flex items-center justify-center text-[11px] font-bold text-white">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FINAL CTA
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="glass-card rounded-2xl p-10 md:p-14 relative overflow-hidden gold-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5963A]/[0.06] via-transparent to-[#1a3a6b]/[0.06]" />
                <div className="relative">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                    The Industry Is Evolving.{" "}
                    <span className="text-gold-gradient">Are You?</span>
                  </h2>
                  <p className="text-white/40 text-base mb-8 leading-relaxed max-w-xl mx-auto">
                    Every day without AI-powered tools is a day your competitors get further ahead.
                    Stop grinding. Start building. Apply to join the team that's rewriting the playbook for insurance producers.
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg relative"
                  >
                    <span>Apply Now — Join Our Team</span>
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 rounded-xl animate-pulse-gold pointer-events-none" />
                  </button>
                  <p className="text-xs text-white/25 mt-4">Free to apply · No fees or obligations · Limited spots available</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
