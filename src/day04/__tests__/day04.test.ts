// Advent of Code - Day 4

import { describe, expect, test } from 'vitest';
import { part1 } from '../part1.js';
import { part2 } from '../part2.js';

const input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

describe('Day 4', () => {
  test('Part 1', () => {
    expect(part1(input)).toBe(13);
  });

  test('Part 2', () => {
    expect(part2(input)).toBe(43);
  });
});
