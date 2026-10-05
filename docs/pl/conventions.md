# Zasady: commity, pull requesty, dokumentacja

🇬🇧 [English version](../conventions.md)

Te zasady obowiązują we wszystkich projektach Digital Vantage, także w Waszych.
Piszemy je z myślą o jednej osobie: **o kimś, kto otworzy ten kod za pół
roku**. Ta osoba nie zna kontekstu, nie pamięta rozmowy i nie ma kogo zapytać.
Bardzo często to Ty sam.

## 1. Commity

**Jeden commit = jedna zmiana.** Cała reszta wynika z tej zasady.

### Jak duży ma być commit

- **Mały.** Zwykle kilkadziesiąt do kilkuset linijek. Lepiej pięć małych
  commitów niż jeden ogromny.
- **Jedna rzecz naraz.** Jeśli w opisie chcesz napisać „i” („dodaj X **i**
  popraw Y”), to są dwa commity.
- **Po każdym commicie projekt działa.** Testy i sprawdzanie przechodzą przy
  każdym commicie, nie tylko przy ostatnim.

### Co razem, a co osobno

| Razem, w jednym commicie          | Osobno, w różnych commitach              |
| --------------------------------- | ---------------------------------------- |
| kod + testy do niego              | porządkowanie kodu i nowa funkcja        |
| zmiana + linijka w `CHANGELOG.md` | formatowanie całego pliku i zmiana w nim |
| zmiana + poprawiona dokumentacja  | aktualizacja bibliotek i Twoja zmiana    |

### Jak napisać opis commita

Opis piszemy **po angielsku**, w takim formacie:

```text
<rodzaj>(<czego dotyczy>): <co robisz>
```

Przykłady:

```text
feat(home): show the number of interns
fix(footer): use the current year
docs: explain how to run the tests
test(interns): check the GitHub usernames
```

**Rodzaje:**

| Rodzaj     | Kiedy                                         |
| ---------- | --------------------------------------------- |
| `feat`     | nowa rzecz, którą widzi użytkownik            |
| `fix`      | naprawa błędu                                 |
| `docs`     | tylko dokumentacja                            |
| `test`     | tylko testy                                   |
| `refactor` | porządkowanie kodu, działa tak samo jak przed |
| `style`    | tylko formatowanie                            |
| `chore`    | ustawienia, narzędzia, biblioteki             |

**Zasady opisu:**

- **Tryb rozkazujący:** `add`, nie `added` ani `adds`. Czytaj to tak: „ten
  commit ma…: _add the footer_”.
- **Bez kropki** na końcu.
- **Krótko:** do około 70 znaków.

### Ściąga: angielskie słowa do opisów

| Chcesz powiedzieć… | Napisz                | Przykład                                |
| ------------------ | --------------------- | --------------------------------------- |
| dodaj              | `add`                 | `feat(home): add a footer`              |
| pokaż              | `show`                | `feat(home): show the date`             |
| usuń               | `remove`              | `chore: remove unused images`           |
| napraw             | `fix`                 | `fix(list): fix the sorting of names`   |
| zmień              | `change`              | `style(home): change the title colour`  |
| przenieś           | `move`                | `refactor: move the helper to src/lib`  |
| zmień nazwę        | `rename`              | `refactor: rename count to peopleCount` |
| zaktualizuj        | `update`              | `docs: update the setup steps`          |
| sprawdź / waliduj  | `check`, `validate`   | `test(interns): check the usernames`    |
| wyjaśnij / opisz   | `explain`, `describe` | `docs: explain the .env file`           |

Nie wiesz, jak coś napisać? Napisz najprościej, jak umiesz, i zapytaj w pull
requeście. Prosty angielski jest w porządku.

### Czego nigdy nie robimy w commicie

- opisy typu `WIP`, `fix`, `zmiany`, `asdf`;
- **zakomentowany kod** zostawiony „na później” (Git i tak go pamięta);
- **nieużywane** importy i zmienne;
- pliki **`.env`**, hasła, klucze;
- formatowanie całego pliku zmieszane z prawdziwą zmianą (nikt nie znajdzie
  tej zmiany w review).

## 2. Pull requesty

- **Jedno zadanie = jeden pull request.** Wpisz `Closes #12` z numerem zadania.
- **Tytuł** jak opis commita, np. `feat(home): add a footer`.
- **Opis** odpowiada na trzy pytania z szablonu: co się zmienia, po co, jak to
  sprawdziłeś. Może być po polsku.
- **Mały.** Jeśli PR jest za duży, żeby przeczytać go za jednym razem, podziel
  go.
- **Odpowiedz na każdy komentarz** z review.

## 3. CHANGELOG

`CHANGELOG.md` to lista zmian w aplikacji dla ludzi, którzy z niej korzystają.

- Każdy `feat` i `fix` dopisuje linijkę pod `## [Unreleased]`, **w tym samym**
  pull requeście.
- Grupy: `### Added` (dodane), `### Fixed` (naprawione), `### Changed`
  (zmienione), `### Docs` (dokumentacja).
- Pisz po angielsku, prosto, **co widzi użytkownik**. Dobrze: `- A footer with
the current year.` Źle: `- Edit layout.tsx.`

## 4. Dokumentacja i komentarze

### Gdzie co piszemy

| Co                                                   | Gdzie                    |
| ---------------------------------------------------- | ------------------------ |
| jak uruchomić projekt                                | `README.md`              |
| jak coś jest zbudowane i **dlaczego**                | plik w `docs/`           |
| dlaczego ten kawałek kodu wygląda tak, a nie inaczej | komentarz w kodzie, obok |
| dlaczego zrobiłeś tę zmianę                          | opis pull requesta       |
| co się zmieniło dla użytkownika                      | `CHANGELOG.md`           |
| co jeszcze jest do zrobienia                         | issue na GitHubie        |

### Zasady

- **Dokumentację poprawiasz w tym samym pull requeście co kod.** Instrukcja,
  która opisuje stare polecenia, jest gorsza niż żadna, bo ludzie jej ufają.
- **Obie wersje językowe.** Instrukcje są po angielsku (`docs/*.md`) i po
  polsku (`docs/pl/*.md`). Zmieniasz jedną, popraw też drugą w tym samym pull
  requeście. Nie umiesz po angielsku? Napisz to w PR, opiekun pomoże.
- **Najpierw popraw istniejący plik**, zamiast tworzyć nowy.
- **Konkretnie:** polecenie do skopiowania, ścieżka do pliku. „Uruchom
  `pnpm test --run`”, a nie „uruchom testy”.

### Komentarze w kodzie

Komentarz mówi **dlaczego**, bo **co** widać w samym kodzie.

```ts
// ❌ zwiększ licznik o 1
count++

// ✅ Lista na stronie zaczyna się od 1, a tablica w JavaScript od 0.
const position = index + 1
```

- Pisz komentarz tam, gdzie ktoś by się zatrzymał i zapytał „czemu tak?”.
- Komentarze w kodzie najlepiej po angielsku. Jeśli nie umiesz czegoś opisać po
  angielsku, napisz po polsku i zapytaj w pull requeście.
- **Nazwy** w kodzie zawsze po angielsku i takie, które mówią, **czym coś
  jest**: `peopleCount`, a nie `x` ani `liczba2`.

## 5. Pisanie kodu w pięciu zdaniach

- **Prosto.** Najprostsze rozwiązanie, które działa, jest najlepsze.
- **Bez kopiowania**, ale nie od razu: dwa podobne fragmenty to przypadek, trzeci
  to znak, że trzeba zrobić z tego funkcję.
- **Tylko to, co potrzebne teraz.** Nie dodawaj kodu „na zapas”.
- **Jedna funkcja robi jedną rzecz.**
- **Zostaw kod trochę czystszy, niż go zastałeś**, ale nie zmieniaj przy okazji
  rzeczy niezwiązanych z zadaniem.
