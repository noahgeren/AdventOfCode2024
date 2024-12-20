import BigNumber from "bignumber.js";
import PromptSync from "prompt-sync";

export const ZERO = BigNumber(0);
export const ONE = BigNumber(1);
export const TWO = BigNumber(2);
export const EIGHT = TWO.pow(3);
export const ONE_THOUSAND = BigNumber("1000");

export interface Vector2d {
	x: number;
	y: number;
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

export const bitwiseXOR = (a: BigNumber, b: BigNumber) => {
	let aBinary = a.toString(2),
		bBinary = b.toString(2);
	if (aBinary.length > bBinary.length) {
		// pad b
		bBinary =
			Array(aBinary.length - bBinary.length)
				.fill("0")
				.join("") + bBinary;
	} else {
		// pad a
		aBinary =
			Array(bBinary.length - aBinary.length)
				.fill("0")
				.join("") + aBinary;
	}
	const xorBinary: number[] = [];
	for (let i = 0; i < aBinary.length; i++) {
		xorBinary.push(+aBinary[i] ^ +bBinary[i]);
	}
	return BigNumber(xorBinary.join(""), 2);
};

const prompt = PromptSync();
export const pause = (): boolean => {
	return prompt("press enter to continue: ") === "exit";
};
