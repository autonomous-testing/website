import React, { useEffect, useRef, useState } from "react";
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
  className?: string;
};

const PORTAL = "139620033";

function hubspotUtk() {
  try {
    return document.cookie.match(/(?:^|; )hubspotutk=([^;]+)/)?.[1];
  } catch {
    return undefined;
  }
}

// One email field and one button, posting to the same HubSpot form as the
// site newsletter (email is its only field), so the hero needs no embed script.
export default function NotifyInline({
  cta,
  note,
  id,
  tone = "page",
  className,
}: NotifyInlineProps) {
  const [email, setEmail] = useState("");
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
    try {
      const res = await fetch(
        `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${PORTAL}/${learnConfig.notifyFormId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [{ objectTypeId: "0-1", name: "email", value: email.trim() }],
            context: {
              hutk: hubspotUtk(),
              pageUri: window.location.href,
              pageName: document.title,
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
        Thanks. You'll get one email when it opens.
      </p>
    );
  }

  return (
    <form id={id} onSubmit={submit} className={cn("w-full", className)}>
      <div className="flex flex-col min-[420px]:flex-row gap-2">
        <label htmlFor={`${id ?? "notify"}-email`} className="sr-only">
          Email
        </label>
        <input
          id={`${id ?? "notify"}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "min-h-[48px] flex-1 min-w-0 rounded-lg border border-solid px-4 text-base font-[inherit]",
            "focus:outline focus:outline-2 focus:outline-offset-1",
            dark
              ? "border-white/30 bg-white text-gray-900 focus:outline-primary-wopee"
              : "border-gray-300 dark:border-white/20 bg-white dark:bg-white/[0.06] placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 focus:outline-secondary-wopee dark:focus:outline-primary-wopee",
          )}
        />
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
        className={cn("mt-2 text-sm", dark ? "text-white/85" : "text-gray-700 dark:text-gray-300")}
      >
        {state === "error"
          ? "That didn't go through. Try again in a moment."
          : note}
      </p>
    </form>
  );
}
