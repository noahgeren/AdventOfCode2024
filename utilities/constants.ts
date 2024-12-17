import BigNumber from "bignumber.js";

export const ZERO = BigNumber(0);
export const ONE = BigNumber(1);
export const ONE_THOUSAND = BigNumber("1000");

export interface Vector2d {
	x: number;
	y: number;
}

/**
 * Ordinal clockwise starting from UP
 */
export enum Direction {
	UP,
	RIGHT,
	DOWN,
	LEFT
}

export const DIRECTION_MAP = {
	[Direction.UP]: { x: 0, y: -1 },
	[Direction.RIGHT]: { x: 1, y: 0 },
	[Direction.DOWN]: { x: 0, y: 1 },
	[Direction.LEFT]: { x: -1, y: 0 }
} as const;

export const moveDirection = (
	coord: Vector2d,
	direction: Direction
): Vector2d => ({
	x: coord.x + DIRECTION_MAP[direction].x,
	y: coord.y + DIRECTION_MAP[direction].y
});
