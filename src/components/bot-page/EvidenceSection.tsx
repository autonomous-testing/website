import React from "react";
import { Camera, MousePointerClick, GitMerge } from "lucide-react";

const ICON_CLASS = "text-secondary-wopee dark:text-yellow-400";

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
        Every run produces screenshots, traces, and run history. When something
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
        review — auto-approved only where you explicitly enable it. You approve
        visual baseline updates with a single click — or report a bug directly.
      </>
    ),
  },
  {
    icon: <GitMerge className={ICON_CLASS} size={26} />,
    title: "You review before it merges",
    text: (
      <>
        Results are ready for review before anything merges: you review
        generated tests and own the test strategy. And the tests are standard
        Playwright code you can export and run in your own CI/CD — no lock-in.
      </>
    ),
  },
];

const EvidenceSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-6">
        Evidence, not vibes
      </h2>
      <p className="max-w-3xl text-lg text-center text-slate-600 dark:text-slate-400 mb-10">
        You don't have to trust the agent's word. Every verdict ships with proof
        you can inspect.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl w-full">
        {EVIDENCE.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800">
                {item.icon}
              </span>
              <h3 className="m-0 text-lg font-bold">{item.title}</h3>
            </div>
            <p className="m-0 text-slate-600 dark:text-slate-400">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EvidenceSection;
