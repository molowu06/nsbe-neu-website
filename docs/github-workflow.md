# GitHub Workflow

`main` is deployed to the live site by Vercel. Anything merged into `main` is
public within a couple of minutes, so nothing lands there without automated
checks passing and a lead's approval. See
[branch-protection.md](branch-protection.md) for how that is enforced.

## Pull Latest Changes

```bash
git checkout main
git pull origin main
```

## Create Branch

Always branch off an up-to-date `main`. Never commit to `main` directly.

```bash
git checkout -b feature/example
```

## Commit

Use descriptive commit messages.

Good:

```
Added attendance dashboard
```

Bad:

```
changes
```

## Run the checks before you push

CI runs these three on every PR. Running them locally first is faster than
waiting on a red build.

```bash
cd frontend
npm run lint        # Lint
npm run typecheck   # Type check
npm run build       # Build
```

## Push

```bash
git push origin feature/example
```

## Open a Pull Request

Fill in the PR template — it asks for the ticket, what changed, how you tested,
and screenshots for UI work. A reviewer who has to guess at any of those will
just send it back.

Keep the PR to the ticket. Unrelated refactors, formatting sweeps, and
"while I was in there" changes make review slow and are a common reason for a
request for changes.

## What happens next

1. **CI runs.** Three checks — `Lint`, `Type check`, `Build` — appear on the PR.
   If one fails, click it, read the log, push a fix. The merge button stays
   blocked until all three are green.

2. **A lead reviews.** Mimo and Hawa are requested automatically via
   `.github/CODEOWNERS`. One of them has to approve. They are checking that the
   ticket was actually done, that nothing else broke, and that the change
   doesn't do more than it needed to.

3. **Address the feedback.** Push more commits to the same branch — the PR
   updates itself and CI re-runs. Any new commit dismisses the previous
   approval, so it needs a fresh look. Review threads have to be resolved before
   the merge unblocks.

4. **Merge.** Once checks pass and a lead has approved, squash and merge. The
   branch is deleted automatically, and Vercel deploys `main`.

## Pull Request Checklist

- Ran lint, type check, and build locally
- Tested the change in the browser
- No console errors
- Screenshots attached for anything visual
- No `.env` values or API keys in the diff
- Documentation updated
