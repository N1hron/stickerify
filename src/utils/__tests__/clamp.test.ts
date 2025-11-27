import { describe, expect, it } from 'vitest';

import { clamp } from '../clamp';

describe('clamp', () => {
  it('should limit a value to a specified range', () => {
    const testCases: [[number, number, number], number][] = [
      [[0, -10, 20], 0],
      [[0, 10, 20], 10],
      [[0, 30, 20], 20],
    ];

    for (const [input, expected] of testCases) {
      expect(clamp(...input)).toBe(expected);
    }
  });
});
