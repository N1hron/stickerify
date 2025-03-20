import { StickerSize } from '../../types';

function isStickerSize(param: unknown): param is StickerSize {
    return param === 'sticker' || param === 'emoji';
}

export { isStickerSize };
