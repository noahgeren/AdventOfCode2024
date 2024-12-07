import { BigNumber } from "bignumber.js";
import { readFileSync } from "fs";

const data = readFileSync("./data/day7.txt")
  .toString()
  .split("\n")
  .map((row) => {
    let tokens = row.split(":");
    return [
      BigNumber(tokens[0]),
      ...tokens[1]
        .trim()
        .split(" ")
        .map((n) => BigNumber(n)),
    ];
  });

let modifiers: ((a: BigNumber, b: BigNumber) => BigNumber)[] = [
  (a, b) => a.plus(b),
  (a, b) => a.times(b),
];

const canCalculate = (expected: BigNumber, values: BigNumber[]): boolean => {
  if (values.length === 1) {
    return expected.comparedTo(values[0]) === 0;
  }
  const tail = values.slice(2);
  for (let mod of modifiers) {
    const head = mod(values[0], values[1]);
    if (
      head.comparedTo(expected) <= 0 &&
      canCalculate(expected, [head, ...tail])
    ) {
      return true;
    }
  }
  return false;
};

const getSum = () =>
  data
    .filter((row) => {
      return canCalculate(row[0], row.slice(1));
    })
    .reduce((a, b) => a.plus(b[0]), BigNumber(0));

console.log(getSum().toFixed());

modifiers.push((a, b) => BigNumber(a.toFixed() + b.toFixed()));

console.log(getSum().toFixed());
