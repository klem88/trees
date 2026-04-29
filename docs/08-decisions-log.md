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

## Décisions prises pendant le proto (avril 2026)

### D-013 — `label`, `discriminantPower`, `sketchCaption` ajoutés au schéma de trait
**Date** : 2026-04-28
**Décision** : ajouter trois champs au `Trait` du schéma JSON :
- `label` (requis, ≤ 60 char) : étiquette courte affirmative pour récap, carnet, listes.
- `discriminantPower` (déjà au schéma, désormais effectivement renseigné) : `signature | strong | moderate | weak`. L'app affiche un badge "Trait signature" mais **ne raccourcit pas le parcours** — toutes les questions sont posées même quand un trait signature est validé, par choix pédagogique.
- `sketchCaption` (optionnel) : légende externalisée du SVG, pour traduction et accessibilité.

**Raison** : observations issues du proto réel (cf. session test 2026-04-28). La `question` complète est trop longue pour servir de checklist en récap. Sans hiérarchie de pouvoir discriminant, impossible de signaler à l'utilisateur quels traits sont décisifs. Texte intégré au SVG = barrière à la traduction et à la sélection.
**Conséquences** : 20 traits existants enrichis manuellement. Les 2 fiches restantes (érable, pin) doivent porter ces champs dès la rédaction.

### D-014 — `sources` rendu temporairement non-obligatoire
**Date** : 2026-04-28
**Décision** : retirer `sources` de la liste `required` du schéma de trait, le temps de rétro-documenter.
**Raison** : les 4 fiches pilotes ont été produites sans tracer les sources au fil de la recherche — manquement méthodologique reconnu lors de la session test du 28 avril 2026. La règle "journal de sources par trait pendant la recherche" est désormais inscrite en Étape 1 du `05-content-guide.md` pour les fiches futures. Champ redeviendra `required` avant publication v1 publique.
**Conséquences** : audit en cours. État après vérification croisée Tela Botanica eFlore (description) + Wikipedia FR :
- **Fagus sylvatica** : 5/5 traits sourcés `["tela-botanica", "wikipedia"]`.
- **Betula pendula** : 5/5 traits sourcés `["tela-botanica", "wikipedia"]`.
- **Ulmus minor** : 2/5 traits sourcés (`leaf-asymmetric-base`, `fruit-flat-winged-samara`). 3 traits restants non confirmés par 2 sources : `leaf-double-toothed-margin` (non décrit explicitement dans les sources consultées), `leaf-rough-upper-side` (uniquement Wikipedia), `bark-grey-fissured-plates` (uniquement Tela). À reprendre avec Flora Gallica ou Coste papier.
- **Quercus robur** : 0/5 traits sourcés. La fiche Tela Botanica description est vide (template à renseigner par contributeurs Tela). Wikipedia confirme 4 traits sur 5, mais sans 2e source indépendante. **À traiter en priorité avec le botaniste référent.**

### D-015 — Trait `quercus-robur/leaf-rounded-lobes-no-points` à revoir
**Date** : 2026-04-28
**Statut** : flag botanique
**Constat** : la formulation "lobes arrondis sans pointes" est botaniquement contestable. Wikipedia FR mentionne explicitement que les lobes ont un "sommet aigu, arrondi ou rétus" — donc parfois aigu chez Q. robur. Le contraste réel avec Q. petraea est plus subtil que "arrondi vs pointu".
**À faire** : reformuler la question avec le botaniste — peut-être centrer sur la combinaison "lobes peu profonds, arrondis dans l'ensemble + pétiole très court + base à oreillettes" qui est plus discriminante que "sans pointes".

### D-016 — Navigation Retour : stack d'historique + "Changer ma réponse"
**Date** : 2026-04-29
**Décision** : deux mécanismes de retour en arrière distincts dans la PWA.

1. **"← Retour"** (bouton permanent en haut de ValidationEngine et sur l'écran Transition) : dépile un snapshot du stack d'historique stocké dans `App.svelte`. Chaque snapshot est poussé au début de `next()` — avant que la réponse ne soit appliquée — et capture `stage`, `candidates`, `current`, `eliminated`, `traitIndex`, `validated`. Ramène à la question précédente (ou à l'espèce précédente depuis l'écran Transition), sans réponse pré-cochée.

2. **"← Changer ma réponse"** (bouton dans le panneau de feedback, à côté de "Trait suivant" / "Espèce suivante") : remet simplement `answer = null` localement dans ValidationEngine, sans toucher l'historique. Permet de reconsidérer sa réponse avant de confirmer.

**Architecture** : `traitIndex`, `validated` et `answer` sont des props `$bindable` dans ValidationEngine, ce qui permet à App.svelte de les lire (pour le snapshot) et de les écraser (pour la restauration) sans remonter manuellement chaque changement.

**Raison** : l'utilisateur en forêt peut se tromper ou hésiter. Un parcours sans retour crée une frustration et pousse à des abandons. Les deux niveaux couvrent les deux cas : changer d'avis avant de valider (Changer ma réponse) et revenir sur une validation déjà confirmée (Retour).

**Conséquences** : le stack n'est pas persisté (rechargement = perte). Acceptable en v1. Pas de retour depuis l'écran Récap (fin de parcours assumée).

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
