<script>
  import { sketchUrl } from '../lib/species.js';
  let { path, alt } = $props();
  let url = $derived(sketchUrl(path));
</script>

{#if url}
  <img src={url} {alt} class="w-full max-h-72 object-contain bg-white rounded-lg border border-stone-200" />
{:else}
  <div class="w-full h-48 flex items-center justify-center bg-stone-100 rounded-lg border border-dashed border-stone-300 text-stone-500 text-sm">
    Croquis manquant : {path}
  </div>
{/if}
