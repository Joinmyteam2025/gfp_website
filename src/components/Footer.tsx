import { Link } from "react-router-dom";
import { Shield, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#070F1D] border-t border-[#C5963A]/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="size-8 text-[#C5963A]" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                  GARNER
                </h3>
                <p className="text-[8px] text-[#C5963A]/60 tracking-[0.2em] uppercase">
                  Financial Partners
                </p>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Financial education, strategic vision, and implementation tools - empowering you to go from contributor to controller.
            </p>
            <div className="space-y-3">
              <a href="tel:+15204626447" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#C5963A] transition-colors">
                <Phone className="size-4" />
                (520) 462-6447
              </a>
              <a href="mailto:contact@garnerfinancialpartners.com" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#C5963A] transition-colors">
                <Mail className="size-4" />
                contact@garnerfinancialpartners.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Team", to: "/team" },
                { label: "Calculators", to: "/calculators" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-white/40 hover:text-[#C5963A] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Programs</h4>
            <ul className="space-y-3">
              {[
                { label: "Athlete U™", to: "/athlete-u" },
                { label: "Business U™", href: "https://business.garnerfinancialpartners.com/" },
                { label: "Christian U™", to: "/scripture-u" },
                { label: "Real Estate U™", href: "https://realestate.garnerfinancialpartners.com/" },
                { label: "Social Media U™", to: "/social-media-u" },
                { label: "Veterans U™", to: "/veterans-u" },
                { label: "Wealth U™", href: "https://wealth.garnerfinancialpartners.com/" },
              ].map(({ label, to, href }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-[#C5963A] transition-colors">
                      {label}
                    </a>
                  ) : (
                    <Link to={to!} className="text-sm text-white/40 hover:text-[#C5963A] transition-colors">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href="https://agent.garnerfinancialpartners.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-[#C5963A] transition-colors"
                >
                  Join Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Get Started</h4>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              Ready to secure your financial future? Book a free blueprint call today.
            </p>
            <button type="button"
              onClick={() => { (window as any).openVapiWidget?.(); }}
              className="inline-block px-6 py-3 bg-[#C5963A] hover:bg-[#9E7730] text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#C5963A]/20"
            >
              Speak to Us
            </button>
            <div className="mt-6 flex gap-3">
              <a
                href="https://portal.garnerfinancialpartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs text-white/40 border border-white/10 rounded-lg hover:border-[#C5963A]/30 hover:text-white/60 transition-all"
              >
                Client Login
              </a>
              <a
                href="https://agent.garnerfinancialpartners.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs text-white/40 border border-white/10 rounded-lg hover:border-[#C5963A]/30 hover:text-white/60 transition-all"
              >
                Team Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <p className="text-[11px] text-white/25 leading-relaxed text-center max-w-5xl mx-auto">
            Information provided is educational in nature and is not legal or financial advice. Your use of this site is subject to our{" "}
            <Link to="/terms" className="text-white/35 hover:text-[#C5963A] underline underline-offset-2">Terms of Use</Link>,{" "}
            <Link to="/privacy" className="text-white/35 hover:text-[#C5963A] underline underline-offset-2">Privacy Policy</Link>, and{" "}
            <Link to="/refund-policy" className="text-white/35 hover:text-[#C5963A] underline underline-offset-2">Refund Policy</Link>.
            {" "}Garner Financial Partners is not a law firm, licensed financial institution, registered investment advisor, broker-dealer, or insurance company, and cannot provide legal or financial advice. We provide information, educational software, and tools. You are responsible for appropriately using this material and consulting licensed professionals for personalized guidance. Family Fortress Program™, Business Fortress Program™, and Military Fortress Program™ are trademarks of Garner Financial Partners. By using this website or any related materials you agree to take full responsibility for your own results, or lack thereof. Our team is here to support you, but you should always do your own due diligence before making any type of purchase or financial decision. Our tools are for informational purposes only and do not constitute financial advice. Results are hypothetical and do not account for changes in market conditions or personal circumstances. Investing comes with inherent risks and you should always invest within your means and risk tolerance. Past performance is not an indication of future returns and you should always consult an independently licensed financial professional prior to making investment decisions. Garner Financial Partners is not registered with the SEC or FINRA and does not provide securities or investment advisory services. Insurance products, where applicable, are offered through independently licensed insurance producers.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              All Rights Reserved | Copyright © {new Date().getFullYear()} Garner Financial Partners
            </p>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <Link to="/privacy" className="text-xs text-white/30 hover:text-[#C5963A] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-white/30 hover:text-[#C5963A] transition-colors">
                Terms of Use
              </Link>
              <Link to="/refund-policy" className="text-xs text-white/30 hover:text-[#C5963A] transition-colors">
                Refund Policy
              </Link>
              <Link to="/anti-discrimination" className="text-xs text-white/30 hover:text-[#C5963A] transition-colors">
                Anti-Discrimination
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
