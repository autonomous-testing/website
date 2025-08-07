export interface StepData {
  number: number;
  videoSrc: string;
  fallbackImageSrc: string;
  title: string;
  subtitle: string;
  bulletPointsTitle?: string;
  bulletPoints: string[];
  layout: "left" | "right";
}

export const stepsData: StepData[] = [
  {
    number: 1,
    videoSrc: "/how-it-works/step-1.webm",
    fallbackImageSrc: "/how-it-works/step-1.png",
    title: "Paste your project URL",
    subtitle: "That's all we need to begin testing your application.",
    bulletPointsTitle: "Takes 30 seconds:",
    bulletPoints: [
      "No complex configuration",
      "No test scripts to write",
      "No specialized expertise needed",
      "Works with any web application",
    ],
    layout: "left",
  },
  {
    number: 2,
    videoSrc: "/how-it-works/step-2.webm",
    fallbackImageSrc: "/how-it-works/step-2.png",
    title: "Let our AI agents do the work",
    subtitle:
      "Our AI agents map your app, understand it, and create a test plan.",
    bulletPointsTitle: "Takes 2-5 minutes:",
    bulletPoints: [
      "Process all information for our AI algorithms",
      "Identify critical paths and user journeys",
      "Automatically create test cases",
      "Convert your test cases into automated tests",
    ],
    layout: "right",
  },
  {
    number: 3,
    videoSrc: "/how-it-works/step-3.webm",
    fallbackImageSrc: "/how-it-works/step-3.png",
    title: "Ship with instant insights",
    subtitle:
      "Get detailed regression and visual testing results in minutes, not days.",
    bulletPointsTitle: "Instant results:",
    bulletPoints: [
      "Functional stability verification",
      "Visual consistency across platforms",
      "Detailed reporting and insights",
      "Actionable recommendations",
    ],
    layout: "left",
  },
];
