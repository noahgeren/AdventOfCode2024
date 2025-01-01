import { ONE, ZERO } from "#/utilities/constants";
import { readInputFile } from "#/utilities/general";
import BigNumber from "bignumber.js";

const data = readInputFile(2023, 19).split("\n\n");
interface Rule {
	operand?: "x" | "m" | "a" | "s";
	operator?: "<" | ">";
	value?: number;
	result: string;
}
const workflows: Record<string, Rule[]> = data[0].split("\n").reduce(
	(tempWorkflows, row) => {
		const [name, rules] = row.split("{");
		tempWorkflows[name] = rules
			.replace("}", "")
			.split(",")
			.map((rule) => {
				const tokens = rule.split(":");
				if (tokens.length === 1) {
					return { result: tokens[0] };
				}
				const operator = tokens[0].includes("<") ? "<" : ">";
				const [operand, value] = tokens[0].split(operator);
				return {
					operand: operand as Rule["operand"],
					operator,
					value: +value,
					result: tokens[1]
				};
			});
		return tempWorkflows;
	},
	{} as Record<string, Rule[]>
);

const ratings = data[1].split("\n").map((row) => {
	const rating: Record<string, number> = {};
	row.replace(/{|}/g, "")
		.split(",")
		.forEach((token) => {
			const [variable, value] = token.split("=");
			rating[variable] = +value;
		});
	return rating;
});

const testRating = (rating: Record<string, number>): boolean => {
	let workflowId = "in";
	while (workflowId !== "A" && workflowId !== "R") {
		workflowId = workflows[workflowId].find(
			(rule) =>
				!rule.operand ||
				(rule.operator === "<"
					? rating[rule.operand] < rule.value!
					: rating[rule.operand] > rule.value!)
		)!.result;
	}
	return workflowId === "A";
};

const totalOfAcceptableRatings = ratings
	.filter(testRating)
	.reduce(
		(total, rating) =>
			total.plus(Object.values(rating).reduce((a, b) => a + b, 0)),
		ZERO
	);
console.log(totalOfAcceptableRatings.toFixed());

const oneToFourThousand = Object.keys([...Array(4000)]).map((n) => +n + 1);
const allPossibleValues = {
	x: [...oneToFourThousand],
	m: [...oneToFourThousand],
	a: [...oneToFourThousand],
	s: [...oneToFourThousand]
};

const findAcceptableCombinations = (
	workflowId: string,
	possibleValues: typeof allPossibleValues
): BigNumber => {
	if (
		workflowId === "R" ||
		Object.values(possibleValues).some(
			(possibleRatings) => !possibleRatings.length
		)
	) {
		return ZERO;
	} else if (workflowId === "A") {
		return Object.values(possibleValues).reduce(
			(a, b) => a.times(b.length),
			ONE
		);
	}

	let totalCombinations = ZERO;
	for (const rule of workflows[workflowId]) {
		if (!rule.operand || !rule.operator || rule.value === undefined) {
			totalCombinations = totalCombinations.plus(
				findAcceptableCombinations(rule.result, possibleValues)
			);
		} else {
			totalCombinations = totalCombinations.plus(
				findAcceptableCombinations(rule.result, {
					...possibleValues,
					[rule.operand]: possibleValues[rule.operand].filter(
						(testValue) => {
							return rule.operator === "<"
								? testValue < rule.value!
								: testValue > rule.value!;
						}
					)
				})
			);
			possibleValues = {
				...possibleValues,
				[rule.operand]: possibleValues[rule.operand].filter(
					(testValue) => {
						return rule.operator === "<"
							? testValue >= rule.value!
							: testValue <= rule.value!;
					}
				)
			};
		}
	}

	return totalCombinations;
};

console.log(findAcceptableCombinations("in", allPossibleValues).toFixed());
