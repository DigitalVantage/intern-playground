# Your first pull request, step by step

In this exercise you add your name to the list on the home page. The change
itself is three lines. The point is everything around it: an issue, a branch,
a test, a commit, a pull request, a review. That is how every change at
Digital Vantage is made, from a typo to a new feature.

Plan for about **2–3 hours** the first time. Each step says what you should
see. If you see something else, stop and look at the _If it goes wrong_ box
under that step. If it is not there, ask on Discord.

**Before you start:** sections 1–6 of [machine-setup.md](machine-setup.md) are
done (`node -v` shows `v24`, `ssh -T git@github.com` greets you by name).

---

## Step 1. Open an issue for your task

Every piece of work starts with an issue. It is the task description, and the
place where people talk about the task.

1. Go to the repository on GitHub → the **Issues** tab → green **New issue**
   button → choose **Task**.
2. Title: `Add <your first name> to the interns list`.
3. _Goal:_ `My name is on the home page.` _Done when:_ `The page lists me and
the tests pass.`
4. Click **Create**. In the right sidebar: **Assignees** → _assign yourself_.

✅ You see your issue with a number, for example **#31**. Remember it.

## Step 2. Get the code

In the **Ubuntu terminal** (not PowerShell):

```bash
cd ~/projects
git clone git@github.com:DigitalVantage/intern-playground.git
cd intern-playground
nvm use
corepack enable
pnpm install
cp .env.example .env.local
```

✅ `pnpm install` ends with `Done in …`. You did this already in the onboarding
checklist? Then only update: `git switch main && git pull`.

> **If it goes wrong**
>
> - `Permission denied (publickey)`: your SSH key is not on GitHub
>   ([machine-setup.md §6](machine-setup.md#6-connect-git-to-github)).
> - `nvm: command not found`: close and reopen the terminal, or install nvm
>   again.

## Step 3. Look at it running

```bash
pnpm dev
```

✅ The terminal shows `Local: http://localhost:3000`. Open it in your browser:
you see **Intern playground** and a list with one person on it.

Leave this terminal running. Open a **second** terminal tab for the next steps
(`Ctrl+Shift+T` in Windows Terminal, or `` Ctrl+` `` in VS Code).

## Step 4. Create your branch

You never work on `main` directly. You create your own branch, a copy of the
code where your change lives until it is reviewed.

```bash
git switch -c feat/add-<your-github-username>
# for example: git switch -c feat/add-anna-kowalska
```

✅ `Switched to a new branch 'feat/add-anna-kowalska'`. Check any time with
`git status`: the first line says which branch you are on.

## Step 5. Open the project in VS Code

```bash
code .
```

✅ Bottom-left corner: `WSL: Ubuntu-24.04`. On the left you see the files.

Open `src/data/interns.ts` (`Ctrl+P`, type `interns`, press Enter). It looks
like this:

```ts
export const interns: Intern[] = [
  {
    name: 'Konrad Barejko',
    github: 'kbarejko',
    goal: 'Help every intern ship a first pull request in their first week.',
  },
]
```

Each `{ … }` block is one person. The page builds the list from this array.
You do not touch the page at all.

## Step 6. Break the test on purpose

Before you add yourself correctly, see what a failing test looks like, so you
recognise it later.

1. Add yourself **at the very top** of the list, even if your name does not
   come first alphabetically. For example, if your name starts with "Z", put it
   before "Konrad":

   ```ts
   export const interns: Intern[] = [
     {
       name: 'Zofia',
       github: 'zofia-dev',
       goal: 'Learn how a real team reviews code.',
     },
     {
       name: 'Konrad Barejko',
       // … the rest stays as it was
   ```

   - `name`: what the world will see. **The site is public**, so your first
     name or a nickname is enough.
   - `github`: your GitHub username, **without** the `@`.
   - `goal`: one sentence, what you want to learn here.

2. Run the tests:

   ```bash
   pnpm test --run
   ```

✅ You see a red ❌ and `the interns list > is sorted by name`. The test checks
that the list is in alphabetical order, and yours is not.

(If your name does come before "Konrad", put yourself **after** him instead,
to make the test fail.)

## Step 7. Fix it

Move your block to its correct alphabetical place, then run the tests again:

```bash
pnpm test --run
```

✅ All green: `Tests  5 passed (5)`. Look at the browser too: the page has
already reloaded and shows your name.

## Step 8. Write it in the CHANGELOG

Open `CHANGELOG.md`. Under `## [Unreleased]` → `### Added`, add one line at
the top of the list:

```md
- Interns list: add Zofia.
```

The CHANGELOG is for people using the app, so describe what changed for them,
not which file you edited.

## Step 9. Commit

First look at what you changed, then stage it piece by piece:

```bash
git status          # two files changed: src/data/interns.ts and CHANGELOG.md
git add -p          # shows every change; press y to take it, n to skip it
git commit
```

`git commit` opens an editor. Write:

```text
feat(interns): add Zofia

First pull request of my internship.
```

Save and close the editor. In the terminal editor `nano`: `Ctrl+O`, Enter,
`Ctrl+X`.

✅ The pre-commit hook runs (ESLint, Prettier, TypeScript) and ends with your
commit: `[feat/add-zofia-dev 1a2b3c4] feat(interns): add Zofia`.

> **If it goes wrong**
>
> - The hook prints errors and the commit is not made: read the first error,
>   fix it, `git add -p` again, `git commit` again.
> - `Please tell me who you are`: your Git name or email is not set
>   ([machine-setup.md §4](machine-setup.md)).
> - `push declined due to email privacy restrictions` (in the next step):
>   your Git email is your real one. Set the noreply one and run
>   `git commit --amend --reset-author --no-edit`.

## Step 10. Push and open the pull request

```bash
git push -u origin HEAD
```

✅ The output contains a link: `Create a pull request for 'feat/add-…' on
GitHub by visiting: https://github.com/…`. Open it, or go to the repository
and click the yellow **Compare & pull request** banner.

On the pull request page:

1. **Title:** the same as your commit, `feat(interns): add Zofia`.
2. **Description:** the template is already there. Fill in _What_ and _Why_ in
   a sentence each, write `Closes #31` (your issue number from step 1) and tick
   the checklist boxes you have done.
3. Right sidebar: **Reviewers** → your teammate. **Assignees** → yourself.
4. **Create pull request**.

✅ A few seconds later the **Checks** start. After about a minute you see a
green ✔ next to _Lint, typecheck, test, build_.

## Step 11. Review, and answer it

Your teammate and your mentor will leave comments. That is normal. Every
pull request at Digital Vantage gets some.

- Answer **every** comment: fix it, or explain why not.
- Fix on the same branch: change the file, `git add -p`, `git commit`
  (`fix: …` or a short description), `git push`. The pull request updates
  itself.
- When everything is answered, click **Re-request review** (the circular arrow
  next to the reviewer's name).

At the same time, **review your teammate's pull request**:
[github-guide.md §5](github-guide.md#5-reviewing-your-teammates-pull-request).

## Step 12. If your teammate's pull request is merged first

Both of you edited the same list, so Git cannot combine the two changes on its
own. That is a **merge conflict**, and resolving one is part of the exercise.

```bash
git fetch
git rebase origin/main
```

✅ Git stops and says `CONFLICT (content): Merge conflict in
src/data/interns.ts`. Open the file. You see markers like:

```text
<<<<<<< HEAD
  { name: 'Anna', … },        ← what is already on main (your teammate)
=======
  { name: 'Zofia', … },       ← your change
>>>>>>> feat(interns): add Zofia
```

Keep **both** people, in alphabetical order, and delete the three marker lines
(`<<<<<<<`, `=======`, `>>>>>>>`). VS Code also shows _Accept Both Changes_
above the conflict. Then:

```bash
pnpm test --run                  # still sorted?
git add src/data/interns.ts
git rebase --continue            # the editor opens with your message: save and close
git push --force-with-lease      # only ever on your own branch
```

✅ The pull request shows your commit on top of the new `main`, and the checks
run again.

## Step 13. Merged

When the pull request has an approval and green checks, your mentor merges it.
The issue closes by itself (that is what `Closes #31` did), and your name is on
the home page.

Clean up locally:

```bash
git switch main
git pull
git branch -d feat/add-zofia-dev
```

Tick section 3 in your onboarding issue. **Done: you have just done what you
will do a hundred more times.**
