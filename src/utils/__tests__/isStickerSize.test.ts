import { describe, expect, it } from 'vitest';

import { isStickerSize } from '../typeguards/isStickerSize';

describe('isStickerSize', () => {
    it('should return false if input is not sticker size', () => {
        expect(isStickerSize(123)).toBe(false);
        expect(isStickerSize('big')).toBe(false);
        expect(isStickerSize(true)).toBe(false);
        expect(isStickerSize({})).toBe(false);
    });

    it('should return true if input is sticker size', () => {
        expect(isStickerSize('sticker')).toBe(true);
        expect(isStickerSize('emoji')).toBe(true);
    });
});
