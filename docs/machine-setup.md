# Setting up your machine

🇵🇱 [Wersja polska](pl/machine-setup.md)

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

## 3. Discord

The team talks on the **Digital Vantage** Discord server. Questions, being
stuck and day-to-day coordination go there.

1. Create an account at **[discord.com/register](https://discord.com/register)**,
   or use the one you have. Install the desktop app and the phone app, so you
   see messages without a browser tab open.
2. **Turn on two-factor authentication:** _User Settings → My Account → Enable
   Authenticator App_. Save the backup codes next to your GitHub ones.
3. **Join the server** with the invite link your mentor sends you. Invites are
   never posted in this repository, because it is public.
4. **Set your server nickname to your real name:** right-click the server icon
   → _Edit Server Profile_. A reviewer must know that `anna-kowalska` on GitHub
   and "Anna Kowalska" on Discord are the same person.
5. Open the interns channel ([direct link](https://discord.com/channels/1499084674830565407/1556578325495808030), which works once you are on
   the server). Introduce yourself in one message: name, GitHub username, what
   you want to learn.
6. Notifications: set the interns channel to _All messages_, the rest to
   _Only @mentions_.

## 4. Tools inside WSL

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

## 5. VS Code

VS Code is the editor everyone at Digital Vantage uses. It runs as a Windows
app, but everything it does (terminal, Git, Node, extensions, the files)
happens **inside WSL**. That split is the whole trick: a Windows window,
Linux everywhere else.

### Install

1. Download the **User Installer** for Windows (64-bit) from
   [code.visualstudio.com](https://code.visualstudio.com/). Install it in
   **Windows**, not inside Ubuntu.
2. In the installer, on _Select Additional Tasks_, tick:
   - **Add to PATH**. Without it, `code .` does not work from WSL;
   - _Add "Open with Code" action_ to the file and folder context menus;
   - _Register Code as an editor for supported file types_.
3. Start VS Code and install the **WSL** extension (`ms-vscode-remote.remote-wsl`):
   _Extensions_ (`Ctrl+Shift+X`) → search "WSL" → _Install_.
4. Close VS Code. In the **Ubuntu terminal**:
   ```bash
   cd ~/projects/intern-playground
   code .
   ```
   The first time, it installs a small server inside Ubuntu (it takes a minute)
   and opens a window. The bottom-left corner must show **`WSL: Ubuntu-24.04`**.
   If it shows nothing, you opened a Windows copy of the folder: close the
   window and use `code .` from Ubuntu again.

Always open projects this way, with `code .` from the Ubuntu terminal (or
_File → Open Recent_ entries marked `[WSL: Ubuntu-24.04]`). Opening them from
the Windows Explorer through `\\wsl$` is slow and runs the wrong Node.

### Extensions

When you open this repository, VS Code offers the **recommended extensions**
(from `.vscode/extensions.json`). Click _Install All_. They install "in WSL",
which VS Code shows as a separate section of the list: that is correct.

| Extension                 | ID                                  | Why                                |
| ------------------------- | ----------------------------------- | ---------------------------------- |
| WSL                       | `ms-vscode-remote.remote-wsl`       | work inside Ubuntu (required)      |
| ESLint                    | `dbaeumer.vscode-eslint`            | lint errors as you type (required) |
| Prettier                  | `esbenp.prettier-vscode`            | formatting on save (required)      |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss`         | class suggestions (required)       |
| Vitest                    | `vitest.explorer`                   | run tests from the editor          |
| GitHub Pull Requests      | `github.vscode-pull-request-github` | review pull requests in the editor |

### Settings

The repository's `.vscode/settings.json` already turns on **format on save**
(Prettier), **ESLint fixes on save** and Unix line endings. Do not override
them in your user settings for this project. Check it works: add a few spaces
somewhere in `src/app/page.tsx` and save. They should disappear.

Worth turning on for yourself (_File → Preferences → Settings_):

- _Auto Save_ → `onFocusChange`;
- _Settings Sync_ (the account icon, bottom left → _Backup and Sync Settings_,
  sign in with GitHub), so a new computer gets your setup in a minute.

### Shortcuts you will use every day

| Shortcut          | Does                                      |
| ----------------- | ----------------------------------------- |
| `Ctrl+P`          | open a file by name                       |
| `Ctrl+Shift+P`    | every command (type what you want)        |
| `` Ctrl+` ``      | the terminal (it is the Ubuntu one)       |
| `Ctrl+Shift+G`    | Source Control: changes, staging, commits |
| `F12` / `Alt+F12` | go to definition / peek it                |
| `Shift+F12`       | find every use                            |
| `F2`              | rename a symbol everywhere                |
| `Ctrl+Shift+F`    | search the whole project                  |

The Source Control panel is fine for looking at changes. Commit from the
terminal until the hooks and the message format are second nature. The editor
hides what the hooks print.

## 6. Connect Git to GitHub

An SSH key lets Git talk to GitHub without a password:

```bash
ssh-keygen -t ed25519 -C "12345678+your-username@users.noreply.github.com"
gh auth login            # GitHub.com → SSH → upload the key → log in in the browser
ssh -T git@github.com    # "Hi <username>! You've successfully authenticated"
```

Until your mentor adds you to the repository you can clone and read it, but not
push branches.

## 7. Checklist

Your machine is ready when every line passes in the WSL terminal, inside this
repository:

- [ ] `wsl -l -v` (in PowerShell) shows Ubuntu-24.04 with VERSION `2`
- [ ] `pwd` starts with `/home/`, not `/mnt/c/`
- [ ] `node -v` prints `v24.x`
- [ ] `pnpm -v` prints `12.9.1`
- [ ] `git config core.autocrlf` prints `input`
- [ ] GitHub: 2FA on, email private, invitation to DigitalVantage accepted
- [ ] Discord: 2FA on, on the Digital Vantage server, nickname = your real name,
      introduced in the interns channel
- [ ] `git config user.email` prints your `@users.noreply.github.com` address
- [ ] `ssh -T git@github.com` prints "successfully authenticated"
- [ ] `gh auth status` shows you logged in to github.com
- [ ] `pnpm install && pnpm typecheck && pnpm test --run` all pass
- [ ] `pnpm dev`, then http://localhost:3000 shows the interns list
- [ ] VS Code opened with `code .` shows `WSL: Ubuntu-24.04` bottom left
- [ ] the recommended extensions are installed in WSL, and saving a file
      reformats it
- [ ] a test commit on your own branch prints no hook errors

Something fails? Copy the exact command and its full output into a message to
your mentor.
