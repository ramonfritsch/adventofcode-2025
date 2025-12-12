// Advent of Code - Day 11 - Part One

export function part1(input: string): number {
  const lines = input.split('\n');

  const graph = new Map<string, string[]>();

  for (const line of lines) {
    const [from, to] = line.split(': ');
    graph.set(from, to.split(' '));
  }

  function pathsToOut(from: string, state: { count: number }): number {
    const tos = graph.get(from);
    if (!tos) {
      return state.count;
    }

    for (let i = 0, l = tos.length; i < l; i++) {
      const to = tos[i];
      if (to === 'out') {
        state.count++;
        continue;
      }

      if (to === 'you') {
        continue;
      }

      pathsToOut(to, state);
    }

    return state.count;
  }

  // How many paths from `you` to `out`?
  const count = pathsToOut('you', { count: 0 });

  return count;
}
