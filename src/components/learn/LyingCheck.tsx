import React from "react";
import { cn } from "@/lib/utils";

type LyingCheckProps = {
  /** Visible label next to the tick. Empty = the tick alone (a mark or bullet). */
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: { pill: "h-5 gap-1 px-1.5 text-[11px]", icon: "h-3 w-3" },
  md: { pill: "h-7 gap-1.5 px-2.5 text-sm", icon: "h-4 w-4" },
  lg: { pill: "h-10 gap-2 px-4 text-lg", icon: "h-5 w-5" },
};

// The series mark: a green "✓ passed" pill cracked by a red diagonal.
// Green is not correct. Decorative; the text around it carries the meaning.
export default function LyingCheck({ label = "passed", size = "md", className }: LyingCheckProps) {
  const s = SIZES[size];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex flex-shrink-0 items-center overflow-hidden rounded-full bg-green-700 font-mono font-bold normal-case tracking-normal leading-none text-white",
        label ? s.pill : cn(s.pill, "aspect-square justify-center px-0"),
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className={s.icon} fill="none">
        <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label && <span>{label}</span>}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M18 108 L44 58 L36 50 L66 -8"
          stroke="#ef4444"
          strokeWidth="9"
          fill="none"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: 2.5 }}
        />
      </svg>
    </span>
  );
}
