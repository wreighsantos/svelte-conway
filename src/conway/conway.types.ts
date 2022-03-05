export interface Cell {
  readonly isAlive: boolean;
}

export const emptyBoard = ({
  height,
  width,
}: {
  readonly height: number;
  readonly width: number;
}): readonly Cell[][] => Array(height).fill(
  Array(width).fill({ isAlive: false }),
);
