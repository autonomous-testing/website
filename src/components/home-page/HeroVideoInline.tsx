import React, { useEffect, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import useDeferredInView from "@site/src/hooks/useDeferredInView";

interface HeroVideoInlineProps {
  sources: string[];
  poster?: string;
  onExpand?: () => void;
  className?: string;
  aspectClassName?: string;
  // When true (default) the clip sits as a faint grayscale backdrop and only
  // comes to full colour on hover. When false it plays fully visible.
  dimmed?: boolean;
}

// Muted autoplay loop of the demo clips, cycling through `sources`. Muting is
// required for browsers to allow autoplay without a user gesture; onExpand
// opens the fullscreen modal with sound + controls. Only the poster renders
// until the page has loaded and the clip is in view.
const HeroVideoInline: React.FC<HeroVideoInlineProps> = ({
  sources,
  poster,
  onExpand,
  className = "",
  aspectClassName = "aspect-video",
  dimmed = true,
}) => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const active = useDeferredInView(frameRef, { respectReducedMotion: true });

  useEffect(() => {
    if (active) videoRef.current?.play().catch(() => {});
  }, [index, active]);

  const currentSrc = sources[index];

  return (
    <div
      className={`group relative rounded-xl shadow-md shadow-black/5 transition-shadow duration-500 hover:shadow-lg hover:shadow-purple-900/20 ${className}`}
    >
      {/* gradient frame, faded in on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-secondary-wopee via-purple-500 to-primary-wopee opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        ref={frameRef}
        role={onExpand ? "button" : undefined}
        tabIndex={onExpand ? 0 : undefined}
        onClick={onExpand}
        onKeyDown={(e) => {
          if (onExpand && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onExpand();
          }
        }}
        aria-label={onExpand ? "Expand product demo video" : undefined}
        className={`relative overflow-hidden rounded-xl ${aspectClassName} ${onExpand ? "cursor-pointer" : ""} border border-gray-200/70 dark:border-gray-700/50 transition-colors duration-500 group-hover:border-transparent`}
      >
        <video
          ref={videoRef}
          key={`hero-inline-${index}`}
          autoPlay={active}
          muted
          playsInline
          preload={active ? "auto" : "none"}
          poster={poster}
          onEnded={() => setIndex((i) => (i + 1) % sources.length)}
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            dimmed
              ? "grayscale opacity-[0.28] group-hover:grayscale-0 group-hover:opacity-100"
              : ""
          }`}
        >
          {active && (
            <>
              <source
                src={currentSrc.replace(".webm", "-mobile.webm")}
                type="video/webm"
                media="(max-width: 767px)"
              />
              <source
                src={currentSrc.replace(".webm", "-mobile.mp4")}
                type="video/mp4"
                media="(max-width: 767px)"
              />
              <source src={currentSrc} type="video/webm" />
              <source
                src={currentSrc.replace(".webm", ".mp4")}
                type="video/mp4"
              />
            </>
          )}
        </video>

        {onExpand && (
          <span className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-4 h-4" />
          </span>
        )}
      </div>
    </div>
  );
};

export default HeroVideoInline;
