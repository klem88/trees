# 04 — Modèle de données

## Vue d'ensemble

Le contenu botanique est stocké en JSON statique. Une fiche par espèce dans `/data/species/{slug}.json`. Validation par un schéma JSON sous `/data/schemas/species.schema.json`.

## Entités principales

### Espèce (`Species`)

Une fiche par espèce d'arbre couverte.

| Champ | Type | Description |
|---|---|---|
| `id` | string | Identifiant unique technique (slug du nom scientifique). Ex: `ulmus-minor` |
| `scientificName` | string | Nom scientifique exact, doit matcher avec le retour PlantNet (sans autorité). Ex: `Ulmus minor` |
| `scientificNameAliases` | string[] | Synonymes ou anciennes nomenclatures pour matching. Ex: `["Ulmus campestris"]` |
| `commonNameFr` | string | Nom d'usage français principal. Ex: `Orme champêtre` |
| `commonNameAliasesFr` | string[] | Autres noms vernaculaires. Ex: `["Petit orme", "Orme rouge"]` |
| `family` | string | Famille botanique. Ex: `Ulmaceae` |
| `summary` | string | Une à deux phrases de description (~150 caractères). Affichée en fiche récap. |
| `habitat` | string | Court descriptif de l'habitat typique. |
| `typicalSize` | string | Taille adulte typique. Ex: `20 à 30 m` |
| `traits` | Trait[] | Liste **ordonnée** des traits utilisés pour la validation. L'ordre = priorité d'évidence. |
| `extendedInfo` | string (optionnel) | Informations complémentaires, anecdotes culturelles, écologie. Affiché en mode exploration. |
| `sources` | string[] | Références bibliographiques utilisées pour rédiger la fiche. |
| `validatedBy` | string (optionnel) | Nom du botaniste ayant validé la fiche. |
| `validatedAt` | string (optionnel) | Date de validation au format ISO. |

### Trait (`Trait`)

Un caractère discriminant utilisé dans la validation.

| Champ | Type | Description |
|---|---|---|
| `id` | string | Identifiant local au trait, unique dans l'espèce. Ex: `leaf-asymmetric-base` |
| `question` | string | Question posée à l'utilisateur, en français courant. Ex: `Est-ce que la base de la feuille est nettement asymétrique ?` |
| `sketch` | string | Chemin vers le SVG du croquis, relatif à `/assets/sketches/`. Ex: `ulmus-minor/leaf-asymmetric-base.svg` |
| `sketchAlt` | string | Texte alternatif descriptif (accessibilité). |
| `feedbackYes` | string | Message pédagogique court si l'utilisateur répond oui. Ex: `La base asymétrique de la feuille est très typique des ormes.` |
| `feedbackNo` | string | Message pédagogique court si l'utilisateur répond non. Ex: `L'orme a presque toujours une base de feuille asymétrique. On peut donc l'écarter.` |
| `extendedHelp` | string (optionnel) | Explication enrichie affichée si l'utilisateur clique sur "En savoir plus" ou "Je ne sais pas". Peut introduire le vocabulaire botanique précis. |
| `category` | enum | Catégorie du trait, parmi : `leaf-shape`, `leaf-margin`, `leaf-base`, `leaf-arrangement`, `bark`, `silhouette`, `fruit`, `bud`, `flower`, `other`. Sert au regroupement / filtrage et à l'analyse de couverture. |
| `discriminantPower` | enum | Indication qualitative de la force discriminante : `signature` (très spécifique à l'espèce), `strong`, `moderate`, `weak`. |

### Carnet (`NotebookEntry`) — stockage local uniquement

Stocké dans localStorage / IndexedDB côté client, pas dans le repo.

| Champ | Type | Description |
|---|---|---|
| `id` | string | UUID généré côté client |
| `speciesId` | string | Référence vers l'espèce confirmée |
| `identifiedAt` | string | Date ISO |
| `userPhoto` | blob/dataURL | Photo prise par l'utilisateur (stockage IndexedDB conseillé) |
| `location` | { lat, lng } (optionnel) | Si géoloc autorisée |
| `validatedTraits` | string[] | IDs des traits qui ont été validés ("oui") lors de l'identification |
| `notes` | string (optionnel) | Notes libres de l'utilisateur |

## Exemple de fiche complète

Voir `/data/species/ulmus-minor.json` pour un exemple type une fois rédigé.

## Règles de cohérence

- **Nombre de traits par espèce** : entre **3 et 5**. En dessous, validation trop fragile ; au-dessus, lassitude de l'utilisateur.
- **Au moins un trait `signature`** par espèce, idéalement en première position.
- **Cohérence avec PlantNet** : le `scientificName` doit correspondre à ce que l'API PlantNet renvoie. Documenter les cas où PlantNet utilise une nomenclature différente et utiliser `scientificNameAliases`.
- **Tous les champs textuels en français** (sauf `scientificName` et `family`). L'application est francophone en v1.

## Évolutions prévisibles du schéma

À anticiper sans implémenter :
- **Multilangue** : passage des champs texte à `{ fr: "...", en: "..." }`. Prévoir une migration douce.
- **Mode hiver** : ajout d'une catégorie de traits `winter` et d'un flag `availableInWinter` au niveau espèce.
- **Matrice discriminante** : ajout d'une structure permettant de calculer dynamiquement la meilleure question pour distinguer deux espèces. Ne pas l'implémenter en v1, mais le `discriminantPower` actuel prépare le terrain.

## Validation

Un schéma JSON Schema (Draft 2020-12) sous `/data/schemas/species.schema.json` permettra de valider automatiquement chaque fiche en CI. Cf. document séparé une fois la v1 stabilisée.
