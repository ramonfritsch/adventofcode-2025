// Advent of Code - Day 9

import { describe, expect, test } from 'vitest';
import { part1 } from '../part1.js';
import { part2 } from '../part2.js';

const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

describe('Day 9', () => {
  test('Part 1', () => {
    expect(part1(input)).toBe(50);
  });

  test('Part 2', () => {
    expect(part2(input)).toBe(24);
  });
});
