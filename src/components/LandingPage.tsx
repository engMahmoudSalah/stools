import React from "react";
import { HeroSection } from "./landing/HeroSection";
import { FeaturesSection } from "./landing/FeaturesSection";
import { HowItWorksSection } from "./landing/HowItWorksSection";
import { FaqAndTestimonials } from "./landing/FaqAndTestimonials";
import { CtaSection } from "./landing/CtaSection";

interface LandingPageProps {
  t: any;
  lang: string;
  setAuthMode: (mode: string) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  faqs: any[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  t,
  setAuthMode,
  setIsAuthModalOpen,
  faqs,
}) => {
  return (
    <div className="relative w-full">
      <HeroSection 
        t={t} 
        setAuthMode={setAuthMode} 
        setIsAuthModalOpen={setIsAuthModalOpen} 
      />
      <FeaturesSection t={t} />
      <HowItWorksSection t={t} />
      <FaqAndTestimonials t={t} faqs={faqs} />
      <CtaSection 
        t={t} 
        setAuthMode={setAuthMode} 
        setIsAuthModalOpen={setIsAuthModalOpen} 
      />
    </div>
  );
};
