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

!!! note "Dossiers d'exemple"
    Un dossier dont la description commence par **Fictief voorbeeld** a été préparé par ADM pour que vous puissiez essayer, avec une
    simulation par banque. Vous pouvez y travailler comme avec n'importe quel autre dossier.

![La liste Dossiers avec les filtres Afficher et Bureau, et les colonnes Description, Bureau, Simulations et Mis à jour](images/dossiers-lijst-fr.png "La liste Dossiers")

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

Au-dessus de la liste, vous choisissez ce que vous voulez voir :

- **Afficher :** *Tous les dossiers ouverts*, *Nouveaux ce mois-ci*, *Avec des données manquantes* ou *Positif auprès d'au moins
  une banque*. Ce sont les mêmes dossiers que derrière les tuiles du [Tableau de bord](dashboard.md). Avec *Avec des données
  manquantes*, une colonne **Données nécessaires** s'ajoute, avec le nombre de données que les banques demandent encore.
- **Bureau :** n'apparaît que si vous voyez plus d'un bureau.

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
| 5. Plan financier | les travaux, les frais, les fonds propres, la durée, le taux et le crédit demandé en tranches. Si vous laissez le taux vide, chaque banque calcule avec son propre tarif |
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

![Un dossier avec la barre d'étapes, l'étape Objet avec les cartes de choix, et à droite Le dossier en chiffres](images/dossier-stappen-fr.png "Le dossier par étapes"){ .volle-breedte }

### Ce que vous ne savez pas, laissez-le vide

Un champ vide signifie **non connu**. Le pré-scoring indique alors la donnée manquante, au lieu de deviner.

- Pour une question **oui/non**, trois boutons figurent côte à côte : **Oui**, **Non** et **Non connu**. *Non connu*
  est autre chose que *Non* : le pré-scoring le signale comme manquant.
- Une liste courte, comme la situation familiale ou le groupe cible, se choisit aussi avec des boutons, avec **Non
  connu** en plus.
- L'**objet** se choisit avec une carte, par exemple **Achat avec travaux**. Si vous cliquez encore sur la carte choisie,
  l'objet redevient *non connu*.
- Un champ où vous pouvez indiquer plusieurs choix, comme les **caractéristiques du bien**, a deux boutons en dessous : **Aucun**
  si aucun choix ne s'applique, et **Non connu** si vous ne le savez pas encore. Le pré-scoring signale *Non connu* comme
  manquant, pas *Aucun*.
- Un montant nul se saisit **0**. S'il n'y a pas de travaux, saisissez **0** aux travaux : vide signifie que les
  travaux ne sont pas connus. C'est aussi indiqué sous le champ.

### L'aperçu du plan financier

Sous l'étape **Plan financier** figure un aperçu : le prix d'achat des biens, les travaux, les frais d'acquisition, le
total du projet, le crédit demandé (la somme des tranches) et l'apport propre (la différence). C'est un contrôle. Un
montant qui n'est pas encore saisi apparaît comme un tiret : sans tous les montants, il n'y a pas de total, et l'écran
indique quel montant manque. La quotité et le taux d'endettement sont calculés par chaque banque à sa façon : vous les
voyez au pré-scoring.

### Supprimer un dossier

Cliquez à droite dans le dossier sur **Supprimer le dossier** et confirmez. Le dossier va à la [Corbeille](prullenbak.md), avec ses
simulations. Il ne figure alors plus dans **Dossiers**, dans **Simulations** ni sur le tableau de bord. Avec **Restaurer**, vous le
remettez, avec ses simulations. Un dossier provenant d'un autre logiciel est ici en lecture seule et n'a pas ce bouton.

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
- le **taux** de cette banque, avec la mensualité et vos choix (voir [Le taux par banque](#le-taux-par-banque)) ;
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

### Le taux par banque

Chaque banque vérifie avec son propre taux, issu de son tarif en vigueur à la **Date de test**. Les banques gèrent elles-mêmes leurs tarifs et les
modifient souvent : la même vérification peut donner un autre taux la semaine prochaine.

!!! note "Taux fictifs"
    Les taux, les réductions et les noms sur les images de ce manuel sont inventés. Les tarifs des banques ne sont visibles que dans
    CrediMatch, après la connexion.

Sur la carte d'une banque :

- **Taux selon le tarif …** : le taux, avec la formule et la durée en dessous, et depuis quand ce tarif est en vigueur. S'il y a des conditions, le taux sans ces conditions figure aussi ;
- **Première mensualité**, pour un taux variable aussi **Mensualité au taux maximal**, et les **Frais de dossier** si la banque les mentionne ;
- **Comment ce taux est composé** : cliquez dessus pour voir le taux de base, les réductions et les majorations ;
- **Formule** : la formule qui correspond au type de taux du dossier. Vous pouvez en choisir une autre. Si aucune ne correspond, un trait figure à côté du taux et la carte demande d'en choisir une. Cela ne compte pas comme une donnée manquante ;
- **Réduction commerciale** : la réduction définie par votre organisation (voir [Banques](banken.md)). Vous choisissez dans la limite du plafond ; si vous ne choisissez rien, le standard s'applique ;
- les **conditions** de la banque, par exemple un compte à vue ou une assurance : elles sont cochées, et vous décochez ce que votre client ne prend pas. Le taux est recalculé aussitôt.

CrediMatch retient ce que vous choisissez. La formule, la réduction et les conditions restent par banque dans le dossier : si vous le rouvrez plus tard, la carte calcule immédiatement avec votre choix, et le tableau de bord en tient compte. Les données du dossier et sa date de mise à jour n'en sont pas modifiées.

Ce qui découle du dossier, comme la quotité et la performance énergétique, vous ne le choisissez pas : la carte en tient compte. CrediMatch n'affiche pas de TAEG : il figure dans l'ESIS de la banque.

Ce qui peut figurer sur la carte à la place du tarif :

| Vous voyez | Ce que cela signifie |
|---|---|
| **Taux propre du dossier** | un taux figure à l'étape 5. Il l'emporte, pour chaque banque. La carte indique aussi ce que le tarif donnerait. Laissez le taux vide pour calculer avec le tarif |
| un trait et *Aucun tarif* | la banque n'a pas de tarif à la date de test. Saisissez un taux à l'étape 5, ou choisissez une autre date |
| un trait et *La quotité n'est pas connue* | le taux dépend de la quotité. Complétez d'abord les données qui manquent en dessous |
| un trait pour une formule choisie auparavant | le tarif en vigueur ne connaît plus cette formule. Choisissez-en une autre |

### Enregistrer une simulation

Pour une banque, cliquez sur **Enregistrer comme simulation**. La simulation apparaît dans le tableau **Simulations
enregistrées**, avec son propre montant et sa propre durée, le résultat, le taux avec la formule et la mensualité, et la date de
l'enregistrement. La variante, la version du tarif et des règles, et l'auteur s'affichent avec le choix des colonnes. Vous pouvez ainsi faire varier le montant ou la durée jusqu'à ce que cela passe, sans modifier le
dossier lui-même.

Une banque que votre organisation a désactivée (voir [Banques](banken.md)) n'est pas vérifiée. Elle figure en bas sous
**Désactivées par votre organisation**.

![L'étape Pré-scoring avec les banques Elantis et Record Credits côte à côte, chacune avec son résultat et ses chiffres clés, et en dessous Simulations enregistrées](images/dossier-prescoring-fr.png "Le pré-scoring par banque"){ .volle-breedte }

Toutes les simulations enregistrées de vos bureaux figurent ensemble sur l'écran [Simulations](simulaties.md).

## Erreurs fréquentes

!!! warning "Presque chaque règle donne pas entièrement vérifié"
    Il manque une donnée dont la banque a besoin, par exemple la date de naissance d'un demandeur. La liste **Ces données
    manquent** indique lesquelles. Cliquez sur **vers l'étape …** et complétez-les. Revenez ensuite à l'étape
    **Pré-scoring** et cliquez à nouveau sur **Pré-scoring** : la barre des étapes montre déjà quelles étapes manquent
    encore de quelque chose.

!!! warning "Toutes les banques affichent le même taux"
    Un taux figure à l'étape 5 : il l'emporte pour chaque banque. Videz-le pour calculer avec le tarif de chaque banque.

!!! warning "Le dossier d'un collègue n'apparaît pas dans la liste"
    Vous ne voyez que les dossiers des bureaux que vous pouvez voir. Demandez à l'administrateur de votre organisation de
    vous ajouter à ce bureau (voir [Bureaux](kantoren.md)).

!!! warning "Une banque manque au pré-scoring"
    Votre organisation l'a désactivée. Vous le voyez sous **Organisation** > **Banques**.

## Voir aussi

- [Tableau de bord](dashboard.md)
- [Simulations](simulaties.md)
- [Bureaux](kantoren.md)
- [Banques](banken.md)
