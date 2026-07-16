import React from "react";
import { Accessibility, Stethoscope, GraduationCap } from "lucide-react";

const ICON_CLASS = "text-secondary-wopee dark:text-yellow-400";

const MECHANISMS: {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
}[] = [
  {
    icon: <Accessibility className={ICON_CLASS} size={26} />,
    title: "Accessibility-tree locators first",
    text: (
      <>
        The agent reads your app's accessibility tree and targets elements by
        ARIA roles first, then attributes like data-testid, with visual
        coordinates as the last resort. When one strategy fails, the next takes
        over automatically. Generated Playwright code mirrors the same fallback
        hierarchy.
      </>
    ),
  },
  {
    icon: <Stethoscope className={ICON_CLASS} size={26} />,
    title: "Self-troubleshooting sub-agent",
    text: (
      <>
        When a step keeps failing, the agent spawns a focused sub-agent against
        the same live browser. It takes a fresh accessibility snapshot, inspects
        the page through a devtools lens, and returns a diagnosis that unsticks
        the run. Reporting an issue or asking a human is the last step, not the
        first.
      </>
    ),
  },
  {
    icon: <GraduationCap className={ICON_CLASS} size={26} />,
    title: "Per-project skills that compound",
    text: (
      <>
        The agent keeps skills for each project — knowledge about your app it
        picks up while testing. Skills load at the start of every run and get
        updated after it. The more the agent runs, the better it knows your app.
      </>
    ),
  },
];

const SelfHealingMechanisms = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-6">
        How self-healing works
      </h2>
      <p className="max-w-3xl text-lg text-center text-slate-600 dark:text-slate-400 mb-10">
        "Self-healing" is easy to claim. Here is what actually happens inside
        Wopee.io's agents when your UI changes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl w-full">
        {MECHANISMS.map((item) => (
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

      <p className="max-w-3xl text-center text-slate-600 dark:text-slate-400 mt-8 mb-0">
        Why this beats rewriting broken scripts:{" "}
        <a href="/blog/self-healing-in-sw-test-automation/">
          self-healing in software test automation
        </a>
        .
      </p>
    </section>
  );
};

export default SelfHealingMechanisms;
