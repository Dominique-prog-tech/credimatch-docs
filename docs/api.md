---
description: "De publieke API van CrediMatch: per bank een prescoring voor een dossier vragen, vanuit uw eigen software."
---

# API voor andere software

Met de API van CrediMatch vraagt uw eigen software, bijvoorbeeld een pakket voor kredietmakelaars, per bank een prescoring
voor een dossier. U krijgt per bank het oordeel, met per regel de reden als code en als zin in het Nederlands en het Frans.

!!! info "Wat CrediMatch bewaart"
    **Niets** van wat u voor een berekening stuurt: het dossier gaat erin, de uitkomst komt eruit. Ook het logboek bewaart
    geen enkele waarde uit het dossier, enkel wie er vroeg, voor welk kantoor, welke banken en welk oordeel.

!!! warning "Een prescoring is een indicatie"
    CrediMatch toetst een dossier aan de gepubliceerde regels van een bank. De bank beslist altijd zelf.

## Toegang

- **Een sleutel** vraagt u aan bij ADM. U geeft hem mee in de kop `X-Api-Key` van elke oproep. Wij bewaren enkel een
  vingerafdruk van de sleutel, dus een verloren sleutel kunnen we niet terugvinden: we trekken hem in en geven een nieuwe.
- **Uw klanten**: elke klant van u heeft bij u een eigen referentie (`klantRef`). ADM koppelt die één keer aan een klant
  in CrediMatch.
- **De limiet** is 60 oproepen per minuut per sleutel.
- **De volledige beschrijving**, leesbaar voor mens en machine, staat in de app op `/scalar` (en als OpenAPI op
  `/openapi/v1.json`).

## De oproepen

| Oproep | Wat ze doet |
|---|---|
| `PUT /api/v1/klanten/{klantRef}/kantoren/{kantoorRef}` | Meldt een kantoor van uw klant aan, of werkt het bij. Twee keer dezelfde oproep geeft hetzelfde kantoor. |
| `POST /api/v1/prescoring` | Toetst één dossier van een aangemeld kantoor bij één of meer banken. |
| `GET /api/v1/banken` | De banken met hun geldende regels, de datum tot wanneer die nagekeken zijn, en hun varianten. |
| `GET /api/v1/woordenlijst` | Alle gegevens van een dossier: code, type, niveau en de benaming in het NL en het FR. |

### Een kantoor aanmelden

Een kantoor rekent pas nadat u het aangemeld hebt. Doe dat bijvoorbeeld wanneer uw klant CrediMatch aanzet.

```http
PUT /api/v1/klanten/hw-001/kantoren/kantoor-7
X-Api-Key: uw-sleutel
Content-Type: application/json

{ "naam": "Kantoor Antwerpen" }
```

U krijgt `201` bij een nieuw kantoor en `200` als het al bestond.

### Een prescoring vragen

```http
POST /api/v1/prescoring
X-Api-Key: uw-sleutel
Content-Type: application/json

{
  "klantRef": "hw-001",
  "kantoorRef": "kantoor-7",
  "toetsdatum": "2026-11-02",
  "banken": [ { "bank": "Elantis", "variant": "standaard" } ],
  "dossier": {
    "dossier":       { "doel": "aankoop", "looptijd_jaren": 25, "rentevoet": 0.035 },
    "kredietnemers": [ { "geboortedatum": "1992-03-14", "netto_maandinkomen": 2600 } ],
    "panden":        [ { "aankoopprijs": 360000, "epc": 210 } ],
    "schijven":      [ { "schijfbedrag": 300000 } ],
    "lasten":        []
  }
}
```

- De codes in het dossier zijn die van `GET /api/v1/woordenlijst`.
- **Een gegeven dat u niet kent, laat u weg.** Dat is geen fout: de bank krijgt dan het oordeel *niet volledig getoetst*,
  met de reden.
- Zonder `toetsdatum` toetst CrediMatch op vandaag. Zonder `banken` toetst het bij alle banken die uw klant aan heeft staan.

### Het antwoord

Per bank:

| Veld | Wat het is |
|---|---|
| `oordeel` | `positief`, `positief onder voorwaarden`, `menselijk oordeel`, `niet volledig getoetst` of `weigering` |
| `regelsVanHetOordeel` | de regels die het oordeel bepalen |
| `regels` | elke regel, met haar `stand` (bv. `voldaan`, `overtreden`, `onbekend`), haar `niveau`, de `redenen` als code, en de zin in `spoorNl` en `spoorFr` |
| `kerncijfers` | de cijfers die de bank berekent, zoals de schuldratio en de quotiteit |
| `regelversie` en `nagekekenTot` | welke versie van de regels gebruikt werd, en tot wanneer ze nagekeken zijn |

Daarbij de **versies** (de motor en de instellingen van uw klant), de banken die uw klant **uitgezet** heeft, en de
**invoer** zoals CrediMatch ze las, zodat u een uitkomst later kunt nalezen. Beslis altijd op de codes; de zinnen zijn er
om te tonen.

## Fouten

Elke fout heeft een vaste `code` en een `melding`; bij een `400` ook de lijst van alle problemen tegelijk.

| Status | Code | Wanneer |
|---|---|---|
| 400 | `vraag_ongeldig` | een onbekende code, een verkeerd type, een onbekende bank of variant |
| 401 | `sleutel_ongeldig` | geen sleutel, een onbekende of een ingetrokken sleutel |
| 403 | `kantoor_niet_aangemeld` | het kantoor is niet door u aangemeld |
| 404 | `klant_niet_gekoppeld` | uw `klantRef` is bij CrediMatch nog niet aan een klant gekoppeld |
| 429 | `te_veel_oproepen` | meer dan 60 oproepen in een minuut met deze sleutel |
