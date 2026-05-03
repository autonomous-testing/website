import React from "react";
import Link from "@docusaurus/Link";
import { cn } from "@/lib/utils";

type TagPillProps = {
  label: string;
  href?: string;
  className?: string;
};

export default function TagPill({ label, href, className }: TagPillProps) {
  const base = cn(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
    "bg-secondary-wopee/10 text-secondary-wopee",
    "dark:bg-primary-wopee/15 dark:text-primary-wopee",
    "transition-colors",
    href && "hover:bg-secondary-wopee/20 dark:hover:bg-primary-wopee/25",
    className,
  );

  if (href) {
    return (
      <Link to={href} className={cn(base, "no-underline")}>
        {label}
      </Link>
    );
  }
  return <span className={base}>{label}</span>;
}
