// Advent of Code - Day 10 - Part Two

type Line = {
  lights: number[];
  toggles: boolean[][];
};

// Solve the system of linear equations using Gaussian elimination
// and find the minimum non-negative integer solution
function solveMinimumToggles(line: Line): number {
  const numLights = line.lights.length;
  const numToggles = line.toggles.length;

  // Build coefficient matrix A where A[i][j] = 1 if toggle j affects light i
  const matrix: number[][] = [];
  for (let i = 0; i < numLights; i++) {
    const row: number[] = new Array(numToggles).fill(0);
    for (let j = 0; j < numToggles; j++) {
      if (line.toggles[j][i]) {
        row[j] = 1;
      }
    }
    matrix.push(row);
  }

  console.log(line.lights, '...');

  // Try to find a basic feasible solution using greedy + branch and bound
  // For each light, we need the sum of toggles affecting it to equal its value

  // Use branch and bound with intelligent pruning
  const bestSolution = { count: Infinity, solution: null as number[] | null };

  const baseMaxVal = line.lights.reduce((sum, val) => sum + val, 0);

  let iterations = 0;

  function branchAndBound(
    toggleCounts: number[],
    currentIndex: number,
    currentSum: number,
  ): void {
    // Pruning: if current sum already exceeds best, stop
    if (currentSum >= bestSolution.count) {
      return;
    }

    iterations++;
    if (iterations % 1000 === 0) {
      console.log('... iterations', iterations, currentIndex, currentSum);
    }

    // If we've assigned all toggles, check if it's a valid solution
    if (currentIndex === numToggles) {
      // Verify the solution satisfies all lights
      for (let i = 0; i < numLights; i++) {
        let sum = 0;
        for (let j = 0; j < numToggles; j++) {
          if (line.toggles[j][i]) {
            sum += toggleCounts[j];
          }
        }
        if (sum !== line.lights[i]) {
          return; // Invalid solution
        }
      }

      // Valid solution found
      if (currentSum < bestSolution.count) {
        bestSolution.count = currentSum;
        bestSolution.solution = [...toggleCounts];
        console.log('... maybe', currentSum, bestSolution.solution);
      }
      return;
    }

    // Calculate the constraints for the current toggle
    // Find the minimum and maximum possible values based on remaining constraints
    let minVal = 0;
    let maxVal = baseMaxVal;

    // Tighten bounds based on constraints
    for (let i = 0; i < numLights; i++) {
      if (line.toggles[currentIndex][i]) {
        // This toggle affects light i
        // Calculate how much is already contributed by previous toggles
        let alreadyContributed = 0;
        for (let j = 0; j < currentIndex; j++) {
          if (line.toggles[j][i]) {
            alreadyContributed += toggleCounts[j];
          }
        }

        const remaining = line.lights[i] - alreadyContributed;

        // Count how many future toggles (after current) can still affect this light
        let futureToggles = 0;
        for (let j = currentIndex + 1; j < numToggles; j++) {
          if (line.toggles[j][i]) {
            futureToggles++;
          }
        }

        if (futureToggles === 0) {
          // Current toggle is the last one that can affect this light
          // So it must contribute exactly the remaining amount
          if (remaining < 0) {
            return; // Impossible
          }
          if (remaining > minVal) {
            minVal = remaining;
          }
          if (remaining < maxVal) {
            maxVal = remaining;
          }
        } else {
          // Current toggle must contribute at most the remaining amount
          if (remaining < maxVal) {
            maxVal = remaining;
          }
        }
      }
    }

    // Try values from minVal to maxVal
    for (let val = minVal; val <= maxVal; val++) {
      toggleCounts[currentIndex] = val;
      branchAndBound(toggleCounts, currentIndex + 1, currentSum + val);
    }

    toggleCounts[currentIndex] = 0; // Reset for backtracking
  }

  branchAndBound(new Array(numToggles).fill(0), 0, 0);

  console.log('... solved', bestSolution.count);

  return bestSolution.count === Infinity ? 0 : bestSolution.count;
}

export function part2(input: string): number {
  const lines = input
    .split('\n')
    .map((line) => {
      const lights = line
        .slice(line.indexOf('{') + 1, line.lastIndexOf('}'))
        .split(',')
        .map(Number);

      const toggles = line
        .slice(line.indexOf('(') + 1, line.lastIndexOf(')'))
        .split(') (')
        .map((p) => p.split(',').map(Number))
        .map((toggle) => {
          return new Array(lights.length)
            .fill(0)
            .map((_, index) => (toggle.includes(index) ? true : false));
        });

      return { lights, toggles };
    })
    .slice(0, 5);

  return lines.reduce((sum, line) => sum + solveMinimumToggles(line), 0);
}
