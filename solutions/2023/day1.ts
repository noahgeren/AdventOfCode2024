import { readInputFile } from "#/utilities/general";

const data = readInputFile(2023, 1).split("\n");

let searchValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => ({
	str: n.toString(),
	value: n
}));
const getTotal = () =>
	data
		.map((row) => {
			let first = -1,
				last = -1;
			for (let i = 0; i < row.length; i++) {
				searchValues.forEach((needle) => {
					if (
						row.substring(i, i + needle.str.length) === needle.str
					) {
						if (first === -1) {
							first = needle.value;
						}
						last = needle.value;
					}
				});
			}
			return +`${first}${last}`;
		})
		.reduce((a, b) => a + b, 0);

console.log(getTotal());

searchValues = [
	...searchValues,
	...[
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine"
	].map((str, idx) => ({ str, value: idx + 1 }))
];

console.log(getTotal());
