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
   * solid = single layer: ink surface on light, purple gradient on dark (for CTA cards)
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
            // Light theme: ink surface (purple never sits beside a yellow button on light).
            // Dark theme: the purple gradient surface.
            "rounded-2xl bg-[#111827] dark:bg-gradient-to-br dark:from-secondary-wopee dark:to-purple-800 text-white shadow-2xl shadow-gray-900/30 dark:shadow-purple-900/50",
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
