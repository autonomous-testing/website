import React, { useState } from "react";

import { Head, Layout, Link } from "../../../components/ui/typedDocusaurus";

const VIDEO_ID = "9qk64KKUZJw";
const TITLE =
  "Build an AI QA Agent that reads Jira, runs Playwright, and closes the ticket";
const PAGE_URL = "https://wopee.io/videos/ai-qa-agent-jira-playwright/";
const WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}`;
const DOCS_MCP = "https://docs.wopee.io/guides/wopee-mcp/";
const DOCS_CURSOR = "https://docs.wopee.io/guides/wopee-mcp/cursor/";
const BOOK_DEMO = "/book-demo/";
const DURATION_SECONDS = 276;

const SUMMARY =
  "In this 4.5-minute demo, an AI agent built in Cursor takes a fixed Jira bug, picks the most relevant tests from Wopee.io, runs them with Playwright, and posts the test report back to Jira before moving the ticket to Done. The agent combines three MCP servers: the Wopee.io MCP server, Playwright and Atlassian. The video also shows how the same approach can turn specifications from Notion, Confluence or SharePoint into tests that run in Wopee.io.";

type Chapter = { start: number; title: string; text: string };

const CHAPTERS: Chapter[] = [
  {
    start: 0,
    title: "The basic flow: a prompt and a URL to test results",
    text: "Hi there. I would like to show you some more features Wopee.io can offer. I was doing multiple demos in the last months, and I found out that some people keep asking about additional use cases. So it's time to show you something more. This is the typical use case I often demo. It's just three basic steps: you provide your prompt and URL. Then we collect all the data about the app that our agent could collect during the crawling, based on the prompt, and then we provide test results. We have the test cases, we run them, and we can give you the results. But this is just a fraction of what Wopee.io can offer. So how it works: as I said, a prompt, then you have tests and reports, and then you have a battery of tests that you can execute later.",
  },
  {
    start: 49,
    title: "The Wopee.io MCP server, plus Playwright and Atlassian",
    text: "Apart from that, you can also use our Wopee.io MCP, and this opens a completely new galaxy for you in test automation and in boosting efficiency in your web app testing. Let me quickly explain how it works. Wopee.io MCP has multiple tools which you can easily integrate into your IDE. You can use Cursor, ChatGPT, Claude Code, whatever MCP client you have. Apart from this, for my demo I decided to bring two more tools. One is Playwright, with all the tools it offers, and the other is Atlassian, where you can fetch data like a specification from Confluence or a bug report from Jira. I combined these tools to build this demo, to show you how it could work.",
  },
  {
    start: 104,
    title: "Demo: read the Jira bug and move it to In Progress",
    text: "Imagine you have a bug and it's already fixed. So now I'm running my agent, combining Playwright, Atlassian and Wopee.io. First I am fetching the details about the ticket from Jira, and then I'm moving the ticket to In Progress.",
  },
  {
    start: 121,
    title: "Pick the most relevant tests from Wopee.io",
    text: "Once this is done, I am fetching all the test cases from Wopee.io to find out which ones could be most relevant. I am selecting the top three of these tests to execute them. Now I'm running the MCP tools to fetch all the data about the test cases, and I'm already prioritizing and preselecting the top five. Or not me, but the agent I built. Once I have it, I'm posting the information about the selected tests to Jira.",
  },
  {
    start: 150,
    title: "Playwright runs the tests",
    text: "I'm testing the ordering feature, and you can see that Playwright is now running the tests and the products are reordered.",
  },
  {
    start: 160,
    title: "Test report on the Jira ticket, ticket moved to Done",
    text: "Once this is done, I'm collecting all the details and preparing a test report, and this test report is added to Jira as a comment. Once this is done, I am moving the ticket to Done, and then my agent is finished. This is one of the use cases where you can use MCP, run it with a simple prompt and integrate all the tooling together.",
  },
  {
    start: 185,
    title: "Same approach: specs from Notion, Confluence or SharePoint",
    text: "This opens a completely new world, where you can use the same approach to fetch the specification from Notion, Confluence or SharePoint, use it to generate higher-quality tests, and then execute them in Wopee.io. The same can be done for new functionality. If you already have tests, you can easily push them into Wopee.io, so your colleagues can maintain them there, and then run the other agent to execute the tests you prepared. Then you can combine all these things together and automate more easily.",
  },
  {
    start: 226,
    title: "Recap: an agentic colleague in your workflow",
    text: "So what was this demo about? As I said, I fetched the bug, then I fetched the tests and prepared the test plan. Basically, I preselected the top five tests, executed three of them, and kept updating Jira while it was running. This is an agentic colleague, and you can integrate it into your workflow. Your developers can now ask this agentic tester to rerun the bug fixes.",
  },
  {
    start: 258,
    title: "Built with Cursor and three MCP servers",
    text: "This demo was run with Cursor, and as I said, I integrated Atlassian, Wopee.io and Playwright as MCP servers to show you how it could work. But there is much more. If you would like to try it, just go to Wopee.io, where you can find more information and details.",
  },
];

const TRANSCRIPT = CHAPTERS.map((c) => c.text).join("\n\n");

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

const JSON_LD_VIDEO = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": `${PAGE_URL}#video`,
  name: TITLE,
  description: SUMMARY,
  thumbnailUrl: [
    `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`,
  ],
  uploadDate: "2025-12-18T19:43:15+00:00",
  duration: "PT4M36S",
  contentUrl: WATCH_URL,
  embedUrl: EMBED_URL,
  inLanguage: "en",
  transcript: TRANSCRIPT,
  publisher: {
    "@type": "Organization",
    "@id": "https://wopee.io/#organization",
    name: "Wopee.io",
    url: "https://wopee.io/",
  },
  hasPart: CHAPTERS.map((c, i) => ({
    "@type": "Clip",
    name: c.title,
    startOffset: c.start,
    endOffset: CHAPTERS[i + 1]?.start ?? DURATION_SECONDS,
    url: `${WATCH_URL}&t=${c.start}s`,
  })),
};

const ACCENT = "text-secondary-wopee dark:text-primary-wopee";
const MUTED = "text-gray-600 dark:text-gray-300";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const BUTTON = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-solid px-6 py-3 text-center text-base font-bold no-underline transition ease-out hover:no-underline motion-reduce:transition-none ${FOCUS}`;
const BUTTON_PRIMARY = `${BUTTON} border-secondary-wopee bg-secondary-wopee text-white hover:bg-[#5e2786] hover:text-white dark:border-primary-wopee dark:bg-primary-wopee dark:text-[#1a1124] dark:hover:bg-[#ffd633] dark:hover:text-[#1a1124]`;
const BUTTON_SECONDARY = `${BUTTON} border-gray-300 bg-transparent text-inherit hover:border-secondary-wopee hover:text-secondary-wopee dark:border-white/20 dark:hover:border-primary-wopee dark:hover:text-primary-wopee`;

export default function AiQaAgentJiraPlaywrightVideo(): JSX.Element {
  const [start, setStart] = useState<number | null>(null);
  const src =
    start === null ? EMBED_URL : `${EMBED_URL}?start=${start}&autoplay=1`;

  const seek = (event: React.MouseEvent<HTMLAnchorElement>, seconds: number) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    setStart(seconds);
    document
      .getElementById("player")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout
      title="AI QA Agent with Jira and Playwright (Video)"
      description="Watch an AI agent read a Jira bug, pick the right Wopee.io tests, run them with Playwright and post the report back to Jira. Chapters and full transcript."
    >
      <Head>
        <meta property="og:type" content="video.other" />
        <meta
          property="og:image"
          content={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
        />
        <meta property="og:video" content={EMBED_URL} />
        <script type="application/ld+json">{JSON.stringify(JSON_LD_VIDEO)}</script>
      </Head>
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className={`mb-4 text-sm ${MUTED}`}>
          <Link to="/videos/">Videos</Link> <span aria-hidden="true">/</span>{" "}
          <span aria-current="page">AI QA agent with Jira and Playwright</span>
        </nav>
        <p className={`mb-2 text-sm font-semibold uppercase tracking-wide ${ACCENT}`}>
          Video · 4:36
        </p>
        <h1 className="mt-balance mb-4 text-[28px] font-extrabold leading-[1.15] tracking-tight sm:mb-6 sm:text-4xl">
          {TITLE}
        </h1>

        <div
          id="player"
          className="scroll-mt-24 aspect-video w-full overflow-hidden rounded-xl bg-black"
        >
          <iframe
            className="block h-full w-full border-0"
            src={src}
            title={TITLE}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <p className="mb-0 mt-5 text-base leading-relaxed sm:mt-6 sm:text-lg">{SUMMARY}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className={BUTTON_PRIMARY} to={BOOK_DEMO}>
            Book a demo
          </Link>
          <Link className={BUTTON_SECONDARY} to={DOCS_MCP}>
            Set up the Wopee.io MCP server
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-extrabold">Chapters</h2>
          <ol className="m-0 list-none p-0">
            {CHAPTERS.map((c) => (
              <li key={c.start}>
                <a
                  className={`grid min-h-11 grid-cols-[3rem_1fr] items-start gap-4 rounded-md px-2 py-2 text-inherit no-underline hover:bg-secondary-wopee/5 hover:text-inherit hover:no-underline dark:hover:bg-primary-wopee/5 ${FOCUS}`}
                  href={`${WATCH_URL}&t=${c.start}s`}
                  onClick={(e) => seek(e, c.start)}
                >
                  <span className={`font-mono font-semibold tabular-nums ${ACCENT}`}>
                    {clock(c.start)}
                  </span>
                  <span>{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-extrabold">Transcript</h2>
          <p className={`mb-6 text-sm ${MUTED}`}>
            Cleaned from the video's captions.
          </p>
          {CHAPTERS.map((c) => (
            <div key={c.start} className="mb-8 max-w-[72ch]">
              <h3 className="mb-1 text-base font-bold">
                <a
                  className={`mr-2 font-mono tabular-nums ${ACCENT} ${FOCUS}`}
                  href={`${WATCH_URL}&t=${c.start}s`}
                  onClick={(e) => seek(e, c.start)}
                >
                  {clock(c.start)}
                </a>
                {c.title}
              </h3>
              <p className="mb-0 text-base leading-7">{c.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 border-0 border-t border-solid border-gray-200 pt-8 dark:border-white/10">
          <h2 className="mb-4 text-2xl font-extrabold">Try it yourself</h2>
          <ul className="mb-0 space-y-2 pl-5 leading-relaxed">
            <li>
              <Link to={DOCS_MCP}>Wopee.io MCP server docs</Link>: setup for
              Cursor, Claude Code and other MCP clients.
            </li>
            <li>
              <Link to={DOCS_CURSOR}>Wopee.io MCP server in Cursor</Link>, the
              client used in this video.
            </li>
            <li>
              <Link to="/mcp/">What the Wopee.io MCP server does</Link>
            </li>
            <li>
              <Link to={BOOK_DEMO}>Book a demo</Link> to see it on your own app.
            </li>
            <li>
              <Link to={WATCH_URL}>Watch on YouTube</Link>
            </li>
            <li>
              <Link to="/videos/">More Wopee.io videos</Link>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
