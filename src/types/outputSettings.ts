import type { OutputSettingsConfig } from '@/config';
import type { KeysMatching } from './common';

export type OutputSettings = {
  [N in OutputSettingsConfig[number]['name']]: Extract<
    OutputSettingsConfig[number],
    { name: N }
  > extends {
    values: (infer V)[];
  }
    ? V
    : boolean;
};

export type OutputSettingName = keyof OutputSettings;
export type OutputSettingValue<N extends OutputSettingName> = OutputSettings[N];

export type OutputStringSettingName = KeysMatching<OutputSettings, string>;
export type OutputStringSettingValue<N extends OutputStringSettingName> = OutputSettings[N];
export type OutputStringSettings = Pick<OutputSettings, OutputStringSettingName>;

export type OutputBooleanSettingName = KeysMatching<OutputSettings, boolean>;
export type OutputBooleanSettingValue<N extends OutputBooleanSettingName> = OutputSettings[N];
export type OutputBooleanSettings = Pick<OutputSettings, OutputBooleanSettingName>;
