import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectSetting } from '@/store/slices/settings';
import { scaleToContain, scaleToFit } from '@/utils';
import {
    selectPlaygroundSourceHeight,
    selectPlaygroundSourceWidth,
} from '@/store/slices/playground';
import { useStickerSizeTypeInPx } from '@/hooks';

function useSourceSize() {
    const scaleUpSmallStickers = useAppSelector(selectSetting('scaleUpSmallStickers'));
    const stickerSizeTypeInPx = useStickerSizeTypeInPx();
    const sourceWidth = useAppSelector(selectPlaygroundSourceWidth);
    const sourceHeight = useAppSelector(selectPlaygroundSourceHeight);

    return useMemo(() => {
        let sourceSize: { width: number; height: number };

        if (scaleUpSmallStickers) {
            sourceSize = scaleToContain(
                sourceWidth,
                sourceHeight,
                stickerSizeTypeInPx,
                stickerSizeTypeInPx
            );
        }

        sourceSize = scaleToFit(
            sourceWidth,
            sourceHeight,
            stickerSizeTypeInPx,
            stickerSizeTypeInPx
        );

        sourceSize = { width: Math.round(sourceSize.width), height: Math.round(sourceSize.height) };

        return sourceSize;
    }, [scaleUpSmallStickers, sourceWidth, sourceHeight, stickerSizeTypeInPx]);
}

export { useSourceSize };
