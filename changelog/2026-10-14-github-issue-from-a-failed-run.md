---
slug: github-issue-from-a-failed-run
title: "File a GitHub issue from a failed run"
description: "A failed run in a project with a linked repository offers Create GitHub issue, filled with the failing step, expected and actual result and the screenshot."
---

A failed run in a project with a linked GitHub repository now offers Create GitHub issue in the run menu. Add a title, optional notes and labels, and Wopee.io writes the rest: the failing step, what was expected and what happened, the screenshot and a link back to the run.

{/* changelog-clip:start */}
<figure className="changelog-clip">
  <img src="/img/changelog/github-issue-from-a-failed-run.gif" alt="A failed Wopee.io run becomes a GitHub issue: the Create GitHub issue dialog, the confirmation, and the filed issue with the bug label" width="960" height="295" decoding="async" />
  <figcaption>{"Create GitHub issue on a failed run, then open the filed issue with the failing step and the bug label."}</figcaption>
</figure>
{/* changelog-clip:end */}

When the issue is created you get its link straight away. If something could not be included, or the repository refused the issue, the dialog says what to fix.
