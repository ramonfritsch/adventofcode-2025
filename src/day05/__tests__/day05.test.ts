// Advent of Code - Day 5

import { describe, expect, test } from 'vitest';
import { part1 } from '../part1.js';
import { part2 } from '../part2.js';

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe('Day 5', () => {
  test('Part 1', () => {
    expect(part1(input)).toBe(3);
  });

  test('Part 2', () => {
    expect(part2(input)).toBe(14);
  });
});
