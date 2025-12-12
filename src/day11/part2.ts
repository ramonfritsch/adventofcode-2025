// Advent of Code - Day 11 - Part Two

export function part2(input: string): number {
  const lines = input.split('\n');

  const outIndex = -1;

  const indexGraph = new Map<number, number[]>();
  const indexMap = new Map<string, number>();

  for (let i = 0, l = lines.length; i < l; i++) {
    const line = lines[i];
    const [from] = line.split(': ');

    indexMap.set(from, i);
  }

  for (let i = 0, l = lines.length; i < l; i++) {
    const line = lines[i];
    const parts = line.split(': ');

    indexGraph.set(
      i,
      parts[1].split(' ').map((to) => indexMap.get(to) ?? outIndex),
    );
  }

  indexGraph.set(outIndex, []);

  const fftIndex = indexMap.get('fft')!;
  const dacIndex = indexMap.get('dac')!;
  const svrIndex = indexMap.get('svr')!;

  const cache = new Map<string, number>();

  function pathsTo(from: number, end: number): number {
    const cacheKey = `${from}-${end}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    if (from === end) {
      return 1;
    }

    const tos = indexGraph.get(from)!;

    let pathsFound = 0;

    for (let i = 0, l = tos.length; i < l; i++) {
      const to = tos[i];

      pathsFound += pathsTo(to, end);
    }

    cache.set(cacheKey, pathsFound);

    return pathsFound;
  }

  // How many paths from `out` to `svr`, passing through `fft` and `dac`?
  const countAB = pathsTo(svrIndex, fftIndex);
  const countBC = pathsTo(fftIndex, dacIndex);
  const countCD = pathsTo(dacIndex, outIndex);

  const countAC = pathsTo(svrIndex, dacIndex);
  const countCB = pathsTo(dacIndex, fftIndex);
  const countBD = pathsTo(fftIndex, outIndex);

  return countAB * countBC * countCD + countAC * countCB * countBD;
}
