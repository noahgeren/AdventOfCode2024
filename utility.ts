import BigNumber from "bignumber.js";
import deepEqual from "deep-equal";

type Key =
  | number
  | string
  | boolean
  | undefined
  | BigNumber
  | { [k: number | string]: Key };
const defaultHashFunction = (key: Key): number => {
  switch (typeof key) {
    case "number":
      return key;
    case "string":
      let hash = 7;
      for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
      }
      return hash;
    case "boolean":
      return key ? 1 : 0;
    case "undefined":
      return -1;
    case "object":
      if (BigNumber.isBigNumber(key)) {
        return key.abs().mod(Number.MAX_SAFE_INTEGER).toNumber();
      }
      return Object.keys(key)
        .sort()
        .reduce<number>(
          (hash, k) =>
            (31 * hash + defaultHashFunction(key[k])) % Number.MAX_SAFE_INTEGER,
          7
        );
  }
};

export const HashMap = <K extends Key, V>(
  hashFunction: (key: K) => number | string = defaultHashFunction
) => {
  const _map = new Map<number | string, { key: K; value: V }[]>();

  return {
    ..._map,
    set(key: K, value: V) {
      const hash = hashFunction(key);
      const bucket = _map.get(hash);
      if (!bucket) {
        _map.set(hash, [{ key, value }]);
        return;
      }
      // Check if there is a matching key in the bucket
      for (const entry of bucket) {
        if (deepEqual(key, entry.key)) {
          entry.value = value;
          return;
        }
      }
      bucket.push({ key, value });
    },
    get(key: K) {
      const hash = hashFunction(key);
      const bucket = _map.get(hash) ?? [];
      for (const entry of bucket) {
        if (deepEqual(key, entry.key)) {
          return entry.value;
        }
      }
      return undefined;
    },
    has(key: K) {
      const hash = hashFunction(key);
      const bucket = _map.get(hash) ?? [];
      for (let i = 0; i < bucket.length; i++) {
        if (deepEqual(key, bucket[i].key)) {
          return true;
        }
      }
      return false;
    },
    delete(key: K) {
      const hash = hashFunction(key);
      const bucket = _map.get(hash) ?? [];
      for (let i = 0; i < bucket.length; i++) {
        if (deepEqual(key, bucket[i].key)) {
          bucket.splice(i, 1);
          return true;
        }
      }
      return false;
    },
    forEach(callbackFn: (entry: { key: K; value: V }) => void) {
      _map.forEach((bucket) => bucket.forEach(callbackFn));
    },
    entries() {
      return [..._map.values()].flat();
    },
    keys() {
      return [..._map.values()].flat().map((obj) => obj.key);
    },
    values() {
      return [..._map.values()].flat().map((obj) => obj.value);
    },
    size() {
      return this.entries().length;
    },
  };
};

export const HashSet = <T extends Key>(
  hashFunction: (value: T) => number | string = defaultHashFunction
) => {
  const _map = HashMap<T, boolean>(hashFunction);

  return {
    ..._map,
    add(value: T) {
      _map.set(value, true);
    },
    forEach(callbackFn: (value: T) => void) {
      _map.forEach((value) => callbackFn(value.key));
    },
    entries() {
      return _map.keys();
    },
    values() {
      return _map.keys();
    },
  };
};

export const inBounds = (x: number, y: number, data: unknown[][]) =>
  x >= 0 && y >= 0 && y < data.length && x < data[y].length;

export interface Vector2d extends Record<string, Key> {
  x: number;
  y: number;
}

export const ZERO = BigNumber(0);
export const ONE = BigNumber(1);
