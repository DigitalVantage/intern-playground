# Intern playground

A small Next.js app where Digital Vantage interns learn how the team works, from
setting up the machine to getting a pull request reviewed and merged. Nothing
here goes to a client, so break things freely. The **process** is the same one
used on real projects.

Your first goal: **add yourself to the list on the home page in one pull
request** (see [Your first pull request](#your-first-pull-request)).

## Ground rules: this repository is public

Everything you push is visible to anyone on the internet, permanently. That
includes branches that are deleted later and commits that are rewritten.

- **Never commit secrets:** API keys, passwords, tokens, `.env` files. GitHub
  push protection blocks the known formats, but it does not catch everything.
- **Never commit client data:** names, emails or phone numbers of real people,
  or screenshots of client systems or of our CMS.
- **Write in English:** code, comments, commit messages, pull requests and
  issues.
- If you push something you should not have, tell your mentor straight away.
  Do not try to hide it with a force push, because the commit stays reachable
  on GitHub.

## What you need

The Digital Vantage standard. Same versions for everyone, or you get bugs that
nobody else can reproduce.

| Tool    | Version          | Notes                                                                                 |
| ------- | ---------------- | ------------------------------------------------------------------------------------- |
| Windows | 11 with WSL2     | Ubuntu 24.04 LTS. Keep the repo in `~/projects`, **never** under `/mnt/c`             |
| Node.js | 24 LTS           | Install with [nvm](https://github.com/nvm-sh/nvm), never `apt`. `.nvmrc` pins it      |
| pnpm    | 12.9.1           | `corepack enable`, which reads the version from `package.json`. Never `npm i -g pnpm` |
| Git     | 2.43 or newer    | `sudo apt install git`                                                                |
| VS Code | latest           | Open the project from the WSL terminal with `code .`                                  |
| GitHub  | account with 2FA | SSH key `ed25519`, plus `gh` (GitHub CLI) is handy                                    |

VS Code suggests the recommended extensions (ESLint, Prettier, Tailwind, WSL…)
the first time you open the folder. Accept them.

One-time Git setup:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global pull.ff only
git config --global core.autocrlf input
```

## Getting started

```bash
git clone git@github.com:DigitalVantage/intern-playground.git
cd intern-playground
nvm use            # Node from .nvmrc
corepack enable    # pnpm from package.json
pnpm install       # also installs the Git hooks
pnpm dev           # http://localhost:3000
```

The app needs no database and no `.env`.

## Commands

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `pnpm dev`          | Dev server with hot reload on http://localhost:3000 |
| `pnpm build`        | Production build: the last thing CI runs            |
| `pnpm start`        | Serve the production build                          |
| `pnpm lint`         | ESLint                                              |
| `pnpm typecheck`    | TypeScript, no output files                         |
| `pnpm test`         | Vitest in watch mode, re-runs as you save           |
| `pnpm test --run`   | Vitest once, the way CI runs it                     |
| `pnpm format`       | Prettier rewrites every file                        |
| `pnpm format:check` | Prettier only reports, the way CI runs it           |

## Where things are

```text
src/
  app/            pages (Next.js App Router): page.tsx is the home page
  data/           the interns list (src/data/interns.ts)
  lib/            plain functions and their tests (*.test.ts next to the code)
.github/          CI workflow, pull request and issue templates, code owners
CHANGELOG.md      what changed, written by whoever changed it
```

## How we work

Every change, however small, goes through the same steps.

1. **Start from an issue.** Pick one, or open one with the _Task_ template.
   Comment on it so nobody else picks it too.
2. **Branch from fresh `main`.**
   ```bash
   git switch main && git pull
   git switch -c feat/short-description
   ```
   Prefixes: `feat/` new behaviour · `fix/` a bug · `docs/` documentation only
   · `refactor/` same behaviour, better code · `chore/` tooling.
3. **Commit small, logical steps** using
   [Conventional Commits](https://www.conventionalcommits.org/):
   ```text
   feat(home): show each intern's goal under their name

   The list only had names, which says nothing about why people are here.
   ```
   - Subject: imperative mood ("add", not "added"), at most ~72 characters, no
     full stop.
   - Body: _why_ you made the change. The diff already shows _what_.
   - One commit = one change. "Add X and fix Y" is two commits.
4. **Add a line to `CHANGELOG.md`** under `[Unreleased]` for every `feat` or
   `fix`, in the same pull request.
5. **Push and open a pull request** into `main`. Fill in the template and link
   the issue with `Closes #12`.
6. **CI must be green.** It runs format check, lint, typecheck, tests and build.
   A red check is yours to fix. Click _Details_ to see the error.
7. **Review.** A maintainer reviews every pull request (`CODEOWNERS`). Answer
   each comment, either with a change or with a reason, and push fixes as new
   commits. Do not resolve threads you did not open.
8. **Merge.** Once approved and green, the pull request is merged and the
   branch is deleted automatically.

### Git hooks: they run on your machine

`pnpm install` installs them. They catch problems before CI does:

- **pre-commit:** ESLint and Prettier on the files you staged, then TypeScript.
- **pre-push:** the full test suite.

When a hook fails, fix the problem. Do not skip the hook with `--no-verify`.

### What `main` does not allow

The branch rules on `main` make these impossible, so do not waste time trying:

- pushing to `main` directly. Every change goes through a pull request;
- merging without an approving review from a code owner, or with a red CI;
- merging while review threads are unresolved, or with commits pushed after
  the approval;
- force-pushing to `main` or deleting it.

On **your own branch** you may rebase and force-push (`git push
--force-with-lease`) until the review starts. After that, add new commits so the
reviewer can see what changed.

## Your first pull request

1. Open an issue with the _Task_ template: "Add <your name> to the interns
   list".
2. Create a branch `feat/add-<your-github-username>`.
3. Add yourself to `src/data/interns.ts`. **Keep the list sorted by name.**
   The tests check it, so try putting yourself in the wrong place and run
   `pnpm test --run` to see the failure.
4. Check the home page with `pnpm dev`.
5. Add a line to `CHANGELOG.md` under `[Unreleased]`, for example
   `- Interns list: add Anna Kowalska.`
6. Commit (`feat(interns): add Anna Kowalska`), push and open the pull request.
7. Respond to the review until it is merged. Your name is then on the home page.

## Getting help

- Stuck for more than 30 minutes? Ask. Say what you tried and paste the exact
  error message, not a paraphrase.
- Questions about a specific change go in the pull request, where everyone can
  learn from the answer.

## License

[MIT](LICENSE) © Digital Vantage
