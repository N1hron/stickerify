export type StickerSizeType = 'sticker' | 'emoji';
export type HorizontalAlignment = 'left' | 'middle' | 'right';
export type VerticalAlignment = 'top' | 'middle' | 'bottom';

export type Settings = {
    stickerSizeType: StickerSizeType;
    horizontalAlignment: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    scaleUpSmallStickers: boolean;
    removeEmptySpaces: boolean;
};

export type TranscoderStatus = 'idle' | 'loading' | 'ready' | 'transcoding' | 'error';
export type TranscoderFileStatus = 'ready' | 'transcoding' | 'success' | 'error';

export type TranscoderFileInput = {
    name: string;
    ext: string;
    size: number;
    url: string;
};

export type TranscoderFileOutput = {
    [K in keyof TranscoderFileInput]: K extends 'name'
        ? TranscoderFileInput[K]
        : TranscoderFileInput[K] | null;
};

export type TranscoderFile = {
    id: string;
    input: TranscoderFileInput;
    output: TranscoderFileOutput;
    status: TranscoderFileStatus;
    message?: string;
    isSelected: boolean;
};

export type Size = {
    width: number;
    height: number;
};
