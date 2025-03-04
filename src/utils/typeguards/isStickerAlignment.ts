import { StickerAlignment } from '../../types';

function isStickerAlignment(param: unknown): param is StickerAlignment {
    return param === 'left' || param === 'center' || param === 'right';
}

export { isStickerAlignment };
