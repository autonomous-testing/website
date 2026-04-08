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
   * default = gradient ring + dark inner (matches homepage hero)
   * featured = same ring with brighter shadow + xl:scale-105
   * solid = single layer, solid purple gradient surface (for CTA cards)
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
            "rounded-2xl bg-gradient-to-br from-secondary-wopee to-purple-800 text-white shadow-2xl shadow-purple-900/50",
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
          "p-[1.5px] rounded-2xl bg-gradient-to-br from-secondary-wopee via-purple-500 to-primary-wopee shadow-2xl",
          variant === "featured"
            ? "shadow-purple-900/70 xl:scale-105"
            : "shadow-purple-900/50",
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
