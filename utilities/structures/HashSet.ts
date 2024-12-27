export default class HashSet<T> implements Set<T> {
	[Symbol.toStringTag] = "HashSet";

	private map = new Map<string | number, T>();
	private hashFunction: (value: T) => number | string;

	constructor(
		hashFunction: (value: T) => number | string,
		iterable?: Iterable<T> | null | undefined
	) {
		this.hashFunction = hashFunction;
		if (iterable) {
			for (const value of iterable) {
				this.add(value);
			}
		}
	}
	add(value: T): this {
		this.map.set(this.hashFunction(value), value);
		return this;
	}
	clear(): void {
		this.map.clear();
	}
	delete(value: T): boolean {
		return this.map.delete(this.hashFunction(value));
	}
	forEach(callbackfn: (value: T, value2: T, set: HashSet<T>) => void): void {
		this.map.forEach((value) => callbackfn(value, value, this));
	}
	has(value: T): boolean {
		return this.map.has(this.hashFunction(value));
	}
	entries(): SetIterator<[T, T]> {
		return [...this.map.values()]
			.map((val) => [val, val] as [T, T])
			[Symbol.iterator]();
	}
	keys(): SetIterator<T> {
		return this.map.values();
	}
	values(): SetIterator<T> {
		return this.map.values();
	}
	get size() {
		return this.map.size;
	}
	[Symbol.iterator](): SetIterator<T> {
		return this.values();
	}
}
