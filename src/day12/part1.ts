// Advent of Code - Day 12 - Part One

export function part1(input: string): number {
  const blocks = input.split('\n\n');

  // Last piece has the dimensions and quantities
  const regions = blocks
    .pop()!
    .split('\n')
    .map((region) => {
      const [size, quantities] = region.split(': ');
      const [width, height] = size.split('x');

      return {
        area: Number(width) * Number(height),
        quantities: quantities.split(' ').map(Number),
      };
    });

  const pieces = blocks.map((block) => {
    // First line has the id, rest the block
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, ...grid] = block.split('\n');

    const splitGrid = grid.map((row) => row.split(''));

    const filledArea = splitGrid.reduce(
      (acc, row) => acc + row.filter((cell) => cell === '#').length,
      0,
    );

    return {
      area: splitGrid.length * splitGrid[0].length,
      filledArea,
    };
  });

  function canFit(region: { area: number; quantities: number[] }) {
    // Naive sum the area necessary to fit all pieces
    const totalArea = region.quantities.reduce(
      (acc: number, quantity: number, index: number) => {
        const piece = pieces[index];
        return acc + quantity * piece.area;
      },
      0,
    );

    return totalArea <= region.area;
  }

  const fits = regions.filter(canFit);

  return fits.length;
}
