import { describe, expect, it } from 'vitest';

import { safeParseJson } from '../safeParseJson';

describe('safeParseJson', () => {
    it('should return null if text is not a string', () => {
        expect(safeParseJson(123)).toBeNull();
        expect(safeParseJson(new Object())).toBeNull();
        expect(safeParseJson(null)).toBeNull();
        expect(safeParseJson(undefined)).toBeNull();
        expect(safeParseJson(BigInt(123))).toBeNull();
        expect(safeParseJson(Symbol('test'))).toBeNull();
        expect(safeParseJson(true)).toBeNull();
    });

    it('should return null if text is not a valid json', () => {
        expect(safeParseJson('{"foo": "bar"}{')).toBeNull();
        expect(safeParseJson('test')).toBeNull();
        expect(safeParseJson('undefined')).toBeNull();
    });

    it('should parse valid json', () => {
        expect(safeParseJson('{"foo": "bar"}')).toEqual({ foo: 'bar' });
        expect(safeParseJson('["foo", "bar"]')).toEqual(['foo', 'bar']);
        expect(safeParseJson('123')).toBe(123);
        expect(safeParseJson('true')).toBe(true);
        expect(safeParseJson('null')).toBeNull();
    });
});
