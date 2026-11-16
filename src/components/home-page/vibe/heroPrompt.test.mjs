import { test } from "node:test";
import assert from "node:assert/strict";

import { OWN_APP_PROMPT, nextInstructions } from "./heroPrompt.ts";

const ECOMMERCE = `Test check out.
Sign in (standard_user / secret_sauce), add an item, complete checkout.
Verify that "Thank you for your order!" appears.`;
const BANKING = `Test sign in.
Accept the cookie banner if shown, then submit the pre-filled PIN form.
Verify that the dashboard loads after submit.`;
const GENERATED = [ECOMMERCE, BANKING, OWN_APP_PROMPT];

test("own URL replaces the demo prompt and its credentials", () => {
  const out = nextInstructions(ECOMMERCE, GENERATED, OWN_APP_PROMPT);
  assert.equal(out, OWN_APP_PROMPT);
  assert.doesNotMatch(out, /secret_sauce|checkout/i);
});

test("own URL fills an empty box", () => {
  assert.equal(nextInstructions("  ", GENERATED, OWN_APP_PROMPT), OWN_APP_PROMPT);
});

test("picking a demo after an own URL loads the demo prompt", () => {
  assert.equal(nextInstructions(OWN_APP_PROMPT, GENERATED, BANKING), BANKING);
});

test("instructions the visitor wrote are kept", () => {
  const own = "Log in as admin and check the invoice list.";
  assert.equal(nextInstructions(own, GENERATED, OWN_APP_PROMPT), own);
});

test("the own-app prompt stays short and plain", () => {
  const lines = OWN_APP_PROMPT.split("\n");
  assert.ok(lines.length <= 4);
  assert.match(lines[0], /^Test /);
  assert.match(lines.at(-1), /^Verify /);
});
