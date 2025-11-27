import { describe, expect, it } from 'vitest';

import { formatDuration } from '../formatDuration';

describe('formatDuration', () => {
  it('should return duration in seconds formatted as HH:MM:SS', () => {
    const testCases: [number, string][] = [
      [0, '00:00:00'],
      [1, '00:00:01'],
      [61, '00:01:01'],
      [3661, '01:01:01'],
      [9999, '02:46:39'],
      [99999, '27:46:39'],
      [999999, '277:46:39'],
    ];

    for (const [input, exected] of testCases) {
      expect(formatDuration(input)).toBe(exected);
    }
  });
});
