import { Card, CardHeading, CardSegment, Divider } from '../ui';
import { SpinButton, Checkbox, Button } from '../form-controls';
import { StickerSize, StickerMotion, StickerAlignment } from '../../types';
import { useSettings } from '../../hooks';

import styles from './style.module.scss';

function Settings() {
    const { settings, remember, setSetting, setRemember, restoreDefaults, isDefaultSettings } =
        useSettings();

    return (
        <Card as='section' className={styles.settings}>
            <CardHeading>Settings</CardHeading>
            <Divider />
            <div className={styles.items}>
                <CardSegment>
                    <SpinButton<StickerMotion>
                        label='Sticker motion type'
                        options={['static', 'video', 'animated']}
                        value={settings.stickerMotion}
                        onChange={(value) => setSetting('stickerMotion', value)}
                    />
                    <SpinButton<StickerSize>
                        label='Sticker size type'
                        options={['sticker', 'emoji']}
                        value={
                            settings.stickerMotion === 'animated' ? 'sticker' : settings.stickerSize
                        }
                        disabled={settings.stickerMotion === 'animated'}
                        onChange={(value) => setSetting('stickerSize', value)}
                    />
                    <SpinButton<StickerAlignment>
                        label='Sticker alignment'
                        options={['left', 'center', 'right']}
                        value={settings.stickerAlignment}
                        onChange={(value) => setSetting('stickerAlignment', value)}
                    />
                    <Checkbox
                        label='Scale up small stickers'
                        checked={settings.scaleUpSmallStickers}
                        onChange={(value) => setSetting('scaleUpSmallStickers', value)}
                    />
                    <Checkbox
                        label='Disable file limit'
                        checked={settings.disableFileLimit}
                        onChange={(value) => setSetting('disableFileLimit', value)}
                    />
                </CardSegment>
                <Divider />
                <CardSegment>
                    <Checkbox label='Remember choice' checked={remember} onChange={setRemember} />
                </CardSegment>
            </div>
            <Divider />
            <CardSegment>
                <Button onClick={restoreDefaults} color={isDefaultSettings ? undefined : 'accent'}>
                    Restore defaults
                </Button>
            </CardSegment>
        </Card>
    );
}

export { Settings };
