import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import ResultsSection from "@/components/ResultsSection";
import PartnersSection from "@/components/PartnersSection";
import SocialProofTicker from "@/components/SocialProofTicker";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ProductsSection />
    <HowItWorksSection />
    <PricingSection />
    <ResultsSection />
    <PartnersSection />
    <SocialProofTicker />
    <FinalCTASection />
    <Footer />
    <ScrollToTop />
  </div>
);

export default Index;
