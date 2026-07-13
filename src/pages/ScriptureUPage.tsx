import { SEO, courseSchema } from "../components/SEO";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Heart,
  Lock,
  Palette,
  Play,
  Shield,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Features ─── */
const features = [
  { name: "Children's Bible Videos", icon: Play, value: "Included", desc: "Animated stories from the Old and New Testament that bring Scripture to life in a way kids can understand and love." },
  { name: "Bible Storybooks", icon: BookOpen, value: "Included", desc: "Beautifully illustrated storybooks that walk children through the greatest stories ever told — from Genesis to Revelation." },
  { name: "Coloring Books", icon: Palette, value: "Included", desc: "Fun, faith-filled coloring activities featuring biblical characters and scenes. Perfect for hands-on learning at home or church." },
  { name: "Scripture Figures™ Collection", icon: Trophy, value: "Coming Soon", desc: "Beautiful collectible figurines of beloved biblical characters — Moses, David, Esther, Jesus, and more. Bring the Bible off the page and into your child's hands." },
  { name: "Estate Document Center", icon: FileText, value: "$5,000", desc: "Living trust, will, power of attorney — protect your family's legacy with proper legal documents so your fortress stands for generations." },
  { name: "Financial Fortress Tools", icon: Shield, value: "$2,000", desc: "Credit monitoring, identity protection, and financial tools to help your family build an unshakable financial fortress." },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is Christian U™?",
    a: "Christian U™ is a free platform that brings the Bible to life for children through animated videos, storybooks, coloring books, and Scripture Figures™ collectibles. It also helps faith-based families build their financial fortress with estate planning tools and asset protection.",
  },
  {
    q: "Is it really free?",
    a: "Yes — creating an account and accessing children's Bible content is 100% free. We offer an optional Pro upgrade ($75/mo) that unlocks premium tools like the full estate document center, credit repair, identity protection, and professional services.",
  },
  {
    q: "What ages is this for?",
    a: "Our children's Bible content is designed for kids of all ages — from toddlers who love coloring books to older children who enjoy the animated videos and storybooks. Parents and grandparents love it too!",
  },
  {
    q: "What are Scripture Figures™?",
    a: "Scripture Figures™ are beautiful collectible figurines of beloved biblical characters like Moses, David, Esther, and Jesus. The store is coming soon — sign up to be the first to know when they launch.",
  },
  {
    q: "What denomination is this for?",
    a: "Christian U™ is for all Christian families regardless of denomination. Our content focuses on the timeless stories and characters of the Old and New Testaments.",
  },
  {
    q: "How does the Financial Fortress part work?",
    a: "Beyond bringing Scripture to life for kids, we help families build a financial fortress with estate planning, asset protection, and wealth-building tools — all on the same platform. Upgrade to Pro anytime from your dashboard.",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "66", label: "Books of the Bible" },
  { number: "100+", label: "Bible Stories" },
  { number: "12+", label: "Scripture Figures" },
  { number: "FREE", label: "To Get Started" },
];

export function ScriptureUPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Scripture U\u2122 | Faith-Based Financial Education & Biblical Wealth Building"
        description="Faith. Family. Financial Wisdom. Scripture U combines biblical principles with modern financial education to help Christians build wealth and create generational legacies. Free signup."
        keywords={["faith based financial education", "biblical wealth building", "christian financial planning", "biblical money management", "christian financial education", "faith based investing", "biblical stewardship education", "christian wealth building", "faith and finance", "christian financial freedom"]}
        canonicalUrl="https://garnerfinancialpartners.com/scripture-u"
        structuredData={courseSchema("Scripture U", "Faith-based financial education combining biblical principles with modern wealth building strategies.", "https://garnerfinancialpartners.com/scripture-u")}
      />
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#2563EB]/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#2563EB]/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-8">
              <BookOpen className="size-4 text-[#2563EB]" />
              <span className="text-xs font-semibold text-[#2563EB] tracking-wider uppercase">Christian U™</span>
            </div>

            <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              Bringing Scripture{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#2563EB]/70 bg-clip-text text-transparent">to Life for Kids</span>
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
              Children's Bible videos, storybooks, coloring books, and Scripture Figures™ that bring the Old and New Testaments to life — plus financial fortress tools to protect your family's legacy.
            </p>

            <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://christian.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#2563EB]/30 text-lg flex items-center gap-3"
              >
                <span>Create Free Account</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-sm text-white/30">100% Free · No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ STATS BAR ═══ */}
      <section className="py-12 bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ number, label }) => (
              <ScrollReveal key={label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#2563EB] mb-1">{number}</div>
                  <div className="text-sm text-white/40">{label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ PROBLEM ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Kids Are Growing Up Without Knowing <span class="text-red-400">the Greatest Stories Ever Told</span>` }} />
              <p className="text-white/40 leading-relaxed">
                In a world of screens and distractions, children are missing out on the foundational stories of faith that have shaped families for thousands of years.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Scripture Feels Distant", desc: "For many kids, the Bible feels like an old, hard-to-understand book. Without engaging, visual content, children never connect with the stories that matter most.", icon: BookOpen },
              { title: "No Family Financial Plan", desc: "Most faith-based families don't have a trust, a will, or a financial fortress in place — leaving their legacy unprotected and vulnerable.", icon: FileText },
              { title: "Lack of Faith-Based Resources", desc: "Finding quality, faith-based children's content that's also tied to real-world family stewardship is nearly impossible — until now.", icon: Heart },
            ].map(({ title, desc, icon: Icon }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 border-red-500/10 hover:border-red-500/20 text-center">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="size-7 text-red-400" />
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

      {/* ═══ SOLUTION ═══ */}
      <section className="py-24 bg-[#070F1D]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-6">
                <Sparkles className="size-4 text-[#2563EB]" />
                <span className="text-xs font-medium text-[#2563EB] uppercase tracking-wider">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Christian U™ Makes the Bible <span class="text-gold-gradient">Come Alive</span>` }} />
              <p className="text-white/40 leading-relaxed">
                Animated videos, illustrated storybooks, hands-on coloring books, and collectible Scripture Figures™ — everything your family needs to bring the Old and New Testaments to life.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Your Free Account", desc: "Sign up and get instant access to children's Bible videos, storybooks, coloring books, and the Scripture Figures™ store." },
              { step: "02", title: "Explore Scripture Together", desc: "Watch animated Bible stories, color biblical characters, and read through the greatest stories from Genesis to Revelation as a family." },
              { step: "03", title: "Build Your Family Fortress", desc: "Set up your financial fortress with estate documents, asset protection, and legacy planning — all on the same platform your kids love." },
            ].map(({ step, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="size-7 text-[#2563EB]" />
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

      {/* ═══ FEATURE STACK ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Everything Inside <span className="bg-gradient-to-r from-[#2563EB] to-[#2563EB]/70 bg-clip-text text-transparent">Christian U™</span>
              </h2>
              <p className="text-white/40 leading-relaxed">
                Bible content for the kids, financial fortress tools for the family. All in one place — and it starts completely free.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {features.map(({ name, icon: Icon, value, desc }, i) => (
              <ScrollReveal key={name} delay={i * 40}>
                <div className="glass-card rounded-xl p-5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="size-5 text-[#2563EB]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-semibold text-white">{name}</h4>
                      <span className="text-sm font-bold text-white/50 whitespace-nowrap">{value}</span>
                    </div>
                    <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-[#2563EB]/60 flex-shrink-0 mt-1" />
                </div>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal delay={features.length * 40 + 100}>
              <div className="mt-8 rounded-2xl border-2 border-[#2563EB]/30 bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 p-8 text-center">
                <p className="text-sm text-white/50 uppercase tracking-wider mb-2">All of this is</p>
                <p className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#2563EB] to-[#2563EB]/70 bg-clip-text text-transparent mb-3">FREE</p>
                <p className="text-sm text-white/40 mb-6">Bring Scripture to life for your kids today. Upgrade to Pro ($75/mo) anytime for premium family fortress tools.</p>
                <a
                  href="https://christian.garnerfinancialpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-12 py-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#2563EB]/30 text-lg"
                >
                  Get Started Free
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Families Love <span className="bg-gradient-to-r from-[#2563EB] to-[#2563EB]/70 bg-clip-text text-transparent">Christian U™</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Rebecca M.", location: "Scottsdale, AZ", text: "My kids are obsessed with the Bible videos. They ask to watch them every night before bed. It's amazing to see them excited about Scripture.", stars: 5 },
              { name: "Pastor David L.", location: "Phoenix, AZ", text: "We use Christian U in our children's ministry. The coloring books and storybooks make Bible stories come alive for kids of every age.", stars: 5 },
              { name: "The Hernandez Family", location: "Mesa, AZ", text: "Our kids love the Scripture Figures and the videos. And the financial tools helped us finally get our trust and estate plan set up. It's everything in one place.", stars: 5 },
            ].map(({ name, location, text, stars }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 text-[#2563EB] fill-[#2563EB]" />
                    ))}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 italic">"{text}"</p>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-xs text-white/30">{location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ FAQ ═══ */}
      <section className="py-24 bg-[#070F1D]/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Frequently Asked <span className="bg-gradient-to-r from-[#2563EB] to-[#2563EB]/70 bg-clip-text text-transparent">Questions</span>
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
                      <ChevronUp className="size-5 text-[#2563EB] flex-shrink-0" />
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
      <section className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0A1628] to-[#070F1D]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563EB]/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: `Bring the Bible to Life for <span class="text-gold-gradient">Your Family</span>` }} />
              <p className="text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                Children's videos, storybooks, coloring books, and Scripture Figures™ — plus the financial fortress tools to protect your family for generations.
              </p>
              <a
                href="https://christian.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#2563EB]/30 text-lg"
              >
                Create Free Account
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30">
                <span className="flex items-center gap-1.5"><Lock className="size-3" /> Secure Platform</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3" /> 100% Free</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3" /> Instant Access</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
