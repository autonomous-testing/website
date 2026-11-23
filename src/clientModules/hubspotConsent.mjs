// HubSpot tracking sets __hstc, hubspotutk, __hssrc and __hssc (Statistics in the
// Cookiebot declaration) and sends __ptq.gif (Marketing). It loads only after the
// visitor allows both, and right away for a returning visitor who already has.
// Cookiebot comes from GTM, so the choice arrives through its window events.
const SCRIPT_ID = "hs-script-loader";
const SCRIPT_SRC = "https://js-eu1.hs-scripts.com/139620033.js";
const COOKIEBOT_EVENTS = ["CookiebotOnConsentReady", "CookiebotOnAccept"];

export function hasHubSpotConsent(cookiebot) {
  const consent = cookiebot?.consent;
  return consent?.statistics === true && consent?.marketing === true;
}

function whenIdle(win, run) {
  const idle = () =>
    "requestIdleCallback" in win
      ? win.requestIdleCallback(run, { timeout: 3000 })
      : win.setTimeout(run, 1500);
  if (win.document.readyState === "complete") idle();
  else win.addEventListener("load", idle, { once: true });
}

export function startHubSpotOnConsent(win) {
  let queued = false;
  const inject = () => {
    const doc = win.document;
    if (doc.getElementById(SCRIPT_ID)) return;
    const script = doc.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = SCRIPT_SRC;
    doc.body.appendChild(script);
  };
  const load = () => {
    if (queued || !hasHubSpotConsent(win.Cookiebot)) return;
    queued = true;
    whenIdle(win, inject);
  };
  for (const event of COOKIEBOT_EVENTS) win.addEventListener(event, load);
  load();
}

if (typeof window !== "undefined") startHubSpotOnConsent(window);
