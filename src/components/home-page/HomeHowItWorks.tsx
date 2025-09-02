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
    <section className="bg-[#0A0A0B] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            🚀 AI-powered web-app testing
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            From a single URL to 80%+ regression coverage in 5 minutes.
            <br />
            No scripts, no extra QA hires.
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
          label="Test better now"
          href={cmdBaseUrl}
          className="w-60 h-[50px]"
        />
        <p className="text-sm italic">Start free trial</p>
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
