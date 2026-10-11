// The tutorial roadmap for wopee.io/learn. The /learn page renders its cards
// from this list, and every slug without its own page gets a "coming soon +
// notify" page (plugin in docusaurus.config.js). T1 follows the launch flag in
// learn-config.ts; the others go live by flipping `status` to "live".

import { learnConfig } from "./learn-config";

export type TutorialStatus = "coming-soon" | "live";

export type Tutorial = {
  /** Series number shown on the card, e.g. "T1". */
  id: string;
  /** Page slug under /learn/, e.g. "agentic-testing" → /learn/agentic-testing/. */
  slug: string;
  title: string;
  /** Shorter, outcome-first title for the /learn card; defaults to `title`. */
  cardTitle?: string;
  /** One line, 12 words or fewer, for the card and the coming-soon page. */
  oneLiner: string;
  /** T1 only: the bug the learner catches, shown on the /learn path. */
  bug?: string;
  status: TutorialStatus;
  /** Honest time label from the dry run; omit until it is measured. */
  duration?: string;
  /** Omit when the tutorial files do not state one. */
  level?: "Beginner" | "Intermediate" | "QA leads";
  prerequisites: string;
  /** Wopee.io label on the roadmap row and the coming-soon page, e.g. "Uses a free Wopee.io account". */
  tag?: string;
  /** "wopee" = the lab (or part of it) needs a free Wopee.io account; "neutral" = vendor-neutral. */
  track: "neutral" | "wopee";
  /** Counts toward the Agentic Testing Practitioner certificate (T1 + T2 + T3). */
  practitioner?: boolean;
  /** The tutorial has its own page in src/pages/learn/; otherwise a coming-soon page is generated. */
  hasPage?: boolean;
};

export const tutorials: Tutorial[] = [
  {
    id: "T1",
    slug: "agentic-testing",
    title: "Agentic testing for testers",
    cardTitle: "Agentic testing with Playwright's AI agents",
    oneLiner: "Run the planner, generator and healer on a demo app. Find their mistakes.",
    bug: "order total: $36.43 ≠ $30.04",
    status: learnConfig.t1.launched ? "live" : "coming-soon",
    hasPage: true,
    duration: "About 2 hours",
    level: "Beginner",
    prerequisites: "A free GitHub account. Copilot optional",
    track: "neutral",
    practitioner: true,
  },
  {
    id: "T2",
    slug: "mcp",
    title: "MCP for testers",
    cardTitle: "MCP: connect an AI agent to the browser",
    oneLiner: "Set up Playwright MCP and see exactly what the agent reads.",
    status: "coming-soon",
    duration: "About 90 min",
    level: "Beginner",
    prerequisites: "T1 or Playwright basics",
    track: "neutral",
    practitioner: true,
  },
  {
    id: "T3",
    slug: "skills",
    title: "Skills for AI testing agents",
    cardTitle: "Skills: testing instructions for your agent",
    oneLiner: "Write a SKILL.md the agent follows, then review a colleague's flawed one.",
    status: "coming-soon",
    duration: "About 90 min",
    prerequisites: "T1, or Copilot Agent mode",
    track: "neutral",
    practitioner: true,
  },
  {
    id: "T4",
    slug: "playwright",
    title: "Playwright from zero",
    oneLiner: "Locators, assertions, traces and your first automated run.",
    status: "coming-soon",
    level: "Beginner",
    prerequisites: "None",
    track: "neutral",
  },
  {
    id: "T5",
    slug: "wopee-intro",
    title: "Intro to Wopee.io: from a URL to a running suite",
    cardTitle: "Wopee.io: from URL to tests",
    oneLiner: "Point Wopee.io at a URL and review the tests it writes.",
    tag: "Uses a free Wopee.io account",
    status: "coming-soon",
    level: "Beginner",
    prerequisites: "A free Wopee.io account",
    track: "wopee",
  },
  {
    id: "T6",
    slug: "agent-verdicts",
    title: "Trusting an agent's verdict",
    cardTitle: "Can you trust that pass?",
    oneLiner: "When to believe an agent's pass, and a 5-minute review.",
    status: "coming-soon",
    level: "Intermediate",
    prerequisites: "T1",
    track: "neutral",
  },
  {
    id: "T7",
    slug: "api-testing",
    title: "API testing with Playwright and an agent",
    cardTitle: "API testing with an agent",
    oneLiner: "Find the API behind the page. Let an agent test it.",
    status: "coming-soon",
    level: "Intermediate",
    prerequisites: "T4",
    track: "neutral",
  },
  {
    id: "T8",
    slug: "test-data",
    title: "Test data for agents",
    oneLiner: "Fake, CSV and AI-made data that never collides, plus masking.",
    status: "coming-soon",
    level: "Intermediate",
    tag: "Part uses a free Wopee.io account",
    prerequisites: "T4 or T5",
    track: "wopee",
  },
  {
    id: "T9",
    slug: "agent-files-the-bug",
    title: "Your coding agent files the bug",
    oneLiner: "Use the Wopee.io MCP server to run tests and file issues.",
    tag: "Uses a free Wopee.io account",
    status: "coming-soon",
    level: "Intermediate",
    prerequisites: "T2 and T5",
    track: "wopee",
  },
  {
    id: "T10",
    slug: "team-rollout",
    title: "Rolling out AI testing in a team",
    cardTitle: "AI testing rollout for QA leads",
    oneLiner: "Pick 10 critical flows, measure a pilot, answer the auditor.",
    status: "coming-soon",
    tag: "Uses a free Wopee.io account",
    level: "QA leads",
    prerequisites: "None",
    track: "wopee",
  },
];

export const tutorialUrl = (t: Tutorial) => `/learn/${t.slug}/`;
export const cardTitle = (t: Tutorial) => t.cardTitle ?? t.title;

/** T1–T3: the path on /learn that ends in the Practitioner certificate. The rest form the roadmap list. */
export const featuredTutorials = tutorials.filter((t) => t.practitioner);
export const roadmapTutorials = tutorials.filter((t) => !t.practitioner);

/**
 * Status line on the /learn path: "Live", or the release order. No dates until
 * they are decided; flipping a tutorial to live re-labels the ones after it.
 */
export const pathStatus = (t: Tutorial) => {
  if (t.status === "live") return "Live";
  const waiting = featuredTutorials.filter((x) => x.status !== "live");
  const k = waiting.indexOf(t);
  const anyLive = waiting.length < featuredTutorials.length;
  if (k < 0) return "Coming soon";
  if (k === 0) return anyLive ? "Opens next" : "Opens first";
  if (k === 1 && !anyLive) return "Opens next";
  return `Opens after ${waiting[k - 1].id}`;
};

/** "New" badge on the navbar and footer links to /learn, shown until T1, T2 and T3 are all live. */
export const learnShowNew = tutorials.filter((t) => t.practitioner && t.status === "live").length < 3;
