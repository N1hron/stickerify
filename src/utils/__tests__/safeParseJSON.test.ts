import { describe, expect, it, vi } from 'vitest';

import { safeParseJSON } from '../safeParseJSON';

describe('safeParseJSON', () => {
  describe('should parse valid json', () => {
    const testCases: [unknown, unknown][] = [
      ['true', true],
      ['false', false],
      ['"apple"', 'apple'],
      ['123', 123],
      ['1.2e-5', 1.2e-5],
      [
        '{ "fruit": "apple", "count": 123 }',
        {
          fruit: 'apple',
          count: 123,
        },
      ],
      ['["apple", 123]', ['apple', 123]],
    ];

    it.each(testCases)("should parse '%s' into %s", (input, expected) => {
      expect(safeParseJSON(input)).toEqual(expected);
    });
  });

  it('should return null for non-string', () => {
    expect(safeParseJSON(true)).toBe(null);
  });

  it('should return null if JSON.parse throws an error', () => {
    vi.spyOn(JSON, 'parse').mockImplementationOnce(() => {
      throw new Error('This is test error');
    });

    expect(safeParseJSON('true')).toBe(null);
  });
});
