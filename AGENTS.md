# AGENTS.md

## Deployment workflow

We maintain three repositories with a linear promotion flow:

- **website**: main development repository; deployed to **website.wopee.io** for testing purposes **(should not be indexed)**.
- **website-prod**: fork of `website`, kept in sync and deployed to **wopee.io**.
- **website-testing**: fork of `website`, used for testing after development, before production; deployed for testing purposes **(should not be indexed)**.

### How we work

1. Develop on a new branch in `website`.
2. Test locally on that branch.
3. If OK, sync to `website-testing` branch and test further.
4. If OK, sync to `website-prod` branch and test further.

If a change does not require thorough testing, sync/deploy to both forks at once.
