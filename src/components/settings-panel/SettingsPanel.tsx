import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSetting, setSetting } from '../../store/slices/settings';
import { Card, Checkbox, Divider, SpinButton } from '../ui';
import { RememberChoice } from './RememberChoice';
import { RestoreDefaults } from './RestoreDefaults';
import { Settings } from '../../types';

import styles from './style.module.scss';

function SettingsPanel() {
    const dispatch = useAppDispatch();

    function onSettingChange<S extends keyof Settings>(name: S, value: Settings[S]) {
        dispatch(setSetting([name, value]));
    }

    return (
        <Card className={styles.settingsPanel} as='aside'>
            <div className={styles.mainContent}>
                <StickerSizeSetting onChange={onSettingChange} />
                <StickerMotionSetting onChange={onSettingChange} />
                <StickerAlignmentSetting onChange={onSettingChange} />
                <LongStickerProcessingModeSetting onChange={onSettingChange} />
                <Divider />
                <ScaleUpSmallStickersSetting onChange={onSettingChange} />
                <RememberChoice />
            </div>
            <Divider />
            <RestoreDefaults />
        </Card>
    );
}

type SettingProps<S extends keyof Settings> = {
    onChange: (name: S, value: Settings[S]) => void;
};

function StickerSizeSetting({ onChange }: SettingProps<'stickerSize'>) {
    const value = useAppSelector(selectSetting('stickerSize'));

    return (
        <SpinButton
            label='Sticker size type'
            options={['sticker', 'emoji']}
            value={value}
            onChange={(value) => onChange('stickerSize', value)}
        />
    );
}

function StickerMotionSetting({ onChange }: SettingProps<'stickerMotion'>) {
    const value = useAppSelector(selectSetting('stickerMotion'));

    return (
        <SpinButton
            label='Sticker motion type'
            options={['static', 'video']}
            value={value}
            onChange={(value) => onChange('stickerMotion', value)}
        />
    );
}

function StickerAlignmentSetting({ onChange }: SettingProps<'stickerAlignment'>) {
    const value = useAppSelector(selectSetting('stickerAlignment'));

    return (
        <SpinButton
            label='Sticker alignment'
            options={['left', 'center', 'right']}
            value={value}
            onChange={(value) => onChange('stickerAlignment', value)}
        />
    );
}

function LongStickerProcessingModeSetting({ onChange }: SettingProps<'longStickerProcessingMode'>) {
    const value = useAppSelector(selectSetting('longStickerProcessingMode'));

    return (
        <SpinButton
            label='For long stickers'
            options={['trim', 'speed up']}
            value={value}
            onChange={(value) => onChange('longStickerProcessingMode', value)}
        />
    );
}

function ScaleUpSmallStickersSetting({ onChange }: SettingProps<'scaleUpSmallStickers'>) {
    const value = useAppSelector(selectSetting('scaleUpSmallStickers'));

    return (
        <Checkbox
            label='Scale up small stickers'
            checked={value}
            onChange={(value) => onChange('scaleUpSmallStickers', value)}
        />
    );
}

export { SettingsPanel };
