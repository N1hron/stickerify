import { Settings } from '@types';
import { isHorizontalAlignment, isStickerSizeType, isVerticalAlignment } from '@utils';

function isSettings(param: unknown): param is Settings {
    if (!(param && typeof param === 'object')) return false;

    return (
        'stickerSizeType' in param &&
        'horizontalAlignment' in param &&
        'verticalAlignment' in param &&
        'scaleUpSmallStickers' in param &&
        'removeEmptySpaces' in param &&
        isStickerSizeType(param.stickerSizeType) &&
        isHorizontalAlignment(param.horizontalAlignment) &&
        isVerticalAlignment(param.verticalAlignment) &&
        typeof param.scaleUpSmallStickers === 'boolean' &&
        typeof param.removeEmptySpaces === 'boolean'
    );
}

export { isSettings };
