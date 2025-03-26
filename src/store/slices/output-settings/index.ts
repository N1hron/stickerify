import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OutputSettings } from '@types';
import { safeParseJson, isOutputSettings } from '@utils';

type OutputSettingsSliceState = {
    items: OutputSettings;
    remember: boolean;
};

const defaultSettings: OutputSettings = {
    stickerSizeType: 'sticker',
    stickerMotionType: 'static',
    horizontalAlignment: 'left',
    verticalAlignment: 'middle',
    scaleUpSmallStickers: false,
    removeEmptySpaces: true,
};

const defaultState: OutputSettingsSliceState = {
    items: defaultSettings,
    remember: true,
};

function getInitialState(): OutputSettingsSliceState {
    const settingsLS = localStorage.getItem('outputSettings');
    const rememberLS = localStorage.getItem('rememberOutputSettings');

    const settings = safeParseJson(settingsLS);
    const remember = safeParseJson(rememberLS);

    if (remember === true && isOutputSettings(settings)) {
        return { items: settings, remember };
    } else if (remember === false) {
        return { ...defaultState, remember };
    }

    return defaultState;
}

const outputSettingsSlice = createSlice({
    name: 'outputSettings',
    initialState: getInitialState,
    reducers: {
        setSetting: <T extends keyof OutputSettings>(
            state: OutputSettingsSliceState,
            action: PayloadAction<[T, OutputSettings[T]]>
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

export const reducer = outputSettingsSlice.reducer;
export const { setSetting, setRememberSettings, restoreDefaultSettings } =
    outputSettingsSlice.actions;
export * from './selectors';
export { defaultSettings };
