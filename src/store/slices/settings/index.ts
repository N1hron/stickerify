import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Settings } from '../../../types';
import { getInitialState } from './utils';

type SettingsSliceState = {
    items: Settings;
    remember: boolean;
};

export const defaultSettings: Settings = {
    stickerSize: 'sticker',
    stickerMotion: 'static',
    stickerAlignment: 'left',
    longStickerProcessingMode: 'trim',
    scaleUpSmallStickers: false,
};

export const defaultState: SettingsSliceState = {
    items: defaultSettings,
    remember: true,
};

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
});

export const reducer = settingsSlice.reducer;

export * from './selectors';
export const { setSetting, setRememberSettings, restoreDefaultSettings } = settingsSlice.actions;
