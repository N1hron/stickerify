export type StickerSize = 'sticker' | 'emoji';
export type StickerMotion = 'static' | 'video' | 'animated';
export type StickerAlignment = 'left' | 'center' | 'right';

export type Settings = {
    stickerSize: StickerSize;
    stickerMotion: StickerMotion;
    scaleUpSmallStickers: boolean;
    stickerAlignment: StickerAlignment;
    disableFileLimit: boolean;
};
