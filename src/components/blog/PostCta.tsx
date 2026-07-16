import React from "react";
import Link from "@docusaurus/Link";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import GradientCard from "@/components/ui/GradientCard";
import { cmdBaseUrl } from "../../../cmdBaseUrl";
import { cn } from "@/lib/utils";

type PostCtaProps = {
  className?: string;
};

export default function PostCta({ className }: PostCtaProps) {
  return (
    <aside className={cn("not-prose my-10", className)}>
      <GradientCard innerClassName="flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 sm:px-8">
        <div className="text-center sm:text-left">
          <p className="text-lg sm:text-xl font-bold m-0 text-balance">
            Point Wopee.io&apos;s testing agents at your web app.
          </p>
          <p className="text-sm m-0 mt-1 text-gray-600 dark:text-gray-300">
            First tests in minutes. No credit card required.
          </p>
        </div>
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <ButtonPrimary
            id="cta-blog-post-footer"
            label="Start for free"
            href={`${cmdBaseUrl}/login`}
            className="w-52 h-[46px]"
          />
          <Link
            href="/book-demo/"
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-secondary-wopee dark:hover:text-primary-wopee hover:no-underline"
          >
            or book a 30-min demo
          </Link>
        </div>
      </GradientCard>
    </aside>
  );
}
