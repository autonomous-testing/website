import React from "react";

import Layout from "@theme/Layout";
import PartnersCarouselCard from "@site/src/components/demo/PartnersCarouselCard";

const INVESTORS = [
  {
    name: "Nation1",
    logo: "/img/investors/nation1-logo.png",
    classes: "dark:invert",
  },
  {
    name: "StartupYard",
    logo: "/img/investors/startup-yard-logo.png",
    classes: "dark:brightness-[1.8]",
  },
];

const TeamPage = () => {
  return (
    <Layout title="About Us">
      <main>
        {/* Hero */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 text-secondary-wopee dark:text-primary-wopee">
              About Wopee.io
            </h1>
            <p className="text-xl leading-relaxed opacity-90">
              We started with a simple frustration: testing should not be the
              bottleneck. So we built autonomous agents that let engineering
              teams ship faster, break less, and sleep better.
            </p>
          </div>
        </section>

        {/* What We Do — cards */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="rounded-xl border border-solid border-gray-700 p-8 flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-secondary-wopee dark:text-primary-wopee text-center">
                Born from experience
              </h3>
              <p className="opacity-80 leading-relaxed text-center flex-1">
                Decades of hands-on work in software testing, test automation,
                and quality engineering. We know what works, what breaks at
                scale, and what teams actually need to move fast without breaking
                things.
              </p>
            </div>
            <div className="rounded-xl border border-solid border-gray-700 p-8 flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-secondary-wopee dark:text-primary-wopee text-center">
                AI-powered testing
              </h3>
              <p className="opacity-80 leading-relaxed text-center flex-1">
                AI-driven test creation, self-healing maintenance, and
                actionable insights — so teams can focus on building value, not
                babysitting fragile test suites.
              </p>
            </div>
            <div className="rounded-xl border border-solid border-gray-700 p-8 flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-secondary-wopee dark:text-primary-wopee text-center">
                Real outcomes
              </h3>
              <p className="opacity-80 leading-relaxed text-center flex-1">
                Fewer regressions, faster releases, and better user experiences.
                Test automation that is accessible, reliable, and genuinely
                useful in daily product delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Backed by */}
        <section className="pt-10 pb-16 px-4 text-center">
          <p className="text-sm uppercase tracking-widest opacity-50 mb-6">
            Backed by
          </p>
          <div className="flex justify-center items-center gap-14">
            {INVESTORS.map((investor) => (
              <PartnersCarouselCard
                key={investor.name}
                logo={investor.logo}
                classes={investor.classes}
              />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <p className="text-lg opacity-90">
                <a
                  href="mailto:help@wopee.io"
                  className="underline text-secondary-wopee dark:text-primary-wopee font-semibold"
                >
                  help@wopee.io
                </a>
              </p>
            </div>
            <div className="text-sm opacity-60 leading-7 md:text-right">
              <p className="font-semibold">wopee labs s.r.o.</p>
              <p>Pujmanove 883/23, Prague 140 00</p>
              <p>Czech Republic</p>
              <p>Reg. No.: 17997224 | VAT: CZ17997224</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};
export default TeamPage;
