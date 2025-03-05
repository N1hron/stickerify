import { describe, expect, it } from 'vitest';

import { isStickerMotion } from '../typeguards/isStickerMotion';

describe('isStickerMotion', () => {
    it.todo('should return false if input is not sticker motion', () => {
        expect(isStickerMotion(123)).toBe(false);
        expect(isStickerMotion('fast')).toBe(false);
        expect(isStickerMotion(true)).toBe(false);
        expect(isStickerMotion({})).toBe(false);
    });

    it.todo('should return true if input is sticker motion', () => {
        expect(isStickerMotion('static')).toBe(true);
        expect(isStickerMotion('video')).toBe(true);
        expect(isStickerMotion('animated')).toBe(true);
    });
});
