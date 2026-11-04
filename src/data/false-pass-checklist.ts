// Source: the "No proof, no pass" campaign's checklist. Change the wording there first.

export const CHECKLIST_TITLE = "The False Pass Checklist";

export const CHECKLIST_LEAD =
  "Seven questions to ask any AI testing tool before you trust its green.";

export const CHECKLIST_SUBTITLE =
  "A false pass is a test that reports PASSED without proving it. These seven questions tell you whether your AI tester can produce one, and whether you would notice.";

export const CHECKLIST_CLOSING =
  "If a tool can't answer 2, 3 and 5, its green is a claim, not a result.";

export type ChecklistItem = {
  n: number;
  question: string;
  why: string;
  answer: string;
};

export const CHECKLIST: ChecklistItem[] = [
  {
    n: 1,
    question:
      "When the agent says PASSED, what did it record as evidence for each check?",
    why: "A pass with no record is an opinion.",
    answer: "Every run keeps the agent's steps, checks and screenshots.",
  },
  {
    n: 2,
    question:
      "Does anything check the pass against that record, or only the agent's own account of it?",
    why: "An agent can describe a check it never ran.",
    answer:
      "Integrity gates compare the reported pass with what the run actually recorded.",
  },
  {
    n: 3,
    question: "What happens to a pass the record doesn't back up?",
    why: "If it stays green, the dashboard is lying.",
    answer: "In Enforce, an unproven pass becomes Incomplete.",
  },
  {
    n: 4,
    question:
      'Is "unproven" a state of its own, separate from passed and failed?',
    why: "Unproven is not broken: it needs a better check, not a bug ticket.",
    answer: "Yes: Incomplete (amber), with the reason in the report.",
  },
  {
    n: 5,
    question:
      "Can you try the stricter verdict on your own runs before it changes any result?",
    why: "Teams adopt what they can trial without risk.",
    answer:
      "Report only, on by default: it flags disagreements and never changes a stored result until you switch on Enforce.",
  },
  {
    n: 6,
    question:
      "Can a product owner trace a green result to its evidence in one click?",
    why: "Trust has to reach people who don't read logs.",
    answer:
      "The run report shows the Verdict Integrity section with each gate's finding.",
  },
  {
    n: 7,
    question: "Does the vendor say where the tool is still weak?",
    why: "Honest limits are a sign the rest is true.",
    answer: "Yes: one switch per project today, per-check switches in design.",
  },
];
