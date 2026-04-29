<script>
  import { allSpecies } from '../lib/species.js';
  let { onpick } = $props();
</script>

<div class="max-w-2xl mx-auto p-6">
  <h1 class="text-3xl font-semibold mb-2">Arbres-ID</h1>
  <p class="text-stone-600 mb-6">Prototype — choisis une espèce pour simuler un résultat PlantNet et lancer la validation par traits.</p>

  <ul class="grid gap-3">
    {#each allSpecies as sp}
      <li>
        <button
          onclick={() => onpick(sp)}
          class="w-full text-left p-4 rounded-lg bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-sm transition">
          <div class="text-lg font-medium">{sp.commonNameFr}</div>
          <div class="text-sm italic text-stone-500">{sp.scientificName}</div>
          <div class="text-sm text-stone-600 mt-1">{sp.traits.length} traits · {sp.family}</div>
        </button>
      </li>
    {/each}
  </ul>
</div>
