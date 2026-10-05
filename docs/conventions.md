# Conventions: commits, pull requests, documentation

🇵🇱 [Wersja polska](pl/conventions.md)

The rules every Digital Vantage repository follows, interns' projects
included. They exist for one reader: **the person who opens this code in six
months**. That person has no context, no memory of the conversation, and
probably no way to ask you. Often it is you.

## 1. Commits

**One commit = one logical change.** Everything below follows from that.

### Size

- **Revertable on its own:** `git revert <sha>` must not take three unrelated
  things with it. If you have to split the change in your head before
  reverting, it should have been two commits.
- **Readable in five minutes:** a reviewer reads the diff top to bottom
  without scrolling back and holding two contexts at once.
- **Usually 50–300 lines**, as a guide, not a rule. Renaming one thing in 30
  files is a fine large commit. A new feature is usually several small ones
  (types → logic → tests → wiring).
- **Five small commits are better than one big one:** easier to review, to
  bisect and to cherry-pick.

### What goes together, what goes apart

| Together, in one commit                       | Apart, in separate commits                                       |
| --------------------------------------------- | ---------------------------------------------------------------- |
| the code + its tests + updated types and docs | a refactor and a feature, **always**                             |
| a database migration + the code that needs it | formatting a whole file, and a change in it                      |
| a `feat` / `fix` + its `CHANGELOG.md` line    | a dependency upgrade (one package per commit for major versions) |

The order is **refactor → feature → fix**. If a refactor reveals a bug, commit
the refactor first with no change in behaviour, then the fix.

### The message: Conventional Commits

```text
<type>(<scope>): short description in the imperative, at most ~72 characters

The body explains WHY, not what. What you changed is in the diff; the
reason you changed it is nowhere else. Wrap at ~72 characters. If the
decision was not obvious, name the alternative you rejected and why.
```

| Type          | For                                                  |
| ------------- | ---------------------------------------------------- |
| `feat`        | new behaviour for the user                           |
| `fix`         | a bug                                                |
| `refactor`    | same behaviour, better code                          |
| `perf`        | faster or lighter, same behaviour                    |
| `test`        | tests only (adding missing ones, fixing a flaky one) |
| `docs`        | documentation only                                   |
| `chore`       | tooling, configuration, dependencies                 |
| `style`       | formatting only                                      |
| `build`, `ci` | the build, the CI pipeline                           |

- **Imperative mood:** "add", "fix", "remove", not "added" or "adds". Read it
  as "this commit will …".
- **One scope:** `feat(export): …`. A subject with "and" in it is two commits.
- **No full stop** at the end of the subject.
- **In English.**

Good and bad:

```text
✅ fix(report): count 7,5 hours as 7.5, not as 7

   Polish keyboards type a decimal comma, and parseFloat stops at it,
   so every half hour reported that way was lost.

❌ fixed stuff
❌ WIP
❌ feat: add export and fix hours and update readme
```

### Never in a commit

- `WIP`, `fix`, `stuff`, `update` as the whole message. Fine while you work;
  clean them up before merge (`git rebase -i` on your branch).
- **Commented-out code** "for later". Git remembers it for you.
- **Unused imports and variables** left over from an earlier attempt.
- **`.env` files, keys, tokens, database dumps.**
- **A whole-file reformat mixed with a real change.** The reviewer cannot see
  the change.

### Every commit leaves the project working

Lint, types, tests (and ideally the build) pass on **every** commit, not only
on the last one. `git bisect` depends on it. The pre-commit hook checks most of
this for you.

## 2. Pull requests

- **One issue, one pull request.** Link it with `Closes #12`.
- **The title is a commit subject** (Conventional Commits), because it often
  becomes one when squash-merged.
- **The description answers three questions:** what changes for the user, why,
  and how you checked it. The template asks exactly that.
- **Small:** a pull request a reviewer cannot read in one sitting is too big.
  Split it.
- **Answer every review comment,** with a change or with a reason. Push fixes
  as new commits during review, so the reviewer sees what changed. Do not
  resolve threads you did not open.

## 3. CHANGELOG

- Every `feat`, `fix`, `perf` and `refactor` adds a line under
  `## [Unreleased]` in **the same pull request**, not "later".
- Group by `### Added`, `### Fixed`, `### Changed`, `### Docs`.
- Write for a user of the app, not for a developer: "Hours typed with a comma
  are counted correctly", not "Fix parseFloat in validate.ts".
- Version numbers are added at release time, never by hand in a pull request.

## 4. Documentation

### Where things are written

| What                                                  | Where                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------- |
| How to run, test and use the project                  | `README.md`                                                   |
| How it is built and **why** (architecture, decisions) | `docs/architecture.md` or a focused `docs/<topic>.md`         |
| Why one piece of code looks the way it does           | a comment next to it                                          |
| What a function does and how to call it               | a JSDoc comment on the exported function                      |
| Why a change was made                                 | the commit message body and the pull request description      |
| What changed for users                                | `CHANGELOG.md`                                                |
| What is left to do                                    | GitHub issues, never a `TODO` comment without an issue number |

### Rules

- **Docs change in the same pull request as the code.** A README that
  describes last month's commands is worse than none: people trust it.
- **Both languages.** Intern-facing docs exist in English (`docs/*.md`) and Polish
  (`docs/pl/*.md`). Change one, change the other in the same pull request.
- **Edit before you create.** Add a section to an existing document before
  adding a new file. Ten short files nobody can find help nobody.
- **The first sentence is the answer.** "Reports are saved in SQLite, one per
  person per day", not "This document describes the storage layer".
- **Concrete over vague:** commands you can copy, real values with units,
  file paths. "Run `pnpm db:migrate`", not "run the migrations".
- **Decisions get their reason.** "We use X" is half a sentence; "We use X
  because Y, and not Z because W" is the half the next person needs.
- **English, plain words, short sentences.** No marketing tone.

### Comments in code

Comments say **why**, because the code already says what.

```ts
// ❌ increment the counter
count++

// ✅ Discord retries an interaction it got no answer to within 3 s, so the
//    same report can arrive twice — the unique index makes the second a no-op.
await repository.upsert(report)
```

- Write a comment where a reader would otherwise stop and ask "why is it like
  this?": a workaround, a limit of an external API, a non-obvious rule.
- No comment that repeats the code, no commented-out code, no `// TODO`
  without an issue number (`// TODO(#42): …`).
- Exported functions get a short JSDoc: what it returns, and anything
  surprising about its arguments.
- Name things for what they **are**, not where they are used:
  `formatHours`, not `exportPageHelper`.

## 5. Code design, in five lines

- **Keep it simple:** the simplest version that works wins. Readability beats
  cleverness.
- **Don't repeat yourself, but not too early:** two similar pieces are a
  coincidence, the third is a reason to extract.
- **You aren't gonna need it:** no options, props or code "for later".
- **One job per function and per component.** Split data fetching, validation
  and rendering.
- **Leave it a little cleaner than you found it,** without touching unrelated
  code in the same commit.
