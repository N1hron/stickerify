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
    const remember = useAppSelector(selectRemember);

    const [, setSettingsLS, removeSettingsLS] = useLocalStorage('settings');
    const [, setRememberSettingsLS] = useLocalStorage('rememberSettings');

    useEffect(() => {
        if (remember) {
            setSettingsLS(settings);
        } else {
            removeSettingsLS();
        }
        setRememberSettingsLS(remember);
    }, [settings, remember]);

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
        if (remember !== newRememberSettings) {
            dispatch(setRemember(newRememberSettings));
        }
    }

    function restoreDefaults() {
        dispatch(restoreDefaultSettings());
    }

    return {
        settings,
        rememberSettings: remember,
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
