import React from "react";
import VideoCard from "../ui/VideoCard";

interface StepCardProps {
  stepNumber: number;
  videoSrc: string;
  fallbackImageSrc: string;
  title: string;
  subtitle: string;
  bulletPointsTitle?: string;
  bulletPoints: string[];
  onExpandVideo: (videoSrc: string) => void;
  layout?: "left" | "right";
}

export default function StepCard({
  stepNumber,
  videoSrc,
  fallbackImageSrc,
  title,
  subtitle,
  bulletPointsTitle,
  bulletPoints,
  onExpandVideo,
  layout = "left",
}: StepCardProps): JSX.Element {
  const isLeftLayout = layout === "left";

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">
      {/* Video Section */}
      <div className={isLeftLayout ? "lg:order-1" : "lg:order-2"}>
        <VideoCard
          videoSrc={videoSrc}
          fallbackImageSrc={fallbackImageSrc}
          onExpand={onExpandVideo}
        />
      </div>

      {/* Content Section */}
      <div className={isLeftLayout ? "lg:order-2" : "lg:order-1"}>
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
            {stepNumber}
          </div>
          <h3 className="text-3xl font-bold text-white">{title}</h3>
        </div>

        <h4 className="text-2xl font-bold text-yellow-400 mb-6">{subtitle}</h4>

        <div className="mb-6">
          {bulletPointsTitle && (
            <p className="text-gray-300 mb-3 text-lg font-bold">
              {bulletPointsTitle}
            </p>
          )}
          <ul className="space-y-3 text-gray-300">
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
