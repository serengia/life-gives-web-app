import FloatingOrderButton from "@/components/FloatingOrderButton";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import WhatsInsideSection from "@/components/sections/WhatsInsideSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AuthorSection from "@/components/sections/AuthorSection";
import FAQSection from "@/components/sections/FAQSection";
import OrderSection from "@/components/sections/OrderSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <WhatsInsideSection />
      <PricingSection />
      <TestimonialsSection />
      <AuthorSection />
      <FAQSection />
      <OrderSection />
      <Footer />
      <FloatingOrderButton />
    </>
  );
}
