import React from "react";
import { Camera, MousePointerClick, GitMerge } from "lucide-react";

const ICON_CLASS = "text-secondary-wopee dark:text-primary-wopee";

const EVIDENCE: {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
}[] = [
  {
    icon: <Camera className={ICON_CLASS} size={26} />,
    title: "Screenshots, traces, run history",
    text: (
      <>
        Every run includes screenshots, traces, and run history. When something
        fails, you replay exactly what the agent saw and did.
      </>
    ),
  },
  {
    icon: <MousePointerClick className={ICON_CLASS} size={26} />,
    title: "One-click baseline approvals",
    text: (
      <>
        <a href="/visual-testing/">Visual changes</a> are queued for your
        review. Auto-approved only where you explicitly enable it. You approve
        visual baseline updates with a single click, or report a bug directly.
      </>
    ),
  },
  {
    icon: <GitMerge className={ICON_CLASS} size={26} />,
    title: "You review before it merges",
    text: (
      <>
        Results are ready for review before anything merges. You review
        generated tests and own the test strategy. The tests are standard
        Playwright code you can export and run in your own CI/CD. No lock-in.
      </>
    ),
  },
];

const EvidenceSection = () => {
  return (
    <section className="border-y border-slate-200/80 bg-slate-50/70 py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-white/[0.025]">
      <div className="container px-5 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="m-0 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            Evidence,{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              not vibes
            </span>
          </h2>
          <p className="mb-0 mt-4 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            You don't have to trust the agent's word. Every verdict ships with
            proof you can inspect.
          </p>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {EVIDENCE.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                {item.icon}
              </span>
              <h3 className="mb-0 mt-5 text-lg font-bold leading-6 text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mb-0 mt-3 leading-7 text-slate-600 dark:text-slate-300">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvidenceSection;
