import React from "react";
import GradientCard from "@/components/ui/GradientCard";
import NotifyInline from "./NotifyInline";
import { cn } from "@/lib/utils";

type NotifyCardProps = {
  id?: string;
  /** Element id of the form, for analytics. */
  formId?: string;
  eyebrow?: string;
  heading: string;
  body: string;
  cta?: string;
  note?: string;
  className?: string;
};

// The site's solid purple CTA card with the inline email form (the HubSpot
// Learners form, posted directly: no embed, no HubSpot branding).
export default function NotifyCard({
  id = "notify",
  formId = "cta-learn-notify-card",
  eyebrow = "Notify me",
  heading,
  body,
  cta = "Notify me",
  note = "One email when it opens. Unsubscribe anytime.",
  className,
}: NotifyCardProps) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={cn("scroll-mt-24", className)}>
      <GradientCard variant="solid" padding="none">
        <div className="grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-2">
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-primary-wopee">
              {eyebrow}
            </p>
            <h2 id={`${id}-h`} className="m-0 text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-white text-balance">
              {heading}
            </h2>
            <p className="m-0 text-base text-white/85">{body}</p>
          </div>
          <NotifyInline id={formId} tone="dark" cta={cta} note={note} />
        </div>
      </GradientCard>
    </section>
  );
}
