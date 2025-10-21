import { PlaygroundSize } from './playground-size/PlaygroundSize';
import { useStickerSize } from './useStickerSize';

function PlaygroundStickerSize() {
    const { width, height } = useStickerSize();

    return (
        <PlaygroundSize title='Sticker size' width={Math.round(width)} height={Math.round(height)}>
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
