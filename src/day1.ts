import { BigNumber } from "bignumber.js";
import { readFileSync } from "node:fs";

let data = readFileSync("./data/day1.txt")
  .toString()
  .split("\n")
  .map((row) => row.split(/\s+/).map((n) => +n));

data.pop();

let leftSide = data.map((row) => row[0]).sort();
let rightSide = data.map((row) => row[1]).sort();

let diffSum = BigNumber(0);
for (let i = 0; i < leftSide.length; i++) {
  diffSum = diffSum.plus(Math.abs(leftSide[i] - rightSide[i]));
}

console.log(diffSum.toFixed());

console.log(
  rightSide
    .filter((n) => leftSide.includes(n))
    .reduce((a, b) => a.plus(b), BigNumber(0))
    .toFixed()
);
