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
   * default = the plain card: a hairline in both themes (no gradient ring)
   * featured = the recommended option in a comparison: the purple glow (soft on light) and a stronger hairline
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
          // One card family (DESIGN.md, Components): a hairline in both themes.
          // The gradient ring is reserved for the homepage form; it is never on cards in a grid.
          // featured = the recommended option in a comparison: an ink hairline on light,
          // the purple glow of the dark hero on dark.
          "p-[1.5px] rounded-2xl",
          variant === "featured"
            ? "bg-gray-900 shadow-[0_24px_50px_rgba(76,29,149,0.18)] dark:bg-white/20 dark:shadow-[0_24px_60px_rgba(59,7,100,0.45)] xl:scale-105"
            : "bg-gray-900/10 shadow-[0_24px_50px_rgba(76,29,149,0.10)] dark:bg-white/10 dark:shadow-none",
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            "bg-white dark:bg-gray-900 rounded-[14px] h-full",
            variant === "featured" &&
              "[background-image:radial-gradient(circle_at_15%_85%,rgba(112,48,160,0.16),transparent_60%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.07),transparent_55%)] dark:[background-image:radial-gradient(circle_at_15%_85%,rgba(112,48,160,0.45),transparent_60%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.12),transparent_55%)]",
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
