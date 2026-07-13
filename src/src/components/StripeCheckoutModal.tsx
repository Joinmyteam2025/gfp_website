import { useCallback, useState, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { X, ShoppingCart, Shield, Loader2, Wrench, Zap, GitBranch, Users, Globe, Bot, Check } from "lucide-react";

const STRIPE_PK =
  "pk_live_51HUcV1Dal1LtHX1V8EA6rXcrrBZwvBMPxBfy105hhhtxM6xXY3zbzgp7XilzUKvGMRV5tk64BJnk7p3YBfkQTlpS00Jlh13zpL";

const stripePromise = loadStripe(STRIPE_PK);

const DFY_FEATURES = [
  { icon: Wrench, label: "Complete CRM Configuration" },
  { icon: Zap, label: "Custom Automation Setup" },
  { icon: GitBranch, label: "Pipeline & Deal Stages" },
  { icon: Users, label: "Contact Import & Cleanup" },
  { icon: Globe, label: "Domain & Branding Setup" },
  { icon: Bot, label: "AI Assistant Training" },
];

interface StripeCheckoutModalProps {
  open: boolean;
  onClose: () => void;
  /** The product key matching the backend mapping */
  productKey: string;
  /** Display name */
  productName: string;
  /** Display price string, e.g. "$297" or "$97/mo" */
  priceDisplay: string;
  /** "one-time" or "subscription" — only for display */
  priceType?: "one-time" | "subscription";
  /** Optional customer email to pre-fill */
  customerEmail?: string;
  /** Optional metadata */
  metadata?: Record<string, string>;
  /** Show the $997 DFY Setup bump option */
  showSetupBump?: boolean;
}

export function StripeCheckoutModal({
  open,
  onClose,
  productKey,
  productName,
  priceDisplay,
  priceType = "one-time",
  customerEmail,
  metadata,
  showSetupBump = false,
}: StripeCheckoutModalProps) {
  const createEmbeddedCheckout = useAction(
    api.stripeCheckout.createEmbeddedCheckout
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [includeSetup, setIncludeSetup] = useState(false);
  // Key to force re-mount of EmbeddedCheckoutProvider when setup toggle changes
  const [checkoutKey, setCheckoutKey] = useState(0);

  const handleSetupToggle = () => {
    setIncludeSetup((prev) => !prev);
    setCheckoutKey((k) => k + 1);
    setLoading(true);
  };

  const fetchClientSecret = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await createEmbeddedCheckout({
        productKey,
        customerEmail,
        metadata: metadata || {},
        includeSetup,
      });
      setLoading(false);
      return result.clientSecret;
    } catch (err: any) {
      setError(err.message || "Failed to initialize checkout");
      setLoading(false);
      throw err;
    }
  }, [createEmbeddedCheckout, productKey, customerEmail, metadata, includeSetup]);

  // Fire Meta Pixel InitiateCheckout when modal opens
  useEffect(() => {
    if (open) {
      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: productName,
          content_ids: [productKey],
          value: parseFloat(priceDisplay.replace(/[^0-9.]/g, '')) || 0,
          currency: 'USD',
        });
      }
      if (typeof (window as any).GFP?.track !== 'undefined') {
        (window as any).GFP.track('InitiateCheckout', { product: productKey, name: productName });
      }
    }
  }, [open, productKey, productName, priceDisplay]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#1A1A2E] to-[#122a4f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C5963A]/20 flex items-center justify-center">
              <ShoppingCart className="w-4.5 h-4.5 text-[#C5963A]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm leading-tight">
                {productName}
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">
                {priceDisplay}{" "}
                <span className="text-gray-500">
                  · {priceType === "subscription" ? "Subscription" : "One-time payment"}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DFY Setup Bump */}
        {showSetupBump && (
          <div
            className={`mx-4 mt-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
              includeSetup
                ? "border-[#C5963A] bg-[#C5963A]/5 shadow-md shadow-[#C5963A]/10"
                : "border-gray-200 bg-[#FFFBF0] hover:border-[#C5963A]/40"
            }`}
            onClick={handleSetupToggle}
          >
            <div className="p-4">
              {/* Checkbox + Title row */}
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    includeSetup
                      ? "bg-[#C5963A] border-[#C5963A]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {includeSetup && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Wrench className="w-4 h-4 text-[#C5963A]" />
                    <span className="font-bold text-gray-900 text-sm">
                      Add Done-For-You Setup
                    </span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                      SAVE $2,000
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1.5 leading-relaxed">
                    Our team sets up your entire CRM — contacts, pipelines, automations, integrations, and branding.
                  </p>
                </div>
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 ml-8">
                {DFY_FEATURES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#C5963A]" />
                    <span className="text-[11px] text-gray-700">{label}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mt-3 ml-8">
                <span className="text-xs text-gray-400 line-through">$2,997</span>
                <span className="text-lg font-bold text-red-500">$997</span>
                <span className="text-[11px] text-gray-500">one-time</span>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Body */}
        <div className="flex-1 overflow-y-auto p-1 min-h-[420px] relative">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <X className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-red-600 text-sm text-center font-medium">
                {error}
              </p>
              <button
                onClick={() => setError(null)}
                className="px-5 py-2.5 bg-[#1A1A2E] text-white rounded-lg text-sm font-medium hover:bg-[#1A1A2E]/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-white">
                  <Loader2 className="w-8 h-8 text-[#C5963A] animate-spin" />
                  <p className="text-gray-500 text-sm">
                    Loading secure checkout...
                  </p>
                </div>
              )}
              <EmbeddedCheckoutProvider
                key={checkoutKey}
                stripe={stripePromise}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-2">
          <Shield className="w-3 h-3 text-gray-400" />
          <span className="text-[10px] text-gray-400">
            Secure checkout powered by Stripe · SSL encrypted · 30-day
            money-back guarantee
          </span>
        </div>
      </div>
    </div>
  );
}
