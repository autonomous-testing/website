import React from "react";
import Link from "@docusaurus/Link";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { cmdBaseUrl } from "../../../cmdBaseUrl";
import { cn } from "@/lib/utils";

type PostCtaProps = {
  className?: string;
};

export default function PostCta({ className }: PostCtaProps) {
  return (
    <aside
      className={cn(
        "not-prose my-12 rounded-2xl border border-gray-200 dark:border-gray-800",
        "flex flex-col items-center gap-4 p-8 sm:p-10 text-center",
        className,
      )}
    >
      <p className="text-lg sm:text-xl font-semibold m-0 text-balance">
        Point Wopee.io&apos;s testing agents at your web app. First tests in
        minutes.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <ButtonPrimary
          id="cta-blog-post-footer"
          label="Start for free"
          href={`${cmdBaseUrl}/login`}
          className="w-60 h-[50px]"
        />
        <Link
          href="/book-demo/"
          className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline"
        >
          Book a demo
        </Link>
      </div>
      <span className="text-sm italic text-gray-500 dark:text-gray-400">
        No credit card required
      </span>
    </aside>
  );
}
