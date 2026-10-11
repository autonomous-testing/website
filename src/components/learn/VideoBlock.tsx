import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { cn } from "@/lib/utils";
import LyingCheck from "./LyingCheck";

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
        "relative w-full aspect-video overflow-hidden rounded-2xl border border-solid border-white/10 shadow-2xl shadow-black/40 bg-[#0d0d0d]",
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
    className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 bg-[#0d0d0d] px-6 text-center"
    role="img"
    aria-label="Green Is Not Correct, video poster"
  >
    <LyingCheck size="lg" />
    <span
      style={{ fontFamily: 'Bungee, "Arial Black", sans-serif' }}
      className="text-3xl sm:text-5xl uppercase leading-none text-primary-wopee"
    >
      Green is not correct
    </span>
  </div>
);
