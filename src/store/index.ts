import { configureStore } from '@reduxjs/toolkit';

import { reducer as settingsReducer } from './slices/settings';

const store = configureStore({
    reducer: { settings: settingsReducer },
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
