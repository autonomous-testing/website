import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { t1CheckTabs } from "@/data/learn-t1";
import { useStored, useScrollMore, smallButton, inputClass } from "./shared";
import { codeSurface } from "@/components/learn/styles";

const TONE: Record<string, string> = {
  ok: "text-green-400",
  bad: "text-red-400",
  warn: "text-yellow-300",
  dim: "text-gray-400",
};

/** Sample `npm run check` output in an accessible tab list (arrow keys move between tabs). */
export function CheckTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [listRef, listMore] = useScrollMore<HTMLDivElement>();
  const onKey = (e: React.KeyboardEvent, i: number) => {
    let j: number | null = null;
    if (e.key === "ArrowRight") j = (i + 1) % t1CheckTabs.length;
    if (e.key === "ArrowLeft") j = (i - 1 + t1CheckTabs.length) % t1CheckTabs.length;
    if (e.key === "Home") j = 0;
    if (e.key === "End") j = t1CheckTabs.length - 1;
    if (j !== null) {
      e.preventDefault();
      setActive(j);
      refs.current[j]?.focus();
    }
  };
  return (
    <div className={cn("mt-5 overflow-hidden rounded-xl shadow-xl", codeSurface)}>
      <div
        ref={listRef}
        data-more={listMore}
        role="tablist"
        aria-label="Sample check output"
        aria-orientation="horizontal"
        className="learn-scroll flex border-0 border-b border-solid border-white/10"
      >
        {t1CheckTabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-controls={`term-${t.id}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "whitespace-nowrap border-0 border-b-2 border-solid bg-transparent px-3 sm:px-4 py-3 font-[inherit] text-sm font-semibold cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-wopee",
              active === i
                ? "border-primary-wopee text-white"
                : "border-transparent text-gray-400 hover:text-gray-200",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {t1CheckTabs.map((t, i) => (
        <TermPanel key={t.id} tab={t} hidden={active !== i} />
      ))}
    </div>
  );
}

function TermPanel({ tab: t, hidden }: { tab: (typeof t1CheckTabs)[number]; hidden: boolean }) {
  const [ref, more] = useScrollMore<HTMLPreElement>();
  return (
    <pre
      ref={ref}
      data-more={more}
      role="tabpanel"
      id={`term-${t.id}`}
      aria-labelledby={`tab-${t.id}`}
      tabIndex={0}
      hidden={hidden}
      className="learn-scroll !m-0 !rounded-none !bg-transparent !p-4 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-wopee text-[12px] sm:text-[13px] leading-relaxed text-gray-100"
    >
      <code className="!bg-transparent !border-0 !p-0 whitespace-pre">
        {t.lines.map((line, li) => (
          <React.Fragment key={li}>
            {line.map((seg, si) => (
              <span key={si} className={seg.tone ? TONE[seg.tone] : undefined}>
                {seg.text}
              </span>
            ))}
            {"\n"}
          </React.Fragment>
        ))}
      </code>
    </pre>
  );
}

const EXIT_OPTIONS = ["Step 0", "1", "2", "3a", "3b", "4", "Nowhere"];
const isBool = (v: unknown): v is boolean => typeof v === "boolean";

/** Completion code + GitHub username. Checks the code's shape only, no server call. */
export function CompletionCodeForm() {
  const [codeOk, setCodeOk] = useStored<boolean>("code", false, isBool);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; field?: "cc" | "gh" } | null>(null);
  const [exit, setExit] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget.elements;
    const code = (f.namedItem("cc") as HTMLInputElement).value.trim();
    const user = (f.namedItem("gh") as HTMLInputElement).value.trim();
    if (!/^t1-[A-Za-z2-7]{10}$/.test(code)) {
      setMsg({
        ok: false,
        text: "That doesn't look like a T1 code. It starts with t1- and has 10 more characters, e.g. t1-K3M7QX2PLA.",
        field: "cc",
      });
      return;
    }
    if (!/^[A-Za-z0-9-]{1,39}$/.test(user)) {
      setMsg({ ok: false, text: "Add the GitHub username you ran the check with.", field: "gh" });
      return;
    }
    setMsg({ ok: true, text: "Code format OK. Now take the quiz." });
    setCodeOk(true);
  };

  return (
    <div className="mt-6">
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Completion code
          <input name="cc" placeholder="t1-…" autoComplete="off" spellCheck={false} className={inputClass} aria-invalid={msg?.field === "cc" ? true : undefined} aria-describedby="check-msg" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          GitHub username
          <input name="gh" autoComplete="off" spellCheck={false} className={inputClass} aria-invalid={msg?.field === "gh" ? true : undefined} aria-describedby="check-msg" />
        </label>
        <button type="submit" className={cn(smallButton, "min-h-[44px] px-5")}>
          Check
        </button>
      </form>
      <p
        id="check-msg"
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2 text-sm",
          msg && (msg.ok ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"),
        )}
      >
        {msg?.text}
      </p>
      {codeOk && (
        <div className="mt-3 rounded-xl bg-gray-50 dark:bg-white/[0.04] p-4">
          <p>
            <strong>Where did you lose the most time?</strong>{" "}
            <span className="text-sm text-gray-600 dark:text-gray-400">Optional.</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Where did you lose the most time?">
            {EXIT_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={exit === o}
                onClick={() => setExit(o)}
                className={cn(
                  smallButton,
                  "rounded-full",
                  exit === o &&
                    "border-secondary-wopee bg-secondary-wopee text-white dark:border-primary-wopee dark:bg-primary-wopee dark:text-secondary-wopee",
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
