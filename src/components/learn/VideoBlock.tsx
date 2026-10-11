import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { cn } from "@/lib/utils";

type VideoBlockProps = {
  /** YouTube video id. Empty = poster (or branded placeholder) and `comingLabel`. */
  videoId: string;
  title: string;
  poster?: string;
  comingLabel: string;
  className?: string;
};

// Click-to-load YouTube embed: no YouTube request until the viewer presses play,
// and the privacy-enhanced youtube-nocookie.com domain after that.
export default function VideoBlock({
  videoId,
  title,
  poster,
  comingLabel,
  className,
}: VideoBlockProps) {
  const [playing, setPlaying] = useState(false);
  const posterUrl = useBaseUrl(poster || "");
  const thumb = videoId
    ? poster
      ? posterUrl
      : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : poster
      ? posterUrl
      : "";

  return (
    <div
      className={cn(
        "relative w-full aspect-video overflow-hidden rounded-2xl border border-solid border-secondary-wopee/20 dark:border-primary-wopee/20 shadow-2xl shadow-purple-900/30 bg-gray-950",
        className,
      )}
    >
      {videoId && playing ? (
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {thumb ? (
            <img
              src={thumb}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Placeholder />
          )}
          {videoId ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play: ${title}`}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 border-0 cursor-pointer transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-wopee"
            >
              <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary-wopee shadow-xl">
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-secondary-wopee" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          ) : (
            <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 sm:p-6">
              <span className="rounded-full bg-black/60 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                {comingLabel}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const Placeholder = () => (
  <div
    className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 bg-gradient-to-br from-secondary-wopee via-purple-900 to-gray-950 px-6 text-center"
    role="img"
    aria-label="Green Is Not Correct, video poster"
  >
    <span className="relative inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-1.5 sm:px-6 sm:py-2 font-mono text-base sm:text-2xl font-bold text-gray-950">
      ✓ 1 passed
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[3px] w-[115%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded bg-red-500"
      />
    </span>
    <span className="text-2xl sm:text-5xl font-bold leading-tight text-white">
      Green Is Not Correct
    </span>
    <span className="hidden sm:block text-base uppercase tracking-widest text-primary-wopee">
      Agentic testing for testers
    </span>
  </div>
);
