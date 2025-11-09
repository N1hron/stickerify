import { Card } from '@ui/card/Card';
import { Divider } from '@ui/divider/Divider';
import { OutputSettingsList } from './OutputSettingsList';

import styles from './style.module.scss';
import { OutputSettingsFooter } from './OutputSettingsFooter';

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
