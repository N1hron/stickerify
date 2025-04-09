import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';

import { reducer as settingsReducer } from '@slices/settings';
import { reducer as transcoderReducer } from '@slices/transcoder';
import { preventFileDuplicates, rememberSettings } from '@store/middleware';

const rootReducer = combineReducers({
    settings: settingsReducer,
    transcoder: transcoderReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(preventFileDuplicates, rememberSettings);
    },
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppMiddleware = Middleware<unknown, RootState>;

export { store };
