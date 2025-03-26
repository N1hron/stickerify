export type StickerSizeType = 'sticker' | 'emoji';
export type StickerMotionType = 'static' | 'video';

export type HorizontalAlignment = 'left' | 'middle' | 'right';
export type VerticalAlignment = 'top' | 'middle' | 'bottom';

export type OutputSettings = {
    stickerSizeType: StickerSizeType;
    stickerMotionType: StickerMotionType;
    horizontalAlignment: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    scaleUpSmallStickers: boolean;
    removeEmptySpaces: boolean;
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
