import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { isOutputSettings, safeParseJSON } from '@/utils';
import { config } from '@/config';
import type { OutputSettingName, OutputSettings, OutputSettingValue } from '@/types';
import type { AppState } from '..';

type OutputSettingsState = {
  entries: OutputSettings;
  remember: boolean;
};

const defaultEntries: OutputSettings = {
  sizeType: 'sticker',
  format: 'webp',
  horizontalAlignment: 'middle',
  verticalAlignment: 'middle',
  trimSpaces: true,
  scaleUp: true,
};

const defaultState: OutputSettingsState = {
  entries: defaultEntries,
  remember: true,
};

function getInitialState(): OutputSettingsState {
  const { localStorageKey, rememberLocalStorageKey } = config.outputSettings;
  const rememberLS = localStorage.getItem(rememberLocalStorageKey);
  const entriesLS = localStorage.getItem(localStorageKey);
  const remember = safeParseJSON(rememberLS);
  const entries = safeParseJSON(entriesLS);

  if (isOutputSettings(entries)) {
    if (remember === true) {
      return { entries, remember };
    }

    if (remember === false) {
      localStorage.removeItem(localStorageKey);
      return { entries: defaultEntries, remember };
    }

    localStorage.setItem(rememberLocalStorageKey, String(defaultState.remember));
    return { entries, remember: defaultState.remember };
  }

  if (entriesLS) {
    localStorage.removeItem(localStorageKey);
  }

  if (typeof remember === 'boolean') {
    return { entries: defaultEntries, remember };
  }

  localStorage.setItem(rememberLocalStorageKey, String(defaultState.remember));

  return defaultState;
}

const outputSettingsSlice = createSlice({
  name: 'outputSettings',
  initialState: getInitialState,
  reducers: {
    setOutputSetting<N extends OutputSettingName>(
      state: OutputSettingsState,
      action: PayloadAction<[N, OutputSettingValue<N>]>
    ) {
      const [name, value] = action.payload;
      state.entries[name] = value;
    },
    setRememberOutputSettings(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    },
    resetOutputSettings(state) {
      state.entries = defaultEntries;
    },
  },
  selectors: {
    selectOutputSettings(state) {
      return state;
    },
    selectRememberOutputSettings(state) {
      return state.remember;
    },
    selectIsDefaultOutputSettings(state) {
      return Object.values(state.entries).join('') === Object.values(defaultEntries).join('');
    },
  },
});

export const outputSettingsReducer = outputSettingsSlice.reducer;
export const { setOutputSetting, setRememberOutputSettings, resetOutputSettings } =
  outputSettingsSlice.actions;
export const { selectOutputSettings, selectRememberOutputSettings, selectIsDefaultOutputSettings } =
  outputSettingsSlice.selectors;

export const selectOutputSetting =
  <N extends OutputSettingName>(name: N) =>
  (state: AppState): OutputSettingValue<N> => {
    return state.outputSettings.entries[name];
  };
