<script>
  import { allSpecies } from './lib/species.js';
  import SpeciesPicker from './components/SpeciesPicker.svelte';
  import ValidationEngine from './components/ValidationEngine.svelte';
  import Transition from './components/Transition.svelte';
  import Recap from './components/Recap.svelte';

  let stage = $state('pick');
  let candidates = $state([]);
  let current = $state(null);
  let eliminated = $state(null);
  let result = $state(null);

  // Lifted so the history stack can snapshot and restore them
  let traitIndex = $state(0);
  let validatedTraits = $state([]);
  let currentAnswer = $state(null);

  let history = $state([]);
  let canGoBack = $derived(history.length > 0);

  function pushHistory() {
    history = [
      ...history,
      {
        stage,
        candidates: [...candidates],
        current,
        eliminated,
        traitIndex,
        validatedTraits: [...validatedTraits]
      }
    ];
  }

  function goBack() {
    if (!history.length) return;
    const prev = history.at(-1);
    history = history.slice(0, -1);
    stage = prev.stage;
    candidates = prev.candidates;
    current = prev.current;
    eliminated = prev.eliminated;
    traitIndex = prev.traitIndex;
    validatedTraits = prev.validatedTraits;
    currentAnswer = null;
  }

  function start(species) {
    history = [];
    candidates = [species, ...allSpecies.filter((s) => s.id !== species.id)];
    current = species;
    traitIndex = 0;
    validatedTraits = [];
    currentAnswer = null;
    stage = 'validate';
  }

  function onConfirm({ species, validated }) {
    result = { species, validated };
    stage = 'recap';
  }

  function onEliminate(remaining) {
    eliminated = current;
    candidates = remaining;
    current = remaining[0];
    traitIndex = 0;
    validatedTraits = [];
    currentAnswer = null;
    stage = 'transition';
  }

  function onAllEliminated() {
    stage = 'failed';
  }

  function continueToNext() {
    traitIndex = 0;
    validatedTraits = [];
    currentAnswer = null;
    stage = 'validate';
  }

  function restart() {
    stage = 'pick';
    candidates = [];
    current = null;
    eliminated = null;
    result = null;
    traitIndex = 0;
    validatedTraits = [];
    currentAnswer = null;
    history = [];
  }
</script>

<main class="min-h-full py-8">
  {#if stage === 'pick'}
    <SpeciesPicker onpick={start} />
  {:else if stage === 'validate' && current}
    {#key current.id}
      <ValidationEngine
        species={current}
        {candidates}
        bind:traitIndex={traitIndex}
        bind:validated={validatedTraits}
        bind:answer={currentAnswer}
        onPushHistory={pushHistory}
        onBack={goBack}
        {canGoBack}
        {onConfirm}
        {onEliminate}
        {onAllEliminated} />
    {/key}
  {:else if stage === 'transition' && eliminated && current}
    <Transition {eliminated} next={current} onContinue={continueToNext} onBack={goBack} {canGoBack} />
  {:else if stage === 'recap' && result}
    <Recap species={result.species} validated={result.validated} onRestart={restart} />
  {:else if stage === 'failed'}
    <div class="max-w-2xl mx-auto p-6 text-center">
      <h2 class="text-xl font-medium mb-2">Identification non concluante</h2>
      <p class="text-stone-600 mb-4">Toutes les espèces candidates ont été écartées.</p>
      <button onclick={restart} class="px-4 py-2 rounded-lg bg-stone-900 text-white">Recommencer</button>
    </div>
  {/if}
</main>
