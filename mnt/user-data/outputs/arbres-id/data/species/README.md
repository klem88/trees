# /data/species

Une fiche JSON par espèce d'arbre couverte. Le nom du fichier correspond au champ `id` de la fiche (slug du nom scientifique).

## Convention de nommage

- Format : `{genre-en-minuscules}-{epithete}.json`
- Exemple : `Ulmus minor` → `ulmus-minor.json`

## Validation

Chaque fiche doit être conforme au schéma JSON sous `../schemas/species.schema.json`.

Validation manuelle (à terme, en CI) avec un outil comme `ajv-cli` :

```bash
ajv validate -s ../schemas/species.schema.json -d "*.json"
```

## État de couverture

| Espèce | Statut | Validé par botaniste | Date |
|---|---|---|---|
| Ulmus minor (orme champêtre) | Brouillon (template) | Non | — |

> Mettre à jour ce tableau à chaque fiche ajoutée.
