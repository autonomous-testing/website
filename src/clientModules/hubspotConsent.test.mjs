import { test } from "node:test";
import assert from "node:assert/strict";

import { hasHubSpotConsent, startHubSpotOnConsent } from "./hubspotConsent.mjs";

const answered = (statistics, marketing) => ({
  hasResponse: true,
  consent: { statistics, marketing },
});

function fakeWindow(cookiebot) {
  const listeners = {};
  const scripts = [];
  return {
    Cookiebot: cookiebot,
    listeners,
    scripts,
    document: {
      readyState: "complete",
      getElementById: (id) => scripts.find((s) => s.id === id) ?? null,
      createElement: () => ({}),
      body: { appendChild: (s) => scripts.push(s) },
    },
    requestIdleCallback: (run) => run(),
    addEventListener: (name, listener) => (listeners[name] = listener),
  };
}

test("needs both statistics and marketing consent", () => {
  assert.equal(hasHubSpotConsent(undefined), false);
  assert.equal(hasHubSpotConsent({ hasResponse: false }), false);
  assert.equal(hasHubSpotConsent(answered(true, false)), false);
  assert.equal(hasHubSpotConsent(answered(false, true)), false);
  assert.equal(hasHubSpotConsent(answered(true, true)), true);
});

test("loads nothing before the visitor has answered", () => {
  const win = fakeWindow(undefined);
  startHubSpotOnConsent(win);
  assert.equal(win.scripts.length, 0);
});

test("loads after Allow all", () => {
  const win = fakeWindow(undefined);
  startHubSpotOnConsent(win);
  win.Cookiebot = answered(true, true);
  win.listeners.CookiebotOnAccept();
  assert.equal(win.scripts.length, 1);
  assert.equal(
    win.scripts[0].src,
    "https://js-eu1.hs-scripts.com/139620033.js",
  );
});

test("loads right away for a returning visitor who consented", () => {
  const win = fakeWindow(answered(true, true));
  startHubSpotOnConsent(win);
  assert.equal(win.scripts.length, 1);
});

test("never loads after Deny", () => {
  const win = fakeWindow(undefined);
  startHubSpotOnConsent(win);
  win.Cookiebot = answered(false, false);
  win.listeners.CookiebotOnConsentReady();
  assert.equal(win.scripts.length, 0);
});

test("loads the script once", () => {
  const win = fakeWindow(answered(true, true));
  startHubSpotOnConsent(win);
  win.listeners.CookiebotOnConsentReady();
  win.listeners.CookiebotOnAccept();
  assert.equal(win.scripts.length, 1);
});
