import { readInputFile } from "#/utilities/general";

const code = readInputFile(2019, 2).split(",").map(Number);

const runCode = (startingMemory: number[]): number => {
	const code = [...startingMemory];
	programLoop: for (
		let instructionPointer = 0;
		instructionPointer < code.length;
		instructionPointer += 4
	) {
		switch (code[instructionPointer]) {
			case 1:
				code[code[instructionPointer + 3]] =
					code[code[instructionPointer + 1]] +
					code[code[instructionPointer + 2]];
				break;
			case 2:
				code[code[instructionPointer + 3]] =
					code[code[instructionPointer + 1]] *
					code[code[instructionPointer + 2]];
				break;
			default:
				break programLoop;
		}
	}
	return code[0];
};

console.log(runCode([code[0], 12, 2, ...code.slice(3)]));

part2: for (let noun = 0; noun < 100; noun++) {
	for (let verb = 0; verb < 100; verb++) {
		if (runCode([code[0], noun, verb, ...code.slice(3)]) === 19690720) {
			console.log(noun * 100 + verb);
			break part2;
		}
	}
}
