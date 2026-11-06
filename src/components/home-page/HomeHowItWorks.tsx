import React from "react";
import FullscreenVideo from "../ui/FullscreenVideo";
import StepCard from "./StepCard";
import { useFullscreenVideo } from "../../hooks/useFullscreenVideo";
import { stepsData } from "../../data/steps";
import { cmdBaseUrl } from "../../../cmdBaseUrl";
import ButtonPrimary from "../buttons/ButtonPrimary";

export default function HomeHowItWorks(): JSX.Element {
  const { fullscreenVideo, openFullscreen, closeFullscreen } =
    useFullscreenVideo();

  return (
    // One of the page's two brand moments: ink with the dark hero's glow, in both themes.
    <section
      id="how-it-works"
      className="relative bg-[#111827] py-20 px-4"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 30%, rgba(112, 48, 160, 0.30) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(236, 72, 153, 0.10) 0%, transparent 45%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI-powered web-app testing
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            First tests from a URL in minutes. A reviewed regression suite in
            days.
          </p>
        </div>

        {/* Steps */}
        {stepsData.map((step) => (
          <StepCard
            key={step.number}
            stepNumber={step.number}
            videoSrc={step.videoSrc}
            fallbackImageSrc={step.fallbackImageSrc}
            title={step.title}
            subtitle={step.subtitle}
            bulletPointsTitle={step.bulletPointsTitle}
            bulletPoints={step.bulletPoints}
            onExpandVideo={openFullscreen}
            layout={step.layout}
          />
        ))}
      </div>

      <div className="text-center mt-16">
        <ButtonPrimary
          id="cta-how-it-works-trial"
          label="Start for free"
          href={cmdBaseUrl}
          className="w-60 h-[50px]"
        />
        <p className="text-sm italic text-gray-300">No credit card required</p>
      </div>

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <FullscreenVideo
          videoSrc={fullscreenVideo}
          isOpen={true}
          onClose={closeFullscreen}
        />
      )}
    </section>
  );
}
