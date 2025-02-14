export type StickerMotionType = 'static' | 'video' | 'animated';
export type StickerSizeType = 'sticker' | 'emoji';
export type StickerType = {
    motion: StickerMotionType;
    size: StickerSizeType;
};
