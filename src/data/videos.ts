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
];

export const videoPath = (v: VideoEntry) => `/videos/${v.slug}/`;
export const videoThumbnail = (v: VideoEntry) =>
  `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`;
