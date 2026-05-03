import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import { ArrowRight } from "lucide-react";
import TagPill from "./TagPill";
import { cn } from "@/lib/utils";
import { formatPostDate } from "./blogFormatting";

type RelatedPostInfo = {
  slug: string;
  permalink: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
};

type RelatedPostsProps = {
  currentPermalink: string;
  tags: string[];
  className?: string;
};

export default function RelatedPosts({
  currentPermalink,
  tags,
  className,
}: RelatedPostsProps) {
  const data = usePluginData("wopee-blog-related") as
    | { posts: RelatedPostInfo[] }
    | undefined;
  const all = data?.posts ?? [];

  const tagSet = new Set(tags.map((t) => t.toLowerCase()));
  const norm = (p: string) => p.replace(/\/+$/, "");
  const currentNorm = norm(currentPermalink);

  const scored = all
    .filter((p) => norm(p.permalink) !== currentNorm)
    .map((p) => {
      const overlap = p.tags.reduce(
        (n, t) => (tagSet.has(t.toLowerCase()) ? n + 1 : n),
        0,
      );
      return { post: p, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return a.post.date < b.post.date ? 1 : -1;
    })
    .slice(0, 3)
    .map(({ post }) => post);

  if (scored.length === 0) return null;

  return (
    <section className={cn("not-prose mt-16", className)}>
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold m-0 text-gray-900 dark:text-white">
          Keep reading
        </h2>
        <Link
          to="/blog"
          className="text-sm font-semibold text-secondary-wopee dark:text-primary-wopee no-underline inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          All posts <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {scored.map((p) => (
          <Link
            key={p.permalink}
            to={p.permalink}
            className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden no-underline hover:shadow-lg hover:-translate-y-1 hover:border-secondary-wopee/40 dark:hover:border-primary-wopee/40 transition-all"
          >
            <div className="h-2 bg-gradient-to-r from-secondary-wopee to-primary-wopee" />
            <div className="flex flex-col flex-1 p-5 gap-3">
              {p.tags[0] && <TagPill label={p.tags[0]} />}
              <h3 className="text-lg font-semibold leading-snug m-0 text-gray-900 dark:text-white group-hover:text-secondary-wopee dark:group-hover:text-primary-wopee transition-colors">
                {p.title}
              </h3>
              {p.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 m-0">
                  {p.description}
                </p>
              )}
              {p.date && (
                <span className="mt-auto pt-3 text-xs text-gray-500 dark:text-gray-400">
                  {formatPostDate(p.date)}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
