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
  <section className="w-full flex flex-col items-center pt-12 lg:pt-20 pb-4 px-4">
    <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
      <h1 className="text-4xl sm:text-5xl">
        <span className="text-secondary-wopee dark:text-primary-wopee">
          Customers
        </span>{" "}
        testing with Wopee.io
      </h1>
      <p className="text-lg lg:text-xl leading-relaxed text-slate-900 dark:text-white text-left">
        <strong>
          Wopee.io customers are engineering and QA teams that use autonomous
          AI testing agents for visual and functional testing of their web
          applications.
        </strong>{" "}
        Teams at SYNOT TECH, Livesport, and Multitude use Wopee.io for visual
        and functional testing. SYNOT TECH alone runs 1,600+ automated
        regression tests across multiple teams, with the largest suites
        completing in about 30 minutes.
      </p>
    </div>
  </section>
);

const SynotFeaturedCase = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-4xl w-full mx-auto">
      <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-medium mb-4 text-center">
        Featured case study
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-primary-wopee mb-10">
        SYNOT TECH: visual testing at iGaming scale
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {SYNOT_FACTS.map((fact) => (
          <div
            key={fact.value}
            className="bg-white/70 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center shadow-lg backdrop-blur"
          >
            <p className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-primary-wopee mb-2">
              {fact.value}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {fact.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-600 shadow-lg">
        <p className="text-xl md:text-2xl text-gray-900 dark:text-white leading-relaxed font-medium text-center mb-6">
          <span className="text-secondary-wopee dark:text-primary-wopee font-bold text-3xl">
            &ldquo;
          </span>
          Before implementing visual testing from Wopee.io, it wasn't possible
          to test some scenarios at all.
          <span className="text-secondary-wopee dark:text-primary-wopee font-bold text-3xl">
            &rdquo;
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              src="/img/customers/avatars/jakub-synot.webp"
              alt="Jakub Miakyš"
            />
            <div>
              <p className="font-bold text-gray-900 dark:text-white mb-0">
                Jakub Miakyš
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                QA Automation specialist &amp; lead
              </p>
            </div>
          </div>
          <img
            className="h-12 max-w-[140px] object-contain dark:invert dark:grayscale opacity-90"
            src="/img/customers/synot-logo.png"
            alt="SYNOT TECH logo"
          />
        </div>

        <p className="text-sm text-secondary-wopee dark:text-primary-wopee font-medium mt-6 mb-0 text-center">
          SYNOT TECH, Full-stack iGaming solutions provider - lotteries, casino
          games, sports betting across regulated European markets.
        </p>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/blog/synot-tech-test-automation-wopee/"
          className="text-lg font-semibold"
        >
          Read the full SYNOT TECH case study &rarr;
        </Link>
      </div>
    </div>
  </section>
);

const TestimonialEntry = ({ testimonial }) => (
  <div className="bg-white/70 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col justify-between shadow-lg backdrop-blur h-full">
    <p className="text-lg md:text-xl text-gray-900 dark:text-white leading-relaxed font-medium mb-6">
      <span className="text-secondary-wopee dark:text-primary-wopee font-bold text-2xl">
        &ldquo;
      </span>
      {testimonial.quote}
      <span className="text-secondary-wopee dark:text-primary-wopee font-bold text-2xl">
        &rdquo;
      </span>
    </p>

    <div>
      <div className="flex items-center gap-4 mb-4">
        <img
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          src={testimonial.avatar}
          alt={testimonial.name}
        />
        <div className="flex-1">
          <p className="font-bold text-gray-900 dark:text-white mb-0">
            {testimonial.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
            {testimonial.position}
          </p>
        </div>
        <img
          className="h-10 max-w-[120px] object-contain dark:invert dark:grayscale opacity-90"
          src={testimonial.logo}
          alt={testimonial.alt}
        />
      </div>

      <p className="text-sm text-secondary-wopee dark:text-primary-wopee font-medium leading-relaxed mb-4">
        {testimonial.about}
      </p>

      <Link
        to={testimonial.sourceHref}
        className="text-sm font-semibold"
      >
        {testimonial.sourceLabel} &rarr;
      </Link>
    </div>
  </div>
);

const TestimonialGrid = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-5xl w-full mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-primary-wopee mb-10">
        What customers say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <PartnerBrands />
      <SynotFeaturedCase />
      <TestimonialGrid />
      <EndingSection bot />
    </Layout>
  );
};

export default CustomersPage;
