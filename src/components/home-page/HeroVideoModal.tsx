import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface HeroVideoModalProps {
  sources: string[];
  isOpen: boolean;
  onClose: () => void;
}

const HeroVideoModal: React.FC<HeroVideoModalProps> = ({
  sources,
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

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-label="Product walkthrough video"
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          key={`hero-modal-${index}`}
          autoPlay
          controls
          playsInline
          onEnded={handleEnded}
          className="w-full h-auto rounded-lg shadow-2xl"
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
      </div>
    </div>
  );
};

export default HeroVideoModal;
