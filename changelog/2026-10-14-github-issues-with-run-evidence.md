---
slug: github-issues-with-run-evidence
title: "File a failed test as a GitHub issue"
description: "Commander and wopee-mcp file a failed run into your linked GitHub repository, with the failing step, expected vs actual, the screenshot and a link to the report."
---

A failed run can now go straight into your team's backlog. In Commander, open the run and choose **Create GitHub issue**. From your editor, ask your AI coding agent to file the failure, and `wopee_create_github_issue` does the same through [wopee-mcp](/mcp/).

The issue lands in the repository linked to your project. Below your own notes it carries the step the run failed on, the expected and actual values, the failing step's screenshot and a link back to the run in Commander. The Wopee.io GitHub App creates the issue and names the person who filed it. The app needs the Issues permission on the repository, and the Contents permission to attach the screenshot, which it keeps on a separate `wopee-issue-assets` branch.
