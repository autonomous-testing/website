import React from "react";
import { cn } from "@/lib/utils";

// A native <details> disclosure: works without JavaScript, keyboard and screen-reader friendly.
export default function Expander({
  summary,
  children,
  className,
  id,
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <details
      id={id}
      className={cn(
        "group rounded-xl border border-solid border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 scroll-mt-24",
        className,
      )}
    >
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-left leading-snug font-semibold text-secondary-wopee dark:text-primary-wopee [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee">
        <span className="min-w-0">{summary}</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 flex-shrink-0 fill-current transition-transform group-open:rotate-180"
        >
          <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
        </svg>
      </summary>
      <div className="px-4 pb-4 pt-1">{children}</div>
    </details>
  );
}
