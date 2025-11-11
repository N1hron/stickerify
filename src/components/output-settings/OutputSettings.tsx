import { Card } from '@ui';
import { OutputSettingsList } from './OutputSettingsList';
import { OutputSettingsFooter } from './OutputSettingsFooter';

import styles from './style.module.scss';

export function OutputSettings() {
  return (
    <Card className={styles.outputSettings} as='section'>
      <OutputSettingsList />
      <OutputSettingsFooter />
    </Card>
  );
}
