// GA4 events for /learn. GTM (GTM-T54MTRSZ) forwards dataLayer events to GA4;
// dataLayer is absent in development, so nothing is sent there.
export type LearnEvent =
  | "learn_notify_signup"
  | "learn_teams_submit"
  | "learn_tutorial_click"
  | "learn_lab_click";

export function trackLearn(event: LearnEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: object[] };
  w.dataLayer?.push({ event, page_path: window.location.pathname, ...params });
}
