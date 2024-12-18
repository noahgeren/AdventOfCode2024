import { readFileSync } from "fs";
import TinyQueue from "tinyqueue";
import { DIRECTION_MAP, Vector2d } from "../utilities/constants";
import HashSet from "../utilities/HashSet";

const SIZE = 71;
const BYTE_COUNT = 1024;
const incomingBytes: Vector2d[] = readFileSync("./data/day18.txt")
	.toString()
	.split("\n")
	.map((row) => {
		const coords = row.split(",");
		return { x: +coords[0], y: +coords[1] };
	});

const getPathLengthForBytes = (byteLength: number): number => {
	const bytes = new HashSet<Vector2d>(
		(coord) => coord.y * SIZE + coord.x,
		incomingBytes.slice(0, byteLength)
	);

	const seen = new HashSet<Vector2d>((coord) => coord.y * SIZE + coord.x);

	const remainingPositions = new TinyQueue(
		[{ coord: { x: 0, y: 0 }, total: 0 }],
		(a, b) => {
			const diff = a.total - b.total;
			return diff;
		}
	);

	while (remainingPositions.length) {
		const { coord, total } = remainingPositions.pop()!;
		if (coord.x === SIZE - 1 && coord.y === SIZE - 1) {
			return total;
		}
		for (const direction of Object.values(DIRECTION_MAP)) {
			const newCoord = {
				x: coord.x + direction.x,
				y: coord.y + direction.y
			};
			if (
				newCoord.x < 0 ||
				newCoord.x >= SIZE ||
				newCoord.y < 0 ||
				newCoord.y >= SIZE ||
				bytes.has(newCoord) ||
				seen.has(newCoord)
			) {
				continue;
			}
			seen.add(newCoord);
			remainingPositions.push({ coord: newCoord, total: total + 1 });
		}
	}

	return -1;
};

console.log(getPathLengthForBytes(BYTE_COUNT));

for (
	let byteLength = BYTE_COUNT + 1;
	byteLength < incomingBytes.length;
	byteLength++
) {
	if (getPathLengthForBytes(byteLength) === -1) {
		console.log(incomingBytes[byteLength - 1]);
		break;
	}
}
