# 09 — Méthodologie de constitution du dataset

> Document de référence opérationnel. Décrit le pipeline complet de production d'une fiche espèce, depuis la sélection des traits jusqu'à la validation botaniste. Consolide et opérationnalise les principes posés dans `05-content-guide.md` et `06-sketches-guide.md`.

## 1. Principes structurants

### 1.1 Traits indépendants par espèce

En v1, chaque fiche est rédigée **indépendamment des autres** : pas de matrice de confusion entre espèces, pas de traits choisis en fonction d'un concurrent particulier. Justification : la décision d'identification se fait par **mise à jour bayésienne d'un prior PlantNet**, où chaque trait apporte une évidence intrinsèque à l'espèce. Le scoring d'un trait dépend de deux propriétés de l'espèce, jamais d'un contexte de comparaison.

Conséquences :
- Effort de production linéaire (50 fiches indépendantes, pas une matrice 50×50).
- Maintenance simple : modifier une fiche ne casse pas les autres.
- Pédagogie centrée espèce : on apprend "ce qui fait qu'un orme est un orme", pas "comment distinguer orme et charme".

### 1.2 Critères qu'un trait doit satisfaire

Un trait retenu doit être :
- **Observable** par un débutant à l'œil nu (ou au toucher), sans matériel.
- **Présent** au moins une saison de l'année, idéalement plusieurs.
- **Informant** : un trait dont le LR ≈ 1 (combo `sometimes × common`) est rejeté par le schéma.

### 1.3 Volumétrie par fiche

Le schéma JSON impose `minItems: 3, maxItems: 5` traits. La pratique recommande :
- **3 traits feuille** (forme/marge/base ou texture) couvrant printemps-été-automne.
- **1 trait fruit ou fleur** quand discriminant et présent.
- **1 trait écorce ou silhouette** comme appui hiver et redondance.

## 2. Sélection des traits

### 2.1 Sources documentaires

Pour chaque espèce, consulter au minimum :
- **Tela Botanica — eFlore** (https://www.tela-botanica.org/) — fiche descriptive en français.
- **INPN** (https://inpn.mnhn.fr/) — données nationales, planches.
- **Flora Gallica** (Tison & de Foucault, 2014) — référence de la flore métropolitaine.
- **Wikimedia Commons** — planches du domaine public (Köhler, Thomé) pour ancre visuelle.

Diversifier au-delà si nécessaire (FloreAlpes, Coste, guides Delachaux). Toutes les sources retenues sont citées dans `sources` de la fiche.

### 2.2 Démarche : lister puis filtrer

1. Lister sans filtrer tous les traits caractéristiques (catégories : feuille, écorce, fruit, port, bourgeon).
2. Éliminer ceux non observables sans matériel (microscopie, biochimie).
3. Pour chaque candidat, scorer (frequency, rarity, seasonality).
4. Garder les 3 à 5 meilleurs en commençant par le plus signature.

### 2.3 Diversité des catégories

Énumération du schéma : `leaf-shape`, `leaf-margin`, `leaf-base`, `leaf-arrangement`, `bark`, `silhouette`, `fruit`, `bud`, `flower`, `other`.

**Recommandation** : diversifier au moins 2 catégories différentes sur les 3-5 traits, pour rester robuste à un mauvais état d'un caractère (feuille mangée, fruit absent, jeune sujet…). Le calcul bayésien suppose l'indépendance des traits ; aligner 4 traits foliaires sur la même feuille viole cette hypothèse et gonfle artificiellement la confiance.

## 3. Cadre bayésien

### 3.1 Probabilités-pivots

Chaque trait est scoré sur deux dimensions qualitatives, mappées à des probabilités :

| `traitFrequencyInSpecies` | P(observé \| espèce) |
|---|---|
| `always` | 0.95 |
| `usually` | 0.75 |
| `sometimes` | 0.50 |

| `traitRarityAmongTrees` | P(observé \| autre espèce) |
|---|---|
| `unique` | 0.05 |
| `rare` | 0.25 |
| `common` | 0.50 |

### 3.2 Ratios de vraisemblance

Calculés à partir de la grille ci-dessus :

**LR+ (impact d'une réponse "oui") :**

| | unique | rare | common |
|---|---|---|---|
| **always** | ×19 | ×3.8 | ×1.9 |
| **usually** | ×15 | ×3 | ×1.5 |
| **sometimes** | ×10 | ×2 | ×1 |

**LR− (impact d'une réponse "non") :**

| | unique | rare | common |
|---|---|---|---|
| **always** | ÷19 | ÷15 | ÷10 |
| **usually** | ÷3.8 | ÷3 | ÷2 |
| **sometimes** | ÷1.9 | ÷1.5 | ÷1 |

### 3.3 Mécanique de mise à jour

Pour chaque trait répondu :
1. Convertir le prior en odds : `O = P / (1 − P)`.
2. **Oui** → `O ← O × LR+`. **Non** → `O ← O × LR−`. **Je ne sais pas** → inchangé.
3. Reconvertir : `P = O / (1 + O)`.
4. Cap final : `0.01 ≤ P ≤ 0.99`.

### 3.4 Règles méthodologiques déduites

- **Combo interdite** : `sometimes × common` (LR+ = 1, LR− = 1, trait inutile). Le schéma JSON la rejette via une clause `not.allOf`.
- **Combos asymétriques** (`sometimes × *`) : utiles surtout sur "oui", peu informantes sur "non". À placer en fin de questionnaire, jamais en ouverture.
- **Combos d'ouverture privilégiées** : `always × {unique, rare}` (LR+ ≥ 3.8 ET LR− ≤ 0.067 → fonctionne dans les deux sens).
- **Ordre par défaut dans la fiche** : du LR le plus élevé au plus faible, avec ajustement saisonnier à l'exécution.

### 3.5 Hypothèse d'indépendance — limite assumée

Le calcul multiplie les LR comme si les traits étaient indépendants. C'est une approximation ; deux traits "feuille" sont en réalité corrélés. Pour v1 c'est acceptable, mais ça motive la règle de diversité des catégories (cf. §2.3). Si un jour on monte en sophistication, une matrice de covariance entre catégories pourrait pondérer les LR à la baisse.

## 4. Saisonnalité

### 4.1 Champ `seasonality`

Tableau d'au moins une saison parmi `spring|summer|autumn|winter`. Définit la fenêtre où le trait est observable.

### 4.2 Ordre saisonnier des questions

À l'exécution, l'app retient les traits dont `seasonality` contient la saison courante, puis les ordonne par LR+ décroissant. En hiver, sur une espèce caduque, le questionnaire peut être très court (parfois un seul trait sur l'écorce ou la silhouette) — c'est honnête et c'est mieux que de demander des traits inobservables.

### 4.3 Conventions par catégorie

| Catégorie | Saisons typiques pour espèces caduques |
|---|---|
| `leaf-shape`, `leaf-margin`, `leaf-base` | spring, summer, autumn |
| `leaf-arrangement` | spring, summer, autumn |
| `bark`, `silhouette` | toutes saisons |
| `bud` | autumn, winter (parfois spring) |
| `fruit`, `flower` | dépend de l'espèce |

Pour les espèces à feuilles persistantes, `seasonality` peut couvrir les 4 saisons sur les traits foliaires.

## 5. Système de design des croquis (V3)

### 5.1 Principe

Le croquis répond à *"à quoi dois-je regarder ?"*, pas à *"à quoi ressemble cette espèce ?"* (cf. `06-sketches-guide.md`). En V3 on travaille au trait noir, avec un accent terracotta qui guide l'œil sur la zone d'observation.

### 5.2 Spécifications figées

| Élément | Valeur |
|---|---|
| Format | SVG, viewBox `0 0 400 300` |
| Couleur de trait principal | `#111` |
| Couleur d'accent | `#c1502e` |
| Opacité du remplissage accent | `0.18` à `0.22` |
| Épaisseur — contour principal | `1.6` |
| Épaisseur — secondaires (nervures, midrib) | `0.85` à `1.1` |
| Lignes de référence | `#888` ou `#3a2818`, `0.7-0.85`, `stroke-dasharray="3 3"` |
| Typographie | `ui-serif, Georgia, serif`, italique |
| Label principal | `13px`, fill `#c1502e` |
| Sous-titre | `11px`, fill `#555` |
| Caveat | `11px`, fill `#888` |
| `<title>` et `<desc>` | obligatoires (a11y) |

### 5.3 Composition standard

Un croquis comporte :
1. **Sujet principal** à gauche-centre (largeur ≈ 60% du viewBox).
2. **Halo terracotta** sur la zone à observer.
3. **Flèche** dans la couleur d'accent vers la zone, avec annotation principale.
4. **Sous-titre** 1-2 lignes en gris reformulant en langage courant.
5. **Comparaison "ailleurs : …"** à droite (≈ 25% du viewBox), en noir-gris uniquement, label en italique gris.
6. **Caveat** si applicable, en pied, gris clair.

**Règle absolue : aucun chevauchement.** Prévoir au moins 8-10 px de garde entre tout élément textuel et tout autre élément (texte, trait, figure de comparaison). Vérifier avec une prévisualisation avant validation.

### 5.4 Variantes selon le type de trait

- **Trait morphologique** (feuille, fruit, bourgeon) : composition standard.
- **Trait tactile** (rugosité de feuille, douceur d'écorce) : *carte de touche* — deux échantillons côte à côte, l'un en accent, l'autre neutre.
- **Trait surface** (écorce, pubescence) : sujet en patch carré ou rectangulaire avec motif, comparaison en patch lissé.

## 6. Production des croquis IA-as-SVG

### 6.1 Pipeline

1. **Sourcing visuel** : 2-3 photos / planches du domaine public (Wikimedia Commons, Tela Botanica). Citer les URLs.
2. **Brief structuré** rédigé par le contributeur (cf. §6.2).
3. **Génération SVG** par Claude (ou autre LLM capable de SVG-as-code) à partir du brief + URLs.
4. **Vérification de rendu** dans un navigateur ou un prévisualiseur SVG.
5. **Itération** sur la géométrie si nécessaire.
6. **Soumission au botaniste** avec lien vers les photos de référence.
7. **Intégration** après validation.

### 6.2 Modèle de brief

```
Espèce : {nom commun} ({nom scientifique})
Trait : {id}
Question utilisateur : "{texte exact de la question}"

Sujet à représenter : {ex: "feuille vue de face, complète, pétiole en bas"}
Zone à mettre en évidence (halo terracotta + flèche) : {ex: "la base de la feuille, où le limbe rejoint le pétiole"}
Comparaison "ailleurs : ..." : {ex: "feuille à base symétrique, type peuplier"}
Caveat éventuel : {ex: "(seulement sur arbre adulte)"}

Références anatomiques :
- {url 1}
- {url 2}

Style : V3 figé (cf. 09-methodology.md §5.2)
```

### 6.3 Forces et limites du SVG-as-code

L'IA est performante sur :
- Géométries nettes (cercles, ellipses, courbes simples).
- Annotations textuelles propres et cohérentes.
- Cohérence stylistique (palette, épaisseurs, typographie) entre sketches.

L'IA est faible sur :
- Courbes organiques très fines (nervure tertiaire, fines dentelures avec sous-dents).
- Textures naturelles complexes (grain d'écorce hyper-réaliste).
- Proportions exactes (à vérifier sur photo de référence).

**Fallback** : si la géométrie n'est pas satisfaisante, repartir d'une planche du domaine public (Köhler, Thomé) et la tracer manuellement dans Inkscape avec la palette V3.

## 7. Validation botaniste

### 7.1 Format de soumission

Pour chaque espèce, soumettre :
- Le JSON de la fiche (ou un rendu HTML).
- Les SVG dans une page de prévisualisation.
- La liste des sources documentaires utilisées.
- Une **liste explicite de points incertains** où on souhaite spécifiquement son avis (ex : "le scoring rugosité = `usually × rare` te paraît-il bon ?").

### 7.2 Format de retour attendu

Pas de format imposé pour le botaniste — la friction doit être minimale de son côté. Annotations dans un document partagé : par trait, soit "validé", soit "à corriger" + commentaire libre. Prévoir au moins une boîte de retour libre par fiche pour les remarques transverses.

### 7.3 Mise à jour post-validation

Après retour, le contributeur :
- Applique les corrections sur le JSON et les SVG.
- Renseigne `validatedBy` et `validatedAt` dans la fiche.
- Note dans `08-decisions-log.md` les arbitrages structurants (changement de scoring, changement de trait, suppression d'un trait jugé non discriminant, etc.).

## 8. Checklist de production d'une nouvelle espèce

1. ☐ Vérifier que l'espèce n'est pas déjà couverte (`/data/species/`).
2. ☐ Réunir au moins 3 sources documentaires (cf. §2.1).
3. ☐ Lister tous les traits saillants, scorer en (frequency, rarity, seasonality).
4. ☐ Sélectionner 3 à 5 traits, ordonner par LR+ décroissant.
5. ☐ Vérifier la diversité des catégories et la couverture saisonnière.
6. ☐ Rédiger le JSON (id, nom, summary, habitat, taille, traits, sources).
7. ☐ Valider le JSON contre `species.schema.json`.
8. ☐ Pour chaque trait : sourcer 2-3 photos/planches → écrire le brief → générer le SVG en V3 → vérifier le rendu (zéro chevauchement).
9. ☐ Soumettre la fiche complète au botaniste avec une liste de questions ouvertes.
10. ☐ Appliquer les corrections, renseigner `validatedBy` / `validatedAt`.
11. ☐ Logger les arbitrages dans `08-decisions-log.md`.
12. ☐ Commit + PR.

## Annexe A — Cas d'école : Ulmus minor

L'orme champêtre sert de fiche pilote ; les choix de scoring sont documentés ci-dessous.

| # | Trait | (freq, rarity) | LR+ / LR− | Justification |
|---|---|---|---|---|
| 1 | Base de feuille asymétrique | `always × unique` | ×19 / ÷19 | Trait signature du genre Ulmus, présent sur tous les individus en saison feuillue. Quasi-aucun autre genre courant en France ne le présente franchement. |
| 2 | Marge bidentée | `always × rare` | ×3.8 / ÷15 | Caractère constant chez Ulmus, mais aussi présent chez noisetier, charme, aulne. Donc `rare` (~25%), pas `unique`. |
| 3 | Dessus de feuille rugueux | `usually × rare` | ×3 / ÷3 | Ulmus minor est légèrement rugueux ; quelques jeunes ou en zone humide peuvent être quasi-lisses → `usually`. Trait peu présent ailleurs sauf Ulmus glabra → `rare`. |
| 4 | Samare en disque plat | `always × unique` | ×19 / ÷19 | Forme unique au genre Ulmus. La contrainte d'observation est portée par `seasonality: ["spring"]`. |
| 5 | Écorce en plaques rectangulaires | `usually × rare` | ×3 / ÷3 | Sur arbre adulte uniquement (caveat dans le SVG). Motif spécifique mais pas exclusif (proche du chêne pubescent). Sert d'appui hiver et de redondance. |

**Diversité des catégories** : `leaf-base`, `leaf-margin`, `leaf-shape`, `fruit`, `bark` — 4 catégories sur 5 traits. Bon.

**Couverture saisonnière** : 5 traits au printemps, 4 en été et automne, 1 en hiver. La pauvreté hivernale est volontaire et reflète une réalité de terrain (l'orme en hiver est genuinely difficile).

**Dynamique probabiliste** : le pire cas (toutes "non" en plein été sur les 4 traits feuillus + écorce) ramène un prior de 0.65 à environ **P = 0.001** (infirmation franche). Le meilleur cas cape à **P = 0.99**. Aucun trait à lui seul ne décide ; la confiance se construit par accumulation.

## Annexe B — Liens utiles

- Schéma JSON : `species.schema.json`
- Guide de contenu (amont, principes botaniques) : `05-content-guide.md`
- Guide des croquis (amont, principes graphiques) : `06-sketches-guide.md`
- Roadmap : `07-roadmap.md`
- Journal des décisions : `08-decisions-log.md`
- Fiche pilote : `ulmus-minor.json` + `assets/sketches/ulmus-minor/`
