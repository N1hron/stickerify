import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  resetOutputSettings,
  setOutputSetting,
  setRememberOutputSettings,
} from '../slices/outputSettings';
import { config } from '@/config';
import type { AppState } from '..';

const listener = createListenerMiddleware<AppState>();

listener.startListening({
  matcher: isAnyOf(setOutputSetting, resetOutputSettings, setRememberOutputSettings),
  effect(action, { getState }) {
    const { items, remember } = getState().outputSettings;
    const { keyLS, rememberKeyLS } = config.outputSettings;

    if (remember) {
      localStorage.setItem(keyLS, JSON.stringify(items));
    } else {
      localStorage.removeItem(keyLS);
    }

    if (setRememberOutputSettings.match(action)) {
      localStorage.setItem(rememberKeyLS, String(remember));
    }
  },
});

export const rememberOutputSettingsMiddleware = listener.middleware;
