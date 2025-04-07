import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { Settings } from '@types';
import { defaultSettings } from '@/store/slices/settings';

const selectSetting =
    <T extends keyof Settings>(name: T) =>
    (state: RootState): Settings[T] => {
        return state.settings.items[name];
    };

const selectRememberSettings = (state: RootState) => state.settings.remember;

const selectIsDefaultSettings = createSelector(
    [(state: RootState) => state.settings.items],
    (settings) => {
        for (const key in settings) {
            if (defaultSettings[key as keyof Settings] !== settings[key as keyof Settings]) {
                return false;
            }
        }
        return true;
    }
);

export { selectSetting, selectRememberSettings, selectIsDefaultSettings };
