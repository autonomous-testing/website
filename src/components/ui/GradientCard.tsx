import React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "featured" | "solid";
type Padding = "compact" | "default" | "roomy" | "none";

const PADDINGS: Record<Padding, string> = {
  none: "",
  compact: "p-4",
  default: "p-5 sm:p-6",
  roomy: "p-8 lg:p-12",
};

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * default = hairline on light, gradient ring on dark (matches homepage hero)
   * featured = same ring with brighter shadow + xl:scale-105
   * solid = single layer: ink surface, with the purple glow on dark (for CTA cards)
   */
  variant?: Variant;
  padding?: Padding;
  /** Classes applied to the inner surface (default/featured variants only). */
  innerClassName?: string;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    {
      variant = "default",
      padding = "default",
      className,
      innerClassName,
      children,
      ...rest
    },
    ref
  ) => {
    if (variant === "solid") {
      return (
        <div
          ref={ref}
          className={cn(
            // Ink surface in both themes, so the yellow button never sits on purple.
            // Dark theme adds the purple glow of the dark hero and a hairline.
            "rounded-2xl bg-[#111827] text-white shadow-2xl shadow-gray-900/30 dark:shadow-purple-900/40 dark:ring-1 dark:ring-inset dark:ring-white/10 dark:[background-image:radial-gradient(circle_at_15%_85%,rgba(112,48,160,0.45),transparent_60%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.12),transparent_55%)]",
            PADDINGS[padding],
            className
          )}
          {...rest}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Light theme: a plain hairline and a soft shadow (DESIGN.md, Elevation).
          // Dark theme: the purple-to-yellow gradient ring.
          "p-[1.5px] rounded-2xl bg-gray-900/10 shadow-[0_24px_50px_rgba(76,29,149,0.14)] dark:bg-gradient-to-br dark:from-secondary-wopee dark:via-purple-500 dark:to-primary-wopee dark:shadow-2xl",
          variant === "featured"
            ? "dark:shadow-purple-900/70 xl:scale-105"
            : "dark:shadow-purple-900/50",
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            "bg-white dark:bg-gray-900 rounded-[14px] h-full",
            PADDINGS[padding],
            innerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
GradientCard.displayName = "GradientCard";

export default GradientCard;
