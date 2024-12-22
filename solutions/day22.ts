import BigNumber from "bignumber.js";
import { readFileSync } from "fs";
import { bitwiseXOR, TWO, ZERO } from "../utilities/constants";

const ITERATIONS = 2000;
const MODULUS = BigNumber("16777216");
const THIRTY_TWO = TWO.pow(5);
const SIXTY_FOUR = TWO.pow(6);
const TWO_KIBI = TWO.pow(11);
const secretNumbers = readFileSync("./data/day22.txt")
	.toString()
	.split("\n")
	.map((n) => BigNumber(n));

const finalNumbers = secretNumbers.map((secret, idx) => {
	console.log(idx);
	for (let i = 0; i < ITERATIONS; i++) {
		secret = bitwiseXOR(secret, secret.times(SIXTY_FOUR)).mod(MODULUS);
		secret = bitwiseXOR(secret, secret.dividedToIntegerBy(THIRTY_TWO)).mod(
			MODULUS
		);
		secret = bitwiseXOR(secret, secret.times(TWO_KIBI)).mod(MODULUS);
	}
	return secret;
});

console.log(finalNumbers.reduce((a, b) => a.plus(b), ZERO));

// TODO: Can I bruteforce part 2 also?
