---
description: "Rôles et droits dans CrediMatch : attribuer un ensemble de droits à des utilisateurs, comme Voir tous les bureaux pour le back-office."
---

# Rôles & droits

Un rôle est un ensemble de droits. Vous créez un rôle, choisissez les droits qui en font partie et l'attribuez à des
utilisateurs. Vous donnez ainsi par exemple au back-office le droit de voir tous les [bureaux](kantoren.md).

<!-- AFBEELDING: l'écran Rôles & droits avec le rôle Backoffice sélectionné, le droit Voir tous les bureaux coché et un utilisateur avec ce rôle -->

## Ouvrir l'écran

Dans le menu, sous **Organisation**, cliquez sur **Rôles**. Cet écran est destiné à l'administrateur de votre
organisation.

## Le rôle système

Le rôle **Tenant-beheerder** a toujours tous les droits, y compris ceux qui s'ajoutent plus tard. Vous ne pouvez ni le
supprimer ni modifier ses droits. Qui a ce rôle gère votre organisation dans CrediMatch.

## Créer un rôle

1. Sous **Rôles**, tapez le nom dans le champ **Nouveau rôle**, par exemple *Back-office*.
2. Cliquez sur **Ajouter**. Le rôle apparaît dans la liste et est aussitôt sélectionné.

## Les droits d'un rôle

1. Cliquez sur le rôle.
2. Dans la colonne **Droits**, cochez ce que le rôle permet.
3. Cliquez sur **Enregistrer les droits**. À côté du bouton apparaît **enregistré**.

| Droit | Ce qu'il donne |
|---|---|
| **Voir tous les bureaux** | tous les bureaux de votre organisation, y compris ceux auxquels l'utilisateur n'est pas rattaché |
| **Voir la corbeille** | ouvrir la [corbeille](prullenbak.md) |
| **Restaurer des enregistrements** | remettre un élément de la corbeille |

## Attribuer un rôle à des utilisateurs

Cliquez sur le rôle et cochez à droite, sous **Utilisateurs avec ce rôle**, les utilisateurs concernés. Décocher retire
le rôle. La modification s'applique immédiatement.

## Supprimer un rôle

Cliquez sur le rôle, puis sur **Supprimer le rôle**. Les utilisateurs qui l'avaient perdent les droits qu'il donnait.

## Erreurs fréquentes

!!! warning "Droits cochés mais pas enregistrés"
    Une coche dans la colonne **Droits** ne s'applique qu'après **Enregistrer les droits**. Les utilisateurs du rôle,
    eux, se cochent sans bouton d'enregistrement.
