import BigNumber from "bignumber.js";
import { readFileSync } from "fs";

const data = readFileSync("./data/day12.txt")
  .toString()
  .split("\n")
  .map((row) => row.split(""));

const hash = (x: number, y: number) => y * data[0].length + x;

const seen = new Set<number>();
interface Price {
  area: number;
  perimeter: number;
}
const findPrice = (x: number, y: number, expected: string): Price => {
  if (seen.has(hash(x, y)) || data[y]?.[x] !== expected) {
    return { area: 0, perimeter: 0 };
  }
  seen.add(hash(x, y));
  const above = findPrice(x, y - 1, expected),
    below = findPrice(x, y + 1, expected),
    left = findPrice(x - 1, y, expected),
    right = findPrice(x + 1, y, expected);

  const exposedPerimeter =
    (data[y - 1]?.[x] !== expected ? 1 : 0) +
    (data[y + 1]?.[x] !== expected ? 1 : 0) +
    (data[y]?.[x - 1] !== expected ? 1 : 0) +
    (data[y]?.[x + 1] !== expected ? 1 : 0);

  return {
    area: 1 + above.area + below.area + left.area + right.area,
    perimeter:
      exposedPerimeter +
      above.perimeter +
      below.perimeter +
      left.perimeter +
      right.perimeter,
  };
};
let totalPrice = BigNumber(0);

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data.length; x++) {
    const price = findPrice(x, y, data[y][x]);
    totalPrice = totalPrice.plus(BigNumber(price.area).times(price.perimeter));
  }
}

console.log(totalPrice.toFixed());
