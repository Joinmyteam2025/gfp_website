const SITE = "https://garnerfinancialpartners.com";

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
}

function pub(path: string, title: string, description: string): RouteMeta {
  const canonical = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  return { title, description, canonical };
}

function priv(path: string, title: string, description: string): RouteMeta {
  return { ...pub(path, title, description), noindex: true };
}

const BUNDLE_META: Record<string, RouteMeta> = {
  "/bundle1": pub(
    "/bundle1",
    "Free Access — Athlete Fortress Program (AFP) + Athlete U™",
    "Get the Athlete Fortress Program (AFP) playbook and a free Athlete U™ account. No card. Protect NIL income, contracts, and endorsements with education you can use immediately.",
  ),
  "/bundle2": pub(
    "/bundle2",
    "Free Access — Business Owner's Wealth Playbook + Business U™",
    "Download the Business Owner's Wealth Playbook and open a free Business U™ account. Learn how to structure, protect, and keep what your company produces.",
  ),
  "/bundle3": pub(
    "/bundle3",
    "Free Access — Faithful Steward's Playbook + Christian U™",
    "Get the Faithful Steward's Playbook and a free Christian U™ account. Practical, faith-aligned education for giving, protecting, and building household wealth.",
  ),
  "/bundle4": pub(
    "/bundle4",
    "Free Access — Real Estate Financial Fortress + Real Estate U™",
    "Claim the Real Estate Financial Fortress guide and a free Real Estate U™ account. Education on entities, insurance, taxes, and portfolio structure for investors.",
  ),
  "/bundle5": pub(
    "/bundle5",
    "Free Access — Creator's Cashflow Structure + Social Media U™",
    "Get the Creator's Cashflow Structure guide and a free Social Media U™ account. Learn how to turn audience income into a business you actually own.",
  ),
  "/bundle6": pub(
    "/bundle6",
    "Free Access — Veteran's Wealth Playbook + Veterans U™",
    "Download the Veteran's Wealth Playbook and open a free Veterans U™ account. Education for the move from military service to a protected financial plan.",
  ),
  "/bundle7": pub(
    "/bundle7",
    "Free Access — Win The Game of Money + Wealth U™",
    "Get Win The Game of Money and a free Wealth U™ account. A plain-language path from contributing a paycheck to controlling how wealth is built and kept.",
  ),
};

const EBOOK_META: Record<string, RouteMeta> = {
  "/ebook1": pub(
    "/ebook1",
    "Athlete Fortress Program (AFP) Playbook | Free Guide",
    "Free Athlete Fortress Program (AFP) playbook for athletes and families. A short-earning-window guide to keeping NIL, contract, and endorsement income.",
  ),
  "/ebook2": pub(
    "/ebook2",
    "Business Owner's Wealth Playbook | Free Guide",
    "Free Business Owner's Wealth Playbook from Garner Financial Partners. Education on separating yourself from the business and keeping more of what it earns.",
  ),
  "/ebook3": pub(
    "/ebook3",
    "Contributor to Controller | Free Guide",
    "Free Contributor to Controller guide. Learn the education path from earning a paycheck to directing how money is protected, taxed, and passed on.",
  ),
  "/ebook4": pub(
    "/ebook4",
    "8-Figure Insurance Producer Playbook | Free Guide",
    "Free 8-Figure Insurance Producer Playbook for licensed producers who want a clearer operating system for production, team, and client conversations.",
  ),
  "/ebook5": pub(
    "/ebook5",
    "7-Step Controller's Playbook | Free Guide",
    "Free 7-Step Controller's Playbook. A sequenced education guide for households ready to organize protection, cash flow, and long-term decisions.",
  ),
  "/ebook6": pub(
    "/ebook6",
    "Veteran's Wealth Playbook | Free Guide",
    "Free Veteran's Wealth Playbook. Financial education for veterans and military families moving from service income to a durable household plan.",
  ),
  "/ebook7": pub(
    "/ebook7",
    "Creator's Cashflow Structure | Free Guide",
    "Free Creator's Cashflow Structure guide for influencers, podcasters, and coaches whose income arrives from several platforms.",
  ),
  "/ebook8": pub(
    "/ebook8",
    "Faithful Steward's Playbook | Free Guide",
    "Free Faithful Steward's Playbook. Faith-aligned financial education on stewardship, giving, and protecting the household.",
  ),
  "/ebook9": pub(
    "/ebook9",
    "Real Estate Financial Fortress | Free Guide",
    "Free Real Estate Financial Fortress guide for investors who own property and want the entity, insurance, and estate side explained clearly.",
  ),
  "/ebook10": pub(
    "/ebook10",
    "Producer's Playbook | Free Guide",
    "Free Producer's Playbook from Garner Financial Partners. Education for insurance producers building a book of business with a repeatable process.",
  ),
  "/ebook11": pub(
    "/ebook11",
    "Retirement Fortress | Free Guide",
    "Free Retirement Fortress guide. Education on organizing income, protection, and legacy decisions before and during retirement.",
  ),
};

const STATIC_META: Record<string, RouteMeta> = {
  "/": pub(
    "/",
    "Garner Financial Partners | Education · Vision · Implementation",
    "Financial education, strategic vision, and implementation tools that help families, athletes, veterans, and business owners protect and direct their wealth.",
  ),
  "/offer": pub(
    "/offer",
    "Agent Offer | Join Garner Financial Partners",
    "Apply to join Garner Financial Partners as a licensed producer. See the onboarding offer, training, and AI CRM that support a new book of business.",
  ),
  "/afp": pub(
    "/afp",
    "Athlete Fortress Program (AFP) | Garner Financial Partners",
    "The Athlete Fortress Program (AFP) is done-with-you education for athletes: living trust documents, NIL and contract protection, and Athlete U™ access.",
  ),
  "/bfp": pub(
    "/bfp",
    "Business Fortress Program (BFP) | Garner Financial Partners",
    "The Business Fortress Program (BFP) helps owners structure the business, coordinate tax strategy education, and protect what the company earns.",
  ),
  "/ctc": pub(
    "/ctc",
    "Contributor to Controller | Garner Financial Partners",
    "Contributor to Controller is the Garner Financial Partners education path from earning income to directing how it is protected and kept.",
  ),
  "/cfp": pub(
    "/cfp",
    "Christian Fortress Program (CFP) | Garner Financial Partners",
    "The Christian Fortress Program (CFP) pairs faith-aligned stewardship education with family protection documents and Christian U™ access.",
  ),
  "/wtg": pub(
    "/wtg",
    "Win The Game of Money | Garner Financial Partners",
    "Win The Game of Money is Garner Financial Partners' plain-language education on cash flow, protection, and building wealth you control.",
  ),
  "/refp": pub(
    "/refp",
    "Real Estate Fortress Program (REFP) | Garner Financial Partners",
    "The Real Estate Fortress Program (REFP) teaches investors how to coordinate entities, insurance, tax strategy, and estate structure around a portfolio.",
  ),
  "/ifp": pub(
    "/ifp",
    "Influencer Fortress Program (IFP) | Garner Financial Partners",
    "The Influencer Fortress Program (IFP) helps creators protect brand income, organize entities, and keep more of every deal.",
  ),
  "/mfp": pub(
    "/mfp",
    "Military Fortress Program (MFP) | Garner Financial Partners",
    "The Military Fortress Program (MFP) is estate-planning and benefits education built for service members, veterans, and their families.",
  ),
  "/book": pub(
    "/book",
    "Book a Strategy Call | Garner Financial Partners",
    "Book a strategy call with Garner Financial Partners. Pick a time, share what you want to cover, and get a calendar invite with a meeting link.",
  ),
  "/quiz": pub(
    "/quiz",
    "Financial Game Plan Quiz | Garner Financial Partners",
    "Take the Garner Financial Partners game plan quiz. Answer a few questions and get a free education path matched to your household or business.",
  ),
  "/ffp": pub(
    "/ffp",
    "Family Fortress Program (FFP) | Garner Financial Partners",
    "The Family Fortress Program (FFP) packages trust, will, and household protection education so a family can keep what it has built.",
  ),
  "/join": pub(
    "/join",
    "Join the Team | Garner Financial Partners",
    "Apply to build your book of business with Garner Financial Partners. Tell us about your license, your market, and how you want to grow.",
  ),
  "/marketplace": pub(
    "/marketplace",
    "Marketplace | Garner Financial Partners",
    "Browse Garner Financial Partners education offers, fortress programs, and tools for protecting and directing wealth.",
  ),
  "/team": pub(
    "/team",
    "Our Team | Garner Financial Partners",
    "Meet the Garner Financial Partners team behind the fortress programs and U™ education portals.",
  ),
  "/events": pub(
    "/events",
    "Events | Garner Financial Partners",
    "Upcoming Garner Financial Partners workshops, trainings, and education events.",
  ),
  "/calculators": pub(
    "/calculators",
    "Financial Calculators | Garner Financial Partners",
    "Run mortgage, retirement, savings, and growth calculators with the assumptions shown so you can check the math.",
  ),
  "/athlete-u": pub(
    "/athlete-u",
    "Athlete U™ | NIL, Brand Deals & Financial Education",
    "Athlete U™ teaches NIL deals, brand partnerships, and money skills for college and professional athletes. Free to start.",
  ),
  "/business-u": pub(
    "/business-u",
    "Business U™ | Strategy, Protection & Owner Education",
    "Business U™ is the education portal for owners who want strategy, asset protection, and a clearer view of the company.",
  ),
  "/wealth-u": pub(
    "/wealth-u",
    "Wealth U™ | Financial Education & Wealth Building",
    "Wealth U™ covers financial education, protection, and the skills behind building wealth you can direct.",
  ),
  "/veterans-u": pub(
    "/veterans-u",
    "Veterans U™ | Financial Education for Military Families",
    "Veterans U™ is financial education for service members, veterans, and the families who serve with them.",
  ),
  "/scripture-u": pub(
    "/scripture-u",
    "Scripture U™ | Faith-Based Financial Education",
    "Scripture U™ teaches faith-based financial education and biblical stewardship for households.",
  ),
  "/social-media-u": pub(
    "/social-media-u",
    "Social Media U™ | Creator Business Education",
    "Social Media U™ helps creators treat content income like a business, with structure and cash-flow education.",
  ),
  "/realestate-u": pub(
    "/realestate-u",
    "Real Estate U™ | Investing & Portfolio Education",
    "Real Estate U™ teaches property strategy, entity basics, and how a portfolio becomes a plan.",
  ),
  "/ai-crm": pub(
    "/ai-crm",
    "AI CRM | Garner Financial Partners",
    "See the AI CRM tools Garner Financial Partners uses to follow up, organize contacts, and support a book of business.",
  ),
  "/growth-partner": pub(
    "/growth-partner",
    "Growth Partner | Garner Financial Partners",
    "Growth Partner is the Garner Financial Partners implementation offer for CRM, automation, and done-for-you setup.",
  ),
  "/privacy": pub(
    "/privacy",
    "Privacy Policy | Garner Financial Partners",
    "How Garner Financial Partners collects, uses, and protects information submitted on garnerfinancialpartners.com.",
  ),
  "/terms": pub(
    "/terms",
    "Terms of Use | Garner Financial Partners",
    "Terms of use for Garner Financial Partners websites, education programs, and related online services.",
  ),
  "/refund-policy": pub(
    "/refund-policy",
    "Refund Policy | Garner Financial Partners",
    "Refund and digital-delivery terms for Garner Financial Partners programs and educational products.",
  ),
  "/anti-discrimination": pub(
    "/anti-discrimination",
    "Anti-Discrimination Policy | Garner Financial Partners",
    "Garner Financial Partners' commitment to a learning environment free from discrimination and harassment.",
  ),
  "/about": pub(
    "/about",
    "About Garner Financial Partners | Our Mission & Team",
    "Learn about Garner Financial Partners and the mission to teach financial protection and wealth-building skills to families, athletes, veterans, and owners.",
  ),
  "/services": pub(
    "/services",
    "Services | Garner Financial Partners",
    "Fortress Programs and U™ education portals from Garner Financial Partners, built for athletes, businesses, families, veterans, creators, and investors.",
  ),
  "/dashboard": priv(
    "/dashboard",
    "Dashboard | Garner Financial Partners",
    "Private account dashboard for Garner Financial Partners clients.",
  ),
  "/settings": priv(
    "/settings",
    "Settings | Garner Financial Partners",
    "Private account settings for Garner Financial Partners.",
  ),
  "/login": priv(
    "/login",
    "Sign In | Garner Financial Partners",
    "Sign in to your Garner Financial Partners account.",
  ),
  "/signup": priv(
    "/signup",
    "Create Account | Garner Financial Partners",
    "Create a Garner Financial Partners account.",
  ),
  "/admin": priv(
    "/admin",
    "Admin | Garner Financial Partners",
    "Private administration area for Garner Financial Partners.",
  ),
  "/checkout/success": priv(
    "/checkout/success",
    "Checkout Complete | Garner Financial Partners",
    "Private order confirmation for a Garner Financial Partners checkout.",
  ),
};

export function metaForPath(pathname: string): RouteMeta | null {
  const path = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  return STATIC_META[path] ?? BUNDLE_META[path] ?? EBOOK_META[path] ?? null;
}

export const SITEMAP_PATHS = [
  "/",
  "/offer",
  "/afp",
  "/bfp",
  "/ctc",
  "/cfp",
  "/wtg",
  "/refp",
  "/ifp",
  "/mfp",
  "/ffp",
  "/book",
  "/quiz",
  "/join",
  ...Object.keys(BUNDLE_META),
  ...Object.keys(EBOOK_META),
];
