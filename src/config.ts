import { Settings } from './types';

const FILE_ACCEPT = 'image/*, video/*';
const FILE_LIMIT = 25;
const FILE_SIZE_PX = {
    sticker: 512,
    emoji: 100,
} as const;

const DEFAULT_SETTINGS: Settings = {
    stickerSizeType: 'sticker',
    horizontalAlignment: 'middle',
    verticalAlignment: 'middle',
    scaleUpSmallImages: true,
    removeEmptySpaces: true,
    outputFormat: 'webp',
};

export { FILE_ACCEPT, FILE_LIMIT, FILE_SIZE_PX, DEFAULT_SETTINGS };
