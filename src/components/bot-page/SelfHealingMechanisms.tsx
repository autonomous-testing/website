import React from "react";
import { Accessibility, Stethoscope, GraduationCap } from "lucide-react";

const ICON_CLASS = "text-secondary-wopee dark:text-primary-wopee";

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
        The agent reads your app's accessibility tree. It targets elements by
        ARIA roles first, then attributes like data-testid, with visual
        coordinates as the last resort. If one strategy fails, the next takes
        over automatically. Generated Playwright code follows the same fallback
        hierarchy.
      </>
    ),
  },
  {
    icon: <Stethoscope className={ICON_CLASS} size={26} />,
    title: "Self-troubleshooting sub-agent",
    text: (
      <>
        When a step keeps failing, the agent spawns a focused sub-agent in the
        same live browser. It takes a fresh accessibility snapshot, inspects the
        page through a devtools lens, and returns a diagnosis that unsticks the
        run. Reporting an issue or asking a human comes last.
      </>
    ),
  },
  {
    icon: <GraduationCap className={ICON_CLASS} size={26} />,
    title: "Per-project skills that compound",
    text: (
      <>
        The agent keeps skills for each project: knowledge about your app it
        picks up while testing. Skills load at the start of every run and get
        updated after it. The more the agent runs, the better it knows your app.
      </>
    ),
  },
];

const SelfHealingMechanisms = () => {
  return (
    <section className="container px-5 py-12 sm:py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="m-0 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            How{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              self-healing works
            </span>
          </h2>
          <p className="mb-0 mt-4 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            "Self-healing" is easy to claim. Here is what actually happens
            inside Wopee.io's agents when your UI changes.
          </p>
        </div>

        <ol className="m-0 mt-10 grid w-full list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
          {MECHANISMS.map((item, index) => (
            <li
              key={item.title}
              className="flex h-full flex-col rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                  {item.icon}
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm font-bold tabular-nums tracking-widest text-secondary-wopee dark:text-primary-wopee"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-0 mt-5 text-lg font-bold leading-6 text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mb-0 mt-3 leading-7 text-slate-600 dark:text-slate-300">
                {item.text}
              </p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mb-0 mt-8 max-w-3xl text-center leading-7 text-slate-600 dark:text-slate-300">
          Why this beats rewriting broken scripts:{" "}
          <a href="/blog/self-healing-in-sw-test-automation/">
            self-healing in software test automation
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default SelfHealingMechanisms;
