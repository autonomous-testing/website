import React from "react";

import HeroSection from "./sections/HeroSection";
import ProblemGrid from "./sections/ProblemGrid";
import PartnerBrands from "./sections/PartnerBrands";
import OurValueSection from "./sections/OurValueSection";
import SupportedTestingTools from "./sections/SupportedTestingTools";
import SolutionIntroSection from "./sections/SolutionIntroSection";
import HowItWorks from "./sections/HowItWorks";
import TestimonialCarousel from "./sections/TestimonialCarousel";
import EndingSection from "./sections/EndingSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <PartnerBrands />
      <ProblemGrid />
      <OurValueSection />
      <SupportedTestingTools spanLastOdd={false} />
      <SolutionIntroSection />
      <HowItWorks />
      <TestimonialCarousel />
      <EndingSection />
    </>
  );
};
export default LandingPage;
