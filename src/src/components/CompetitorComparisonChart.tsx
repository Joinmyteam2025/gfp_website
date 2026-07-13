import { useState, useEffect, useRef } from "react";

export function CompetitorComparisonChart() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80 dark:from-gray-900/50 dark:via-gray-950 dark:to-gray-900/50" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="relative container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6"
               style={{ background: "#FEF8EC", color: "#92710E" }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            REPLACES 12 SEPARATE TOOLS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Replace Your Entire Marketing Stack
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            One platform replaces 12 separate tools — and saves you over $12,000 a year.
          </p>
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#C5963A" }}>12</div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Tools Replaced</div>
          </div>
          <div className="text-center p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-green-500">$12,204/yr</div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Saved Per Year</div>
          </div>
          <div className="text-center p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">$197/mo</div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">All-In Pricing</div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-white/10" style={{ background: `linear-gradient(135deg, #C5963A08, #C5963A15)` }}>
              <div className="grid grid-cols-4 items-center">
                <div className="text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase">Features</div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 text-center tracking-wide uppercase">Replaces</div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 text-center tracking-wide uppercase">Other Tools</div>
                <div className="text-center">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg"
                        style={{ background: "#C5963A", boxShadow: "0 4px 14px rgba(197,150,58,0.15)" }}>
                    NexSuite.co
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile: Card-style layout */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-white/5">

            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "0ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">CRM & Pipeline</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">HubSpot</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Salesforce</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$99/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "50ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">Sales Funnels</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">ClickFunnels</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Leadpages</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$297/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "100ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">Email Marketing</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Mailchimp</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">ConvertKit</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$99/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "150ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">AI Content Writer</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Jasper</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Copy.ai</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$49/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "200ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">Social Media Mgmt</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Hootsuite</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Buffer</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$99/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "250ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">SEO Tools</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">SEMrush</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Ahrefs</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$129/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "300ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">Marketing Automation</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Keap</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">ActiveCampaign</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$169/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "350ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">AI Chatbot</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Drift</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Intercom</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$99/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "400ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">Workflow Automation</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Zapier</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Make</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$49/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "450ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">Scheduling & Booking</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Calendly</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Acuity</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$29/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "500ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">Document Signing</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">DocuSign</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">PandaDoc</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$47/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
            <tr className="group border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors duration-200"
                style={{ animationDelay: "550ms" }}>
              <td className="py-4 px-6 font-medium text-gray-900 dark:text-white text-sm">Analytics & Reports</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Mixpanel</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">Amplitude</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">$49/mo</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#C5963A" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Included
                </span>
              </td>
            </tr>
                </tbody>
              </table>
            </div>

            {/* Total Row */}
            <div className="border-t-2 border-gray-200 dark:border-white/10 px-6 py-5" style={{ background: `linear-gradient(135deg, #C5963A05, #C5963A12)` }}>
              <div className="grid grid-cols-4 items-center">
                <div className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wide">Overall Price</div>
                <div />
                <div className="text-center">
                  <span className="text-xl font-extrabold text-red-500 dark:text-red-400">$1,214/mo</span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-lg font-extrabold text-white shadow-lg"
                        style={{ background: "#C5963A", boxShadow: "0 4px 20px rgba(197,150,58,0.15)" }}>
                    $197/mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href="/join"
             className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
             style={{ background: "#C5963A", boxShadow: "0 8px 30px rgba(197,150,58,0.15)" }}>
            Start Your Free Trial
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <p className="text-sm text-gray-400 mt-4">Save <span className="font-semibold text-green-500">$12,204/yr</span> compared to buying separately</p>
        </div>
      </div>
    </section>
  );
}
