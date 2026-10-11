import React from "react";
import Link from "@docusaurus/Link";
import { cn } from "@/lib/utils";

type LearnButtonProps = {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  id?: string;
};

// A single styled Link (no nested <button>), with a visible keyboard focus ring.
export default function LearnButton({
  to,
  children,
  variant = "primary",
  className,
  id,
}: LearnButtonProps) {
  return (
    <Link
      to={to}
      id={id}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold transition-colors hover:no-underline",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee",
        variant === "primary"
          ? "bg-secondary-wopee text-white hover:bg-purple-800 hover:text-white dark:bg-primary-wopee dark:text-secondary-wopee dark:hover:bg-yellow-300 dark:hover:text-secondary-wopee"
          : "border border-solid border-secondary-wopee/40 text-secondary-wopee hover:border-secondary-wopee hover:text-secondary-wopee dark:border-primary-wopee/40 dark:text-primary-wopee dark:hover:border-primary-wopee dark:hover:text-primary-wopee",
        className,
      )}
    >
      {children}
    </Link>
  );
}
