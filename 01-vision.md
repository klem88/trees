# 01 — Vision et objectifs

## Constat de départ

PlantNet est une excellente application de reconnaissance d'image, mais elle s'arrête au résultat probabiliste. L'utilisateur reçoit une liste d'espèces avec des pourcentages, sans comprendre **pourquoi** le système propose ces espèces, et sans moyen de **valider** par sa propre observation. Il y a donc deux manques :

1. **Manque de confirmation** : l'utilisateur ne sait pas s'il peut faire confiance au top 1.
2. **Manque pédagogique** : l'utilisateur n'apprend rien sur les traits qui distinguent les espèces.

## Proposition de valeur

Une couche pédagogique de **confirmation par clé d'identification simplifiée**, illustrée et accessible à un public non spécialiste.

### Public cible

- Naturalistes amateurs débutants
- Randonneurs curieux
- Enseignants (SVT, animation nature)
- Parents souhaitant transmettre des connaissances naturalistes
- Toute personne voulant apprendre à reconnaître les arbres

### Objectif pédagogique central

> **L'utilisateur idéal est celui qui finit par ne plus avoir besoin de l'app.**

L'application est conçue comme un outil d'apprentissage, pas comme une béquille permanente. Chaque interaction doit :

- Faire observer activement (la question force à regarder un détail précis)
- Donner du vocabulaire (avec illustration pour lever la barrière du jargon botanique)
- Expliquer pourquoi ce trait est discriminant ("l'orme a presque toujours une base de feuille asymétrique, donc on peut l'écarter")

## Principes de conception

### Simplicité radicale
- Pas plus de 5 questions par identification
- Réponses fermées : **oui / non / je ne sais pas**
- Vocabulaire courant systématiquement préféré au terme botanique technique
- Toujours un croquis associé à la question

### Honnêteté épistémique
- L'app dit clairement ce qu'elle confirme et ce qu'elle ne peut pas garantir
- Pas de fausse précision : on vise le **nom d'usage**, pas la variété ou le cultivar
- Si l'espèce PlantNet n'est pas couverte par notre base, on l'affiche sans prétendre pouvoir aller plus loin

### Hiérarchisation par évidence
- Les traits les plus visibles et discriminants viennent en premier
- Forme générale de la feuille avant nervation fine
- Marge de la feuille avant nombre d'étamines
- Le but est qu'un débutant puisse répondre, pas qu'on couvre la flore exhaustive

## Ce que le projet **n'est pas**

- Pas une flore exhaustive (Tela Botanica, Flora Gallica le font déjà)
- Pas un outil de détermination expert (FloreAlpes, INPN couvrent ce besoin)
- Pas un réseau social naturaliste (iNaturalist, Pl@ntNet observation existent)
- Pas un substitut à PlantNet — au contraire, le projet **utilise** PlantNet comme première brique

## Critères de succès

À court terme (v1) :
- 30 à 50 espèces d'arbres correctement couvertes
- Validation botaniste sur l'ensemble du contenu
- Expérience utilisateur fluide sur mobile
- Carnet personnel fonctionnel

À long terme :
- L'utilisateur identifie spontanément certaines espèces sans ouvrir l'app
- Couverture étendue (arbustes, arbres ornementaux exotiques)
- Mode hiver (écorce, silhouette, bourgeons)
- Éventuellement : extension à d'autres groupes (plantes herbacées communes)
