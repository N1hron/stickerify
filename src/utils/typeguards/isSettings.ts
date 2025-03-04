import { Settings } from '../../types';
import { isStickerSize } from './isStickerSize';
import { isStickerMotion } from './isStickerMotion';
import { isStickerAlignment } from './isStickerAlignment';

function isSettings(param: unknown): param is Settings {
    if (!(param && typeof param === 'object')) return false;
    return (
        'stickerSize' in param &&
        'stickerMotion' in param &&
        'stickerAlignment' in param &&
        'scaleUpSmallStickers' in param &&
        'disableFileLimit' in param &&
        isStickerSize(param.stickerSize) &&
        isStickerMotion(param.stickerMotion) &&
        isStickerAlignment(param.stickerAlignment) &&
        typeof param.scaleUpSmallStickers === 'boolean' &&
        typeof param.disableFileLimit === 'boolean'
    );
}

export { isSettings };
