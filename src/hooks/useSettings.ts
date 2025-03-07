import { useEffect, useCallback } from 'react';

import { useLocalStorage } from './useLocalStorage';
import { Settings } from '../types';
import {
    useAppSelector,
    useAppDispatch,
    selectSettings,
    selectRemember,
    setSetting as set,
    setRememberSettings,
    restoreDefaultSettings,
    defaultSettings,
} from '../store';

function useSettings() {
    const dispatch = useAppDispatch();

    const settings = useAppSelector(selectSettings);
    const remember = useAppSelector(selectRemember);

    const [, setSettingsLS, removeSettingsLS] = useLocalStorage('settings');
    const [, setRememberSettingsLS] = useLocalStorage('rememberSettings');

    const isDefaultSettings =
        Object.values(defaultSettings).join('') === Object.values(settings).join('');

    useEffect(() => {
        if (remember) {
            setSettingsLS(settings);
        } else {
            removeSettingsLS();
        }
        setRememberSettingsLS(remember);
    }, [settings, remember]);

    const setRemember = useCallback(
        (newRememberSettings: boolean) => {
            if (remember !== newRememberSettings) {
                dispatch(setRememberSettings(newRememberSettings));
            }
        },
        [remember]
    );

    const setSetting = useCallback(
        <T extends keyof Settings>(settingName: T, value: Settings[T]) => {
            if (settings[settingName] === value) return;
            dispatch(set([settingName, value]));
        },
        [settings]
    );

    const restoreDefaults = useCallback(() => {
        if (isDefaultSettings) return;
        dispatch(restoreDefaultSettings());
    }, [isDefaultSettings]);

    return {
        settings,
        remember,
        setRemember,
        setSetting,
        restoreDefaults,
        isDefaultSettings,
    };
}

export { useSettings };
