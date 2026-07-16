import React from "react";

import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import PartnerBrands from "@site/src/components/landing-page/home/sections/PartnerBrands";
import EndingSection from "@site/src/components/landing-page/home/sections/EndingSection";

const SYNOT_FACTS = [
  {
    value: "1,600+",
    label: "automated regression tests across all teams",
  },
  {
    value: "~30 min",
    label: "execution time for the largest test suites",
  },
  {
    value: "Multi-team",
    label: "QA subteams aligned under one testing strategy",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Wopee.io showcased its potential to save us valuable time and effort in maintaining the visual integrity of our application.",
    about:
      "Livesport, The fastest sports information and scores provider from 35+ sports to 100M people worldwide (60+ web and mobile apps)",
    avatar: "/img/customers/avatars/martin-livesport.webp",
    name: "Martin Šimon",
    position: "Test Automation Lead",
    logo: "/img/customers/flash-score-logo.png",
    alt: "Flash score logo",
    sourceHref: "/blog/livesport-visual-testing-w-wopee-io/",
    sourceLabel: "Read the Livesport story",
  },
  {
    quote:
      "Wopee.io autonomous testing is extremely valuable in testing our marketing & customer account pages.",
    about:
      "Multitude, European provider of Digital Financial Services 400k+ customers in 20 countries",
    avatar: "/img/customers/avatars/juraj-multitude.jpeg",
    name: "Juraj Žabka",
    position: "Engineering Lead",
    logo: "/img/customers/multitude-logo.png",
    alt: "Multitude logo",
    sourceHref: "/",
    sourceLabel: "As featured on the Wopee.io homepage",
  },
];

const CustomerHero = () => (
  <section className="container px-5 py-12 sm:py-16 lg:px-10 lg:pb-20 lg:pt-24">
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <h1 className="m-0 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
        <span className="text-secondary-wopee dark:text-primary-wopee">
          Customers
        </span>{" "}
        testing with Wopee.io
      </h1>
      <p className="mx-auto mb-0 mt-7 max-w-3xl text-left text-base leading-7 text-slate-600 sm:text-center sm:text-lg lg:text-xl dark:text-slate-300">
        <strong>
          Wopee.io customers are engineering and QA teams running autonomous
          AI testing agents against production web apps in regulated,
          high-traffic industries.
        </strong>{" "}
        Livesport keeps 60+ web and mobile apps, serving sports scores to 100M
        people, visually intact. SYNOT TECH runs 1,600+ regression tests
        across multiple teams, with Wopee.io adding visual verification.
        Multitude, with 400k+ customers in 20 countries, relies on autonomous
        AI agent testing to keep its customer account pages bug-free.
      </p>
    </div>
  </section>
);

const SynotFeaturedCase = () => (
  <section className="container px-5 py-12 sm:py-16 lg:px-10 lg:py-24">
    <div className="mx-auto w-full max-w-5xl">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-sm dark:text-slate-400">
        Featured case study
      </p>
      <h2 className="m-0 text-center text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
        <span className="text-secondary-wopee dark:text-primary-wopee">
          SYNOT TECH:
        </span>{" "}
        visual testing at iGaming scale
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SYNOT_FACTS.map((fact) => (
          <article
            key={fact.value}
            className="rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 text-center shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]"
          >
            <p className="m-0 text-3xl font-bold text-secondary-wopee sm:text-4xl dark:text-primary-wopee">
              {fact.value}
            </p>
            <p className="mb-0 mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {fact.label}
            </p>
          </article>
        ))}
      </div>

      <figure className="mt-6 rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-6 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
        <blockquote className="m-0 text-center text-xl font-medium leading-relaxed text-slate-900 sm:text-2xl dark:text-slate-100">
          <span className="text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
            &ldquo;
          </span>
          Before implementing visual testing from Wopee.io, it wasn't possible
          to test some scenarios at all.
          <span className="text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
            &rdquo;
          </span>
        </blockquote>

        <figcaption className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <img
              className="h-14 w-14 rounded-full border-2 border-slate-200 object-cover dark:border-white/10"
              src="/img/customers/avatars/jakub-synot.webp"
              alt="Jakub Miakyš"
            />
            <div>
              <p className="mb-0 font-bold text-slate-950 dark:text-white">
                Jakub Miakyš
              </p>
              <p className="mb-0 text-sm text-slate-600 dark:text-slate-300">
                QA Automation specialist &amp; lead
              </p>
            </div>
          </div>
          <img
            className="h-12 max-w-[140px] object-contain opacity-80 dark:grayscale dark:invert"
            src="/img/customers/synot-logo.png"
            alt="SYNOT TECH logo"
          />
        </figcaption>

        <p className="mb-0 mt-6 border-t border-slate-200 pt-5 text-center text-sm font-medium leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
          SYNOT TECH, Full-stack iGaming solutions provider - lotteries, casino
          games, sports betting across regulated European markets.
        </p>
      </figure>

      <div className="mt-8 text-center">
        <Link
          to="/blog/synot-tech-test-automation-wopee/"
          className="text-lg font-semibold text-secondary-wopee hover:no-underline dark:text-primary-wopee"
        >
          Read the full SYNOT TECH case study &rarr;
        </Link>
      </div>
    </div>
  </section>
);

const TestimonialEntry = ({ testimonial }) => (
  <article className="flex h-full flex-col justify-between rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-6 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-8 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
    <blockquote className="m-0 text-lg font-medium leading-relaxed text-slate-900 sm:text-xl dark:text-slate-100">
      <span className="text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
        &ldquo;
      </span>
      {testimonial.quote}
      <span className="text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
        &rdquo;
      </span>
    </blockquote>

    <div className="mt-8">
      <div className="mb-5 flex items-center gap-4">
        <img
          className="h-14 w-14 rounded-full border-2 border-slate-200 object-cover dark:border-white/10"
          src={testimonial.avatar}
          alt={testimonial.name}
        />
        <div className="flex-1">
          <p className="mb-0 font-bold text-slate-950 dark:text-white">
            {testimonial.name}
          </p>
          <p className="mb-0 text-sm text-slate-600 dark:text-slate-300">
            {testimonial.position}
          </p>
        </div>
        <img
          className="h-9 max-w-[100px] object-contain opacity-80 dark:grayscale dark:invert sm:h-10 sm:max-w-[120px]"
          src={testimonial.logo}
          alt={testimonial.alt}
        />
      </div>

      <p className="mb-4 border-t border-slate-200 pt-5 text-sm font-medium leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
        {testimonial.about}
      </p>

      <Link
        to={testimonial.sourceHref}
        className="text-sm font-semibold text-secondary-wopee hover:no-underline dark:text-primary-wopee"
      >
        {testimonial.sourceLabel} &rarr;
      </Link>
    </div>
  </article>
);

const TestimonialGrid = () => (
  <section className="border-y border-slate-200/80 bg-slate-50/70 py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-white/[0.025]">
    <div className="container px-5 lg:px-10">
      <h2 className="m-0 text-center text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
        What{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          customers
        </span>{" "}
        say
      </h2>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialEntry
            key={testimonial.name}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  </section>
);

const CustomersPage = () => {
  return (
    <Layout
      title="Customers: Case Studies & Testimonials"
      description="Wopee.io customers: SYNOT TECH runs 1,600+ automated regression tests with the largest suites at ~30 minutes. Plus Livesport and Multitude testimonials."
    >
      <CustomerHero />
      <section className="border-y border-slate-200/80 bg-slate-50/70 px-4 dark:border-white/10 dark:bg-white/[0.025]">
        <PartnerBrands />
      </section>
      <SynotFeaturedCase />
      <TestimonialGrid />
      <EndingSection bot />
    </Layout>
  );
};

export default CustomersPage;
