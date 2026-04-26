import HeroSection from '@/components/ethinx/HeroSection';
import StickyNav from '@/components/ethinx/StickyNav';
import CaseStudiesSection from '@/components/ethinx/CaseStudiesSection';
import ResultsWallSection from '@/components/ethinx/ResultsWallSection';
import PartnerLogosSection from '@/components/ethinx/PartnerLogosSection';
import ActivityFeedSection from '@/components/ethinx/ActivityFeedSection';
import CTASection from '@/components/ethinx/CTASection';
import Footer from '@/components/ethinx/Footer';
import ScrollToTop from '@/components/ethinx/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <ScrollToTop />
      <HeroSection />
      <CaseStudiesSection />
      <ResultsWallSection />
      <PartnerLogosSection />
      <ActivityFeedSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
