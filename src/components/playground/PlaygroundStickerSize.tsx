import { useAppSelector } from '@/store/hooks';
import { PlaygroundSize } from './playground-size/PlaygroundSize';
import { useStickerSize } from './useStickerSize';
import { selectSetting } from '@/store/slices/settings';
import { capitalize } from '@/utils';

function PlaygroundStickerSize() {
    const stickerSizeType = useAppSelector(selectSetting('stickerSizeType'));
    const title = capitalize(stickerSizeType) + ' size';
    const { width, height } = useStickerSize();

    return (
        <PlaygroundSize title={title} width={Math.round(width)} height={Math.round(height)}>
            <PlaygroundSize.Title />
            <PlaygroundSize.Width>
                <PlaygroundSize.WidthValue />
            </PlaygroundSize.Width>
            <PlaygroundSize.Height>
                <PlaygroundSize.HeightValue />
            </PlaygroundSize.Height>
        </PlaygroundSize>
    );
}

export { PlaygroundStickerSize };
