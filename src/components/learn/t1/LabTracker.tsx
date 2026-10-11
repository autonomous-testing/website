import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { t1Steps, t1StopAfter } from "@/data/learn-t1";
import { Md, useStored, smallButton, inputClass } from "./shared";

type Ticks = Record<string, string>;
const isTicks = (v: unknown): v is Ticks =>
  !!v && typeof v === "object" && !Array.isArray(v);

// Checkpoint tracker: the learner pastes the short code `npm run check -- t1 --step N`
// prints. The page checks the code's shape only; ticks stay in this browser.
export default function LabTracker() {
  const [ticks, setTicks] = useStored<Ticks>("steps", {}, isTicks);
  const [msgs, setMsgs] = useState<Record<string, { ok: boolean; text: string }>>({});
  const done = t1Steps.filter((s) => ticks[s.key]).length;

  const submit = (key: string, value: string) => {
    const re = new RegExp(`^cp${key}-[A-Za-z0-9]{4}$`, "i");
    if (re.test(value.trim())) {
      setTicks({ ...ticks, [key]: value.trim() });
      setMsgs({ ...msgs, [key]: { ok: true, text: "Ticked." } });
    } else {
      setMsgs({
        ...msgs,
        [key]: { ok: false, text: `Expected cp${key}-XXXX from the check.` },
      });
    }
  };

  const toggleManual = (key: string) => {
    const next = { ...ticks };
    if (next[key]) delete next[key];
    else next[key] = "manual";
    setTicks(next);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between rounded-xl bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm">
        <span>
          Paste the short code that <code>npm run check -- t1 --step N</code>{" "}
          prints to tick a box.
        </span>
        <span
          className="flex gap-1"
          role="img"
          aria-label={`Lab progress: ${done} of ${t1Steps.length} steps`}
        >
          {t1Steps.map((s) => (
            <i
              key={s.key}
              className={cn(
                "block h-2 w-6 rounded-full",
                ticks[s.key]
                  ? "bg-green-500"
                  : "bg-gray-300 dark:bg-gray-700",
              )}
            />
          ))}
        </span>
      </div>

      <ol className="m-0 mt-4 list-none p-0 flex flex-col gap-3">
        {t1Steps.map((s) => {
          const on = !!ticks[s.key];
          const msg = msgs[s.key];
          return (
            <React.Fragment key={s.key}>
              <li
                className={cn(
                  "grid gap-4 rounded-xl border border-solid p-4 sm:p-5 md:grid-cols-[1fr_minmax(240px,300px)]",
                  on
                    ? "border-green-600/50 bg-green-600/5"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
                )}
              >
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 border-solid text-sm font-bold",
                      on
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 dark:border-gray-600",
                    )}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <div>
                    <p className="font-bold">
                      {s.key} · {s.title}{" "}
                      <span className="ml-1 text-sm font-normal opacity-60">
                        {s.time}
                      </span>
                      {on && <span className="sr-only"> (done)</span>}
                    </p>
                    <p className="mt-1 opacity-85">
                      <Md text={s.does} />
                    </p>
                    {s.clip && (
                      <p className="mt-2 inline-block rounded-md bg-secondary-wopee/10 dark:bg-primary-wopee/10 px-2 py-1 text-xs">
                        Before this step: <b>{s.clip}</b>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">{s.checkpoint}</span>
                  {s.manual ? (
                    <button
                      type="button"
                      className={cn(smallButton, "self-start")}
                      aria-pressed={on}
                      onClick={() => toggleManual(s.key)}
                    >
                      {on ? "Done" : "Mark done"}
                    </button>
                  ) : (
                    <form
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem(
                          "code",
                        ) as HTMLInputElement;
                        submit(s.key, input.value);
                      }}
                    >
                      <label className="sr-only" htmlFor={`cp-${s.key}`}>
                        Code for step {s.key}
                      </label>
                      <input
                        id={`cp-${s.key}`}
                        name="code"
                        placeholder={`cp${s.key}-…`}
                        autoComplete="off"
                        spellCheck={false}
                        defaultValue={on ? ticks[s.key] : ""}
                        key={on ? "on" : "off"}
                        className={inputClass}
                        aria-invalid={msg ? !msg.ok : undefined}
                        aria-describedby={`cp-${s.key}-msg`}
                      />
                      <button type="submit" className={cn(smallButton, "min-w-[64px]")}>
                        Tick
                      </button>
                    </form>
                  )}
                  <span
                    id={`cp-${s.key}-msg`}
                    aria-live="polite"
                    className={cn(
                      "text-xs",
                      msg && !msg.ok ? "text-red-600 dark:text-red-400" : "opacity-70",
                    )}
                  >
                    {msg?.text}
                  </span>
                </div>
              </li>
              {s.key === t1StopAfter && (
                <li className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 px-5 py-3 text-sm">
                  ☕ <strong>Good place to stop.</strong> Stop the codespace.
                  Your work waits for you.
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
      <p className="mt-3 text-sm opacity-70">
        Ticks are kept in this browser only.
      </p>
    </div>
  );
}
