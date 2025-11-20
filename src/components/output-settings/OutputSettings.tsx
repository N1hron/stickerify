import { Card, Divider } from '@ui';
import { OutputSettingsList } from './OutputSettingsList';
import { OutputSettingsRemember } from './OutputSettingsRemember';
import { OutputSettingsRestore } from './OutputSettingsRestore';

import styles from './style.module.scss';

export function OutputSettings() {
  return (
    <Card className={styles.outputSettings} as='section'>
      <Card.Title>Output settings</Card.Title>
      <Divider />
      <OutputSettingsList />
      <Divider />
      <OutputSettingsRemember />
      <OutputSettingsRestore />
    </Card>
  );
}
