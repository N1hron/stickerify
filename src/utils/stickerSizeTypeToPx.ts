import { FILE_SIZE_PX } from '@/config';
import { StickerSizeType } from '@/types';

function stickerSizeTypeToPx(sizeType: StickerSizeType) {
    if (sizeType === 'sticker') {
        return FILE_SIZE_PX.sticker;
    }

    if (sizeType === 'emoji') {
        return FILE_SIZE_PX.emoji;
    }

    return 0;
}

export { stickerSizeTypeToPx };
