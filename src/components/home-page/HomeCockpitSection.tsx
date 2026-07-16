import React from "react";
import {
  MonitorPlay,
  Hand,
  MessageCircleQuestion,
  ScrollText,
} from "lucide-react";

const POINTS = [
  {
    icon: MonitorPlay,
    title: "Watch it work, live",
    text: "A live browser view streams every agent action as it happens.",
  },
  {
    icon: Hand,
    title: "Take over mid-run",
    text: "Grab the mouse and keyboard any time. Hand back when you're done.",
  },
  {
    icon: MessageCircleQuestion,
    title: "It asks before it guesses",
    text: "CAPTCHA, MFA, or an ambiguous step: the agent pauses and asks you, with the reason and a suggested action.",
  },
  {
    icon: ScrollText,
    title: "Evidence for every run",
    text: "Step-by-step activity logs, agent logs, and screenshots for every execution. Review what the agent did and why. No black box.",
  },
];

const CockpitMock = () => (
  <div
    className="relative w-full max-w-xl lg:max-w-none mx-auto select-none"
    aria-hidden="true"
  >
    {/* browser frame */}
    <div className="rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-xl shadow-gray-900/10 dark:shadow-black/40 bg-white dark:bg-[#151320]">
      {/* chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-[#1d1a2b] border-b border-gray-200 dark:border-gray-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 flex items-center gap-3 rounded-md bg-white dark:bg-[#151320] border border-gray-200 dark:border-gray-700 px-3 py-1">
          <span className="flex-1 text-[11px] text-gray-500 dark:text-gray-400 truncate">
            your-app.com/checkout
          </span>
          <span className="hidden sm:inline whitespace-nowrap text-[10px] font-medium text-gray-500 dark:text-gray-400">
            Step 12 / 18
          </span>
        </div>
      </div>
      {/* checkout page being tested */}
      <div className="grid min-h-[220px] grid-cols-[minmax(0,1fr)_7rem] gap-3 p-4 sm:min-h-[260px] sm:grid-cols-[minmax(0,1fr)_10rem] sm:p-5">
        <div className="flex flex-col gap-3">
          <div className="h-3 w-2/5 rounded bg-gray-200 dark:bg-gray-700/60" />
          <div className="h-9 rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900" />
          <div className="h-9 rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 ring-2 ring-secondary-wopee/30 dark:ring-primary-wopee/30" />
          <div className="mt-1 h-9 w-36 rounded-md bg-primary-wopee/90 border border-primary-wopee flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#1D1A26]">
              Place order
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/60 flex flex-col gap-2">
          <div className="h-2.5 w-3/4 rounded bg-gray-300 dark:bg-gray-600" />
          <div className="h-2.5 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-2.5 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-auto h-3 w-1/2 rounded bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
      {/* status bar */}
      <div className="flex items-center px-4 py-2 bg-gray-50 dark:bg-[#1d1a2b] border-t border-gray-200 dark:border-gray-800">
        <span className="min-w-0 truncate flex items-center gap-1.5 text-[11px] font-semibold text-secondary-wopee dark:text-primary-wopee">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-wopee dark:bg-primary-wopee" />
          Agent paused. Waiting for you
        </span>
      </div>
    </div>
    {/* agent question overlay */}
    <div className="absolute -bottom-6 right-2 z-10 w-64 max-w-[calc(100%-1rem)] sm:-right-4 rounded-lg border border-secondary-wopee/50 dark:border-primary-wopee/50 bg-white dark:bg-[#1d1a2b] shadow-lg shadow-gray-900/15 dark:shadow-black/50 p-3.5">
      <p className="text-xs font-bold m-0 mb-1 text-gray-900 dark:text-white">
        The login asks for a verification code.
      </p>
      <p className="text-[11px] m-0 mb-2.5 text-gray-600 dark:text-gray-300">
        Suggested: take over, enter the code, then hand control back.
      </p>
      <div className="flex gap-2">
        <span className="rounded-md bg-primary-wopee text-[#1D1A26] text-[11px] font-bold px-3 py-1.5">
          Take over
        </span>
        <span className="rounded-md border border-gray-300 dark:border-gray-600 text-[11px] font-semibold px-3 py-1.5 text-gray-700 dark:text-gray-200">
          Skip step
        </span>
      </div>
    </div>
  </div>
);

const HomeCockpitSection = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-center text-gray-950 dark:text-white mb-2 text-balance">
        Autonomy you can{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          supervise
        </span>
      </h2>
      <p className="text-lg text-gray-700 dark:text-white text-center mb-10 sm:mb-12 lg:mb-14 max-w-2xl text-balance">
        Autonomous doesn't mean out of control. The Interactive Cockpit keeps
        you in the loop for every run.
      </p>
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] gap-10 lg:gap-20 items-center">
        <CockpitMock />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-0 m-0 p-0 list-none mt-8 lg:mt-0">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex items-start gap-3 py-4 border-b border-gray-200 last:border-b-0 dark:border-white/10 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(2)]:border-b lg:last:border-b-0"
            >
              <span className="inline-flex items-center justify-center size-9 shrink-0 rounded-md bg-secondary-wopee/10 dark:bg-primary-wopee/10">
                <Icon
                  className="size-5 text-secondary-wopee dark:text-primary-wopee"
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="font-bold m-0 text-gray-900 dark:text-white">
                  {title}
                </p>
                <p className="m-0 mt-0.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeCockpitSection;
