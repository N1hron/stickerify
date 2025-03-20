import { Settings } from '../../types';
import { isStickerSize } from './isStickerSize';
import { isStickerMotion } from './isStickerMotion';
import { isStickerAlignment } from './isStickerAlignment';
import { isLongStickerProcessingMode } from './isLongStickerProcessingMode';

function isSettings(param: unknown): param is Settings {
    if (!(param && typeof param === 'object')) return false;

    return (
        'stickerSize' in param &&
        'stickerMotion' in param &&
        'stickerAlignment' in param &&
        'longStickerProcessingMode' in param &&
        'scaleUpSmallStickers' in param &&
        isStickerSize(param.stickerSize) &&
        isStickerMotion(param.stickerMotion) &&
        isStickerAlignment(param.stickerAlignment) &&
        isLongStickerProcessingMode(param.longStickerProcessingMode) &&
        typeof param.scaleUpSmallStickers === 'boolean'
    );
}

export { isSettings };
