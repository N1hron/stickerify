import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Settings } from '@types';
import { safeParseJson, isSettings } from '@utils';

type SettingsSliceState = {
    items: Settings;
    remember: boolean;
};

const defaultSettings: Settings = {
    stickerSizeType: 'sticker',
    stickerMotionType: 'static',
    horizontalAlignment: 'middle',
    verticalAlignment: 'middle',
    scaleUpSmallStickers: true,
    removeEmptySpaces: true,
};

const defaultState: SettingsSliceState = {
    items: defaultSettings,
    remember: true,
};

function getInitialState(): SettingsSliceState {
    const settingsLS = localStorage.getItem('settings');
    const rememberLS = localStorage.getItem('rememberSettings');

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
            state.items = defaultSettings;
        },
        setRememberSettings: (state, action: PayloadAction<boolean>) => {
            state.remember = action.payload;
        },
    },
});

export const reducer = settingsSlice.reducer;
export const { setSetting, setRememberSettings, restoreDefaultSettings } = settingsSlice.actions;
export * from './selectors';
export { defaultSettings };
