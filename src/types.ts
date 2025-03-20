export type StickerSize = 'sticker' | 'emoji';
export type StickerMotion = 'static' | 'video';
export type StickerAlignment = 'left' | 'center' | 'right';
export type LongStickerProcessingMode = 'speed up' | 'trim';

export type Settings = {
    stickerSize: StickerSize;
    stickerMotion: StickerMotion;
    stickerAlignment: StickerAlignment;
    longStickerProcessingMode: LongStickerProcessingMode;
    scaleUpSmallStickers: boolean;
};
