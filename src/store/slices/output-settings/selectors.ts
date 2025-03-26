import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { OutputSettings } from '../../../types';
import { defaultSettings } from '.';

const selectSetting =
    <T extends keyof OutputSettings>(name: T) =>
    (state: RootState): OutputSettings[T] => {
        return state.outputSettings.items[name];
    };

const selectRememberSettings = (state: RootState) => state.outputSettings.remember;

const selectIsDefaultSettings = createSelector(
    [(state: RootState) => state.outputSettings.items],
    (settings) => {
        for (const key in settings) {
            if (
                defaultSettings[key as keyof OutputSettings] !==
                settings[key as keyof OutputSettings]
            ) {
                return false;
            }
        }
        return true;
    }
);

export { selectSetting, selectRememberSettings, selectIsDefaultSettings };
