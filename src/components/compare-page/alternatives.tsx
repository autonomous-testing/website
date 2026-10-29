import React from "react";
import Link from "@docusaurus/Link";
import type { Alternative } from "./AlternativesTable";
import type { CompareSource } from "./CompareSources";

// Shared facts for the "<tool> alternatives" pages, checked 29 October 2026.
// Each entry's claims trace to the matching SOURCES entries below.
type Base = Omit<Alternative, "pickWhen">;

export const ALT: Record<string, Base> = {
  wopee: {
    name: "Wopee.io",
    href: "/",
    ours: true,
    what: "AI testing agent for web apps: it explores your app from a URL, writes plain-language test cases and runs them in a real browser. Web only.",
    pricing: (
      <>
        <Link href="/pricing/">Published</Link>: free to start, then 19, 79
        or 179 € per user per month; Enterprise custom, with on-premise.
      </>
    ),
  },
  mabl: {
    name: "mabl",
    href: "https://www.mabl.com/",
    what: "Low-code platform with AI agents and auto-healing for web, native mobile, API, performance and accessibility testing.",
    pricing:
      "Quote only; 14-day trial; cloud runs use credits (from 500 a month), local runs are free.",
  },
  testim: {
    name: "Tricentis Testim",
    href: "https://www.testim.io/",
    what: "Recorder-based testing for web, mobile and Salesforce, with AI smart locators that self-heal.",
    pricing:
      "No public prices ('Contact Us'); a free Community plan; priced by parallel tests, with unlimited runs.",
  },
  katalon: {
    name: "Katalon",
    href: "https://katalon.com/",
    what: "Desktop IDE built on Selenium and Appium for web, mobile, API and Windows desktop tests: record, keywords, or Groovy and Java.",
    pricing:
      "Free for local runs; Professional list price $2,199 per seat per year; Enterprise custom. CI and cloud runs need add-ons.",
  },
  testsigma: {
    name: "Testsigma",
    href: "https://testsigma.com/",
    what: "Agentic test automation platform with plain-English tests for web, mobile, API, Salesforce, desktop and SAP.",
    pricing:
      "No public prices: Pro and Enterprise are both 'Get Custom Pricing'. On-prem on Enterprise.",
  },
  testrigor: {
    name: "testRigor",
    href: "https://testrigor.com/",
    what: "Plain-English test automation for web, mobile, desktop and API, including email, SMS and 2FA flows.",
    pricing:
      "No public prices; not charged per user or per run; the free plan makes tests public. On-premise on request.",
  },
  qawolf: {
    name: "QA Wolf",
    href: "https://www.qawolf.com/",
    what: "Platform plus managed service: its team writes, runs and maintains your tests, as Playwright and Appium code you can export.",
    pricing:
      "Published per run: $1 per web run, $2 per mobile or desktop run; the managed tier is quoted.",
  },
  momentic: {
    name: "Momentic",
    href: "https://momentic.ai/",
    what: "AI QA agent: you describe flows in plain English, tests are stored as YAML and run from a CLI in CI.",
    pricing:
      "Published: free tier with 2,000 credits a month; pay-as-you-go from $125 a month plus usage; no seat charges.",
  },
  playwright: {
    name: "Playwright Test Agents",
    href: "https://playwright.dev/docs/test-agents",
    what: "Free, open-source planner, generator and healer agents (since Playwright 1.56) that your own AI client drives to write and repair Playwright tests.",
    pricing:
      "Free and open source; you pay for your own LLM and run the infrastructure yourself.",
  },
};

export const ALT_SOURCES: Record<string, CompareSource[]> = {
  wopee: [
    { label: "Wopee.io pricing", href: "https://wopee.io/pricing/" },
    { label: "Wopee.io security", href: "https://wopee.io/security/" },
  ],
  mabl: [
    { label: "mabl pricing", href: "https://www.mabl.com/pricing" },
    { label: "mabl homepage", href: "https://www.mabl.com/" },
    { label: "mabl AI test automation", href: "https://www.mabl.com/ai-test-automation" },
  ],
  testim: [
    { label: "Testim pricing", href: "https://www.testim.io/pricing/" },
    { label: "Testim homepage", href: "https://www.testim.io/" },
  ],
  katalon: [
    { label: "Katalon pricing", href: "https://katalon.com/pricing" },
    { label: "Katalon Studio", href: "https://katalon.com/katalon-studio" },
  ],
  testsigma: [
    { label: "Testsigma homepage", href: "https://testsigma.com/" },
    { label: "Testsigma pricing", href: "https://testsigma.com/pricing" },
  ],
  testrigor: [
    { label: "testRigor homepage", href: "https://testrigor.com/" },
    { label: "testRigor plans (sign-up page)", href: "https://testrigor.com/sign-up/" },
    { label: "testRigor FAQ (pricing model, on-premise)", href: "https://testrigor.com/faq/" },
  ],
  qawolf: [{ label: "QA Wolf pricing", href: "https://www.qawolf.com/pricing" }],
  momentic: [
    { label: "Momentic homepage", href: "https://momentic.ai/" },
    { label: "Momentic pricing", href: "https://momentic.ai/pricing" },
  ],
  playwright: [
    { label: "Playwright Test Agents docs", href: "https://playwright.dev/docs/test-agents" },
    { label: "Playwright release notes (v1.56)", href: "https://playwright.dev/docs/release-notes" },
  ],
};

export const sourcesFor = (keys: string[]): CompareSource[] =>
  keys.flatMap((k) => ALT_SOURCES[k]);
