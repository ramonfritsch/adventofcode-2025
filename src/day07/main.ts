// Advent of Code - Day 7

import { readFile } from 'fs/promises';
import { part1 } from './part1.js';
import { part2 } from './part2.js';
import profile from '../helpers/profile.js';

(async function () {
  try {
    const input: string = await readFile('src/day07/resources/input.txt', 'utf8');

    console.log('--- Part One ---');
    console.log('Result', profile(() => part1(input)), '\n');

    console.log('--- Part Two ---');
    console.log('Result', profile(() => part2(input)), '\n');
  } catch (err) {
    console.error(err);
  }
})();
