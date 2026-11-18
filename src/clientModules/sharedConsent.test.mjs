import { test } from "node:test";
import assert from "node:assert/strict";

import { consentCookie, startConsentSync } from "./sharedConsent.mjs";

const answered = (statistics) => ({
  hasResponse: true,
  consent: { statistics },
});

test("shares an accepted statistics choice across wopee.io", () => {
  assert.equal(
    consentCookie("wopee.io", answered(true)),
    "wopee_statistics_consent=granted; Domain=.wopee.io; Path=/; Max-Age=31536000; Secure; SameSite=Lax",
  );
});

test("shares a declined statistics choice", () => {
  assert.match(
    consentCookie("website.wopee.io", answered(false)),
    /^wopee_statistics_consent=denied;/,
  );
});

test("writes nothing before the visitor has answered", () => {
  assert.equal(consentCookie("wopee.io", undefined), null);
  assert.equal(consentCookie("wopee.io", { hasResponse: false }), null);
});

test("writes nothing outside wopee.io", () => {
  assert.equal(consentCookie("localhost", answered(true)), null);
  assert.equal(consentCookie("notwopee.io", answered(true)), null);
});

test("follows a changed choice", () => {
  const listeners = {};
  const win = {
    location: { hostname: "wopee.io" },
    document: { cookie: "" },
    Cookiebot: answered(true),
    addEventListener: (name, listener) => (listeners[name] = listener),
  };

  startConsentSync(win);
  assert.match(win.document.cookie, /=granted;/);

  win.Cookiebot = answered(false);
  listeners.CookiebotOnDecline();
  assert.match(win.document.cookie, /=denied;/);
});
