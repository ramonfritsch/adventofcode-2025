// Advent of Code - Day 9 - Part One

export function part1(input: string): number {
  const points = input.split('\n').map((line) => line.split(',').map(Number));

  let largestArea = 0;

  for (let i = 0, l = points.length; i < l; i++) {
    const [x, y] = points[i];

    for (let j = 0, l2 = points.length; j < l2; j++) {
      const [x2, y2] = points[j];
      const area = (Math.abs(x - x2) + 1) * (Math.abs(y - y2) + 1);

      if (area > largestArea) {
        largestArea = area;
      }
    }
  }

  return largestArea;
}
