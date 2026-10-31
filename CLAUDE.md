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

## Wat er groeit
Enkel **klare** pagina's staan in de `nav:` van `mkdocs.yml`, per vrijgegeven scherm. Op het onthaal wordt de kaart van
dat onderwerp dan klikbaar (de klasse `cm-binnenkort` gaat weg en er komt een link bij).

## Wat er bewust nog NIET aan staat (31/10/2026), en wanneer het aangaat
| Wat | Wanneer | Hoe (zie `cleanops-docs`) |
|---|---|---|
| De uitrol bij een push | bij het live zetten | `if:` bij `deploy` in `.github/workflows/deploy.yml` weghalen |
| `robots.txt` open + sitemap | bij het live zetten | `Allow: /` en de `Sitemap:`-regel |
| Plausible (bezoekcijfers) | bij het live zetten | eigen site in Plausible voor `docs.credimatch.be`; NIET het script van een andere site overnemen, anders tellen de bezoeken daar |
| De beeldcontrole | bij de eerste schermafdruk | `tools/check-beelden.py site` in `deploy.yml`; `MIN_PAGINAS` verhogen bij elke beeldronde |
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
