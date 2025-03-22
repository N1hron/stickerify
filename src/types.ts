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

export type TranscoderStatus = 'idle' | 'loading' | 'ready' | 'transcoding' | 'error';
export type FileStatus = 'idle' | 'transcoding' | 'success' | 'error';

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
    status: FileStatus;
    isSelected: boolean;
};
