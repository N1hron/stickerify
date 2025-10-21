import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectSetting } from '@/store/slices/settings';
import { scaleToContain, scaleToFit } from '@/utils';
import {
    selectPlaygroundSourceHeight,
    selectPlaygroundSourceWidth,
} from '@/store/slices/playground';
import { useStickerSizeTypeInPx } from '@/hooks';
import { Size } from '@/types';

function useSourceSize(): Size {
    const scaleUpSmallStickers = useAppSelector(selectSetting('scaleUpSmallStickers'));
    const stickerSizeTypeInPx = useStickerSizeTypeInPx();
    const sourceWidth = useAppSelector(selectPlaygroundSourceWidth);
    const sourceHeight = useAppSelector(selectPlaygroundSourceHeight);

    return useMemo(() => {
        let sourceSize: Size;

        if (scaleUpSmallStickers) {
            sourceSize = scaleToContain(
                sourceWidth,
                sourceHeight,
                stickerSizeTypeInPx,
                stickerSizeTypeInPx
            );
        } else {
            sourceSize = scaleToFit(
                sourceWidth,
                sourceHeight,
                stickerSizeTypeInPx,
                stickerSizeTypeInPx
            );
        }

        return {
            width: Math.round(sourceSize.width),
            height: Math.round(sourceSize.height),
        };
    }, [scaleUpSmallStickers, sourceWidth, sourceHeight, stickerSizeTypeInPx]);
}

export { useSourceSize };
