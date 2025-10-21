import { Card, Divider } from '../ui';
import { PlaygroundRandomizeSourceSize } from './PlaygroundRandomizeSourceSize';
import { PlaygroundStickerSource } from './PlaygroundStickerSource';
import { PlaygroundSourceSize } from './PlaygroundSourceSize';
import { PlaygroundSticker } from './PlaygroundSticker';
import { PlaygroundStickerBorder } from './PlaygroundStickerBorder';
import { PlaygroundStickerSize } from './PlaygroundStickerSize';

import styles from './style.module.scss';

function Playground() {
    return (
        <Card className={styles.playground} as='section'>
            <h2 className={styles.title}>Playground</h2>
            <Divider />

            <PlaygroundStickerSize />
            <PlaygroundSticker>
                <PlaygroundStickerSource />
                <PlaygroundStickerBorder />
            </PlaygroundSticker>
            <PlaygroundSourceSize />
            <PlaygroundRandomizeSourceSize />
        </Card>
    );
}

export { Playground };
