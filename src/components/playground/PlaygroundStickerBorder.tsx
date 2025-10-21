import { useStickerSize } from './useStickerSize';

import { useAppSelector } from '@/store/hooks';
import { selectSetting } from '@/store/slices/settings';
import { stickerSizeTypeToPx } from '@/utils';
import { useSourceSize } from './useSourceSize';

import styles from './style.module.scss';

function PlaygroundStickerBorder() {
    const stickerSizeType = useAppSelector(selectSetting('stickerSizeType'));
    const stickerSizeTypePx = stickerSizeTypeToPx(stickerSizeType);
    const { width: stickerWidth, height: stickerHeight } = useStickerSize();
    const { width: sourceWidth, height: sourceHeight } = useSourceSize();

    if (!stickerWidth || !stickerHeight || !sourceWidth || !sourceHeight) return null;

    const width = (stickerWidth / stickerSizeTypePx) * 100 + '%';
    const height = (stickerHeight / stickerSizeTypePx) * 100 + '%';

    return <div className={styles.stickerBorder} style={{ width, height }} />;
}

export { PlaygroundStickerBorder };
