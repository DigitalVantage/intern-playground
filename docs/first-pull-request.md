# Twój pierwszy pull request, krok po kroku

W tym ćwiczeniu dopisujesz się do listy na stronie głównej. Sama zmiana w kodzie
to kilka linijek. Ważne jest wszystko dookoła: zadanie, gałąź, test, commit,
pull request i review. Dokładnie tak powstaje każda zmiana w Digital Vantage, od
poprawki literówki do nowej funkcji.

**Ile to trwa:** za pierwszym razem około **2–3 godzin**.

**Jak czytać:** przy każdym kroku znaczek ✅ mówi, co powinieneś zobaczyć. Jeśli
widzisz coś innego, zatrzymaj się i zajrzyj do ramki **„Jeśli coś nie
działa”**. Nie ma tam Twojego problemu? Zapytaj na Discordzie.

**Zanim zaczniesz:** komputer jest przygotowany według
[machine-setup.md](machine-setup.md) (wszystkie punkty z kroku 8 odhaczone).

### Kilka nowych słów

| Słowo                 | Co to znaczy                                                       |
| --------------------- | ------------------------------------------------------------------ |
| **issue**             | zadanie na GitHubie: opis, co trzeba zrobić                        |
| **gałąź** (branch)    | Twoja osobna kopia kodu. Zmieniasz ją, a `main` zostaje nietknięty |
| **commit**            | zapisany w Gicie krok: „w tym miejscu zmieniłem to i to”           |
| **push**              | wysłanie Twoich commitów na GitHuba                                |
| **pull request** (PR) | prośba: „sprawdźcie moją zmianę i dołączcie ją do `main`”          |
| **review**            | inni czytają Twój kod i zostawiają komentarze                      |
| **merge**             | dołączenie zmiany do `main`                                        |

---

## Krok 1. Załóż issue (zadanie)

Każda praca zaczyna się od issue. To opis zadania i miejsce, gdzie się o nim
rozmawia.

1. Wejdź na stronę repozytorium na GitHubie → zakładka **Issues** → zielony
   przycisk **New issue** → wybierz **Task**.
2. Tytuł: `Add <Twoje imię> to the interns list`, np. `Add Zofia to the interns
list`.
3. Pole **Goal**: `My name is on the home page.`
4. Pole **Done when**: `The page shows my name and the tests pass.`
5. Kliknij **Create**.
6. Po prawej stronie: **Assignees** → **assign yourself**. Teraz wszyscy wiedzą,
   że to Twoje zadanie.

✅ Widzisz swoje issue z numerem, np. **#31**. **Zapamiętaj ten numer**, będzie
potrzebny w kroku 10.

## Krok 2. Przygotuj kod

Otwórz **terminal Ubuntu** (nie PowerShell). Jeśli w kroku 7 przygotowania
komputera już pobrałeś projekt, wpisz tylko:

```bash
cd ~/projects/intern-playground
git switch main
git pull
pnpm install
```

✅ `pnpm install` kończy się napisem `Done in …`.

Załóż plik z ustawieniami (wystarczy raz):

```bash
cp .env.example .env.local
```

> **Jeśli coś nie działa**
>
> - `No such file or directory`: nie pobrałeś jeszcze projektu. Zrób krok 7 z
>   [machine-setup.md](machine-setup.md).
> - `Permission denied (publickey)`: GitHub nie zna Twojego klucza SSH. Zrób
>   krok 6 z [machine-setup.md](machine-setup.md).

## Krok 3. Uruchom stronę

```bash
pnpm dev
```

✅ W terminalu pojawia się `Local: http://localhost:3000`. Otwórz ten adres w
przeglądarce. Widzisz napis **Intern playground** i listę z jedną osobą.

**Nie zamykaj tego terminala**, bo strona przestanie działać. Do kolejnych
kroków otwórz **drugi** terminal: w VS Code skrót `` Ctrl+` ``, a potem przycisk
**+** w panelu terminala.

## Krok 4. Utwórz swoją gałąź

Nigdy nie pracujemy bezpośrednio na `main`. Tworzysz swoją gałąź, czyli osobną
kopię kodu. Twoja zmiana będzie na niej, dopóki ktoś jej nie sprawdzi.

W **drugim** terminalu wpisz (podmień `zofia-dev` na swoją nazwę z GitHuba):

```bash
git switch -c feat/add-zofia-dev
```

✅ `Switched to a new branch 'feat/add-zofia-dev'`.

W każdej chwili możesz sprawdzić, na której gałęzi jesteś:

```bash
git status
```

Pierwsza linijka mówi: `On branch feat/add-zofia-dev`.

## Krok 5. Znajdź plik z listą

W VS Code naciśnij `Ctrl+P`, wpisz `interns` i wybierz plik
`src/data/interns.ts`. Wygląda tak:

```ts
export const interns: Intern[] = [
  {
    name: 'Konrad Barejko',
    github: 'kbarejko',
    goal: 'Help every intern ship a first pull request in their first week.',
  },
]
```

Co tu widzisz:

- `interns` to **tablica** (lista), zapisana w nawiasach `[ … ]`;
- każdy blok `{ … }` to **jedna osoba** (obiekt) z trzema polami: `name`,
  `github` i `goal`;
- strona główna sama buduje listę z tej tablicy. **Strony w ogóle nie
  zmieniasz.**

## Krok 6. Celowo zepsuj test

Najpierw zobaczysz, jak wygląda test, który nie przechodzi. Dzięki temu
rozpoznasz go później.

1. Dopisz siebie **na samej górze** listy, przed Konradem. Uważaj na przecinki:
   każdy blok `{ … }` kończy się przecinkiem.

   ```ts
   export const interns: Intern[] = [
     {
       name: 'Zofia',
       github: 'zofia-dev',
       goal: 'I want to learn how a real team works.',
     },
     {
       name: 'Konrad Barejko',
       // … reszta bez zmian
   ```

   - `name`: to zobaczy każdy w internecie. **Wystarczy imię albo pseudonim.**
   - `github`: Twoja nazwa z GitHuba, **bez** znaku `@`.
   - `goal`: jedno proste zdanie po angielsku: czego chcesz się nauczyć. Na
     przykład: `I want to learn how a real team works.` albo `I want to build
my first real website.`

2. Zapisz plik (`Ctrl+S`) i uruchom testy:

   ```bash
   pnpm test --run
   ```

✅ Widzisz czerwony znak ❌ i tekst `the interns list > is sorted by name`. Test
sprawdza, czy lista jest **w kolejności alfabetycznej**, a Twoja nie jest.

Jeśli Twoje imię jest w alfabecie **przed** literą K (np. Artem), test przejdzie
na zielono. Wtedy przenieś się **na koniec** listy, za Konrada, żeby zobaczyć
błąd.

## Krok 7. Napraw to

Przenieś swój blok we właściwe miejsce w alfabecie (np. Artem przed Konradem,
Zofia za Konradem). Zapisz plik i uruchom testy jeszcze raz:

```bash
pnpm test --run
```

✅ Wszystko zielone: `Tests  5 passed (5)`. Spójrz też do przeglądarki: strona
sama się odświeżyła i widać na niej Twoje imię.

## Krok 8. Dopisz zmianę do CHANGELOG

`CHANGELOG.md` to lista zmian w aplikacji. Otwórz go (`Ctrl+P` → `CHANGELOG`).
Pod `## [Unreleased]` → `### Added` dopisz **na górze listy** jedną linijkę:

```md
- Interns list: add Zofia.
```

Piszemy, co zmieniło się **dla osoby, która korzysta ze strony**, a nie który
plik edytowałeś.

## Krok 9. Zrób commit

Commit to zapisanie zmiany w Gicie. Najpierw zobacz, co zmieniłeś:

```bash
git status
```

✅ Dwa zmienione pliki: `src/data/interns.ts` i `CHANGELOG.md`.

Teraz wybierz zmiany do commita. Git pokaże Ci po kolei każdy fragment:

```bash
git add -p
```

Przy każdym fragmencie przeczytaj go i naciśnij `y` (tak, weź) albo `n` (nie).
Tutaj weź wszystko: `y` przy każdym.

Zapisz commit z opisem po angielsku:

```bash
git commit -m "feat(interns): add Zofia"
```

Co znaczy ten opis:

- `feat`: dodajesz coś nowego (feature);
- `(interns)`: czego dotyczy zmiana;
- `add Zofia`: co robisz, w trybie rozkazującym („dodaj”, nie „dodałem”).

✅ Git sam sprawdza kod (to trwa kilkanaście sekund), a na końcu pokazuje
`[feat/add-zofia-dev 1a2b3c4] feat(interns): add Zofia`.

> **Jeśli coś nie działa**
>
> - Pojawiają się błędy i commit się nie zapisał: przeczytaj **pierwszy** błąd,
>   popraw plik, potem znowu `git add -p` i `git commit -m "…"`.
> - `Please tell me who you are`: Git nie zna Twojego imienia ani adresu. Zrób
>   „Ustaw Gita” z kroku 4 w [machine-setup.md](machine-setup.md).

## Krok 10. Wyślij zmianę i otwórz pull request

Wyślij swoją gałąź na GitHuba:

```bash
git push -u origin HEAD
```

✅ W wyniku jest link `Create a pull request for 'feat/add-…' on GitHub by
visiting: https://github.com/…`. Otwórz go (`Ctrl` + kliknięcie). Możesz też
wejść na stronę repozytorium i kliknąć żółty pasek **Compare & pull request**.

> **Jeśli coś nie działa**
>
> - `push declined due to email privacy restrictions`: w Gicie masz prawdziwy
>   adres e-mail. Ustaw adres zastępczy (krok 4 w
>   [machine-setup.md](machine-setup.md)), a potem wpisz
>   `git commit --amend --reset-author --no-edit` i ponów `git push`.

Na stronie pull requesta:

1. **Tytuł:** taki sam jak commit: `feat(interns): add Zofia`.
2. **Opis:** szablon już tam jest. W każdym punkcie napisz jedno zdanie (może
   być po polsku). W linijce `Closes #` wpisz numer swojego issue z kroku 1, np.
   `Closes #31`. Odhacz punkty, które zrobiłeś.
3. Po prawej: **Reviewers** → wybierz kolegę z praktyk. **Assignees** → siebie.
4. Kliknij **Create pull request**.

✅ Po chwili na dole pojawiają się **Checks**. Po około minucie przy _Lint,
typecheck, test, build_ jest zielony ✔. Czerwony ✖? Kliknij **Details** i
przeczytaj błąd.

## Krok 11. Review: odpowiedz na komentarze

Kolega i opiekun zostawią komentarze do Twojego kodu. **To normalne.** Każdy
pull request w Digital Vantage je dostaje, także te od doświadczonych
programistów.

- Odpowiedz na **każdy** komentarz: popraw kod albo napisz, dlaczego nie.
- Poprawki robisz na tej samej gałęzi: zmień plik, potem `git add -p`,
  `git commit -m "fix: …"` (krótko, co poprawiasz) i `git push`. Pull request
  sam się zaktualizuje.
- Gdy odpowiesz na wszystko, kliknij **Re-request review** (okrągła strzałka obok
  nazwy osoby, która robiła review).

W tym samym czasie **zrób review pull requesta kolegi**. Jak to zrobić, opisuje
[github-guide.md](github-guide.md) w punkcie o review.

## Krok 12. Jeśli pull request kolegi trafił do `main` pierwszy

Obaj zmienialiście tę samą listę, więc Git nie wie, jak połączyć Wasze zmiany.
To się nazywa **konflikt** (merge conflict). Rozwiązanie go jest częścią
ćwiczenia.

```bash
git fetch
git rebase origin/main
```

✅ Git zatrzymuje się i pisze `CONFLICT (content): Merge conflict in
src/data/interns.ts`. Otwórz ten plik. Zobaczysz takie znaczniki:

```text
<<<<<<< HEAD
  { name: 'Artem', … },       ← to, co już jest w main (zmiana kolegi)
=======
  { name: 'Zofia', … },       ← Twoja zmiana
>>>>>>> feat(interns): add Zofia
```

Zostaw **obie** osoby w kolejności alfabetycznej i usuń trzy linie ze
znacznikami (`<<<<<<<`, `=======`, `>>>>>>>`). VS Code pokazuje nad konfliktem
przycisk **Accept Both Changes**, który zostawia oba fragmenty. Potem sprawdź
kolejność.

Następnie:

```bash
pnpm test --run
git add src/data/interns.ts
git rebase --continue
git push --force-with-lease
```

- `pnpm test --run`: sprawdza, czy lista wciąż jest w dobrej kolejności;
- `git rebase --continue`: może otworzyć edytor z opisem commita. Zapisz i
  zamknij bez zmian. W edytorze `nano`: `Ctrl+X`;
- `--force-with-lease`: nadpisuje Twoją gałąź na GitHubie. Wolno tak robić
  **tylko na swojej gałęzi**, nigdy na `main`.

✅ Pull request pokazuje Twój commit na nowym `main`, a sprawdzanie (Checks)
startuje od nowa.

## Krok 13. Gotowe

Gdy pull request ma akceptację i zielone sprawdzanie, opiekun go dołącza
(merge). Issue zamknie się samo (to dzięki `Closes #31`), a Twoje imię jest na
stronie głównej.

Posprzątaj u siebie:

```bash
git switch main
git pull
git branch -d feat/add-zofia-dev
```

Odhacz sekcję 3 w swoim issue „Onboarding”. **Brawo: właśnie zrobiłeś coś, co
będziesz robić jeszcze setki razy.**
