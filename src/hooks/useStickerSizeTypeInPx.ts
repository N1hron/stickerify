import { useAppSelector } from '@/store/hooks';
import { selectSetting } from '@/store/slices/settings';
import { stickerSizeTypeToPx } from '@/utils';

function useStickerSizeTypeInPx() {
    const stickerSizeType = useAppSelector(selectSetting('stickerSizeType'));
    return stickerSizeTypeToPx(stickerSizeType);
}

export { useStickerSizeTypeInPx };
