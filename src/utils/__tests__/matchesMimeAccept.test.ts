import { describe, expect, it } from 'vitest';

import { matchesMimeAccept } from '../matchesMimeAccept';

describe('matchesMimeAccept', () => {
  it('should return true if mime type matches mime accept', () => {
    const testCases = [
      ['', ''],
      ['image/png', ''],
      ['image/png', 'image/png'],
      ['image/png', 'image/*'],
      ['image/png', 'video/*, image/png'],
      ['image/png', 'video/*, image/*'],
    ];

    for (const [type, accept] of testCases) {
      expect(matchesMimeAccept(type, accept)).toBe(true);
    }
  });

  it('should return true if mime type matches mime accept', () => {
    const testCases = [
      ['', 'image/*'],
      ['video/mp4', 'image/*'],
      ['video/mp4', 'video/mpeg'],
    ];

    for (const [type, accept] of testCases) {
      expect(matchesMimeAccept(type, accept)).toBe(false);
    }
  });
});
