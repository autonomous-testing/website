// Prompt sent with a visitor's own app URL. Same shape as the demo prompts
// (what to test, how, what to verify) so people and the agent read it the same way.
export const OWN_APP_PROMPT = `Test the basics.
Open the page and look at what a visitor can do there.
Pick the 3 most important things and test them.
Verify that each one works and no error appears.`;

// Instructions after the URL or demo changes. Text the visitor wrote stays;
// an empty box or a prompt we filled in (a demo's or OWN_APP_PROMPT) is
// replaced, so a demo's steps and credentials never go out with another app.
export function nextInstructions(
  current: string,
  generatedPrompts: readonly string[],
  next: string,
): string {
  const untouched =
    current.trim() === "" || generatedPrompts.includes(current);
  return untouched ? next : current;
}
