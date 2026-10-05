# Setting up your machine

This is the Digital Vantage standard work environment: Windows 11 with WSL2
(Ubuntu 24.04), Node 24, pnpm through corepack, Git and VS Code connected to
WSL. Starting from a clean computer, it takes about an hour. After that this
repository, and our client projects, run the same way on your machine as on
everyone else's.

macOS and native Linux are fine too, as long as the tool versions match. The
steps below assume Windows.

## 1. Windows 11 + WSL2

All work happens inside WSL2. Windows is only the shell around VS Code and the
browser.

| Item         | Requirement                                                              |
| ------------ | ------------------------------------------------------------------------ |
| System       | Windows 11, WSL2 (not WSL1)                                              |
| Distribution | Ubuntu 24.04 LTS                                                         |
| RAM          | 16 GB minimum, 32 GB recommended: a Next.js build alone takes several GB |
| Disk         | at least 50 GB free for WSL (`node_modules`, `.next`, Docker images)     |
| Repositories | `~/projects/...` inside the WSL file system, **never** `/mnt/c/...`      |

A repository under `/mnt/c` runs several times slower (`pnpm install`, the
Next.js file watcher) and misses file changes. That is the most common cause of
"the dev server does not reload".

Install in PowerShell, run as administrator:

```powershell
wsl --install -d Ubuntu-24.04
wsl --set-default-version 2
```

Memory and CPUs for WSL are set in `C:\Users\<you>\.wslconfig`. Run
`wsl --shutdown` after changing it:

```ini
[wsl2]
memory=16GB           # half of the computer's RAM
processors=8          # number of physical cores
swap=8GB
localhostForwarding=true
```

## 2. A GitHub account

Do this first: it only needs a browser, and the next steps use it. A personal
account is fine. It stays yours after the internship.

1. Sign up at **[github.com/signup](https://github.com/signup)** with an email
   you will keep. A university address expires.
2. Pick a username you would show an employer, for example `anna-kowalska`,
   not `xXcoderXx`. It appears on every commit you make.
3. Confirm the email address. GitHub sends a code.
4. **Turn on two-factor authentication:** _Settings → Password and
   authentication → Enable two-factor authentication_. Use an authenticator app
   (Google Authenticator, Microsoft Authenticator, 1Password). **Download the
   recovery codes and keep them outside your laptop.** Lose the phone without
   them, and the account is gone. Digital Vantage requires 2FA, so you cannot
   be added without it.
5. **Keep your email private:** _Settings → Emails_, tick **Keep my email
   addresses private** and **Block command line pushes that expose my email**.
   GitHub then shows you a private address like
   `12345678+anna-kowalska@users.noreply.github.com`. Copy it, because Git uses
   it in the next step. Every commit in a public repository shows its author's
   email to anyone.
6. Add your real name and a photo under _Settings → Public profile_, so
   reviewers know who they are talking to.
7. **Send your username to your mentor.** You get an invitation by email and on
   [github.com/DigitalVantage](https://github.com/DigitalVantage). Accept it
   within 7 days, or it expires.

## 3. Tools inside WSL

Use the same versions as everyone else. A different version gives you bugs
that nobody else can reproduce.

| Tool       | Version       | Install                                                                            |
| ---------- | ------------- | ---------------------------------------------------------------------------------- |
| Node.js    | 24 LTS        | `nvm install 24 && nvm alias default 24`                                           |
| pnpm       | 12.9.1        | `corepack enable`, which reads the version from `packageManager` in `package.json` |
| Git        | 2.43 or newer | `sudo apt install git`                                                             |
| GitHub CLI | 2.45 or newer | `sudo apt install gh`                                                              |
| Docker     | 27 or newer   | Docker Desktop with WSL integration. Needed on projects with a database, not here  |

Install Node only through [nvm](https://github.com/nvm-sh/nvm), never with
`apt`. The Ubuntu package is several versions behind and cannot be switched per
project. Never install pnpm with `npm i -g pnpm` either. A global copy shadows
corepack and ignores the version each project pins.

Git setup:

```bash
git config --global user.name "Your Name"
git config --global user.email "12345678+your-username@users.noreply.github.com"  # from step 2.5
git config --global init.defaultBranch main
git config --global pull.ff only
git config --global core.autocrlf input
```

`core.autocrlf input` keeps Windows CRLF line endings out of commits. The
email must be the private GitHub address from step 2, or the push is blocked.

## 4. VS Code

Install VS Code in Windows. Open a project **from the WSL terminal** with
`code .`, so the editor, terminal and extensions all run inside Ubuntu. The
status bar must show `WSL: Ubuntu-24.04`.

| Extension                 | ID                                  | Why                                |
| ------------------------- | ----------------------------------- | ---------------------------------- |
| WSL                       | `ms-vscode-remote.remote-wsl`       | work inside Ubuntu (required)      |
| ESLint                    | `dbaeumer.vscode-eslint`            | lint errors as you type (required) |
| Prettier                  | `esbenp.prettier-vscode`            | formatting on save (required)      |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss`         | class suggestions (required)       |
| Vitest                    | `vitest.explorer`                   | run tests from the editor          |
| GitHub Pull Requests      | `github.vscode-pull-request-github` | review pull requests in the editor |

Install extensions "in WSL", not locally in Windows. VS Code shows them as a
separate section in the list. This repository recommends them when you first
open it, and its `.vscode/settings.json` turns on format on save and ESLint
fixes on save.

## 5. Connect Git to GitHub

An SSH key lets Git talk to GitHub without a password:

```bash
ssh-keygen -t ed25519 -C "12345678+your-username@users.noreply.github.com"
gh auth login            # GitHub.com → SSH → upload the key → log in in the browser
ssh -T git@github.com    # "Hi <username>! You've successfully authenticated"
```

Until your mentor adds you to the repository you can clone and read it, but not
push branches.

## 6. Checklist

Your machine is ready when every line passes in the WSL terminal, inside this
repository:

- [ ] `wsl -l -v` (in PowerShell) shows Ubuntu-24.04 with VERSION `2`
- [ ] `pwd` starts with `/home/`, not `/mnt/c/`
- [ ] `node -v` prints `v24.x`
- [ ] `pnpm -v` prints `12.9.1`
- [ ] `git config core.autocrlf` prints `input`
- [ ] GitHub: 2FA on, email private, invitation to DigitalVantage accepted
- [ ] `git config user.email` prints your `@users.noreply.github.com` address
- [ ] `ssh -T git@github.com` prints "successfully authenticated"
- [ ] `gh auth status` shows you logged in to github.com
- [ ] `pnpm install && pnpm typecheck && pnpm test --run` all pass
- [ ] `pnpm dev`, then http://localhost:3000 shows the interns list
- [ ] VS Code opened with `code .` shows `WSL: Ubuntu-24.04`, with ESLint and
      Prettier active
- [ ] a test commit on your own branch prints no hook errors

Something fails? Copy the exact command and its full output into a message to
your mentor.
