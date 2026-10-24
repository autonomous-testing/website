import React, { useEffect, useRef, useState } from "react";

// Click-to-play explainer with sound. Files live in static/video/ under one
// base name: <base>.mp4 (1080p), <base>-720.mp4 (phones), <base>.vtt
// (captions), <base>-poster.webp with a <base>-poster.jpg fallback.
// Until the MP4 exists the player shows the poster (or a designed frame)
// without a play button, so the page never offers a video that 404s.

type Props = {
  base: string;
  title: string;
  duration: string;
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
  pendingNote,
}: Props) {
  const [availability, setAvailability] = useState<Availability>("checking");
  const [posterSrc, setPosterSrc] = useState<string | null>(
    `/video/${base}-poster.webp`,
  );
  const [playing, setPlaying] = useState(false);
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
          setAvailability(
            res.ok && type.startsWith("video/") ? "ready" : "missing",
          );
      })
      .catch(() => !cancelled && setAvailability("missing"));
    return () => {
      cancelled = true;
    };
  }, [base]);

  const onPosterError = () => {
    setPosterSrc((current) =>
      current?.endsWith(".webp") ? `/video/${base}-poster.jpg` : null,
    );
  };

  // The <video> stays mounted from the first render and play() runs inside the
  // tap handler: iOS Safari leaves a play() that is called on a freshly mounted
  // preload="none" element pending forever (readyState 0, no request sent).
  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    const small = window.matchMedia("(max-width: 767px)").matches;
    v.src = `/video/${base}${small ? "-720" : ""}.mp4`;
    v.load();
    v.play().catch(() => undefined);
    setPlaying(true);
    v.focus();
    track("explainer_play", { video: base });
  };

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
        <video
          ref={videoRef}
          tabIndex={playing ? 0 : -1}
          aria-hidden={playing ? undefined : true}
          controls={playing}
          playsInline
          preload="none"
          poster={posterSrc ?? undefined}
          className={`absolute inset-0 h-full w-full bg-black ${playing ? "" : "invisible"}`}
          aria-label={title}
          onTimeUpdate={onTimeUpdate}
          onEnded={() => track("explainer_complete", { video: base })}
        >
          <track
            kind="captions"
            src={`/video/${base}.vtt`}
            srcLang="en"
            label="English"
          />
        </video>
        {!playing ? (
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
                className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 border-0 bg-transparent bg-[radial-gradient(circle_at_center,rgba(11,10,16,0.6)_0%,rgba(11,10,16,0.25)_28%,transparent_55%)] p-0 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-wopee"
              >
                <span className="relative flex h-[72px] w-[72px] items-center justify-center sm:h-24 sm:w-24">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-primary-wopee/40 opacity-0 transition duration-500 group-hover:scale-[1.35] group-hover:opacity-100 group-focus-visible:scale-[1.35] group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="relative flex h-full w-full items-center justify-center rounded-full bg-primary-wopee text-[#1a1124] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.75)] ring-4 ring-black/20 transition duration-300 group-hover:scale-105 group-focus-visible:ring-white motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 h-8 w-8 fill-current sm:h-10 sm:w-10"
                    >
                      <path d="M7 4.8v14.4a.8.8 0 0 0 1.2.7l11.5-7.2a.8.8 0 0 0 0-1.4L8.2 4.1A.8.8 0 0 0 7 4.8z" />
                    </svg>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm"
                >
                  Watch · {duration}
                </span>
              </button>
            ) : null}
          </>
        ) : null}
      </div>
      {availability === "missing" ? (
        <figcaption className="mt-3 text-sm text-white/70">
          {pendingNote}
        </figcaption>
      ) : (
        <figcaption className="sr-only">{title}</figcaption>
      )}
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
