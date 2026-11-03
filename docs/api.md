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
| `PUT /api/v1/klanten/{klantRef}/kantoren/{kantoorRef}/dossiers/{dossierRef}` | Bewaart een dossier in CrediMatch, of werkt het bij. **Gaat per klant open** (zie hieronder). |
| `GET` op hetzelfde adres | Het bewaarde dossier, met de simulaties die er in CrediMatch op gemaakt werden. **Gaat per klant open.** |

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
- **Een `rentevoet` in het dossier wint, bij elke bank.** Laat u ze weg, dan rekent elke bank met de rente uit haar eigen tarief dat op de
  toetsdatum geldt.
- Per bank kiest u eventueel met `tarief` een `formule`, de `voorwaardenUit` die u uitzet, en een trede `commercieel`. De codes staan in het
  antwoord, onder `formules`, `voorwaarden` en `commercieel`.
- **Een schijf kan alles wat het dossier kan:** `schijf_looptijd_jaren`, `schijf_rentetype`, `schijf_aflossing`, `schijf_rentevoet` en `schijf_maximale_rentevoet`. Leeg betekent: zoals op het dossier. Per schijf kiest u de formule met `tarief.formulesPerSchijf`, in de volgorde van de schijven; `null` op een plaats is wat `formule` zegt, of wat bij het rentetype hoort.

### Het antwoord

Per bank:

| Veld | Wat het is |
|---|---|
| `oordeel` | `positief`, `positief onder voorwaarden`, `menselijk oordeel`, `niet volledig getoetst` of `weigering` |
| `regelsVanHetOordeel` | de regels die het oordeel bepalen |
| `regels` | elke regel, met haar `stand` (bv. `voldaan`, `overtreden`, `onbekend`), haar `niveau`, de `redenen` als code, en de zin in `spoorNl` en `spoorFr` |
| `kerncijfers` | de cijfers die de bank berekent, zoals de schuldratio en de quotiteit |
| `regelversie` en `nagekekenTot` | welke versie van de regels gebruikt werd, en tot wanneer ze nagekeken zijn |
| `tarief` | de rente van die bank, met haar opbouw en de maandlast (zie hieronder) |

Daarbij de **versies** (de motor en de instellingen van uw klant), de banken die uw klant **uitgezet** heeft, en de
**invoer** zoals CrediMatch ze las, zodat u een uitkomst later kunt nalezen. Beslis altijd op de codes; de zinnen zijn er
om te tonen.

### Het blok tarief

De getallen in dit voorbeeld zijn verzonnen. Een rente is een fractie: 0,0352 is 3,52 %.

```json
"tarief": {
  "bron": "tarief",
  "versie": "Fictief",
  "rentevoet": 0.0352,
  "maximaleRentevoet": null,
  "rentetype": "vast",
  "eersteMaandlast": { "waarde": 1496.16, "redenen": [] },
  "maximaleMaandlast": null,
  "volgensTarief": { "formule": "vast", "looptijdJaren": 25, "basisrente": 0.0360, "rentevoet": 0.0352, "zonderVoorwaarden": 0.0357, "opbouw": [] },
  "formule": "vast",
  "formules": [],
  "voorwaarden": [],
  "commercieel": null,
  "dossierkosten": null,
  "meldingen": [],
  "probleem": null
}
```

- **`bron` is de code om op te beslissen:** `tarief`, `eigen_rentevoet` (die stond in het dossier en wint; `volgensTarief` staat er dan ter
  informatie bij) of `geen` (de toets mist de rente, en `probleem` zegt waarom).
- `rentevoet`, `maximaleRentevoet` en `rentetype` zijn wat de toets kreeg. Samen met de `invoer` is een uitkomst zo na te rekenen.
- Wat niet bestaat, is geen fout van de vraag: een onbekende formule geeft de bron `geen` met de reden in `probleem`, en een onbekende voorwaarde
  of korting staat in `meldingen`. Een bank of variant die niet bestaat, blijft een `400`.
- `commercieel` blijft binnen het plafond dat uw klant instelde. Erboven rekent CrediMatch het plafond, en `meldingen` zegt dat.
- **Vanaf twee schijven** staat de rente per schijf in `schijven`, met per schijf `schijf`, `bedrag`, `looptijdJaren`, `rentevoet`, `maximaleRentevoet`, `rentetype`, `eersteMaandlast`, `volgensTarief`, `formule` en `formules`. `rentevoet`, `maximaleRentevoet`, `rentetype` en `formule` bovenaan zijn dan leeg zodra de schijven verschillen, `volgensTarief` bovenaan is altijd leeg, en `eersteMaandlast` en `maximaleMaandlast` zijn het totaal. Bij één schijf is `schijven` leeg.
- Er staat nooit een commissie in. Elke rente is indicatief: de bank beslist.

### Een dossier bewaren

!!! warning "Gaat per klant open"
    CrediMatch neemt voor een klant pas dossiers aan wanneer de verwerkersovereenkomst geregistreerd is en de klant een
    bewaartermijn heeft. Tot dan geven deze twee oproepen voor die klant `403 dossier_api_dicht`. Rekenen met
    `POST /api/v1/prescoring` kan wel: dat bewaart niets.

Met een bewaard dossier kan de makelaar in CrediMatch simulaties maken, en leest u die terug.

```http
PUT /api/v1/klanten/hw-001/kantoren/kantoor-7/dossiers/dossier-1234
X-Api-Key: uw-sleutel
Content-Type: application/json

{
  "omschrijving": "Aankoop woning",
  "dossier": { "dossier": {}, "kredietnemers": [], "panden": [], "schijven": [], "lasten": [] }
}
```

- `dossierRef` is uw eigen referentie. Dezelfde oproep twee keer geeft hetzelfde dossier: `201` de eerste keer, daarna
  `200`. Het dossier staat in het formaat van de woordenlijst, zoals bij de prescoring.
- Zet **geen persoonsgegevens** in de omschrijving. Zonder omschrijving heet het dossier "Dossier" gevolgd door uw
  referentie.
- U bent de enige die het dossier wijzigt: in CrediMatch is het enkel leesbaar. Een dossier verhuist niet naar een ander
  kantoor.
- `GET` op hetzelfde adres geeft het dossier met zijn `simulaties`: per simulatie de bank, het bedrag, de looptijd, het
  oordeel en de volledige `uitkomst`, in hetzelfde formaat als een uitkomst van de prescoring.

## Fouten

Elke fout heeft een vaste `code` en een `melding`; bij een `400` ook de lijst van alle problemen tegelijk.

| Status | Code | Wanneer |
|---|---|---|
| 400 | `vraag_ongeldig` | een onbekende code, een verkeerd type, een onbekende bank of variant |
| 401 | `sleutel_ongeldig` | geen sleutel, een onbekende of een ingetrokken sleutel |
| 403 | `kantoor_niet_aangemeld` | het kantoor is niet door u aangemeld |
| 403 | `dossier_api_dicht` | dossiers bewaren staat voor deze klant nog dicht |
| 404 | `klant_niet_gekoppeld` | uw `klantRef` is bij CrediMatch nog niet aan een klant gekoppeld |
| 404 | `dossier_onbekend` | er is geen dossier met die `dossierRef` onder dit kantoor |
| 409 | `dossier_ander_kantoor` | het dossier staat onder een ander kantoor; het verhuist niet |
| 409 | `dossier_gearchiveerd` | het dossier staat in de prullenbak van CrediMatch |
| 410 | `dossier_gewist` | het kantoor heeft dit dossier definitief gewist; het wordt niet opnieuw aanvaard |
| 429 | `te_veel_oproepen` | meer dan 60 oproepen in een minuut met deze sleutel |
