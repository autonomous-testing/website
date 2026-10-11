import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import { Clock } from "lucide-react";

import VideoBlock from "@/components/learn/VideoBlock";
import HowThisWasMade from "@/components/learn/HowThisWasMade";
import Expander, { ExpanderGroup } from "@/components/learn/Expander";
import Breadcrumb from "@/components/learn/Breadcrumb";
import EpisodeTag from "@/components/learn/EpisodeTag";
import LyingCheck from "@/components/learn/LyingCheck";
import SectionRail, { type RailItem } from "@/components/learn/t1/SectionRail";
import GradientCard from "@/components/ui/GradientCard";
import { Button } from "@/components/ui/button";
import {
  accent,
  container,
  ctaSize,
  h1,
  heroBg,
  surface,
  textLink,
} from "@/components/learn/styles";
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
import { t1Chapters, t1Links, t1Steps, t1StopAfter } from "@/data/learn-t1";
import { tutorials, tutorialUrl } from "@/data/learn-tutorials";
import { cn } from "@/lib/utils";

const TITLE = "Agentic Testing with Playwright's AI Agents: Free Tutorial";
const DESCRIPTION =
  "Free hands-on tutorial for QA testers: run Playwright's planner, generator and healer on a demo app and check every test they write. Browser lab, automatic grade, LinkedIn certificate.";

const launched = learnConfig.t1.launched;
const next = tutorials.find((t) => t.id === "T2");
const teamsHref = "/learn/teams/?utm_source=learn&utm_medium=page&utm_campaign=learn-t1";

const linkCls = textLink;

const RAIL: RailItem[] = [
  { id: "try", label: "60-second test" },
  { id: "steps", label: "How it works" },
  { id: "learn", label: "What you'll learn" },
  { id: "before", label: "Before you start" },
  { id: "concepts", label: "The ideas" },
  { id: "lab", label: "The lab" },
  { id: "check", label: "Check my work" },
  { id: "quiz", label: "Quiz" },
  { id: "certificate", label: "Certificate" },
  { id: "after", label: "After the certificate" },
];

// Prose is capped at a comfortable line length; code, widgets and cards use the full column.
const Section = ({
  id,
  className,
  band = false,
  children,
}: {
  id: string;
  className?: string;
  /** A tinted band that sets the section apart (lab, certificate). */
  band?: boolean;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-h`}
    className={cn(
      "scroll-mt-24 py-8 sm:py-10 lg:py-14 [&>p]:max-w-[68ch]",
      band &&
        "-mx-6 my-4 bg-purple-50/70 px-6 dark:bg-white/[0.03] sm:mx-0 sm:rounded-3xl sm:px-8 lg:px-10",
      className,
    )}
  >
    {children}
  </section>
);

const ghostBtn =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-transparent px-6 py-3 text-base font-semibold text-gray-700 dark:border-white/20 dark:text-gray-300";

const LabButton = () =>
  launched ? (
    <Button asChild variant="wopeeFlat" className={ctaSize}>
      <a href={t1Links.codespaces} target="_blank" rel="noopener noreferrer" id="cta-t1-open-lab">
        Open the free lab
      </a>
    </Button>
  ) : (
    <span className={ghostBtn}>
      <Clock aria-hidden="true" className="h-4 w-4" />
      Lab opens at launch
    </span>
  );

const Hero = () => (
  <header className="relative overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent dark:from-transparent" style={heroBg} />
    <div className={cn(container, "relative pt-4 pb-8 lg:pt-14 lg:pb-16")}>
      <div className="mx-auto max-w-6xl">
        <Breadcrumb here="Tutorial 1" />
        <EpisodeTag n={1} className="mt-4" />
        <h1 className={cn(h1, "mt-4 max-w-4xl")}>
          Agentic testing with{" "}
          <span className={accent}>Playwright's AI agents</span>
        </h1>
        <p className="m-0 mt-5 max-w-[42rem] text-lg leading-snug text-gray-700 dark:text-gray-300 sm:text-xl">
          Run Playwright's planner, generator and healer on a demo app, then
          check every test they write. No coding experience needed.
        </p>
        <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0 text-sm">
          {["About 2 hours", "Lab in your browser", "Automatic grade", "LinkedIn certificate"].map((c) => (
            <li
              key={c}
              className="rounded-full border border-solid border-gray-200 bg-white/80 px-3 py-1 font-semibold dark:border-white/10 dark:bg-white/5"
            >
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {launched ? (
            <>
              <LabButton />
              <a href="#try" className={cn(textLink, "inline-flex min-h-[44px] items-center no-underline")}>
                Try the 60-second test ↓
              </a>
            </>
          ) : (
            <>
              <Button asChild variant="wopeeFlat" className={ctaSize}>
                <a href="#try">Try the 60-second test ↓</a>
              </Button>
              <LabButton />
            </>
          )}
        </div>
        <p className="m-0 mt-4 text-sm text-gray-700 dark:text-gray-300">
          {launched ? (
            <>
              Free GitHub account needed. Not now?{" "}
              <ExternalLink href={t1Links.calendar}>Add 2 hours to your calendar</ExternalLink>.
              Prefer your laptop?{" "}
              <ExternalLink href={t1Links.localSetup}>Local setup</ExternalLink>.
            </>
          ) : (
            <>
              Not open yet.{" "}
              <Link to="/learn/#notify" className={linkCls}>
                Get one email at launch
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </div>
  </header>
);

const STEPS = [
  { title: "Watch a 3-minute video", body: "One idea, explained with a real test run, plus a 60-second exercise." },
  { title: "Do the lab in your browser", body: "Run Playwright's AI agents on a demo food-delivery app and fix what they get wrong." },
  { title: "Get graded, get certified", body: "An automatic check grades your tests. Pass the quiz, then add the certificate to LinkedIn." },
];

const HowItWorks = () => (
  <Section id="steps">
    <SectionTitle id="steps-h">How it works</SectionTitle>
    <ol className="relative m-0 grid list-none gap-6 p-0 md:grid-cols-3">
      <span
        aria-hidden="true"
        className="absolute left-[18px] right-[18px] top-[18px] hidden h-px bg-gradient-to-r from-secondary-wopee/40 via-purple-400/40 to-primary-wopee/60 md:block"
      />
      {STEPS.map(({ title, body }, i) => (
        <li key={title} className="relative flex gap-4 md:flex-col md:gap-3">
          <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-solid border-secondary-wopee/40 bg-white font-mono text-sm font-bold text-secondary-wopee dark:border-primary-wopee/50 dark:bg-[#1b1b1d] dark:text-primary-wopee">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="m-0 text-lg font-bold">{title}</h3>
            <p className="m-0 mt-1 text-gray-700 dark:text-gray-300">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

const Concepts = () => (
  <div className="flex flex-col gap-4 [&>p]:max-w-[68ch]">
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        ["Scripted", "You decide", "You write every step and every check."],
        ["AI-assisted", "You still decide", "A copilot suggests code, and you still decide the steps."],
        ["Agentic", "The agent proposes", "You give a goal. The agent plans, acts, observes and judges in a loop until it thinks it's done."],
      ].map(([h, who, p], i) => (
        <div
          key={h}
          className={cn(
            "rounded-xl border border-solid p-4",
            i === 2
              ? "border-secondary-wopee dark:border-primary-wopee bg-secondary-wopee/5 dark:bg-primary-wopee/5"
              : "border-gray-200 dark:border-white/10",
          )}
        >
          <h3 className="m-0 text-lg font-bold">{h}</h3>
          <p className="m-0 mt-1 text-sm font-semibold text-secondary-wopee dark:text-primary-wopee">{who}</p>
          <p className="m-0 mt-2 text-gray-800 dark:text-gray-200">{p}</p>
        </div>
      ))}
    </div>
    <p className="m-0">
      The weak spot is the judging. An agent needs an <strong>oracle</strong>,
      a source of truth for what "correct" means. For our demo app, FoodDash,
      that's the spec, not the app.
    </p>
    <p className="m-0">
      <strong>You stay in the loop in four places:</strong> you choose the
      oracle, review the plan, review every assertion and every fix, and judge
      flakiness over several runs.
    </p>
    <p className="m-0">
      <strong>Playwright's three agents</strong> are set up with one command.
      They reach Playwright through its test-runner <strong>MCP server</strong>.
      MCP is a standard plug that lets an AI agent use a tool; tutorial 2 is
      all about it. Each agent starts from a seed test that opens the app.
    </p>
    <div className="grid gap-3">
      {[
        ["Planner", "writes: a plan", "Explores the app and writes a plan in plain English. It has no file-edit tool, but it can run code in the browser, and by default on your machine. The lab removes that last tool."],
        ["Generator", "writes: new test files", "Replays the plan in a real browser and writes new test files. Its expected values come from what it saw."],
        ["Healer", "edits: any test file", null],
      ].map(([name, may, body]) => (
        <div key={name} className="rounded-xl border border-solid border-gray-200 dark:border-white/10 p-4">
          <p className="m-0 flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold">{name}</span>
            <span className="rounded-md bg-gray-100 dark:bg-white/10 px-2 py-0.5 font-mono text-xs">{may}</span>
          </p>
          <p className="m-0 mt-2 text-gray-800 dark:text-gray-200">
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
    <p className="m-0 text-sm text-gray-700 dark:text-gray-300">
      On Copilot Free, delete the <code>model:</code> line the setup writes
      into each agent file. The lab does it for you.
    </p>
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
    <main className="[&_p_code]:whitespace-nowrap">
      <Hero />
      <div className={container}>
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 xl:grid-cols-[200px_minmax(0,1fr)]">
          <SectionRail items={RAIL} />
          <div className="min-w-0 max-w-4xl">

      <Section id="try" className="pt-4 lg:pt-6">
        <Eyebrow>60 seconds</Eyebrow>
        <SectionTitle id="try-h">Is this test correct?</SectionTitle>
        <p className="mb-6 text-lg">
          An AI agent wrote this test. It passes. The spec, the written rules
          for the app: <em>orders over $25 get 20 % off food, delivery $2.99,
          service $1.50.</em>
        </p>
        <TryWidget />
      </Section>

      <HowItWorks />

      {learnConfig.t1.videoId && (
        <>
              <Section id="video">
            <Eyebrow>Green is not correct · 3 min</Eyebrow>
            <SectionTitle id="video-h">Watch first</SectionTitle>
            <VideoBlock
              videoId={learnConfig.t1.videoId}
              title="Green is not correct: T1 part 1"
              comingLabel=""
            />
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              AI voice of Marcel. Script, test runs and results are real.
            </p>
            <Callout label="Predict.">
              An agent tests checkout with an empty form. What will its test
              expect?
            </Callout>
            <Expander className="mt-4" summary="Chapters of the full 11-minute video">
              <ol className="m-0 grid list-none gap-x-8 gap-y-1.5 p-0 sm:grid-cols-2">
                {t1Chapters.map(([t, label]) => (
                  <li key={t} className="flex gap-3">
                    <time className="w-12 flex-shrink-0 font-mono text-sm text-gray-600 dark:text-gray-400">{t}</time>
                    <span>{label}</span>
                  </li>
                ))}
              </ol>
            </Expander>
          </Section>
        </>
      )}


      <Section id="learn">
        <SectionTitle id="learn-h">What you'll learn</SectionTitle>
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2 text-base sm:text-lg">
          {[
            "Tell scripted, AI-assisted and agentic testing apart",
            "Run Playwright's three AI agents and know what each may change",
            'Make the spec, not the app, decide what "correct" means',
            "Review an agent's test in 5 minutes",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <LyingCheck label="" size="sm" className="mt-1 h-5" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>


      <Section id="before">
        <SectionTitle id="before-h">Before you start</SectionTitle>
        <ul className="m-0 flex list-none flex-col gap-2 p-0 text-base sm:text-lg">
          {[
            <>A free <strong>GitHub account</strong>. That's all you need.</>,
            <><strong>Copilot Free</strong> is optional: 5 prompts. Every step also works without AI.</>,
            <>Never written code? You'll read and edit tests, not write them.</>,
            <>Two sittings are fine. Your work waits for you.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-green-700 dark:text-green-400">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Expander className="mt-5" summary="Details: free hours, prompts, fast lane">
          <ul className="m-0 flex flex-col gap-2 pl-5">
            <li>
              The lab runs in <strong>GitHub Codespaces</strong>, a computer in
              the cloud with VS Code in your browser: about 60 free hours a
              month on the default machine. This lab uses about 2.
            </li>
            <li>
              Turn on <strong>GitHub Copilot Free</strong> in your{" "}
              <ExternalLink href={t1Links.copilotSettings}>GitHub settings</ExternalLink>.
              This lab uses 5 chat prompts, 6 with one retry. All three
              tutorials together: up to about 20 Copilot prompts, spread over
              two months, or use the no-AI paths.
            </li>
            <li>
              <strong>First time with code?</strong> Plan two sittings: steps 0
              to 2, then 3 and 4. Stop the codespace in between and your work
              waits for you. The lab starts with a short guide to reading a test.
            </li>
            <li>
              <strong>Done this kind of thing before?</strong> Answer three
              questions; at 3 of 3, go straight to step 3 and the boss challenge.
            </li>
            <li>
              <strong>Taking this with your team?</strong> Company accounts,
              cohorts and a facilitator guide:{" "}
              <Link to={teamsHref} className={linkCls}>For QA leads</Link>
            </li>
          </ul>
        </Expander>
      </Section>


      <Section id="concepts">
        <Eyebrow>The ideas</Eyebrow>
        <SectionTitle id="concepts-h">Who decides what "pass" means?</SectionTitle>
        <p className="m-0 text-lg">
          Scripted: you. AI-assisted: still you. Agentic: the agent proposes,
          and you check it against the spec.
        </p>
        <Expander className="mt-4" summary="The ideas in 5 minutes">
          <Concepts />
        </Expander>
      </Section>


      <Section id="lab" band>
        <Eyebrow>60 to 90 min · GitHub Codespaces</Eyebrow>
        <SectionTitle id="lab-h">The lab: 6 steps</SectionTitle>
        <p className="m-0 mb-6 text-lg">
          Some of your tests will <strong>fail</strong>. That's the point:
          where the app breaks the spec, the failing test is your finding.
        </p>
        <ol className="m-0 mb-8 list-none p-0">
          {t1Steps.map((s, i) => (
            <li key={s.key} className="relative flex gap-4 pb-4 last:pb-0">
              {i < t1Steps.length - 1 && (
                <span aria-hidden="true" className="absolute left-[17px] top-9 bottom-0 w-px bg-secondary-wopee/25 dark:bg-white/15" />
              )}
              <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-solid border-secondary-wopee/40 bg-white font-mono text-sm font-bold text-secondary-wopee dark:border-primary-wopee/50 dark:bg-[#232326] dark:text-primary-wopee">
                {s.key}
              </span>
              <span className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-4 pt-1.5">
                <span className="font-semibold">{s.title}</span>
                <span className="whitespace-nowrap font-mono text-sm text-gray-600 dark:text-gray-400">{s.time}</span>
                {s.key === t1StopAfter && (
                  <span className="basis-full text-sm text-gray-700 dark:text-gray-300">Good place to stop.</span>
                )}
              </span>
            </li>
          ))}
        </ol>
        <ExpanderGroup>
          <Expander grouped summary="Step tracker: what you do, checkpoints" meta="6 steps">
            <LabTracker />
          </Expander>
          <Expander grouped summary="Stuck? Hints and reset">
            <p className="m-0">
              In the terminal, <code>npm run check -- t1 --step N --hint 1</code>{" "}
              gives a nudge; <code>--hint 2</code> the shape; <code>--hint 3</code>{" "}
              the answer. <code>npm run reset -- t1 cpN</code> goes back to your
              last passed checkpoint. Still stuck after 10 minutes?{" "}
              <ExternalLink href={t1Links.discussions}>Ask in Discussions</ExternalLink>{" "}
              and tell us the step.
            </p>
          </Expander>
          <Expander grouped variant="clip" meta="2.5 min" summary="Before step 4: before you trust a pass">
            <p className="m-0">
              In our own rehearsal, the generator expected an order total of
              $36.43. The spec says $30.04. The healer kept the wrong value,
              swapped readable locators for positions, and reported "passing
              consistently". Three runs with retries off: it failed once.
            </p>
            <p className="m-0 mt-2">
              Before you trust a pass: run it several times with retries off,
              search for <code>test.fixme</code> and <code>test.skip</code>, and
              read the diff. Three runs is a quick smoke check. To call a test
              stable, run it 20 times.
            </p>
            <CodeBlock label="Commands to run before you trust a pass">{`npx playwright test --retries=0 --repeat-each=3   # smoke
npx playwright test --retries=0 --repeat-each=20  # stability
git grep -nE "test\\.(fixme|skip)"
git diff`}</CodeBlock>
          </Expander>
          <Expander grouped variant="clip" meta="1.5 min" summary="After the lab: where agents break">
            <p className="m-0">
              Models differ, and some go silent mid-task. Every run uses quota.
              Two runs of one prompt can give different tests. Agents copy what
              they find, including answer keys. And no agent checks an intent
              nobody wrote down.
            </p>
            <p className="m-0 mt-2">
              <strong>When not to use an agent:</strong> for regression runs.
              Once a test is reviewed, run it as plain Playwright in CI, with no
              model in the loop: same answer every time, no tokens. Agents earn
              their keep writing, exploring and triaging.
            </p>
            <h3 className="mt-4 text-lg font-bold">Recap</h3>
            <ul className="m-0 mt-2 pl-5 [&_li]:mt-1">
              <li>Agentic = the agent plans its own steps and proposes what "pass" means.</li>
              <li>The planner plans, the generator writes what it sees, the healer optimises for green.</li>
              <li>The spec is your oracle. Green is not correct until you've checked it.</li>
            </ul>
          </Expander>
        </ExpanderGroup>
      </Section>

      <Section id="check">
        <SectionTitle id="check-h">Check my work</SectionTitle>
        <p className="m-0">In your codespace terminal, run:</p>
        <CodeBlock>npm run check -- t1</CodeBlock>
        <p className="m-0">
          It checks that your tests pass where the app is right and fail where
          it's wrong. Nothing leaves your codespace. At 8/8 you get a code.
          Paste it here.
        </p>
        <CompletionCodeForm />
        <Expander className="mt-4" summary="See sample output" meta="3 runs">
          <p className="m-0 text-sm text-gray-700 dark:text-gray-300">
            It runs your tests against frozen builds of the app, in your
            codespace, and sends nothing anywhere unless you opt in with{" "}
            <code>LEARN_SHARE=1</code>.
          </p>
          <CheckTabs />
        </Expander>
      </Section>


      <Section id="quiz">
        <Eyebrow>About 8 minutes</Eyebrow>
        <SectionTitle id="quiz-h">Quiz</SectionTitle>
        <p className="m-0 text-lg">
          10 questions, answers explained as you go. 8 of 10 passes. Retake
          anytime.
        </p>
        <Expander className="mt-5" summary="Start the quiz" meta="10 questions">
          <Quiz />
        </Expander>
      </Section>


      <Section id="certificate" band>
        <SectionTitle id="certificate-h">Your certificate</SectionTitle>
        <Certificate />
      </Section>


      <Section id="after">
        <SectionTitle id="after-h">After the certificate</SectionTitle>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          <li>
            <strong>Boss challenge.</strong> Two more bugs hide in a newer
            build. No hints.{" "}
            <ExternalLink href={t1Links.boss}>Open the boss challenge</ExternalLink>
          </li>
          <li>
            <strong>Going deeper, for test engineers and leads.</strong> Agents
            in a real pipeline, review rules, cost. Stretch task: your first
            agent eval. <ExternalLink href={t1Links.goingDeeper}>Read more</ExternalLink>
          </li>
        </ul>
        {next && (
          <GradientCard variant="solid" padding="none" className="mt-8">
            <div className="p-6 sm:p-8">
              <p className="m-0 text-xs font-bold uppercase tracking-widest text-primary-wopee">
                Next tutorial
              </p>
              <h3 className="m-0 mt-1 text-2xl font-bold tracking-tight text-white">{next.title}</h3>
              <p className="m-0 mt-2 max-w-[60ch] text-white/90">
                You used an MCP server today without looking inside. Next,
                connect one yourself.
              </p>
              <Link
                to={tutorialUrl(next)}
                className="mt-5 inline-flex min-h-[44px] items-center rounded-lg bg-primary-wopee px-5 py-2.5 font-semibold text-secondary-wopee hover:bg-primary-wopee/90 hover:text-secondary-wopee hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {next.status === "live" ? "Start the next tutorial" : "Email me when it's out"}
              </Link>
            </div>
          </GradientCard>
        )}
        <p className="m-0 mt-6 text-sm">
          <strong>Try it at scale.</strong> Run an agent on every build, each
          pass checked against recorded evidence.{" "}
          <Link
            to="/?utm_source=learn&utm_medium=page&utm_campaign=learn-t1&utm_content=sidebar"
            className={linkCls}
          >
            Try Wopee.io free
          </Link>
        </p>
      </Section>

        <div className="pb-16 pt-4">
          <p className={cn("mb-8 rounded-xl px-5 py-4 text-base", surface)}>
            Training a QA team? Company accounts, cohorts and a facilitator
            guide.{" "}
            <Link to={teamsHref} className={linkCls}>
              For QA leads →
            </Link>
          </p>
          <HowThisWasMade teamsLink={false}>
            <p className="mt-1">
              FoodDash is a demo app built for this course, not affiliated with
              any delivery company.
            </p>
            <p className="mt-1">
              <ExternalLink href={t1Links.goingDeeper}>Agents in a real pipeline</ExternalLink>
              {" · "}
              <ExternalLink href={t1Links.boss}>Boss challenge: FD-10 and FD-11</ExternalLink>
              {" · "}
              <ExternalLink href={t1Links.issues}>Found a problem? Report it on GitHub</ExternalLink>
            </p>
          </HowThisWasMade>
        </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
);

export default T1Page;
