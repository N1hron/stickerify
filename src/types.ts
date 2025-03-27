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

export type FileInput = {
    name: string;
    ext: string;
    size: number;
    url: string;
};

export type FileOutput = {
    [K in keyof FileInput]: K extends 'name' ? FileInput[K] : FileInput[K] | null;
};

export type FileData = {
    id: string;
    input: FileInput;
    output: FileOutput;
    status: FileStatus;
    isSelected: boolean;
};
