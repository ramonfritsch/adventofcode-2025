// Advent of Code - Day 2 - Part Two

function isInvalidID(number: number): boolean {
  const str = String(number);
  const len = str.length;

  if (len === 0) {
    return false;
  }

  for (let c = 1; c < len; c++) {
    const first = str.slice(0, c);
    const nChunk = len / c;

    if (nChunk === 1 || nChunk !== Math.round(nChunk)) {
      continue;
    }

    for (let i = 1; i < nChunk; i++) {
      const chunk = str.slice(i * c, (i + 1) * c);
      if (chunk !== first) {
        break;
      }
      if (i === nChunk - 1) {
        return true;
      }
    }
  }

  return false;
}

export function part2(input: string): number {
  const pairs = input.split(',');

  let invalidIDsSum = 0;

  for (const pair of pairs) {
    const [start, end] = pair.split('-').map(Number);

    for (let i = start; i <= end; i++) {
      if (isInvalidID(i)) {
        // console.log('invalid ID', i, isInvalidID(i, true));
        invalidIDsSum += i;
      }
    }
  }

  return invalidIDsSum;
}
