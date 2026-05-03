import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import { Clock } from "lucide-react";
import TagPill from "./TagPill";
import { cn } from "@/lib/utils";
import { formatReadingTime } from "./blogFormatting";

type BlogPostCardProps = {
  children?: ReactNode;
  className?: string;
};

export default function BlogPostCard({ className }: BlogPostCardProps) {
  const { metadata, assets } = useBlogPost();
  const { permalink, title, description, readingTime, tags } = metadata;

  const cover = assets.image ?? (metadata.frontMatter as any)?.image;
  const tag = tags[0];

  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl overflow-hidden",
        "bg-white dark:bg-gray-900",
        "border border-gray-200 dark:border-gray-800",
        "shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-secondary-wopee/40 dark:hover:border-primary-wopee/40",
        "transition-all duration-200",
        className,
      )}
    >
      <Link
        to={permalink}
        aria-label={title}
        className="block aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary-wopee/30 to-primary-wopee/30 no-underline"
      >
        {cover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary-wopee/40 dark:text-primary-wopee/40 text-5xl font-bold">
            W
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500 dark:text-gray-400">
          {tag && <TagPill label={tag.label} href={tag.permalink} />}
          {readingTime ? (
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {formatReadingTime(readingTime)}
            </span>
          ) : null}
        </div>

        <h3 className="text-xl font-semibold leading-tight text-gray-900 dark:text-white m-0">
          <Link
            to={permalink}
            className="no-underline text-inherit hover:text-secondary-wopee dark:hover:text-primary-wopee transition-colors"
          >
            {title}
          </Link>
        </h3>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 m-0">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}
