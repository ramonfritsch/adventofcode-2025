// Advent of Code - Day 1

import { describe, expect, test } from 'vitest';
import { part1 } from '../part1.js';
import { part2 } from '../part2.js';

describe('Day 1', () => {
  test('Part 1', () => {
    expect(
      part1(`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`),
    ).toBe(3);
  });

  test('Part 2', () => {
    expect(
      part2(`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`),
    ).toBe(6);
  });
});
