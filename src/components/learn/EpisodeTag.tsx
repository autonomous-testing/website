import React from "react";
import { cn } from "@/lib/utils";

// Series marker above a tutorial's H1: the slate's yellow rule plus "Episode N".
export default function EpisodeTag({ n, className }: { n: number; className?: string }) {
  return (
    <p className={cn("m-0 flex items-center gap-3", className)}>
      <span aria-hidden="true" className="h-1 w-10 rounded-full bg-primary-wopee" />
      <span className="text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300">
        Green Is Not Correct · Episode {n}
      </span>
    </p>
  );
}
