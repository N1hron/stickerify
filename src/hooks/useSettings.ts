import { useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';
import { StickerMotion, StickerSize, StickerAlignment } from '../types';
import {
    useAppSelector,
    useAppDispatch,
    selectSettings,
    selectRemember,
    setSettings,
    setRemember,
    restoreDefaultSettings,
} from '../store';

function useSettings() {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectSettings);
    const rememberSettings = useAppSelector(selectRemember);

    const [settingsLS, setSettingsLS, removeSettingsLS] = useLocalStorage('settings');

    useEffect(() => {
        if (rememberSettings) {
            setSettingsLS(settings);
        } else if (settingsLS !== null) {
            removeSettingsLS();
        }
    }, [settings, rememberSettings]);

    function setStickerSize(stickerSize: StickerSize) {
        if (settings.stickerSize !== stickerSize) {
            dispatch(setSettings({ ...settings, stickerSize }));
        }
    }

    function setStickerMotion(stickerMotion: StickerMotion) {
        if (settings.stickerMotion !== stickerMotion) {
            dispatch(setSettings({ ...settings, stickerMotion }));
        }
    }

    function setStickerAlignment(stickerAlignment: StickerAlignment) {
        if (settings.stickerAlignment !== stickerAlignment) {
            dispatch(setSettings({ ...settings, stickerAlignment }));
        }
    }

    function setScaleUpSmallStickers(scaleUpSmallStickers: boolean) {
        if (settings.scaleUpSmallStickers !== scaleUpSmallStickers) {
            dispatch(setSettings({ ...settings, scaleUpSmallStickers }));
        }
    }

    function setDisableFileLimit(disableFileLimit: boolean) {
        if (settings.disableFileLimit !== disableFileLimit) {
            dispatch(setSettings({ ...settings, disableFileLimit }));
        }
    }

    function setRememberSettings(newRememberSettings: boolean) {
        if (rememberSettings !== newRememberSettings) {
            dispatch(setRemember(newRememberSettings));
        }
    }

    function restoreDefaults() {
        dispatch(restoreDefaultSettings());
    }

    return {
        settings,
        rememberSettings,
        setStickerSize,
        setStickerMotion,
        setStickerAlignment,
        setScaleUpSmallStickers,
        setDisableFileLimit,
        setRememberSettings,
        restoreDefaults,
    };
}

export { useSettings };
