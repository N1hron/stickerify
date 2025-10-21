import { isSettings, safeParseJson, stickerSizeTypeToPx } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_SETTINGS } from '@/config';

type PlaygroundState = {
    sourceSize: {
        width: number;
        height: number;
    };
};

function setInitialState(): PlaygroundState {
    const settingsLS = localStorage.getItem('settings');
    const settings = safeParseJson(settingsLS);

    let size: number;

    if (isSettings(settings)) {
        size = stickerSizeTypeToPx(settings.stickerSizeType) / 2;
    } else {
        size = stickerSizeTypeToPx(DEFAULT_SETTINGS.stickerSizeType) / 2;
    }

    return {
        sourceSize: {
            width: size,
            height: size,
        },
    };
}

const playgroundSlice = createSlice({
    name: 'playground',
    initialState: setInitialState,
    reducers: {
        setPlaygroundSourceSizeWidth: (state, action: PayloadAction<number>) => {
            state.sourceSize.width = action.payload;
        },
        setPlaygroundSourceSizeHeight: (state, action: PayloadAction<number>) => {
            state.sourceSize.height = action.payload;
        },
    },
});

export const reducer = playgroundSlice.reducer;
export const { setPlaygroundSourceSizeWidth, setPlaygroundSourceSizeHeight } =
    playgroundSlice.actions;
export * from './selectors';
