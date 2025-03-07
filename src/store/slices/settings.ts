import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Settings } from '../../types';
import { isSettings, safeParseJson } from '../../utils';

type SettingsSliceState = {
    settings: Settings;
    remember: boolean;
};

const defaultSettings: Settings = {
    stickerSize: 'sticker',
    stickerMotion: 'static',
    stickerAlignment: 'left',
    longStickerProcessingMode: 'trim',
    scaleUpSmallStickers: false,
    disableFileLimit: false,
};

const defaultSettingsJSON = JSON.stringify(defaultSettings);

const defaultState: SettingsSliceState = {
    settings: defaultSettings,
    remember: true,
};

function getInitialState(): SettingsSliceState {
    const rememberLS = localStorage.getItem('rememberSettings');
    const settingsLS = localStorage.getItem('settings');

    const remember = safeParseJson(rememberLS);
    const settings = safeParseJson(settingsLS);

    if (remember === null) {
        return defaultState;
    } else if (remember === false) {
        return { settings: defaultSettings, remember };
    } else if (remember === true) {
        return { settings: isSettings(settings) ? settings : defaultSettings, remember };
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
            const [name, value] = action.payload;
            state.settings[name] = value;
        },
        restoreDefaultSettings: (state) => {
            state.settings = defaultSettings;
        },
        setRemember: (state, action: PayloadAction<boolean>) => {
            state.remember = action.payload;
        },
    },
    selectors: {
        selectSettings: (state) => state.settings,
        selectRemember: (state) => state.remember,
        selectIsDefaultSettings: (state) => {
            return JSON.stringify(state.settings) === defaultSettingsJSON;
        },
    },
});

export const { selectSettings, selectRemember, selectIsDefaultSettings } = settingsSlice.selectors;
export const { setSetting, setRemember, restoreDefaultSettings } = settingsSlice.actions;
export const reducer = settingsSlice.reducer;
