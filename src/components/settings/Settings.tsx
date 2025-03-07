import { useEffect } from 'react';

import { Card, Divider } from '../ui';
import { SpinButton, Checkbox, Button } from '../form-controls';
import { StickerSize, StickerMotion, StickerAlignment } from '../../types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useLocalStorage } from '../../hooks';
import {
    selectIsDefaultSettings,
    selectRemember,
    selectSettings,
    setSetting,
    setRemember,
    restoreDefaultSettings,
} from '../../store/slices/settings';

import styles from './style.module.scss';

function Settings() {
    const dispatch = useAppDispatch();

    const settings = useAppSelector(selectSettings);
    const remember = useAppSelector(selectRemember);

    const [, setSettingsLS, removeSettingsLS] = useLocalStorage('settings');
    const [, setRememberLS] = useLocalStorage('rememberSettings');

    const isDefaultSettings = useAppSelector(selectIsDefaultSettings);

    useEffect(() => {
        setRememberLS(remember);
        if (remember) {
            setSettingsLS(settings);
        } else {
            removeSettingsLS();
        }
    }, [settings, remember]);

    function onSettingChange(...params: Parameters<typeof setSetting>[0]) {
        const [key, value] = params;
        if (settings[key] !== value) {
            dispatch(setSetting(params));
        }
    }

    function onRememberChange(value: boolean) {
        if (remember !== value) {
            dispatch(setRemember(value));
        }
    }

    function onRestoreClick() {
        if (!isDefaultSettings) {
            dispatch(restoreDefaultSettings());
        }
    }

    return (
        <Card as='section' className={styles.settings}>
            <div className={styles.items}>
                <SpinButton<StickerMotion>
                    label='Sticker motion type'
                    options={['static', 'video', 'animated']}
                    value={settings.stickerMotion}
                    onChange={(v) => onSettingChange('stickerMotion', v)}
                />
                <SpinButton<StickerSize>
                    label='Sticker size type'
                    options={['sticker', 'emoji']}
                    value={settings.stickerMotion === 'animated' ? 'sticker' : settings.stickerSize}
                    onChange={(v) => onSettingChange('stickerSize', v)}
                    disabled={settings.stickerMotion === 'animated'}
                />
                <SpinButton<StickerAlignment>
                    label='Sticker alignment'
                    options={['left', 'center', 'right']}
                    value={settings.stickerAlignment}
                    onChange={(v) => onSettingChange('stickerAlignment', v)}
                />
                <SpinButton
                    label='For long video stickers'
                    options={['trim', 'speed up']}
                    value={settings.longStickerProcessingMode}
                    onChange={(v) => onSettingChange('longStickerProcessingMode', v)}
                    disabled={settings.stickerMotion === 'static'}
                />
                <Checkbox
                    label='Scale up small stickers'
                    checked={settings.scaleUpSmallStickers}
                    onChange={(v) => onSettingChange('scaleUpSmallStickers', v)}
                />
                <Checkbox
                    label='Disable file limit'
                    checked={settings.disableFileLimit}
                    onChange={(v) => onSettingChange('disableFileLimit', v)}
                />
                <Checkbox label='Remember choice' checked={remember} onChange={onRememberChange} />
            </div>
            <Divider />
            <Button onClick={onRestoreClick} color='accent'>
                Restore defaults
            </Button>
        </Card>
    );
}

export { Settings };
