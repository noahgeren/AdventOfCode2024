import { readInputFile } from "#/utilities/general";

const data = readInputFile(2023, 19).split("\n\n");
interface Rule {
	operand?: string;
	operator?: "<" | ">";
	value?: number;
	result: string;
}
const workflows: Record<string, Rule[]> = data[0]
	.split("\n")
	.reduce((tempWorkflows, row) => {
		const [name, rules] = row.split("{");
		return {
			...tempWorkflows,
			[name]: rules
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
						operand,
						operator,
						value: +value,
						result: tokens[1]
					};
				})
		};
	}, {});

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
			total + Object.values(rating).reduce((a, b) => a + b, 0),
		0
	);
console.log(totalOfAcceptableRatings);

// TODO: Solve part 2 by finding all ranges that are/aren't acceptable
