// Advent of Code - Day 7 - Part Two

function walkUp(
  lines: string[][],
  i: number,
  j: number,
  l: number,
  cache: Record<string, number> = {},
): number {
  const key = `${i},${j}`;
  if (cache[key]) {
    return cache[key];
  }

  const above = lines[i - 1][j];

  if (above === 'S') {
    return 1;
  }

  let paths = 0;
  if (j > 0 && lines[i][j - 1] === '^') {
    paths += walkUp(lines, i - 1, j - 1, l, cache);
  }

  if (j < l - 1 && lines[i][j + 1] === '^') {
    paths += walkUp(lines, i - 1, j + 1, l, cache);
  }

  if (above === '|') {
    paths += walkUp(lines, i - 1, j, l, cache);
  }

  cache[key] = paths;

  return paths;
}

export function part2(input: string): number {
  const lines = input.split('\n').map((line) => line.split(''));

  for (let i = 1, l = lines.length; i < l; i++) {
    for (let j = 0, l2 = lines[i].length; j < l2; j++) {
      const above = lines[i - 1][j];
      const current = lines[i][j];
      if (above === '|' || above === 'S') {
        if (current === '^') {
          if (j > 0) {
            lines[i][j - 1] = '|';
          }
          if (j < l2) {
            lines[i][j + 1] = '|';
          }
        } else {
          lines[i][j] = '|';
        }
      } else {
        if (current === '^') {
          lines[i][j] = '.';
        }
      }
    }
  }

  // console.log(lines.map((line) => line.join('')).join('\n'));

  let found = 0;
  const cache: Record<string, number> = {};
  const lastIndex = lines.length - 1;
  for (let j = 0, l = lines[0].length; j < l; j++) {
    const current = lines[lastIndex][j];

    if (current === '|') {
      found += walkUp(lines, lastIndex, j, l, cache);
    }
  }

  return found;
}
