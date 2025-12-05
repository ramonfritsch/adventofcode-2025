// Advent of Code - Day 3

import { describe, expect, test } from 'vitest';
import { part1 } from '../part1.js';
import { part2 } from '../part2.js';

describe('Day 3', () => {
  test('Part 1', () => {
    expect(
      part1(`987654321111111
811111111111119
234234234234278
818181911112111`),
    ).toBe(357);
  });

  test('Part 2', () => {
    expect(
      part2(`987654321111111
      811111111111119
      234234234234278
      818181911112111`),
    ).toBe(3121910778619);
  });
});
