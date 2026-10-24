import React, { useEffect, useRef, useState } from "react";

// Click-to-play explainer with sound. Files live in static/video/ under one
// base name: <base>.mp4 (1080p), <base>-720.mp4 (phones), <base>.vtt
// (captions), <base>-poster.webp with a <base>-poster.png fallback.
// Until the MP4 exists the player shows the poster (or a designed frame)
// without a play button, so the page never offers a video that 404s.

type Props = {
  base: string;
  title: string;
  duration: string;
  disclosure: string;
  pendingNote: string;
};

type Availability = "checking" | "ready" | "missing";

const track = (event: string, params: Record<string, string | number> = {}) => {
  const w = window as typeof window & { dataLayer?: object[] };
  w.dataLayer?.push({ event, page_path: window.location.pathname, ...params });
};

export default function ExplainerVideo({
  base,
  title,
  duration,
  disclosure,
  pendingNote,
}: Props) {
  const [availability, setAvailability] = useState<Availability>("checking");
  const [posterSrc, setPosterSrc] = useState<string | null>(
    `/video/${base}-poster.webp`
  );
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(`/video/${base}.mp4`);
  const videoRef = useRef<HTMLVideoElement>(null);
  const milestones = useRef(new Set<number>());

  // The dev server answers unknown paths with the HTML shell and a 200, so
  // only a video content type counts as "the file is there".
  useEffect(() => {
    let cancelled = false;
    fetch(`/video/${base}.mp4`, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        if (!cancelled)
          setAvailability(res.ok && type.startsWith("video/") ? "ready" : "missing");
      })
      .catch(() => !cancelled && setAvailability("missing"));
    return () => {
      cancelled = true;
    };
  }, [base]);

  const onPosterError = () => {
    setPosterSrc((current) =>
      current?.endsWith(".webp") ? `/video/${base}-poster.png` : null
    );
  };

  const start = () => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    setSrc(`/video/${base}${small ? "-720" : ""}.mp4`);
    setPlaying(true);
    track("explainer_play", { video: base });
  };

  useEffect(() => {
    if (!playing) return;
    videoRef.current?.focus();
    videoRef.current?.play().catch(() => undefined);
  }, [playing]);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const pct = (v.currentTime / v.duration) * 100;
    for (const mark of [25, 50, 75]) {
      if (pct >= mark && !milestones.current.has(mark)) {
        milestones.current.add(mark);
        track("explainer_progress", { video: base, percent: mark });
      }
    }
  };

  const ready = availability === "ready";
  // While the files are missing, a short frame instead of a full 16:9 box.
  const frame =
    availability === "missing" ? "min-h-48 sm:min-h-56" : "aspect-video";

  return (
    <figure className="m-0">
      <div
        className={`relative ${frame} w-full max-w-full overflow-hidden rounded-2xl border border-solid border-white/15 bg-[#0b0a10] shadow-[0_30px_80px_-30px_rgba(112,48,160,0.65)]`}
      >
        {playing ? (
          <video
            ref={videoRef}
            tabIndex={0}
            controls
            playsInline
            preload="none"
            poster={posterSrc ?? undefined}
            className="absolute inset-0 h-full w-full bg-black"
            aria-label={title}
            onTimeUpdate={onTimeUpdate}
            onEnded={() => track("explainer_complete", { video: base })}
          >
            <source src={src} type="video/mp4" />
            <track
              kind="captions"
              src={`/video/${base}.vtt`}
              srcLang="en"
              label="English"
            />
          </video>
        ) : (
          <>
            {posterSrc ? (
              <img
                src={posterSrc}
                alt={title}
                onError={onPosterError}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <PlaceholderFrame title={title} />
            )}
            {ready ? (
              <button
                type="button"
                onClick={start}
                aria-label={`Play: ${title} (${duration}, with sound)`}
                className="group absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-black/10 p-0 transition hover:bg-black/0 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-wopee"
              >
                <span className="flex items-center gap-3 rounded-full bg-primary-wopee py-3 pl-4 pr-6 text-base font-bold text-[#1a1124] shadow-lg transition group-hover:scale-105 motion-reduce:transition-none">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-current"
                  >
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                  Play · {duration}
                </span>
              </button>
            ) : null}
          </>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-white/70">
        <span className="font-semibold text-white">{title}</span>
        <span>{availability === "missing" ? pendingNote : disclosure}</span>
      </figcaption>
    </figure>
  );
}

function PlaceholderFrame({ title }: { title: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_30%_20%,rgba(112,48,160,0.55),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgba(255,204,0,0.12),transparent_55%)] px-6 text-center"
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary-wopee">
        Fri 17:02 · before release
      </span>
      <span className="max-w-md text-xl font-extrabold leading-tight text-white sm:text-3xl">
        {title}
      </span>
    </div>
  );
}
