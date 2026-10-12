import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { learnConfig } from "@/data/learn-config";
import { cn } from "@/lib/utils";

type NotifyInlineProps = {
  /** Button text, e.g. "Email me at launch". */
  cta: string;
  /** Small line under the field. */
  note?: string;
  /** Element id for analytics (GTM click and submit triggers). */
  id?: string;
  /** "dark" for use on the purple gradient bands. */
  tone?: "page" | "dark";
  /** Line that replaces the form after a successful submit. */
  success?: string;
  /** Adds team size (required) and "what should your team learn" (optional). */
  team?: boolean;
  /** Where the sign-up came from, e.g. "learn-teams"; sent with the submission. */
  source?: string;
  className?: string;
};

export const TEAM_SIZES = ["1-4", "5-15", "16-50", "50+"];

/** One button label and one promise for every tutorial notify form. */
export const NOTIFY_CTA = "Email me at launch";
export const NOTIFY_NOTE = "One email when each tutorial opens. Unsubscribe anytime.";

const PORTAL = "139620033";

function hubspotUtk() {
  try {
    return document.cookie.match(/(?:^|; )hubspotutk=([^;]+)/)?.[1];
  } catch {
    return undefined;
  }
}

// Posts straight to HubSpot, so the page needs no embed script. Without a
// dedicated form (learnConfig.teamsFormId) the team details travel in the
// submission's page URL, because the newsletter form only defines `email`.
export default function NotifyInline({
  cta,
  note,
  id,
  tone = "page",
  success = "Thanks. You'll get one email when each tutorial opens.",
  team = false,
  source,
  className,
}: NotifyInlineProps) {
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [goal, setGoal] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const dark = tone === "dark";
  const doneRef = useRef<HTMLParagraphElement>(null);

  // The form is replaced by the thank-you line: move focus there so it isn't lost.
  useEffect(() => {
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const dedicated = team && learnConfig.teamsFormId;
    const extra: Record<string, string> = {};
    if (source) extra.source = source;
    if (team) {
      extra.team_size = size;
      if (goal.trim()) extra.learn_goal = goal.trim().slice(0, 300);
    }
    const page = new URL(window.location.href);
    if (!dedicated) for (const [k, v] of Object.entries(extra)) page.searchParams.set(k, v);
    const fields = [{ objectTypeId: "0-1", name: "email", value: email.trim() }];
    if (dedicated)
      for (const [name, value] of Object.entries(extra)) fields.push({ objectTypeId: "0-1", name, value });
    try {
      const res = await fetch(
        `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${PORTAL}/${dedicated || learnConfig.notifyFormId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields,
            context: {
              hutk: hubspotUtk(),
              pageUri: page.toString(),
              pageName: team ? `${document.title} (team ${size})` : document.title,
            },
          }),
        },
      );
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className={cn(
          "rounded-xl px-4 py-3 font-semibold outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
          dark ? "bg-white/10 text-white" : "bg-green-600/10 text-green-800 dark:text-green-300",
          className,
        )}
      >
        {success}
      </p>
    );
  }

  const fieldCls = cn(
    "min-h-[48px] min-w-0 rounded-lg border border-solid px-4 text-base font-[inherit]",
    "focus:outline focus:outline-2 focus:outline-offset-1",
    dark
      ? "border-white/30 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-white focus:outline-offset-2"
      : "border-gray-300 dark:border-white/20 bg-white dark:bg-white/[0.06] placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 focus:outline-secondary-wopee dark:focus:outline-primary-wopee",
  );
  const placeholderText = dark ? "text-gray-500" : "text-gray-500 dark:text-gray-400";
  const fid = id ?? "notify";

  return (
    <form id={id} onSubmit={submit} className={cn("w-full", className)}>
      <div className={cn("flex flex-col gap-2", !team && "min-[420px]:flex-row")}>
        <label htmlFor={`${fid}-email`} className="sr-only">
          {team ? "Work email" : "Email"}
        </label>
        <input
          id={`${fid}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder={team ? "Work email" : "you@company.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(fieldCls, "h-12 flex-1 [&:not(:placeholder-shown):not(:focus):invalid]:border-red-500")}
        />
        {team && (
          <div className="grid gap-2 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
          <label htmlFor={`${fid}-size`} className="sr-only">
            Team size
          </label>
          <div className="relative">
            <select
              id={`${fid}-size`}
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={cn(fieldCls, "h-12 w-full cursor-pointer appearance-none pr-10 leading-normal", !size && placeholderText)}
            >
              <option value="" disabled>
                Team size
              </option>
              {TEAM_SIZES.map((s) => (
                <option key={s} value={s} className="text-gray-900 dark:bg-[#232326] dark:text-gray-100">
                  {s} testers
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 fill-current",
                dark ? "text-gray-500" : "text-gray-500 dark:text-gray-400",
              )}
            >
              <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
            </svg>
          </div>
          <label htmlFor={`${fid}-goal`} className="sr-only">
            What should your team learn? (optional)
          </label>
          <input
            id={`${fid}-goal`}
            type="text"
            maxLength={300}
            placeholder="Focus topic (optional)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className={cn(fieldCls, "h-12 w-full")}
          />
          </div>
        )}
        <button
          type="submit"
          disabled={state === "sending"}
          className={cn(
            "min-h-[48px] whitespace-nowrap rounded-lg border-0 px-6 text-base font-semibold font-[inherit] cursor-pointer transition-colors disabled:opacity-70",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            dark
              ? "bg-primary-wopee text-secondary-wopee hover:bg-primary-wopee/90 focus-visible:outline-white"
              : "bg-secondary-wopee text-white hover:bg-secondary-wopee/90 dark:bg-primary-wopee dark:text-secondary-wopee dark:hover:bg-primary-wopee/90 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee",
          )}
        >
          {state === "sending" ? "Sending…" : cta}
        </button>
      </div>
      <p
        role={state === "error" ? "alert" : undefined}
        className={cn(
          "mt-2 text-sm",
          state === "error"
            ? cn("font-semibold", dark ? "text-red-200" : "text-red-700 dark:text-red-300")
            : dark
              ? "text-white/85"
              : "text-gray-700 dark:text-gray-300",
        )}
      >
        {state === "error" ? (
          "That didn't go through. Check your connection and try again."
        ) : (
          <>
            {note}{" "}
            <Link
              to="/privacy/"
              className={cn(
                "underline underline-offset-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                dark
                  ? "text-white hover:text-white focus-visible:outline-white"
                  : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee",
              )}
            >
              Privacy
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
