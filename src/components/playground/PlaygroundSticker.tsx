import clsx from 'clsx';
import { ReactNode } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectSetting } from '@/store/slices/settings';
import { capitalize } from '@/utils';

import style from './style.module.scss';

type PlaygroundStickerProps = {
    children: ReactNode;
};

function PlaygroundSticker({ children }: PlaygroundStickerProps) {
    const horizontalAlignment = useAppSelector(selectSetting('horizontalAlignment'));
    const verticalAlignment = useAppSelector(selectSetting('verticalAlignment'));

    const cl = clsx(
        style.sticker,
        style[`stickerHorizontalAlignment${capitalize(horizontalAlignment)}`],
        style[`stickerVerticalAlignment${capitalize(verticalAlignment)}`]
    );

    return <div className={cl}>{children}</div>;
}

export { PlaygroundSticker };
