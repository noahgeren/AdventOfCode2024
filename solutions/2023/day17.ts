import { readInputFile } from "#/utilities/general";
import {
	Direction,
	getPositionHashFunction,
	inBounds,
	moveDirection,
	Vector2d
} from "#/utilities/matrix";
import HashSet from "#/utilities/structures/HashSet";
import TinyQueue from "tinyqueue";

const data = readInputFile(2023, 17)
	.split("\n")
	.map((row) => row.split("").map((n) => +n));

interface PositionCost {
	position: Vector2d;
	cost: number;
	direction: Direction;
	steps: number;
}

const positionHashFn = getPositionHashFunction(data);

const solveMinHeatLoss = (maxSteps: number, minSteps = 0) => {
	const seen = new HashSet<PositionCost>(
		(pCost) =>
			positionHashFn(pCost.position) * 4 * (maxSteps + 1) +
			pCost.direction * (maxSteps + 1) +
			pCost.steps
	);
	const remainingPositions = new TinyQueue<PositionCost>(
		[
			{
				position: { x: 1, y: 0 },
				cost: data[0][1],
				direction: Direction.RIGHT,
				steps: 1
			},
			{
				position: { x: 0, y: 1 },
				cost: data[1][0],
				direction: Direction.DOWN,
				steps: 1
			}
		],
		(a, b) => a.cost - b.cost
	);

	while (remainingPositions.length) {
		const positionCost = remainingPositions.pop()!;
		if (seen.has(positionCost)) {
			continue;
		}
		seen.add(positionCost);
		const { position, cost, direction, steps } = positionCost;
		if (
			steps >= minSteps &&
			position.y === data.length - 1 &&
			position.x === data[0].length - 1
		) {
			return cost;
		}
		let newPosition = moveDirection(position, (direction + 1) % 4);
		if (steps >= minSteps && inBounds(newPosition, data)) {
			remainingPositions.push({
				position: { ...newPosition },
				cost: cost + data[newPosition.y][newPosition.x],
				direction: (direction + 1) % 4,
				steps: 1
			});
		}
		newPosition = moveDirection(position, (direction + 3) % 4);
		if (steps >= minSteps && inBounds(newPosition, data)) {
			remainingPositions.push({
				position: { ...newPosition },
				cost: cost + data[newPosition.y][newPosition.x],
				direction: (direction + 3) % 4,
				steps: 1
			});
		}
		newPosition = moveDirection(position, direction);
		if (steps < maxSteps && inBounds(newPosition, data)) {
			remainingPositions.push({
				position: { ...newPosition },
				cost: cost + data[newPosition.y][newPosition.x],
				direction,
				steps: steps + 1
			});
		}
	}
};

console.log(solveMinHeatLoss(3));
console.log(solveMinHeatLoss(10, 4));
