import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { outputSettingsReducer } from './slices/outputSettings';
import { rememberOutputSettingsMiddleware } from './middleware/rememberOutputSettings';
import { converterReducer } from './slices/converter';

const reducer = combineReducers({
  outputSettings: outputSettingsReducer,
  converter: converterReducer,
});

export const store = configureStore({
  reducer,
  devTools: import.meta.env.DEV,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().prepend(rememberOutputSettingsMiddleware);
  },
});

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
