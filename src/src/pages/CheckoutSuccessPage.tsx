import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "convex/react";
import { safeLocalStorage } from "../../lib/safeTokenStorage";
import { api } from "../../convex/_generated/api";
import {
  CheckCircle2,
  Shield,
  Mail,
  Phone,
  Users,
  ExternalLink,
  Sparkles,
  Loader2,
} from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Product Config ─── */
const productConfig: Record<string, {
  name: string;
  icon: string;
  portalUrl: string;
  portalName: string;
  color: string;
}> = {
  ffp: {
    name: "Family Fortress Program™",
    icon: "🏰",
    portalUrl: "https://portal.garnerfinancialpartners.com",
    portalName: "FFP™ Client Portal",
    color: "#C5963A",
  },
  bfp: {
    name: "Business Fortress Program™",
    icon: "🏢",
    portalUrl: "https://business.garnerfinancialpartners.com",
    portalName: "BFP™ Business Portal",
    color: "#C5963A",
  },
  mfp: {
    name: "Military Fortress Program™",
    icon: "🎖️",
    portalUrl: "https://veterans.garnerfinancialpartners.com",
    portalName: "MFP™ Veterans Portal",
    color: "#C5963A",
  },
  afp: {
    name: "Athlete Fortress Program™",
    icon: "🏆",
    portalUrl: "https://athlete.garnerfinancialpartners.com",
    portalName: "Athlete U™ Portal",
    color: "#DC2626",
  },
  ifp: {
    name: "Influencer Fortress Program™",
    icon: "⭐",
    portalUrl: "https://socialmedia.garnerfinancialpartners.com",
    portalName: "Social Media U™ Portal",
    color: "#C5963A",
  },
  refp: {
    name: "Real Estate Fortress Program™",
    icon: "🏠",
    portalUrl: "https://realestate.garnerfinancialpartners.com",
    portalName: "Real Estate U™ Portal",
    color: "#C5963A",
  },
};

export function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product") || "ffp";
  const isDemo = searchParams.get("demo") === "true";
  const sessionId = searchParams.get("session_id");

  const [_orderProcessed, setOrderProcessed] = useState(false);
  const [processing, setProcessing] = useState(true);
  const [buyerInfo, setBuyerInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  const processOrder = useMutation(api.checkout.processOrder);

  const config = productConfig[product] || productConfig.ffp;

  useEffect(() => {
    const handleOrder = async () => {
      try {
        // Retrieve pending order from localStorage
        const pending = safeLocalStorage.getItem("pendingOrder");
        if (!pending) {
          setProcessing(false);
          return;
        }

        const orderData = JSON.parse(pending);
        setBuyerInfo({
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          email: orderData.email,
        });

        // Process the order through Convex
        await processOrder({
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          email: orderData.email,
          phone: orderData.phone,
          city: orderData.city || "",
          state: orderData.state || "",
          zipCode: orderData.zipCode || "",
          product: orderData.product,
          productName: orderData.productName,
          price: orderData.price,
          portalUrl: orderData.portalUrl,
          stripeSessionId: sessionId || undefined,
          isDemo: isDemo,
        });

        // Clean up localStorage
        safeLocalStorage.removeItem("pendingOrder");
        setOrderProcessed(true);
      } catch (error) {
        console.error("Error processing order:", error);
      } finally {
        setProcessing(false);
      }
    };

    handleOrder();
  }, [processOrder, sessionId, isDemo]);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-[#C5963A]/[0.04] to-transparent rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-t from-[#1a3a6b]/10 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-20">
        {/* Processing State */}
        {processing && (
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-[#C5963A]/10 border-2 border-[#C5963A]/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Loader2 className="size-10 text-[#C5963A] animate-spin" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-4">
              Processing Your Order...
            </h1>
            <p className="text-white/40">Setting up your access and sending confirmations.</p>
          </div>
        )}

        {/* Success State */}
        {!processing && (
          <>
            {/* Hero */}
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center mb-16">
                {/* Success Icon */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping" />
                  <div className="relative w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center">
                    <CheckCircle2 className="size-12 text-green-400" />
                  </div>
                </div>

                <div className="text-5xl mb-4">{config.icon}</div>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                  Welcome to the <span className="text-gold-gradient">{config.name.replace("™", "")}</span>™
                </h1>

                {buyerInfo && (
                  <p className="text-xl text-white/50 mb-2">
                    Thank you, <span className="text-white font-medium">{buyerInfo.firstName}</span>!
                  </p>
                )}

                <p className="text-white/40 leading-relaxed max-w-lg mx-auto">
                  Your order has been confirmed. You'll receive a receipt via email and SMS shortly.
                  Your portal access is being set up now.
                </p>

                {isDemo && (
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <Sparkles className="size-4 text-yellow-400" />
                    <span className="text-xs text-yellow-400 font-medium">Demo Mode. No payment was charged</span>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* What Happens Next */}
            <ScrollReveal delay={200}>
              <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl font-serif font-bold text-white text-center mb-10">
                  What Happens <span className="text-gold-gradient">Next</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      step: "1",
                      icon: Mail,
                      title: "Check Your Email",
                      desc: `You'll receive a welcome email with your receipt and login credentials for the ${config.portalName}.`,
                    },
                    {
                      step: "2",
                      icon: Users,
                      title: "Access Your Portal",
                      desc: "Log in to your portal and complete the guided onboarding questionnaire. This takes about 15 minutes.",
                    },
                    {
                      step: "3",
                      icon: Shield,
                      title: "We Get to Work",
                      desc: "Our team uses your answers to build your complete fortress. Documents, strategies, and blueprints tailored to you.",
                    },
                  ].map(({ step, icon: Icon, title, desc }) => (
                    <div key={step} className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                      <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03]">{step}</div>
                      <div className="w-12 h-12 rounded-xl bg-[#C5963A]/10 border border-[#C5963A]/20 flex items-center justify-center mx-auto mb-4">
                        <Icon className="size-6 text-[#C5963A]" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-white mb-2">{title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Portal Access CTA */}
            <ScrollReveal delay={400}>
              <div className="max-w-lg mx-auto">
                <div className="glass-card rounded-2xl p-8 text-center border-[#C5963A]/20">
                  <h3 className="text-xl font-serif font-bold text-white mb-2">Access Your Portal</h3>
                  <p className="text-sm text-white/40 mb-6">
                    Your {config.portalName} is ready. Log in to start your onboarding.
                  </p>
                  <a
                    href={config.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#C5963A]/20"
                  >
                    Go to {config.portalName}
                    <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Support */}
            <ScrollReveal delay={600}>
              <div className="max-w-lg mx-auto mt-12 text-center">
                <p className="text-sm text-white/30 mb-4">
                  Questions? We're here to help.
                </p>
                <div className="flex items-center justify-center gap-6">
                  <a
                    href="mailto:support@garnerfinancialpartners.com"
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-[#C5963A] transition-colors"
                  >
                    <Mail className="size-4" />
                    Email Support
                  </a>
                  <a
                    href="tel:+14803339913"
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-[#C5963A] transition-colors"
                  >
                    <Phone className="size-4" />
                    (480) 333-9913
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </>
        )}
      </div>
    </div>
  );
}
