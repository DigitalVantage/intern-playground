# Przygotowanie komputera

Ta instrukcja prowadzi Cię krok po kroku od zwykłego Windowsa do komputera, na
którym działa ten projekt. Wszyscy w Digital Vantage mają takie samo
środowisko, więc jeśli coś działa u Ciebie, zadziała też u innych.

**Ile to trwa:** około 1–2 godzin. Najdłużej trwa pobieranie.

**Jak czytać tę instrukcję:**

- Rób kroki **po kolei**. Nie przeskakuj.
- Ramka z kodem to polecenie do wpisania. Możesz je skopiować (przycisk w
  prawym górnym rogu ramki) i wkleić.
- Znaczek ✅ mówi, co powinieneś zobaczyć. Jeśli widzisz coś innego,
  zatrzymaj się i zajrzyj do ramki **„Jeśli coś nie działa”**.
- Utknąłeś na dłużej niż 30 minut? Napisz na Discordzie. To normalne i nikt
  nie będzie się śmiał.

## Słowniczek: kilka słów, które będą się powtarzać

| Słowo                   | Co to znaczy                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| **terminal**            | okno, w którym wpisujesz polecenia tekstem zamiast klikać                                   |
| **WSL**                 | Linux (system Ubuntu) uruchomiony wewnątrz Windowsa. Programiści pracują na nim na co dzień |
| **Ubuntu**              | wersja Linuxa, której używamy                                                               |
| **Node.js**             | program, który uruchamia kod JavaScript poza przeglądarką                                   |
| **pnpm**                | program, który instaluje biblioteki potrzebne projektowi                                    |
| **Git**                 | program, który zapamiętuje każdą zmianę w kodzie                                            |
| **GitHub**              | strona internetowa, na której trzymamy kod i rozmawiamy o zmianach                          |
| **repozytorium** (repo) | folder z kodem projektu, razem z całą historią zmian                                        |
| **VS Code**             | edytor, w którym piszesz kod                                                                |

---

## Krok 1. Zainstaluj WSL (Linux w Windowsie)

Cała praca odbywa się w Linuxie. Windows służy tylko do uruchomienia
przeglądarki i edytora.

**Czego potrzebujesz:** Windows 10 lub 11, co najmniej 8 GB pamięci RAM
(lepiej 16 GB) i około 30 GB wolnego miejsca na dysku.

1. Kliknij **Start**, wpisz `PowerShell`. Na wyniku kliknij prawym przyciskiem
   myszy → **Uruchom jako administrator** → **Tak**.
2. W niebieskim (albo czarnym) oknie wpisz i naciśnij Enter:
   ```powershell
   wsl --install -d Ubuntu-24.04
   ```
3. Poczekaj, aż się skończy (kilka minut). **Uruchom komputer ponownie**, gdy
   o to poprosi.
4. Po restarcie otworzy się okno **Ubuntu** (jeśli nie, kliknij Start i wpisz
   `Ubuntu`). Za pierwszym razem zapyta o:
   - **username**: wpisz krótką nazwę małymi literami, bez spacji, np. `anna`;
   - **password**: wymyśl hasło i wpisz je dwa razy. **Podczas wpisywania hasła
     nic się nie wyświetla, nawet gwiazdki.** To normalne. Zapamiętaj to hasło,
     będzie potrzebne przy instalowaniu programów.

✅ Widzisz linię zakończoną znakiem `$`, np. `anna@LAPTOP:~$`. To jest
**terminal Ubuntu**. Od teraz, kiedy instrukcja mówi „w terminalu”, chodzi o
to okno.

5. Zaktualizuj Ubuntu (wpisz hasło, gdy zapyta):
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
   `sudo` znaczy „zrób to jako administrator”. Dlatego pyta o hasło.

> **Jeśli coś nie działa**
>
> - Komunikat o **wirtualizacji** („Please enable the Virtual Machine Platform”
>   albo „virtualization”): trzeba ją włączyć w BIOS komputera. Napisz do
>   opiekuna, pomożemy.
> - `wsl` nie jest rozpoznane: masz za stary Windows. Zrób aktualizację systemu
>   (Ustawienia → Windows Update).

**Ważne na przyszłość:** projekty trzymamy w folderze domowym Ubuntu
(`~/projects`), **nigdy** na dysku `C:` (`/mnt/c/...`). Na dysku `C:` wszystko
działa kilka razy wolniej, a strona nie odświeża się po zmianach.

## Krok 2. Załóż konto na GitHubie

GitHub to miejsce, gdzie trzymamy kod. Konto zakładasz prywatne, na siebie.
Zostaje Twoje także po praktykach i może Ci się przydać przy szukaniu pracy.

1. Wejdź na **[github.com/signup](https://github.com/signup)**.
2. Podaj adres e-mail, z którego będziesz korzystać długo (najlepiej prywatny
   Gmail, nie szkolny, bo szkolny wygaśnie).
3. **Nazwa użytkownika** (username): taka, którą możesz pokazać pracodawcy, np.
   `anna-kowalska` albo `akowalski`. Będzie widoczna przy wszystkim, co
   zrobisz.
4. Potwierdź adres e-mail kodem, który przyjdzie mailem.

### Włącz weryfikację dwuetapową (2FA)

To dodatkowe zabezpieczenie: oprócz hasła potrzebny jest kod z telefonu.
**Bez 2FA nie możemy dodać Cię do naszej organizacji.**

1. Zainstaluj na telefonie aplikację **Google Authenticator** albo **Microsoft
   Authenticator**.
2. Na GitHubie kliknij swoje zdjęcie (prawy górny róg) → **Settings** →
   **Password and authentication** → **Enable two-factor authentication**.
3. Zeskanuj telefonem kod QR, który pokaże GitHub, i wpisz kod z aplikacji.
4. GitHub pokaże **kody zapasowe** (recovery codes). Kliknij **Download**,
   zapisz plik **poza laptopem** (np. wydrukuj albo wyślij sobie na telefon).
   Jeśli zgubisz telefon, a nie będziesz mieć tych kodów, stracisz konto.

### Ukryj swój adres e-mail

To repozytorium jest **publiczne**: każdy w internecie widzi, kto co zmienił,
razem z adresem e-mail. Dlatego ukrywamy prawdziwy adres.

1. **Settings** → **Emails**.
2. Zaznacz **Keep my email addresses private**.
3. Zaznacz **Block command line pushes that expose my email**.
4. Pod spodem GitHub pokaże Twój adres zastępczy, np.
   `12345678+anna-kowalska@users.noreply.github.com`. **Skopiuj go i zapisz.**
   Będzie potrzebny w kroku 4.

### Uzupełnij profil i wyślij nazwę użytkownika

1. **Settings** → **Public profile**: wpisz imię (wystarczy samo imię) i dodaj
   zdjęcie.
2. **Wyślij swoją nazwę użytkownika opiekunowi** (mailem albo na Discordzie).
3. Przyjdzie zaproszenie do organizacji **DigitalVantage** (mail i powiadomienie
   na GitHubie). **Przyjmij je w ciągu 7 dni**, potem wygasa.

## Krok 3. Dołącz do Discorda

Na Discordzie rozmawiamy na co dzień: pytania, problemy, krótkie ustalenia.

1. Załóż konto na **[discord.com/register](https://discord.com/register)** (albo
   użyj swojego). Zainstaluj aplikację na komputer i na telefon.
2. **Włącz 2FA:** ⚙️ (ustawienia użytkownika) → **Moje konto** → **Włącz
   aplikację uwierzytelniającą**. Użyj tej samej aplikacji co przy GitHubie.
   Kody zapasowe zapisz razem z tymi z GitHuba.
3. **Dołącz do serwera Digital Vantage** z linku, który dostaniesz od
   opiekuna. Linku nie ma w tym repozytorium, bo repozytorium jest publiczne.
4. **Ustaw pseudonim na serwerze na swoje imię i nazwisko:** prawy przycisk
   myszy na ikonie serwera → **Edytuj profil serwera**. Dzięki temu wiemy, kto
   jest kim na GitHubie.
5. Wejdź na kanał dla praktykantów
   ([link](https://discord.com/channels/1499084674830565407/1556578325495808030),
   działa dopiero po dołączeniu do serwera) i **przywitaj się**: imię, nazwa na
   GitHubie i czego chcesz się nauczyć.
6. Powiadomienia: kanał praktykantów ustaw na **Wszystkie wiadomości**, resztę na
   **Tylko @wzmianki**.

## Krok 4. Zainstaluj programy w Ubuntu

Wszystkie polecenia z tego kroku wpisujesz **w terminalu Ubuntu**.

### Git i GitHub CLI

```bash
sudo apt install -y git gh curl
```

✅ Po chwili wraca linia z `$`. Sprawdź:

```bash
git --version
```

✅ `git version 2.43.0` (albo wyższa).

### Node.js (przez nvm)

**nvm** to program, który instaluje Node.js w odpowiedniej wersji. Używamy go
zamiast `apt`, bo `apt` ma bardzo starą wersję Node.

1. Zainstaluj nvm:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash
   ```
2. **Zamknij terminal i otwórz go ponownie** (inaczej nvm nie zadziała).
3. Zainstaluj Node.js 24 i ustaw go jako domyślny:
   ```bash
   nvm install 24
   nvm alias default 24
   ```
4. Sprawdź:
   ```bash
   node -v
   ```
   ✅ `v24.` i dalsze cyfry, np. `v24.16.0`.

### pnpm

```bash
corepack enable
```

`corepack` jest częścią Node.js. Sam pobierze właściwą wersję pnpm, kiedy
pierwszy raz wejdziesz do projektu. **Nigdy nie instaluj pnpm poleceniem
`npm i -g pnpm`**, bo wtedy projekt dostanie złą wersję.

### Ustaw Gita

Wpisz po kolei. W pierwszych dwóch liniach podmień dane na swoje. Adres to ten
zastępczy z kroku 2 (`…@users.noreply.github.com`), **nie** Twój prawdziwy.

```bash
git config --global user.name "Anna"
git config --global user.email "12345678+anna-kowalska@users.noreply.github.com"
git config --global init.defaultBranch main
git config --global pull.ff only
git config --global core.autocrlf input
```

Co to robi:

- `user.name` i `user.email`: tym podpisujesz swoje zmiany;
- `init.defaultBranch main`: główna gałąź nazywa się `main`;
- `pull.ff only`: Git nie pomiesza Ci zmian bez pytania;
- `core.autocrlf input`: Windows i Linux inaczej zapisują końce linii. To
  ustawienie pilnuje, żeby nie było z tym problemów.

## Krok 5. Zainstaluj VS Code

VS Code to edytor kodu. Instalujesz go **w Windowsie**, ale on sam łączy się z
Ubuntu. Okno jest w Windowsie, a cała praca dzieje się w Linuxie.

1. Wejdź na **[code.visualstudio.com](https://code.visualstudio.com/)** i
   pobierz wersję dla Windows (**User Installer, 64-bit**).
2. Uruchom instalator. Na ekranie **Select Additional Tasks** zaznacz
   **wszystkie** pola, a najważniejsze jest **Add to PATH**. Bez niego
   polecenie `code .` nie zadziała.
3. Uruchom VS Code. Kliknij ikonę **Extensions** po lewej (cztery kwadraty)
   albo naciśnij `Ctrl+Shift+X`. Wyszukaj **WSL** i kliknij **Install**.
4. Zamknij VS Code.

Otwieranie projektu w VS Code poznasz w kroku 7, gdy pobierzesz już kod.

## Krok 6. Połącz komputer z GitHubem (klucz SSH)

Klucz SSH to coś jak cyfrowy klucz do drzwi. Dzięki niemu GitHub wie, że to Ty,
i nie musisz za każdym razem wpisywać hasła.

1. Wygeneruj klucz (wpisz swój adres zastępczy z kroku 2):
   ```bash
   ssh-keygen -t ed25519 -C "12345678+anna-kowalska@users.noreply.github.com"
   ```
   Program zada trzy pytania. **Na każde naciśnij po prostu Enter.**
2. Zaloguj się do GitHuba z terminala:
   ```bash
   gh auth login
   ```
   Odpowiadaj strzałkami i Enterem:
   - _Where do you use GitHub?_ → **GitHub.com**
   - _What is your preferred protocol?_ → **SSH**
   - _Upload your SSH public key?_ → wybierz klucz, który się pokaże (kończy się
     na `.pub`)
   - _Title for your SSH key_ → Enter
   - _How would you like to authenticate?_ → **Login with a web browser**
   - skopiuj 8-znakowy kod, naciśnij Enter, wklej go na stronie, która się
     otworzy, i zatwierdź.
3. Sprawdź połączenie:
   ```bash
   ssh -T git@github.com
   ```
   Za pierwszym razem zapyta `Are you sure you want to continue connecting?`.
   Wpisz `yes` i Enter.

✅ `Hi anna-kowalska! You've successfully authenticated…`. Twoja nazwa
użytkownika na początku oznacza, że wszystko działa.

## Krok 7. Pobierz projekt i otwórz go

```bash
mkdir -p ~/projects
cd ~/projects
git clone git@github.com:DigitalVantage/intern-playground.git
cd intern-playground
pnpm install
```

Za pierwszym razem `pnpm install` może zapytać o pobranie pnpm. Odpowiedz
`Y`.

✅ Na końcu `Done in …`.

Teraz otwórz projekt w VS Code:

```bash
code .
```

Za pierwszym razem potrwa to około minuty, bo VS Code doinstalowuje swoją część
w Ubuntu.

✅ W **lewym dolnym rogu** okna VS Code widzisz **`WSL: Ubuntu-24.04`**. To
znaczy, że edytor pracuje w Linuxie. Jeśli tego napisu nie ma, zamknij okno i
otwórz projekt jeszcze raz poleceniem `code .` z terminala Ubuntu.

VS Code zapyta, czy zainstalować **zalecane rozszerzenia**
(_recommended extensions_). Kliknij **Install All**. To dodatki, które
podkreślają błędy i same formatują kod.

**Zawsze otwieraj projekt w ten sposób:** terminal Ubuntu → `cd` do folderu
projektu → `code .`. Nie otwieraj go z Eksploratora Windows.

### Przydatne skróty w VS Code

| Skrót          | Co robi                                         |
| -------------- | ----------------------------------------------- |
| `Ctrl+P`       | otwórz plik po nazwie                           |
| `` Ctrl+` ``   | pokaż terminal (to terminal Ubuntu)             |
| `Ctrl+S`       | zapisz plik (kod sam się wtedy sformatuje)      |
| `Ctrl+Shift+F` | szukaj w całym projekcie                        |
| `Ctrl+Shift+P` | wszystkie polecenia: wpisz, czego szukasz       |
| `F12`          | przejdź do miejsca, gdzie coś jest zdefiniowane |

## Krok 8. Sprawdź, czy wszystko działa

W terminalu, w folderze projektu (`~/projects/intern-playground`), wpisz po kolei
i odhacz:

- [ ] `node -v` → `v24.…`
- [ ] `pnpm -v` → `12.9.1`
- [ ] `git config user.email` → Twój adres `…@users.noreply.github.com`
- [ ] `ssh -T git@github.com` → `Hi <Twoja nazwa>! …`
- [ ] `pwd` → zaczyna się od `/home/`, a nie od `/mnt/c/`
- [ ] `pnpm test --run` → na końcu `Tests 5 passed`
- [ ] `pnpm dev` → otwórz w przeglądarce **http://localhost:3000**. Widzisz
      stronę „Intern playground” z listą osób. (Zatrzymasz serwer
      skrótem `Ctrl+C` w terminalu.)
- [ ] VS Code: w lewym dolnym rogu `WSL: Ubuntu-24.04`
- [ ] VS Code: dopisz kilka spacji w pliku `src/app/page.tsx` i zapisz
      (`Ctrl+S`). Spacje powinny same zniknąć.
- [ ] GitHub: 2FA włączone, e-mail ukryty, zaproszenie do DigitalVantage
      przyjęte
- [ ] Discord: 2FA włączone, jesteś na serwerze, pseudonim to imię i nazwisko,
      przywitałeś się

**Wszystko odhaczone? Gratulacje, komputer jest gotowy.** Teraz zrób swój
pierwszy pull request: [first-pull-request.md](first-pull-request.md).

Któryś punkt nie przechodzi? Skopiuj polecenie i **cały** wynik z terminala i
wyślij na Discordzie. Nie przepisuj ręcznie i nie rób zdjęcia ekranu
telefonem: tekst da się przeszukać, zdjęcia nie.
