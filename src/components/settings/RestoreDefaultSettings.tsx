import { Button, Divider } from '@ui';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectIsDefaultSettings, restoreDefaultSettings } from '@slices/settings';

import styles from './style.module.scss';

function RestoreDefaultSettings() {
    const dispatch = useAppDispatch();
    const isDefaultSettings = useAppSelector(selectIsDefaultSettings);

    function handleRestoreDefaultsClick() {
        dispatch(restoreDefaultSettings());
    }

    return (
        <div className={styles.restoreDefaults}>
            <Divider />
            <Button
                className={styles.restoreDefaultsButton}
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
