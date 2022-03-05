<script lang="ts">
import BoardComponent from "./conway/BoardComponent.svelte";
</script>

<main>
  <BoardComponent/>
</main>

<style>

  :global(*, ::after, ::before) {
    box-sizing: border-box;
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
