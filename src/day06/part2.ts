// Advent of Code - Day 6 - Part Two

export function part2(input: string): number {
  let lines = input.split('\n');

  // Right pad every line with the length of the longest line
  const maxLength = Math.max(...lines.map((line) => line.length));
  lines = lines.map((line) => line.padEnd(maxLength, ' '));

  const operatorsLine = lines[lines.length - 1];

  let sum = 0;

  // Last line has operators and determines how many digits per column
  lines.pop();

  let i = lines[0].length;
  while (i > 0) {
    const numbers: number[] = [];

    // Read whole column as a number
    do {
      i--;
      const columnNumber: string[] = [];

      for (let j = 0, l = lines.length; j < l; j++) {
        const n = lines[j][i];
        if (n !== ' ') {
          columnNumber.push(n);
        }
      }

      numbers.push(parseInt(columnNumber.join('')));
    } while (operatorsLine[i] === ' ');

    if (operatorsLine[i] === '*') {
      sum += numbers.reduce((acc, curr) => acc * curr, 1);
    } else if (operatorsLine[i] === '+') {
      sum += numbers.reduce((acc, curr) => acc + curr, 0);
    }

    // Skip blank column
    i--;
  }

  return sum;
}
