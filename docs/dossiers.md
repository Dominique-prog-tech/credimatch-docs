---
description: "Dossiers in CrediMatch: een kredietdossier in stappen invullen, het bij de banken toetsen (prescoring) en simulaties bewaren."
---

# Dossiers

Op dit scherm beheert u de kredietdossiers van uw kantoren. U vult een dossier in stappen in, in de volgorde van een
gesprek met de klant, en toetst het bij de banken: de prescoring. Elke toets kunt u met een eigen bedrag en looptijd
bewaren als simulatie.

!!! note "Proefomgeving"
    Werk enkel met fictieve gegevens. Echte dossiers kunnen pas wanneer de afspraken over persoonsgegevens rond zijn.

<!-- AFBEELDING: de lijst Dossiers met één fictief dossier, met de kolommen #, Omschrijving, Kantoor, Simulaties en Bijgewerkt -->

## Het scherm openen

Klik in het menu op **Dossiers**. U ziet de dossiers van de kantoren die u mag zien (zie [Kantoren](kantoren.md)).

## De lijst

| Kolom | Wat het is |
|---|---|
| # | het volgnummer van het dossier in uw organisatie |
| Omschrijving | bijvoorbeeld de naam van de klant en het doel |
| Kantoor | het kantoor waar het dossier bij hoort |
| Simulaties | het aantal bewaarde simulaties |
| Bijgewerkt | wanneer het dossier het laatst bewaard werd |

Klik op een rij om het dossier te openen.

## Een dossier aanmaken

1. Klik op **Nieuw dossier**.
2. Kies het **Kantoor**. Hebt u maar één kantoor, dan staat het al gekozen.
3. Vul een **Omschrijving** in, bijvoorbeeld de naam van de klant en het doel.
4. Klik op **Aanmaken**. Het dossier gaat meteen open.

## Het dossier in stappen

Het dossier heeft zeven tabbladen, in de volgorde van een gesprek met de klant:

| Stap | Wat u er invult |
|---|---|
| 1. Doel | wat de klant wil doen, zijn gezin, en de datum van indiening |
| 2. Aanvragers | per aanvrager zijn naam en contactgegevens, zijn werk en zijn inkomen |
| 3. Verleden en lasten | een vermelding bij de Nationale Bank, en de kredieten die al lopen |
| 4. Waarborgen | de panden: het gefinancierde pand en wat er verder in waarborg gaat |
| 5. Financieel plan | de werken, de kosten, de eigen middelen, de looptijd, de rente en het gevraagde krediet in schijven |
| 6. Bijzonderheden | wat een bank enkel in een bijzonder geval vraagt: een herfinanciering of een schatting |
| 7. Prescoring en simulaties | per bank toetsen, en simulaties bewaren |

Een aanvrager, een lopend krediet, een pand of een schijf voegt u toe met de knop onder de stap (bijvoorbeeld **Aanvrager
toevoegen** of **Schijf toevoegen**). U haalt er een weg met **Verwijderen** bovenaan zijn kaart.

<!-- AFBEELDING: de stap Financieel plan met één schijf en het overzicht eronder -->

### Wat u niet weet, laat u leeg

Een leeg veld betekent **niet gekend**. De prescoring zegt dan welk gegeven ontbreekt, in plaats van te gokken.

- Bij een vraag **ja/nee** kiest u **ja** of **nee**. Leeg betekent *niet gekend*, niet *nee*.
- Een bedrag dat nul is, vult u in als **0**. Zijn er geen werken, vul dan **0** in bij de werken: leeg betekent dat de
  werken niet gekend zijn.

### Het overzicht in het financieel plan

Onder de stap **Financieel plan** staat een overzicht: de aankoopprijs van de panden, de werken, de aankoopkosten, het
totaal van het project, het gevraagde krediet (de som van de schijven) en de eigen inbreng (het verschil). Het is een
controle. De quotiteit en de schuldratio berekent elke bank op haar manier: die ziet u bij de prescoring.

### Bewaren

Klik onderaan op **Bewaren**. Wat u invult, is pas bewaard wanneer u op **Bewaren** klikt. Verlaat u het dossier met
wijzigingen die nog niet bewaard zijn, dan vraagt het scherm eerst of u toch wil weggaan.

## Prescoring en simulaties

1. Open de stap **7. Prescoring en simulaties**.
2. Kijk het **Bedrag** en de **Looptijd (jaren)** na. Ze staan op het gevraagde krediet en de looptijd van het dossier; u kunt
   een ander bedrag of een andere looptijd toetsen.
3. Kies eventueel een andere **Toetsdatum**, of bij een bank een andere variant.
4. Klik op **Prescoring**.

Per bank ziet u het oordeel, de versie van de regels en tot wanneer ze nagekeken zijn, en de regels die op het oordeel
wegen, met de reden.

| Oordeel | Wat het betekent |
|---|---|
| positief | geen enkele regel houdt het dossier tegen |
| positief onder voorwaarden | het kan, onder een voorwaarde die bij de regel staat |
| menselijk oordeel | de bank beoordeelt dit zelf: haar regels laten het open of zeggen er niets over |
| niet volledig getoetst | er ontbreekt een gegeven, of iets wat CrediMatch niet kan toetsen: de reden staat erbij |
| weigering | een regel van de bank sluit het dossier uit |

Rekenen bewaart niets en wijzigt het dossier niet. Een prescoring is een indicatie: de bank beslist.

### Een simulatie bewaren

Klik bij een bank op **Bewaar als simulatie**. De simulatie verschijnt in de tabel **Bewaarde simulaties**, met haar
eigen bedrag en looptijd, het oordeel, de versie van de regels, en wanneer en door wie ze bewaard werd. Zo kunt u
schuiven met het bedrag of de looptijd tot het past, zonder het dossier zelf te wijzigen.

Een bank die uw organisatie heeft uitgezet (zie [Banken](banken.md)), wordt niet getoetst. Ze staat onderaan bij
**Uitgezet door uw organisatie**.

<!-- AFBEELDING: de stap Prescoring en simulaties met de uitkomst van één bank en twee bewaarde simulaties -->

## Veelgemaakte fouten

!!! warning "Bijna elke regel geeft niet volledig getoetst"
    Er ontbreekt een gegeven dat de bank nodig heeft, vaak de **datum van indiening** (stap 1) of de geboortedatum van
    een aanvrager. De reden bij elke regel zegt welk gegeven ontbreekt. Vul het in, klik op **Bewaren** en toets opnieuw.

!!! warning "Het dossier van een collega staat niet in de lijst"
    U ziet enkel de dossiers van de kantoren die u mag zien. Vraag de beheerder van uw organisatie om u op dat kantoor te
    zetten (zie [Kantoren](kantoren.md)).

!!! warning "Een bank ontbreekt bij de prescoring"
    Uw organisatie heeft ze uitgezet. Dat ziet u onder **Organisatie** > **Banken**.

## Zie ook

- [Kantoren](kantoren.md)
- [Banken](banken.md)
