import { Card, Divider } from '@components/ui';

import { Setting } from './Setting';
import { RememberChoice } from './RememberChoice';
import { RestoreDefaults } from './RestoreDefaults';

import styles from './style.module.scss';

function OutputSettings() {
    return (
        <Card className={styles.outputSettings} as='aside' tabIndex={-1}>
            <div className={styles.items} tabIndex={-1}>
                <Setting
                    name='stickerSizeType'
                    label='Sticker size type'
                    options={['sticker', 'emoji']}
                />
                <Setting
                    name='stickerMotionType'
                    label='Sticker motion type'
                    options={['static', 'video']}
                    disabled
                />
                <Setting
                    name='horizontalAlignment'
                    label='Horizontal alignment'
                    options={['left', 'middle', 'right']}
                />
                <Setting
                    name='verticalAlignment'
                    label='Vertical alignment'
                    options={['top', 'middle', 'bottom']}
                />

                <Divider />

                <Setting name='scaleUpSmallStickers' label='Scale up small stickers' />
                <Setting name='removeEmptySpaces' label='Remove empty spaces if possible' />

                <Divider />

                <RememberChoice />
            </div>
            <div className={styles.restoreDefaultsWrapper}>
                <Divider />
                <RestoreDefaults />
            </div>
        </Card>
    );
}

export { OutputSettings };
