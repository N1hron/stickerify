import { createSelector } from '@reduxjs/toolkit';
import { defaultSettings } from '.';

import { RootState } from '../..';
import { Settings } from '../../../types';

export const selectRememberSettings = (state: RootState) => state.settings.remember;

export const selectSetting =
    <T extends keyof Settings>(name: T) =>
    (state: RootState): Settings[T] => {
        return state.settings.items[name];
    };

export const selectIsDefaultSettings = createSelector(
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
