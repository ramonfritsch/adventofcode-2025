// Advent of Code - Day 2 - Part One

function isInvalidID(number: number): boolean {
  const str = String(number);

  const len = str.length;

  if (len % 2 !== 0) {
    return false;
  }

  const mid = len / 2;

  for (let i = 0; i < mid; i++) {
    const char = str[i];
    const char2 = str[i + mid];

    if (char !== char2) {
      return false;
    }
  }

  return true;
}

export function part1(input: string): number {
  const pairs = input.split(',');

  let invalidIDsSum = 0;

  for (const pair of pairs) {
    const [start, end] = pair.split('-').map(Number);

    for (let i = start; i <= end; i++) {
      if (isInvalidID(i)) {
        invalidIDsSum += i;
      }
    }
  }

  return invalidIDsSum;
}
