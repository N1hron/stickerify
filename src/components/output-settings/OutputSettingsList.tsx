import { config } from '@/config';

import { OutputSettingsInput } from './OutputSettingsInput';

import styles from './style.module.scss';

export function OutputSettingsList() {
  return (
    <ul className={styles.list}>
      {config.outputSettings.items.map((setting) => (
        <li key={setting.name}>
          <OutputSettingsInput setting={setting} />
        </li>
      ))}
    </ul>
  );
}
