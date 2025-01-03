import { readInputFile } from "#/utilities/general";

const masses = readInputFile(2019, 1)
	.split("\n")
	.map((n) => +n);

const calculateFuel = (mass: number) => Math.max(Math.floor(mass / 3) - 2, 0);
const totalFuel = masses.reduce((a, b) => a + calculateFuel(b), 0);
console.log(totalFuel);

const recursiveTotalFuel = masses.reduce((a, b) => {
	let fuel = calculateFuel(b);
	while (fuel > 0) {
		a += fuel;
		fuel = calculateFuel(fuel);
	}
	return a;
}, 0);
console.log(recursiveTotalFuel);
