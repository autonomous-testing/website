import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import GradientCard from "@site/src/components/ui/GradientCard";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import CompareCta from "@site/src/components/compare-page/CompareCta";
import LastChecked from "@site/src/components/compare-page/LastChecked";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";

const COMPARISONS = [
  {
    title: "Wopee.io vs Playwright MCP",
    href: "/compare/wopee-vs-playwright-mcp/",
    tagline: "Browser automation vs a testing system",
    description:
      "Your AI coding agent can already drive a browser. Who keeps the regression suite alive? Persistent suites, visual baselines, and scheduled runs vs ad-hoc LLM sessions — and how to use both together.",
  },
  {
    title: "Wopee.io vs Applitools Autonomous",
    href: "/compare/wopee-vs-applitools/",
    tagline: "Published pricing vs 'Contact us'",
    description:
      "Applitools shows 'Custom / Contact us' on every pricing tier and offers on-premise only for Eyes. Wopee.io publishes its prices and runs the full agent on-premise. An honest look at where Applitools is still stronger.",
  },
  {
    title: "Octomind alternative",
    href: "/compare/octomind-alternative/",
    tagline: "For teams orphaned by the shutdown",
    description:
      "Octomind discontinued its product in May 2026. What Playwright-based teams should do next — and how to make sure a vendor shutdown never strands your tests again.",
  },
];

const HowWeCompare = () => (
  <section className="w-full flex flex-col items-center py-16 px-4 bg-slate-50 dark:bg-white/5">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
        How these comparisons work
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        Every claim about another tool comes from its public pages or archived
        snapshots, and every page carries a "Last checked" date. Where the
        other tool is the better fit, we say so. No feature-matrix tricks, no
        invented weaknesses.
      </p>
    </div>
  </section>
);

const CompareHub = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Compare AI Testing Tools"
      description="Compare Wopee.io with Playwright MCP, Applitools Autonomous, and Octomind alternatives. Honest comparisons with published pricing and date-stamped facts."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            <span className="text-secondary-wopee dark:text-primary-wopee">
              Compare
            </span>{" "}
            AI testing tools
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            AI testing tool comparisons should be honest: every tool has a
            place. These pages compare Wopee.io — an autonomous testing
            platform that generates, runs, and maintains Playwright tests —
            with the alternatives teams evaluate most often. Each page states
            what the other tool does well, when to stick with it, and when
            Wopee.io is the better fit. Facts are checked against public
            sources and date-stamped.
          </p>
        </div>
      </div>

      <div className="container my-12 lg:my-16 px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMPARISONS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="hover:no-underline text-slate-900 dark:text-white"
            >
              <GradientCard className="h-full group transition-transform hover:-translate-y-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-secondary-wopee dark:text-primary-wopee mb-2">
                  {c.tagline}
                </p>
                <h2 className="text-2xl font-bold mb-3">{c.title}</h2>
                <p className="opacity-70 mb-4">{c.description}</p>
                <span className="font-semibold text-secondary-wopee dark:text-primary-wopee">
                  Read the comparison{" "}
                  <span className="inline-block group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </span>
              </GradientCard>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <ButtonPrimary
            label="Start for free"
            href={loginUrl}
            className="w-60 h-[50px]"
            id="cta-compare-hub"
          />
          <p className="text-sm italic">No credit card required</p>
        </div>
      </div>

      <HowWeCompare />

      <LastChecked note="Last checked: July 2026. Competitor details come from their public pages and archived snapshots." />

      <CompareCta
        heading="Done comparing?"
        subheading="Point Wopee.io at your app and see the first tests today."
        ctaId="cta-compare-hub-footer"
      />
    </Layout>
  );
};

export default CompareHub;
