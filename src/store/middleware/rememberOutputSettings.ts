import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  resetOutputSettings,
  setOutputSetting,
  setRememberOutputSettings,
} from '../slices/outputSettings';
import { config } from '@/config';
import type { AppState } from '..';

export const rememberOutputSettingsListener = createListenerMiddleware<AppState>();

rememberOutputSettingsListener.startListening({
  matcher: isAnyOf(setRememberOutputSettings, setOutputSetting, resetOutputSettings),
  effect(action, { getState }) {
    const { entries, remember } = getState().outputSettings;
    const { localStorageKey, rememberLocalStorageKey } = config.outputSettings;

    const saveSettings = () => {
      localStorage.setItem(localStorageKey, JSON.stringify(entries));
    };

    if (setOutputSetting.match(action) && remember) {
      saveSettings();
    } else if (resetOutputSettings.match(action)) {
      localStorage.removeItem(localStorageKey);
    } else if (setRememberOutputSettings.match(action)) {
      localStorage.setItem(rememberLocalStorageKey, String(remember));

      if (remember) {
        saveSettings();
      } else {
        localStorage.removeItem(localStorageKey);
      }
    }
  },
});

export const rememberOutputSettingsMiddleware = rememberOutputSettingsListener.middleware;
