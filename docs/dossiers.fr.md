---
description: "Dossiers dans CrediMatch : remplir un dossier de crédit par étapes, le vérifier auprès des banques (pré-scoring) et enregistrer des simulations."
---

# Dossiers

Sur cet écran, vous gérez les dossiers de crédit de vos bureaux. Vous remplissez un dossier par étapes, dans l'ordre d'un
entretien avec le client, et vous le vérifiez auprès des banques : le pré-scoring. Chaque vérification peut être
enregistrée comme simulation, avec un montant et une durée propres.

!!! note "Environnement d'essai"
    Travaillez uniquement avec des données fictives. Les vrais dossiers ne seront possibles qu'une fois les accords sur
    les données personnelles finalisés.

<!-- AFBEELDING: la liste Dossiers avec un dossier fictif, avec les colonnes #, Description, Bureau, Simulations et Mis à jour -->

## Ouvrir l'écran

Dans le menu, cliquez sur **Dossiers**. Vous voyez les dossiers des bureaux que vous pouvez voir (voir
[Bureaux](kantoren.md)).

## La liste

| Colonne | Ce que c'est |
|---|---|
| # | le numéro d'ordre du dossier dans votre organisation |
| Description | par exemple le nom du client et l'objet |
| Bureau | le bureau auquel appartient le dossier |
| Simulations | le nombre de simulations enregistrées |
| Mis à jour | la date du dernier enregistrement du dossier |

Cliquez sur une ligne pour ouvrir le dossier.

## Créer un dossier

1. Cliquez sur **Nouveau dossier**.
2. Choisissez le **Bureau**. Si vous n'avez qu'un seul bureau, il est déjà choisi.
3. Saisissez une **Description**, par exemple le nom du client et l'objet.
4. Cliquez sur **Créer**. Le dossier s'ouvre aussitôt.

## Le dossier par étapes

Le dossier compte sept onglets, dans l'ordre d'un entretien avec le client :

| Étape | Ce que vous y remplissez |
|---|---|
| 1. Objet | ce que le client veut faire, son ménage, et la date d'introduction |
| 2. Demandeurs | pour chaque demandeur, son nom et ses coordonnées, son emploi et ses revenus |
| 3. Antécédents et charges | un enregistrement à la Banque nationale, et les crédits en cours |
| 4. Garanties | les biens : le bien financé et ce qui est donné en garantie |
| 5. Plan financier | les travaux, les frais, les fonds propres, la durée, le taux et le crédit demandé en tranches |
| 6. Particularités | ce qu'une banque ne demande que dans un cas particulier : un refinancement ou une expertise |
| 7. Pré-scoring et simulations | vérifier par banque, et enregistrer des simulations |

Vous ajoutez un demandeur, un crédit en cours, un bien ou une tranche avec le bouton sous l'étape (par exemple **Ajouter
un demandeur** ou **Ajouter une tranche**). Vous en retirez un avec **Supprimer** en haut de sa carte.

<!-- AFBEELDING: l'étape Plan financier avec une tranche et l'aperçu en dessous -->

### Ce que vous ne savez pas, laissez-le vide

Un champ vide signifie **non connu**. Le pré-scoring indique alors la donnée manquante, au lieu de deviner.

- Pour une question **oui/non**, choisissez **oui** ou **non**. Vide signifie *non connu*, pas *non*.
- Un montant nul se saisit **0**. S'il n'y a pas de travaux, saisissez **0** aux travaux : vide signifie que les
  travaux ne sont pas connus.

### L'aperçu du plan financier

Sous l'étape **Plan financier** figure un aperçu : le prix d'achat des biens, les travaux, les frais d'acquisition, le
total du projet, le crédit demandé (la somme des tranches) et l'apport propre (la différence). C'est un contrôle. La
quotité et le taux d'endettement sont calculés par chaque banque à sa façon : vous les voyez au pré-scoring.

### Enregistrer

Cliquez en bas sur **Enregistrer**. Ce que vous saisissez n'est enregistré qu'au moment où vous cliquez sur
**Enregistrer**. Si vous quittez le dossier avec des modifications non enregistrées, l'écran vous demande d'abord si vous
voulez vraiment partir.

## Pré-scoring et simulations

1. Ouvrez l'étape **7. Pré-scoring et simulations**.
2. Vérifiez le **Montant** et la **Durée (années)**. Ils reprennent le crédit demandé et la durée du dossier ; vous
   pouvez vérifier un autre montant ou une autre durée.
3. Choisissez éventuellement une autre **Date de test**, ou une autre variante pour une banque.
4. Cliquez sur **Pré-scoring**.

Pour chaque banque, vous voyez le résultat, la version des règles et la date jusqu'à laquelle elles sont vérifiées, ainsi
que les règles qui pèsent sur le résultat, avec la raison.

| Résultat | Ce que cela signifie |
|---|---|
| positif | aucune règle ne bloque le dossier |
| positif sous conditions | c'est possible, sous une condition indiquée à la règle |
| appréciation humaine | la banque juge elle-même ce cas : ses règles le laissent ouvert ou n'en disent rien |
| pas entièrement vérifié | il manque une donnée, ou quelque chose que CrediMatch ne peut pas vérifier : la raison est indiquée |
| refus | une règle de la banque exclut le dossier |

Le calcul n'enregistre rien et ne modifie pas le dossier. Un pré-scoring est une indication : la banque décide.

### Enregistrer une simulation

Pour une banque, cliquez sur **Enregistrer comme simulation**. La simulation apparaît dans le tableau **Simulations
enregistrées**, avec son propre montant et sa propre durée, le résultat, la version des règles, et la date et l'auteur de
l'enregistrement. Vous pouvez ainsi faire varier le montant ou la durée jusqu'à ce que cela passe, sans modifier le
dossier lui-même.

Une banque que votre organisation a désactivée (voir [Banques](banken.md)) n'est pas vérifiée. Elle figure en bas sous
**Désactivées par votre organisation**.

<!-- AFBEELDING: l'étape Pré-scoring et simulations avec le résultat d'une banque et deux simulations enregistrées -->

## Erreurs fréquentes

!!! warning "Presque chaque règle donne pas entièrement vérifié"
    Il manque une donnée dont la banque a besoin, souvent la **date d'introduction** (étape 1) ou la date de naissance
    d'un demandeur. La raison de chaque règle indique la donnée manquante. Complétez-la, cliquez sur **Enregistrer** et
    vérifiez à nouveau.

!!! warning "Le dossier d'un collègue n'apparaît pas dans la liste"
    Vous ne voyez que les dossiers des bureaux que vous pouvez voir. Demandez à l'administrateur de votre organisation de
    vous ajouter à ce bureau (voir [Bureaux](kantoren.md)).

!!! warning "Une banque manque au pré-scoring"
    Votre organisation l'a désactivée. Vous le voyez sous **Organisation** > **Banques**.

## Voir aussi

- [Bureaux](kantoren.md)
- [Banques](banken.md)
