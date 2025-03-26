import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';

import { reducer as outputSettingsReducer } from '@slices/output-settings';
import { reducer as transcoderReducer } from '@slices/transcoder';
import {
    preventFileDuplicates,
    syncWithOutputSettings,
    rememberOutputSettings,
} from '@store/middleware';

const rootReducer = combineReducers({
    outputSettings: outputSettingsReducer,
    transcoder: transcoderReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            preventFileDuplicates,
            rememberOutputSettings,
            syncWithOutputSettings
        );
    },
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppMiddleware = Middleware<unknown, RootState>;

export { store };
