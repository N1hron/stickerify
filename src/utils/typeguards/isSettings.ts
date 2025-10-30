import { Settings } from '@types';
import { isHorizontalAlignment, isStickerSizeType, isVerticalAlignment } from '@utils';
import { isOutputFormat } from './isOutputFormat';

function isSettings(param: unknown): param is Settings {
    if (!(param && typeof param === 'object')) return false;

    return (
        'stickerSizeType' in param &&
        'horizontalAlignment' in param &&
        'verticalAlignment' in param &&
        'scaleUpSmallImages' in param &&
        'removeEmptySpaces' in param &&
        'outputFormat' in param &&
        isStickerSizeType(param.stickerSizeType) &&
        isHorizontalAlignment(param.horizontalAlignment) &&
        isVerticalAlignment(param.verticalAlignment) &&
        isOutputFormat(param.outputFormat) &&
        typeof param.scaleUpSmallImages === 'boolean' &&
        typeof param.removeEmptySpaces === 'boolean'
    );
}

export { isSettings };
