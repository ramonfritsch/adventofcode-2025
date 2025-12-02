// Advent of Code - Day 1 - Part One

export function part1(input: string): number {
  const instructions = input.split('\n');

  let currentPlace = 50;
  let totalVisitsTo0 = 0;

  for (const instruction of instructions) {
    const direction = instruction.charAt(0) === 'L' ? -1 : 1;
    const steps = parseInt(instruction.slice(1));

    currentPlace = (currentPlace + direction * steps) % 100;

    if (currentPlace === 0) {
      totalVisitsTo0++;
    }
  }

  return totalVisitsTo0;
}
