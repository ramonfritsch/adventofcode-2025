// Advent of Code - Day 10 - Part Two
import { solve, type Model, type Coefficients } from 'yalps';

type Line = {
  lights: number[];
  toggles: number[][];
};

function solveMinimumToggles(line: Line): number {
  const numLights = line.lights.length;
  const numToggles = line.toggles.length;

  // Build constraints: one for each light position
  // Each constraint specifies that the sum of toggles affecting that light = target value
  const constraints: Record<string, { equal: number }> = {};
  for (let i = 0; i < numLights; i++) {
    constraints[`light${i}`] = { equal: line.lights[i] };
  }

  // Build variables: one for each toggle
  // Each variable has coefficients for:
  // - Each light it affects (coefficient = 1)
  // - The objective "total" (coefficient = 1, so minimizing total minimizes sum of all toggles)
  const variables: Record<string, Coefficients<string>> = {};
  for (let toggleIdx = 0; toggleIdx < numToggles; toggleIdx++) {
    const coeffs: Record<string, number> = { total: 1 };

    // Add coefficient 1 for each light this toggle affects
    for (const lightIdx of line.toggles[toggleIdx]) {
      coeffs[`light${lightIdx}`] = 1;
    }

    variables[`t${toggleIdx}`] = coeffs;
  }

  // Build the model
  const model: Model = {
    direction: 'minimize',
    objective: 'total',
    constraints,
    variables,
    integers: true, // All toggle counts must be integers
  };

  // Solve
  const solution = solve(model);

  if (solution.status === 'optimal') {
    return solution.result;
  } else {
    // No solution found (infeasible or unbounded)
    return 0;
  }
}

export function part2(input: string): number {
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

  return lines.reduce((sum, line) => sum + solveMinimumToggles(line), 0);
}
