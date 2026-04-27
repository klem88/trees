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
- **Mode hors ligne** : oui pour le carnet et la consultation des fiches déjà identifiées ; pas pour PlantNet (nécessite réseau)
- **Saisonnalité** : feuilles présentes (mode hiver renvoyé à plus tard)

## Structure du dépôt

```
arbres-id/
├── README.md                  ← ce fichier
├── docs/
│   ├── 01-vision.md           Vision et objectifs pédagogiques
│   ├── 02-specifications.md   Specs fonctionnelles détaillées
│   ├── 03-architecture.md     Architecture technique
│   ├── 04-data-model.md       Modèle de données (schéma JSON espèces)
│   ├── 05-content-guide.md    Guide de constitution du contenu botanique
│   ├── 06-sketches-guide.md   Guide de production des croquis
│   ├── 07-roadmap.md          Feuille de route et jalons
│   └── 08-decisions-log.md    Journal des décisions (ADR allégé)
├── data/
│   ├── schemas/
│   │   └── species.schema.json    Schéma JSON validateur d'une espèce
│   └── species/
│       └── *.json                  Une fiche par espèce
├── assets/
│   └── sketches/                   Croquis SVG par trait
└── conversation-cadrage.md     Transcription de la conversation initiale
```

## État du projet

**Phase actuelle** : cadrage terminé, démarrage de la phase contenu.

**Prochaines étapes** :
1. Définir le style visuel des croquis sur 1-2 espèces test
2. Rédiger la fiche complète de 3 à 5 espèces "pilotes" (chêne pédonculé, hêtre, bouleau, érable champêtre, orme champêtre)
3. Faire valider par le botaniste référent
4. Figer le schéma JSON
5. Démarrer le prototype PWA

Voir [`docs/07-roadmap.md`](docs/07-roadmap.md) pour le détail.
