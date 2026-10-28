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
];

export const videoPath = (v: VideoEntry) => `/videos/${v.slug}/`;
export const videoThumbnail = (v: VideoEntry) =>
  `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`;
