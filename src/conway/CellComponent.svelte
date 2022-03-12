<script lang="ts">
  export let isAlive: boolean = false;
  export let size: number = 8;
</script>

<span
  class="Cell"
  class:isAlive
  style:height={size + 'px'}
  style:width={size + 'px'}
  on:click
></span>

<style lang="scss">
  .Cell {
    background-color: black;
    display: block;

    &.isAlive {
      background-color: #49a749;
    }
  }
</style>
