import React from "react";
import NewsletterForm from "@/components/hub-spot/NewsletterForm";
import { cn } from "@/lib/utils";

type InPostCTAProps = {
  className?: string;
  heading?: string;
  body?: string;
};

export default function InPostCTA({
  className,
  heading = "Ship AI agents that actually test your web app",
  body = "Monthly playbooks from teams replacing brittle E2E suites with AI testing agents — with visual testing tactics when pixels matter.",
}: InPostCTAProps) {
  return (
    <aside
      className={cn(
        "not-prose my-12 rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-secondary-wopee to-purple-800 dark:from-secondary-wopee dark:to-purple-900",
        "text-white shadow-2xl shadow-purple-900/40",
        className,
      )}
    >
      <div className="grid md:grid-cols-2 gap-6 p-8 sm:p-10 items-center">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-wopee">
            Newsletter
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight m-0">
            {heading}
          </h3>
          <p className="text-base text-white/85 m-0">{body}</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5">
          <div id="newsletter-form-container" />
          <NewsletterForm />
        </div>
      </div>
    </aside>
  );
}
