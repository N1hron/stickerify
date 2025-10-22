import clsx from 'clsx';
import { ReactNode } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectSetting } from '@/store/slices/settings';
import { capitalize } from '@/utils';

import styles from './style.module.scss';

type PlaygroundStickerProps = {
    children: ReactNode;
};

function PlaygroundSticker({ children }: PlaygroundStickerProps) {
    const stickerSizeType = useAppSelector(selectSetting('stickerSizeType'));
    const horizontalAlignment = useAppSelector(selectSetting('horizontalAlignment'));
    const verticalAlignment = useAppSelector(selectSetting('verticalAlignment'));
    const removeEmptySpaces = useAppSelector(selectSetting('removeEmptySpaces'));

    const cl = clsx(
        styles.sticker,
        styles[`sticker${capitalize(stickerSizeType)}`],
        styles[`stickerHorizontalAlignment${capitalize(horizontalAlignment)}`],
        styles[`stickerVerticalAlignment${capitalize(verticalAlignment)}`],
        removeEmptySpaces && styles.stickerRemoveEmptySpaces
    );

    return <div className={cl}>{children}</div>;
}

export { PlaygroundSticker };
