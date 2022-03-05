<script lang="ts">
import { onMount } from 'svelte';

  import { sleep } from '../utils/time';
  import CellComponent from './CellComponent.svelte';
  import { Cell, emptyBoard } from './conway.types';
  export let height = 50;
  export let width = 50;

  let board: readonly Cell[][] = emptyBoard({ height, width});
  let delay = 500;
  let isPlaying = false;

  const handleClickCell = (xClick, yClick) => {
    board = board.map((row, y) =>
      row.map((cell, x) =>
        xClick === x && yClick === y ? { isAlive: !cell.isAlive } : cell,
    ));
  }

  const handleClickClear = () => { board = emptyBoard({ height, width }) };

  const game = async () => {
    if (isPlaying) {
      await sleep(delay)
      board = createNextGeneration(board);
    }
    window.requestAnimationFrame(game);
  }

  const createNextGeneration = (board: readonly Cell[][]): Cell[][] => {
    return board.map((row, y) =>
      row.map(({ isAlive }, x) => {
        const aliveNeighbors = countAliveNeighbors(board, x, y);
        return {
          isAlive: (!isAlive && aliveNeighbors === 3) ||
            (isAlive && [2, 3].includes(aliveNeighbors)),
        };
      }),
    );
  }

  const countAliveNeighbors = (
    board: readonly Cell[][],
    x: number,
    y: number,
  ): number => {
    let aliveNeighbors = 0;
    const neighbors = [
      board[y - 1]?.[x - 1],
      board[y - 1]?.[x],
      board[y - 1]?.[x + 1],
      board[y][x - 1],
      board[y][x + 1],
      board[y + 1]?.[x - 1],
      board[y + 1]?.[x],
      board[y + 1]?.[x + 1],
    ];

    neighbors.forEach(neighbor => {
      if (neighbor?.isAlive) aliveNeighbors++;
    });
    return aliveNeighbors;
  }

  onMount(() => {
    window.requestAnimationFrame(game);
  });
</script>

<div class="Board">
  {#each board as row, y}
    <span class="Board-row">
      {#each row as cell, x}
        <div class="Board-cell">
          <CellComponent
            isAlive={cell.isAlive}
            on:click={() => handleClickCell(x, y)}
          />
        </div>
      {/each}
    </span>
  {/each}
</div>
<div class="Control">
  <div>
    <button on:click={() => isPlaying = !isPlaying}>
      { isPlaying ? 'Stop' : 'Play' }
    </button>
  </div>
  Speed {1000/delay}x
  <div>
    <input
      max="1000"
      min="10"
      step="10"
      type="range"
      bind:value={delay}
    />
  </div>
  <div>
    <button on:click={handleClickClear}>Clear</button>
  </div>
</div>

<style lang="scss">
  .Board {
    cursor: pointer;

    &-row {
      border-top: 1px solid black;
      display: flex;
      width: fit-content;
    }

    &-row:last-child {
      border-bottom: 1px solid black;
    }

    &-cell {
      border-left: 1px solid black;
    }

    &-cell:last-child {
      border-right: 1px solid black;
    }
  }
</style>
