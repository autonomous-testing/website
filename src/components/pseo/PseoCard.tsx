import React from "react";
import Link from "@docusaurus/Link";
import TagPill from "@site/src/components/blog/TagPill";

// Same card visual as the blog "Keep reading" cards (src/components/blog/RelatedPosts.tsx):
// gradient top bar, category pill, title, description. Used for the programmatic
// pages' Related section and the /ai-testing hub.
const PILL_LABEL: Record<string, string> = {
  framework: "Framework",
  industry: "Industry",
  "use-case": "Use case",
};

export default function PseoCard({
  href,
  category,
  title,
  description,
}: {
  href: string;
  category?: "framework" | "industry" | "use-case";
  title: string;
  description?: string;
}) {
  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white no-underline transition-all hover:-translate-y-1 hover:border-secondary-wopee/40 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-wopee/40"
    >
      <div className="h-2 bg-gradient-to-r from-secondary-wopee to-primary-wopee" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        {category && <TagPill label={PILL_LABEL[category]} />}
        <h3 className="m-0 text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-secondary-wopee dark:text-white dark:group-hover:text-primary-wopee">
          {title}
        </h3>
        {description && (
          <p className="m-0 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>
    </Link>
  );
}
