import React from "react";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

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
              <blockquote className="m-0 border-0 border-l-4 border-solid border-secondary-wopee p-0 pl-5 text-lg leading-relaxed text-gray-800 dark:border-purple-400 dark:text-gray-200">
                {whyAiSummary}
              </blockquote>
              <p className="m-0 mt-3 pl-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Marcel Veselka · Founder of Wopee.io
              </p>
            </div>
          </div>
          <h2 className={cn(h2, "mt-6 text-2xl sm:text-3xl")}>Why I make it this way</h2>
          <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {whyAiPoints.map(({ title, body }, i) => {
              const last = i === whyAiPoints.length - 1;
              return (
                <li
                  key={title}
                  className={cn(
                    "flex gap-3 rounded-xl border border-solid p-4",
                    last
                      ? "border-secondary-wopee/40 bg-secondary-wopee/5 sm:col-span-2 dark:border-primary-wopee/40 dark:bg-primary-wopee/5"
                      : "border-gray-200 dark:border-white/10",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary-wopee text-sm font-bold text-white",
                      last ? "dark:bg-primary-wopee dark:text-gray-900" : "dark:bg-white/10 dark:text-gray-100",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 font-bold">{title}</p>
                    <p className="m-0 mt-1 leading-relaxed text-gray-700 dark:text-gray-300">{body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
    </Layout>
  );
};

export default HowWeMakeThisPage;
