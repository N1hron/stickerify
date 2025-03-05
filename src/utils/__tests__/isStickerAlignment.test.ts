import { describe, expect, it } from 'vitest';

import { isStickerAlignment } from '../typeguards/isStickerAlignment';

describe('isStickerAlignment', () => {
    it.todo('should return false if input is not sticker alignment', () => {
        expect(isStickerAlignment(123)).toBe(false);
        expect(isStickerAlignment('fast')).toBe(false);
        expect(isStickerAlignment(true)).toBe(false);
        expect(isStickerAlignment({})).toBe(false);
    });

    it.todo('should return true if input is sticker alignment', () => {
        expect(isStickerAlignment('left')).toBe(true);
        expect(isStickerAlignment('center')).toBe(true);
        expect(isStickerAlignment('right')).toBe(true);
    });
});
