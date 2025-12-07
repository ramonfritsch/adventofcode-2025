// Advent of Code - Day 7 - Part One

export function part1(input: string): number {
  const lines = input.split('\n').map((line) => line.split(''));

  let splittersFound = 0;

  for (let i = 1, l = lines.length - 1; i < l; i++) {
    for (let j = 0, l2 = lines[i].length - 1; j < l2; j++) {
      const above = lines[i - 1][j];
      const current = lines[i][j];
      if (above === '|' || above === 'S') {
        if (current === '^') {
          splittersFound++;

          if (j > 0) {
            lines[i][j - 1] = '|';
          }
          if (j < l2) {
            lines[i][j + 1] = '|';
          }
        } else {
          lines[i][j] = '|';
        }
      }
    }
  }

  return splittersFound;
}
