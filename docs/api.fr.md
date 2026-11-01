---
description: "L'API publique de CrediMatch : demander un pré-scoring par banque pour un dossier, depuis votre propre logiciel."
---

# API pour d'autres logiciels

Avec l'API de CrediMatch, votre propre logiciel, par exemple un progiciel pour courtiers en crédit, demande un pré-scoring
par banque pour un dossier. Vous recevez par banque le résultat, avec pour chaque règle la raison sous forme de code et de
phrase en néerlandais et en français.

!!! info "Ce que CrediMatch conserve"
    **Rien** de ce que vous envoyez pour un calcul : le dossier entre, le résultat sort. Le journal ne conserve non plus
    aucune valeur du dossier, seulement qui a demandé, pour quel bureau, quelles banques et quel résultat.

!!! warning "Un pré-scoring est une indication"
    CrediMatch confronte un dossier aux règles publiées d'une banque. La banque décide toujours elle-même.

## Accès

- **Une clé** se demande auprès d'ADM. Vous la transmettez dans l'en-tête `X-Api-Key` de chaque appel. Nous ne conservons
  qu'une empreinte de la clé : une clé perdue ne peut pas être retrouvée ; nous la révoquons et en émettons une nouvelle.
- **Vos clients** : chacun de vos clients a chez vous sa propre référence (`klantRef`). ADM la lie une fois à un client
  dans CrediMatch.
- **La limite** est de 60 appels par minute et par clé.
- **La description complète**, lisible par l'humain et la machine, se trouve dans l'application sur `/scalar` (et en
  OpenAPI sur `/openapi/v1.json`).

## Les appels

| Appel | Ce qu'il fait |
|---|---|
| `PUT /api/v1/klanten/{klantRef}/kantoren/{kantoorRef}` | Inscrit un bureau de votre client, ou le met à jour. Le même appel deux fois donne le même bureau. |
| `POST /api/v1/prescoring` | Confronte un dossier d'un bureau inscrit à une ou plusieurs banques. |
| `GET /api/v1/banken` | Les banques avec leurs règles en vigueur, leur date de vérification et leurs variantes. |
| `GET /api/v1/woordenlijst` | Toutes les données d'un dossier : code, type, niveau et libellé en NL et en FR. |
| `PUT /api/v1/klanten/{klantRef}/kantoren/{kantoorRef}/dossiers/{dossierRef}` | Enregistre un dossier dans CrediMatch, ou le met à jour. **Encore fermé** (voir ci-dessous). |
| `GET` à la même adresse | Le dossier enregistré, avec les simulations faites dans CrediMatch. **Encore fermé.** |

### Inscrire un bureau

Un bureau ne calcule qu'après son inscription. Faites-la par exemple lorsque votre client active CrediMatch.

```http
PUT /api/v1/klanten/hw-001/kantoren/kantoor-7
X-Api-Key: votre-clé
Content-Type: application/json

{ "naam": "Bureau Anvers" }
```

Vous recevez `201` pour un nouveau bureau et `200` s'il existait déjà.

### Demander un pré-scoring

```http
POST /api/v1/prescoring
X-Api-Key: votre-clé
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

- Les codes du dossier sont celles de `GET /api/v1/woordenlijst`.
- **Une donnée que vous ne connaissez pas, vous l'omettez.** Ce n'est pas une erreur : la banque reçoit alors le résultat
  *niet volledig getoetst* (pas entièrement vérifié), avec la raison.
- Sans `toetsdatum`, CrediMatch vérifie à la date du jour. Sans `banken`, il vérifie auprès de toutes les banques que votre
  client a activées.

### La réponse

Par banque :

| Champ | Ce que c'est |
|---|---|
| `oordeel` | `positief`, `positief onder voorwaarden`, `menselijk oordeel`, `niet volledig getoetst` ou `weigering` |
| `regelsVanHetOordeel` | les règles qui déterminent le résultat |
| `regels` | chaque règle, avec son `stand` (p. ex. `voldaan`, `overtreden`, `onbekend`), son `niveau`, les `redenen` sous forme de code, et la phrase dans `spoorNl` et `spoorFr` |
| `kerncijfers` | les chiffres calculés par la banque, comme le taux d'endettement et la quotité |
| `regelversie` et `nagekekenTot` | la version des règles utilisée, et leur date de vérification |

S'y ajoutent les **versions** (le moteur et les paramètres de votre client), les banques que votre client a **désactivées**,
et l'**entrée** telle que CrediMatch l'a lue, pour que vous puissiez relire un résultat plus tard. Décidez toujours sur les
codes ; les phrases servent à l'affichage.

### Enregistrer un dossier

!!! warning "Encore fermé"
    CrediMatch n'accepte des dossiers qu'une fois les accords sur les données personnelles finalisés. D'ici là, ces deux
    appels renvoient `403 dossier_api_dicht`. Le calcul avec `POST /api/v1/prescoring` reste possible : il n'enregistre
    rien.

Avec un dossier enregistré, le courtier peut faire des simulations dans CrediMatch, et vous les relisez.

```http
PUT /api/v1/klanten/hw-001/kantoren/kantoor-7/dossiers/dossier-1234
X-Api-Key: votre-clé
Content-Type: application/json

{
  "omschrijving": "Achat habitation",
  "dossier": { "dossier": {}, "kredietnemers": [], "panden": [], "schijven": [], "lasten": [] }
}
```

- `dossierRef` est votre propre référence. Le même appel deux fois donne le même dossier : `201` la première fois, ensuite
  `200`. Le dossier est au format du vocabulaire, comme pour le pré-scoring.
- Ne mettez **aucune donnée personnelle** dans la description (`omschrijving`). Sans description, le dossier s'appelle
  « Dossier » suivi de votre référence.
- Vous êtes le seul à modifier le dossier : dans CrediMatch, il est en lecture seule. Un dossier ne change pas de bureau.
- `GET` à la même adresse renvoie le dossier avec ses `simulaties` : pour chaque simulation la banque, le montant, la
  durée, le résultat et l'`uitkomst` complète, au même format qu'un résultat du pré-scoring.

## Erreurs

Chaque erreur a un `code` fixe et un `melding` (message) ; pour un `400`, aussi la liste de tous les problèmes à la fois.

| Statut | Code | Quand |
|---|---|---|
| 400 | `vraag_ongeldig` | un code inconnu, un mauvais type, une banque ou variante inconnue |
| 401 | `sleutel_ongeldig` | pas de clé, une clé inconnue ou révoquée |
| 403 | `kantoor_niet_aangemeld` | le bureau n'a pas été inscrit par vous |
| 403 | `dossier_api_dicht` | l'enregistrement de dossiers est encore fermé |
| 404 | `klant_niet_gekoppeld` | votre `klantRef` n'est pas encore liée à un client chez CrediMatch |
| 404 | `dossier_onbekend` | aucun dossier avec ce `dossierRef` sous ce bureau |
| 409 | `dossier_ander_kantoor` | le dossier figure sous un autre bureau ; il ne change pas de bureau |
| 409 | `dossier_gearchiveerd` | le dossier est dans la corbeille de CrediMatch |
| 429 | `te_veel_oproepen` | plus de 60 appels en une minute avec cette clé |
