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

  const hSegments: Array<[[number, number], [number, number]]> = [];
  const vSegments: Array<[[number, number], [number, number]]> = [];

  for (const sx of Object.keys(byX)) {
    const ys = byX[sx].sort((a, b) => a - b);
    const sxn = Number(sx);
    for (let i = 0, l = Math.floor(ys.length / 2); i < l; i++) {
      hSegments.push([
        [sxn, ys[2 * i]],
        [sxn, ys[2 * i + 1]],
      ]);
    }
  }

  for (const sy of Object.keys(byY)) {
    const xs = byY[sy].sort((a, b) => a - b);
    const syn = Number(sy);
    for (let i = 0, l = Math.floor(xs.length / 2); i < l; i++) {
      vSegments.push([
        [xs[2 * i], syn],
        [xs[2 * i + 1], syn],
      ]);
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
        const [h0, h1] = hSegments[i];
        const hx = h0[0];
        const hy0 = Math.min(h0[1], h1[1]);
        const hy1 = Math.max(h0[1], h1[1]);

        if (hx > minx && hx < maxx) {
          if (!(hy1 <= miny || hy0 >= maxy)) {
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
        const [v0, v1] = vSegments[i];
        const vy = v0[1];
        const vx0 = Math.min(v0[0], v1[0]);
        const vx1 = Math.max(v0[0], v1[0]);

        if (vy > miny && vy < maxy) {
          if (!(vx1 <= minx || vx0 >= maxx)) {
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
