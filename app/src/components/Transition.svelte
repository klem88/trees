<script>
  let { eliminated, next, onContinue, onBack, canGoBack } = $props();
</script>

<div class="max-w-2xl mx-auto p-6">
  <div class="rounded-xl bg-white border border-stone-200 p-6">
    <div class="text-sm uppercase tracking-wide text-rose-700 mb-1">Espèce écartée</div>
    <h2 class="text-xl font-medium mb-4">
      Ce n'était pas <span class="italic">{eliminated.commonNameFr}</span>.
    </h2>
    <p class="text-stone-700 mb-6">
      On regarde maintenant <strong>{next.commonNameFr}</strong>
      <span class="italic text-stone-500">({next.scientificName})</span> avec ses propres traits.
    </p>
    <div class="flex items-center gap-3">
      {#if canGoBack}
        <button
          onclick={onBack}
          class="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors">
          <span aria-hidden="true">←</span> Revenir à la question précédente
        </button>
      {/if}
      <button onclick={onContinue} class="px-4 py-2 rounded-lg bg-stone-900 text-white font-medium">Continuer</button>
    </div>
  </div>
</div>
