import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { t1Widget as W } from "@/data/learn-t1";

// "Is this test correct?": click the line that lies. Without JavaScript the
// <details> answer below still works.
export default function TryWidget() {
  const [picked, setPicked] = useState<number | null>(null);
  const right = picked === W.answer;

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[1fr_240px] items-start">
        <div className="overflow-hidden rounded-xl border border-solid border-gray-800 bg-gray-950 text-gray-100 shadow-xl">
          <div className="flex items-center justify-between gap-3 border-0 border-b border-solid border-gray-800 px-4 py-2.5 text-xs font-mono text-gray-400">
            <span>{W.file}</span>
            <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 font-semibold text-green-400">
              ✓ 1 passed
            </span>
          </div>
          <ol
            className="m-0 list-none p-2"
            role="radiogroup"
            aria-label="Test code. Pick the line that lies."
            aria-describedby="try-feedback"
          >
            {W.lines.map((l, i) => {
              const n = i + 1;
              const isPicked = picked === n;
              return (
                <li key={n} role="none">
                  <button
                    type="button"
                    role="radio"
                    onClick={() => setPicked(n)}
                    aria-checked={isPicked}
                    className={cn(
                      "flex w-full min-h-[44px] items-start gap-3 rounded-lg border border-solid border-transparent bg-transparent px-2 py-2 text-left font-mono text-[13px] sm:text-sm leading-relaxed cursor-pointer transition-colors",
                      "hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-wopee",
                      isPicked && right && "border-green-500/60 bg-green-500/10 ring-2 ring-green-500/70",
                      isPicked && !right && "border-red-500/60 bg-red-500/10 ring-2 ring-red-500/70",
                      l.comment ? "text-gray-400" : "text-gray-100",
                    )}
                  >
                    <span className="w-4 flex-shrink-0 select-none text-right text-gray-500">
                      {n}
                    </span>
                    <span className="break-words min-w-0">{l.code}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <aside
          aria-label="Spec rule FD-05"
          className="rounded-xl border border-solid border-secondary-wopee/30 dark:border-primary-wopee/30 bg-white dark:bg-gray-900 p-5"
        >
          <span className="rounded-md bg-secondary-wopee px-2 py-0.5 font-mono text-xs font-bold text-white dark:bg-primary-wopee dark:text-secondary-wopee">
            FD-05
          </span>
          <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 text-sm">
            {W.rule.map(([k, v]) => (
              <React.Fragment key={k}>
                <dt className="opacity-70">{k}</dt>
                <dd className="m-0 font-semibold text-right">{v}</dd>
              </React.Fragment>
            ))}
          </dl>
          <p className="mt-3 text-xs opacity-70">
            The spec is the source of truth. Not the app.
          </p>
        </aside>
      </div>

      <p className="mt-5 text-lg font-bold">Click the line that lies.</p>
      <div id="try-feedback" role="status" aria-live="polite">
        {picked !== null && right && (
          <div className="mt-3 rounded-xl border border-solid border-green-600/40 bg-green-600/10 p-5">
            <p>
              <strong>Line {W.answer}.</strong> The app shows {W.appTotal}{" "}
              because it forgets the discount, and the agent copied what it saw.
            </p>
            <dl className="my-4 grid max-w-xs grid-cols-[1fr_auto] gap-x-6 gap-y-1 font-mono text-sm">
              {W.math.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt>{k}</dt>
                  <dd className="m-0 text-right">{v}</dd>
                </React.Fragment>
              ))}
              <dt className="border-0 border-t border-solid border-current pt-1 font-bold">
                Spec total
              </dt>
              <dd className="m-0 border-0 border-t border-solid border-current pt-1 text-right font-bold">
                {W.specTotal}
              </dd>
            </dl>
            <p>
              The comment quotes the spec; the assertion encodes the bug. A
              test can be green and wrong.{" "}
              <strong>This tutorial trains you to catch it in five minutes.</strong>
            </p>
          </div>
        )}
        {picked !== null && !right && (
          <div className="mt-3 rounded-xl border border-solid border-red-500/40 bg-red-500/10 p-4">
            <p>That line is true. Look at what the total should be after 20 % off.</p>
          </div>
        )}
      </div>
      <noscript>
        <details className="mt-3">
          <summary>Show the answer</summary>
          <p>
            <strong>Line {W.answer}.</strong> {W.formula} ={" "}
            <strong>{W.specTotal}</strong>. The app shows {W.appTotal} because
            it forgets the discount, and the agent copied what it saw.
          </p>
        </details>
      </noscript>
    </div>
  );
}
