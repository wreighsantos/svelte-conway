<script lang="ts">
  export let isAlive: boolean;
</script>

<span class="Cell" class:isAlive on:click></span>

<style lang="scss">
  .Cell {
    background-color: #c1c1c1;
    display: block;
    height: 12px;
    width: 12px;

    &.isAlive {
      background-color: #228c22;
    }
  }
</style>
