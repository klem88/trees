# 06 — Guide de production des croquis

## Objectif

Chaque question est accompagnée d'un croquis dont **la fonction est pédagogique, pas décorative**. Le croquis doit faire comprendre ce qu'on demande d'observer, en levant les barrières de vocabulaire.

## Principes

### 1. Le croquis montre la question, pas l'espèce

❌ Ne pas faire : un dessin réaliste de l'orme champêtre entier
✅ Faire : un schéma au trait montrant **uniquement la base d'une feuille** avec une flèche désignant l'asymétrie

Le croquis répond à la question "à quoi dois-je regarder ?", pas "à quoi ressemble cette espèce ?".

### 2. Trait au trait, fond neutre

- Lignes nettes, contraste fort
- Pas de couleur de fond
- Couleur uniquement si elle fait partie du trait demandé (ex : couleur d'écorce)
- SVG vectoriel pour la netteté à toute taille et le poids minimal

### 3. Indication explicite

Quand le trait est subtil :
- Flèche désignant la zone à observer
- Annotation textuelle minimale ("base asymétrique")
- Comparaison côte à côte si pertinent (oui / non — montre une feuille symétrique à côté d'une asymétrique)

#### Convention flèches comparatives (fixée avril 2026, après proto)

Quand le croquis met en regard l'espèce et un comparatif :
- **La flèche rouge pointe toujours sur le détail diagnostique de l'espèce cible**, pas sur le comparatif.
- Le comparatif est étiqueté en gris et en italique (`charme : bord denté`, `ailleurs : symétrique`), sans flèche.
- Position habituelle : espèce à gauche, comparatif à droite.

#### Texte intégré au SVG vs externe

- Les **labels courts** désignant la zone observée (ex : "base asymétrique", "long pédoncule 3-7 cm") restent **dans le SVG** : ils sont positionnés relativement aux éléments graphiques.
- Les **légendes générales** ("le pédoncule donne son nom à l'espèce", "lisse même sur vieux arbre") doivent être **externalisées** dans le champ `sketchCaption` du JSON. Bénéfices : taille de texte cohérente avec l'app, traduction possible, sélection/recherche, accessibilité.
- En cas de doute : si le texte décrit la scène entière → externe (`sketchCaption`). S'il étiquette un détail précis → interne (SVG).

### 4. Cohérence visuelle

Sur l'ensemble de l'app, les croquis doivent partager :
- Une épaisseur de trait constante
- Une palette restreinte (noir + 1 ou 2 couleurs d'accent maximum)
- Une typographie unique pour les annotations
- Un même style général (figuratif simplifié vs très géométrique)

## Production : pistes pratiques

### Sources existantes à explorer en priorité

Avant de créer un croquis, vérifier s'il existe déjà sous licence libre :
- **Wikimedia Commons** — planches de Köhler, Thomé, Masclef (XIXe), domaine public
- **Tela Botanica** — illustrations sous licences ouvertes parfois
- **OpenClipart** — pictogrammes simples
- **INPN** — illustrations parfois disponibles

⚠️ Vérifier systématiquement la licence (CC0, CC-BY, etc.) et créditer si requis.

### Création de novo

**Outils recommandés** :
- **Inkscape** (libre, SVG natif) — recommandé
- **Figma** (gratuit pour usage perso, export SVG correct)
- **Affinity Designer** (payant, export SVG)
- À éviter : Adobe Illustrator (cher) sauf si déjà disponible

### Génération assistée par IA — précautions

L'IA générative (Midjourney, DALL-E, Stable Diffusion, Imagen, etc.) est **médiocre pour les schémas botaniques précis** :
- Invente des détails anatomiques (nervation incorrecte, marges fantaisistes)
- Mauvaise précision géométrique pour un schéma didactique
- Cohérence stylistique difficile à tenir sur un grand corpus

**Usage acceptable** :
- Brouillon initial pour cadrage de composition (jamais utilisé en l'état)
- Inspiration sur un style général
- Production d'éléments décoratifs (icônes d'interface, illustrations d'accueil)

**Workflow possible** : générer un brouillon par IA → repasser à la main dans Inkscape → soumettre au botaniste pour validation **anatomique** → ajustements.

**À ne jamais faire** : utiliser un croquis IA en production sans validation botaniste, même s'il "a l'air bon".

## Cahier des charges d'un croquis

Pour chaque trait, le brief donné à l'illustrateur (humain ou guidant l'IA) doit contenir :

1. **Espèce** et **trait ciblé**
2. **Question associée** (texte exact)
3. **Élément à représenter** (feuille entière / base de feuille / écorce / etc.)
4. **Élément à mettre en évidence** (la zone précise, avec instruction de flèche/annotation)
5. **Contraste avec un cas négatif** si pertinent (ex : montrer une feuille symétrique à côté pour comparer)
6. **Références visuelles** : 2 à 3 photos ou planches existantes pour caler l'anatomie

## Format de livraison

- **Format** : SVG, optimisé (passé par SVGO ou équivalent)
- **Dimensions** : viewBox de 400×300 par défaut (à ajuster selon le trait)
- **Nommage** : `{species-id}/{trait-id}.svg`. Ex : `ulmus-minor/leaf-asymmetric-base.svg`
- **Poids cible** : < 10 ko par croquis si possible
- **Accessibilité** : titre `<title>` et description `<desc>` dans le SVG, exploités côté UI pour le `alt`

## Validation

Chaque croquis passe par :
1. Auto-revue : la question est-elle claire en regardant uniquement le croquis ?
2. Test utilisateur informel sur 2-3 personnes non botanistes
3. Validation botaniste sur l'exactitude anatomique
4. Intégration

## Exemple de brief complet

> **Espèce** : Orme champêtre (*Ulmus minor*)
> **Trait** : `leaf-asymmetric-base`
> **Question** : "Est-ce que la base de la feuille est nettement asymétrique ?"
>
> **À représenter** : une feuille d'orme champêtre vue de face, complète, le pétiole en bas. Style schématique au trait noir.
>
> **À mettre en évidence** : la base de la feuille, là où le limbe rejoint le pétiole. Une flèche pointant cette zone. Petite annotation "base asymétrique" en français.
>
> **Comparaison** : à droite de la feuille principale, montrer en plus petit la silhouette d'une base de feuille symétrique (par exemple un schéma générique de base de feuille type peuplier ou tilleul) avec la mention "(ailleurs : symétrique)".
>
> **Références** : [photo 1, photo 2, planche Köhler]
>
> **Format** : SVG 400×300, < 10 ko.

## Estimation de charge

À 50 espèces × 4 traits en moyenne = **200 croquis**. Avec mutualisation possible (un trait générique "feuilles opposées" peut être réutilisé pour plusieurs espèces), on peut tabler sur **120 à 150 croquis uniques**.

À raison de 30 min à 1 h par croquis (avec retouches), on est sur **un budget de 75 à 150 heures de travail iconographique**. C'est un chantier à part entière, à ne pas sous-estimer.
