// Advent of Code - Day 4 - Part Two

export function part2(input: string): number {
  const grid = input
    .split('\n')
    .map((row) => row.split('').map((c) => (c === '@' ? true : false)));

  let accessibleCount = 0;

  const visits = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let removedSome = false;
  do {
    removedSome = false;

    for (let i = 0, l = grid.length; i < l; i++) {
      for (let j = 0, l2 = grid[i].length; j < l2; j++) {
        if (grid[i][j]) {
          let count = 0;
          // Look for 8 adjacent cells and if there are less than 4 '@' cells, then increment the accessibleCount
          for (const visit of visits) {
            const [di, dj] = visit;
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && ni < l && nj >= 0 && nj < l2 && grid[ni][nj]) {
              count++;
            }
          }
          if (count < 4) {
            removedSome = true;
            accessibleCount++;
            grid[i][j] = false;
          }
        }
      }
    }
  } while (removedSome);

  return accessibleCount;
}
