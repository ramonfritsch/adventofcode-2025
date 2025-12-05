// Advent of Code - Day 3 - Part Two

function getBankMaxJoltage(bank: string, digits: number): number {
  const numbers = bank.split('').map(Number);
  const len = numbers.length;

  if (digits > len) {
    throw new Error('Digits cannot be greater than the length of the bank');
  }

  const output: number[] = [];
  let currentIndex = 0;

  while (output.length < digits) {
    const maxI = len - (digits - output.length) + 1;

    let highestDigit = 0;
    for (let i = currentIndex; i < maxI; i++) {
      const digit = numbers[i];
      if (digit > highestDigit) {
        highestDigit = digit;
        currentIndex = i + 1;

        if (digit === 9) {
          break;
        }
      }
    }

    output.push(highestDigit);
  }

  return parseInt(output.join(''));
}

export function part2(input: string): number {
  const banks = input.split('\n');

  let sum = 0;

  for (const bank of banks) {
    sum += getBankMaxJoltage(bank, 12);
  }

  return sum;
}
