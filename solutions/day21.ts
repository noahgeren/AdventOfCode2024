import BigNumber from "bignumber.js";
import { readFileSync } from "fs";
import { ZERO } from "../utilities/constants";

// Must format each input file line as CODE-NUMERIC_INSTRUCTIONS
// NUMERIC_INSTRUCTION needs to be found manually
const data = readFileSync("./data/day21.txt")
	.toString()
	.split("\n")
	.map((line) => line.split("-"));

type ArrowKey = "^" | "<" | "v" | ">" | "A";
type PathId = `${ArrowKey}-${ArrowKey}`;
const directionKeypad: Record<PathId, string> = {
	"^-^": "",
	"^-<": "v<",
	"^-v": "v",
	"^->": "v>",
	"^-A": ">",
	"<-^": ">^",
	"<-<": "",
	"<-v": ">",
	"<->": ">>",
	"<-A": ">>^",
	"v-^": "^",
	"v-<": "<",
	"v-v": "",
	"v->": ">",
	"v-A": ">^",
	">-^": "<^",
	">-<": "<<",
	">-v": "<",
	">->": "",
	">-A": "^",
	"A-^": "<",
	"A-<": "v<<",
	"A-v": "v<",
	"A->": "v",
	"A-A": ""
};

const getKeyPresses = (keys: string): string => {
	const tokens = ("A" + keys).split("") as ArrowKey[];
	let presses = "";
	for (let i = 0; i < tokens.length - 1; i++) {
		presses += directionKeypad[`${tokens[i]}-${tokens[i + 1]}`] + "A";
	}
	return presses;
};

let sum = ZERO;
for (const line of data) {
	sum = sum.plus(
		BigNumber(line[0].substring(0, line[0].length - 1)).times(
			getKeyPresses(getKeyPresses(line[1])).length
		)
	);
}
console.log(sum);

// TODO: Part 2
//   - Try breaking down each block (part between A's) into it's recursive length
