import { StickerMotionType } from '@types';

function isStickerMotionType(param: unknown): param is StickerMotionType {
    return param === 'static' || param === 'video';
}

export { isStickerMotionType };
