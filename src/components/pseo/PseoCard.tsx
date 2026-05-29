import React from "react";
import Link from "@docusaurus/Link";
import {
  Building2,
  Cloud,
  Code2,
  Dices,
  Eye,
  Landmark,
  RefreshCw,
  Route,
  ShoppingCart,
  Target,
  type LucideIcon,
} from "lucide-react";
import TagPill from "@site/src/components/blog/TagPill";

// Same card visual as the blog "Keep reading" cards (src/components/blog/RelatedPosts.tsx):
// gradient top bar, category pill, title, description — plus a per-page icon badge.
// Used for the programmatic pages' Related section and the /ai-testing hub.
const PILL_LABEL: Record<string, string> = {
  framework: "Framework",
  industry: "Industry",
  "use-case": "Use case",
};

const CATEGORY_ICON: Record<string, LucideIcon> = {
  framework: Code2,
  industry: Building2,
  "use-case": Target,
};

// Per-page overrides where a clearer icon exists; falls back to the category icon
// (frameworks have no distinct brand logos in lucide, so they all use the
// framework category icon for a consistent look).
const ICON_BY_SLUG: Record<string, LucideIcon> = {
  "ai-testing-fintech": Landmark,
  "ai-testing-ecommerce": ShoppingCart,
  "ai-testing-saas": Cloud,
  "ai-testing-igaming": Dices,
  "ai-regression-testing": RefreshCw,
  "ai-visual-testing": Eye,
  "ai-e2e-testing": Route,
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
  const slug = href.replace(/^\/|\/$/g, "");
  const IconCmp = ICON_BY_SLUG[slug] || (category && CATEGORY_ICON[category]) || Code2;

  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white no-underline transition-all hover:-translate-y-1 hover:border-secondary-wopee/40 hover:no-underline hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-wopee/40"
    >
      <div className="h-2 bg-gradient-to-r from-secondary-wopee to-primary-wopee" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-secondary-wopee/10 text-secondary-wopee transition-colors group-hover:bg-secondary-wopee/20 dark:bg-primary-wopee/10 dark:text-primary-wopee dark:group-hover:bg-primary-wopee/20">
            <IconCmp size={20} strokeWidth={2} />
          </span>
          {category && <TagPill label={PILL_LABEL[category]} />}
        </div>
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
