# Conversation de cadrage initiale

> Trace de la conversation qui a donné naissance au projet. Conservée comme référence pour comprendre l'origine des choix.

## Tour 1 — Idée initiale

**Utilisateur** : Trouve que PlantNet n'est pas complète. Souhaite, après identification par PlantNet, proposer une étape de validation par traits caractéristiques (oui/non) pour ne pas se tromper sur le nom d'usage. Exemple : si l'espèce trouvée est l'orme champêtre, demander "la feuille présente-t-elle bien une asymétrie ?". Difficulté principale : constituer la base des traits caractéristiques. Souhaite hiérarchiser par évidence (forme de la feuille avant nombre d'ovaires) et associer un croquis à chaque question pour lever la barrière du vocabulaire botanique.

**Claude** : Idée claire et qui répond à un vrai manque. Trois chantiers identifiés :
1. Intégration PlantNet (le plus simple)
2. Base de traits caractéristiques (le plus ambitieux)
3. Croquis pédagogiques (sous-estimé)

Questions de cadrage posées :
- Périmètre d'espèces visé ?
- Logique d'arrêt (espèce 1 uniquement ou bascule sur les suivantes) ?
- Background botanique / collaboration avec un botaniste ?
- Plateforme cible et nature du projet ?

## Tour 2 — Précisions

**Utilisateur** : On peut commencer par les arbres uniquement et avec une PWA si c'est plus simple. Il faut surtout se concentrer sur la constitution du dataset. Deux choses primordiales : 1- trouver les traits les plus déterminants et évidents pour chaque espèce, 2- proposer un croquis explicatif pour chacun. On peut sans doute utiliser des IA pour aider à créer ces schémas explicatifs (à faire valider par un botaniste).

**Claude** : Excellent recadrage. Quelques chiffres :
- Arbres indigènes : 80-100 espèces
- Avec ornementaux courants : 200-300
- Pour une v1 ciblée : 30-50 arbres les plus communs

Sur les croquis : mise en garde sur les IA génératives, médiocres pour les schémas botaniques précis. Alternatives proposées : flores libres XIXe (Köhler, Thomé, Masclef), pictogrammes vectoriels, IA pour dégrossir + retouche manuelle, banques existantes.

Validation botaniste : excellente idée, à prévoir dès la conception du modèle de données, pas seulement sur les croquis.

Questions complémentaires :
- Que se passe-t-il si PlantNet renvoie une espèce non couverte ?
- Modèle de stockage du dataset ?

## Tour 3 — Décisions sur le moteur

**Utilisateur** : Si l'utilisateur répond non, on regarde la 2e espèce de PlantNet et on recommence avec ses traits. Pour chaque réponse, on renseigne l'utilisateur sur la signification de sa réponse (ex : "il ne s'agit donc pas de l'orme"). Pas exhaustif, mais aide à la compréhension. Idéalement, l'utilisateur ne doit plus avoir besoin de l'app après un certain temps. L'idée est de l'aider à apprendre les traits. Si PlantNet renvoie une espèce non couverte, on renvoie juste les résultats sans possibilité de continuer. Stockage en JSON.

**Claude** : Orientation pédagogique forte ("ne plus avoir besoin de l'app") = vrai positionnement. Subtilité ajoutée : prévoir une troisième réponse "je ne sais pas" pour gérer le doute. Pour le feedback pédagogique, structurer dans le modèle de données avec deux messages par trait (si oui / si non). Limite signalée : la logique "valider espèce A puis B avec ses propres traits" ne distingue pas finement les espèces voisines (un trait commun à A et B ne sert à rien). Deux approches discutées : simple (chaque espèce a ses traits indépendants, recommandée pour v1) ou optimisée (matrice discriminante, post-v1).

Esquisse du schéma JSON proposée. Questions complémentaires :
- Combien de traits par espèce ?
- Que faire à la confirmation ?
- Mode hors ligne ?
- Trace dans un carnet ?

## Tour 4 — Confirmation des choix

**Utilisateur** : 3 à 5 traits oui. Petite fiche récapitulative simple et sobre. Mode hors ligne oui mais ça veut dire pas de PlantNet dans ce cas là, correct ? Trace dans le localStorage.

**Claude** : Confirmation que le mode hors ligne nécessite une connexion pour PlantNet. Trois options de gestion offline discutées (mode dégradé, capture différée, message clair en v1). Recommandation v1 : message clair, le reste accessible offline. Anticipation sur le carnet (photo en IndexedDB plutôt que localStorage à terme, géolocalisation optionnelle, export post-v1).

Synthèse de faisabilité :
1. Constitution de la base de traits = plus gros chantier
2. Production des croquis = ~200 illustrations à anticiper
3. Développement technique = standard, 2-4 semaines pour un MVP

Plan recommandé :
1. Tester sur 3-5 espèces pilotes
2. Définir le style visuel des croquis
3. Spécifier le schéma JSON définitif
4. Prototyper la PWA sur ces espèces
5. Itérer en élargissant

Question finale : as-tu un botaniste référent ?

## Tour 5 — Validation du plan

**Utilisateur** : Botaniste connu. Plan validé.

## Tour 6 — Demande de structuration

**Utilisateur** : Demande la création du projet structuré pour travailler dessus.
