import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { useSourceSize } from './useSourceSize';
import { selectSetting } from '@/store/slices/settings';
import { useStickerSizeTypeInPx } from '@/hooks';
import { Size } from '@/types';

function useStickerSize(): Size {
    const stickerSizeType = useAppSelector(selectSetting('stickerSizeType'));
    const removeEmptySpaces = useAppSelector(selectSetting('removeEmptySpaces'));
    const stickerSizeTypeInPx = useStickerSizeTypeInPx();
    const sourceSize = useSourceSize();

    return useMemo(() => {
        if (removeEmptySpaces && stickerSizeType === 'sticker') {
            if (sourceSize.height === stickerSizeTypeInPx) {
                return sourceSize;
            }

            return { width: stickerSizeTypeInPx, height: sourceSize.height };
        }

        return { width: stickerSizeTypeInPx, height: stickerSizeTypeInPx };
    }, [removeEmptySpaces, stickerSizeTypeInPx, sourceSize.width, sourceSize.height]);
}

export { useStickerSize };
