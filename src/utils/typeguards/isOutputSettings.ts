import { OutputSettings } from '@types';
import {
    isHorizontalAlignment,
    isStickerMotionType,
    isStickerSizeType,
    isVerticalAlignment,
} from '@utils';

function isOutputSettings(param: unknown): param is OutputSettings {
    if (!(param && typeof param === 'object')) return false;

    return (
        'stickerSizeType' in param &&
        'stickerMotionType' in param &&
        'horizontalAlignment' in param &&
        'verticalAlignment' in param &&
        'scaleUpSmallStickers' in param &&
        'removeEmptySpaces' in param &&
        isStickerSizeType(param.stickerSizeType) &&
        isStickerMotionType(param.stickerMotionType) &&
        isHorizontalAlignment(param.horizontalAlignment) &&
        isVerticalAlignment(param.verticalAlignment) &&
        typeof param.scaleUpSmallStickers === 'boolean' &&
        typeof param.removeEmptySpaces === 'boolean'
    );
}

export { isOutputSettings };
