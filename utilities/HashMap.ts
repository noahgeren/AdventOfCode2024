export default class HashMap<K, V> implements Map<K, V> {
	[Symbol.toStringTag] = "HashMap";

	private map = new Map<number | string, [K, V]>();
	private hashFunction: (key: K) => number | string;

	constructor(
		hashFunction: (key: K) => number | string,
		iterable?: Iterable<[K, V]> | null | undefined
	) {
		this.hashFunction = hashFunction;
		if (iterable) {
			for (const entry of iterable) {
				this.set(entry[0], entry[1]);
			}
		}
	}
	clear() {
		this.map.clear();
	}
	delete(key: K) {
		return this.map.delete(this.hashFunction(key));
	}
	entries() {
		return this.map.values();
	}
	forEach(callbackFn: (value: V, key: K, map: HashMap<K, V>) => void) {
		this.map.forEach(([key, value]) => {
			callbackFn(value, key, this);
		});
	}
	get(key: K) {
		return this.map.get(this.hashFunction(key))?.[1];
	}
	has(key: K) {
		return this.map.has(this.hashFunction(key));
	}
	keys() {
		return [...this.entries()].map((entry) => entry[0])[Symbol.iterator]();
	}
	set(key: K, value: V) {
		this.map.set(this.hashFunction(key), [key, value]);
		return this;
	}
	values() {
		return [...this.entries()].map((entry) => entry[1])[Symbol.iterator]();
	}
	get size() {
		return this.map.size;
	}
	[Symbol.iterator]() {
		return this.entries();
	}
}
