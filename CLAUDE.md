# CLAUDE.md — CrediMatch Documentatie

De officiële handleiding van **CrediMatch**, straks op <https://docs.credimatch.be>. Opgezet op 31/10/2026 vanuit de
ADM One-sessie, op vraag van Dominique: *"kunnen we dit niet doen zoals de andere 3 basisplatformen (CreditSoft,
Nimble, CleanOps)?"* (ADR-56, vierde uitwerking, punt 10, in `adm-platform/ARCHITECTUUR.md`).

> ⚠️ **Kopieer de vlootafspraken niet hierin: ze wonen op één plek.**
> - de vorm van de site: `~/projects/adm-appkit/docs/docs-site-vormgeving.md` (voorbeeld: `cleanops-docs`);
> - wat er in de teksten hoort: `~/projects/adm-appkit/docs/handleiding-schrijfregels.md`;
> - wat er klaar moet zijn vóór een deploy van de app: `~/projects/adm-appkit/docs/deploy-poort.md`.

## Wie hier werkt
De **sessie van CrediMatch**, op Dominiques woord daar (vlootafspraak: het werk in een handleidingrepo doet de sessie
van die app). De ADM One-sessie zette enkel het skelet op.

## De bron
- **De app:** `~/projects/adm-credimatch` (.NET 10 / Blazor op de AppKit). Lees het scherm (`.razor`) en zijn teksten
  vóór je een pagina schrijft. Verzin geen functie: wat de app niet bevestigt, krijgt `[TODO: bevestigen]`.
- **Het waarom:** ADR-56 in `adm-platform/ARCHITECTUUR.md`.

## Doelpubliek
**Kredietmakelaars** en de **backoffice** van een groep kantoren. Professionals in kredieten, geen IT'ers.
- U-vorm, korte zinnen, concreet: "Klik op X".
- Vakjargon mag (quotiteit, looptijd, akte); IT-jargon niet.
- **NL én FR**, elke pagina in beide talen (`pagina.md` + `pagina.fr.md`). De Franse term komt uit de app.
- Een prescoring is een **indicatie**: de bank beslist. Schrijf nooit dat CrediMatch een krediet "toekent".

## Banknamen mogen in de handleiding staan
Beslist door Dominique op 1/11/2026 ("Mogen blijven"): de handleiding noemt banken bij naam waar het scherm dat ook doet
(Banken, het API-voorbeeld). Dat wijkt bewust af van de website (www.credimatch.be, Content Hub: "geen namen van banken
momenteel"). Haal ze dus niet weg omdat de site ze niet noemt.

## Wat er groeit
Enkel **klare** pagina's staan in de `nav:` van `mkdocs.yml`, per vrijgegeven scherm. Op het onthaal wordt de kaart van
dat onderwerp dan klikbaar (de klasse `cm-binnenkort` gaat weg en er komt een link bij).

## De beelden (sinds 2/11/2026)
De beelden worden **gegenereerd**, in NL en FR, zoals bij CleanOps en CreditSoft: `tools/beelden.mjs` op de gedeelde kern
(`adm-appkit/tools/beeldgenerator`). Een nieuw beeld = een recept in dat script (naam, route, merkteken) + een verwijzing in de pagina;
ontbreekt het nog, dan markeer je de plek met `<!-- AFBEELDING: … -->`.
1. De preview `credimatch-web` draait (`http://127.0.0.1:6345`).
2. `python3 tools/proefklant-vullen.py` vult de **fictieve proefklant `proef-hypo`** (Dominique, 2/11/2026: geen aparte demo-klant). Nooit uit een
   echte klant, nooit van een server: het script weigert beide. Elke naam begint met "Fictief": de site is publiek.
3. `BEELDEN_WACHTWOORD=… node tools/beelden.mjs [filter]`. Een **beheerder van de proefklant** meldt zich aan (`dashboard-proef@proef-hypo.local`,
   lokaal aangemaakt), geen operator: zo toont het menu wat een klant ziet. Het wachtwoord staat in geen enkel bestand. Bestaat het account niet
   meer, maak dan lokaal een nieuwe beheerder aan en geef hem mee met `BEELDEN_GEBRUIKER`.
- ⛔ **De tarieven van de banken horen niet op deze publieke site.** `proefklant-vullen.py` zet daarom een **fictief rooster** in de lokale regelbank, met het label "Fictief", via `tools/fictief-rooster.py` in de private repo van de app. `beelden.mjs` weigert als er een ander rooster geldt, als een simulatie een echte rente draagt, of als een woord uit `tools/niet-publiek.txt` van de app op een scherm staat, ook in een invulveld. De regelbank is gedeeld over alle klanten: het rooster kan dus niet "in de proefklant" staan. Het geldt lokaal voor iedereen tot je het weghaalt met `python3 tools/proefklant-vullen.py --tarief-weg`. Het staat op de datum van vandaag: draai het script op de dag van de beelden. **Deze repo is publiek:** geen echte rente, korting, tariefnummer of intern woord in een tekst, een script of een commentaar. Wat de vorm van de roosters kent, hoort in de app.
- Het script weigert een foutscherm, een scherm zonder het merkteken van het recept en een afwijkende beeldvorm. De alt-tekst draagt de
  schermwoorden met een hoofdletter: die worden nagekeken.
- ⚠️ **Herneem ALLE beelden na een blok werk** (schrijfregels §4): de zijbalk staat op elk beeld.
- ⚠️ **Kijk ernaar.** Op 2/11/2026 toonden de eerste beelden twee fouten die elke test groen liet: de tabel op Banken stond scheef sinds 0.2.0, en de
  grid sprak Engels.

## Wat er bewust nog NIET aan staat (31/10/2026), en wanneer het aangaat
| Wat | Wanneer | Hoe (zie `cleanops-docs`) |
|---|---|---|
| ~~De uitrol bij een push~~ | ✅ gedaan 1/11/2026 | repo publiek, Pages aan (GitHub Actions, `docs.credimatch.be`), `if:` weg |
| `robots.txt` open + sitemap | bij het live zetten | `Allow: /` en de `Sitemap:`-regel |
| Plausible (bezoekcijfers) | bij het live zetten | eigen site in Plausible voor `docs.credimatch.be`; NIET het script van een andere site overnemen, anders tellen de bezoeken daar |
| ~~De beeldcontrole~~ | ✅ aan sinds 2/11/2026 | `tools/check-beelden.py site` in `deploy.yml`; `MIN_PAGINAS` verhogen bij elke beeldronde |
| Films en de pagina "Video's" | bij de eerste film | de gedeelde hook `_appkit/tools/filmgenerator/films_hook.py`, het repo-geheim `ADM_APPKIT_LEZEN`, de filmcontrole, `extra.bunny_library`, de film-CSS |

## Live zetten (op Dominiques woord)
1. De repo **publiek** zetten (zoals de drie andere; GitHub Pages op een gratis account vraagt dat).
2. **Pages** aan: *Settings > Pages > Source: GitHub Actions*.
3. **DNS** bij Cloudflare (zone `credimatch.be`): `docs` als CNAME naar `dominique-prog-tech.github.io`. Doet Dominique.
4. De drie regels "bij het live zetten" uit de tabel hierboven.

## Bouwen
```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/mkdocs build --strict
.venv/bin/mkdocs serve
```
