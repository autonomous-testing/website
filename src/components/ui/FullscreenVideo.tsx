import React from "react";

interface FullscreenVideoProps {
  videoSrc: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenVideo({
  videoSrc,
  isOpen,
  onClose,
}: FullscreenVideoProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Video container with close button */}
        <div className="relative w-full max-w-6xl max-h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-auto rounded-lg shadow-2xl"
          >
            <source src={videoSrc} type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Close button positioned on the video */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-lg transition-all duration-200"
            aria-label="Close fullscreen video"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Click outside to close */}
        <div
          className="absolute inset-0 -z-10"
          onClick={onClose}
          aria-label="Click outside to close"
        />
      </div>
    </div>
  );
}
