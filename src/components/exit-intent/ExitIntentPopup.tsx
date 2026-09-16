import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

const STORAGE_KEY = "wopee_exit_intent_until";
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const ARM_DELAY_MS = 10_000;
const DESKTOP_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";
const SIGNUP_CTA_SELECTOR = `[id^="cta-"], #vibe-testing, a[href^="${cmdBaseUrl}"]`;
const VARIANT = "exit_v1";

// Homepage and individual blog posts only; blog index, pagination, tag,
// archive and author pages are listings, not reading sessions.
export const isExitIntentPath = (pathname: string) => {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (path === "/") return true;
  const post = path.match(/^\/blog\/([^/]+)\/$/);
  return !!post && !["page", "tags", "archive", "authors"].includes(post[1]);
};

// Storage can be blocked (private mode, disabled site data): treat that as
// snoozed so the popup never shows on every page view.
const isSnoozed = () => {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY) ?? 0) > Date.now();
  } catch {
    return true;
  }
};

const snooze = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + SNOOZE_MS));
  } catch {
    // Nothing to persist; isSnoozed already fails closed.
  }
};

const track = (event: string, params: Record<string, string> = {}) => {
  const w = window as typeof window & { dataLayer?: object[] };
  w.dataLayer?.push({
    event,
    page_path: window.location.pathname,
    page_type: window.location.pathname === "/" ? "home" : "blog",
    variant: VARIANT,
    ...params,
  });
};

const isBlockedByOtherUi = () => {
  if (document.querySelector('[role="dialog"]')) return true;
  const cookieBanner = document.getElementById("CybotCookiebotDialog");
  return !!cookieBanner && cookieBanner.offsetParent !== null;
};

export default function ExitIntentPopup({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const ctaClicked = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const loginUrl = useCmdLoginUrl();

  // Anyone who already clicked a signup CTA does not need a last-chance offer.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.(SIGNUP_CTA_SELECTOR)) snooze();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    if (!enabled || !desktop.matches || isSnoozed()) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    const onMouseOut = (e: MouseEvent) => {
      if (!armed || e.relatedTarget || e.clientY > 0) return;
      if (!desktop.matches || isSnoozed() || isBlockedByOtherUi()) return;
      document.removeEventListener("mouseout", onMouseOut);
      snooze();
      ctaClicked.current = false;
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      track("exit_intent_popup_view");
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [enabled]);

  const onOpenChange = (next: boolean) => {
    if (!next && !ctaClicked.current) track("exit_intent_popup_dismiss");
    setOpen(next);
  };

  const onCta = (cta: "trial" | "demo") => {
    ctaClicked.current = true;
    track("exit_intent_popup_cta", { cta });
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Above the Infima navbar (z-index 200) so the whole page dims. */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[201] bg-black/70" />
        <DialogPrimitive.Content
          ref={contentRef}
          onOpenAutoFocus={(e) => {
            // Opened by the cursor leaving, not by a keypress: focus the
            // dialog itself instead of painting a focus ring on the CTA.
            e.preventDefault();
            contentRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            if (returnFocus.current?.isConnected) returnFocus.current.focus();
          }}
          className="fixed left-1/2 top-1/2 z-[202] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-solid border-secondary-wopee/30 bg-white p-6 shadow-2xl shadow-purple-900/40 outline-none dark:bg-gray-900"
        >
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md border-none bg-transparent p-0 text-gray-600 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-wopee dark:text-gray-300 dark:hover:bg-gray-800 dark:focus-visible:outline-primary-wopee cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          <div className="flex flex-col items-center text-center">
            <img
              src="/img/logo.png"
              alt="Wopee.io logo"
              className="mb-4 h-10 w-10 object-contain dark:invert"
            />
            <DialogPrimitive.Title className="m-0 text-balance text-xl font-semibold leading-tight sm:text-2xl">
              Before you go, create your first{" "}
              <span className="text-secondary-wopee dark:text-primary-wopee">
                AI-generated test
              </span>
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="m-0 mt-2 text-balance text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Start with your web app URL. Wopee.io&apos;s AI agents explore
              your app, write test cases in plain language, and run them in a
              real browser.
            </DialogPrimitive.Description>
          </div>

          <div className="mt-6 flex flex-col items-center gap-1.5">
            <Link
              id="cta-exit-intent-trial"
              href={loginUrl}
              onClick={() => onCta("trial")}
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-secondary-wopee text-base font-semibold text-white transition-opacity hover:text-white hover:no-underline hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:bg-primary-wopee dark:text-secondary-wopee dark:hover:text-secondary-wopee dark:focus-visible:outline-primary-wopee"
            >
              Start for free
            </Link>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
              No credit card required
            </p>
            <Link
              id="cta-exit-intent-demo"
              href="/book-demo/"
              onClick={() => onCta("demo")}
              className="mt-3 text-sm text-gray-600 underline underline-offset-4 hover:text-secondary-wopee dark:text-gray-400 dark:hover:text-primary-wopee"
            >
              Book a 30-minute demo
            </Link>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
