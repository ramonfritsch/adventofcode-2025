// Advent of Code - Day 8 - Part Two

export function part2(input: string): number {
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

  const connected = new Set<string>();

  for (const key of sortedByDistanceKeys) {
    if (connected.has(key)) {
      continue;
    }

    const [i, j] = key.split(',').map(Number);

    connected.add(key);
    connected.add(`${j},${i}`);

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

    if (circuits.length === 1) {
      return boxes[i][0] * boxes[j][0];
    }
  }

  return 0;
}
