import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { t1Widget as W } from "@/data/learn-t1";
import { codeSurface } from "@/components/learn/styles";

// Break code only between tokens: after "expect(" and before ".getByText" / ".toBe…".
function CodeLine({ code }: { code: string }) {
  const parts = code
    .replace("expect(", "expect(\u0000")
    .replace(".getByText", "\u0000.getByText")
    .replace(".toBe", "\u0000.toBe")
    .split("\u0000");
  return (
    <>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <wbr />}
          {p}
        </React.Fragment>
      ))}
    </>
  );
}

// "Is this test correct?": click the line that lies. A radio group (arrow keys
// move and choose). Without JavaScript the <details> answer below still works.
export default function TryWidget() {
  const [picked, setPicked] = useState<number | null>(null);
  const right = picked === W.answer;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const count = W.lines.length;
  const focusable = picked ?? 1;

  useEffect(() => {
    if (picked === null) return;
    const el = feedbackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
    }
  }, [picked]);

  const onKey = (e: React.KeyboardEvent, n: number) => {
    let j: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (n % count) + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = ((n - 2 + count) % count) + 1;
    if (e.key === "Home") j = 1;
    if (e.key === "End") j = count;
    if (j !== null) {
      e.preventDefault();
      setPicked(j);
      refs.current[j - 1]?.focus();
    }
  };

  const feedback = (
    <div id="try-feedback" ref={feedbackRef} role="status" aria-live="polite" className="scroll-mb-6">
      {picked === null && (
        <p className="m-0 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-700 dark:border-white/15 dark:text-gray-300">
          Your verdict shows up here.
        </p>
      )}
      {picked !== null && right && (
        <div className="rounded-xl border border-solid border-green-600/40 bg-green-600/10 p-4 sm:p-5">
          <p>
            <strong>Line {W.answer}.</strong> The app shows {W.appTotal}{" "}
            because it forgets the discount, and the agent copied what it saw.
          </p>
          <dl className="my-3 grid max-w-xs grid-cols-[1fr_auto] gap-x-6 gap-y-1 font-mono text-sm">
            {W.math.map(([k, v]) => (
              <React.Fragment key={k}>
                <dt>{k}</dt>
                <dd className="m-0 text-right">{v}</dd>
              </React.Fragment>
            ))}
            <dt className="border-0 border-t border-solid border-current pt-1 font-bold">Spec total</dt>
            <dd className="m-0 border-0 border-t border-solid border-current pt-1 text-right font-bold">
              {W.specTotal}
            </dd>
          </dl>
          <p>
            The comment quotes the spec; the assertion encodes the bug. A test
            can be green and wrong.{" "}
            <strong>This tutorial trains you to catch it in five minutes.</strong>
          </p>
        </div>
      )}
      {picked !== null && !right && (
        <div className="rounded-xl border border-solid border-red-500/40 bg-red-500/10 p-4">
          <p>
            <strong>Line {picked} is true.</strong> Look at what the total
            should be after 20 % off.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <p id="try-instruction" className="m-0 mb-3 flex flex-wrap items-baseline gap-x-3 text-lg font-bold">
        Click the line that lies ↓
        <span className="text-sm font-normal text-gray-700 dark:text-gray-300">
          Tap a line, or use the arrow keys.
        </span>
      </p>
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className={cn("overflow-hidden rounded-xl shadow-xl", codeSurface)}>
          <div className="flex items-center justify-between gap-3 border-0 border-b border-solid border-white/10 px-4 py-2.5 font-mono text-xs text-gray-400">
            <span>{W.file}</span>
            <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 font-semibold text-green-400">
              ✓ 1 passed
            </span>
          </div>
          <ol
            className="m-0 list-none p-2"
            role="radiogroup"
            aria-labelledby="try-instruction"
            aria-describedby="try-feedback"
          >
            {W.lines.map((l, i) => {
              const n = i + 1;
              const isPicked = picked === n;
              return (
                <li key={n} role="none">
                  <button
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={isPicked}
                    tabIndex={focusable === n ? 0 : -1}
                    onClick={() => setPicked(n)}
                    onKeyDown={(e) => onKey(e, n)}
                    className={cn(
                      "group/line flex w-full min-h-[44px] items-start gap-2.5 rounded-lg border border-solid border-transparent bg-transparent px-2 py-2 text-left font-mono text-[12.5px] sm:text-sm leading-relaxed cursor-pointer transition-colors",
                      "hover:border-white/15 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-wopee",
                      isPicked && right && "border-green-500/60 bg-green-500/10 ring-2 ring-green-500/70",
                      isPicked && !right && "border-red-500/60 bg-red-500/10 ring-2 ring-red-500/70",
                      l.comment ? "text-gray-400" : "text-gray-100",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-[0.3em] flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full border-2 border-solid",
                        isPicked ? (right ? "border-green-400" : "border-red-400") : "border-gray-500 group-hover/line:border-primary-wopee",
                      )}
                    >
                      {isPicked && (
                        <span className={cn("h-1.5 w-1.5 rounded-full", right ? "bg-green-400" : "bg-red-400")} />
                      )}
                    </span>
                    <span aria-hidden="true" className="w-3 flex-shrink-0 select-none text-right text-gray-400">
                      {n}
                    </span>
                    <span className="min-w-0 whitespace-pre-wrap [overflow-wrap:normal] [word-break:normal] pl-[2ch] -indent-[2ch]">
                      <span className="sr-only">Line {n}: </span>
                      <CodeLine code={l.code} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="flex flex-col gap-4">
          <aside
            aria-label="Spec rule FD-05"
            className="rounded-xl border border-solid border-secondary-wopee/30 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <span className="rounded-md bg-secondary-wopee px-2 py-0.5 font-mono text-xs font-bold text-white dark:bg-primary-wopee dark:text-black">
              FD-05
            </span>
            <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 text-sm">
              {W.rule.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt className="text-gray-700 dark:text-gray-300">{k}</dt>
                  <dd className="m-0 text-right font-semibold">{v}</dd>
                </React.Fragment>
              ))}
            </dl>
            <p className="mt-3 text-xs text-gray-700 dark:text-gray-300">
              The spec is the source of truth. Not the app.
            </p>
          </aside>
          {feedback}
        </div>
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
