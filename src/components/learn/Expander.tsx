import React from "react";
import { cn } from "@/lib/utils";
import { surface } from "./styles";

type ExpanderProps = {
  summary: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** "clip" = a video clip row (play icon + duration); "quiet" = a text-only disclosure. */
  variant?: "default" | "clip" | "quiet";
  /** Short label on the right of the summary, e.g. "2.5 min". */
  meta?: string;
  /** Inside an ExpanderGroup: no own border or radius. */
  grouped?: boolean;
  open?: boolean;
};

const Chevron = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-5 w-5 flex-shrink-0 fill-secondary-wopee dark:fill-primary-wopee transition-transform group-open:rotate-180"
  >
    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
  </svg>
);

const Play = () => (
  <span
    aria-hidden="true"
    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary-wopee text-white dark:bg-primary-wopee dark:text-black"
  >
    <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-current">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

// A native <details> disclosure: works without JavaScript, keyboard and screen-reader friendly.
export default function Expander({
  summary,
  children,
  className,
  id,
  variant = "default",
  meta,
  grouped = false,
  open,
}: ExpanderProps) {
  const quiet = variant === "quiet";
  return (
    <details
      id={id}
      open={open}
      className={cn(
        "group scroll-mt-24",
        !grouped && !quiet && cn("rounded-xl", surface),
        className,
      )}
    >
      <summary
        className={cn(
          "flex min-h-[48px] cursor-pointer list-none items-center gap-3 text-left leading-snug [&::-webkit-details-marker]:hidden rounded-xl",
          "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee",
          quiet
            ? "px-0 py-2 text-base font-semibold text-gray-800 dark:text-gray-200"
            : "px-4 py-3 font-semibold text-gray-900 hover:bg-black/[0.02] dark:text-gray-100 dark:hover:bg-white/[0.03]",
        )}
      >
        {variant === "clip" && <Play />}
        <span className="min-w-0 flex-1">{summary}</span>
        {meta && (
          <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-300">
            {meta}
          </span>
        )}
        <Chevron />
      </summary>
      <div className={cn(quiet ? "pb-2 pt-1" : "px-4 pb-5 pt-1")}>{children}</div>
    </details>
  );
}

/** Several expanders as one bordered list with hairline dividers. */
export function ExpanderGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl",
        surface,
        "[&>*+*]:[border-width:1px_0_0_0] [&>*+*]:border-solid [&>*+*]:border-gray-200 dark:[&>*+*]:border-white/10",
        className,
      )}
    >
      {children}
    </div>
  );
}
