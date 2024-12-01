import PromptSync from "prompt-sync";

const args: (string | undefined)[] = process.argv.slice(2);

const currentDate = new Date();
if (currentDate.getHours() >= 23) {
  currentDate.setHours(currentDate.getHours() + 1);
}

const defaultDay = +(args[1] ?? currentDate.getDate());

let day: number | string;
if (args[0] === "watch") {
  day = defaultDay;
} else if (args[0] && !Number.isNaN(+args[0])) {
  day = +args[0];
} else {
  day = PromptSync()(`Day [${defaultDay}]: `);
}

require(`./src/day${day && !Number.isNaN(+day) ? +day : defaultDay}.ts`);
