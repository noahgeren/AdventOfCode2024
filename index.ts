const args: (string | undefined)[] = process.argv.slice(2);

const currentDate = new Date();
if (currentDate.getHours() >= 23) {
	currentDate.setHours(currentDate.getHours() + 1);
}

let year = currentDate.getFullYear();
if (currentDate.getMonth() < 10) {
	year--;
}
let day = Math.min(currentDate.getDate(), 25);
if (args[0] === "watch") {
	args.shift();
}
if (args[0] && args[1]) {
	year = +args[0];
	day = +args[1];
} else if (args[0]) {
	if (args[0].includes("-")) {
		[year, day] = args[0].split("-").map((s) => +s);
	} else {
		day = +args[0];
	}
}
console.log(`Running Solution for Day ${day} of ${year}`);
console.log();

const TIMER_ID = "\nTime";
console.time(TIMER_ID);

await import(`./solutions/${year}/day${day}.ts`);

console.timeEnd(TIMER_ID);

export {};
