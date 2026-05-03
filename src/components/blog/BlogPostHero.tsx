import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import { Clock, Calendar } from "lucide-react";
import TagPill from "./TagPill";
import { cn } from "@/lib/utils";
import { formatPostDate, formatReadingTime } from "./blogFormatting";

type BlogPostHeroProps = {
  className?: string;
};

export default function BlogPostHero({ className }: BlogPostHeroProps) {
  const { metadata, assets } = useBlogPost();
  const { title, date, readingTime, tags, authors } = metadata;

  const cover = assets.image ?? (metadata.frontMatter as any)?.image;

  return (
    <header className={cn("not-prose mb-10", className)}>
      {cover && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <img
            src={cover}
            alt=""
            className="w-full h-[180px] sm:h-[220px] object-cover"
          />
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {tags.map((t) => (
            <TagPill key={t.permalink} label={t.label} href={t.permalink} />
          ))}
        </div>
      )}

      <h1
        className={cn(
          "m-0 mb-6 font-bold tracking-tight text-gray-900 dark:text-white",
          "text-3xl sm:text-4xl lg:text-5xl leading-tight",
        )}
      >
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
        {authors.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {authors.map((a, i) => {
                const img = assets.authorsImageUrls?.[i] ?? a.imageURL;
                if (!img) return null;
                return (
                  <img
                    key={a.key ?? a.name ?? i}
                    src={img}
                    alt={a.name ?? ""}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
                    loading="lazy"
                  />
                );
              })}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-gray-900 dark:text-white">
                {authors.map((a) => a.name).filter(Boolean).join(", ")}
              </span>
              {authors[0]?.title && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {authors[0].title}
                </span>
              )}
            </div>
          </div>
        )}

        <span className="hidden sm:inline-block w-px h-8 bg-gray-200 dark:bg-gray-800" />

        <div className="inline-flex items-center gap-1.5">
          <Calendar size={14} />
          {formatPostDate(date)}
        </div>

        {readingTime ? (
          <div className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {formatReadingTime(readingTime)}
          </div>
        ) : null}
      </div>
    </header>
  );
}
