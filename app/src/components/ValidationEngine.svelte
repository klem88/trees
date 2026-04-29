<script>
  import Sketch from './Sketch.svelte';

  let {
    species,
    candidates,
    traitIndex = $bindable(0),
    validated = $bindable([]),
    answer = $bindable(null),
    onPushHistory,
    onBack,
    canGoBack,
    onConfirm,
    onEliminate,
    onAllEliminated
  } = $props();

  let showHelp = $state(false);

  const SEASON_LABELS = { spring: 'printemps', summer: 'été', autumn: 'automne', winter: 'hiver' };
  const SEASON_NOW = (() => {
    const m = new Date().getMonth();
    if (m >= 2 && m <= 4) return 'spring';
    if (m >= 5 && m <= 7) return 'summer';
    if (m >= 8 && m <= 10) return 'autumn';
    return 'winter';
  })();

  let trait = $derived(species.traits[traitIndex]);
  let outOfSeason = $derived(trait.seasonality && !trait.seasonality.includes(SEASON_NOW));
  let seasonText = $derived(
    trait.seasonality ? trait.seasonality.map((s) => SEASON_LABELS[s]).join(', ') : ''
  );

  function answerYes() { answer = 'yes'; }
  function answerNo() { answer = 'no'; }
  function answerUnknown() { answer = 'unknown'; }

  function next() {
    onPushHistory();

    if (answer === 'yes') validated = [...validated, trait];

    if (answer === 'no') {
      const remaining = candidates.filter((c) => c.id !== species.id);
      if (remaining.length === 0) onAllEliminated();
      else onEliminate(remaining);
      return;
    }

    if (traitIndex + 1 >= species.traits.length) {
      onConfirm({ species, validated });
      return;
    }
    traitIndex += 1;
    answer = null;
    showHelp = false;
  }
</script>

<div class="max-w-2xl mx-auto p-6">
  {#if canGoBack}
    <button
      onclick={onBack}
      class="mb-4 flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors">
      <span aria-hidden="true">←</span> Retour
    </button>
  {/if}

  <div class="text-sm text-stone-500 mb-1">
    Espèce testée : <span class="italic">{species.scientificName}</span> · trait {traitIndex + 1}/{species.traits.length}
  </div>
  <h2 class="text-xl font-medium mb-2">{trait.question}</h2>

  {#if trait.discriminantPower === 'signature'}
    <div class="mb-3 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
      <span aria-hidden="true">★</span>
      <span>Trait signature — à lui seul, presque conclusif pour cette espèce</span>
    </div>
  {/if}

  {#if outOfSeason}
    <div class="mb-3 text-xs px-3 py-2 rounded-md bg-amber-50 border border-amber-200 text-amber-800">
      📅 Trait observable surtout en {seasonText}. Si tu n'observes pas ce détail aujourd'hui, réponds « Je ne sais pas ».
    </div>
  {/if}

  <Sketch path={trait.sketch} alt={trait.sketchAlt} />

  {#if trait.sketchCaption}
    <p class="mt-2 text-xs text-stone-500 italic">{trait.sketchCaption}</p>
  {/if}

  {#if !answer}
    <div class="grid grid-cols-3 gap-2 mt-5">
      <button onclick={answerYes} class="py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Oui</button>
      <button onclick={answerNo} class="py-3 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700">Non</button>
      <button onclick={answerUnknown} class="py-3 rounded-lg bg-stone-200 text-stone-800 font-medium hover:bg-stone-300">Je ne sais pas</button>
    </div>

    <button onclick={() => (showHelp = !showHelp)} class="mt-4 text-sm text-emerald-700 underline">
      {showHelp ? 'Masquer' : 'En savoir plus'}
    </button>
    {#if showHelp}
      <p class="mt-2 text-sm text-stone-600 leading-relaxed">{trait.extendedHelp}</p>
    {/if}
  {:else}
    <div class="mt-5 p-4 rounded-lg bg-stone-100 border border-stone-200">
      {#if answer === 'yes'}
        <p class="text-emerald-800">{trait.feedbackYes}</p>
      {:else if answer === 'no'}
        <p class="text-rose-800">{trait.feedbackNo}</p>
      {:else}
        <p class="text-stone-700">Pas de souci — on passe au trait suivant. Ce trait est neutralisé.</p>
      {/if}
      <div class="mt-4 flex items-center gap-4">
        <button onclick={() => { answer = null; }} class="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors">
          <span aria-hidden="true">←</span> Changer ma réponse
        </button>
        <button onclick={next} class="px-4 py-2 rounded-lg bg-stone-900 text-white font-medium">
          {answer === 'no' ? 'Espèce suivante' : (traitIndex + 1 >= species.traits.length ? 'Voir la fiche' : 'Trait suivant')}
        </button>
      </div>
    </div>
  {/if}

  {#if validated.length}
    <div class="mt-6 text-xs text-stone-500">Traits déjà validés : {validated.map((t) => t.id).join(', ')}</div>
  {/if}
</div>
