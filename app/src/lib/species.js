const speciesModules = import.meta.glob('../../../data/species/*.json', {
  eager: true,
  import: 'default'
});

const sketchModules = import.meta.glob('../../../assets/sketches/**/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
});

const sketchByPath = {};
for (const [absPath, url] of Object.entries(sketchModules)) {
  const key = absPath.split('/assets/sketches/')[1];
  sketchByPath[key] = url;
}

export const allSpecies = Object.values(speciesModules).sort((a, b) =>
  a.commonNameFr.localeCompare(b.commonNameFr, 'fr')
);

export function getSpeciesById(id) {
  return allSpecies.find((s) => s.id === id);
}

export function sketchUrl(relativePath) {
  return sketchByPath[relativePath] ?? null;
}
