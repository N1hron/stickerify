import { config } from '@/config';
import type { OutputSettings } from '@/types';

export function isOutputSettings(param: unknown): param is OutputSettings {
  if (!(typeof param === 'object' && param)) return false;

  for (const setting of config.outputSettings.items) {
    if (!(setting.name in param)) return false;

    const p = param as Record<typeof setting.name, unknown>;

    if (
      !(
        ('values' in setting && setting.values.find((v) => v === p[setting.name])) ||
        typeof p[setting.name] === 'boolean'
      )
    ) {
      return false;
    }
  }

  return true;
}
