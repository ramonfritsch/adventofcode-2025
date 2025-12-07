// Advent of Code - Day 6 - Part One

export function part1(input: string): number {
  const lines = input.split('\n');
  const parsed = lines.map((line) => line.split(' ').filter(Boolean));

  let sum = 0;

  // For each column
  for (let i = 0, l = parsed[0].length; i < l; i++) {
    const operator = parsed[lines.length - 1][i];

    let result = parseInt(parsed[0][i]);

    for (let j = 1, l2 = lines.length - 1; j < l2; j++) {
      const number = parsed[j][i];

      if (operator === '*') {
        result *= parseInt(number);
      } else if (operator === '+') {
        result += parseInt(number);
      }
    }

    sum += result;
  }

  return sum;
}
