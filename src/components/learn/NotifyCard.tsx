import React from "react";
import NewsletterForm from "@/components/hub-spot/NewsletterForm";
import { learnConfig } from "@/data/learn-config";
import { cn } from "@/lib/utils";

type NotifyCardProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  body: string;
  className?: string;
};

// Same pattern as the blog's InPostCTA: the site's HubSpot form inside a white card.
export default function NotifyCard({
  id = "notify",
  eyebrow = "Notify me",
  heading,
  body,
  className,
}: NotifyCardProps) {
  return (
    <section
      id={id}
      className={cn(
        "rounded-2xl overflow-hidden bg-gradient-to-br from-secondary-wopee to-purple-800 dark:to-purple-900 text-white shadow-2xl shadow-purple-900/40",
        className,
      )}
    >
      <div className="grid lg:grid-cols-2 gap-6 p-6 sm:p-10 items-center">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-wopee">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-white">
            {heading}
          </h2>
          <p className="text-base text-white/85">{body}</p>
        </div>
        <div className="bg-white text-gray-900 rounded-xl p-4 sm:p-6 min-h-[180px] overflow-hidden">
          <div id="learn-notify-form" />
          <NewsletterForm
            formId={learnConfig.notifyFormId}
            target="#learn-notify-form"
          />
        </div>
      </div>
    </section>
  );
}
