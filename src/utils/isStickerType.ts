import { StickerType } from '../types';

function isStickerType(param: unknown): param is StickerType {
    if (!param) return false;
    else if (typeof param !== 'object') {
        return false;
    } else if (!('motion' in param && 'size' in param)) {
        return false;
    }

    const { size, motion } = param;
    return (
        (size === 'sticker' || size === 'emoji') &&
        (motion === 'static' || motion === 'video' || motion === 'animated')
    );
}

export { isStickerType };
