# Intern playground

🇬🇧 [English version](README.md)

Mała aplikacja w Next.js, na której praktykanci Digital Vantage uczą się, jak
pracuje zespół programistów: od przygotowania komputera do zmiany w kodzie,
którą ktoś sprawdził i przyjął. Nic stąd nie trafia do klientów, więc śmiało
możesz coś zepsuć. Za to **sposób pracy** jest dokładnie taki sam jak w
prawdziwych projektach.

**Twój pierwszy cel:** dopisać się do listy na stronie głównej w jednym pull
requeście ([jak to zrobić](#twój-pierwszy-pull-request)).

## Od czego zacząć

1. **Przygotuj komputer:** [docs/pl/machine-setup.md](docs/pl/machine-setup.md),
   krok po kroku.
2. **Otwórz swoją checklistę:** na GitHubie zakładka **Issues** → **New issue**
   → **Onboarding**. Przypisz ją do siebie (po prawej **Assignees** → _assign
   yourself_). To lista wszystkiego, co masz zrobić w pierwszym tygodniu, po
   kolei.
3. **Zrób pierwszy pull request:**
   [docs/pl/first-pull-request.md](docs/pl/first-pull-request.md).

## Zasady: to repozytorium jest publiczne

Wszystko, co tu wyślesz, **każdy w internecie** może zobaczyć, i to na zawsze.
Nawet jeśli później to usuniesz.

- **Nigdy nie wysyłaj haseł, kluczy ani plików `.env`.**
- **Nigdy nie wysyłaj danych prawdziwych osób** ani zrzutów ekranu z systemów
  klientów.
- **Wysłałeś coś, czego nie powinieneś?** Od razu napisz do opiekuna. Nie próbuj
  tego sam ukryć, bo na GitHubie i tak zostaje ślad.

**Język:** nazwy w kodzie i opisy commitów piszemy po angielsku, bo tak wygląda
kod w każdej firmie. Wystarczy prosty angielski, a gotowe przykłady znajdziesz w
[docs/pl/conventions.md](docs/pl/conventions.md). Wszystko inne (issues, pull
requesty, komentarze w review, Discord) może być po polsku.

## Najważniejsze polecenia

Wpisujesz je w terminalu Ubuntu, w folderze projektu.

| Polecenie         | Co robi                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `pnpm install`    | pobiera biblioteki projektu (robisz raz i po każdej zmianie zależności) |
| `pnpm dev`        | uruchamia stronę na **http://localhost:3000**. Zatrzymasz ją: `Ctrl+C`  |
| `pnpm test`       | uruchamia testy i powtarza je po każdym zapisie pliku                   |
| `pnpm test --run` | uruchamia testy raz (tak jak robi to GitHub)                            |
| `pnpm lint`       | szuka błędów i złych nawyków w kodzie                                   |
| `pnpm typecheck`  | sprawdza typy TypeScript                                                |
| `pnpm format`     | poprawia formatowanie wszystkich plików                                 |
| `pnpm build`      | buduje wersję produkcyjną (jak przed wdrożeniem)                        |

## Co gdzie jest

```text
src/
  app/            strony: page.tsx to strona główna, layout.tsx to ramka wokół każdej strony
  data/           dane, np. lista praktykantów: src/data/interns.ts
  lib/            zwykłe funkcje i ich testy (plik.test.ts obok pliku z kodem)
docs/             instrukcje, które czytasz
.github/          automatyczne sprawdzanie kodu (CI) i szablony issues i pull requestów
CHANGELOG.md      lista zmian w aplikacji
```

## Plik `.env`: ustawienia i sekrety

Niektóre ustawienia różnią się między komputerami, a hasła i klucze nie mogą
trafić do kodu. Dlatego trzymamy je w specjalnych plikach:

| Plik           | Czy trafia na GitHuba? | Co w nim jest                                      |
| -------------- | ---------------------- | -------------------------------------------------- |
| `.env.example` | tak                    | lista ustawień z opisem, **bez prawdziwych haseł** |
| `.env.local`   | **nigdy**              | Twoje ustawienia na Twoim komputerze               |

Na początku skopiuj wzór:

```bash
cp .env.example .env.local
```

Zasady:

- Dodajesz nowe ustawienie? Wpisz je w **dwóch** miejscach: w swoim
  `.env.local` i w `.env.example` (nazwa i opis, bez prawdziwej wartości).
- Ustawienia, których nazwa zaczyna się od **`NEXT_PUBLIC_`**, trafiają do
  przeglądarki, więc każdy może je przeczytać. **Hasła i klucze nigdy nie mają
  tego przedrostka.**
- Po zmianie pliku `.env.local` **uruchom `pnpm dev` ponownie.**
- Prawdziwe hasła i klucze dostaniesz od opiekuna. Nie wklejaj ich nigdzie:
  ani w issue, ani w pull requeście, ani na Discordzie.
- Hasło lub klucz wyciekł? Od razu napisz do opiekuna. Trzeba go wymienić na
  nowy, bo usunięcie z GitHuba nie wystarczy.

## Jak pracujemy

Każda zmiana, nawet najmniejsza, przechodzi te same kroki:

1. **Zadanie (issue).** Wybierz zadanie albo załóż nowe. Przypisz je do siebie,
   żeby nikt inny go nie wziął.
2. **Gałąź (branch).** Każda zmiana powstaje na osobnej gałęzi, nigdy
   bezpośrednio na `main`.
3. **Małe kroki (commity).** Zapisujesz zmianę w Gicie z krótkim opisem po
   angielsku.
4. **Wpis w `CHANGELOG.md`**, jeśli zmieniasz coś, co widzi użytkownik.
5. **Pull request (PR).** Prośba: „sprawdźcie moją zmianę i dołączcie ją do
   projektu”.
6. **Automatyczne sprawdzenie (CI).** GitHub sam uruchamia testy i sprawdza
   kod. Musi być zielony ✔.
7. **Review.** Drugi praktykant i opiekun czytają Twój kod i zostawiają
   komentarze. Odpowiadasz na każdy.
8. **Merge.** Gdy wszystko jest zielone i zaakceptowane, zmiana trafia do
   `main`.

Szczegóły:

- **jak to wszystko robić w Gicie i na GitHubie:**
  [docs/pl/github-guide.md](docs/pl/github-guide.md);
- **kursy wideo z Reacta i Next.js (z polskimi napisami):**
  [docs/pl/learning.md](docs/pl/learning.md);
- **zasady pisania commitów, PR-ów i dokumentacji:**
  [docs/pl/conventions.md](docs/pl/conventions.md).

### Automatyczne sprawdzanie na Twoim komputerze

Po `pnpm install` Git sam sprawdza Twój kod:

- **przy każdym commicie:** formatowanie, błędy (ESLint) i typy (TypeScript);
- **przy każdym wysłaniu (push):** wszystkie testy.

Jeśli coś się nie zgadza, commit się nie zapisze. **Przeczytaj błąd i popraw
kod.** Nie omijaj tego sprawdzania.

### Czego nie da się zrobić na `main`

GitHub pilnuje gałęzi `main`, więc nie trać czasu na próby:

- nie da się wysłać zmian prosto na `main`, wszystko idzie przez pull request;
- nie da się dołączyć zmiany bez akceptacji opiekuna i bez zielonego CI;
- nie da się nadpisać ani usunąć `main`.

Na **swojej** gałęzi możesz robić, co chcesz.

## Twój pierwszy pull request

Wszystko krok po kroku, z każdym poleceniem: **[docs/pl/first-pull-request.md](docs/pl/first-pull-request.md)**.

W skrócie:

1. Załóż issue i przypisz je do siebie.
2. Utwórz gałąź `feat/add-<twoja-nazwa-na-githubie>`.
3. Dopisz się do listy w `src/data/interns.ts`, w kolejności alfabetycznej.
   Strona jest publiczna, więc wystarczy imię albo pseudonim.
4. Dopisz linijkę w `CHANGELOG.md`, zrób commit, wyślij zmianę i otwórz pull
   request.
5. Zrób review pull requesta kolegi i odpowiedz na komentarze do swojego.

## Kontakt i pytania

| Gdzie                                                                                               | Co tam piszemy                                   |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [Discord, kanał praktykantów](https://discord.com/channels/1499084674830565407/1556578325495808030) | pytania, problemy, „czy ktoś zerknie na mój PR?” |
| issue na GitHubie                                                                                   | zadanie albo błąd: coś, co trzeba zrobić         |
| komentarz w pull requeście                                                                          | wszystko o konkretnej zmianie w kodzie           |

- **Utknąłeś na 30 minut? Zapytaj na Discordzie.** Napisz, co już próbowałeś,
  i wklej **dokładny** błąd w ramce kodu (trzy znaki ` przed i po). Nie
  przepisuj go własnymi słowami i nie wklejaj zdjęcia ekranu.
- **Odpowiadaj w wątku** pod pytaniem, żeby kanał był czytelny.
- **Ustalenia z Discorda zapisuj na GitHubie** (w issue albo w PR). Czat to nie
  dokumentacja.
- **Podawaj link** do issue, PR-a albo linijki kodu, zamiast opisywać, o co
  chodzi.

## Licencja

[MIT](LICENSE) © Digital Vantage
