import { Card, Divider } from '@ui';
import { SettingList } from './setting-list/SettingList';
import { RememberSettings } from './RememberSettings';
import { RestoreDefaultSettings } from './RestoreDefaultSettings';

import styles from './style.module.scss';

function Settings() {
    return (
        <Card className={styles.settings} as='aside' tabIndex={-1}>
            <SettingList />
            <Divider />
            <RememberSettings />
            <RestoreDefaultSettings />
        </Card>
    );
}

export { Settings };
