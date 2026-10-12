import React from "react";
import Link from "@docusaurus/Link";
import { cn } from "@/lib/utils";
import { focusRing } from "./styles";

// One breadcrumb for every /learn sub-page: "Learn / <here>".
export default function Breadcrumb({ here, className }: { here: string; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
        <li>
          <Link
            to="/learn/"
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-md font-semibold text-secondary-wopee hover:underline underline-offset-4 dark:text-gray-100 dark:underline dark:decoration-primary-wopee/60 dark:hover:text-white",
              focusRing,
            )}
          >
            Learn
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-500 dark:text-gray-400">/</li>
        <li aria-current="page" className="text-gray-700 dark:text-gray-300">
          {here}
        </li>
      </ol>
    </nav>
  );
}
