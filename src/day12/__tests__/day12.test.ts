// Advent of Code - Day 12

import { describe, expect, test } from 'vitest';
import { part1 } from '../part1.js';
import { part2 } from '../part2.js';

const input = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

describe('Day 12', () => {
  test('Part 1', () => {
    expect(part1(input)).toBe(2);
  });

  test('Part 2', () => {
    expect(part2('')).toBe(0);
  });
});
