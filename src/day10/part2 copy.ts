// Advent of Code - Day 10 - Part Two

import { init } from 'z3-solver';

type Line = {
  lights: number[];
  toggles: number[][];
};

export async function part2(input: string): Promise<number> {
  const lines = input.split('\n').map((line) => {
    const lights = line
      .slice(line.indexOf('{') + 1, line.lastIndexOf('}'))
      .split(',')
      .map(Number);

    const toggles = line
      .slice(line.indexOf('(') + 1, line.lastIndexOf(')'))
      .split(') (')
      .map((p) => p.split(',').map(Number));

    return { lights, toggles };
  });

  // Initialize Z3 once
  const { Context } = await init();
  const { Solver, Int, Sum } = Context('main');

  let totalResult = 0;

  // Process each line with the same Z3 context
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const solver = new Solver();

    // Create a variable for each toggle operation (how many times we use it)
    const toggleVars = line.toggles.map((_, i) =>
      Int.const(`line${lineIdx}_t${i}`),
    );

    // All toggle counts must be non-negative
    toggleVars.forEach((v) => solver.add(v.ge(0)));

    // For each light position, the sum of toggle applications must equal the initial value
    for (let lightIdx = 0; lightIdx < line.lights.length; lightIdx++) {
      const targetValue = line.lights[lightIdx];

      // Build the sum of all toggles that affect this light
      const terms = [];
      for (let toggleIdx = 0; toggleIdx < line.toggles.length; toggleIdx++) {
        if (line.toggles[toggleIdx].includes(lightIdx)) {
          terms.push(toggleVars[toggleIdx]);
        }
      }

      if (terms.length === 0) {
        // No toggle affects this light, so it must already be 0
        if (targetValue !== 0) {
          continue; // Skip this line
        }
      } else {
        solver.add(Sum(...terms).eq(targetValue));
      }
    }

    // Check if there's a solution
    const checkResult = await solver.check();
    if (checkResult !== 'sat') {
      continue; // Skip if no solution
    }

    // Binary search for minimum total toggles
    let low = 0;
    let high = line.lights.reduce((sum, val) => sum + val, 0) * 2;
    let bestSolution = Infinity;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      // Push a new solver context
      solver.push();
      solver.add(Sum(...toggleVars).le(mid));

      const result = await solver.check();

      if (result === 'sat') {
        // Found a solution with at most 'mid' toggles
        const model = solver.model();
        const totalToggles = toggleVars.reduce((sum, v) => {
          const val = model.eval(v);
          return sum + Number(val.value());
        }, 0);
        bestSolution = Math.min(bestSolution, totalToggles);
        high = mid - 1;
      } else {
        // No solution with at most 'mid' toggles
        low = mid + 1;
      }

      solver.pop();
    }

    totalResult += bestSolution;
  }

  return totalResult; // 21696 (5700ms)
}
