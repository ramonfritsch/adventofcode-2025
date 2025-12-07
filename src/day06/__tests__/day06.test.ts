// Advent of Code - Day 6

import { describe, expect, test } from 'vitest';
import { part1 } from '../part1.js';
import { part2 } from '../part2.js';

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

describe('Day 6', () => {
  test('Part 1', () => {
    expect(part1(input)).toBe(4277556);
  });

  test('Part 2', () => {
    expect(part2(input)).toBe(3263827);
  });
});
