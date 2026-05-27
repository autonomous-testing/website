import React, { useEffect, useRef, useState } from "react";
import { Play, Maximize2, X } from "lucide-react";

interface HeroSequenceVideoProps {
  sources: string[];
  poster?: string;
}

const HeroSequenceVideo: React.FC<HeroSequenceVideoProps> = ({
  sources,
  poster,
}) => {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const inlineRef = useRef<HTMLVideoElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    if (index < sources.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
      if (!fullscreen) {
        setStarted(false);
      }
    }
  };

  const handlePlay = () => {
    setStarted(true);
    setIndex(0);
    setTimeout(() => {
      inlineRef.current?.play().catch(() => {});
    }, 50);
  };

  const openFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreen(true);
    setStarted(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
  };

  useEffect(() => {
    if (fullscreen && fullRef.current) {
      fullRef.current.load();
      fullRef.current.play().catch(() => {});
    }
    if (!fullscreen && started && inlineRef.current) {
      inlineRef.current.load();
      inlineRef.current.play().catch(() => {});
    }
  }, [index, fullscreen]);

  const currentSrc = sources[index];

  return (
    <>
      <div
        className="relative w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 shadow-2xl shadow-purple-900/30 group cursor-pointer aspect-video"
        onClick={!started ? handlePlay : openFullscreen}
        role="button"
        tabIndex={0}
        aria-label={
          started ? "Open video in fullscreen" : "Play product walkthrough"
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!started) handlePlay();
            else setFullscreen(true);
          }
        }}
      >
        {started ? (
          <video
            ref={inlineRef}
            key={`inline-${index}`}
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            className="w-full h-full object-cover"
          >
            <source src={currentSrc} type="video/webm" />
            <source src={currentSrc.replace(".webm", ".mp4")} type="video/mp4" />
          </video>
        ) : (
          <>
            {poster ? (
              <img
                src={poster}
                alt="Product walkthrough preview"
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900 via-gray-900 to-indigo-900" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-wopee/95 text-black shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
              <span className="px-2 py-1 rounded bg-black/50 backdrop-blur uppercase tracking-wider font-semibold">
                Watch 60s demo
              </span>
              <span className="px-2 py-1 rounded bg-black/50 backdrop-blur">
                3 steps · URL → tests → results
              </span>
            </div>
          </>
        )}

        {started && (
          <>
            <button
              onClick={openFullscreen}
              aria-label="Expand to fullscreen"
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition opacity-0 group-hover:opacity-100"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1">
              {sources.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i === index ? "bg-primary-wopee" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={closeFullscreen}
          role="dialog"
          aria-label="Product walkthrough video"
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={fullRef}
              key={`full-${index}`}
              autoPlay
              controls
              playsInline
              onEnded={handleEnded}
              className="w-full h-auto rounded-lg shadow-2xl"
            >
              <source src={currentSrc} type="video/webm" />
              <source
                src={currentSrc.replace(".webm", ".mp4")}
                type="video/mp4"
              />
            </video>
            <button
              onClick={closeFullscreen}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg"
              aria-label="Close fullscreen video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
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
      )}
    </>
  );
};

export default HeroSequenceVideo;
