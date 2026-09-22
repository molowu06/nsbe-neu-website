# Branch Protection Setup

This is a one-time setup, done by a repo admin in the GitHub web UI. The files in
`.github/` (CI workflow, CODEOWNERS, PR template) live in the repo, but **the rule
that actually blocks a merge does not** — it is a repo setting. Until an admin
turns it on, CI will run and report results, and anyone can merge to `main`
anyway.

`main` deploys straight to the live site through Vercel, so an unreviewed merge is
a live incident.

## What we are enforcing

1. Nobody commits directly to `main`. All work goes through a pull request.
2. CI (lint, type check, build) must pass on the PR.
3. A project lead must approve the PR after CI passes.
4. Only then does the merge button turn green.

## Steps

Go to **Settings → Rules → Rulesets → New ruleset → New branch ruleset**.

Rulesets are the current version of this feature; the older "Branches → Add
branch protection rule" page does the same thing if you see that instead.

### 1. Name and target

- **Ruleset Name**: `protect main`
- **Enforcement status**: `Active`
- **Target branches** → **Add target** → **Include default branch**

### 2. Bypass list

Leave this **empty**.

It is tempting to add yourself so you can push a quick fix. Don't — that is the
exact path that puts an unreviewed change on the live site at 2am. If you truly
need to bypass, you can temporarily set the ruleset to `Disabled`, which is at
least visible in the audit log.

### 3. Rules to check

- [x] **Restrict deletions**
- [x] **Block force pushes**
- [x] **Require a pull request before merging**
  - **Required approvals**: `1`
  - [x] **Dismiss stale pull request approvals when new commits are pushed** —
        so an approval doesn't carry over to code nobody looked at.
  - [x] **Require review from Code Owners** — this is what pulls in
        `.github/CODEOWNERS` and forces the approval to come from a lead, not
        just any teammate.
  - [x] **Require conversation resolution before merging** — review comments
        have to actually be addressed, not ignored.
- [x] **Require status checks to pass**
  - [x] **Require branches to be up to date before merging**
  - **Add checks** — add these three by name:
    - `Lint`
    - `Type check`
    - `Build`

### 4. Save

Click **Create**.

## Important: the status checks won't be findable until CI has run once

GitHub's "Add checks" search only suggests check names it has seen before. If the
CI workflow has never run on this repo, the three checks won't autocomplete.

Fix: open one throwaway PR first, let CI run, then come back and add the checks.
They will be there.

## Repository secrets

The `Build` job reads the app's `NEXT_PUBLIC_*` values from repo secrets. These
are all public-by-design values that ship to the browser anyway, but CI should
build with the same ones Vercel uses.

Go to **Settings → Secrets and variables → Actions → New repository secret** and
add each of these with the value from `frontend/.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY`
- `NEXT_PUBLIC_GOOGLE_CALENDAR_ID`
- `NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY`
- `NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID`

If a secret is missing, the workflow falls back to a placeholder value so the
build still runs. That keeps fork PRs working, since GitHub does not hand secrets
to workflows triggered from a fork.

## Suggested general settings

Under **Settings → General → Pull Requests**:

- [x] **Allow squash merging** — and uncheck merge commits and rebase merging.
      One commit per PR keeps `main`'s history readable and makes a revert a
      single click, which matters when `main` is what's live.
- [x] **Automatically delete head branches** — cleans up merged branches.

## Verifying it works

1. Branch off `main`, make a trivial change, push, open a PR.
2. The three checks appear on the PR and run.
3. Hawa and Mimo are auto-requested as reviewers (from CODEOWNERS).
4. The merge button is grey and says review is required.
5. After a lead approves and the checks are green, it turns green.

If step 4 doesn't happen, the ruleset isn't active or isn't targeting `main`.
