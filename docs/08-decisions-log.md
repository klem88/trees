# 08 — Journal des décisions

> Consigne ici les décisions structurantes prises au cours du projet, avec leur contexte et leur date. Format inspiré des ADR (Architecture Decision Records) mais allégé.

## Décisions prises lors du cadrage initial

### D-001 — Périmètre v1 : arbres uniquement
**Date** : phase de cadrage
**Décision** : se limiter aux arbres de France métropolitaine pour la v1 (30 à 50 espèces).
**Raison** : périmètre tractable, traits visibles plus contrastés que sur les herbacées, intérêt pédagogique fort, permet de valider la méthode avant d'élargir.
**Conséquences** : pas d'arbustes, pas d'herbacées, pas de fougères. Le mode "exploration libre" sera limité aux espèces couvertes.

### D-002 — Plateforme : Progressive Web App
**Date** : phase de cadrage
**Décision** : développer en PWA plutôt qu'en application native.
**Raison** : cross-platform avec une seule base, pas de store, mises à jour instantanées, mode hors ligne possible, friction d'installation minimale.
**Conséquences** : limitations natives mineures (accès caméra OK en PWA moderne). Pas de présence dans les stores, ce qui est un trade-off assumé en v1.

### D-003 — Mode hors ligne partiel
**Date** : phase de cadrage
**Décision** : le mode hors ligne couvre le carnet et l'exploration libre des espèces, mais pas la phase d'identification PlantNet.
**Raison** : PlantNet est une API distante, pas reproductible localement. Sortir l'identification du périmètre offline simplifie drastiquement.
**Conséquences** : message clair en cas de coupure réseau pendant l'identification. La capture différée (prendre photo hors ligne, envoyer au retour) est reportée post-v1.

### D-004 — Stockage des données : JSON statique
**Date** : phase de cadrage
**Décision** : les fiches espèces et leurs traits sont stockés en JSON dans le repo, sans base de données.
**Raison** : volumétrie faible (50 fiches), pas de mises à jour fréquentes, déploiement simplifié, versionnable en Git.
**Conséquences** : toute modification de contenu passe par un commit. À reconsidérer si on évolue vers un modèle contributif communautaire.

### D-005 — Carnet utilisateur en local uniquement
**Date** : phase de cadrage
**Décision** : le carnet personnel est stocké côté client (localStorage / IndexedDB), pas de compte utilisateur en v1.
**Raison** : pas de RGPD à gérer, pas de backend, aligne avec le positionnement "pas de tracking".
**Conséquences** : pas de synchronisation multi-appareils. Risque de perte si l'utilisateur efface ses données navigateur. Prévoir un export en post-v1.

### D-006 — Stratégie de validation : espèce par espèce, fallback ordonné
**Date** : phase de cadrage
**Décision** : on valide l'espèce 1 de PlantNet avec ses traits signature ; si non, on passe à l'espèce 2 avec ses propres traits, etc.
**Raison** : approche simple à implémenter, pédagogiquement claire (l'utilisateur apprend les traits signature de chaque espèce). Évite la complexité d'une matrice discriminante précalculée.
**Conséquences** : peut poser des questions redondantes entre espèces voisines. Améliorable en post-v1 par une approche "matrice discriminante".

### D-007 — Réponses possibles : oui / non / je ne sais pas
**Date** : phase de cadrage
**Décision** : trois options de réponse plutôt que oui/non binaire.
**Raison** : le "je ne sais pas" évite de forcer une réponse erronée et ouvre la porte à une aide pédagogique enrichie.
**Conséquences** : logique de moteur légèrement plus complexe (gérer le cas neutre). Améliore l'expérience pour les débutants.

### D-008 — 3 à 5 traits par espèce
**Date** : phase de cadrage
**Décision** : chaque fiche espèce contient entre 3 et 5 traits ordonnés.
**Raison** : compromis entre robustesse de validation (au moins 3) et lassitude de l'utilisateur (pas plus de 5).
**Conséquences** : impose une discipline de hiérarchisation forte sur le choix des traits.

### D-009 — Validation botaniste obligatoire
**Date** : phase de cadrage
**Décision** : aucune fiche n'est intégrée sans validation par un botaniste.
**Raison** : l'enjeu est la justesse, pas la quantité. Une seule erreur botanique mine la confiance dans toute l'app.
**Conséquences** : la disponibilité du botaniste devient un facteur clé du planning. Prévoir des sessions groupées.

### D-010 — Pas de génération IA brute pour les croquis
**Date** : phase de cadrage
**Décision** : les croquis ne sont pas générés en l'état par IA. L'IA peut servir de brouillon ou d'inspiration, mais l'œuvre finale est produite manuellement et validée botaniquement.
**Raison** : les outils actuels d'image générative produisent des inexactitudes anatomiques inacceptables pour un usage pédagogique.
**Conséquences** : charge iconographique réelle à anticiper (~120 à 150 croquis pour la v1).

## Décisions à prendre

### Q-001 — Choix du framework frontend
**Statut** : ouvert
**Options** : Svelte/SvelteKit, Vue 3, React, Solid
**À trancher** : au démarrage de la phase 2 (prototype technique)
**Critères** : taille du bundle, expérience du dev, qualité de l'écosystème PWA

### Q-002 — Gestion de la clé API PlantNet
**Statut** : ouvert
**Options** :
- (a) Clé publique exposée côté client, quotas assumés
- (b) Proxy minimal côté serveur (Cloudflare Worker, fonction serverless) pour cacher la clé
**À trancher** : avant la phase 2
**Critères** : politique de quotas PlantNet, simplicité d'hébergement, coût

### Q-003 — Stockage des photos du carnet
**Statut** : ouvert
**Options** :
- (a) Compresser et stocker en base64 dans localStorage (~5 Mo limite)
- (b) IndexedDB (plus de capacité, plus complexe)
- (c) Pas de stockage de photo en v1, juste un référence à l'espèce
**À trancher** : phase 5
**Critères** : capacité, complexité, valeur émotionnelle pour l'utilisateur

### Q-004 — Liste finale des espèces v1
**Statut** : ouvert (liste indicative dans `05-content-guide.md`)
**À trancher** : début phase 4, en concertation avec le botaniste

### Q-005 — Style graphique des croquis
**Statut** : ouvert
**À trancher** : phase 1, sur les espèces pilotes
**Critères** : lisibilité, cohérence sur 200 illustrations, faisabilité de production

### Q-006 — Nom définitif de l'application
**Statut** : ouvert (nom de travail : "Arbres-ID")
**À trancher** : avant la phase 5
**Pistes à explorer** : nom évocateur, francophone, court, mémorable, qui dit "apprendre" autant qu'"identifier"
