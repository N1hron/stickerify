import { describe, expect, it } from 'vitest';

import { safeStringify } from '../safeStringify';

describe('safeStringify', () => {
    it('should throw and return null for bigint', () => {
        const res = safeStringify(BigInt(123));

        expect(res).toThrow(TypeError);
        expect(res).toBeNull();
    });

    it('should throw and return null if input contains a circular reference', () => {
        const obj: { foo?: object } = {};
        obj.foo = obj;

        const res = safeStringify(obj);

        expect(res).toThrow(TypeError);
        expect(res).toBeNull();
    });

    it('should return undefined for invalid input', () => {
        expect(safeStringify(undefined)).toBeUndefined();
        expect(safeStringify(function () {})).toBeUndefined();
        expect(safeStringify(Symbol('test'))).toBeUndefined();
    });

    it('should return "null" for NaN and Infinity', () => {
        expect(safeStringify(NaN)).toBe('null');
        expect(safeStringify(Infinity)).toBe('null');
    });

    it('should return string for valid input', () => {
        expect(safeStringify(123)).toBe('123');
        expect(safeStringify(true)).toBe('true');
        expect(safeStringify('test')).toBe('"test"');
        expect(safeStringify(null)).toBe('null');
        expect(safeStringify({ foo: 'bar' })).toBe('{"foo":"bar"}');
        expect(safeStringify(['foo', 123])).toBe('["foo",123]');
    });
});
