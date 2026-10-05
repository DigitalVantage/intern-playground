# Intern playground

🇵🇱 **[Wersja polska](README.pl.md)**: praktykanci, zacznijcie od niej.

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
nobody else can reproduce. Setting up from scratch? Follow
**[docs/machine-setup.md](docs/machine-setup.md)** step by step. Below is the
short version.

| Tool    | Version          | Notes                                                                                     |
| ------- | ---------------- | ----------------------------------------------------------------------------------------- |
| Windows | 11 with WSL2     | Ubuntu 24.04 LTS. Keep the repo in `~/projects`, **never** under `/mnt/c`                 |
| Node.js | 24 LTS           | Install with [nvm](https://github.com/nvm-sh/nvm), never `apt`. `.nvmrc` pins it          |
| pnpm    | 12.9.1           | `corepack enable`, which reads the version from `package.json`. Never `npm i -g pnpm`     |
| Git     | 2.43 or newer    | `sudo apt install git`                                                                    |
| VS Code | latest           | In Windows, connected to WSL: [how to set it up](docs/machine-setup.md#5-vs-code)         |
| GitHub  | account with 2FA | [How to create it](docs/machine-setup.md#2-a-github-account): 2FA, private email, SSH key |

VS Code suggests the recommended extensions (ESLint, Prettier, Tailwind, WSL…)
the first time you open the folder. Accept them.

One-time Git setup. Use your private GitHub email
([how to get it](docs/machine-setup.md#2-a-github-account)), because commits in
a public repository show the author's address:

```bash
git config --global user.name "Your Name"
git config --global user.email "12345678+your-username@users.noreply.github.com"
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
cp .env.example .env.local
pnpm dev           # http://localhost:3000
```

The app needs no database. It also starts without `.env.local`, but create it
anyway, because every real project needs one.

## Environment variables (`.env`)

Settings that differ between machines, and every secret, live in environment
variables, never in the code. Next.js loads them from files in the project root:

| File           | Committed? | What it holds                                                      |
| -------------- | ---------- | ------------------------------------------------------------------ |
| `.env.example` | yes        | the list of variables, with comments and safe defaults. No secrets |
| `.env.local`   | **never**  | your values on your machine. `.gitignore` keeps it out of Git      |

Rules:

- **Add a variable in two places:** your `.env.local` and `.env.example` (name,
  comment, safe default or empty value), in the same pull request. Otherwise
  the next person does not know it exists.
- **`NEXT_PUBLIC_` means public.** Next.js builds these values into the
  JavaScript sent to the browser, so anyone can read them. Secrets (API keys,
  passwords, tokens) get a name **without** the prefix and are read only on the
  server.
- **Restart `pnpm dev` after changing a `.env` file.** Values are read once, at
  startup.
- **Secrets come from your mentor,** through a password manager or another
  private channel. Never paste a secret into an issue, a pull request, a commit
  or a chat.
- CI does not read `.env` files. Values it needs are stored as GitHub Actions
  secrets by a maintainer.
- **Leaked a secret** (pushed, pasted, screenshotted)? Tell your mentor
  immediately. The key has to be revoked and replaced, because deleting the
  commit does not make it secret again.

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

Every change, however small, goes through the same steps. The full rules for
commits, pull requests, the CHANGELOG, documentation and code comments are in
**[docs/conventions.md](docs/conventions.md)**. Read it before your first pull
request.
How to do each step in Git and on GitHub (taking an issue, rebasing,
reviewing, where things are) is in **[docs/github-guide.md](docs/github-guide.md)**.
New to React or Next.js? Free video courses, in the order we recommend them:
**[docs/learning.md](docs/learning.md)**.

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

On your first day, open your own checklist: **Issues → New issue →
Onboarding**, then assign it to yourself. It lists everything below, in order.
Each of you has a separate one, so you both do the same steps and see your own
progress.

**Follow [docs/first-pull-request.md](docs/first-pull-request.md)**: every
command, what you should see after it, and what to do when you see something
else. In short:

1. Open an issue (_Task_) and assign it to yourself.
2. Create a branch `feat/add-<your-github-username>`.
3. Add yourself to `src/data/interns.ts`, first in the wrong place to see the
   test fail, then sorted by name. The site is public, so your first name or a
   nickname is fine.
4. A line in `CHANGELOG.md`, a commit `feat(interns): add <name>`, a push and
   a pull request.
5. Review your teammate's pull request, answer your own review, and resolve
   the merge conflict if their change lands first.

## Working hours and the daily log

- **Daily meeting at 12:00** on Google Meet (sometimes moved a little later).
  Questions and code review happen then.
- **Work during the day:** somewhere between 9:00 and 19:00, Monday to
  Friday. Start a bit earlier or finish a bit later if you need to, but
  **never at night**. Nobody can help you at night, and the tasks wait for each
  other's reviews anyway.
- **One task done well beats five done fast.** The point is to understand what
  you do.
- **Every day, at the end of your work, write a short entry in your daily log**
  (an issue in `discord-daily-report`, pinned at the top of its Issues list):
  what you did, how many hours, what was hard, the plan for tomorrow. The
  internship diary for your school is made from these entries.
- **School classes on some days?** Say so on Discord in advance.

## Communication

| Where                                                                                            | What goes there                                                     |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [Discord, interns channel](https://discord.com/channels/1499084674830565407/1556578325495808030) | questions, being stuck, "can someone look at my PR?", day-to-day    |
| GitHub issue                                                                                     | a task or a bug: anything someone has to do                         |
| Pull request comments                                                                            | anything about a specific change, so the answer stays with the code |

How to join Discord: [docs/machine-setup.md](docs/machine-setup.md#3-discord).
The invite link comes from your mentor and is never posted here.

- **Stuck for more than 30 minutes? Ask on Discord.** Say what you tried and
  paste the exact error inside a code block (three backticks), not a
  paraphrase or a screenshot of text.
- **Reply in a thread** under the question, so the channel stays readable.
- **A decision made on Discord goes to GitHub.** If a conversation changes a
  task, write the outcome in the issue or pull request. Chat history is not
  documentation.
- **Link, don't describe:** paste the URL of the issue, pull request or line of
  code you mean.
- **No secrets on Discord either:** no passwords, tokens or `.env` contents,
  not even in a direct message.

## License

[MIT](LICENSE) © Digital Vantage
