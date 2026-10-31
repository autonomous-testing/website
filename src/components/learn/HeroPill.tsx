import React from "react";
import { cn } from "@/lib/utils";

// The homepage hero pill (HomeHeroVibe): a dot and a short line, e.g. "New · Free tutorials".
export default function HeroPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "m-0 inline-flex items-center gap-2 rounded-full border border-solid border-gray-900/10 bg-gray-900/5 px-3 py-1.5 text-xs font-medium text-gray-700 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-gray-200 sm:gap-3 sm:px-4 sm:text-sm",
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee" />
      <span>{children}</span>
    </p>
  );
}
