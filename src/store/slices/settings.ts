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
    scaleUpSmallStickers: false,
    stickerAlignment: 'left',
    disableFileLimit: false,
};

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
    } else if (remember === true) {
        return { settings: isSettings(settings) ? settings : defaultSettings, remember };
    } else if (remember === false) {
        return { settings: defaultSettings, remember };
    }

    return defaultState;
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: getInitialState,
    reducers: {
        setSettings: (state, action: PayloadAction<Settings>) => {
            state.settings = action.payload;
        },
        setRemember: (state, action: PayloadAction<boolean>) => {
            state.remember = action.payload;
        },
        restoreDefaultSettings: (state) => {
            state.settings = defaultSettings;
        },
    },
    selectors: {
        selectSettings: (state) => state.settings,
        selectRemember: (state) => state.remember,
    },
});

export const { reducer } = settingsSlice;
export const { setSettings, setRemember, restoreDefaultSettings } = settingsSlice.actions;
export const { selectSettings, selectRemember } = settingsSlice.selectors;
