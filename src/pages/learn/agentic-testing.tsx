import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";

import VideoBlock from "@/components/learn/VideoBlock";
import HowThisWasMade from "@/components/learn/HowThisWasMade";
import TryWidget from "@/components/learn/t1/TryWidget";
import LabTracker from "@/components/learn/t1/LabTracker";
import { CheckTabs, CompletionCodeForm } from "@/components/learn/t1/CheckSection";
import Quiz from "@/components/learn/t1/Quiz";
import Certificate from "@/components/learn/t1/Certificate";
import {
  Eyebrow,
  SectionTitle,
  Callout,
  CodeBlock,
  ExternalLink,
} from "@/components/learn/t1/shared";
import { learnConfig } from "@/data/learn-config";
import { t1Chapters, t1Links } from "@/data/learn-t1";
import { tutorials, tutorialUrl } from "@/data/learn-tutorials";
import { cn } from "@/lib/utils";

const TITLE = "Agentic Testing for Testers: Free Tutorial";
const DESCRIPTION =
  "Catch an AI agent writing a bug into a green test. Free hands-on tutorial: Playwright's planner, generator and healer, in your browser.";

const launched = learnConfig.t1.launched;
const next = tutorials.find((t) => t.id === "T2");
const teamsHref = "/learn/teams/?utm_source=learn&utm_medium=page&utm_campaign=learn-t1";

const Section = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-h`}
    className={cn("container px-5 lg:px-10 py-10 sm:py-12 lg:py-16 scroll-mt-20", className)}
  >
    <div className="mx-auto max-w-4xl">{children}</div>
  </section>
);

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const Hero = () => (
  <header className="bg-gradient-to-b from-secondary-wopee/10 to-transparent dark:from-secondary-wopee/25">
    <div className="container px-5 lg:px-10 pt-8 pb-10 lg:pt-14 lg:pb-14">
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm opacity-75">
          <Link to="/learn/" className="font-semibold text-secondary-wopee dark:text-primary-wopee">
            Learn
          </Link>{" "}
          / Green Is Not Correct / T1
        </nav>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl leading-tight">
          Agentic testing for testers
        </h1>
        <p className="mt-5 text-xl sm:text-2xl leading-snug">
          An AI agent can write, run and fix your tests. It can also write the
          bug into the test and{" "}
          <mark className="rounded bg-primary-wopee px-1 text-secondary-wopee">
            call it green.
          </mark>
        </p>
        <p className="mt-4 text-lg opacity-80">
          In this tutorial you run Playwright's own test agents on a demo app,
          and learn the part the agent can't do for you: deciding what
          "correct" means.
        </p>
        <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0 text-sm">
          {[
            <>
              <strong>Free</strong> hands-on tutorial
            </>,
            <>
              About <strong>2 hours</strong>, two sittings are fine
            </>,
            <>In your browser</>,
            <>No sign-up</>,
          ].map((c, i) => (
            <li
              key={i}
              className="rounded-full border border-solid border-gray-300 dark:border-gray-700 px-3 py-1"
            >
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          {launched ? (
            <a
              href={t1Links.codespaces}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(primaryBtn, "bg-secondary-wopee text-white hover:text-white dark:bg-primary-wopee dark:text-secondary-wopee dark:hover:text-secondary-wopee")}
            >
              Open the lab in Codespaces
            </a>
          ) : (
            <span
              aria-disabled="true"
              className={cn(primaryBtn, "cursor-not-allowed bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-300")}
            >
              Open the lab in Codespaces · at launch
            </span>
          )}
          <a
            href={t1Links.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(primaryBtn, "border border-solid border-secondary-wopee/40 text-secondary-wopee hover:text-secondary-wopee dark:border-primary-wopee/40 dark:text-primary-wopee dark:hover:text-primary-wopee")}
          >
            Add 2 hours to my calendar
          </a>
        </div>
        <p className="mt-4 text-sm opacity-80">
          Click it now. Your lab builds while you watch the first video. People
          who pick a time finish more often. On your own laptop instead?{" "}
          <ExternalLink href={t1Links.localSetup}>Local setup</ExternalLink>
        </p>

        <div className="mt-10">
          <h2 className="text-xl font-bold">You will be able to</h2>
          <ol className="m-0 mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
            {[
              ["Tell scripted, AI-assisted and agentic testing apart", ', and say who owns the "pass" in each.'],
              ["Run Playwright's planner, generator and healer", ", and say what each one is allowed to change."],
              ["Make the spec your oracle", ", so your agent's tests fail where the app breaks the rules."],
              ["Review an agent's test in 5 minutes", " with a 7-point checklist, and test a pass before you trust it."],
            ].map(([b, t], i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-white/70 dark:bg-gray-900/70 p-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary-wopee text-sm font-bold text-white dark:bg-primary-wopee dark:text-secondary-wopee">
                  {i + 1}
                </span>
                <span>
                  <b>{b}</b>
                  <span className="opacity-80">{t}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </header>
);

const Divider = () => (
  <div className="container px-5 lg:px-10">
    <hr className="mx-auto max-w-4xl border-0 border-t border-solid border-gray-200 dark:border-gray-800 m-0" />
  </div>
);

const T1Page = () => (
  <Layout title={TITLE} description={DESCRIPTION}>
    <PageMetadata image="/img/learn/learn-og.jpg" />
    {!launched && (
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    )}
    <main>
      <Hero />

      <Section id="try">
        <Eyebrow>60 seconds · before anything else</Eyebrow>
        <SectionTitle id="try-h">Is this test correct?</SectionTitle>
        <p className="mb-5 text-lg">
          An AI agent wrote this test and ran it. It's green. Our spec says:{" "}
          <em>
            orders over $25 get 20 % off the food; delivery $2.99; service
            $1.50.
          </em>
        </p>
        <TryWidget />
      </Section>

      <Divider />

      <Section id="video">
        <Eyebrow>Start here · 3 min</Eyebrow>
        <SectionTitle id="video-h">Green is not correct</SectionTitle>
        <VideoBlock
          videoId={learnConfig.t1.videoId}
          title="Green is not correct: T1 part 1"
          comingLabel="Video coming"
        />
        <p className="mt-3 text-sm opacity-70">
          AI voice of Marcel · script, test runs and results are real. The full
          11-minute cut lives on YouTube. Shorter parts appear in the lab, at
          the step that uses them.
        </p>
        <h3 className="mt-8 text-lg font-bold">Chapters of the full video</h3>
        <ol className="m-0 mt-3 grid list-none gap-x-8 gap-y-1.5 p-0 sm:grid-cols-2">
          {t1Chapters.map(([t, label]) => (
            <li key={t} className="flex gap-3">
              <time className="w-12 flex-shrink-0 font-mono text-sm opacity-60">{t}</time>
              <span>{label}</span>
            </li>
          ))}
        </ol>
        <Callout label="Pause and predict.">
          You ask an agent to test FoodDash's checkout with an empty form. What
          will its test expect? (Answered in the video.)
        </Callout>
      </Section>

      <Divider />

      <Section id="before">
        <SectionTitle id="before-h">Before you start</SectionTitle>
        <ul className="m-0 flex list-none flex-col gap-3 p-0 text-base sm:text-lg leading-relaxed">
          {[
            <>
              A free <strong>GitHub account</strong>. The lab runs in{" "}
              <strong>GitHub Codespaces</strong>, a computer in the cloud with
              VS Code in your browser: about 60 free hours a month on the
              default machine. This lab uses about 2.
            </>,
            <>
              <strong>GitHub Copilot Free</strong>, turned on in your{" "}
              <ExternalLink href={t1Links.copilotSettings}>GitHub settings</ExternalLink>.
              This lab uses <strong>5 chat prompts</strong>, 6 with one retry.
              No Copilot? Every step has a path without AI. All three tutorials
              together: up to about 20 Copilot prompts, spread over two months,
              or use the no-AI paths.
            </>,
            <>
              <strong>Never written code? That's fine.</strong> You'll read and
              edit tests, not write them from scratch, and the lab starts with a
              short guide to reading one.
            </>,
            <>
              <strong>First time with code?</strong> Plan two sittings: steps 0
              to 2, then 3 and 4. Stop the codespace in between and your work
              waits for you.
            </>,
            <>
              <strong>Done this kind of thing before? Take the fast lane.</strong>{" "}
              Answer three questions; at 3 of 3, go straight to step 3 and the
              boss challenge.
            </>,
            <>
              <strong>Taking this with your team?</strong> Run it on company
              accounts, as a cohort, with a facilitator guide:{" "}
              <Link to={teamsHref} className="font-semibold text-secondary-wopee dark:text-primary-wopee underline underline-offset-2">
                For QA leads
              </Link>
            </>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="mt-1 flex-shrink-0 font-bold text-green-600">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Divider />

      <Section id="concepts">
        <Eyebrow>The ideas, in five minutes</Eyebrow>
        <SectionTitle id="concepts-h">Who decides what "pass" means?</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Scripted", "You decide", "You write every step and every check."],
            ["AI-assisted", "You still decide", "A copilot suggests code, and you still decide the steps."],
            ["Agentic", "The agent proposes", "You give a goal. The agent plans, acts, observes and judges in a loop until it thinks it's done."],
          ].map(([h, who, p], i) => (
            <div
              key={h}
              className={cn(
                "rounded-xl border border-solid p-5",
                i === 2
                  ? "border-secondary-wopee dark:border-primary-wopee bg-secondary-wopee/5 dark:bg-primary-wopee/5"
                  : "border-gray-200 dark:border-gray-800",
              )}
            >
              <h3 className="text-lg font-bold">{h}</h3>
              <p className="mt-1 text-sm font-semibold text-secondary-wopee dark:text-primary-wopee">{who}</p>
              <p className="mt-2 opacity-85">{p}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg">
          The weak spot is the judging. An agent needs an <strong>oracle</strong>,
          a source of truth for what "correct" means. For our demo app,
          FoodDash, that's the spec, not the app.
        </p>
        <h3 className="mt-8 text-xl font-bold">You stay in the loop in four places</h3>
        <ol className="mt-3 pl-6 text-lg [&_li]:mt-1">
          <li>You choose the oracle.</li>
          <li>You review the plan.</li>
          <li>You review every assertion and every fix.</li>
          <li>You judge flakiness over several runs.</li>
        </ol>
        <h3 className="mt-8 text-xl font-bold">Playwright's three agents</h3>
        <p className="mt-2 text-lg">
          Playwright ships three agents, set up with one command. They reach
          Playwright through its test-runner <strong>MCP server</strong>. MCP is
          a standard plug that lets an AI agent use a tool; tutorial 2 is all
          about it. Each agent starts from a seed test that opens the app.
        </p>
        <div className="mt-4 grid gap-3">
          {[
            ["Planner", "writes: a plan", "Explores the app and writes a plan in plain English. It has no file-edit tool, but it can run code in the browser, and by default on your machine. The lab removes that last tool."],
            ["Generator", "writes: new test files", "Replays the plan in a real browser and writes new test files. Its expected values come from what it saw."],
            ["Healer", "edits: any test file", null],
          ].map(([name, may, body]) => (
            <div key={name} className="rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-4 sm:p-5">
              <p className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold">{name}</span>
                <span className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 font-mono text-xs">{may}</span>
              </p>
              <p className="mt-2 opacity-85">
                {body ?? (
                  <>
                    Runs, debugs and edits your tests until they pass. If it
                    decides the app is broken, it marks the test{" "}
                    <code>fixme</code>, which means skipped.
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm opacity-70">
          On Copilot Free, delete the <code>model:</code> line the setup writes
          into each agent file. The lab does it for you.
        </p>
      </Section>

      <Divider />

      <Section id="lab">
        <Eyebrow>60 to 90 min · GitHub Codespaces</Eyebrow>
        <SectionTitle id="lab-h">The lab</SectionTitle>
        <p className="mb-5 text-lg">
          Some of your tests will <strong>fail</strong>. That is the point.
          Where the app breaks the spec, the right test fails, and the failure
          is your finding.
        </p>
        <LabTracker />
        <Callout label="Stuck?">
          In the terminal, <code>npm run check -- t1 --step N --hint 1</code>{" "}
          gives a nudge; <code>--hint 2</code> the shape; <code>--hint 3</code>{" "}
          the answer. <code>npm run reset -- t1 cpN</code> goes back to your
          last passed checkpoint. Still stuck after 10 minutes?{" "}
          <ExternalLink href={t1Links.discussions}>Ask in Discussions</ExternalLink>{" "}
          and tell us the step.
        </Callout>

        <div className="mt-8 rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <span className="text-xs font-bold uppercase tracking-widest opacity-70">
            Before step 4 · 2.5 min clip
          </span>
          <h3 className="mt-1 text-xl font-bold">Before you trust a pass</h3>
          <p className="mt-2">
            In our own rehearsal, the generator expected an order total of
            $36.43. The spec says $30.04. The healer kept the wrong value,
            swapped readable locators for positions, and reported "passing
            consistently". Three runs with retries off: it failed once.
          </p>
          <p className="mt-2">
            Before you trust a pass: run it several times with retries off,
            search for <code>test.fixme</code> and <code>test.skip</code>, and
            read the diff. Three runs is a quick smoke check. To call a test
            stable, run it 20 times.
          </p>
          <CodeBlock>{`npx playwright test --retries=0 --repeat-each=3   # smoke
npx playwright test --retries=0 --repeat-each=20  # stability
git grep -nE "test\\.(fixme|skip)"
git diff`}</CodeBlock>
        </div>

        <h3 id="check" className="mt-12 text-2xl font-bold scroll-mt-20">
          Check my work
        </h3>
        <p className="mt-2">In your codespace terminal:</p>
        <CodeBlock>npm run check -- t1</CodeBlock>
        <p>
          It runs your tests against frozen builds of the app and checks that
          they pass where the app is right and fail where it's wrong. It runs
          in your codespace and sends nothing anywhere, unless you opt in with{" "}
          <code>LEARN_SHARE=1</code>. At 8/8 it prints a completion code.
        </p>
        <CheckTabs />
        <CompletionCodeForm />

        <div className="mt-10 rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <span className="text-xs font-bold uppercase tracking-widest opacity-70">
            After the lab · 1.5 min clip
          </span>
          <h3 className="mt-1 text-xl font-bold">Where this breaks</h3>
          <p className="mt-2">
            Models differ, and some go silent mid-task. Every run uses quota.
            Two runs of one prompt can give different tests. Agents copy what
            they find, including answer keys. And no agent checks an intent
            nobody wrote down.
          </p>
          <p className="mt-2">
            <strong>When not to use an agent:</strong> for regression runs.
            Once a test is reviewed, run it as plain Playwright in CI, with no
            model in the loop: same answer every time, no tokens. Agents earn
            their keep writing, exploring and triaging.
          </p>
          <h3 className="mt-5 text-lg font-bold">Recap</h3>
          <ul className="mt-2 pl-5 [&_li]:mt-1">
            <li>Agentic = the agent plans its own steps and proposes what "pass" means.</li>
            <li>The planner plans, the generator writes what it sees, the healer optimises for green.</li>
            <li>The spec is your oracle. Green is not correct until you've checked it.</li>
          </ul>
        </div>
      </Section>

      <Divider />

      <Section id="quiz">
        <Eyebrow>About 8 minutes</Eyebrow>
        <SectionTitle id="quiz-h">Quiz</SectionTitle>
        <p className="mb-5 text-lg">
          10 questions. Your score and the explanation for every answer show
          right away. 8 of 10 completes the tutorial. Retake as often as you
          like.
        </p>
        <Quiz />
      </Section>

      <Divider />

      <Section id="certificate">
        <Eyebrow>After the check and the quiz</Eyebrow>
        <SectionTitle id="certificate-h">Your certificate</SectionTitle>
        <Certificate />
      </Section>

      <Divider />

      <Section id="after">
        <SectionTitle id="after-h">Optional, after the certificate</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-5">
            <h3 className="text-lg font-bold">Boss challenge</h3>
            <p className="mt-2 opacity-85">
              Two more bugs hide in the newer build, in FD-10 and FD-11. No
              hints. <ExternalLink href={t1Links.boss}>Lab › Boss challenge</ExternalLink>
            </p>
          </div>
          <div className="rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-5">
            <h3 className="text-lg font-bold">Going deeper, for test engineers and leads</h3>
            <p className="mt-2 opacity-85">
              Agents in CI, the review checklist as lint rules, how many runs
              prove "stable", tool permissions and cost. Stretch task: run the
              generator five times on the same plan and score each run, your
              first agent eval.{" "}
              <ExternalLink href={t1Links.goingDeeper}>Lab › Going deeper</ExternalLink>
            </p>
          </div>
        </div>
        {next && (
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-secondary-wopee to-purple-800 p-6 sm:p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-wopee">
              Next tutorial
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">{next.title}</h3>
            <p className="mt-2 text-white/90">
              You used an MCP server today without looking inside. Next, connect
              one yourself and see what your agent really reads on a page.
              Builds on this lab.
            </p>
            <Link
              to={next.status === "live" ? tutorialUrl(next) : "/learn/#notify"}
              className="mt-4 inline-flex rounded-lg bg-primary-wopee px-5 py-2.5 font-semibold text-secondary-wopee hover:text-secondary-wopee hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {next.status === "live" ? "Start the next tutorial" : "Get an email when it's out"}
            </Link>
          </div>
        )}
        <p className="mt-6 rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-4 text-sm">
          <strong>Try it at scale.</strong> Run an agent on every build and
          check each verdict against recorded evidence.{" "}
          <Link
            to="/?utm_source=learn&utm_medium=page&utm_campaign=learn-t1&utm_content=sidebar"
            className="font-semibold text-secondary-wopee dark:text-primary-wopee underline underline-offset-2"
          >
            Try Wopee.io free
          </Link>
        </p>
      </Section>

      <div className="container px-5 lg:px-10 pb-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-base">
            <strong>Taking this with your team?</strong> Run it on company
            accounts, as a cohort, with a facilitator guide:{" "}
            <Link to={teamsHref} className="font-semibold text-secondary-wopee dark:text-primary-wopee underline underline-offset-2">
              For QA leads
            </Link>
          </p>
          <HowThisWasMade teamsLink={false}>
            <p className="opacity-80 mt-3">
              FoodDash is a demo app built for this course, not affiliated with
              any delivery company.
            </p>
            <p className="opacity-80 mt-3">
              <ExternalLink href={t1Links.goingDeeper}>Agents in a real pipeline</ExternalLink>
              {" · "}
              <ExternalLink href={t1Links.boss}>Boss challenge: FD-10 and FD-11</ExternalLink>
              {" · "}
              <ExternalLink href={t1Links.issues}>Found a problem? Report it on GitHub</ExternalLink>
            </p>
          </HowThisWasMade>
        </div>
      </div>
    </main>
  </Layout>
);

export default T1Page;
