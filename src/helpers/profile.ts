import chalk from 'chalk';

export default function profile(fn: () => number) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  return `${chalk.green(result)} in ${(end - start).toFixed(1)}ms`;
}
