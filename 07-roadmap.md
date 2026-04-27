# 07 — Feuille de route

## Phases

### Phase 0 — Cadrage ✅ (terminée)
- Discussion projet, périmètre, contraintes
- Création de la documentation initiale
- Identification du botaniste référent

### Phase 1 — Pilote contenu (en cours)
**Objectif** : valider la méthode de constitution du contenu sur un échantillon réduit, avant de passer à l'échelle.

**Livrables** :
- [ ] Fiche complète pour 5 espèces pilotes : chêne pédonculé, hêtre, bouleau verruqueux, érable champêtre, orme champêtre
- [ ] Style visuel des croquis défini (1 à 2 essais par espèce)
- [ ] Schéma JSON `species.schema.json` figé
- [ ] Validation botaniste de l'ensemble

**Critère de fin** : si le botaniste valide les 5 fiches sans changement majeur de méthode, on passe à la phase 2.

### Phase 2 — Prototype technique
**Objectif** : valider l'expérience utilisateur de bout en bout sur les 5 espèces pilotes.

**Livrables** :
- [ ] Choix définitif du framework et des outils
- [ ] Setup du repo PWA (Vite + framework + Tailwind + Workbox)
- [ ] Intégration API PlantNet (avec gestion clé / quotas)
- [ ] Chargement des fiches JSON et croquis SVG
- [ ] Écran d'accueil
- [ ] Flux d'identification complet (capture → PlantNet → validation traits → fiche)
- [ ] Carnet en localStorage (entrées simples sans photos)
- [ ] Mode hors ligne basique
- [ ] Déploiement sur un environnement de test (Netlify ou équivalent)

**Critère de fin** : possibilité d'identifier une des 5 espèces de bout en bout, sur mobile, en conditions réelles.

### Phase 3 — Tests utilisateurs
**Objectif** : valider l'UX et l'utilité pédagogique avec des vrais utilisateurs non spécialistes.

**Livrables** :
- [ ] 5 à 10 sessions de test avec des utilisateurs cibles (randonneurs, parents, enseignants)
- [ ] Synthèse des frictions et améliorations
- [ ] Itérations UX
- [ ] Mesure qualitative : "est-ce que tu te sens capable d'identifier cette espèce sans l'app la prochaine fois ?"

### Phase 4 — Passage à l'échelle contenu
**Objectif** : couvrir 30 à 50 espèces.

**Livrables** :
- [ ] Liste finale des espèces v1 arrêtée avec le botaniste
- [ ] Production des fiches restantes (20 à 45 espèces)
- [ ] Production des croquis associés (~150 SVG au total)
- [ ] Validation botaniste de l'ensemble

**Critère de fin** : 30 espèces minimum couvertes et validées.

### Phase 5 — Finitions et lancement v1
**Objectif** : app prête pour une diffusion publique.

**Livrables** :
- [ ] Stockage des photos utilisateur dans le carnet (IndexedDB)
- [ ] Géolocalisation optionnelle
- [ ] Mode exploration libre des espèces
- [ ] Polissage UI (animations, transitions, états vides)
- [ ] Page "À propos" avec crédits (botaniste, sources, licences)
- [ ] Documentation utilisateur (page d'aide intégrée)
- [ ] Déploiement production
- [ ] Communication / annonce

## Évolutions post-v1 (backlog)

À faire vivre comme un backlog ouvert, sans ordre fixe :

- Mode hiver (écorce, silhouette, bourgeons)
- Capture différée hors ligne
- Extension à d'autres groupes : arbustes, plantes herbacées communes
- Multilangue (anglais d'abord)
- Export du carnet
- Synchronisation multi-appareils (implique un backend)
- Approche matrice de traits discriminants (questions optimisées entre top espèces PlantNet)
- Quizz de révision basé sur le carnet ("dis-moi quel arbre c'est sans regarder le nom")
- Communauté : partage d'observations, validation croisée

## Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| La constitution du contenu prend 3× plus de temps qu'estimé | Élevée | Modéré | Démarrer par les pilotes pour calibrer ; viser 30 espèces minimum, 50 idéal |
| Disponibilité limitée du botaniste référent | Moyenne | Élevé | Préparer les fiches en amont, regrouper les revues, prévoir backup (autre botaniste, asso Tela Botanica) |
| Production des croquis devient un goulot | Élevée | Élevé | Mutualiser au max ; mixer sources libres + création ; envisager illustrateur dédié |
| Quotas API PlantNet insuffisants | Faible | Moyen | Prévoir gestion d'erreur claire ; envisager partenariat / clé étendue |
| Clé API exposée côté client | Moyenne | Modéré | Soit clé publique avec quota assumé, soit proxy minimal côté serveur |
| L'UX paraît trop scolaire | Moyenne | Moyen | Tests utilisateurs en phase 3, itération |
| Confusion avec une appli médicale ou taxonomique sérieuse | Faible | Faible | Communication claire sur le positionnement "pédagogique grand public" |
