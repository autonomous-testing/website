import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface HeroVideoStep {
  number?: number;
  title: string;
  subtitle?: string;
}

interface HeroVideoModalProps {
  sources: string[];
  steps?: HeroVideoStep[];
  isOpen: boolean;
  onClose: () => void;
}

const HeroVideoModal: React.FC<HeroVideoModalProps> = ({
  sources,
  steps,
  isOpen,
  onClose,
}) => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) setIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [index, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleEnded = () => {
    if (index < sources.length - 1) {
      setIndex(index + 1);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentSrc = sources[index];
  const hasSteps = !!steps && steps.length === sources.length;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-label="Product walkthrough video"
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          key={`hero-modal-${index}`}
          autoPlay
          controls
          playsInline
          onEnded={handleEnded}
          className="w-full h-auto max-h-[70vh] rounded-lg shadow-2xl bg-black"
        >
          <source src={currentSrc} type="video/webm" />
          <source src={currentSrc.replace(".webm", ".mp4")} type="video/mp4" />
        </video>

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-2 sm:right-2 bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-lg"
          aria-label="Close fullscreen video"
        >
          <X className="w-5 h-5" />
        </button>

        {hasSteps ? (
          // Step cards double as the progress stepper — the playing clip's
          // card is highlighted, and each card jumps to its clip. Titles +
          // subtitles mirror the "How it works" section (same video fragments).
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {steps!.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={active}
                  className={`text-left rounded-lg border p-3 transition-colors ${
                    active
                      ? "border-primary-wopee bg-primary-wopee/10"
                      : "border-white/15 bg-white/5 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold flex-shrink-0 ${
                        active
                          ? "bg-primary-wopee text-black"
                          : "bg-white/15 text-white"
                      }`}
                    >
                      {s.number ?? i + 1}
                    </span>
                    <span className="text-sm font-semibold text-white leading-tight">
                      {s.title}
                    </span>
                  </div>
                  {s.subtitle && (
                    <p className="mt-1 text-xs text-gray-400 leading-snug">
                      {s.subtitle}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 pointer-events-none">
            {sources.map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i === index ? "bg-primary-wopee" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroVideoModal;
