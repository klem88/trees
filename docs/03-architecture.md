# 03 — Architecture technique

> **Note** : ce document fixe les grandes orientations. Les choix précis de bibliothèques peuvent être ajustés au démarrage du dev.

## Type d'application

**Progressive Web App (PWA)** — choix retenu pour :
- Cross-platform (iOS, Android, desktop) avec une seule base de code
- Pas de friction d'installation (pas de store)
- Mise à jour instantanée du contenu
- Possibilité d'installation sur l'écran d'accueil
- Support du mode hors ligne via service worker

## Stack pressentie (à confirmer)

### Frontend
- **Framework** : React, Vue ou Svelte. Recommandation par défaut : **Svelte/SvelteKit** ou **Vue** pour la légèreté ; **React** si l'écosystème compte plus.
- **Styling** : Tailwind CSS ou solution équivalente
- **Build** : Vite
- **PWA** : plugin Vite-PWA (Workbox sous le capot)

### Pas de backend en v1
- L'app est purement front. Tout le contenu (espèces, traits, croquis) est embarqué dans le bundle ou servi statiquement.
- Le seul appel externe est l'API PlantNet.
- Le carnet est en localStorage / IndexedDB.

### Données
- **Espèces et traits** : fichiers JSON statiques sous `/data/species/`, validés par un schéma JSON sous `/data/schemas/`.
- **Croquis** : SVG sous `/assets/sketches/`, embarqués dans le bundle ou chargés à la demande.

## Schéma d'architecture

```
┌─────────────────────────────────────────────────────────┐
│                      PWA (client)                        │
│                                                          │
│  ┌──────────────┐   ┌─────────────────────────────┐    │
│  │   UI Layer   │   │   Logic / State             │    │
│  │ (composants) │◄──┤  - Identification flow      │    │
│  │              │   │  - Validation par traits    │    │
│  │              │   │  - Carnet (CRUD)            │    │
│  └──────────────┘   └─────────────────────────────┘    │
│         ▲                       ▲                       │
│         │                       │                       │
│  ┌──────┴───────┐   ┌──────────┴──────────┐            │
│  │ Données      │   │ Stockage local      │            │
│  │ embarquées   │   │ - localStorage      │            │
│  │ (JSON+SVG)   │   │ - IndexedDB (photos)│            │
│  └──────────────┘   └─────────────────────┘            │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Service Worker (offline)              │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS
                           ▼
                  ┌──────────────────┐
                  │  API PlantNet    │
                  │  (externe)       │
                  └──────────────────┘
```

## Modules logiques côté client

### `identification/`
Orchestration du flux complet : capture photo → appel PlantNet → boucle de validation par traits → fiche finale.

### `plantnet-client/`
Wrapper de l'API PlantNet : envoi de la requête, parsing de la réponse, gestion des erreurs et retries. Encapsule la clé API.

### `species-database/`
Chargement et indexation des fiches espèces JSON. Expose des méthodes :
- `getByScientificName(name)` — match avec ce que renvoie PlantNet
- `getAll()` — pour le mode exploration
- `isCovered(name)` — pour décider d'afficher le badge

### `validation-engine/`
Moteur qui orchestre les questions pour une espèce donnée :
- Charge les traits ordonnés
- Gère l'état des réponses
- Détermine la prochaine action (question suivante / espèce suivante / confirmation)

### `notebook/`
CRUD du carnet utilisateur, stockage local.

### `ui/`
Composants présentiels : boutons, croquis SVG, fiches, etc.

## Stratégie offline

### Ce qui doit marcher hors ligne
- Accueil (avec indicateur "hors ligne")
- Carnet personnel (lecture, suppression)
- Exploration libre des espèces couvertes
- Fiche détaillée d'une espèce déjà identifiée

### Ce qui ne marche pas hors ligne (assumé)
- Prise de photo + identification PlantNet (l'API nécessite un appel réseau)

### Mise en cache
- Service worker en stratégie `CacheFirst` pour les assets statiques (HTML, JS, CSS, JSON, SVG)
- Pas de cache pour les appels PlantNet (toujours réseau)

## API PlantNet : points clés

- Endpoint : `https://my-api.plantnet.org/v2/identify/{project}`
- Authentification par clé API (à mettre en variable d'environnement)
- Quota gratuit limité (à confirmer au moment du dev) — prévoir un message clair en cas de dépassement
- Paramètre `project` : utiliser `weurope` ou `the-plant-list` selon couverture souhaitée
- Réponse : liste de résultats avec `species.scientificNameWithoutAuthor`, `score`, et infos botaniques

À vérifier au moment du dev :
- Politique CORS (appel direct depuis le navigateur ou besoin d'un proxy ?)
- Gestion de la clé API : si l'app est purement statique, la clé est exposée. Solutions : rate limiting côté serveur (proxy minimal) OU clé dédiée publique avec quota assumé.

## Sécurité et confidentialité

- Aucune donnée utilisateur envoyée à un serveur (hors PlantNet)
- Photos utilisateur stockées uniquement localement
- Géolocalisation optionnelle, demandée explicitement
- Pas de tracking, pas d'analytics par défaut (à reconsidérer si besoin métrique)

## Performance

Cibles raisonnables :
- First Contentful Paint < 1,5 s sur 4G
- Bundle JS initial < 200 ko gzipé
- Croquis SVG : préférer le format SVG inline pour les petits, lazy-load pour les autres
- Images de fiches : si on en ajoute (photos d'illustration), formats modernes (WebP, AVIF) avec fallback

## Déploiement

Hébergement statique : Netlify, Vercel, GitHub Pages, Cloudflare Pages — tous conviennent. Build CI sur push, déploiement automatique.

## Décisions explicitement reportées

Voir `08-decisions-log.md` pour le détail. Notamment :
- Choix précis du framework
- Stratégie de gestion de la clé API PlantNet
- Stockage des photos utilisateur (localStorage avec compression vs IndexedDB)
