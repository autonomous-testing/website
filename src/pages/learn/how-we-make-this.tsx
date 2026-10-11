import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

import HowThisWasMade from "@/components/learn/HowThisWasMade";
import { whyAiSummary, whyAiPoints } from "@/data/learn-why-ai";

// The link target for "How we make this" in the video descriptions.
const HowWeMakeThisPage = () => {
  const photo = useBaseUrl("/img/team/marcel.jpg");
  return (
    <Layout
      title="How We Make the Free Tutorials"
      description="The free Wopee.io tutorials are made with AI and checked by Marcel Veselka: what AI does, what stays human, and why the narration is a voice clone."
    >
      <PageMetadata image="/img/learn/learn-og.jpg" />
      <main className="container px-5 lg:px-10 pt-8 pb-16 lg:pt-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <Link
            to="/learn/"
            className="text-sm font-semibold text-secondary-wopee dark:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee"
          >
            ← All tutorials
          </Link>
          <h1 className="m-0 text-4xl sm:text-5xl leading-tight">
            Made with AI, checked by me
          </h1>
          <div className="flex items-start gap-4">
            <img
              src={photo}
              alt="Marcel Veselka"
              width={56}
              height={56}
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="m-0 text-lg leading-relaxed">{whyAiSummary}</p>
              <p className="m-0 mt-2 text-sm opacity-70">
                Marcel Veselka · Founder of Wopee.io
              </p>
            </div>
          </div>
          <h2 className="m-0 mt-4 text-2xl sm:text-3xl font-bold">My 5 reasons</h2>
          <ol className="m-0 flex list-none flex-col gap-4 p-0">
            {whyAiPoints.map((text, i) => (
              <li key={i} className="flex gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-solid border-secondary-wopee/40 dark:border-primary-wopee/40 text-sm font-bold text-secondary-wopee dark:text-primary-wopee"
                >
                  {i + 1}
                </span>
                <p className="m-0 text-base sm:text-lg leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
          <HowThisWasMade className="mt-6" />
        </div>
      </main>
    </Layout>
  );
};

export default HowWeMakeThisPage;
