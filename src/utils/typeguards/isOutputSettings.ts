import { config } from '@/config';
import type { OutputSettings } from '@/types';

export function isOutputSettings(value: unknown): value is OutputSettings {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const valueObj = value as Record<string, unknown>;
  const booleanSettings = config.outputSettings.entries.boolean;

  for (const booleanSetting of booleanSettings) {
    if (typeof valueObj[booleanSetting] === 'boolean') {
      continue;
    }
    return false;
  }

  const stringSettings = config.outputSettings.entries.string as Record<string, unknown[]>;

  for (const stringSetting of Object.keys(stringSettings)) {
    if (stringSettings[stringSetting].includes(valueObj[stringSetting])) {
      continue;
    }
    return false;
  }

  return true;
}
