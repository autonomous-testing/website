import React, { useEffect, useState } from "react";

import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

export const CAMPAIGN = "verdict-integrity";
export const VIDEO_ID = "DF_2-VGVQKk";
export const VIDEO_TITLE = "When AI tests pass but prove nothing";
export const VIDEO_POSTER = "/img/no-proof-no-pass/video-poster.webp";
export const DOCS_URL = "https://docs.wopee.io/concepts/verdict-integrity/";

export const CARD =
  "rounded-2xl border border-solid border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]";
export const ACCENT = "text-secondary-wopee dark:text-primary-wopee";
export const MUTED = "text-gray-600 dark:text-gray-300";

// The visitor's utm_* params with this campaign's defaults filled in, so a
// sign-up or a booked call from YouTube, LinkedIn or e-mail keeps its source.
export function useCampaignUtm(content: string, medium = "landing-page") {
  const fallback = `utm_source=wopee.io&utm_medium=${medium}&utm_campaign=${CAMPAIGN}&utm_content=${content}`;
  const [query, setQuery] = useState(fallback);
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const params = new URLSearchParams();
    incoming.forEach((value, key) => {
      if (key.startsWith("utm_")) params.set(key, value);
    });
    if (!params.has("utm_source")) params.set("utm_source", "wopee.io");
    if (!params.has("utm_medium")) params.set("utm_medium", medium);
    params.set("utm_campaign", CAMPAIGN);
    if (!params.has("utm_content")) params.set("utm_content", content);
    setQuery(params.toString());
  }, [content, medium]);
  return query;
}

export function VerdictCtas({
  content,
  medium,
  className = "",
}: {
  content: string;
  medium?: string;
  className?: string;
}) {
  const utm = useCampaignUtm(content, medium);
  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      <ButtonPrimary
        href={`${cmdBaseUrl}/login?${utm}`}
        label="Start free"
        id={`cta-verdict-start-${content}`}
      />
      <ButtonPrimaryInverted
        href={`/book-demo/?${utm}`}
        label="Book a verdict audit"
        id={`cta-verdict-audit-${content}`}
      />
    </div>
  );
}

const TONE = {
  passed: "bg-green-500",
  incomplete: "bg-amber-500",
  failed: "bg-red-500",
} as const;

export function StatusDot({ tone }: { tone: keyof typeof TONE }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${TONE[tone]}`}
    />
  );
}

export function PreviewPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-solid border-amber-500/50 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-amber-500"
      />
      <span>{children}</span>
    </span>
  );
}
