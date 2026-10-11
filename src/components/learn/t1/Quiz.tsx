import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { t1Quiz, type QuizItem } from "@/data/learn-t1";
import { Md, CodeBlock, useStored, smallButton } from "./shared";

const LETTERS = ["A", "B", "C", "D"];
const PASS = 8;

type Attempt = { order: number[][]; answers: Record<string, number> };

const identity = (): Attempt => ({
  order: t1Quiz.map(() => [0, 1, 2, 3]),
  answers: {},
});

const shuffled = (): Attempt => ({
  order: t1Quiz.map(() => {
    const a = [0, 1, 2, 3];
    for (let j = a.length - 1; j > 0; j--) {
      const r = Math.floor(Math.random() * (j + 1));
      [a[j], a[r]] = [a[r], a[j]];
    }
    return a;
  }),
  answers: {},
});

const isAttempt = (v: unknown): v is Attempt => {
  const q = v as Attempt;
  return (
    !!q &&
    Array.isArray(q.order) &&
    q.order.length === t1Quiz.length &&
    q.order.every((o) => Array.isArray(o) && o.length === 4) &&
    !!q.answers &&
    typeof q.answers === "object"
  );
};

// "Why not the others" names the original letters; map them to the shuffled ones.
const remapLetters = (text: string, order: number[]) =>
  text.replace(/\b([A-D])(?=[ ,.]| and|$)/g, (m, L: string) => {
    const pos = order.indexOf(LETTERS.indexOf(L));
    return pos < 0 ? L : LETTERS[pos];
  });

export default function Quiz() {
  const [attempt, setAttempt, loaded] = useStored<Attempt>(
    "quiz",
    identity(),
    isAttempt,
  );
  const explainRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const lastAnswered = useRef<number | null>(null);

  // Options shuffle per attempt, on the client only (the server renders A to D in order).
  useEffect(() => {
    if (loaded && Object.keys(attempt.answers).length === 0) {
      const isIdentity = attempt.order.every((o) => o.join() === "0,1,2,3");
      if (isIdentity) setAttempt(shuffled());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    const i = lastAnswered.current;
    if (i !== null) explainRefs.current[i]?.focus({ preventScroll: true });
    lastAnswered.current = null;
  }, [attempt]);

  const answer = (qi: number, oi: number) => {
    lastAnswered.current = qi;
    setAttempt({ ...attempt, answers: { ...attempt.answers, [qi]: oi } });
  };

  const retake = () => {
    setAttempt(shuffled());
    document.getElementById("quiz")?.scrollIntoView();
  };

  const answered = Object.keys(attempt.answers).length;
  const correct = t1Quiz.filter((q, i) => attempt.answers[i] === q.a).length;

  return (
    <div>
      <div className="sticky top-[var(--ifm-navbar-height)] z-10 -mx-2 grid grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 rounded-xl bg-white/90 dark:bg-[#1b1b1d]/90 px-2 py-2 backdrop-blur">
        <span aria-live="polite" className="text-sm font-semibold whitespace-nowrap">
          {answered} of 10 answered · {correct} correct
        </span>
        <span aria-hidden="true" className="order-last col-span-2 sm:order-none sm:col-span-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <span
            className="block h-full bg-secondary-wopee dark:bg-primary-wopee transition-all"
            style={{ width: `${answered * 10}%` }}
          />
        </span>
        <button type="button" className={smallButton} onClick={retake}>
          Retake
        </button>
      </div>

      <ol className="m-0 mt-4 list-none p-0 flex flex-col gap-6">
        {t1Quiz.map((q: QuizItem, qi) => {
          const order = attempt.order[qi];
          const picked = attempt.answers[qi];
          const isAnswered = typeof picked === "number";
          const ok = picked === q.a;
          return (
            <li key={qi} className="rounded-xl border border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6">
              <h3 className="text-lg font-semibold leading-snug">
                <span className="mr-2 font-mono text-secondary-wopee dark:text-primary-wopee">
                  Q{qi + 1}
                </span>
                <Md text={q.t} />
              </h3>
              {q.code && <CodeBlock>{q.code}</CodeBlock>}
              <div
                role="group"
                aria-label={`Answers for question ${qi + 1}`}
                className="mt-3 flex flex-col gap-2"
              >
                {order.map((oi, pos) => {
                  const isRight = isAnswered && oi === q.a;
                  const isWrongPick = isAnswered && oi === picked && oi !== q.a;
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={isAnswered}
                      aria-pressed={isAnswered && oi === picked}
                      onClick={() => answer(qi, oi)}
                      className={cn(
                        "flex w-full min-h-[44px] items-start gap-3 rounded-lg border border-solid px-3 py-2.5 text-left font-[inherit] text-base text-inherit transition-colors",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee",
                        isAnswered ? "cursor-default" : "cursor-pointer hover:border-secondary-wopee dark:hover:border-primary-wopee",
                        isRight
                          ? "border-green-600 bg-green-600/10"
                          : isWrongPick
                            ? "border-red-500 bg-red-500/10"
                            : "border-gray-200 dark:border-gray-700 bg-transparent",
                        isAnswered && !isRight && !isWrongPick && "opacity-70",
                      )}
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 font-mono text-sm font-bold">
                        {LETTERS[pos]}
                      </span>
                      <span className="min-w-0 break-words">
                        <Md text={q.o[oi]} />
                      </span>
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <div
                  ref={(el) => {
                    explainRefs.current[qi] = el;
                  }}
                  tabIndex={-1}
                  className="mt-4 rounded-lg bg-gray-50 dark:bg-gray-950 p-4 text-sm leading-relaxed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee"
                >
                  <p>
                    <span className={cn("font-bold", ok ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                      {ok ? "Right." : "Not quite."}
                    </span>{" "}
                    Answer: <strong>{LETTERS[order.indexOf(q.a)]}</strong>. <Md text={q.why} />
                  </p>
                  <p className="mt-2">
                    <strong>Why not the others:</strong>{" "}
                    <Md text={remapLetters(q.not, order)} />
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div role="status" aria-live="polite">
        {answered === t1Quiz.length && (
          <div
            className={cn(
              "mt-6 rounded-xl border border-solid p-5",
              correct >= PASS ? "border-green-600/50 bg-green-600/10" : "border-gray-300 dark:border-gray-700",
            )}
          >
            {correct >= PASS ? (
              <>
                <h3 className="text-xl font-bold">{correct} of 10. Quiz passed.</h3>
                <p className="mt-1">
                  With the lab check at 8/8, that completes T1. Your certificate is below.
                </p>
                <a
                  href="#certificate"
                  className="mt-3 inline-flex rounded-lg bg-secondary-wopee px-5 py-2.5 font-semibold text-white hover:text-white hover:no-underline dark:bg-primary-wopee dark:text-secondary-wopee"
                >
                  Get your certificate
                </a>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold">{correct} of 10.</h3>
                <p className="mt-1">
                  8 of 10 completes the tutorial. Read the explanations above, then retake. The options shuffle each time.
                </p>
                <button type="button" className={cn(smallButton, "mt-3")} onClick={retake}>
                  Retake the quiz
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
