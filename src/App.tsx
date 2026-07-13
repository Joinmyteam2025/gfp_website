import { Route, Routes, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteLayout } from "./components/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { EventsPage } from "./pages/EventsPage";
import { TeamPage } from "./pages/TeamPage";
import { CalculatorsPage } from "./pages/CalculatorsPage";
import { FFPPage } from "./pages/FFPPage";
import { BFPPage } from "./pages/BFPPage";
import { MFPPage } from "./pages/MFPPage";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage";
import { AiCrmPage } from "./pages/AiCrmPage";
import { GrowthPartnerPage } from "./pages/GrowthPartnerPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { RefundPolicyPage } from "./pages/RefundPolicyPage";
import { AntiDiscriminationPage } from "./pages/AntiDiscriminationPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { AthleteUPage } from "./pages/AthleteUPage";
import { ScriptureUPage } from "./pages/ScriptureUPage";
import { SocialMediaUPage } from "./pages/SocialMediaUPage";
import { VeteransUPage } from "./pages/VeteransUPage";
import { BusinessUPage } from "./pages/BusinessUPage";
import { RealEstateUPage } from "./pages/RealEstateUPage";
import { WealthUPage } from "./pages/WealthUPage";
import { JoinPage } from "./pages/JoinPage";
import { AFPPage } from "./pages/AFPPage";
import { IFPPage } from "./pages/IFPPage";
import { REFPPage } from "./pages/REFPPage";
import { CFPPage } from "./pages/CFPPage";
import { BookCallPage } from "./pages/BookCallPage";

import { SocialProofNotifications } from "./components/SocialProofNotifications";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={false}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/ffp" element={<FFPPage />} />
          {/* BFP moved outside SiteLayout for minimal VSL nav */}
          <Route path="/athlete-u" element={<AthleteUPage />} />
          {/* AFP moved outside SiteLayout for minimal nav */}
          <Route path="/scripture-u" element={<ScriptureUPage />} />
          <Route path="/social-media-u" element={<SocialMediaUPage />} />
          <Route path="/veterans-u" element={<VeteransUPage />} />
          <Route path="/business-u" element={<BusinessUPage />} />
          <Route path="/realestate-u" element={<RealEstateUPage />} />
          <Route path="/wealth-u" element={<WealthUPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/ai-crm" element={<AiCrmPage />} />
          <Route path="/growth-partner" element={<GrowthPartnerPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/anti-discrimination" element={<AntiDiscriminationPage />} />
        </Route>
        <Route path="/mfp" element={<MFPPage />} />
        <Route path="/afp" element={<AFPPage />} />
        <Route path="/bfp" element={<BFPPage />} />
        <Route path="/ifp" element={<IFPPage />} />
        <Route path="/refp" element={<REFPPage />} />
        <Route path="/cfp" element={<CFPPage />} />
        <Route path="/book" element={<BookCallPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </ThemeProvider>
            <SocialProofNotifications portal="home" position="bottom-left" />
      </ErrorBoundary>
  );
}

export default App;
