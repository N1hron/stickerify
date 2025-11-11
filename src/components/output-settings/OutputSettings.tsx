import { Card, Divider } from '@ui';
import { OutputSettingsList } from './OutputSettingsList';
import { OutputSettingsFooter } from './OutputSettingsFooter';

import styles from './style.module.scss';

export function OutputSettings() {
  return (
    <Card className={styles.outputSettings} as='section'>
      <Card.Title>Output settings</Card.Title>
      <Divider />
      <OutputSettingsList />
      <OutputSettingsFooter />
    </Card>
  );
}
