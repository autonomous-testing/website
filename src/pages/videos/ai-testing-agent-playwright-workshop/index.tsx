import React, { useState } from "react";

import { Head, Layout, Link } from "../../../components/ui/typedDocusaurus";

const VIDEO_ID = "AgQsNN5e8OQ";
const TITLE =
  "Build Your First AI Testing Agent with Playwright & Wopee.io (Full Workshop Recording)";
const PAGE_URL = "https://wopee.io/videos/ai-testing-agent-playwright-workshop/";
const WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}`;
const DOCS_START = "https://docs.wopee.io/getting-started/";
const DOCS_AGENT = "https://docs.wopee.io/ai-agent/";
const BOOK_DEMO = "/book-demo/";
const DURATION_SECONDS = 2515;

const SUMMARY =
  "In this 42-minute workshop recording, Marcel, founder of Wopee.io, shows how to build a first AI testing agent for a web app. You start from a prompt and a URL, let the agent crawl the app and generate user stories and Playwright tests, run them with the agent, then export them to GitHub as ordinary Playwright code. The workshop also covers writing tests step by step in plain language, generating tests from a prompt in another language, and three common mistakes when adopting AI testing.";

type Chapter = { start: number; title: string; text: string };

const CHAPTERS: Chapter[] = [
  {
    start: 0,
    title: "Welcome: testing is still stuck in 2015",
    text: "Hello and welcome to our webinar about AI testing agents using Playwright and Wopee.io. My name is Marcel, I am the founder of Wopee.io, and I would like to share a story with you and then show you how AI testing agents could help you, or how to introduce the first ones into your organization. But before that, let me start with a bit of a bold statement: testing is still stuck in 2015. Let me know in the comments whether you agree or not. When I discuss this with colleagues, some people always complain that we are slow and still use a lot of manual steps or manual testing, and even the automation is a bit manual, because we write a lot of scripts and then we need to maintain them. Some people believe AI could solve this. I believe it could be an option, but not for everything, and it has to be properly implemented. So I would like to show you today how this could be done and which of the testing challenges we could improve or mitigate with it. I will explain how AI testing agents work, let you follow me through the demo so you can try it yourself, touch on how this can be scaled, and prepare a crazy discount for all the webinar attendees. I would also like to invite you to our bootcamp, which will take two weeks and go deeper into AI agent testing. This should be useful for people interested in AI and testing, for people who write or maintain automated tests, for anyone who wants to save time and reduce flakiness, and for anyone evaluating new tools.",
  },
  {
    start: 211,
    title: "From manual scripts to AI-generated tests",
    text: "So how is it done in the old way, which I believe is failing? We often write scripts manually and then maintain them, and that is still tedious work. These days we can use AI to accelerate this. Instead of writing scripts and updating them by hand, you can use AI to generate the tests and then self-heal them, and not only self-heal them but fully update a test when the application changes. Imagine there are levels of maturity in our testing. I remember the times when we were heavily manual, with almost no automation. When I entered the testing industry in 2004, some of my managers kept asking me whether I could help them introduce test automation. So it is a pretty old idea. We started introducing scripts to automate test execution, but later we found out that this is not enough, so we introduced CI/CD pipeline integration, test data mocking and other activities around test automation. Later came more advanced topics, mostly powered by machine learning, and with generative AI we were able to introduce agents. These days we are still in a discussion and prototyping phase, exploring agentic and autonomous testing. Often we can already use agents to run regression testing autonomously, and I think we are very close to using them for progressive testing as well, so that new functionality can be tested fully autonomously.",
  },
  {
    start: 390,
    title: "Prompt to test: how the agents work",
    text: "In our startup, Wopee.io, we have been dealing with these topics for maybe the last three years, trying to find a way to do progressive testing fully autonomously, and regression testing too. You have probably heard about vibe coding, which some people love and some people hate. It is a prompt-to-code type of activity, and we decided to build something similar: you prompt what you want to test. On our website you provide your prompt, your URL and your testing framework, and you start testing that scenario. Later we create many more test cases, so you can run them fully automatically without writing any code. Behind it, our agents crawl the app, or navigate through it. You can use our agent for that, or bring your own Figma files or mockups to analyze. Then we create user stories and cover those user stories with test cases, and at the end we have scripts written in Playwright, so you can execute them as traditional tests. You also get the traditional test reports from the agents. So these are basically four steps. You can generate a test in a few seconds, or probably minutes, because it takes some time to process the data before generation starts, but then it is quick. You can also automatically self-heal logic and locators, integrate this with your CI/CD pipeline, and run regression and progression testing.",
  },
  {
    start: 572,
    title: "Demo: your first project from the website",
    text: "Let's jump to the demo. It would be great if you could follow me, because I will be jumping between my slides and the live demo. First, navigate to our website, wopee.io. This is the very first UI you will interact with: you provide the URL and a prompt. To make sure I don't lose you, please follow exactly the same steps, because then you can come back and play with it later. You can switch between various demo prompts and demo apps. We will use the e-commerce one, and the only thing we need to do is click Test. Then you click on GitHub and start your first project. First we create the project on GitHub and in our back end, so that we can start testing. Once the project is created, we spin up an AI agent with the prompt provided on the homepage. The agent follows the script, which takes a few minutes depending on the complexity of the app. You can see that it opens the browser and loads the homepage of the URL we asked it to test. Under the hood it creates the GitHub repository with the first run, and you can see all the details in the console log: the executions, the interactions, the search for locators. You can see that the agent was able to fill in the username and password and add a product to the cart, and soon it will navigate to checkout. It typically takes three to four minutes, so I won't wait for it. As I said, we created the first project and executed the first test, and we can also see a detailed analysis in GitHub with all the steps.",
  },
  {
    start: 812,
    title: "Application context, user stories and running a test with the agent",
    text: "Once the run finishes, we get the application context, meaning what the application is about, based on the screenshots the AI agent collected. From there it generates the user stories, which are basically the suggestion of what we should test, and then it creates the tests. I will use an older project that was already executed. This is a test that was generated, with a set of steps, locators and the data needed to execute it. The first option I have is to run it with the agent. I trigger the execution and I get the first steps, which are visible with all the details. You can see that the agent navigates through every page, and that for instance the username field and the password are filled in. This is how it works when you already have the test generated. Once the agent finishes, we get the detailed report. The report corresponds one to one to the generated steps. Here I can see the first executed test, an invalid-credentials login form validation, which looks like it is testing correctly. We have the list of generated steps and then a test report with all the steps that were conducted, with the status and so on.",
  },
  {
    start: 1022,
    title: "Export to Playwright and publish a pull request",
    text: "AI-powered execution is super simple: we don't need to write any code, everything is generated. But there are certain challenges. Sometimes the agent is too intelligent, so it tries to overcome issues, even bugs, and it is also pretty slow. The alternative for tests you have already executed and are happy with is to run them in Playwright. Once the test is done, you switch to editing mode and see the code that was generated based on the agent run. You can modify the code if you want to, or just publish it to GitHub. I create a new pull request with a name, for example demo ABC. Then all the tests that were executed and validated go to the GitHub repository, and from there I can run them as traditional test automation code, where I don't need to use any LLM, and I can modify all the details of how it should work. I prepared just seven steps, so it should be super simple. If you can't follow now, I will share the recording so you can go step by step.",
  },
  {
    start: 1170,
    title: "Exercise: write your own tests, step by step",
    text: "In the second exercise, instead of generating everything from crawling through the application context to the user stories, you may want to create some tests manually because you know what you want to test. You don't want the AI to do that, but you would like the AI agent to execute the test. It is super simple. You click Add test, provide a description and a test name, for example product checkout, then put all the steps there and add it. Now I can execute the test without providing any more details. Of course this might be a bit flaky, because the agent got just high-level instructions. A better way is to put the description there just for reference and then add the steps one by one: login with valid user credentials, fill the username, fill the password, submit the login button. I don't provide any locator. I just want the agent to figure it out. I am not even providing the text on the button, whether it says submit or login, I just say I would like to click it. With this approach you can build your test and run it, and you can use tools to validate or assert functionality, select something from a list and so on. Sometimes people build crazy descriptions like just saying test something. That is not the best description to give the agent, and it is still possible, but I would suggest being more specific, and then you can run your agent.",
  },
  {
    start: 1410,
    title: "Exercise: generate tests from a prompt",
    text: "Now something more useful than this tedious manual test creation: creating tests from prompts. In Commander, as we call our UI, I create the user story first. I create a demo 2 category and a user story, for example \"As a user I want to check the checkout process\". Then I select that user story and ask it to generate a product test with these steps, using emojis and in Portuguese. It warns me that everything under this user story will be removed, I confirm, and soon we get the result. The test is written in Portuguese. Unfortunately I don't know Portuguese, but hopefully it is correct, and each step has an emoji. In the standard test there are no emojis, just the icons for the tools, but in the Portuguese one I get emojis next to the tools based on the prompt. If you have a specification, or you need to run three scenarios, you can ask it to generate three tests: no product in the cart, two products in the cart, and two items of the same product in the cart. Then I can run it again and get three different tests. With this you can speed up your test authoring and run the tests straight away using the agent, without automating anything.",
  },
  {
    start: 1620,
    title: "Recap: what you built and why context matters",
    text: "If you followed me and it worked for you, congratulations: you set up at least a first AI agent for testing from scratch. Probably I lost you on the third or fourth exercise, but I decided not to make it super slow and boring, so you can replay the ideas later. Your agent was able to understand the app. It generated the Playwright test just by clicking a button. You could run tests without scripting, and the maintenance can be done by rerunning the agent, because it follows natural language. Of course it is important to provide the correct context of how the app should work. Some people complain that AI hallucinates, but it often behaves like a proactive senior tester trying to figure out how the app works, so sometimes it suggests how to test it based on general knowledge or the context we provided. The big task for us in this AI era is to figure out which data is relevant to provide to the agent so it can run properly. It can maintain your tests, but it still needs your guidance or at least some provisioning of context. I hope you liked the initial vibe testing idea. It is good for demo purposes, and the big question is how to make it work in more scalable and complex environments. For that we have other approaches, so if you are interested, let me know and I can share much more.",
  },
  {
    start: 1770,
    title: "The two-week AI testing bootcamp",
    text: "A big next opportunity is to join our bootcamp, because this was just a tiny taste. The bootcamp lasts two weeks. We will set up and test your app, generate the first tests and run the first AI tests with the agents in your app, so you can experiment with how this could be helpful for you. We will then bring it closer to your CI/CD pipeline, or you can use ours to see how it works. We will also deal with maintenance challenges, you will have many opportunities to prototype ideas and talk to me directly, and at the end, if you want to bring this to your boss or colleagues, we can help you build an ROI case. I believe it is useful if you spend two or three hours per week, though you can spend more. All sessions are asynchronous: I send pre-recorded videos, and the only sessions where we need to align calendars are one-to-one sessions with attendees about their specific questions and challenges. There will be a few emails throughout the two weeks. On the more technical side, you will deal with CI/CD pipelines and generate tests not only from a prompt and URL but also from mockups or Figma files, from your existing test cases, or by importing your tests and running them directly. We will also discuss test data, credentials and environment variables, and about 25 different exercises. To join you need a paid plan. To make it simple, the Premium plan, which costs 179 euros, was offered for 19 euros per month for the next three months. If you keep it longer, the price goes up to 179, and then we give you the bootcamp for free; typically we charge 300 to 400 euros. You can cancel whenever you want.",
  },
  {
    start: 2100,
    title: "Three common mistakes to avoid",
    text: "First, people often expect this to replace the entire testing team or testing activities. I have to admit this is not the approach: it is an approach to accelerate our teams. If you want to make your testing quicker or expand coverage, this is a great opportunity to consider a tool, but it is not meant to replace your testing team, at least not now. I don't know how AI will develop, but if someone tells you that a testing team can be replaced by AI, I think that is a sales pitch rather than anything else. Second, crawling is a nice demo, but it is super important to bring and prepare your context. Some people fail because of incorrect expectations: they feel any tool with an AI label could solve anything without effort. That is not true. To make testing work with our AI agent, bring your own context: functional specifications, user stories, schemas, architecture diagrams. All of this makes the agent work better, and you need to spend some effort bringing in the proper data to get quality test cases and quality reports. Third, a controversial topic: some people say AI is hallucinating, unstable, slow and gives different results every time, and they are right. One part is the context. The other is to balance between using the LLM where it has its power and the traditional approach where we need something quicker, more stable or more predictable. We often use the LLM just for creating and maintaining the tests, with a human in the loop to validate that it is correct. For execution we still use simple Playwright code, which is super quick and perfect for test execution. Maintaining it and creating the tests is the tedious task, and that is why we use LLMs there.",
  },
  {
    start: 2371,
    title: "Start now, don't wait for perfect",
    text: "Whether you start with us or with someone else, I recommend spending some time on this topic, because AI augmentation and AI agents in software testing are the new big thing. My suggestion is to start some first trials and explore the ideas, and not wait until it is perfect. If I had waited for test automation to be perfect, I wouldn't have started in 2004, or maybe it was 2005, and I see that some teams still struggle with test automation. It is not an overnight success. You need to start investing in small steps and keep building on top of it. It requires time to build this new approach into your daily workflows, so start now, don't wait, and the benefits will come. If you want to join us, activate your Premium plan and we can meet again in the upcoming days. The bootcamp starts on the 22nd of September. I wish you happy testing, and I hope you enjoy this new era of AI as we do. Thank you very much, and I will now go through the questions from the chat and reply there.",
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
  uploadDate: "2025-09-09T15:30:06+00:00",
  duration: "PT41M55S",
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

export default function AiTestingAgentPlaywrightWorkshopVideo(): JSX.Element {
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
      title="AI Testing Agent Workshop with Playwright (Video)"
      description="Full workshop recording: build your first AI testing agent with Playwright and Wopee.io, from prompt and URL to generated tests, agent runs and a GitHub pull request. Chapters and full transcript."
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
          <span aria-current="page">AI testing agent workshop with Playwright</span>
        </nav>
        <p className={`mb-2 text-sm font-semibold uppercase tracking-wide ${ACCENT}`}>
          Video · 41:55
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
          <Link className={BUTTON_SECONDARY} to={DOCS_START}>
            Get started with Wopee.io
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
            Cleaned from the video's automatic captions. The Premium offer and
            bootcamp date mentioned in the recording applied to the September
            2025 webinar.
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
              <Link to={DOCS_START}>Getting started</Link>: create your first
              project from a prompt and a URL.
            </li>
            <li>
              <Link to={DOCS_AGENT}>AI Testing Agent docs</Link>
            </li>
            <li>
              <Link to="/how-it-works/">How Wopee.io works</Link>, from URL to
              Playwright tests.
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
