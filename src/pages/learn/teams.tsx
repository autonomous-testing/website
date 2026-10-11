import React from "react";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";

import NotifyCard from "@/components/learn/NotifyCard";
import HowThisWasMade from "@/components/learn/HowThisWasMade";
import Breadcrumb from "@/components/learn/Breadcrumb";
import { accent, container, eyebrow, h1 } from "@/components/learn/styles";
import { cn } from "@/lib/utils";

const POINTS = [
  "The labs test a public demo app, so no company code or data goes in.",
  "Your testers can work on company accounts, with your organisation's Copilot or with no AI at all, because every step has a path without it.",
  "The check runs locally and sends nothing.",
];

// Holding page: the full teams page and the facilitator kit ship with T2.
const LearnTeamsPage = () => (
  <Layout
    title="Agentic Testing Training for QA Teams"
    description="Run the free Green Is Not Correct tutorials with your QA team: company accounts or no AI, a cohort code and a facilitator guide. Coming with tutorial 2."
  >
    <PageMetadata image="/img/learn/learn-og.jpg" />
    <Head>
      <meta name="robots" content="noindex, follow" />
    </Head>
    <main className={cn(container, "pt-6 pb-16 lg:pt-12")}>
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Breadcrumb here="For QA leads" />
        <p className={eyebrow}>For QA leads</p>
        <h1 className={cn(h1, "-mt-2")}>
          Run the hands-on series with <span className={accent}>your QA team</span>
        </h1>
        <ul className="m-0 flex list-none flex-col gap-3 p-0 text-lg leading-relaxed">
          {POINTS.map((p) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden="true" className="mt-0.5 font-bold text-green-700 dark:text-green-400">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <p className="m-0 max-w-[68ch] text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          We are preparing a cohort code, a facilitator guide for 2-hour
          sessions and a pilot readiness checklist; they open with tutorial 2.
          Leave your email and we will tell you when.
        </p>
        <NotifyCard
          className="mt-6"
          formId="cta-learn-notify-teams"
          eyebrow="For QA leads"
          heading="Get an email when the team kit opens"
          body="We announce the team kit and every new tutorial in the Wopee.io newsletter. You can unsubscribe from any email."
          cta="Notify me"
          note="One email when the team kit opens. Unsubscribe anytime."
        />
        <HowThisWasMade className="mt-10" teamsLink={false} />
      </div>
    </main>
  </Layout>
);

export default LearnTeamsPage;
