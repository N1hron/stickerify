import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '../../types';
import { isSettings } from '../../utils/typeguards';

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
    remember: false,
};

function getInitialState(): SettingsSliceState {
    const settingsString = localStorage.getItem('settings');
    if (settingsString === null) return defaultState;

    try {
        const settings: unknown = JSON.parse(settingsString);
        if (isSettings(settings)) {
            return { settings, remember: true };
        } else {
            return defaultState;
        }
    } catch {
        return defaultState;
    }
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
