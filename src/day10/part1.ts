// Advent of Code - Day 10 - Part One

// TODO: Next optimization is to work bit representation and bit operations instead of array of numbers.

type Line = {
  lights: number[];
  toggles: number[][];
};

function step(
  line: Line,
  lightsState: number[],
  steps: number,
  state: {
    maxSteps: number;
    minFound: number | undefined;
  },
): number | undefined {
  // Short circuit, if we are going too far
  if (steps >= state.maxSteps) {
    return steps;
  }

  // Check if lights are all off, then return current steps
  for (let i = 0, l = lightsState.length; i < l; i++) {
    if (lightsState[i] === 1) {
      break;
    }

    if (i === l - 1) {
      return steps;
    }
  }

  // Short circuit, if next interation will be over the min found
  if (state.minFound !== undefined && steps + 1 >= state.minFound) {
    return undefined;
  }

  for (let i = 0, l = line.toggles.length; i < l; i++) {
    const toggle = line.toggles[i];
    const toggleLength = toggle.length;

    // Toggle the lights according to `toggle` array
    for (let j = 0; j < toggleLength; j++) {
      lightsState[toggle[j]] = 1 - lightsState[toggle[j]];
    }

    const togglesCount = step(line, lightsState, steps + 1, state);

    // Toggle back the lights according to `toggle` array, reusing array to avoid memory allocation
    for (let j = 0; j < toggleLength; j++) {
      lightsState[toggle[j]] = 1 - lightsState[toggle[j]];
    }

    if (
      togglesCount !== undefined &&
      (state.minFound === undefined || togglesCount < state.minFound)
    ) {
      state.minFound = togglesCount;
    }
  }

  return state.minFound || undefined;
}

function getMinTogglesCount(line: Line): number {
  return (
    step(line, line.lights, 0, {
      maxSteps: line.toggles.length,
      minFound: undefined,
    }) || 0
  );
}

export function part1(input: string): number {
  const lines = input.split('\n').map((line) => {
    const lights = line
      .slice(line.indexOf('[') + 1, line.lastIndexOf(']'))
      .split('')
      .map((l) => (l === '.' ? 0 : 1));
    const toggles = line
      .slice(line.indexOf('(') + 1, line.lastIndexOf(')'))
      .split(') (')
      .map((p) => p.split(',').map(Number));

    return { lights, toggles };
  }); // 382ms

  const minTogglesCount = lines.reduce((min, line) => {
    const minTogglesCount = getMinTogglesCount(line);

    return min + minTogglesCount;
  }, 0);

  return minTogglesCount;
}
