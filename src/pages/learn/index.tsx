import React from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

import LearnButton from "@/components/learn/LearnButton";
import VideoBlock from "@/components/learn/VideoBlock";
import NotifyCard from "@/components/learn/NotifyCard";
import HowThisWasMade from "@/components/learn/HowThisWasMade";
import {
  tutorials,
  tutorialUrl,
  type Tutorial,
} from "@/data/learn-tutorials";
import { learnConfig } from "@/data/learn-config";
import { cn } from "@/lib/utils";

const TITLE = "Free Agentic Testing Tutorials for Testers";
const DESCRIPTION =
  "Green Is Not Correct: free hands-on tutorials on agentic testing. Run AI test agents in your browser, catch what they get wrong, earn a certificate.";

const STEPS = [
  {
    n: "1",
    title: "Video",
    body: "A 3-minute start, then short clips at the lab steps that use them. Watch on the page or on YouTube.",
  },
  {
    n: "2",
    title: "Browser lab",
    body: "A lab in GitHub Codespaces on FoodDash, a demo app. Every step ends in a checkpoint, and every agent step has a path without AI.",
  },
  {
    n: "3",
    title: "Check",
    body: "One command grades what you built: your tests must pass where the app is right and fail where it breaks the spec. Then a 10-question quiz.",
  },
  {
    n: "4",
    title: "Certificate",
    body: "Lab check 8/8 and quiz 8/10 earn a Completion certificate. The same check green on your own fork earns Verified.",
  },
];

const WHY_AI = [
  "I believe in AI, so I use it wherever it already works. I build AI testing agents; teaching you to use them while doing my own work the old way would be odd.",
  "The voice is my own, cloned. It speaks clearer English than I do, so my knowledge reaches you without friction.",
  "AI makes the content better, not just faster: deeper research, clearer structure, my own mistakes caught.",
  "The tools are good enough today. Used at full strength they let me deliver consistent, high-quality lessons at a pace I couldn't manage alone.",
  "What stays human: the opinions, the decisions, the real test runs and the responsibility. I check every script and every result. The agent works, a human verifies, which is exactly what this course teaches. If something is wrong, it's on me. Tell me.",
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Green Is Not Correct: agentic testing for testers",
  description: DESCRIPTION,
  itemListElement: tutorials.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${t.id}: ${t.title}`,
    ...(t.status === "live" ? { url: `https://wopee.io${tutorialUrl(t)}` } : {}),
  })),
};

const Hero = () => (
  <section className="container px-5 lg:px-10 pt-8 pb-8 lg:pt-20 lg:pb-14">
    <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5 sm:gap-6">
      <span className="bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee text-sm font-semibold px-4 py-1.5 rounded-full border border-solid border-secondary-wopee/20 dark:border-primary-wopee/20">
        Free series · agentic testing for testers
      </span>
      <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-tight">
        Green is{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          not correct
        </span>
      </h1>
      <p className="text-xl sm:text-2xl opacity-80 max-w-3xl text-balance">
        Free, hands-on tutorials in your browser. Each one teaches one skill
        you use on Monday, proven by a check that grades what you built.
      </p>
      <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:text-base opacity-75">
        <li>No sign-up to learn</li>
        <li aria-hidden="true" className="hidden sm:list-item">•</li>
        <li>Runs in GitHub Codespaces</li>
        <li aria-hidden="true" className="hidden sm:list-item">•</li>
        <li>Copilot Free, or no AI at all</li>
        <li aria-hidden="true" className="hidden sm:list-item">•</li>
        <li>Certificate</li>
      </ul>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
        <LearnButton to="#notify" id="cta-learn-notify-hero">
          Tell me when T1 opens
        </LearnButton>
        <LearnButton to="#tutorials" variant="secondary">
          See the tutorials
        </LearnButton>
      </div>
    </div>
  </section>
);

const Intro = () => (
  <section
    aria-labelledby="intro-h"
    className="container px-5 lg:px-10 pb-12 lg:pb-24"
  >
    <div className="mx-auto max-w-4xl">
      <h2 id="intro-h" className="sr-only">
        Intro video
      </h2>
      <VideoBlock
        videoId={learnConfig.introVideoId}
        poster={learnConfig.introPoster}
        title="Green Is Not Correct: what this series teaches"
        comingLabel="Intro video coming"
      />
      <p className="mt-4 text-center text-sm opacity-60">
        Narrated by an AI clone of Marcel's voice. Script, test runs and
        results are real.
      </p>
    </div>
  </section>
);

const StatusBadge = ({ t }: { t: Tutorial }) =>
  t.status === "live" ? (
    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
      Live
    </span>
  ) : (
    <span className="rounded-full bg-gray-200 dark:bg-gray-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
      Coming soon
    </span>
  );

const TutorialCard = ({ t }: { t: Tutorial }) => {
  const live = t.status === "live";
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-sm font-bold text-secondary-wopee dark:text-primary-wopee">
          {t.id}
        </span>
        <StatusBadge t={t} />
      </div>
      <h3 className="text-lg sm:text-xl font-bold leading-snug mt-3">{t.title}</h3>
      <p className="opacity-75 mt-2 flex-1">{t.oneLiner}</p>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm m-0">
        {t.duration && (
          <>
            <dt className="opacity-60">Time</dt>
            <dd className="m-0">{t.duration}</dd>
          </>
        )}
        <dt className="opacity-60">Level</dt>
        <dd className="m-0">{t.level}</dd>
        <dt className="opacity-60">Before</dt>
        <dd className="m-0">{t.prerequisites}</dd>
      </dl>
      {(t.practitioner || t.track === "wopee") && (
        <div className="mt-4 flex flex-wrap gap-2">
          {t.practitioner && (
            <span className="rounded-md bg-secondary-wopee/10 dark:bg-primary-wopee/10 px-2 py-0.5 text-xs font-semibold text-secondary-wopee dark:text-primary-wopee">
              Practitioner path
            </span>
          )}
          {t.track === "wopee" && (
            <span className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-semibold opacity-80">
              Uses a free Wopee.io account
            </span>
          )}
        </div>
      )}
      {live && (
        <span className="mt-5 font-semibold text-secondary-wopee dark:text-primary-wopee">
          Start the tutorial →
        </span>
      )}
    </>
  );
  const cls = cn(
    "flex h-full flex-col rounded-2xl border border-solid p-5 sm:p-6 transition-colors",
    "bg-white dark:bg-gray-900",
    live
      ? "border-secondary-wopee/40 dark:border-primary-wopee/40 hover:border-secondary-wopee dark:hover:border-primary-wopee"
      : "border-gray-200 dark:border-gray-800",
  );
  return (
    <li className="list-none">
      {live ? (
        <Link
          to={tutorialUrl(t)}
          className={cn(
            cls,
            "text-inherit hover:text-inherit hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee",
          )}
        >
          {body}
        </Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
};

const Tutorials = () => (
  <section
    id="tutorials"
    aria-labelledby="tutorials-h"
    className="container px-5 lg:px-10 pb-12 lg:pb-24"
  >
    <div className="text-center mb-10 lg:mb-14 max-w-3xl mx-auto">
      <h2 id="tutorials-h" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        The tutorials
      </h2>
      <p className="text-lg opacity-75 text-balance">
        T1, T2 and T3 together make the Agentic Testing Practitioner path.
        Most tutorials are vendor-neutral; the ones that use Wopee.io say so.
      </p>
    </div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 p-0 m-0">
      {tutorials.map((t) => (
        <TutorialCard key={t.id} t={t} />
      ))}
    </ul>
  </section>
);

const HowItWorks = () => (
  <section
    aria-labelledby="how-h"
    className="bg-gray-50 dark:bg-gray-900/50 py-12 lg:py-24"
  >
    <div className="container px-5 lg:px-10">
      <div className="text-center mb-10 lg:mb-14 max-w-3xl mx-auto">
        <h2 id="how-h" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          How each tutorial works
        </h2>
        <p className="text-lg opacity-75 text-balance">
          Videos, lessons, labs, the check and the quiz are free, with no
          email. You give an email only for the certificate and the solutions.
        </p>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 p-0 m-0 list-none">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="rounded-2xl bg-white dark:bg-gray-900 border border-solid border-gray-200 dark:border-gray-800 p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-wopee text-white dark:bg-primary-wopee dark:text-secondary-wopee font-bold">
              {s.n}
            </span>
            <h3 className="text-xl font-bold mt-4">{s.title}</h3>
            <p className="opacity-75 mt-2">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const WhyAI = () => {
  const photo = useBaseUrl("/img/team/marcel.jpg");
  return (
    <section
      aria-labelledby="why-h"
      className="container px-5 lg:px-10 py-12 lg:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="why-h" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
          Why I build this with AI
        </h2>
        <ol className="flex flex-col gap-5 p-0 m-0 list-none">
          {WHY_AI.map((text, i) => (
            <li key={i} className="flex gap-3 sm:gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border border-solid border-secondary-wopee/40 dark:border-primary-wopee/40 text-sm font-bold text-secondary-wopee dark:text-primary-wopee"
              >
                {i + 1}
              </span>
              <p className="text-base sm:text-lg leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex items-center gap-4">
          <img
            src={photo}
            alt="Marcel Veselka"
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">Marcel Veselka</p>
            <p className="text-sm opacity-70">Founder of Wopee.io</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamsLine = () => (
  <section className="container px-5 lg:px-10 pb-12">
    <div className="mx-auto max-w-4xl rounded-2xl border border-solid border-secondary-wopee/30 dark:border-primary-wopee/30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 justify-between">
      <p className="text-lg">
        <span className="font-bold">Taking this with your team?</span> Run it
        on company accounts, as a cohort, with a facilitator guide.
      </p>
      <LearnButton to="/learn/teams/" variant="secondary" className="w-full sm:w-auto flex-shrink-0">
        For QA leads →
      </LearnButton>
    </div>
  </section>
);

const LearnPage = () => {
  const ogImage = "/img/learn/learn-og.jpg";
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMetadata image={ogImage} />
      <Head>
        <script type="application/ld+json">{JSON.stringify(JSONLD)}</script>
      </Head>
      <main>
        <Hero />
        <Intro />
        <Tutorials />
        <HowItWorks />
        <WhyAI />
        <TeamsLine />
        <div className="container px-5 lg:px-10 pb-12">
          <NotifyCard
            className="mx-auto max-w-4xl"
            heading="Get an email when a tutorial opens"
            body="We announce every new tutorial in the Wopee.io newsletter. You can unsubscribe from any email."
          />
        </div>
        <div className="container px-5 lg:px-10 pb-16">
          <HowThisWasMade className="mx-auto max-w-4xl" />
        </div>
      </main>
    </Layout>
  );
};

export default LearnPage;
