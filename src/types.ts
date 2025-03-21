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

export type Status = 'idle' | 'loading' | 'success' | 'error';

export type FileData = {
    id: string;
    input: {
        name: string;
        ext: string;
        size: number;
        url: string;
    };
    output: {
        name: string;
        ext: string | null;
        size: number | null;
        url: string | null;
    };
    status: Status;
    isSelected: boolean;
};
