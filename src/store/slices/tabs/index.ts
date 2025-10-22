import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Tab } from '@/types';

type TabsState = Record<Tab, boolean>;

function setInitalState(): TabsState {
    if (matchMedia('max-width: 30em').matches) {
        return {
            settings: true,
            playground: false,
            transcoder: false,
        };
    }

    if (matchMedia('max-width: 47em').matches) {
        return {
            settings: true,
            playground: true,
            transcoder: false,
        };
    }

    return {
        settings: true,
        playground: true,
        transcoder: true,
    };
}

const tabsSlice = createSlice({
    name: 'tabs',
    initialState: setInitalState,
    reducers: {
        setTabs: (_, action: PayloadAction<TabsState>) => {
            return action.payload;
        },
        setTab: (state, action: PayloadAction<[Tab, boolean]>) => {
            state[action.payload[0]] = action.payload[1];
        },
    },
});

export const reducer = tabsSlice.reducer;
export const { setTab, setTabs } = tabsSlice.actions;
export * from './selectors';
