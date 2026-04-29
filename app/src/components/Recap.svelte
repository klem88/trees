<script>
  let { species, validated, onRestart } = $props();
</script>

<div class="max-w-2xl mx-auto p-6">
  <div class="rounded-xl bg-white border border-emerald-200 p-6 shadow-sm">
    <div class="text-sm uppercase tracking-wide text-emerald-700 mb-1">Identification confirmée</div>
    <h1 class="text-3xl font-semibold">{species.commonNameFr}</h1>
    <div class="italic text-stone-500 mb-4">{species.scientificName} · {species.family}</div>

    <p class="text-stone-700 leading-relaxed mb-3">{species.summary}</p>

    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-5">
      <div>
        <dt class="text-stone-500">Habitat</dt>
        <dd class="text-stone-800">{species.habitat}</dd>
      </div>
      <div>
        <dt class="text-stone-500">Taille typique</dt>
        <dd class="text-stone-800">{species.typicalSize}</dd>
      </div>
    </dl>

    <h3 class="text-sm font-medium text-stone-700 mb-2">Traits validés</h3>
    {#if validated.length === 0}
      <p class="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-3 mb-5">
        Aucun trait n'a été clairement validé. L'identification reste incertaine — observer à nouveau l'arbre dans de meilleures conditions est recommandé.
      </p>
    {:else}
      <ul class="space-y-1 mb-5">
        {#each validated as t}
          <li class="text-sm text-stone-700 flex items-start gap-1.5">
            <span class="text-emerald-700">✓</span>
            <span>
              {t.label}
              {#if t.discriminantPower === 'signature'}
                <span class="ml-1 text-xs text-emerald-700" title="Trait signature — à lui seul presque conclusif">★</span>
              {/if}
            </span>
          </li>
        {/each}
      </ul>
    {/if}

    <button onclick={onRestart} class="px-4 py-2 rounded-lg bg-stone-900 text-white font-medium">Identifier un autre arbre</button>
  </div>
</div>
