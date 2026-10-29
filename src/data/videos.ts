export type VideoEntry = {
  slug: string;
  youtubeId: string;
  title: string;
  summary: string;
  duration: string;
  thumbnailAlt: string;
};

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@wopee";

export const videos: VideoEntry[] = [
  {
    slug: "ai-qa-agent-jira-playwright",
    youtubeId: "9qk64KKUZJw",
    title:
      "Build an AI QA Agent that reads Jira, runs Playwright, and closes the ticket",
    summary:
      "An agent in Cursor combines the Wopee.io, Playwright and Atlassian MCP servers to retest a fixed Jira bug and report back.",
    duration: "4:36",
    thumbnailAlt:
      "Video thumbnail: AI QA agent in Cursor using the Wopee.io, Playwright and Atlassian MCP servers",
  },
  {
    slug: "ai-testing-agent-playwright-workshop",
    youtubeId: "AgQsNN5e8OQ",
    title:
      "Build Your First AI Testing Agent with Playwright & Wopee.io (Full Workshop Recording)",
    summary:
      "A 42-minute workshop: go from a prompt and a URL to generated tests, agent runs and a Playwright pull request on GitHub.",
    duration: "41:55",
    thumbnailAlt:
      "Video thumbnail: workshop on building a first AI testing agent with Playwright and Wopee.io",
  },
  {
    slug: "vibe-testing-lab-ai-testing-agents",
    youtubeId: "d-KRA2M5bwE",
    title:
      "I tested 4 AI testing agents on one app. Which one reported the truth?",
    summary:
      "The Vibe Testing Lab talk: a coding agent, Playwright's test agents, the Playwright CLI with skills and Wopee.io with MCP, on one app and one task.",
    duration: "22:56",
    thumbnailAlt:
      "Video thumbnail: Vibe Testing Lab, four AI testing agents compared on one demo app",
  },
];

export const videoPath = (v: VideoEntry) => `/videos/${v.slug}/`;
export const videoThumbnail = (v: VideoEntry) =>
  `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`;
