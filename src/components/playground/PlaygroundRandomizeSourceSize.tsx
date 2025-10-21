import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { randomInt, stickerSizeTypeToPx } from '@/utils';
import { selectSetting } from '@/store/slices/settings';
import {
    setPlaygroundSourceSizeHeight,
    setPlaygroundSourceSizeWidth,
} from '@/store/slices/playground';

import styles from './style.module.scss';

function PlaygroundRandomizeSourceSize() {
    const dispatch = useAppDispatch();
    const stickerSizeType = useAppSelector(selectSetting('stickerSizeType'));
    const stickerSizeTypePx = stickerSizeTypeToPx(stickerSizeType);

    function handleClick() {
        const generateRandom = () => randomInt(stickerSizeTypePx / 3, stickerSizeTypePx * 4 + 1);

        dispatch(setPlaygroundSourceSizeWidth(generateRandom()));
        dispatch(setPlaygroundSourceSizeHeight(generateRandom()));
    }

    return (
        <Button className={styles.randomize} onClick={handleClick} mini>
            Randomize
        </Button>
    );
}

export { PlaygroundRandomizeSourceSize };
