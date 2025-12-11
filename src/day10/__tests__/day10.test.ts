// Advent of Code - Day 10

import { describe, expect, test } from 'vitest';
import { part1 } from '../part1.js';
import { part2 } from '../part2.js';

const input = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

describe('Day 10', () => {
  test('Part 1', () => {
    expect(part1(input)).toBe(7);
  });

  test('Part 2', () => {
    expect(part2(input)).toBe(33);
  });
});
