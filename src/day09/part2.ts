// Advent of Code - Day 9 - Part Two

export function part2(input: string): number {
  const points = input.split('\n').map((line) => line.split(',').map(Number));
  const pointsLength = points.length;

  const byX: Record<string, number[]> = {};
  const byY: Record<string, number[]> = {};

  for (let i = 0, l = points.length; i < l; i++) {
    const [x, y] = points[i];

    const xStr = String(x);
    const yStr = String(y);

    if (!byX[xStr]) {
      byX[xStr] = [];
    }

    byX[xStr].push(y);

    if (!byY[yStr]) {
      byY[yStr] = [];
    }

    byY[yStr].push(x);
  }

  const hSegments: Array<{ x: number; y1: number; y2: number }> = [];
  const vSegments: Array<{ y: number; x1: number; x2: number }> = [];

  for (const sx of Object.keys(byX)) {
    const ys = byX[sx].sort((a, b) => a - b);
    const sxn = Number(sx);
    for (let i = 0, l = Math.floor(ys.length / 2); i < l; i++) {
      const yA = ys[2 * i];
      const yB = ys[2 * i + 1];

      hSegments.push({
        x: sxn,
        y1: Math.min(yA, yB),
        y2: Math.max(yA, yB),
      });
    }
  }

  for (const sy of Object.keys(byY)) {
    const xs = byY[sy].sort((a, b) => a - b);
    const syn = Number(sy);
    for (let i = 0, l = Math.floor(xs.length / 2); i < l; i++) {
      const xA = xs[2 * i];
      const xB = xs[2 * i + 1];
      vSegments.push({
        y: syn,
        x1: Math.min(xA, xB),
        x2: Math.max(xA, xB),
      });
    }
  }

  let maxArea = 0;

  const hSegmentsLength = hSegments.length;
  const vSegmentsLength = vSegments.length;

  for (let i = 0; i < pointsLength; i++) {
    const a = points[i];

    for (let j = i + 1; j < pointsLength; j++) {
      const b = points[j];

      const minx = Math.min(a[0], b[0]);
      const maxx = Math.max(a[0], b[0]);
      const miny = Math.min(a[1], b[1]);
      const maxy = Math.max(a[1], b[1]);

      let works = true;

      // Check horizontal segments
      for (let i = 0; i < hSegmentsLength; i++) {
        const seg = hSegments[i];

        if (seg.x > minx && seg.x < maxx) {
          if (!(seg.y2 <= miny || seg.y1 >= maxy)) {
            works = false;
            break;
          }
        }
      }

      if (!works) {
        continue;
      }

      // Check vertical segments
      for (let i = 0; i < vSegmentsLength; i++) {
        const seg = vSegments[i];

        if (seg.y > miny && seg.y < maxy) {
          if (!(seg.x2 <= minx || seg.x1 >= maxx)) {
            works = false;
            break;
          }
        }
      }

      if (!works) {
        continue;
      }

      const area = (maxx - minx + 1) * (maxy - miny + 1);

      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}
