import { StickerMotion } from '../../types';

function isStickerMotion(param: unknown): param is StickerMotion {
    return param === 'static' || param === 'video';
}

export { isStickerMotion };
