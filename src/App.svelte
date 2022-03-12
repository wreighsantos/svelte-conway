<script lang="ts">
  import BoardComponent from "./conway/BoardComponent.svelte";
</script>

<main>
  <div class="Container">
    <BoardComponent/>
  </div>
</main>

<style lang="scss">
  .Container {
    overflow-x: hidden;
  }
</style>
