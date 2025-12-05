// Advent of Code - Day 5 - Part One

export function part1(input: string): number {
  const sections = input.split('\n\n');
  const ranges = sections[0]
    .split('\n')
    .map((range) => range.split('-').map(Number));
  const numbers = sections[1].split('\n').map(Number);

  let count = 0;
  for (const number of numbers) {
    if (ranges.some((range) => number >= range[0] && number <= range[1])) {
      count++;
    }
  }

  return count;
}
