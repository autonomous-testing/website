import React from "react";
import Link from "@docusaurus/Link";
import { Building2, Cloud, Code2, Dices, Eye, Landmark, RefreshCw, Route, ShoppingCart, Target } from "lucide-react";
import {
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiNextdotjs,
  SiSvelte,
  SiDjango,
  SiRubyonrails,
} from "@icons-pack/react-simple-icons";
import TagPill from "@site/src/components/blog/TagPill";

// Same card visual as the blog "Keep reading" cards (src/components/blog/RelatedPosts.tsx):
// gradient top bar, category pill, title, description — plus a per-page icon badge.
// Used for the programmatic pages' Related section and the /ai-testing hub.
type IconCmp = React.ComponentType<{ size?: number; color?: string }>;

const PILL_LABEL: Record<string, string> = {
  framework: "Framework",
  industry: "Industry",
  "use-case": "Use case",
};

const CATEGORY_ICON: Record<string, IconCmp> = {
  framework: Code2,
  industry: Building2,
  "use-case": Target,
};

// Real brand logos (simple-icons) for frameworks; rendered in currentColor so they
// stay legible on both themes and match the badge tint.
const FRAMEWORK_LOGO: Record<string, IconCmp> = {
  "ai-testing-react": SiReact,
  "ai-testing-angular": SiAngular,
  "ai-testing-vue": SiVuedotjs,
  "ai-testing-nextjs": SiNextdotjs,
  "ai-testing-svelte": SiSvelte,
  "ai-testing-django": SiDjango,
  "ai-testing-rails": SiRubyonrails,
};

// Per-page icons for industries / use-cases; fall back to the category icon.
const ICON_BY_SLUG: Record<string, IconCmp> = {
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
  const Icon: IconCmp =
    FRAMEWORK_LOGO[slug] || ICON_BY_SLUG[slug] || (category && CATEGORY_ICON[category]) || Code2;

  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white no-underline transition-all hover:-translate-y-1 hover:border-secondary-wopee/40 hover:no-underline hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-wopee/40"
    >
      <div className="h-2 bg-gradient-to-r from-secondary-wopee to-primary-wopee" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-secondary-wopee/10 text-secondary-wopee transition-colors group-hover:bg-secondary-wopee/20 dark:bg-primary-wopee/10 dark:text-primary-wopee dark:group-hover:bg-primary-wopee/20">
            <Icon size={20} color="currentColor" />
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
