import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { outputSettingsReducer } from './slices/outputSettings';
import { uploaderReducer } from './slices/uploader/index';
import { converterReducer } from './slices/converter';
import { rememberOutputSettingsMiddleware } from './middleware/rememberOutputSettings';
import { revokeObjectURLsMiddleware } from './middleware/revokeObjectURLs';

const reducer = combineReducers({
  outputSettings: outputSettingsReducer,
  uploader: uploaderReducer,
  converter: converterReducer,
});

export const store = configureStore({
  reducer,
  devTools: import.meta.env.DEV,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().prepend(
      rememberOutputSettingsMiddleware,
      revokeObjectURLsMiddleware
    );
  },
});

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
