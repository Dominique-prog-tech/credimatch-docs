---
description: "La durée de conservation dans CrediMatch : combien de temps votre organisation conserve un dossier, et quels dossiers ont dépassé cette durée."
---

# Durée de conservation

Sur cet écran, vous définissez combien de temps votre organisation conserve un dossier après la dernière activité. Une fois la durée dépassée, le dossier apparaît sur une liste et sur le tableau de bord. CrediMatch ne supprime rien automatiquement : c'est vous qui décidez de la suite.

!!! note "CrediMatch ne propose aucune durée"
    Votre organisation décide combien de temps elle conserve les données, de préférence avec un avis juridique. Tant que rien n'est saisi, il n'y a pas de durée, et aucun dossier n'est considéré comme dépassé.

## Ouvrir l'écran

Dans le menu, sous **Organisation**, cliquez sur **Durée de conservation**. Tout le monde voit la durée. Pour la modifier, vous avez besoin d'un droit de gestion (voir [Rôles & droits](rollen.md)).

## Définir la durée

| Ligne | Ce qu'elle fait |
|---|---|
| **Par défaut pour toute l'organisation** | le nombre de mois qui s'applique à chaque bureau sans durée propre |
| Un bureau | un nombre de mois propre à ce bureau. Si vous le laissez vide, celle de l'organisation s'applique |

Saisissez un nombre de mois et cliquez sur **Enregistrer**. La colonne **Ce qui s'applique** affiche ce qui vaut alors. Vous ne voyez que les bureaux que vous pouvez voir.

## À partir de quand la durée compte

La durée compte à partir de la dernière activité sur le dossier, soit la plus récente de ces trois :

- la dernière modification des données ;
- la dernière simulation enregistrée ;
- le dernier document chargé. Un document que vous avez supprimé ne compte pas.

Ouvrir un dossier ou passer d'une étape à l'autre ne prolonge donc pas la durée.

Sur la fiche d'un dossier, vous voyez à droite jusqu'à quand il est conservé. Ce que vous y [prolongez](dossiers.md#la-duree-de-conservation-dun-dossier) prime sur cette durée.

## Quels dossiers ont dépassé la durée

Vous les trouvez à deux endroits :

- la tuile **au-delà de la durée de conservation** sur le [tableau de bord](dashboard.md) ;
- sous [Dossiers](dossiers.md), avec *Durée de conservation dépassée* dans le choix **Afficher**.

Le dernier jour compte encore : le dossier n'a dépassé la durée que le lendemain. Le dossier à la date la plus ancienne figure en haut. Sur cette liste, vous pouvez aussi [supprimer définitivement](dossiers.md#supprimer-definitivement-un-dossier) un dossier.

Un dossier qui se trouve depuis 30 jours dans la [Corbeille](prullenbak.md) apparaît aussi sur cette liste, même sans durée définie. Si vous cliquez sur cette ligne, la corbeille s'ouvre.

## Erreurs fréquentes

!!! warning "Une tuile vide n'est pas une bonne nouvelle"
    Si la tuile indique *pas encore de durée définie*, rien n'a été mesuré. Si elle indique par exemple *3 sans durée*, ces 3 dossiers ne sont pas comptés, car leur bureau n'a pas de durée.

## Voir aussi

- [Dossiers](dossiers.md)
- [Tableau de bord](dashboard.md)
- [Corbeille](prullenbak.md)
