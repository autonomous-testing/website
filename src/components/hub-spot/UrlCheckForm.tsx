import React, { useEffect, useRef, useState } from "react";

const HUBSPOT_PORTAL = "139620033";
const HUBSPOT_FORM = "f6257e05-afe3-4f7c-8f84-75b186a7ea0c";
const HUBSPOT_SUBMIT = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL}/${HUBSPOT_FORM}`;

const CARD =
  "rounded-2xl border border-solid border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]";
const ACCENT = "text-secondary-wopee dark:text-primary-wopee";
const MUTED = "text-gray-600 dark:text-gray-300";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const BUTTON_PRIMARY = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-solid px-6 py-3 text-center text-base font-bold no-underline transition ease-out hover:no-underline motion-reduce:transition-none border-secondary-wopee bg-secondary-wopee text-white hover:bg-[#5e2786] hover:text-white dark:border-primary-wopee dark:bg-primary-wopee dark:text-[#1a1124] dark:hover:bg-[#ffd633] dark:hover:text-[#1a1124] ${FOCUS}`;
const TEXT_LINK = `rounded-sm font-semibold underline decoration-1 underline-offset-4 ${ACCENT} ${FOCUS}`;
const INPUT =
  "block min-h-12 w-full rounded-lg border border-solid border-gray-300 bg-white px-4 text-base text-gray-900 placeholder:text-gray-500 dark:border-white/20 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-gray-400 " +
  FOCUS;

const FREE_MAIL =
  /@(gmail|googlemail|yahoo|hotmail|outlook|live|icloud|me|aol|proton|protonmail|gmx|seznam|centrum|azet|post)\./i;

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

const track = (event: string, params: Record<string, string> = {}) => {
  const w = window as typeof window & { dataLayer?: object[] };
  w.dataLayer?.push({ event, page_path: window.location.pathname, ...params });
};

// Trim, add https:// when no scheme is given, and accept only an http(s)
// address whose host has a dot. Anything with "@" or a space is refused, so an
// e-mail address typed into the URL field never passes.
export function normalizeUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value || /[\s@]/.test(value)) return null;
  const hasScheme = /^[a-z][a-z0-9+.-]*:(\/\/|(?!\d))/i.test(value);
  if (hasScheme && !/^https?:\/\//i.test(value)) return null;
  try {
    const u = new URL(hasScheme ? value : `https://${value}`);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (u.username || u.password) return null;
    const labels = u.hostname.split(".");
    if (
      labels.length < 2 ||
      labels.some((l) => !l) ||
      !/^[a-z]{2,}$|^xn--/i.test(labels[labels.length - 1])
    )
      return null;
    return u.toString();
  } catch {
    return null;
  }
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`mt-[0.2rem] h-4 w-4 shrink-0 ${className}`}
    >
      <path
        d="M4 10.5l3.5 3.5L16 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type UrlCheckFormProps = {
  /** The visitor's utm_* query string, sent with the submission. */
  utm: string;
  /** Where "Book a call instead" points when the submission fails. */
  fallbackHref: string;
  /** Prefix for the input ids, e.g. "mt" gives mt-url and mt-email. */
  fieldId: string;
  /** Prefix for the button ids GTM listens on, e.g. "cta-managed-testing". */
  ctaId: string;
  /** Prefix for the dataLayer events, e.g. "managed_testing". */
  trackPrefix: string;
  submitLabel: string;
  successText: string;
  consent: React.ReactNode;
  className?: string;
};

// Two steps (URL, then e-mail) posted to the HubSpot "URL check" form.
export default function UrlCheckForm({
  utm,
  fallbackHref,
  fieldId,
  ctaId,
  trackPrefix,
  submitLabel,
  successText,
  consent,
  className = "",
}: UrlCheckFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const urlRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const errorId = `${fieldId}-form-error`;
  const hintId = `${fieldId}-email-hint`;

  useEffect(() => {
    if (step === 2) emailRef.current?.focus();
  }, [step]);
  useEffect(() => {
    if (status === "done" || status === "error") resultRef.current?.focus();
  }, [status]);

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizeUrl(url);
    if (!clean) {
      setFieldError("Enter your website address, e.g. https://yourapp.com");
      urlRef.current?.focus();
      return;
    }
    setFieldError("");
    setUrl(clean);
    setStep(2);
    track(`${trackPrefix}_url_step1`);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setFieldError("Enter a valid e-mail address, e.g. you@yourcompany.com");
      emailRef.current?.focus();
      return;
    }
    setFieldError("");
    setStatus("sending");
    const params = new URLSearchParams(utm);
    const hutk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];
    try {
      const res = await fetch(HUBSPOT_SUBMIT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "website", value: url },
            { name: "email", value: email.trim() },
            { name: "utm_source", value: params.get("utm_source") ?? "" },
            { name: "utm_medium", value: params.get("utm_medium") ?? "" },
            { name: "utm_campaign", value: params.get("utm_campaign") ?? "" },
          ],
          context: {
            pageUri: window.location.href,
            pageName: document.title,
            ...(hutk ? { hutk } : {}),
          },
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      track(`${trackPrefix}_url_submit`);
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className={`${CARD} px-5 py-5 outline-none ${className}`}
      >
        <p className="m-0 flex gap-2.5 text-lg font-bold">
          <Check className="text-secondary-wopee dark:text-primary-wopee" />
          <span>{successText}</span>
        </p>
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-bold";
  return (
    <div className={`${CARD} px-5 py-5 ${className}`}>
      <p
        className={`m-0 mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] ${ACCENT}`}
      >
        Step {step} of 2
      </p>
      {step === 1 ? (
        <form onSubmit={next} noValidate>
          <label htmlFor={`${fieldId}-url`} className={label}>
            Your product's URL
          </label>
          <input
            ref={urlRef}
            id={`${fieldId}-url`}
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="https://yourapp.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? errorId : undefined}
            className={INPUT}
          />
          {fieldError ? (
            <p
              id={errorId}
              role="alert"
              className="m-0 mt-2 text-sm font-semibold text-red-700 dark:text-red-300"
            >
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            id={`${ctaId}-url-check`}
            className={`${BUTTON_PRIMARY} mt-4 w-full sm:w-auto`}
          >
            Next
            <span aria-hidden="true">→</span>
          </button>
        </form>
      ) : (
        <form onSubmit={submit} noValidate>
          <p className={`m-0 mb-4 break-all text-base sm:text-sm ${MUTED}`}>
            Checking{" "}
            <strong className="text-gray-900 dark:text-white">
              {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </strong>{" "}
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setStatus("idle");
                setFieldError("");
              }}
              className={`cursor-pointer border-0 bg-transparent p-0 text-sm ${TEXT_LINK}`}
            >
              Change
            </button>
          </p>
          <label htmlFor={`${fieldId}-email`} className={label}>
            Your work e-mail
          </label>
          <input
            ref={emailRef}
            id={`${fieldId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? `${errorId} ${hintId}` : hintId}
            className={INPUT}
          />
          {fieldError ? (
            <p
              id={errorId}
              role="alert"
              className="m-0 mt-2 text-sm font-semibold text-red-700 dark:text-red-300"
            >
              {fieldError}
            </p>
          ) : null}
          <p
            id={hintId}
            aria-live="polite"
            className={`m-0 mt-2 text-sm ${MUTED}`}
          >
            {FREE_MAIL.test(email)
              ? "A work e-mail helps us match the findings to your team. A personal one works too."
              : "Use your work e-mail, so the findings reach your team."}
          </p>
          <button
            type="submit"
            id={`${ctaId}-url-send`}
            disabled={status === "sending"}
            className={`${BUTTON_PRIMARY} mt-4 w-full sm:w-auto`}
          >
            {status === "sending" ? "Sending…" : submitLabel}
          </button>
          {status === "error" ? (
            <div
              ref={resultRef}
              tabIndex={-1}
              role="alert"
              className="mt-4 text-base font-semibold outline-none sm:text-sm"
            >
              That didn't go through.{" "}
              <a
                href={fallbackHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track(`${trackPrefix}_cta`, { cta: "url-check-fallback" })
                }
                className={TEXT_LINK}
              >
                Book a call instead
              </a>{" "}
              and send your URL there.
            </div>
          ) : null}
        </form>
      )}
      <p className={`m-0 mt-4 text-xs leading-relaxed ${MUTED}`}>{consent}</p>
    </div>
  );
}
