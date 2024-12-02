import PromptSync from "prompt-sync";

const args: (string | undefined)[] = process.argv.slice(2);

const currentDate = new Date();
if (currentDate.getHours() >= 23) {
  currentDate.setHours(currentDate.getHours() + 1);
}

const defaultDay = +(args[1] ?? currentDate.getDate());

let day: number;
if (args[0] === "watch") {
  day = defaultDay;
} else if (args[0] && !Number.isNaN(+args[0])) {
  day = +args[0];
} else {
  const input = PromptSync()(`Day [${defaultDay}]: `);
  day = input && !Number.isNaN(+input) ? +input : defaultDay;
}

console.log(`Running Solution for Day ${day}`);
console.log();

const TIMER_ID = "\nTime";
console.time(TIMER_ID);

require(`./days/day${day}.ts`);

console.timeEnd(TIMER_ID);
