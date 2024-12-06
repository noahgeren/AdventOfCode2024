// import {BigNumber} from "bignumber.js";
import { readFileSync } from "fs";

const data = readFileSync("./data/day6.txt")
  .toString()
  .split("\n")
  .map((line) => line.split(""));

let guard: { x: number; y: number } = { x: -1, y: -1 };
for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    if (data[y][x] === "^") {
      guard = { x, y };
      break;
    }
  }
  if (guard.x !== -1) {
    break;
  }
}
const startingPosition = { ...guard };

let guardDirectionIndex = 0;
let distictCells = new Set<number>();
while (
  guard.y >= 0 &&
  guard.y < data.length &&
  guard.x >= 0 &&
  guard.x < data[0].length
) {
  distictCells.add(guard.y * data[0].length + guard.x);
  let newPos = { ...guard };
  if (guardDirectionIndex === 0) {
    newPos.y--;
  } else if (guardDirectionIndex === 1) {
    newPos.x++;
  } else if (guardDirectionIndex === 2) {
    newPos.y++;
  } else if (guardDirectionIndex === 3) {
    newPos.x--;
  }
  if (data[newPos.y]?.[newPos.x] === "#") {
    guardDirectionIndex = (guardDirectionIndex + 1) % 4;
  } else {
    guard = newPos;
  }
}

console.log(distictCells.size);

const hasLoop = (newData: string[][]): boolean => {
  let guard = { ...startingPosition };
  let guardDirectionIndex = 0;
  let seen = new Set<number>();
  while (
    guard.y >= 0 &&
    guard.y < data.length &&
    guard.x >= 0 &&
    guard.x < data[0].length
  ) {
    const hash =
      guard.y * data[0].length * 4 + guard.x * 4 + guardDirectionIndex;
    if (seen.has(hash)) {
      return true;
    }
    seen.add(hash);
    let newPos = { ...guard };
    if (guardDirectionIndex === 0) {
      newPos.y--;
    } else if (guardDirectionIndex === 1) {
      newPos.x++;
    } else if (guardDirectionIndex === 2) {
      newPos.y++;
    } else if (guardDirectionIndex === 3) {
      newPos.x--;
    }
    if (newData[newPos.y]?.[newPos.x] === "#") {
      guardDirectionIndex = (guardDirectionIndex + 1) % 4;
    } else {
      guard = newPos;
    }
  }
  return false;
};

let count = 0;
data.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === ".") {
      let newData = data.map((row) => [...row]);
      newData[y][x] = "#";
      if (hasLoop(newData)) {
        count++;
      }
    }
  });
});
console.log(count);
