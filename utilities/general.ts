import BigNumber from "bignumber.js";
import PromptSync from "prompt-sync";

export const prompt = PromptSync();
export const pause = (): boolean => {
	return prompt("press enter to continue: ") === "exit";
};

export const bitwiseXOR = (a: BigNumber, b: BigNumber) => {
	let aBinary = a.toString(2),
		bBinary = b.toString(2);
	if (aBinary.length > bBinary.length) {
		// pad b
		bBinary =
			Array(aBinary.length - bBinary.length)
				.fill("0")
				.join("") + bBinary;
	} else {
		// pad a
		aBinary =
			Array(bBinary.length - aBinary.length)
				.fill("0")
				.join("") + aBinary;
	}
	const xorBinary: number[] = [];
	for (let i = 0; i < aBinary.length; i++) {
		xorBinary.push(+aBinary[i] ^ +bBinary[i]);
	}
	return BigNumber(xorBinary.join(""), 2);
};

export const intersection = <T>(xs?: T[], ys?: T[], ...rest: T[][]): T[] =>
	xs === undefined
		? []
		: ys === undefined
			? xs
			: intersection(
					xs.filter((x) => ys.some((y) => y === x)),
					...rest
				);
