import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';

import { reducer as settingsReducer } from './slices/settings';
import { rememberSettings } from './middleware';

const rootReducer = combineReducers({ settings: settingsReducer });

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(rememberSettings);
    },
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppMiddleware = Middleware<unknown, RootState>;

export { store };
