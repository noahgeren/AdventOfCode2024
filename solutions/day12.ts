import BigNumber from "bignumber.js";
import { readFileSync } from "fs";

const data = readFileSync("./data/day12.txt")
  .toString()
  .split("\n")
  .map((row) => row.split(""));

const hash = (x: number, y: number) => y * data[0].length + x;

const seen = new Set<number>();
const findPrice = (
  x: number,
  y: number,
  expected: string,
  price: {
    area: number;
    perimeter: number;
  }
): void => {
  if (seen.has(hash(x, y)) || data[y]?.[x] !== expected) {
    return;
  }
  seen.add(hash(x, y));

  price.area++;
  price.perimeter +=
    (data[y - 1]?.[x] !== expected ? 1 : 0) +
    (data[y + 1]?.[x] !== expected ? 1 : 0) +
    (data[y]?.[x - 1] !== expected ? 1 : 0) +
    (data[y]?.[x + 1] !== expected ? 1 : 0);

  findPrice(x, y - 1, expected, price);
  findPrice(x, y + 1, expected, price);
  findPrice(x - 1, y, expected, price);
  findPrice(x + 1, y, expected, price);
};
let totalPrice = BigNumber(0);

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data.length; x++) {
    const price = { area: 0, perimeter: 0 };
    findPrice(x, y, data[y][x], price);
    totalPrice = totalPrice.plus(BigNumber(price.area).times(price.perimeter));
  }
}

console.log(totalPrice.toFixed());
