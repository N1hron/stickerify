import type { Config } from '@/config';

type OutputSettingsEntries = Config['outputSettings']['entries'];

export type OutputStringSettingName = keyof OutputSettingsEntries['string'];
export type OutputBooleanSettingName = OutputSettingsEntries['boolean'][number];
export type OutputSettingName = OutputStringSettingName | OutputBooleanSettingName;

export type OutputStringSettings = {
  -readonly [N in OutputStringSettingName]: OutputSettingsEntries['string'][N][number];
};

export type OutputBooleanSettings = {
  -readonly [_ in OutputBooleanSettingName]: boolean;
};

export type OutputSettings = OutputStringSettings & OutputBooleanSettings;

export type OutputStringSettingValue<N extends OutputStringSettingName> = OutputStringSettings[N];
export type OutputBooleanSettingValue = boolean;
export type OutputSettingValue<N extends OutputSettingName> = OutputSettings[N];
