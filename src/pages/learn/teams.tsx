import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

import NotifyCard from "@/components/learn/NotifyCard";
import HowThisWasMade from "@/components/learn/HowThisWasMade";

// Holding page: the full teams page and the facilitator kit ship with T2.
const LearnTeamsPage = () => (
  <Layout
    title="Agentic Testing Training for QA Teams"
    description="Run the free Green Is Not Correct tutorials with your QA team: company accounts or no AI, a cohort code and a facilitator guide. Coming with tutorial 2."
  >
    <Head>
      <meta name="robots" content="noindex, follow" />
    </Head>
    <main className="container px-5 lg:px-10 py-12 lg:py-20">
      <div className="mx-auto max-w-3xl flex flex-col gap-6">
        <Link
          to="/learn/"
          className="text-sm font-semibold text-secondary-wopee dark:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee"
        >
          ← All tutorials
        </Link>
        <span className="self-start bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee text-sm font-semibold px-4 py-1.5 rounded-full border border-solid border-secondary-wopee/20 dark:border-primary-wopee/20">
          For QA leads
        </span>
        <h1 className="text-4xl sm:text-5xl leading-tight">
          Run the hands-on series with your QA team
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed opacity-85">
          The labs test a public demo app, so no company code or data goes
          in. Your testers can work on company accounts, with your
          organisation's Copilot or with no AI at all, because every step has
          a path without it. The check runs locally and sends nothing. We are
          preparing a cohort code, a facilitator guide for 2-hour sessions and
          a pilot readiness checklist; they open with tutorial 2. Leave your
          email and we will tell you when.
        </p>
      </div>
      <NotifyCard
        className="mx-auto max-w-4xl mt-12"
        eyebrow="For QA leads"
        heading="Get an email when the team kit opens"
        body="We announce the team kit and every new tutorial in the Wopee.io newsletter. You can unsubscribe from any email."
      />
      <HowThisWasMade className="mx-auto max-w-4xl mt-12" teamsLink={false} />
    </main>
  </Layout>
);

export default LearnTeamsPage;
