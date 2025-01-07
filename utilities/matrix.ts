export interface Vector2d<T = number> {
	x: T;
	y: T;
}

/**
 * Ordinally clockwise starting from UP=0
 */
export enum Direction {
	UP,
	RIGHT,
	DOWN,
	LEFT
}

export const DIRECTIONS = [
	Direction.UP,
	Direction.RIGHT,
	Direction.DOWN,
	Direction.LEFT
];
export const DIRECTION_MAP = {
	[Direction.UP]: { x: 0, y: -1 },
	[Direction.RIGHT]: { x: 1, y: 0 },
	[Direction.DOWN]: { x: 0, y: 1 },
	[Direction.LEFT]: { x: -1, y: 0 }
} as const;

export const moveDirection = (
	coord: Vector2d<number>,
	direction: Direction
): Vector2d => ({
	x: coord.x + DIRECTION_MAP[direction].x,
	y: coord.y + DIRECTION_MAP[direction].y
});

export const inBounds = (
	coord: Vector2d<number>,
	matrix: unknown[][]
): boolean =>
	coord.y >= 0 &&
	coord.y < matrix.length &&
	coord.x >= 0 &&
	coord.x < matrix[coord.y].length;

export const getPositionHashFunction =
	(matrix: unknown[][]): ((coord: Vector2d<number>) => number) =>
	(coord) =>
		coord.y * matrix[coord.y].length + coord.x;

export const printMatrix = (
	matrix: string[][],
	overwriteFn?: (coord: Vector2d, value: string) => string | undefined
): void => {
	for (let y = 0; y < matrix.length; y++) {
		console.log(
			matrix[y]
				.map(
					(cell, x) =>
						(overwriteFn && overwriteFn({ x, y }, cell)) || cell
				)
				.join("")
		);
	}
};
