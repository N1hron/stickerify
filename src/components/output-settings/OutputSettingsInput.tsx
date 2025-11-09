import { OutputSettingsInputString } from './OutputSettingsInputString';
import { OutputSettingsInputBoolean } from './OutputSettingsInputBoolean';
import type { OutputSettingsConfig } from '@/config';

type OutputSettingsInputProps = {
  setting: OutputSettingsConfig[number];
};

export function OutputSettingsInput({ setting }: OutputSettingsInputProps) {
  const isStringSetting = 'values' in setting;

  if (isStringSetting) {
    return <OutputSettingsInputString name={setting.name} label={setting.label} />;
  } else {
    return <OutputSettingsInputBoolean name={setting.name} label={setting.label} />;
  }
}
