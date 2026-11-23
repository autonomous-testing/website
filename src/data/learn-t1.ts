// Content of /learn/agentic-testing (T1) that the dry run and recordings may change:
// the widget numbers, lab timings, video chapters, check output samples and the quiz.

import { learnConfig } from "./learn-config";

const LAB_REPO = "https://github.com/Wopee-io/learn-testing-labs";

export const t1Links = {
  codespaces: "https://codespaces.new/Wopee-io/learn-testing-labs?quickstart=1",
  calendar:
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Agentic%20testing%20lab%20(Wopee.io)&details=wopee.io%2Flearn%2Fagentic-testing",
  localSetup: `${LAB_REPO}/blob/main/docs/local-setup.md`,
  discussions: `${LAB_REPO}/discussions`,
  issues: `${LAB_REPO}/issues/new?labels=t1`,
  boss: `${LAB_REPO}/blob/main/labs/t1/README.md#boss-challenge-fd-10-and-fd-11`,
  goingDeeper: `${LAB_REPO}/blob/main/labs/t1/README.md#going-deeper-agents-in-a-real-pipeline`,
  copilotSettings: "https://github.com/settings/copilot",
};

/** The 60-second "Is this test correct?" widget. */
export const t1Widget = {
  file: "order.agent.spec.ts",
  lines: [
    {
      code: "// Two dishes: Classic Beef Burger, Large $15.95 + Double Smash Burger $15.99 = $31.94",
      comment: true,
    },
    { code: "await expect(cart.getByText('$31.94')).toBeVisible();" },
    {
      code: "// Total = Subtotal − 20 % discount + delivery + service (FD-05)",
      comment: true,
    },
    { code: "await expect(cart.getByText('$36.43')).toBeVisible();" },
  ],
  /** 1-based number of the line that lies. */
  answer: 4,
  rule: [
    ["Orders over $25", "20 % off food"],
    ["Delivery", "$2.99"],
    ["Service", "$1.50"],
  ] as [string, string][],
  math: [
    ["Subtotal", "$31.94"],
    ["− 20 % discount", "−$6.39"],
    ["+ delivery", "$2.99"],
    ["+ service", "$1.50"],
  ] as [string, string][],
  formula: "31.94 − 6.39 + 2.99 + 1.50",
  specTotal: "$30.04",
  appTotal: "$36.43",
};

export const t1Chapters: [string, string][] = [
  ["0:00", "This green test is wrong"],
  ["1:03", "Scripted, AI-assisted, agentic"],
  ["2:56", "Predict: the empty checkout"],
  ["3:55", "Playwright's three agents, recorded"],
  ["6:34", "Agent fail of the week"],
  ["7:12", "Caught: what the generator and healer did"],
  ["8:58", "The 5-minute review"],
  ["9:38", "Where agents break"],
  ["10:36", "Your lab"],
];

export type LabStep = {
  key: string;
  title: string;
  time: string;
  does: string;
  checkpoint: string;
  /** The just-in-time video clip shown before this step. */
  clip?: string;
  clipVideoId?: string;
  /** Step 0 has no code: the learner ticks it by hand. */
  manual?: boolean;
};

export const t1Steps: LabStep[] = [
  {
    key: "0",
    title: "Check setup",
    time: "5 min",
    does: "`npm run verify`, run the seed test.",
    checkpoint: "Seed test green",
    manual: true,
  },
  {
    key: "1",
    title: "Catch your first agent mistake",
    time: "15 min",
    does: "Catch your first agent mistake, then find four more in a green test. No AI.",
    checkpoint: "CP1 · 3 of 4 hidden flaws",
  },
  {
    key: "2",
    title: "Fix the agent's checkout tests",
    time: "20 min",
    does: "Finish two checkout tests with a coding agent, then fix what it got wrong.",
    checkpoint: "CP2 · the right test fails",
    clip: "Absent is not disabled (1 min clip)",
    clipVideoId: learnConfig.t1.clip2VideoId,
  },
  {
    key: "3a",
    title: "Plan a new feature",
    time: "12 min",
    does: "Wire Playwright's agents, plan a new feature: promo codes.",
    checkpoint: "CP3a · plan with spec values",
    clip: "Playwright's three agents (3 min clip)",
    clipVideoId: learnConfig.t1.clip3VideoId,
  },
  {
    key: "3b",
    title: "Generate and review tests",
    time: "10 min",
    does: "Generate the tests, run them, review them.",
    checkpoint: "CP3b · 3 tests, spec values",
  },
  {
    key: "4",
    title: "Catch the healer",
    time: "12 min",
    does: "Let the healer fix a red suite, then judge its diff.",
    checkpoint: "CP4 · locator fixed, finding kept",
    clip: "What the generator and healer did (2.5 min clip)",
    clipVideoId: learnConfig.t1.clip4VideoId,
  },
];

/** Steps after which the page shows "Good place to stop". */
export const t1StopAfter = "2";

export type TermLine = { text: string; tone?: "ok" | "bad" | "warn" | "dim" }[];

export const t1CheckTabs: { id: string; label: string; lines: TermLine[] }[] = [
  {
    id: "fail",
    label: "3b · failing",
    lines: [
      [{ text: "$ npm run check -- t1 --step 3b", tone: "dim" }],
      [{ text: "T1 · check my work · step 3b" }],
      [],
      [{ text: " 3 " }, { text: "PASS", tone: "ok" }, { text: "  Spec IDs              3 tests, each names FD-09" }],
      [{ text: " 4 " }, { text: "FAIL", tone: "bad" }, { text: "  Clean tests           step3/tests/fd-09.spec.ts:14 uses .nth(1). Use getByRole with a name." }],
      [{ text: " 5 " }, { text: "PASS", tone: "ok" }, { text: "  Real assertions       the discount test asserts $1.30" }],
      [{ text: " 6 " }, { text: "PASS", tone: "ok" }, { text: "  Pass where right      FD-09 unknown code, FD-09 twice: 3/3" }],
      [{ text: " 7 " }, { text: "PASS", tone: "ok" }, { text: "  Fail where wrong      FD-09 discount: failed 3/3 on an assertion ($1.30 expected)" }],
      [],
      [{ text: "✗ CP3b not yet.", tone: "bad" }, { text: " Fix the FAIL line and run again." }],
      [{ text: "  Stuck? npm run check -- t1 --step 3b --hint 1" }],
    ],
  },
  {
    id: "pass",
    label: "3b · passing",
    lines: [
      [{ text: "$ npm run check -- t1 --step 3b", tone: "dim" }],
      [
        { text: "✓ CP3b passed", tone: "ok" },
        { text: " · T1 " },
        { text: "▰▰▰▰", tone: "warn" },
        { text: "▱▱ · code " },
        { text: "cp3b-7Q4M", tone: "warn" },
        { text: " (paste it on the lesson page to tick the box)" },
      ],
      [{ text: "Next: Step 4 · Catch the healer. Commit first. → labs/t1/README.md#step-4" }],
    ],
  },
  {
    id: "full",
    label: "Full run 8/8",
    lines: [
      [{ text: "$ npm run check -- t1", tone: "dim" }],
      [{ text: "Score " }, { text: "8/8", tone: "ok" }, { text: ". Your completion code: " }, { text: "t1-K3M7QX2PLA", tone: "warn" }],
      [{ text: "Paste it at wopee.io/learn/agentic-testing#check, then take the quiz." }],
      [{ text: "Your evidence: labs/t1/evidence.md" }],
    ],
  },
];

export type QuizItem = {
  /** Question; `code`, **bold** and _italic_ marks are rendered. */
  t: string;
  code?: string;
  o: [string, string, string, string];
  /** Index of the right option in `o`. */
  a: number;
  why: string;
  /** "Why not the others", naming options by their original letters A to D. */
  not: string;
};

export const t1Quiz: QuizItem[] = [
  {
    t: "Which setup plans its own steps?",
    o: [
      "A Playwright test you wrote by hand that orders a meal on FoodDash.",
      "Copilot autocompleting the locator for the **Place Order** button while you type.",
      'An agent that gets "order a meal and prove it worked", then writes, runs and fixes the test.',
      "A script recorded with Playwright's code generator while you clicked through the app.",
    ],
    a: 2,
    why: "An agent works in a loop of plan, act, observe and judge, and decides the steps itself.",
    not: "A and D are scripted, a person decided every step. B is AI-assisted, the AI suggests and you decide.",
  },
  {
    t: 'In agentic testing, who should own the oracle, the source of truth for "correct"?',
    o: [
      "The agent, because it observed the app directly.",
      "The tester, through the spec the tests are checked against.",
      "The healer, because it runs the tests last.",
      "The app's current behaviour, because it is what users see.",
    ],
    a: 1,
    why: 'The agent can propose a verdict, but a person must write or choose what "correct" means.',
    not: "A and D make the thing under test its own judge. C, the healer optimises for green, not for correct.",
  },
  {
    t: "Which of Playwright's three agents can edit your existing test files?",
    o: [
      "The planner.",
      "The generator.",
      "The healer.",
      "None of them. They only suggest changes.",
    ],
    a: 2,
    why: "The healer is the only one with the edit tool, which is why you commit before it runs.",
    not: "A has no file-edit tool; it saves a plan (it can still run code in the browser, so it is not harmless). B writes new test files from a plan. D, the healer does change files, without asking.",
  },
  {
    t: "After the healer ran, the report says `4 passed, 1 skipped`. You find this in the diff. What is the state of FD-06?",
    code: "test.fixme('FD-06 · an empty form places no order', async ({ page }) => {\n  // The app confirms empty orders. Marked fixme until the app is fixed.",
    o: [
      "It passed, because the suite is green.",
      'It is not tested. The finding is hidden as "skipped", not resolved.',
      "It failed, and the report shows it as a failure.",
      "The healer fixed the app, so the test is no longer needed.",
    ],
    a: 1,
    why: "`test.fixme` skips the test. The bug is still there and nothing checks it.",
    not: "A, skipped is not passed. C, a fixme test never runs, so it cannot fail. D, agents change tests, not the app.",
  },
  {
    t: "Two dishes at Burger Palace, subtotal $31.94. FD-05: _20 % OFF orders over $25_, delivery $2.99, service $1.50. The generator wrote the line below. The test is green. What do you do?",
    code: "await expect(page.getByText('Total: $36.43')).toBeVisible();",
    o: [
      "Keep it. It passes and matches what the app shows.",
      "Change the expected value to $30.04, so the test fails until the app applies the discount.",
      "Delete the total check, because totals change too often.",
      'Change it to check that some text starting with "Total" is visible.',
    ],
    a: 1,
    why: "The spec total is 31.94 − 6.39 + 2.99 + 1.50 = $30.04. $36.43 is the total without the discount, so the test encodes the bug.",
    not: "A certifies the bug. C and D make the test weaker than the spec, so the bug passes silently.",
  },
  {
    t: "FoodDash, `/checkout` with an empty cart. FD-06: _an empty state with a way back to the restaurants, never a form that could place an empty order._ Which assertion fits?",
    o: [
      "`await expect(page.getByRole('button', { name: 'Place Order' })).toBeDisabled()`",
      "`await expect(page.getByRole('alert')).toBeVisible()`",
      "`await expect(page.getByRole('button', { name: 'Place Order' })).toHaveCount(0)`",
      "`await expect(page).toHaveURL('/')`",
    ],
    a: 2,
    why: "The spec says no form at all, so the button must be absent, not disabled.",
    not: "A and B are what agents invent from other checkouts; the spec asks for neither. D, the spec offers a way back, it does not require a redirect.",
  },
  {
    t: "Your FD-06 test fails with the error below. The form was submitted empty. What is the right next step?",
    code: "Error: expect(locator).toHaveCount(0) failed\nLocator: getByRole('heading', { name: 'Order Confirmed!' })\nExpected: 0\nReceived: 1",
    o: [
      "Change the test to expect 1, because that is how the app works.",
      "Keep the test failing and report the finding with its spec ID: an empty form places the order.",
      "Add `retries: 2` to the config, in case the app was slow.",
      "Mark it `test.fixme()` so the suite is green for the release.",
    ],
    a: 1,
    why: "The test is red for the right reason. The app breaks FD-06, and that failure is the finding.",
    not: "A encodes the bug. C, retries do not change a deterministic result. D hides the finding, the same trap the healer falls into.",
  },
  {
    t: 'The config has `retries: 1`. The healer reports "passing consistently". You run `npx playwright test --retries=0 --repeat-each=3` and all 3 runs are green. What can you claim?',
    o: [
      "The test is stable. Three green runs with retries off prove it.",
      "No failure showed up in a quick smoke check. To call it stable, run it many more times, e.g. `--repeat-each=20 --retries=0`.",
      "Nothing. Only the HTML report can show whether a test is flaky.",
      "The healer was right, because retries were off.",
    ],
    a: 1,
    why: "A test that fails one time in ten still passes three runs in a row 73 % of the time. Three runs with retries off catch an obvious flake, like the one in our rehearsal; a stability claim needs many runs.",
    not: "A overclaims from three samples. C, repeated runs are the evidence; the report only shows them. D, one clean smoke check does not make the agent's claim true.",
  },
  {
    t: "The healer changed one locator. Before and after are below. What is the risk?",
    code: "// before\nawait page.getByRole('radio', { name: /Cash on Delivery/ }).click();\n// after\nawait page.locator('[role=\"radio\"]').nth(1).click();",
    o: [
      "None. Both click the same radio button today.",
      "If the payment options are reordered, the test quietly pays by another method and still passes.",
      "The new locator is slower, so the test may time out.",
      "Role-based locators are not supported for radio buttons.",
    ],
    a: 1,
    why: "A position points at whatever is second. A role and a name point at what you mean.",
    not: "A only holds until the page changes. C, speed is not the issue. D, `getByRole('radio', …)` works, the app has a real radio group.",
  },
  {
    t: 'An agent finishes and says: "All tests pass. Every assertion matches the expected results in the plan." What evidence do you need before you trust it?',
    o: [
      "The same summary from a second agent.",
      "Every `expect` traced to a spec line, repeated green runs with retries off, no `fixme` or `skip`, and a diff that matches the summary.",
      "A screenshot of the green HTML report.",
      "The number of tests, compared with the number of scenarios in the plan.",
    ],
    a: 1,
    why: "A pass only proves the current assertions held. You check where the assertions came from, whether they hold every time, and whether anything was skipped.",
    not: "A and C repeat the claim instead of checking it. D counts tests but says nothing about what they check.",
  },
];

export const t1Certificate = {
  findings: [
    "Caught FD-06: an empty checkout form places the order.",
    "Caught FD-09: the agent expected a $1.59 discount; the spec says $1.30.",
  ],
};
