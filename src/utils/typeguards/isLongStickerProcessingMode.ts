import { LongStickerProcessingMode } from '../../types';

function isLongStickerProcessingMode(param: unknown): param is LongStickerProcessingMode {
    return param === 'trim' || param === 'speed up';
}

export { isLongStickerProcessingMode };
