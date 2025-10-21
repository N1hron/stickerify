import { ImageIcon } from '../icons';
import { useSourceSize } from './useSourceSize';
import { useAppSelector } from '@/store/hooks';
import { selectSetting } from '@/store/slices/settings';
import { stickerSizeTypeToPx } from '@/utils';

import styles from './style.module.scss';

function PlaygroundStickerSource() {
    const stickerSizeType = useAppSelector(selectSetting('stickerSizeType'));
    const stickerSizeTypePx = stickerSizeTypeToPx(stickerSizeType);
    const sourceSize = useSourceSize();

    const width = (sourceSize.width / stickerSizeTypePx) * 100 + '%';
    const height = (sourceSize.height / stickerSizeTypePx) * 100 + '%';

    return (
        <div className={styles.stickerSource} style={{ width: width, height: height }}>
            <ImageIcon aria-hidden />
        </div>
    );
}

export { PlaygroundStickerSource };
