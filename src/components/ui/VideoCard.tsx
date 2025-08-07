import React, { useState, useRef, useCallback, useEffect } from "react";

interface VideoCardProps {
  videoSrc: string;
  fallbackImageSrc: string;
  onExpand: (videoSrc: string) => void;
  className?: string;
  maxHeight?: string;
}

export default function VideoCard({
  videoSrc,
  fallbackImageSrc,
  onExpand,
  className = "",
  maxHeight,
}: VideoCardProps): JSX.Element {
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setVideoLoading(false);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  const handleExpand = () => {
    if (!videoError) {
      onExpand(videoSrc);
    }
  };

  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoLoading) {
      timeoutRef.current = setTimeout(() => {
        setVideoError(true);
        setVideoLoading(false);
      }, 10000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [videoLoading]);

  return (
    <div
      ref={cardRef}
      className={`bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-1 shadow-2xl ${className}`}
    >
      <div className="bg-[#1a1a2e] rounded-xl p-1 relative group overflow-hidden">
        {/* Video or Fallback Image */}
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto rounded-lg block"
            style={{ maxHeight: maxHeight || "300px", objectFit: "cover" }}
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            preload="metadata"
          >
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={fallbackImageSrc}
            alt="Step demonstration"
            className="w-full h-auto rounded-lg block"
            style={{ maxHeight: maxHeight || "300px", objectFit: "cover" }}
            loading="lazy"
          />
        )}

        {/* Loading indicator */}
        {videoLoading && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        {/* Expand icon - only show if video is loaded or we have fallback */}
        {(!videoLoading || videoError) && (
          <button
            onClick={handleExpand}
            className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
            aria-label={`Expand ${videoSrc} video to fullscreen`}
            aria-describedby={`video-description-${videoSrc}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleExpand();
              }
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
