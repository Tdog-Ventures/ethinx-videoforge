import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OfferCard from "@/components/OfferCard";
import WhatsIncluded from "@/components/WhatsIncluded";
import ResultsSection from "@/components/ResultsSection";
import ProcessSection from "@/components/ProcessSection";
import OrderForm from "@/components/OrderForm";
import FAQSection from "@/components/FAQSection";
import ScarcitySection from "@/components/ScarcitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <OfferCard />
      <WhatsIncluded />
      <ResultsSection />
      <ProcessSection />
      <OrderForm />
      <FAQSection />
      <ScarcitySection />
      <Footer />
    </main>
  );
};

export default Index;
