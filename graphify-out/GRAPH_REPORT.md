# Graph Report - .  (2026-04-28)

## Corpus Check
- Corpus is ~15,582 words - fits in a single context window. You may not need a graph.

## Summary
- 114 nodes · 143 edges · 10 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Architecture Modules|App Architecture Modules]]
- [[_COMMUNITY_Fagus sylvatica Features|Fagus sylvatica Features]]
- [[_COMMUNITY_Pilot Species and Content|Pilot Species and Content]]
- [[_COMMUNITY_Ulmus minor Features|Ulmus minor Features]]
- [[_COMMUNITY_Content Sources and Validation|Content Sources and Validation]]
- [[_COMMUNITY_PWA and Build System|PWA and Build System]]
- [[_COMMUNITY_Data Model and Roadmap|Data Model and Roadmap]]
- [[_COMMUNITY_SVG Visual Identity|SVG Visual Identity]]
- [[_COMMUNITY_Project Philosophy|Project Philosophy]]
- [[_COMMUNITY_Localization Decision|Localization Decision]]

## God Nodes (most connected - your core abstractions)
1. `Arbres-ID Project` - 8 edges
2. `Liste Cible 50 Arbres v1 (France metropolitaine)` - 8 edges
3. `PlantNet API` - 6 edges
4. `Croquis SVG par Trait` - 6 edges
5. `Architecture PWA Client` - 6 edges
6. `Moteur Bayesien (Mise a Jour par Traits)` - 6 edges
7. `Leaf Feature: Asymmetric (Unequal) Leaf Base` - 6 edges
8. `Entite Trait (Caractere Discriminant)` - 5 edges
9. `Leaf Feature: Doubly Serrate Margin (Two Levels of Teeth)` - 5 edges
10. `Leaf Feature: Rough (Scabrous) Upper Surface` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Architecture PWA Client` --implements--> `Progressive Web App (PWA)`  [EXTRACTED]
  docs/03-architecture.md → README.md
- `Conversation de Cadrage Initiale` --references--> `Arbres-ID Project`  [EXTRACTED]
  docs/conversation-cadrage.md → README.md
- `Differentiation de PlantNet` --references--> `PlantNet API`  [EXTRACTED]
  docs/01-vision.md → README.md
- `Parcours Utilisateur Principal` --references--> `PlantNet API`  [EXTRACTED]
  docs/02-specifications.md → README.md
- `Mode Hors Ligne Partiel` --conceptually_related_to--> `PlantNet API`  [EXTRACTED]
  docs/02-specifications.md → README.md

## Hyperedges (group relationships)
- **Pipeline de Validation Bayesienne par Traits** — methodology_bayesian_engine, datamodel_trait_frequency, datamodel_trait_rarity, methodology_likelihood_ratio, arch_validation_engine_module [EXTRACTED 0.95]
- **Workflow de Production du Contenu Botanique** — content_botanist_referee, datamodel_species_schema_json, methodology_svgas_code_pipeline, species_readme_ajv_validation [EXTRACTED 0.90]
- **Systeme de Conventions Visuelles des Croquis SVG** — svg_conventions_palette_terracotta, svg_conventions_viewbox, svg_conventions_accessibility, methodology_v3_sketch_style, sketches_readme_svgo [EXTRACTED 0.92]
- **Fagus sylvatica Key Diagnostic Features** — fagus_sylvatica_species, bark_smooth_grey_concept, bud_fusiform_concept, bud_divergent_45deg_concept, fruit_faine_trigone_concept, fruit_cupule_soft_bristles, leaf_oval_shape_concept, leaf_entire_margin_concept, leaf_silky_hairs_spring_concept [EXTRACTED 1.00]
- **Fagus sylvatica Leaf Seasonal Characteristics** — fagus_sylvatica_species, leaf_silky_hairs_spring_concept, leaf_smooth_summer_concept, leaf_oval_shape_concept, leaf_entire_margin_concept, leaf_paired_veins_concept [EXTRACTED 1.00]
- **Fagus sylvatica vs Carpinus betulus Comparison Features** — fagus_sylvatica_species, carpinus_betulus_comparison, bud_fusiform_concept, leaf_entire_margin_concept [EXTRACTED 1.00]
- **Fagus sylvatica Winter Bark and Bud Identification** — fagus_sylvatica_species, bark_smooth_grey_concept, bark_lenticels_concept, bud_fusiform_concept, bud_divergent_45deg_concept, bud_brown_roux_color, bud_20mm_size [INFERRED 0.85]
- **Ulmus minor Diagnostic Leaf Features** — ulmus_minor_species, leaf_asymmetric_base_concept, leaf_double_toothed_margin_concept, leaf_rough_upper_side_concept [INFERRED 0.90]
- **Ulmus minor Full Identification Feature Set** — ulmus_minor_species, bark_grey_fissured_plates_concept, fruit_flat_disc_samara_concept, leaf_asymmetric_base_concept, leaf_double_toothed_margin_concept, leaf_rough_upper_side_concept [INFERRED 0.85]
- **Ulmus minor SVG Sketch Files (Chunk 03)** — bark_grey_fissured_plates_svg, fruit_flat_winged_samara_svg, leaf_asymmetric_base_svg, leaf_double_toothed_margin_svg, leaf_rough_upper_side_svg [EXTRACTED 1.00]

## Communities

### Community 0 - "App Architecture Modules"
Cohesion: 0.1
Nodes (25): Module identification/, Stockage Local (localStorage / IndexedDB), Module notebook/ (CRUD Carnet), Module plantnet-client/, Module species-database/, Module validation-engine/, Conversation de Cadrage Initiale, Entite NotebookEntry (Carnet Local) (+17 more)

### Community 1 - "Fagus sylvatica Features"
Cohesion: 0.15
Nodes (21): Horizontal Lenticels, Smooth Grey Bark, Bark: Smooth and Grey (SVG illustration), Bud Length Approximately 20mm, Bud Color: Shiny Brown-Russet, Bud Diverging 45 Degrees from Twig, Fusiform Elongated Bud, Bud: Fusiform Elongated (SVG illustration) (+13 more)

### Community 2 - "Pilot Species and Content"
Cohesion: 0.13
Nodes (19): Acer campestre (Erable champetre) â€” Pilote, Betula pendula (Bouleau verruqueux) â€” Pilote, Pinus sylvestris (Pin sylvestre) â€” Pilote, Quercus robur (Chene pedoncule) â€” Pilote, Liste Cible 50 Arbres v1 (France metropolitaine), Constitution de la Base de Traits (Defi Principal), discriminantPower (signature/strong/moderate/weak), Entite Trait (Caractere Discriminant) (+11 more)

### Community 3 - "Ulmus minor Features"
Cohesion: 0.18
Nodes (17): Bark Feature: Grey-Brown Fissured Rectangular Plates, Bark: Grey Fissured Rectangular Plates (SVG sketch), Comparator: Smooth Bark (Beech / Young Elm), Fruit Feature: Flat Disc Samara with Central Seed, Fruit: Flat Winged Samara (SVG sketch), Leaf Feature: Asymmetric (Unequal) Leaf Base, Leaf: Asymmetric Base (SVG sketch), Leaf Feature: Doubly Serrate Margin (Two Levels of Teeth) (+9 more)

### Community 4 - "Content Sources and Validation"
Cohesion: 0.2
Nodes (11): Botaniste Referent, Flora Gallica (Tison & de Foucault), INPN (Inventaire National du Patrimoine Naturel), Tela Botanica (eFlore), Pipeline SVG-as-Code (IA + Validation Botaniste), Croquis SVG par Trait, Inkscape (Outil SVG Recommande), Wikimedia Commons (Planches Domaine Public) (+3 more)

### Community 5 - "PWA and Build System"
Cohesion: 0.2
Nodes (10): Architecture PWA Client, Service Worker (Workbox / CacheFirst), Hebergement Statique (Netlify/Vercel/GitHub Pages), Vite Build Tool, Q-001 Choix du Framework Frontend (Ouvert), Q-002 Gestion Cle API PlantNet (Ouverte), Phase 2 â€” Prototype Technique, Phase 3 â€” Tests Utilisateurs (+2 more)

### Community 6 - "Data Model and Roadmap"
Cohesion: 0.29
Nodes (7): Entite Species (Fiche Espece JSON), species.schema.json (JSON Schema Draft 2020-12), D-004 Stockage JSON Statique, 5 Especes Pilotes v1, Phase 0 â€” Cadrage (Terminee), Phase 1 â€” Pilote Contenu (En cours), AJV Schema Validation

### Community 7 - "SVG Visual Identity"
Cohesion: 1.0
Nodes (2): Style V3 Croquis (Terracotta + Trait Noir), Palette Terracotta SVG (#c1502e)

### Community 8 - "Project Philosophy"
Cohesion: 1.0
Nodes (1): Principe d'Honnetete Epistemique

### Community 9 - "Localization Decision"
Cohesion: 1.0
Nodes (1): D-011 Langue Francais (Contenu) / Anglais (Cles Techniques)

## Knowledge Gaps
- **39 isolated node(s):** `AJV Schema Validation`, `Fagus sylvatica (Hetre commun)`, `Public Cible (Naturalistes Amateurs)`, `Principe d'Honnetete Epistemique`, `Differentiation de PlantNet` (+34 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `SVG Visual Identity`** (2 nodes): `Style V3 Croquis (Terracotta + Trait Noir)`, `Palette Terracotta SVG (#c1502e)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Project Philosophy`** (1 nodes): `Principe d'Honnetete Epistemique`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Localization Decision`** (1 nodes): `D-011 Langue Francais (Contenu) / Anglais (Cles Techniques)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Arbres-ID Project` connect `App Architecture Modules` to `Content Sources and Validation`, `Data Model and Roadmap`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Why does `Croquis SVG par Trait` connect `Content Sources and Validation` to `App Architecture Modules`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `Moteur Bayesien (Mise a Jour par Traits)` connect `Pilot Species and Content` to `App Architecture Modules`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **What connects `AJV Schema Validation`, `Fagus sylvatica (Hetre commun)`, `Public Cible (Naturalistes Amateurs)` to the rest of the system?**
  _39 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Architecture Modules` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Pilot Species and Content` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._