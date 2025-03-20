import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Settings } from '../../types';
import { isSettings, safeParseJson } from '../../utils';
import { RootState } from '..';

type SettingsSliceState = {
    items: Settings;
    remember: boolean;
};

const defaultSettings: Settings = {
    stickerSize: 'sticker',
    stickerMotion: 'static',
    stickerAlignment: 'left',
    longStickerProcessingMode: 'trim',
    scaleUpSmallStickers: false,
};

const defaultState: SettingsSliceState = {
    items: defaultSettings,
    remember: true,
};

function getInitialState(): typeof defaultState {
    const settingsLS = localStorage.getItem('settings');
    const rememberLS = localStorage.getItem('remember');

    const settings = safeParseJson(settingsLS);
    const remember = safeParseJson(rememberLS);

    if (remember === true && isSettings(settings)) {
        return { items: settings, remember };
    } else if (remember === false) {
        return { ...defaultState, remember };
    }

    return defaultState;
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: getInitialState,
    reducers: {
        setSetting: <T extends keyof Settings>(
            state: SettingsSliceState,
            action: PayloadAction<[T, Settings[T]]>
        ) => {
            const [key, value] = action.payload;
            state.items[key] = value;
        },
        restoreDefaultSettings: (state) => {
            state.items = defaultState.items;
        },
        setRememberSettings: (state, action: PayloadAction<boolean>) => {
            state.remember = action.payload;
        },
    },
    selectors: {
        selectRememberSettings: (state) => state.remember,
    },
});

const selectSetting =
    <T extends keyof Settings>(name: T) =>
    (state: RootState): Settings[T] => {
        return state.settings.items[name];
    };

const selectIsDefaultSettings = createSelector(
    [(state: RootState) => state.settings.items],
    (settings) => {
        for (const key in settings) {
            if (defaultSettings[key as keyof Settings] !== settings[key as keyof Settings]) {
                return false;
            }
        }
        return true;
    }
);

export const reducer = settingsSlice.reducer;
export const { setSetting, setRememberSettings, restoreDefaultSettings } = settingsSlice.actions;
export const { selectRememberSettings } = settingsSlice.selectors;
export { selectSetting, selectIsDefaultSettings };
