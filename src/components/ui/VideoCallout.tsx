import React from "react";
import Link from "@docusaurus/Link";

import { videos, videoPath, videoThumbnail } from "@site/src/data/videos";

export default function VideoCallout({
  heading = "See it in action",
  text,
  slug,
}: {
  heading?: string;
  text: string;
  slug?: string;
}) {
  const video = videos.find((v) => v.slug === slug) ?? videos[0];
  return (
    <section className="container my-12 px-5 lg:my-16 lg:px-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:flex-row sm:p-6 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
        <Link to={videoPath(video)} className="block w-full shrink-0 sm:w-64">
          <img
            src={videoThumbnail(video)}
            alt={video.thumbnailAlt}
            width={1280}
            height={720}
            loading="lazy"
            className="aspect-video h-auto w-full rounded-lg object-cover"
          />
        </Link>
        <div>
          <h2 className="m-0 text-2xl font-bold">{heading}</h2>
          <p className="mb-3 mt-2 text-base text-slate-600 dark:text-slate-300">
            {text}
          </p>
          <Link
            to={videoPath(video)}
            className="font-semibold text-secondary-wopee hover:no-underline dark:text-primary-wopee"
          >
            Watch the {video.duration} video &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
