// Advent of Code - Day 3

import { readFile } from 'fs/promises';
import { part1 } from './part1.js';
import { part2 } from './part2.js';
import profile from '../helpers/profile.js';

(async function () {
  try {
    const input: string = await readFile(
      'src/day03/resources/input.txt',
      'utf8',
    );

    console.log('--- Part One ---');
    console.log(
      'Result',
      profile(() => part1(input)),
    );

    console.log('--- Part Two ---');
    console.log(
      'Result',
      profile(() => part2(input)),
    );
  } catch (err) {
    console.error(err);
  }
})();
