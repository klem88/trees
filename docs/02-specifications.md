# 02 — Spécifications fonctionnelles

## Parcours utilisateur principal (happy path)

```
[Accueil] → [Prise / sélection photo] → [Appel PlantNet]
    → [Affichage top espèces] → [Validation par traits sur l'espèce 1]
    → [Confirmation] → [Fiche récap] → [Ajout au carnet]
```

## Parcours détaillés

### 1. Accueil

**Éléments à l'écran** :
- Bouton principal "Identifier un arbre"
- Accès au carnet personnel
- Accès à la liste des espèces couvertes (mode exploration libre)
- Indicateur d'état réseau (en ligne / hors ligne)

**Comportement hors ligne** :
- Le bouton "Identifier" est grisé avec un message "Nécessite une connexion internet"
- Le carnet et l'exploration libre restent accessibles

### 2. Capture / sélection photo

- Accès direct à la caméra du device
- Possibilité de choisir une image dans la galerie
- Possibilité d'envoyer plusieurs images (jusqu'à 5, comme PlantNet le permet)
- Indication des organes photographiés si possible (feuille, fleur, fruit, écorce, port) — utile pour PlantNet

### 3. Appel PlantNet

- Indicateur de chargement
- Gestion d'erreur réseau avec possibilité de retry
- Stockage temporaire de la photo en mémoire (pour l'afficher dans la fiche finale)

### 4. Affichage des résultats PlantNet

- Liste des top 3 à 5 espèces proposées avec leur score
- Indication visuelle pour les espèces **couvertes par notre base** (badge "Identification guidée disponible")
- Indication pour les espèces **non couvertes** (badge "Hors périmètre v1")

### 5. Validation par traits

**Pour chaque question (3 à 5 par espèce)** :
- Énoncé en français courant ("Est-ce que la base de la feuille est nettement asymétrique ?")
- Croquis illustratif au-dessus ou à côté
- Trois boutons : **Oui** / **Non** / **Je ne sais pas**
- Optionnel : un lien "En savoir plus" qui développe l'explication botanique

**Après chaque réponse** :
- **Oui** → message de confirmation pédagogique court ("La base asymétrique est très typique de l'orme") → question suivante
- **Non** → message d'élimination ("L'orme a presque toujours une base asymétrique, on peut donc l'écarter") → bascule sur l'espèce suivante de la liste PlantNet
- **Je ne sais pas** → option de zoomer sur le croquis avec explication enrichie ; possibilité de passer la question (traitée comme une réponse neutre, ne valide ni n'invalide)

**Logique de fin** :
- Si toutes les questions sont validées → confirmation de l'espèce
- Si une question est répondue "non" → on bascule sur l'espèce suivante de la liste PlantNet, on relance avec **ses propres traits**
- Si toutes les espèces de la liste PlantNet sont éliminées → message "Identification non concluante", proposition de reprendre une photo ou de consulter en mode libre

**Cas "Je ne sais pas" répété** :
- Si l'utilisateur répond "Je ne sais pas" à toutes les questions, on affiche un message clair indiquant que l'identification ne peut pas être confirmée, et on l'invite à observer mieux ou à reprendre plus tard.

### 6. Fiche récapitulative (espèce confirmée)

Contenu sobre :
- Nom d'usage français en grand
- Nom scientifique
- Une à deux phrases de description (ex : "Arbre commun des forêts et bocages de plaine, pouvant atteindre 35 m")
- Rappel des traits validés (sous forme de mini-checklist)
- Une ou deux infos contextuelles (habitat principal, taille adulte typique)
- Bouton "Ajouter à mon carnet"
- Bouton "Identifier un autre arbre"

### 7. Carnet personnel

- Liste chronologique des identifications confirmées
- Pour chaque entrée : photo de l'utilisateur, espèce, date, lieu (si géoloc autorisée)
- Possibilité de consulter à nouveau la fiche
- Possibilité de supprimer une entrée
- Stockage : **localStorage** pour la v1 (envisager IndexedDB si stockage des photos)

## Modes secondaires

### Exploration libre

Liste des espèces couvertes, accessible hors ligne. Pour chaque espèce : la fiche complète (sans la partie validation) et les traits caractéristiques avec leurs croquis. Pédagogiquement précieux : permet de réviser hors contexte d'identification.

### Carnet — vue détaillée

Sur une entrée du carnet, possibilité de :
- Revoir la photo prise
- Revoir les traits qui ont permis de confirmer (mémoire active)
- Voir la position sur une carte simple si géoloc

## États d'erreur à prévoir

| Cas | Comportement |
|---|---|
| Pas de réseau au moment de l'identification | Message clair, suggestion d'utiliser le carnet/exploration |
| API PlantNet indisponible | Message d'erreur + retry |
| Photo non reconnue par PlantNet | Suggestion de reprendre une photo (cadrage, organe) |
| Aucune des espèces PlantNet n'est couverte | Affichage des résultats bruts, sans validation possible |
| Permissions caméra refusées | Fallback sur sélection galerie |
| Permissions géoloc refusées | Carnet sans localisation, pas bloquant |

## Hors périmètre v1 (à conserver pour plus tard)

- Authentification utilisateur / synchronisation multi-appareils
- Mode hiver (sans feuilles)
- Arbustes, plantes herbacées
- Communauté / partage d'observations
- Capture différée hors ligne avec envoi à PlantNet quand le réseau revient
- Export du carnet (CSV, JSON)
- Approche "matrice de traits discriminants" entre espèces voisines (cf. décisions log)
