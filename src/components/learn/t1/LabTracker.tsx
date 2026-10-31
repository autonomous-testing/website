import React, { useState } from "react";
import { cn } from "@/lib/utils";
import VideoBlock from "@/components/learn/VideoBlock";
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
      <div className="flex flex-col gap-3 justify-between pb-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center">
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
                  : "bg-gray-300 dark:bg-white/15",
              )}
            />
          ))}
        </span>
      </div>

      <ol className="m-0 list-none p-0 border-0 border-t border-solid border-gray-200 dark:border-white/10">
        {t1Steps.map((s) => {
          const on = !!ticks[s.key];
          const msg = msgs[s.key];
          return (
            <React.Fragment key={s.key}>
              <li
                className={cn(
                  "grid gap-4 border-0 border-b border-solid border-gray-200 py-5 dark:border-white/10 md:grid-cols-[1fr_minmax(240px,300px)]",
                  on && "bg-green-600/5",
                )}
              >
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 border-solid text-sm font-bold",
                      on
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-400 dark:border-white/30",
                    )}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <div>
                    <p className="font-bold">
                      {s.key} · {s.title}{" "}
                      <span className="ml-1 whitespace-nowrap text-sm font-normal text-gray-600 dark:text-gray-400">
                        {s.time}
                      </span>
                      {on && <span className="sr-only"> (done)</span>}
                    </p>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                      <Md text={s.does} />
                    </p>
                    {s.clip && (
                      <p className="mt-2 inline-block rounded-r-md border-0 border-l-2 border-solid border-secondary-wopee bg-secondary-wopee/5 px-2 py-1 text-xs dark:border-primary-wopee dark:bg-white/5">
                        Before this step: <b>{s.clip}</b>
                      </p>
                    )}
                    {s.clipVideoId && (
                      <VideoBlock
                        className="mt-3"
                        videoId={s.clipVideoId}
                        title={s.clip}
                        comingLabel=""
                      />
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
                      msg && !msg.ok ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400",
                    )}
                  >
                    {msg?.text}
                  </span>
                </div>
              </li>
              {s.key === t1StopAfter && (
                <li className="border-0 border-b border-solid border-gray-200 py-3 text-sm text-gray-700 dark:border-white/10 dark:text-gray-300">
                  <span aria-hidden="true" className="mr-2">⏸</span>
                  <strong>Good place to stop.</strong> Stop the codespace.
                  Your work waits for you.
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        Ticks are kept in this browser only.
      </p>
    </div>
  );
}
