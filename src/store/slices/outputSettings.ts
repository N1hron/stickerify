import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { config } from '@/config';
import { isOutputSettings, safeParseJSON } from '@/utils';
import type { AppState } from '@/store';
import type { OutputSettingName, OutputSettings, OutputSettingValue } from '@/types';

type OutputSettingsState = {
  items: OutputSettings;
  remember: boolean;
};

const defaultItems = Object.fromEntries(
  config.outputSettings.items.map((setting) => [setting.name, setting.default])
) as OutputSettings;

const defaultState: OutputSettingsState = {
  items: defaultItems,
  remember: true,
};

function getInitialState(): OutputSettingsState {
  const { keyLS, rememberKeyLS } = config.outputSettings;
  const rememberLS = localStorage.getItem(rememberKeyLS);
  const itemsLS = localStorage.getItem(keyLS);
  const remember = safeParseJSON(rememberLS);
  const items = safeParseJSON(itemsLS);

  if (isOutputSettings(items)) {
    if (remember === true) {
      return { items, remember };
    }

    if (remember === false) {
      localStorage.removeItem(keyLS);
      return { items: defaultItems, remember };
    }

    localStorage.setItem(rememberKeyLS, String(defaultState.remember));
    return { items, remember: defaultState.remember };
  }

  if (itemsLS) {
    localStorage.removeItem(keyLS);
  }

  if (typeof remember === 'boolean') {
    return { items: defaultItems, remember };
  }

  localStorage.setItem(rememberKeyLS, String(defaultState.remember));

  return defaultState;
}

const initialState = getInitialState();

const outputSettingsSlice = createSlice({
  name: 'outputSettings',
  initialState,
  reducers: {
    setOutputSetting<N extends OutputSettingName>(
      state: OutputSettingsState,
      action: PayloadAction<[N, OutputSettingValue<N>]>
    ) {
      const [name, value] = action.payload;
      state.items[name] = value;
    },
    setRememberOutputSettings(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    },
    resetOutputSettings(state) {
      state.items = defaultItems;
    },
  },
  selectors: {
    selectOutputSettings(state) {
      return state.items;
    },
    selectRememberOutputSettings(state) {
      return state.remember;
    },
    selectIsDefaultOutputSettings(state) {
      return Object.values(defaultItems).join('') === Object.values(state.items).join('');
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
    return state.outputSettings.items[name];
  };
