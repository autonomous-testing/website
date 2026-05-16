import React from "react";
import Link from "@docusaurus/Link";
import { Clock, ArrowRight } from "lucide-react";
import type { PropBlogPostContent } from "@docusaurus/plugin-content-blog";
import TagPill from "./TagPill";
import { cn } from "@/lib/utils";
import { formatReadingTime } from "./blogFormatting";

type FeaturedPostHeroProps = {
  post: PropBlogPostContent;
  className?: string;
};

export default function FeaturedPostHero({ post, className }: FeaturedPostHeroProps) {
  const { metadata, assets } = post;
  const { permalink, title, description, readingTime, tags } = metadata;

  const cover = assets.image ?? (metadata.frontMatter as any)?.image;
  const tag = tags[0];

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "border border-gray-200 dark:border-gray-800",
        "bg-white dark:bg-gray-900",
        "shadow-lg",
        className,
      )}
    >
      <div className="grid lg:grid-cols-2 gap-0">
        <Link
          to={permalink}
          aria-label={title}
          className="block aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary-wopee/30 to-primary-wopee/30 no-underline group"
        >
          {cover ? (
            <img
              src={cover}
              alt=""
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary-wopee/40 dark:text-primary-wopee/40 text-9xl font-bold">
              W
            </div>
          )}
        </Link>

        <div className="flex flex-col justify-center p-8 sm:p-12 gap-5">
          <div className="flex items-center gap-3 flex-wrap text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee">
              <span className="w-8 h-px bg-secondary-wopee dark:bg-primary-wopee" />
              Latest post
            </span>
            {tag && <TagPill label={tag.label} href={tag.permalink} />}
            {readingTime ? (
              <span className="inline-flex items-center gap-1">
                <Clock size={14} />
                {formatReadingTime(readingTime)}
              </span>
            ) : null}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white m-0">
            <Link
              to={permalink}
              className="no-underline text-inherit hover:text-secondary-wopee dark:hover:text-primary-wopee transition-colors"
            >
              {title}
            </Link>
          </h2>

          {description && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 line-clamp-3 m-0">
              {description}
            </p>
          )}

          <div className="pt-2">
            <Link
              to={permalink}
              className="inline-flex items-center gap-2 font-semibold text-secondary-wopee dark:text-primary-wopee no-underline hover:gap-3 transition-all"
            >
              Read more <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
