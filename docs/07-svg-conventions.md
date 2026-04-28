# 07 — Conventions SVG des croquis

Règles extraites des fichiers `assets/sketches/ulmus-minor/` — référence de style à suivre pour toutes les espèces.

## Structure obligatoire

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-labelledby="title desc">
  <title id="title">Nom du trait — Nom commun (Nom scientifique)</title>
  <desc id="desc">Description textuelle complète du schéma pour l'accessibilité.</desc>
  …
</svg>
```

- `viewBox` : toujours `0 0 400 300`
- `role="img" aria-labelledby="title desc"` : obligatoire
- `<title id="title">` et `<desc id="desc">` : obligatoires avec l'attribut `id`
- Pas de `<rect width="400" height="300" fill="#fff"/>` de fond — le fond est transparent

## Palette de couleurs

| Usage | Valeur |
|---|---|
| Lignes principales du dessin | `stroke="#111"` |
| Couleur d'accent (flèche, highlight, label principal) | `#c1502e` |
| Zone mise en évidence (remplissage) | `fill="#c1502e" fill-opacity="0.18"` (ou `0.22`) |
| Labels secondaires / complémentaires | `fill="#555"` |
| Notes de bas de page / captions | `fill="#888"` |
| Lignes de référence en tirets | `stroke="#888" stroke-dasharray="3 3"` |
| Formes quasi-blanches (membranes, etc.) | `fill="#fdfdfd"` |
| Bois / rameau | `stroke="#6b4420"` (indicatif, peut varier) |

**Couleurs à ne jamais utiliser :** `#333`, `#e74c3c`, `red`, `blue`, `green` en remplacement de `#c1502e`.

## Typographie

- **Famille unique :** `font-family="ui-serif, Georgia, serif"`
- **Style :** toujours `font-style="italic"`
- **Jamais** `font-weight="bold"`, `font-family="sans-serif"`, ni de texte non italique
- **Tailles :**

| Rôle | Taille | Couleur |
|---|---|---|
| Label accent (trait mis en évidence) | `13` ou `14` | `#c1502e` |
| Label secondaire (explication) | `11` | `#555` |
| Caption / note | `11` | `#888` |

## Épaisseurs de trait

| Élément | `stroke-width` |
|---|---|
| Contour principal | `1.6` |
| Nervure centrale / pétiole | `1.1` – `1.4` |
| Nervures secondaires | `0.85` |
| Flèche d'accent | `1.4` |
| Éléments de comparaison | `1.1` – `1.4` |
| Détails intérieurs fins | `0.55` – `0.85` |
| Ligne de référence en tirets | `0.7` – `0.8` |

## Groupes

Le dessin principal est enveloppé dans :

```xml
<g fill="none" stroke="#111" stroke-linejoin="round" stroke-linecap="round">
  …
</g>
```

Les éléments de comparaison peuvent être dans un `<g transform="translate(…)">`.

## Flèches — patron obligatoire

**Ne pas utiliser `marker-end`**. Les flèches sont dessinées manuellement :

```xml
<g fill="#c1502e" stroke="#c1502e">
  <line x1="X_DEPART" y1="Y" x2="X_POINTE" y2="Y"
        fill="none" stroke-width="1.4" stroke-linecap="round"/>
  <polygon points="X_POINTE,Y  X_POINTE+10,Y-5  X_POINTE+10,Y+5"/>
</g>
```

- Le **label** est à droite (x élevé), la **pointe** est à gauche vers la feature
- Préférer les flèches horizontales ; diagonales acceptables si nécessaire
- Le triangle `polygon` crée une pointe orientée vers la gauche : tip en `X_POINTE`, deux coins arrière en `X_POINTE+10`

## Zone de mise en évidence

Toujours associer la flèche à un fond coloré sur la zone concernée :

```xml
<path d="…" fill="#c1502e" fill-opacity="0.18" stroke="none"/>
<!-- ou -->
<rect x="…" y="…" width="…" height="…" fill="#c1502e" fill-opacity="0.18" stroke="none"/>
```

## Éléments de comparaison

- Taille réduite (environ 1/3 du dessin principal)
- Lignes plus fines (`stroke-width="1.4"` ou moins)
- Label en `font-size="11"` `fill="#555"` italic
- Format textuel : `ailleurs : …` ou `nom_espece : …` (ex : `charme : bord denté`)
- Pas d'accent `#c1502e` sur les éléments de comparaison

## Couleurs des organes (référence)

| Organe | Fill recommandé |
|---|---|
| Bourgeons du hêtre | `fill="#8a5228"` (brun chaud) |
| Bourgeons du charme | `fill="#7a7a2a"` (olive brun, JAMAIS vert vif) |
| Faîne (fruit hêtre) | `fill="#8a5228"` |
| Cupule du hêtre | `fill="#c8a860"` (brun doré) |
| Rameau (bois) | pas de fill, `stroke="#6b4420"` |
| Écorce lisse du hêtre | `fill="#c8c8c8"` |
| Écorce fissurée (comparaison) | `fill="#c4a878"` |
| Feuille (membrane) | `fill="#fdfdfd"` ou très léger `fill="#f0f5e8"` |

## Nommage des fichiers

`assets/sketches/{species-id}/{trait-id}.svg`

Ex : `assets/sketches/fagus-sylvatica/bud-fusiform-elongated.svg`
