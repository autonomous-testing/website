import React from "react";

import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import { Link } from "../../components/ui/typedDocusaurus";
import VideoBlock from "@site/src/components/learn/VideoBlock";
import SocialCard from "@site/src/components/seo/SocialCard";
import {
  ACCENT,
  CARD,
  DOCS_URL,
  MUTED,
  PreviewPill,
  StatusDot,
  VIDEO_ID,
  VIDEO_POSTER,
  VIDEO_TITLE,
  VerdictCtas,
} from "@site/src/components/verdict/shared";
import {
  CHECKLIST,
  CHECKLIST_CLOSING,
} from "@site/src/data/false-pass-checklist";

const PERMALINK = "/no-proof-no-pass/";
const SCAN_DATES = "3-4 Nov 2026";
const CORRECTION_MAIL =
  "mailto:help@wopee.io?subject=No%20proof%2C%20no%20pass%3A%20comparison%20correction";

const JSON_LD_VIDEO = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: VIDEO_TITLE,
  description:
    "Wopee.io checks every test its agent passes against the run's own record. In Enforce, a pass without proof becomes Incomplete. A real run on a public demo shop: trap, amber Incomplete, green after adding checks.",
  thumbnailUrl: `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
  uploadDate: "2026-11-04T11:58:00+01:00",
  duration: "PT6M19S",
  embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
};

const STEPS: {
  n: string;
  tone: "passed" | "incomplete" | "failed";
  label: string;
  title: string;
  body: React.ReactNode;
  img: string;
  h: number;
  alt: string;
}[] = [
  {
    n: "01",
    tone: "passed",
    label: "The trap",
    title: "A test that names two prices, and checks neither",
    body: (
      <>
        The test expects a checkout total of $32.39: the backpack at $29.99 plus
        $2.40 tax. Its only defined check reads <q>Thank you for your order!</q>{" "}
        The agent completes the order and reports PASSED, quoting both prices.
      </>
    ),
    img: "/img/no-proof-no-pass/step-1-trap.webp",
    h: 720,
    alt: "Test card: Checkout total matches the backpack price, with one text assert for Thank you for your order and an expected result naming $29.99 plus tax $2.40",
  },
  {
    n: "02",
    tone: "incomplete",
    label: "Pass withdrawn",
    title: "No check read those prices. In Enforce, the pass is taken back",
    body: (
      <>
        The integrity gates compare the reported pass with what the run
        recorded. Both prices are flagged as unverified, so the pass becomes{" "}
        <strong>Incomplete</strong>: amber, not red. The run didn't find a bug,
        it proved nothing, and it never counts as a pass.
      </>
    ),
    img: "/img/no-proof-no-pass/step-2-incomplete.webp",
    h: 568,
    alt: "The same test card with an amber dot and the label Test incomplete, 6 steps, tagged pass withdrawn in Enforce",
  },
  {
    n: "03",
    tone: "passed",
    label: "Proof in, pass back",
    title: "Add the checks that read the numbers. Same test, rerun: green",
    body: (
      <>
        We added checks for the item total, the tax and the total. The rerun
        passes with nothing flagged, and this time the green comes with its
        proof.
      </>
    ),
    img: "/img/no-proof-no-pass/step-3-passed.webp",
    h: 320,
    alt: "The same test card after the rerun with a green dot: Test passed, 9 steps",
  },
];

type Mark = "yes" | "close" | "none";
type Vendor = {
  name: string;
  audit: { mark: Mark; note: string };
  downgrade: { mark: Mark; note: string };
  shadow: { mark: Mark; note: string };
  sources: { label: string; href: string }[];
};

const VENDORS: Vendor[] = [
  {
    name: "Wopee.io",
    audit: {
      mark: "yes",
      note: "Integrity gates check every agent pass against the run's own record.",
    },
    downgrade: {
      mark: "yes",
      note: "In Enforce, an unproven pass becomes Incomplete, with the gate and the evidence named.",
    },
    shadow: {
      mark: "yes",
      note: "Report only, on by default: a shadow verdict that never changes a stored result.",
    },
    sources: [{ label: "docs.wopee.io", href: DOCS_URL }],
  },
  {
    name: "TestMu AI · Kane CLI",
    audit: {
      mark: "close",
      note: "“A separate verification step decides the verdict.” The model's own account is not enough.",
    },
    downgrade: {
      mark: "close",
      note: "A July 2026 launch note: strict mode demotes tests that passed against a since-changed spec. Not on the product page today.",
    },
    shadow: { mark: "none", note: "Not found in public docs." },
    sources: [
      {
        label: "testmuai.com/kane-cli",
        href: "https://www.testmuai.com/kane-cli/",
      },
      {
        label: "Launch note, 24 Jul 2026",
        href: "https://techintelpro.com/news/ai/agentic-ai/testmu-ai-introduces-source-to-verdict-loop-in-kane-cli-with-portable-proof-packs",
      },
    ],
  },
  {
    name: "QA.tech",
    audit: {
      mark: "close",
      note: "A review agent writes one verdict per test plan. “Passed tests count as verified.”",
    },
    downgrade: {
      mark: "close",
      note: "Plan level: “Needs attention” when unverifiable tests leave part of the plan unproven. PR comments show “needs review” by confidence tier.",
    },
    shadow: { mark: "none", note: "Not found in public docs." },
    sources: [
      {
        label: "docs.qa.tech",
        href: "https://docs.qa.tech/regression-testing/regression-review-agent",
      },
      {
        label: "Changelog, 22 Apr 2026",
        href: "https://qa.tech/changelog/2026-04-22",
      },
    ],
  },
  {
    name: "Momentic · Mo",
    audit: {
      mark: "close",
      note: "Each verdict lists what the agent verified and “the gaps it could not close”. Step level: an independent reviewer judges the settled app state, the recorded actions and your goal.",
    },
    downgrade: {
      mark: "none",
      note: "Not found in public docs. A separate agent re-checks reported bugs, not passes.",
    },
    shadow: { mark: "none", note: "Not found in public docs." },
    sources: [
      {
        label: "momentic.ai/docs",
        href: "https://momentic.ai/docs/mo/reports",
      },
      {
        label: "momentic.ai/changelog",
        href: "https://momentic.ai/changelog",
      },
    ],
  },
];

const sourceRel = (href: string) =>
  /^https:\/\/([a-z0-9-]+\.)*wopee\.io\//.test(href)
    ? "noopener"
    : "nofollow noopener noreferrer";

const MARK: Record<Mark, { glyph: string; label: string; cls: string }> = {
  yes: {
    glyph: "✓",
    label: "Yes",
    cls: "bg-green-500/15 text-green-700 dark:text-green-400",
  },
  close: {
    glyph: "≈",
    label: "Close",
    cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  },
  none: {
    glyph: "–",
    label: "Not found",
    cls: "bg-gray-500/10 text-gray-500 dark:text-gray-400",
  },
};

const CAPABILITIES: {
  key: "audit" | "downgrade" | "shadow";
  label: string;
}[] = [
  { key: "audit", label: "1 · Audits the pass against the run" },
  { key: "downgrade", label: "2 · Downgrades an unproven pass" },
  { key: "shadow", label: "3 · Shadow mode first" },
];

function MarkCell(props: { mark: Mark; note: string }) {
  return (
    <td className="align-top">
      <MarkBody {...props} />
    </td>
  );
}

function MarkBody({ mark, note }: { mark: Mark; note: string }) {
  const m = MARK[mark];
  return (
    <>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${m.cls}`}
      >
        <span aria-hidden="true">{m.glyph}</span>
        {m.label}
      </span>
      <span className={`mt-1.5 block text-sm leading-snug ${MUTED}`}>
        {note}
      </span>
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-24 sm:mt-28">
      <header className="mb-8 max-w-3xl">
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${ACCENT}`}
        >
          {eyebrow}
        </span>
        <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${MUTED}`}>
            {intro}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function Hero() {
  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden bg-[#0b0a10] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 80%, rgba(112,48,160,0.45) 0%, transparent 50%), radial-gradient(circle at 88% 15%, rgba(255,204,0,0.16) 0%, transparent 45%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pb-24 lg:pt-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <PreviewPill>
            <span className="hidden sm:inline">Verdict integrity · </span>
            Experimental preview
          </PreviewPill>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[3.4rem] xl:text-6xl">
            Your AI tester said{" "}
            <span className="inline-flex items-center gap-3 rounded-2xl bg-green-500/15 px-3 py-0.5 align-middle text-green-400 ring-2 ring-green-500/40 sm:px-4">
              <span
                aria-hidden="true"
                className="h-3 w-3 rounded-full bg-green-500 sm:h-4 sm:w-4"
              />
              PASSED.
            </span>
            <br />
            <span className="text-primary-wopee">Did it prove it?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Wopee.io is the AI tester that audits its own passes. Every test our
            agent passes is checked against the run's own record. Report only
            flags missing proof by default; switch on Enforce and an unproven
            pass becomes Incomplete.
          </p>
          <p className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            No proof, no pass.
          </p>
          <VerdictCtas content="hero" className="mt-8 lg:justify-start" />
          <p className="mt-4 text-sm text-gray-400">
            On every plan, Free too. No credit card required.
          </p>
        </div>
        <div className="w-full">
          <VideoBlock
            videoId={VIDEO_ID}
            title={VIDEO_TITLE}
            poster={VIDEO_POSTER}
            comingLabel=""
          />
          <p className="mt-3 text-center text-sm text-gray-400 lg:text-left">
            {VIDEO_TITLE} · 6:19 · A real run on our demo project.{" "}
            <a
              href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
              className="text-gray-300 underline underline-offset-4 hover:text-primary-wopee"
            >
              Watch on YouTube
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <Section
      id="story"
      eyebrow="One real run, three moments"
      title="We set our own agent a trap."
      intro="Our demo project on a public demo shop, with Enforce switched on. Frames from runs of 3 and 4 November 2026, as they appear in the video."
    >
      <ol className="m-0 flex list-none flex-col gap-6 p-0 sm:gap-8">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            className={`${CARD} grid items-center gap-6 overflow-hidden p-5 sm:p-6 lg:grid-cols-2 lg:gap-10 ${
              s.tone === "incomplete"
                ? "!border-amber-500/50 !bg-amber-500/[0.06]"
                : ""
            }`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-gray-400">
                  {s.n}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-900/5 px-3 py-1 text-xs font-bold uppercase tracking-widest dark:bg-white/10">
                  <StatusDot tone={s.tone} />
                  {s.label}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-snug">
                {s.title}
              </h3>
              <p className={`mt-3 text-base leading-relaxed ${MUTED}`}>
                {s.body}
              </p>
            </div>
            <img
              src={s.img}
              alt={s.alt}
              width={1280}
              height={s.h}
              loading="lazy"
              className="block h-auto w-full rounded-xl border border-solid border-black/10 bg-black dark:border-white/10"
            />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function ThreeVerdicts() {
  const items = [
    {
      tone: "passed" as const,
      name: "Passed",
      text: "The run recorded the proof. No gate withheld the pass.",
    },
    {
      tone: "incomplete" as const,
      name: "Incomplete",
      text: "Not fully proven. Never counted as a pass. Fix: add the missing check, not a bug ticket.",
    },
    {
      tone: "failed" as const,
      name: "Failed",
      text: "The run found a failure. In Enforce, a Failed with no failure on record is withdrawn to Incomplete too.",
    },
  ];
  return (
    <ul className="m-0 mt-8 grid list-none gap-4 p-0 sm:grid-cols-3">
      {items.map((it) => (
        <li key={it.name} className={`${CARD} px-5 py-5`}>
          <span className="flex items-center gap-2 text-lg font-bold">
            <StatusDot tone={it.tone} />
            {it.name}
          </span>
          <span className={`mt-2 block text-sm leading-relaxed ${MUTED}`}>
            {it.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ReportOnly() {
  return (
    <Section
      id="report-only"
      eyebrow="Start here"
      title={
        <>
          Report only: on by default.{" "}
          <span className={ACCENT}>Your stored results don't change.</span>
        </>
      }
      intro="Watch the gates on your own runs before they touch a single result. When the flags look right on your project, switch on Enforce."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className={`${CARD} px-6 py-6`}>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Report only · default
          </span>
          <h3 className="mt-2 text-xl font-bold">
            A second opinion, in the report
          </h3>
          <ul
            className={`mt-3 list-disc pl-5 text-base leading-relaxed ${MUTED}`}
          >
            <li>
              Every run gets a Verdict Integrity section with a shadow verdict.
            </li>
            <li>
              A pass the gates disagree with gets an amber ring, with the gate
              named.
            </li>
            <li>Stored results, counts and filters stay as they are.</li>
          </ul>
        </div>
        <div className={`${CARD} !border-amber-500/50 px-6 py-6`}>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
            Enforce · one switch per project
          </span>
          <h3 className="mt-2 text-xl font-bold">No proof, no pass</h3>
          <ul
            className={`mt-3 list-disc pl-5 text-base leading-relaxed ${MUTED}`}
          >
            <li>An unproven pass becomes Incomplete, with the reason.</li>
            <li>A withdrawn pass never inflates your pass rate.</li>
            <li>Project admins switch it on in Project Settings › Verdict.</li>
          </ul>
        </div>
      </div>
      <ThreeVerdicts />
      <p className="mt-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        In both modes, the agent can be sent back for a missing check before it
        stops: at most eight extra steps per run, counted toward your plan's
        steps. Experimental preview: today it's one switch per project, and
        per-check switches are in design.{" "}
        <a href={DOCS_URL} className="underline underline-offset-4">
          How verdict integrity works
        </a>
      </p>
    </Section>
  );
}

function Comparison() {
  return (
    <Section
      id="who-audits"
      eyebrow="Who audits their passes?"
      title={
        <>
          Some come close.{" "}
          <span className={ACCENT}>
            As far as we can find, nobody else does all three.
          </span>
        </>
      }
      intro={
        <>
          Most AI testing tools explain their failures. A few check their passes
          too, and we credit them below. What we couldn't find anywhere else: an
          unproven pass downgraded to its own verdict, and a shadow mode to
          watch it first.
        </>
      }
    >
      <ul className="m-0 flex list-none flex-col gap-4 p-0 md:hidden">
        {VENDORS.map((v, i) => (
          <li
            key={v.name}
            className={`${CARD} px-5 py-5 ${
              i === 0
                ? "!border-secondary-wopee/50 !bg-secondary-wopee/[0.06] dark:!border-primary-wopee/40 dark:!bg-primary-wopee/[0.06]"
                : ""
            }`}
          >
            <span className="text-lg font-bold">{v.name}</span>
            <dl className="m-0 mt-3 flex flex-col gap-3">
              {CAPABILITIES.map((c) => (
                <div key={c.key}>
                  <dt className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {c.label}
                  </dt>
                  <dd className="m-0 mt-1">
                    <MarkBody {...v[c.key]} />
                  </dd>
                </div>
              ))}
            </dl>
            <span className="mt-3 flex flex-wrap gap-x-4 text-sm">
              {v.sources.map((src) => (
                <a
                  key={src.href}
                  href={src.href}
                  className="underline underline-offset-4"
                  rel={sourceRel(src.href)}
                >
                  {src.label}
                </a>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <div className={`${CARD} hidden overflow-x-auto md:block`}>
        <table className="m-0 w-full min-w-[880px] table-fixed border-collapse text-left [&_td]:border-0 [&_td]:border-t [&_td]:border-solid [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-4 dark:[&_td]:border-white/10 [&_th]:border-0 [&_th]:px-4 [&_th]:py-3 [&_tr]:border-0 [&_tr]:bg-transparent">
          <caption className="sr-only">
            Three verdict capabilities across AI testing agents, from public
            sources read {SCAN_DATES}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[15%] text-sm font-bold">
                Tool
              </th>
              <th scope="col" className="w-[23%] text-sm font-bold">
                1 · Audits the pass against the run
              </th>
              <th scope="col" className="w-[23%] text-sm font-bold">
                2 · Downgrades an unproven pass
              </th>
              <th scope="col" className="w-[23%] text-sm font-bold">
                3 · Shadow mode first
              </th>
              <th scope="col" className="w-[16%] text-sm font-bold">
                Source
              </th>
            </tr>
          </thead>
          <tbody>
            {VENDORS.map((v, i) => (
              <tr
                key={v.name}
                className={
                  i === 0
                    ? "!bg-secondary-wopee/[0.06] dark:!bg-primary-wopee/[0.06]"
                    : ""
                }
              >
                <th scope="row" className="align-top text-base font-bold">
                  {v.name}
                </th>
                <MarkCell {...v.audit} />
                <MarkCell {...v.downgrade} />
                <MarkCell {...v.shadow} />
                <td className="align-top text-sm">
                  {v.sources.map((src) => (
                    <a
                      key={src.href}
                      href={src.href}
                      className="mb-1 block break-words underline underline-offset-4"
                      rel={sourceRel(src.href)}
                    >
                      {src.label}
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        Public docs and product pages, read {SCAN_DATES}. Not exhaustive:
        something missing from public docs may still exist in a product. We also
        read mabl, BrowserStack, Applitools, testRigor, Tricentis, Katalon and
        Playwright's test agents, and found failure explanations and healing,
        but no documented audit of a pass.{" "}
        <a
          href={CORRECTION_MAIL}
          className={`font-semibold underline underline-offset-4 ${ACCENT}`}
        >
          Tell us if we're wrong
        </a>{" "}
        and we'll fix this table.
      </p>
    </Section>
  );
}

function ChecklistTeaser() {
  const picks = CHECKLIST.filter((c) => [2, 3, 5].includes(c.n));
  return (
    <Section
      id="checklist"
      eyebrow="The False Pass Checklist"
      title="Seven questions to ask any AI testing tool before you trust its green."
      intro={CHECKLIST_CLOSING}
    >
      <div className={`${CARD} px-5 py-6 sm:px-8`}>
        <ol className="m-0 flex list-none flex-col gap-5 p-0">
          {picks.map((c) => (
            <li key={c.n} className="flex gap-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-wopee/10 text-base font-extrabold dark:bg-primary-wopee/10 ${ACCENT}`}
              >
                {c.n}
              </span>
              <span>
                <span className="block text-lg font-bold leading-snug">
                  {c.question}
                </span>
                <span className={`mt-1 block text-sm ${MUTED}`}>{c.why}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            to="/false-pass-checklist/"
            className={`text-base font-bold underline underline-offset-4 ${ACCENT}`}
          >
            Read all seven, with our own answers →
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Free, no sign-up, saves as a PDF.
          </span>
        </div>
      </div>
    </Section>
  );
}

function Closing() {
  return (
    <section
      data-theme="dark"
      className="mt-20 rounded-3xl bg-[#0b0a10] px-6 py-12 text-center text-white sm:mt-28 sm:px-10 sm:py-16"
    >
      <PreviewPill>Experimental preview · on every plan</PreviewPill>
      <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Make your green mean something.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
        Start free and watch Report only on your own runs. Or book 20 minutes
        and we'll walk you through every verdict your passes got.
      </p>
      <VerdictCtas content="closing" className="mt-8" />
      <p className="mx-auto mt-6 max-w-2xl text-sm text-gray-400">
        Verdict integrity is in experimental preview; we ship improvements to it
        continuously.{" "}
        <Link
          to="/changelog/verdict-integrity-gates/"
          className="text-gray-300 underline underline-offset-4 hover:text-primary-wopee"
        >
          Changelog
        </Link>{" "}
        ·{" "}
        <a
          href={DOCS_URL}
          className="text-gray-300 underline underline-offset-4 hover:text-primary-wopee"
        >
          Docs
        </a>
      </p>
    </section>
  );
}

export default function NoProofNoPassPage(): JSX.Element {
  return (
    <Layout
      title="No Proof, No Pass: AI Tests That Prove It"
      description="Your AI tester said PASSED. Did it prove it? Wopee.io audits every pass its agent reports. In Enforce, a pass without proof becomes Incomplete."
    >
      <SocialCard permalink={PERMALINK} />
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(JSON_LD_VIDEO)}
        </script>
      </Head>
      <main>
        <Hero />
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <Story />
          <ReportOnly />
          <div className="mt-10 flex flex-col items-center gap-3">
            <VerdictCtas content="report-only" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Report only is on by default. Nothing changes until you switch on
              Enforce.
            </span>
          </div>
          <Comparison />
          <ChecklistTeaser />
          <Closing />
        </div>
      </main>
    </Layout>
  );
}
