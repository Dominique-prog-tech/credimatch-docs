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

En haut figure la **barre des étapes**, avec sept étapes dans l'ordre d'un entretien avec le client. Avec **Suivant** et
**Précédent** en bas, vous avancez étape par étape. Vous pouvez aussi sauter : cliquez sur une étape dans la barre, par
exemple pour revenir aux demandeurs si le client avait oublié quelque chose.

| Étape | Ce que vous y remplissez |
|---|---|
| 1. Objet | ce que le client veut faire, son ménage, et la date d'introduction (aujourd'hui pour un nouveau dossier) |
| 2. Demandeurs | pour chaque demandeur, son nom et ses coordonnées, son emploi et ses revenus |
| 3. Antécédents et charges | un enregistrement à la Banque nationale, et les crédits en cours |
| 4. Garanties | les biens : le bien financé et ce qui est donné en garantie |
| 5. Plan financier | les travaux, les frais, les fonds propres, la durée, le taux et le crédit demandé en tranches |
| 6. Particularités | ce qu'une banque ne demande que dans un cas particulier : un refinancement ou une expertise |
| 7. Pré-scoring | vérifier par banque, et enregistrer des simulations |

### Ce que la barre des étapes vous indique

Chaque étape de la barre montre s'il manque encore quelque chose aux banques :

| Vous voyez | Ce que cela signifie |
|---|---|
| une coche verte | aucune banque ne demande encore une donnée de cette étape |
| un nombre orange | le nombre de données de cette étape qu'une banque demande encore |
| seulement le numéro | rien n'a encore été vérifié, par exemple parce qu'aucune banque n'est active pour votre organisation |

Pour cela, CrediMatch vérifie le dossier tel qu'il est à ce moment, avec le crédit demandé et la durée du dossier : à
l'ouverture et chaque fois que le dossier est enregistré. Cette vérification n'enregistre rien. Une coche indique
seulement qu'aucune banque ne demande encore rien. Elle ne signifie pas que chaque champ de l'étape est rempli.

### À droite : le dossier en chiffres

À côté de chaque étape, vous voyez le dossier en chiffres : le crédit demandé (la somme des tranches) avec la durée et le
taux, le total du projet, l'apport propre, le nombre de demandeurs avec leur revenu net ensemble, et le bien. En
dessous figurent le résultat par banque, et la liste **Encore … données nécessaires** avec un bouton vers l'étape où vous
saisissez chaque donnée. Si un montant n'est pas encore saisi, un tiret apparaît et l'écran indique quel montant manque.

Vous ajoutez un demandeur, un crédit en cours, un bien ou une tranche avec le bouton sous l'étape (par exemple **Ajouter
un demandeur** ou **Ajouter une tranche**). Vous en retirez un avec **Supprimer** en haut de sa carte.

<!-- AFBEELDING: la barre des étapes avec des coches et des nombres orange, l'étape Objet avec les cartes, et à droite le dossier en chiffres -->

### Ce que vous ne savez pas, laissez-le vide

Un champ vide signifie **non connu**. Le pré-scoring indique alors la donnée manquante, au lieu de deviner.

- Pour une question **oui/non**, trois boutons figurent côte à côte : **Oui**, **Non** et **Non connu**. *Non connu*
  est autre chose que *Non* : le pré-scoring le signale comme manquant.
- Une liste courte, comme la situation familiale ou le groupe cible, se choisit aussi avec des boutons, avec **Non
  connu** en plus.
- L'**objet** se choisit avec une carte, par exemple **Achat avec travaux**. Si vous cliquez encore sur la carte choisie,
  l'objet redevient *non connu*.
- Un montant nul se saisit **0**. S'il n'y a pas de travaux, saisissez **0** aux travaux : vide signifie que les
  travaux ne sont pas connus. C'est aussi indiqué sous le champ.

### L'aperçu du plan financier

Sous l'étape **Plan financier** figure un aperçu : le prix d'achat des biens, les travaux, les frais d'acquisition, le
total du projet, le crédit demandé (la somme des tranches) et l'apport propre (la différence). C'est un contrôle. Un
montant qui n'est pas encore saisi apparaît comme un tiret : sans tous les montants, il n'y a pas de total, et l'écran
indique quel montant manque. La quotité et le taux d'endettement sont calculés par chaque banque à sa façon : vous les
voyez au pré-scoring.

### Enregistrer

Le dossier est enregistré chaque fois que vous passez à une autre étape : avec **Suivant**, avec **Précédent** ou en
cliquant sur la barre des étapes. En bas, vous voyez l'heure du dernier enregistrement. Si vous voulez rester sur une
étape, cliquez sur **Enregistrer**.

Si l'enregistrement échoue, par exemple parce que la description est vide, vous passez quand même à l'étape choisie. Ce
que vous avez saisi reste, et le message reste en haut jusqu'à ce que l'enregistrement réussisse. Si vous quittez le
dossier avec des modifications non enregistrées, l'écran vous demande d'abord si vous voulez vraiment partir.

## Pré-scoring et simulations

1. Ouvrez l'étape **7. Pré-scoring**.
2. Vérifiez le **Montant** et la **Durée (années)**. Ils reprennent le crédit demandé et la durée du dossier ; vous
   pouvez vérifier un autre montant ou une autre durée.
3. Choisissez éventuellement une autre **Date de test**, ou une autre variante pour une banque.
4. Cliquez sur **Pré-scoring**.

Chaque banque reçoit une carte ; les banques figurent côte à côte, pour que vous puissiez les comparer. Sur chaque carte :

- le **résultat**, en grand en haut, avec la version des règles et la date jusqu'à laquelle elles sont vérifiées ;
- trois chiffres clés, tels que cette banque les calcule : la **quotité**, le **taux d'endettement** et le **solde après
  toutes les charges**, avec le minimum vital en dessous. Si la banque ne peut pas encore calculer un chiffre, un tiret
  apparaît avec une raison courte, et la partie déjà connue. L'explication complète figure sous **Ce qui pèse sur le
  résultat** ;
- s'il manque des données, la liste **Ces données manquent**, chaque donnée une seule fois, avec un bouton **vers
  l'étape …** qui ouvre la bonne étape. S'il y en a beaucoup, vous voyez les six premières ; les autres s'ouvrent avec
  **Afficher les … autres** ;
- **Ce qui pèse sur le résultat** : cliquez dessus pour voir les règles qui pèsent sur le résultat, avec la raison.

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

<!-- AFBEELDING: l'étape Pré-scoring avec deux banques côte à côte et deux simulations enregistrées -->

## Erreurs fréquentes

!!! warning "Presque chaque règle donne pas entièrement vérifié"
    Il manque une donnée dont la banque a besoin, par exemple la date de naissance d'un demandeur. La liste **Ces données
    manquent** indique lesquelles. Cliquez sur **vers l'étape …** et complétez-les. Revenez ensuite à l'étape
    **Pré-scoring** et cliquez à nouveau sur **Pré-scoring** : la barre des étapes montre déjà quelles étapes manquent
    encore de quelque chose.

!!! warning "Le dossier d'un collègue n'apparaît pas dans la liste"
    Vous ne voyez que les dossiers des bureaux que vous pouvez voir. Demandez à l'administrateur de votre organisation de
    vous ajouter à ce bureau (voir [Bureaux](kantoren.md)).

!!! warning "Une banque manque au pré-scoring"
    Votre organisation l'a désactivée. Vous le voyez sous **Organisation** > **Banques**.

## Voir aussi

- [Bureaux](kantoren.md)
- [Banques](banken.md)
