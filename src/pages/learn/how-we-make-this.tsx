import React from "react";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

import HowThisWasMade from "@/components/learn/HowThisWasMade";
import Breadcrumb from "@/components/learn/Breadcrumb";
import { accent, container, h1, h2 } from "@/components/learn/styles";
import { cn } from "@/lib/utils";
import { whyAiSummary, whyAiPoints } from "@/data/learn-why-ai";

// The link target for "How we make this" in the video descriptions.
const HowWeMakeThisPage = () => {
  const photo = useBaseUrl("/img/learn/marcel.jpg");
  return (
    <Layout
      title="How We Make the Free Tutorials"
      description="The free Wopee.io tutorials are made with AI and checked by Marcel Veselka: what AI does, what stays human, and why the narration is a voice clone."
    >
      <PageMetadata image="/img/learn/learn-og.jpg" />
      <main className={cn(container, "pt-6 pb-16 lg:pt-12")}>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <Breadcrumb here="How we make this" />
          <h1 className={h1}>
            Made with AI, <span className={accent}>checked by me</span>
          </h1>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
            <img
              src={photo}
              alt="Marcel Veselka"
              width={144}
              height={144}
              className="h-28 w-28 flex-shrink-0 rounded-2xl object-cover shadow-xl shadow-purple-900/20 sm:h-36 sm:w-36"
            />
            <div className="min-w-0">
              <blockquote className="m-0 border-0 border-l-4 border-solid border-secondary-wopee p-0 pl-5 text-lg leading-relaxed text-gray-800 dark:border-primary-wopee dark:text-gray-200">
                {whyAiSummary}
              </blockquote>
              <p className="m-0 mt-3 pl-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Marcel Veselka · Founder of Wopee.io
              </p>
            </div>
          </div>
          <h2 className={cn(h2, "mt-6 text-2xl sm:text-3xl")}>Why I make it this way</h2>
          <ol className="m-0 flex list-none flex-col gap-4 p-0">
            {whyAiPoints.map(({ title, body }, i) => (
              <li key={title} className="flex gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-solid border-secondary-wopee/40 dark:border-primary-wopee/40 text-sm font-bold text-secondary-wopee dark:text-primary-wopee"
                >
                  {i + 1}
                </span>
                <p className="m-0 text-base sm:text-lg leading-relaxed">
                  <strong>{title}.</strong> {body}
                </p>
              </li>
            ))}
          </ol>
          <HowThisWasMade className="mt-10" />
        </div>
      </main>
    </Layout>
  );
};

export default HowWeMakeThisPage;
