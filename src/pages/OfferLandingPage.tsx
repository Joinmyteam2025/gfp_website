import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { FunnelOptIn } from "../components/FunnelOptIn";
import type { OfferLanding } from "../lib/offers";

export function OfferLandingPage({ offer }: { offer: OfferLanding }) {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-serif text-sm font-semibold tracking-wide text-[#C5963A]">
            Garner Financial Partners
          </Link>
          <Link to="/book" className="text-xs text-white/70 hover:text-white">
            Book a call
          </Link>
        </div>
      </header>
      <main className="mx-auto grid max-w-5xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C5963A]">
            {offer.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
            {offer.headline}{" "}
            <span className="text-[#C5963A]">{offer.accent}</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/70">{offer.subhead}</p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            {offer.bullets.map(bullet => (
              <li key={bullet} className="flex gap-3">
                <span className="text-[#C5963A]">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <FunnelOptIn
          contentName={offer.contentName}
          source={offer.source}
          headline="Send me everything"
          freeAccess={offer.freeAccess}
        />
      </main>
      <Footer />
    </div>
  );
}
