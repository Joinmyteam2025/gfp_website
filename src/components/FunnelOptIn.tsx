import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { trackFunnelLead } from "../lib/metaPixel";

interface FunnelOptInProps {
  contentName: string;
  source: string;
  headline: string;
  subhead?: string;
  freeAccess?: boolean;
  compact?: boolean;
}

export function FunnelOptIn({
  contentName,
  source,
  headline,
  subhead = "No card. Unsubscribe anytime. We never sell your information.",
  freeAccess = false,
  compact = false,
}: FunnelOptInProps) {
  const submit = useMutation(api.freeAccess.submit);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setPending(true);
    try {
      const result = await submit({
        firstName: firstName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        smsConsent: phone.trim() ? smsConsent : false,
        source,
        contentName,
        path: typeof window !== "undefined" ? window.location.pathname : source,
      });
      if (!result.success) {
        setError("Something went wrong. Please try again.");
        return;
      }
      trackFunnelLead(contentName, { freeAccess });
      setDone(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className={compact ? "rounded-2xl border border-[#C5963A]/30 bg-[#C5963A]/10 p-6 text-center" : "rounded-2xl border border-white/10 bg-white/5 p-8 text-center"}>
        <p className="text-lg font-semibold text-white">You are in.</p>
        <p className="mt-2 text-sm text-white/70">
          Watch your inbox for {contentName}. You can also save our advisor card at{" "}
          <a className="text-[#C5963A] underline" href="/GPA-contact.vcf">
            GPA-contact.vcf
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={compact
        ? "rounded-2xl border border-white/10 bg-[#0B1D3A] p-5 md:p-6"
        : "rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"}
    >
      <h2 className="font-serif text-2xl font-bold text-white">{headline}</h2>
      <p className="mt-2 text-sm text-white/60">{subhead}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block text-left text-xs text-white/70">
          First name
          <input
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            autoComplete="given-name"
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#C5963A]"
          />
        </label>
        <label className="block text-left text-xs text-white/70">
          Email
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#C5963A]"
          />
        </label>
      </div>
      <label className="mt-3 block text-left text-xs text-white/70">
        Mobile (optional)
        <input
          value={phone}
          onChange={event => setPhone(event.target.value)}
          autoComplete="tel"
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#C5963A]"
        />
      </label>
      {phone.trim() ? (
        <label className="mt-3 flex items-start gap-2 text-left text-xs text-white/60">
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={event => setSmsConsent(event.target.checked)}
            className="mt-0.5"
          />
          <span>
            I agree to receive SMS about this request. Message and data rates may apply. Reply STOP to opt out.
          </span>
        </label>
      ) : null}
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-full bg-[#C5963A] px-6 py-3 text-sm font-semibold text-[#0A1628] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send me everything"}
      </button>
    </form>
  );
}
