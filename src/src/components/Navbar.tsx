import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, ChevronDown, LogIn, Phone } from "lucide-react";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Team", href: "/team" },
  { label: "Calculators", href: "/calculators" },
];

const portalItems = [
  { name: "Athlete U™", desc: "NIL deals & financial literacy for athletes", infoHref: "/athlete-u", loginHref: "https://athlete.garnerfinancialpartners.com/", color: "#DC2626" },
  { name: "Business U™", desc: "Business continuity & succession planning", infoHref: "/business-u", loginHref: "https://business.garnerfinancialpartners.com/", color: "#C5963A" },
  { name: "Christian U™", desc: "Faith-based financial education & Scripture Figures", infoHref: "/scripture-u", loginHref: "https://christian.garnerfinancialpartners.com/", color: "#2563EB" },
  { name: "Real Estate U™", desc: "Real estate investing & portfolio building", infoHref: "/realestate-u", loginHref: "https://realestate.garnerfinancialpartners.com/", color: "#0D9488" },
  { name: "Social Media U™", desc: "Monetize your brand & social media deals", infoHref: "/social-media-u", loginHref: "https://social.garnerfinancialpartners.com/", color: "#7C3AED" },
  { name: "Veterans U™", desc: "Financial readiness for service members & veterans", infoHref: "/veterans-u", loginHref: "https://veterans.garnerfinancialpartners.com/", color: "#8B9A46" },
  { name: "Wealth U™", desc: "Comprehensive wealth-building education", infoHref: "/wealth-u", loginHref: "https://wealth.garnerfinancialpartners.com/", color: "#16A34A" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobilePortalsOpen, setMobilePortalsOpen] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
    setMobilePortalsOpen(false);
    setMobileLoginOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileOpen]);

  // Hide the Vapi widget bubble when mobile nav is open
  useEffect(() => {
    const widget = document.querySelector("vapi-widget") as HTMLElement | null;
    if (widget) {
      widget.style.display = isMobileOpen ? "none" : "";
    }
  }, [isMobileOpen]);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setMobilePortalsOpen(false);
    setMobileLoginOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMobileOpen
          ? "bottom-0 bg-[#0A1628] flex flex-col"
          : ""
      } ${
        isScrolled || isMobileOpen
          ? "bg-[#0A1628]/95 backdrop-blur-xl border-b border-[#C5963A]/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className={`container mx-auto px-4 lg:px-8 ${isMobileOpen ? "flex flex-col flex-1 min-h-0" : ""}`}>
        <div className="flex items-center justify-between h-20 shrink-0">
          {/* Logo */}
          <Link to="/" onClick={closeMobile} className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="size-9 text-[#C5963A] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-[#C5963A]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h1 className="text-lg font-serif font-bold text-white tracking-wide leading-tight">
                GARNER
              </h1>
              <p className="text-[9px] text-[#C5963A]/70 tracking-[0.2em] uppercase font-medium -mt-0.5">
                Financial Partners
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === item.href
                    ? "text-[#C5963A]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Portals Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("portals")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                  openDropdown === "portals"
                    ? "text-[#C5963A]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                Portals
                <ChevronDown className={`size-3 opacity-50 transition-transform ${openDropdown === "portals" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "portals" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[320px]">
                  <div className="bg-[#0F2240]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
                    {portalItems.map((portal) => (
                      <a
                        key={portal.name}
                        href={portal.infoHref}
                        {...(portal.infoHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-start gap-3 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                      >
                        <div className="mt-0.5 size-2 rounded-full shrink-0" style={{ backgroundColor: portal.color }} />
                        <div>
                          <span className="block font-medium text-white/80 group-hover:text-white">{portal.name}</span>
                          <span className="block text-[11px] text-white/40 mt-0.5">{portal.desc}</span>
                        </div>
                        <span className="ml-auto text-[10px] text-[#C5963A]/60 font-medium tracking-wider self-center shrink-0">FREE</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-white/10 mx-2" />

            {/* Login Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("login")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <LogIn className="size-3.5" />
                Login
                <ChevronDown className="size-3 opacity-50" />
              </button>

              {openDropdown === "login" && (
                <div className="absolute top-full right-0 pt-2 min-w-[230px]">
                  <div className="bg-[#0F2240]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
                    {portalItems.map((portal) => (
                      <a
                        key={portal.name}
                        href={portal.loginHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <span>{portal.name}</span>
                        <span className="text-[10px] text-[#C5963A]/60 font-medium tracking-wider">FREE</span>
                      </a>
                    ))}
                    <div className="my-1 border-t border-white/5" />
                    <a
                      href="https://garneraffiliates.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span>Affiliate Login</span>
                    </a>
                    <a
                      href="https://portal.garnerfinancialpartners.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span>Client Login</span>
                    </a>
                    <a
                      href="https://agent.garnerfinancialpartners.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span>Team Login</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="tel:+15204626447"
              className="hidden xl:flex items-center gap-1.5 text-sm text-white/60 hover:text-[#C5963A] transition-colors font-medium"
            >
              <Phone className="size-3.5" />
              (520) 462-6447
            </a>

            <button type="button"
              onClick={() => { (window as any).openVapiWidget?.(); }}
              className="ml-2 px-6 py-2.5 bg-[#C5963A] hover:bg-[#9E7730] text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#C5963A]/20"
            >
              Speak to Us
            </button>
          </div>

          {/* Mobile: Speak to Us + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {!isMobileOpen && (
              <button
                type="button"
                onClick={() => { (window as any).openVapiWidget?.(); }}
                className="px-4 py-2 bg-[#C5963A] hover:bg-[#9E7730] text-white text-xs font-semibold rounded-lg transition-all duration-300"
              >
                Speak to Us
              </button>
            )}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav — single scroll container, no nested overflow */}
        {isMobileOpen && (
          <div
            ref={scrollRef}
            className="lg:hidden border-t border-white/10 flex-1 flex flex-col min-h-0"
          >
            <div
              className="flex-1 overflow-y-auto overscroll-contain pb-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Nav Links */}
              <div className="py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={closeMobile}
                    className="block px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/5 font-medium transition-colors active:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Portals Accordion */}
                <button
                  type="button"
                  onClick={() => setMobilePortalsOpen(!mobilePortalsOpen)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/5 font-medium transition-colors active:bg-white/10"
                >
                  <span>Portals</span>
                  <ChevronDown className={`size-4 text-white/40 transition-transform duration-200 ${mobilePortalsOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    mobilePortalsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-2 space-y-1">
                    {portalItems.map((portal) => (
                      <a
                        key={portal.name}
                        href={portal.infoHref}
                        onClick={closeMobile}
                        {...(portal.infoHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-3 py-2.5 px-4 text-sm text-white/60 rounded-lg hover:bg-white/5 hover:text-white transition-colors active:bg-white/10"
                      >
                        <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: portal.color }} />
                        <span className="flex-1">{portal.name}</span>
                        <span className="text-[9px] text-[#C5963A]/50 font-medium tracking-wider">FREE</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Login Accordion */}
                <button
                  type="button"
                  onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/5 font-medium transition-colors active:bg-white/10"
                >
                  <span className="flex items-center gap-2">
                    <LogIn className="size-4 text-white/40" />
                    Login
                  </span>
                  <ChevronDown className={`size-4 text-white/40 transition-transform duration-200 ${mobileLoginOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileLoginOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-2 space-y-1">
                    {portalItems.map((portal) => (
                      <a
                        key={portal.name}
                        href={portal.loginHref}
                        onClick={closeMobile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-2.5 px-4 text-sm text-white/60 rounded-lg hover:bg-white/5 hover:text-white transition-colors active:bg-white/10"
                      >
                        <span>{portal.name}</span>
                        <span className="text-[9px] text-[#C5963A]/50 font-medium tracking-wider">FREE</span>
                      </a>
                    ))}
                    <div className="my-1 border-t border-white/5" />
                    {[
                      { name: "Affiliate Login", url: "https://garneraffiliates.com/" },
                      { name: "Client Login", url: "https://portal.garnerfinancialpartners.com/" },
                      { name: "Team Login", url: "https://agent.garnerfinancialpartners.com/" },
                    ].map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        onClick={closeMobile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center py-2.5 px-4 text-sm text-white/60 rounded-lg hover:bg-white/5 hover:text-white transition-colors active:bg-white/10"
                      >
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky CTA at bottom */}
            <div className="shrink-0 px-4 py-4 border-t border-white/10 bg-[#0A1628]">
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  setTimeout(() => { (window as any).openVapiWidget?.(); }, 200);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#C5963A] to-[#D4A94E] hover:from-[#9E7730] hover:to-[#C5963A] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#C5963A]/20 flex items-center justify-center text-base active:scale-[0.98]"
              >
                Speak to Us
              </button>
              <a href="tel:+15204626447" className="flex items-center justify-center gap-2 mt-3 text-sm text-white/50 hover:text-[#C5963A] transition-colors">
                <Phone className="size-3.5" />
                (520) 462-6447
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
