import { Divider } from '@ui';
import { OutputSettingsRemember } from './OutputSettingsRemember';
import { OutputSettingsRestore } from './OutputSettingsRestore';

import styles from './style.module.scss';

export function OutputSettingsFooter() {
  return (
    <div className={styles.footer}>
      <Divider />
      <OutputSettingsRemember />
      <OutputSettingsRestore />
    </div>
  );
}
