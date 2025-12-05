// Advent of Code - Day 5 - Part Two

export function part2(input: string): number {
  const sections = input.split('\n\n');
  const ranges = sections[0]
    .split('\n')
    .map((range) => range.split('-').map(Number));

  // Optimize ranges, merging overlapping ones.
  const reducedRanges = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    reducedRanges.push(ranges[i]);

    // Optimize ranges, merging from last to first.
    for (let j = reducedRanges.length - 1; j > 0; j--) {
      const currentRange = reducedRanges[j];

      // Find a range it can merge with, if found then break the `j` loop.
      for (let k = j - 1; k >= 0; k--) {
        const otherRange = reducedRanges[k];
        if (
          currentRange[0] <= otherRange[1] &&
          currentRange[1] >= otherRange[0]
        ) {
          otherRange[0] = Math.min(currentRange[0], otherRange[0]);
          otherRange[1] = Math.max(currentRange[1], otherRange[1]);

          // Remove current range as it got merged
          reducedRanges.splice(j, 1);

          break;
        }
      }
    }
  }

  const sum = reducedRanges.reduce(
    (acc, [start, end]) => acc + (end - start + 1),
    0,
  );

  return sum;
}
