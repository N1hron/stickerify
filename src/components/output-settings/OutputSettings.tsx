import { Card } from '@ui/card/Card';
import { Divider } from '@ui/divider/Divider';
import { OutputSettingsStringItem } from './OutputSettingsStringItem';
import { OutputSettingsBooleanItem } from './OutputSettingsBooleanItem';
import { OutputSettingsRemember } from './OutputSettingsRemember';
import { OutputSettingsRestore } from './OutputSettingsRestore';

import styles from './style.module.scss';

export function OutputSettings() {
  return (
    <Card className={styles.outputSettings} as='section'>
      <Card.Title>Output settings</Card.Title>
      <Divider />
      <ul className={styles.list}>
        <OutputSettingsStringItem name='sizeType' label='Size type' />
        <OutputSettingsStringItem name='horizontalAlignment' label='Horizontal Alignment' />
        <OutputSettingsStringItem name='verticalAlignment' label='Vertical Alignment' />
        <OutputSettingsStringItem name='format' label='File format' />
        <OutputSettingsBooleanItem name='scaleUp' label='Scale up small images' />
        <OutputSettingsBooleanItem name='trimSpaces' label='Trim empty spaces if possible' />
      </ul>
      <div className={styles.footer}>
        <Divider />
        <OutputSettingsRemember />
        <OutputSettingsRestore />
      </div>
    </Card>
  );
}
