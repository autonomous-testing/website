// Cookiebot keeps its CookieConsent cookie on the website's own host, so the app on
// another wopee.io subdomain cannot read the visitor's choice. This mirrors only the
// statistics decision to a cookie the whole domain can read. It holds no identifier.
const COOKIE_NAME = "wopee_statistics_consent";
const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;
const COOKIEBOT_EVENTS = [
  "CookiebotOnConsentReady",
  "CookiebotOnAccept",
  "CookiebotOnDecline",
];

/** The cookie to write, or null off wopee.io and before the visitor's choice is known. */
export function consentCookie(hostname, cookiebot) {
  const onWopee = hostname === "wopee.io" || hostname.endsWith(".wopee.io");
  if (!onWopee || !cookiebot?.hasResponse) return null;

  const choice = cookiebot.consent?.statistics === true ? "granted" : "denied";
  return `${COOKIE_NAME}=${choice}; Domain=.wopee.io; Path=/; Max-Age=${ONE_YEAR_SECONDS}; Secure; SameSite=Lax`;
}

export function startConsentSync(win) {
  const sync = () => {
    const cookie = consentCookie(win.location.hostname, win.Cookiebot);
    if (cookie) win.document.cookie = cookie;
  };
  for (const event of COOKIEBOT_EVENTS) win.addEventListener(event, sync);
  sync();
}

if (typeof window !== "undefined") startConsentSync(window);
