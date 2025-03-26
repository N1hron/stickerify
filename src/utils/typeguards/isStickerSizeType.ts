import { StickerSizeType } from '../../types';

function isStickerSizeType(param: unknown): param is StickerSizeType {
    return param === 'sticker' || param === 'emoji';
}

export { isStickerSizeType };
