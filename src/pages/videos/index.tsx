import React from "react";

import { Head, Layout, Link } from "../../components/ui/typedDocusaurus";
import {
  videos,
  videoPath,
  videoThumbnail,
  YOUTUBE_CHANNEL_URL,
} from "../../data/videos";

const PAGE_URL = "https://wopee.io/videos/";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#page`,
  name: "Wopee.io videos",
  url: PAGE_URL,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://wopee.io${videoPath(v)}`,
      name: v.title,
    })),
  },
};

export default function VideosIndex(): JSX.Element {
  return (
    <Layout
      title="Videos: AI Testing Agents in Action"
      description="Watch Wopee.io AI testing agents at work: demos with Cursor, Claude Code, Playwright and Jira, each with chapters and a full transcript."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(JSON_LD)}</script>
      </Head>
      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <h1 className="mb-4 text-[28px] font-extrabold leading-[1.15] tracking-tight sm:text-4xl">
          Videos
        </h1>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
          Short demos of Wopee.io AI testing agents working with the tools you
          already use. Every video has chapters and a full transcript.
        </p>

        <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <li key={v.slug} className="m-0">
              <Link
                to={videoPath(v)}
                className={`group flex h-full flex-col overflow-hidden rounded-xl border border-solid border-gray-200 bg-white text-inherit no-underline shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] transition hover:border-secondary-wopee hover:text-inherit hover:no-underline dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-primary-wopee ${FOCUS}`}
              >
                <span className="relative block aspect-video bg-black">
                  <img
                    src={videoThumbnail(v)}
                    alt={v.thumbnailAlt}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="h-full w-full bg-black object-cover"
                  />
                  <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 font-mono text-xs font-semibold text-white">
                    {v.duration}
                  </span>
                </span>
                <span className="flex flex-1 flex-col gap-2 p-5">
                  <span className="text-lg font-bold leading-snug group-hover:text-secondary-wopee dark:group-hover:text-primary-wopee">
                    {v.title}
                  </span>
                  <span className="text-[15px] leading-6 text-gray-600 dark:text-gray-300">
                    {v.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-base">
          More on the{" "}
          <Link href={YOUTUBE_CHANNEL_URL}>Wopee.io YouTube channel (@wopee)</Link>
          .
        </p>
      </main>
    </Layout>
  );
}
