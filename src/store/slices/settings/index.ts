import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { safeParseJson, isSettings } from '@utils';
import { Settings } from '@types';
import { DEFAULT_SETTINGS } from '@/config';

type SettingsSliceState = {
    items: Settings;
    remember: boolean;
};

const defaultState: SettingsSliceState = {
    items: DEFAULT_SETTINGS,
    remember: true,
};

function getInitialState(): SettingsSliceState {
    const settingsLS = localStorage.getItem('settings');
    const rememberLS = localStorage.getItem('rememberSettings');

    const settings = safeParseJson(settingsLS);
    const remember = safeParseJson(rememberLS);

    if (remember === true && isSettings(settings)) {
        return {
            ...defaultState,
            items: settings,
            remember,
        };
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
            state.items = DEFAULT_SETTINGS;
        },
        setRememberSettings: (state, action: PayloadAction<boolean>) => {
            state.remember = action.payload;
        },
    },
});

export { DEFAULT_SETTINGS };
export const reducer = settingsSlice.reducer;
export const { setSetting, setRememberSettings, restoreDefaultSettings } = settingsSlice.actions;
export * from './selectors';
