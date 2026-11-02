---
description: "Banques dans CrediMatch : choisir avec quelles compagnies votre organisation travaille, et jusqu'à quand leurs règles sont vérifiées."
---

# Banques

Sur cet écran, vous choisissez avec quelles compagnies votre organisation travaille, et quelle réduction commerciale vos courtiers
peuvent accorder. Une compagnie désactivée ne reçoit plus de pré-scoring ni de simulation. Les règles d'acceptation et les tarifs des
compagnies sont gérés par ADM.

![L'écran Banques avec Elantis et Record Credits cochées, la colonne Règles vérifiées jusqu'au, et la Réduction commerciale avec Standard et Plafond](images/banken-fr.png "L'écran Banques")

!!! note "Taux fictifs"
    Les taux, les réductions et les noms sur les images de ce manuel sont inventés. Les tarifs des banques ne sont visibles que dans
    CrediMatch, après la connexion.

## Ouvrir l'écran

Dans le menu, sous **Organisation**, cliquez sur **Banques**.

## La liste

| Colonne | Ce que c'est |
|---|---|
| Compagnie | le nom de la banque ou de l'assureur |
| Type | **Banque** ou **Assureur** |
| Règles vérifiées jusqu'au | la date des documents les plus récents de cette compagnie intégrés dans les règles |
| Actif | coché si votre organisation travaille avec cette compagnie |

Tant que votre organisation n'a rien choisi, tout est actif. En haut figure alors **Par défaut : tout est actif**.

## Activer ou désactiver une compagnie

L'administrateur de votre organisation peut le faire, ainsi que toute personne disposant du droit **Gérer les banques et
paramètres** (voir [Rôles & droits](rollen.md)).

1. Cochez les compagnies avec lesquelles votre organisation travaille, et décochez celles que vous n'utilisez pas.
2. Cliquez sur **Enregistrer**.

## La réduction commerciale

Pour chaque banque dont un tarif est en vigueur aujourd'hui, une ligne propose deux choix :

- **Standard** : la réduction qui s'applique si le courtier ne choisit rien ;
- **Plafond** : jusqu'où le courtier peut choisir par simulation, sur la carte de la banque (voir [Le taux par banque](dossiers.md#le-taux-par-banque)).

Vous choisissez un palier et non un pourcentage libre : les paliers et leur nom dépendent de la banque. Le montant provient du tarif en vigueur à ce moment.
**Aucune** signifie pas de réduction. Le standard ne peut pas dépasser le plafond. Si rien n'est défini, il n'y a pas de réduction et le courtier n'a rien à choisir.

La banque déduit cette réduction de votre commission. CrediMatch n'affiche ni n'enregistre de commission.

L'administrateur de votre organisation peut modifier ceci, ainsi que toute personne disposant du droit **Gérer les banques et paramètres**. Cliquez ensuite sur **Enregistrer**.

## Historique

Chaque modification reçoit un numéro, par exemple **Paramètres 3**. Sous **Historique**, vous voyez pour chaque numéro qui a
fait la modification, quand, ce qui était désactivé et quelle réduction s'appliquait. Un pré-scoring retient avec quel numéro il a été calculé, pour que
vous puissiez vérifier plus tard quelles compagnies étaient actives.

!!! note "Un pré-scoring est une indication"
    CrediMatch confronte un dossier aux règles publiées d'une compagnie. La compagnie décide toujours elle-même.
