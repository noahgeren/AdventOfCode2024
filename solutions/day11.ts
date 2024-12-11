import BigNumber from "bignumber.js";
import { readFileSync } from "fs";

let stones = readFileSync("./data/day11.txt")
  .toString()
  .split(" ")
  .map((n) => new BigNumber(n));

const ZERO = BigNumber(0);
const ONE = BigNumber(1);
const YEAR = BigNumber(2024);

let maxBlinks = 25;
const memory: Partial<Record<string, BigNumber>> = {};
const findLength = (n: BigNumber, blink: number): BigNumber => {
  if (blink === maxBlinks) {
    return ONE;
  }
  const nStr = n.toFixed();
  const hash = nStr + ("-" + (maxBlinks - blink));
  if (memory[hash] !== undefined) {
    return memory[hash];
  }
  let result = ONE;
  if (n.isEqualTo(ZERO)) {
    result = findLength(ONE, blink + 1);
  } else if (nStr.length % 2 === 0) {
    result = findLength(
      BigNumber(nStr.substring(0, nStr.length / 2)),
      blink + 1
    ).plus(findLength(BigNumber(nStr.substring(nStr.length / 2)), blink + 1));
  } else {
    result = findLength(n.times(YEAR), blink + 1);
  }
  memory[hash] = result;
  return result;
};

console.log(stones.reduce((a, b) => a.plus(findLength(b, 0)), ZERO).toFixed());

maxBlinks = 75;

console.log(stones.reduce((a, b) => a.plus(findLength(b, 0)), ZERO).toFixed());
