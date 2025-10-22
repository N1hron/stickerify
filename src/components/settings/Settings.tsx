import { Card, Divider } from '@ui';
import { SettingList } from './setting-list/SettingList';
import { RememberSettings } from './RememberSettings';
import { RestoreDefaultSettings } from './RestoreDefaultSettings';

import styles from './style.module.scss';

function Settings() {
    return (
        <Card className={styles.settings} as='section' tabIndex={-1}>
            <h2 className={styles.title}>Settings</h2>
            <Divider />
            <div className={styles.item}>
                <SettingList />
            </div>
            <Divider />
            <div className={styles.item}>
                <RememberSettings />
                <RestoreDefaultSettings />
            </div>
        </Card>
    );
}

export { Settings };
