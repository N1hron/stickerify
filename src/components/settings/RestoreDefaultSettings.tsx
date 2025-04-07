import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectIsDefaultSettings, restoreDefaultSettings } from '@/store/slices/settings';
import { Button, Divider } from '@components/ui';

import styles from './style.module.scss';

function RestoreDefaultSettings() {
    const dispatch = useAppDispatch();
    const isDefaultSettings = useAppSelector(selectIsDefaultSettings);

    function handleRestoreDefaultsClick() {
        dispatch(restoreDefaultSettings());
    }

    return (
        <div className={styles.settingsItem}>
            <Divider />
            <Button
                color='accent'
                onClick={handleRestoreDefaultsClick}
                disabled={isDefaultSettings}
            >
                Restore defaults
            </Button>
        </div>
    );
}

export { RestoreDefaultSettings };
