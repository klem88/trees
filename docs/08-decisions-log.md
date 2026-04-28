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

### D-011 — Langue : français pour le contenu, anglais pour les identifiants techniques
**Date** : 2026-04-28
**Décision** : tout le contenu destiné à l'utilisateur est rédigé en français (questions de validation, feedback, légendes des croquis, prose des fiches espèces, descriptions des SVG, documentation du projet). L'anglais est réservé aux clés et identifiants techniques (`leaf-asymmetric-base`, `traitFrequencyInSpecies`, noms de fichiers, slugs JSON, commentaires de code).
**Raison** : cohérent avec le public cible (naturalistes francophones), avec l'existant du projet (fiches, questions, roadmap déjà en français), et avec les conventions habituelles des projets web où les clés sont en anglais pour la portabilité et la lisibilité technique.
**Conséquences** : toute nouvelle clé ou identifiant technique doit être en anglais, en `camelCase` ou `kebab-case`. Tout nouveau texte visible ou documentaire doit être en français. Pas de mélange dans un même champ (la valeur est en français, la clé est en anglais).

### D-012 — Champ `sources` par trait + catégorie `needle` + pin sylvestre comme pilote conifère
**Date** : 2026-04-28
**Décision** : trois ajouts au modèle de données et à la liste pilote.

1. **`sources` sur chaque `Trait`** (champ requis, enum) : liste des sources documentaires ayant servi à établir ce trait spécifiquement. Valeurs autorisées : `tela-botanica`, `flora-gallica`, `inpn`, `florealpes`, `coste`, `bonnier`, `delachaux-arbres`, `kohler-plates`, `thome-plates`, `wikimedia-commons`, `wikipedia`, `other`. Distinct du champ `sources` de l'espèce (texte libre, niveau fiche entière).

2. **Catégorie `needle`** ajoutée à l'enum `category` : couvre les aiguilles et feuilles aciculaires des conifères, non couvertes par les catégories foliaires existantes (`leaf-shape`, `leaf-margin`, etc.).

3. **Pin sylvestre (*Pinus sylvestris*)** ajouté comme 6e espèce pilote en phase 1.

**Raisons** :
- La traçabilité par trait (et non seulement par fiche) facilite la revue botaniste (on sait d'où vient chaque scoring) et permet de détecter les traits reposant sur une source unique.
- Sans `needle`, tous les traits des conifères tomberaient dans `other`, rendant l'analyse de couverture par catégorie peu fiable.
- Introduire un conifère dès la phase pilote valide que le schéma et la méthode fonctionnent au-delà des feuillus, avant de passer à l'échelle.

**Conséquences** : `sources` est requis dans le schéma JSON sur chaque trait (erreur de validation si absent). Toutes les fiches existantes et futures doivent le renseigner. La checklist de production (`09-methodology.md §8`) doit être mise à jour pour inclure la vérification du champ `sources` sur chaque trait.

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
