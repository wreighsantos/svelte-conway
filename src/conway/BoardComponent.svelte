<script lang="ts">
  import { onMount } from 'svelte';
  import UiIcon from '../ui/icon/UiIcon.svelte';
  import { sleep } from '../utils/time';
  import CellComponent from './CellComponent.svelte';
  import { Cell, emptyBoard } from './conway.types';

  const SPEEDS = [1, 2, 4, 8, 16, 25, 50, 100];
  const DEFAULT_DELAY = 1000;
  const [DEFAULT_SPEED] = SPEEDS;
  let speed = DEFAULT_SPEED;
  let delay = DEFAULT_DELAY;
  let isPlaying = false;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let cellSize = 12;
  let height = Math.ceil(windowHeight / (cellSize + 1));
  let width = Math.ceil(windowWidth / (cellSize + 1));
  let board: readonly Cell[][] = emptyBoard({ height, width });

  $ : delay = DEFAULT_DELAY / speed;

  onMount(() => {
    window.requestAnimationFrame(game);
  });

  const game = async () => {
    if (isPlaying) {
      await sleep(delay);
      board = createNextGeneration(board);
    }
    window.requestAnimationFrame(game);
  }

  const handleSpeedClick = speedValue => {
    speed = speedValue;
  }

  const handlePlayClick = () => {
    isPlaying = !isPlaying;
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

  const handleClickCell = (xClick, yClick) => {
    board = board.map((row, y) =>
      row.map((cell, x) =>
        xClick === x && yClick === y ? { isAlive: !cell.isAlive } : cell,
    ));
  }

  const handleClickClear = () => { board = emptyBoard({ height, width }) };
</script>

<div class="Board">
  <div class="Board-wrapper">
    {#each board as row, y}
      <span class="Board-row">
        {#each row as cell, x}
          <div class="Board-cell">
            <CellComponent
              size={cellSize}
              isAlive={cell.isAlive}
              on:click={() => handleClickCell(x, y)}
            />
          </div>
        {/each}
      </span>
    {/each}
  </div>
  <div class="Board-controls">
    <div class="Board-controls-play">
      <button on:click={() => handlePlayClick()}>
        {#if isPlaying}
          <UiIcon name="pause"/>
        {:else}
          <UiIcon name="play"/>
        {/if}
      </button>
    </div>
    <div class="Board-controls-speed">
      <!-- TODO create radio button group -->
      {#each SPEEDS as speedValue}
        <button
          on:click={() => handleSpeedClick(speedValue)}
          disabled={speed == speedValue}
        >
          {speedValue}x
        </button>
      {/each}
    </div>
    <div class="Board-controls-clear">
      <button on:click={handleClickClear}>
        <UiIcon name="clear"/>
      </button>
    </div>
  </div>
</div>

<style lang="scss">
  .Board {
    position: relative;

    &-wrapper {
      cursor: pointer;
    }

    &-row {
      border-top: 1px solid #222222;
      display: flex;
      width: fit-content;
    }

    &-row:last-child {
      border-bottom: 1px solid #222222;
    }

    &-cell {
      border-left: 1px solid #222222;
    }

    &-cell:last-child {
      border-right: 1px solid #222222;
    }

    &-controls {
      background-color: #a5a5a5;
      display: flex;
      left: 0;
      margin: 0 auto;
      padding: 8px;
      position: absolute;
      right: 0;
      top: 24px;
      width: fit-content;
    }
  }
</style>
