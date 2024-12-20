import { readFileSync } from "fs";
import TinyQueue from "tinyqueue";
import { DIRECTION_MAP, Vector2d } from "../utilities/constants";
import HashSet from "../utilities/HashSet";

const map = readFileSync("./data/day20.txt")
	.toString()
	.split("\n")
	.map((row) => row.split(""));

let start = { x: 0, y: 0 },
	end = start;
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (map[y][x] === "S") {
			start = { x, y };
			map[y][x] = ".";
		} else if (map[y][x] === "E") {
			end = { x, y };
			map[y][x] = ".";
		}
	}
}

const solveMaze = (): number => {
	const seen = new HashSet<Vector2d>(
		(coord) => coord.y * map[0].length + coord.x
	);

	const remainingPositions = new TinyQueue(
		[{ coord: { ...start }, length: 0 }],
		(a, b) => a.length - b.length
	);

	while (remainingPositions.length) {
		const { coord, length } = remainingPositions.pop()!;
		if (coord.x === end.x && coord.y === end.y) {
			return length;
		}
		for (const direction of Object.values(DIRECTION_MAP)) {
			const newCoord = {
				x: coord.x + direction.x,
				y: coord.y + direction.y
			};
			if (
				newCoord.x < 0 ||
				newCoord.x >= map[0].length ||
				newCoord.y < 0 ||
				newCoord.y >= map.length ||
				map[newCoord.y][newCoord.x] === "#" ||
				seen.has(newCoord)
			) {
				continue;
			}
			seen.add(newCoord);
			remainingPositions.push({ coord: newCoord, length: length + 1 });
		}
	}

	return -1;
};

const baseLength = solveMaze();

let count = 0;
for (let y = 0; y < map.length - 1; y++) {
	for (let x = 0; x < map[y].length - 1; x++) {
		if (map[y][x] === ".") {
			continue;
		}
		map[y][x] = ".";
		let newLength = solveMaze();
		if (newLength <= baseLength - 100) {
			count++;
		}
		map[y][x] = "#";
	}
}

console.log(count);

// TODO: Rework this to 2 loops over each position on the original solution
//          - checking if they are correct distance apart
//          - check distance that is skipped
