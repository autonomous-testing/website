import React from "react";

import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import PseoCard from "@site/src/components/pseo/PseoCard";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";
import pseoData from "@site/data/pseo-pages.json";

type Page = {
  slug: string;
  category: "framework" | "industry" | "use-case";
  subject: string;
  description: string;
};

const labelFor = (p: Page) =>
  p.category === "use-case" ? `AI ${p.subject}` : `AI Testing for ${p.subject}`;

const GROUPS: { key: Page["category"]; title: string; blurb: string }[] = [
  { key: "use-case", title: "By use case", blurb: "Pick the testing job — Wopee.io generates and self-heals the coverage." },
  { key: "industry", title: "By industry", blurb: "Coverage shaped around your domain's risk, dynamic data, and compliance." },
  { key: "framework", title: "By framework", blurb: "Autonomous testing tuned to how your stack actually renders and changes." },
];

export default function AiTestingHub() {
  const pages = (pseoData.pages as Page[]) || [];
  const loginUrl = useCmdLoginUrl();

  return (
    <Layout
      title="AI Testing for Every Framework, Industry & Use Case"
      description="Browse Wopee.io's AI testing guides by framework (React, Angular, Vue…), industry (fintech, SaaS, e-commerce…), and use case (regression, visual, E2E)."
    >
      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="text-center">
          <span className="inline-block rounded-full border border-secondary-wopee/40 bg-secondary-wopee/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-wopee dark:border-primary-wopee/40 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            AI Testing
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            AI testing for every stack, industry, and use case
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            Wopee.io generates, runs, and self-heals end-to-end and visual tests from your running
            app — no brittle selectors, no manual baselines. Pick your framework, industry, or the
            testing job you need below.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonPrimary href={loginUrl} label="Start for free" />
          </div>
        </header>

        {GROUPS.map((group) => {
          const groupPages = pages.filter((p) => p.category === group.key);
          if (groupPages.length === 0) return null;
          return (
            <section key={group.key} className="mt-14">
              <h2 className="text-2xl font-bold sm:text-3xl">{group.title}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{group.blurb}</p>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {groupPages.map((p) => (
                  <PseoCard
                    key={p.slug}
                    href={`/${p.slug}/`}
                    category={p.category}
                    title={labelFor(p)}
                    description={p.description}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-16 rounded-2xl bg-gradient-to-br from-secondary-wopee to-[#451f6b] px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Don't see your exact setup?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Wopee.io drives any web app in a real browser. Start free and run autonomous tests on
            your own product in minutes.
          </p>
          <div className="mt-7 flex justify-center">
            <ButtonPrimary href={loginUrl} label="Start for free" />
          </div>
        </section>
      </main>
    </Layout>
  );
}
