import { readFileSync } from "node:fs";
import { TWO, ZERO } from "../utilities/constants";

const data = readFileSync("./data/day24.txt").toString().split("\n\n");

const values: Partial<Record<string, boolean>> = {};

data[0].split("\n").forEach((row) => {
	const tokens = row.split(": ");
	values[tokens[0]] = tokens[1] === "1";
});

const formulas = data[1].split("\n").map((row) => {
	const tokens = row.split(" ");
	return {
		a: tokens[0],
		op: tokens[1] as "AND" | "OR" | "XOR",
		b: tokens[2],
		c: tokens[4]
	};
});

while (
	formulas.some(
		(formula) =>
			formula.c.startsWith("z") && values[formula.c] === undefined
	)
) {
	for (const formula of formulas) {
		if (
			values[formula.c] !== undefined ||
			values[formula.a] === undefined ||
			values[formula.b] === undefined
		) {
			continue;
		}
		switch (formula.op) {
			case "AND":
				values[formula.c] = values[formula.a] && values[formula.b];
				break;
			case "OR":
				values[formula.c] = values[formula.a] || values[formula.b];
				break;
			case "XOR":
				values[formula.c] = values[formula.a] !== values[formula.b];
				break;
		}
	}
}

const zValue = Object.keys(values)
	.filter((key) => key.startsWith("z"))
	.reduce((a, b) => (values[b] ? a.plus(TWO.pow(+b.substring(1))) : a), ZERO);
console.log(zValue.toFixed());
