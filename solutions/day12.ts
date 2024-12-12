import BigNumber from "bignumber.js";
import { readFileSync } from "fs";
import { HashSet, ONE, Vector2d, ZERO } from "../utility";

const data = readFileSync("./data/day12.txt")
  .toString()
  .split("\n")
  .map((row) => row.split(""));

const hashFunction = (val: Vector2d) => val.y * data[0].length + val.x;

const seen = HashSet(hashFunction);
interface Price {
  area: BigNumber;
  perimeter: BigNumber;
}
const findPrice = (x: number, y: number, expected: string): Price => {
  const coord = { x, y };
  if (seen.has(coord) || data[y]?.[x] !== expected)
    return { area: ZERO, perimeter: ZERO };
  seen.add(coord);
  const above = findPrice(x, y - 1, expected),
    below = findPrice(x, y + 1, expected),
    left = findPrice(x - 1, y, expected),
    right = findPrice(x + 1, y, expected);

  const exposedPerimeter = (data[y - 1]?.[x] !== expected ? ONE : ZERO)
    .plus(data[y + 1]?.[x] !== expected ? ONE : ZERO)
    .plus(data[y]?.[x - 1] !== expected ? ONE : ZERO)
    .plus(data[y]?.[x + 1] !== expected ? ONE : ZERO);

  return {
    area: ONE.plus(above.area)
      .plus(below.area)
      .plus(left.area)
      .plus(right.area),
    perimeter: exposedPerimeter
      .plus(above.perimeter)
      .plus(below.perimeter)
      .plus(left.perimeter)
      .plus(right.perimeter),
  };
};
let totalPrice = ZERO;
for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data.length; x++) {
    const price = findPrice(x, y, data[y][x]);
    totalPrice = totalPrice.plus(price.area.times(price.perimeter));
  }
}

console.log(totalPrice.toFixed());
