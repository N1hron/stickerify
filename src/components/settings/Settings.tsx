import { useSettings } from '../../hooks';
import { StickerSize, StickerMotion, StickerAlignment } from '../../types';
import { Card, CardSegment, Divider, SpinButton, Checkbox, Button } from '../ui';

import styles from './style.module.scss';

function Settings() {
    const {
        settings,
        rememberSettings,
        setRememberSettings,
        setStickerSize,
        setStickerMotion,
        setScaleUpSmallStickers,
        setStickerAlignment,
        setDisableFileLimit,
        restoreDefaults,
    } = useSettings();

    return (
        <Card as='aside' className={styles.settings}>
            <CardSegment>
                <h2>Settings</h2>
            </CardSegment>
            <Divider />
            <div className={styles.items}>
                <CardSegment>
                    <SpinButton<StickerSize>
                        label='Sticker size type'
                        options={['sticker', 'emoji']}
                        value={settings.stickerSize}
                        onChange={setStickerSize}
                    />
                    <SpinButton<StickerMotion>
                        label='Sticker motion type'
                        options={['static', 'video', 'animated']}
                        value={settings.stickerMotion}
                        onChange={setStickerMotion}
                    />
                    <SpinButton<StickerAlignment>
                        label='Align small stickers'
                        options={['left', 'center', 'right']}
                        value={settings.stickerAlignment}
                        disabled={settings.scaleUpSmallStickers}
                        onChange={setStickerAlignment}
                    />
                    <Checkbox
                        label='Scale up small stickers'
                        checked={settings.scaleUpSmallStickers}
                        onChange={setScaleUpSmallStickers}
                    />
                    <Checkbox
                        label='Disable file limit'
                        checked={settings.disableFileLimit}
                        onChange={setDisableFileLimit}
                    />
                </CardSegment>
                <Divider />
                <CardSegment>
                    <Checkbox
                        label='Remember choice'
                        checked={rememberSettings}
                        onChange={setRememberSettings}
                    />
                </CardSegment>
            </div>
            <Divider />
            <CardSegment>
                <Button onClick={restoreDefaults}>Restore defaults</Button>
            </CardSegment>
        </Card>
    );
}

export { Settings };
