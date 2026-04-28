# Arbres-ID (nom de travail)

> PWA pédagogique d'identification d'arbres combinant l'API PlantNet et une clé d'identification illustrée par traits caractéristiques.

## Vision

Une application qui aide l'utilisateur à **valider** une identification PlantNet par observation guidée, et à **apprendre** au passage les traits distinctifs des arbres. Objectif à terme : que l'utilisateur n'ait plus besoin de l'app.

## Principe

1. **Photo** → API PlantNet → liste d'espèces classées par probabilité
2. **Validation par traits** → 3 à 5 questions illustrées (oui / non / je ne sais pas) sur les caractères les plus discriminants et visibles de l'espèce la plus probable
3. **Si infirmé** → on passe à l'espèce suivante de la liste PlantNet
4. **Si confirmé** → fiche récapitulative + ajout au carnet personnel (localStorage)

## Périmètre v1

- **Cible** : 30 à 50 arbres communs de France métropolitaine
- **Plateforme** : PWA (Progressive Web App)
- **Mode hors ligne** : oui pour le carnet et la consultation des fiches ; pas pour l'identification PlantNet (réseau requis)
- **Saisonnalité** : feuilles présentes (mode hiver renvoyé à plus tard)

## Structure du dépôt

```
arbres-id/
├── README.md                   ce fichier
├── docs/
│   ├── 01-vision.md            Vision et objectifs pédagogiques
│   ├── 02-specifications.md    Specs fonctionnelles détaillées
│   ├── 03-architecture.md      Architecture technique
│   ├── 04-data-model.md        Modèle de données (schéma JSON espèces)
│   ├── 05-content-guide.md     Guide de constitution du contenu botanique
│   ├── 06-sketches-guide.md    Guide de production des croquis
│   ├── 07-roadmap.md           Feuille de route et jalons
│   ├── 08-decisions-log.md     Journal des décisions (ADR allégé)
│   ├── 09-methodology.md       Méthodologie de constitution du dataset
│   └── conversation-cadrage.md Transcription de la conversation initiale
├── data/
│   ├── schemas/
│   │   └── species.schema.json     Schéma JSON validateur (à produire en phase 1)
│   └── species/
│       └── *.json                  Une fiche JSON par espèce
└── assets/
    └── sketches/
        └── {species-id}/
            └── {trait-id}.svg      Un croquis SVG par trait
```

> **Phase 2 (prototype PWA)** : le code source Vite/framework ira dans `src/`, et `data/` + `assets/` seront
> vraisemblablement déplacés dans `public/` pour être servis statiquement et mis en cache par le service worker.

## Conventions

- **Langue** : français pour tout le contenu (questions, feedbacks, fiches, documentation). Anglais pour les clés
  techniques, identifiants et noms de fichiers (`ulmus-minor`, `leaf-asymmetric-base`, `traitFrequencyInSpecies`…).
- **Nommage des fichiers** : `kebab-case` en minuscules, à partir du nom scientifique latin.

## État du projet

**Phase actuelle** : phase 1 — production du contenu pilote.

**Prochaines étapes** :
1. Rédiger les fiches des 5 espèces pilotes (chêne pédonculé, hêtre, bouleau, érable champêtre, orme champêtre)
2. Définir et figer le style visuel des croquis (V3 terracotta, cf. `docs/09-methodology.md`)
3. Produire les croquis SVG associés
4. Valider l'ensemble avec le botaniste référent
5. Figer `data/schemas/species.schema.json`
6. Démarrer le prototype PWA (phase 2)

Voir [`docs/07-roadmap.md`](docs/07-roadmap.md) pour le détail complet.
