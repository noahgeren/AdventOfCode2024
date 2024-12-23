import { readFileSync } from "fs";
import HashSet from "../utilities/HashSet";

const connections = readFileSync("./data/day23.txt")
	.toString()
	.split("\n")
	.map((row) => row.split("-") as [string, string]);

const multiconnections: Record<string, string[]> = {};
connections.forEach(([a, b]) => {
	multiconnections[a] ??= [];
	multiconnections[b] ??= [];
	multiconnections[a].push(b);
	multiconnections[b].push(a);
});

const triples = new HashSet<string[]>((key) => key.sort().join());
for (const [first, nextConnections] of Object.entries(multiconnections)) {
	if (!first.startsWith("t")) {
		continue;
	}
	for (const second of nextConnections) {
		for (const third of multiconnections[second]) {
			if (first === third || !nextConnections.includes(third)) {
				continue;
			}
			triples.add([first, second, third]);
		}
	}
}
console.log(triples.size);
