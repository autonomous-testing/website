// The tutorial roadmap for wopee.io/learn. The /learn page renders its cards
// from this list, so launching a tutorial means flipping its `status` to "live".

export type TutorialStatus = "coming-soon" | "live";

export type Tutorial = {
  /** Series number shown on the card, e.g. "T1". */
  id: string;
  /** Page slug under /learn/, e.g. "agentic-testing" → /learn/agentic-testing/. */
  slug: string;
  title: string;
  oneLiner: string;
  status: TutorialStatus;
  /** Honest time label from the dry run; omit until it is measured. */
  duration?: string;
  level: "Beginner" | "Intermediate" | "QA leads";
  prerequisites: string;
  /** "wopee" = the lab needs a free Wopee.io account; "neutral" = vendor-neutral. */
  track: "neutral" | "wopee";
  /** Counts toward the Agentic Testing Practitioner certificate (T1 + T2 + T3). */
  practitioner?: boolean;
};

export const tutorials: Tutorial[] = [
  {
    id: "T1",
    slug: "agentic-testing",
    title: "Agentic testing for testers",
    oneLiner:
      "Run Playwright's planner, generator and healer on a demo app, and catch the agent writing a bug into a green test.",
    status: "coming-soon",
    duration: "About 2 hours",
    level: "Beginner",
    prerequisites: "None",
    track: "neutral",
    practitioner: true,
  },
  {
    id: "T2",
    slug: "mcp",
    title: "MCP for testers",
    oneLiner:
      "Connect Playwright to your AI agent through MCP, see what the agent really reads on a page, and measure what it costs.",
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
    oneLiner:
      "Write a SKILL.md that runs cold, prove the agent follows it, and review a colleague's skill for planted flaws.",
    status: "coming-soon",
    duration: "About 90 min",
    level: "Intermediate",
    prerequisites: "T1",
    track: "neutral",
    practitioner: true,
  },
  {
    id: "T4",
    slug: "playwright",
    title: "Playwright from zero",
    oneLiner:
      "Install, codegen, locators, web-first assertions, traces and your first CI run.",
    status: "coming-soon",
    level: "Beginner",
    prerequisites: "None",
    track: "neutral",
  },
  {
    id: "T5",
    slug: "wopee-intro",
    title: "Intro to Wopee.io: from a URL to a running suite",
    oneLiner:
      "Create a project, read the analysis, review scenarios, answer the agent and rerun.",
    status: "coming-soon",
    level: "Beginner",
    prerequisites: "A free Wopee.io account",
    track: "wopee",
  },
  {
    id: "T6",
    slug: "agent-verdicts",
    title: "Trusting an agent's verdict",
    oneLiner:
      "Oracles, evidence and LLM-as-judge: why an unproven pass is incomplete, and how to review a run in 5 minutes.",
    status: "coming-soon",
    level: "Intermediate",
    prerequisites: "T1",
    track: "neutral",
  },
  {
    id: "T7",
    slug: "api-testing",
    title: "API testing with Playwright and an agent",
    oneLiner:
      "Find the API in the UI's traffic, let an agent write API tests, and prove a UI claim through the API.",
    status: "coming-soon",
    level: "Intermediate",
    prerequisites: "T4",
    track: "neutral",
  },
  {
    id: "T8",
    slug: "test-data",
    title: "Test data for agents",
    oneLiner:
      "Static data, lists, Faker, CSV and AI-generated data that never collides, plus masking.",
    status: "coming-soon",
    level: "Intermediate",
    prerequisites: "T4 or T5",
    track: "neutral",
  },
  {
    id: "T9",
    slug: "agent-files-the-bug",
    title: "Your coding agent files the bug",
    oneLiner:
      "Use the Wopee.io MCP server in your coding agent: dispatch a run, read the results and file a GitHub issue.",
    status: "coming-soon",
    level: "Intermediate",
    prerequisites: "T2 and T5",
    track: "wopee",
  },
  {
    id: "T10",
    slug: "team-rollout",
    title: "Rolling out AI testing in a team",
    oneLiner:
      "Pick 10 critical flows, set a baseline, measure a pilot, and answer the auditor's questions.",
    status: "coming-soon",
    level: "QA leads",
    prerequisites: "None",
    track: "wopee",
  },
];

export const tutorialUrl = (t: Tutorial) => `/learn/${t.slug}/`;
