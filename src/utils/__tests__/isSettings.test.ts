import { describe, expect, it } from 'vitest';

import { isSettings } from '../typeguards/isSettings';

describe('isSettings', () => {
    it('should return false if input is not settings', () => {
        expect(isSettings(123)).toBe(false);
        expect(isSettings('test')).toBe(false);
        expect(isSettings(true)).toBe(false);
        expect(isSettings({ foo: 'bar' })).toBe(false);
        expect(
            isSettings({
                stickerSize: 'big',
                stickerMotion: 'no-motion',
                scaleUpSmallStickers: false,
                stickerAlignment: 'left',
                disableFileLimit: false,
            })
        ).toBe(false);
        expect(
            isSettings({
                stickerSize: 'sticker',
                stickerMotion: 'static',
            })
        ).toBe(false);
    });

    it('should return true if input is settings', () => {
        expect(
            isSettings({
                stickerSize: 'sticker',
                stickerMotion: 'static',
                scaleUpSmallStickers: false,
                stickerAlignment: 'left',
                disableFileLimit: false,
            })
        ).toBe(true);
        expect(
            isSettings({
                stickerSize: 'emoji',
                stickerMotion: 'video',
                scaleUpSmallStickers: true,
                stickerAlignment: 'right',
                disableFileLimit: true,
            })
        ).toBe(true);
        expect(
            isSettings({
                stickerSize: 'emoji',
                stickerMotion: 'animated',
                scaleUpSmallStickers: false,
                stickerAlignment: 'center',
                disableFileLimit: true,
            })
        ).toBe(true);
    });
});
