// Advent of Code - Day 8 - Part One

export function part1(input: string, maxConnections = -1): number {
  const boxes = input.split('\n').map((line) => line.split(',').map(Number));

  const distancesMap: Record<string, number> = {};

  for (let i = 0, l = boxes.length; i < l; i++) {
    const [a, b, c] = boxes[i];

    for (let j = i + 1; j < l; j++) {
      const key1 = `${i},${j}`;
      const key2 = `${j},${i}`;

      if (distancesMap[key1] !== undefined) {
        continue;
      }

      if (distancesMap[key2] !== undefined) {
        continue;
      }

      const [a2, b2, c2] = boxes[j];

      const distance = Math.sqrt((a - a2) ** 2 + (b - b2) ** 2 + (c - c2) ** 2);

      distancesMap[`${i},${j}`] = distance;
    }
  }

  const sortedByDistanceKeys = Object.entries(distancesMap)
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key);

  // Circuits initially are just boxes isolated by themselves
  const circuits = boxes.map((_, i) => [i]);

  let n = 0;
  const max = maxConnections > -1 ? maxConnections : boxes.length;

  const connected = new Set<string>();

  for (const key of sortedByDistanceKeys) {
    if (connected.has(key)) {
      continue;
    }

    const [i, j] = key.split(',').map(Number);

    connected.add(key);
    connected.add(`${j},${i}`);

    if (++n > max) {
      break;
    }

    // Merge circuit that includes J into circuit that includes I, then remove J circuit from list
    const iCircuitIndex = circuits.findIndex((circuit) =>
      circuit.some((c) => c === i),
    );
    const jCircuitIndex = circuits.findIndex((circuit) =>
      circuit.some((c) => c === j),
    );

    // If not a circular reference, merge circuits
    if (iCircuitIndex !== jCircuitIndex) {
      circuits[jCircuitIndex] = circuits[jCircuitIndex].concat(
        circuits[iCircuitIndex],
      );
      circuits.splice(iCircuitIndex, 1);
    }
  }

  const sortedCircuits = circuits.sort((a, b) => b.length - a.length);

  const largest = sortedCircuits.slice(0, 3);

  return largest.reduce((acc, circuit) => acc * circuit.length, 1);
}
