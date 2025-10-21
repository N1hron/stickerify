import { Button } from '@ui';
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
        <Button
            className={styles.restoreDefaults}
            color='accent'
            onClick={handleRestoreDefaultsClick}
            disabled={isDefaultSettings}
        >
            Restore defaults
        </Button>
    );
}

export { RestoreDefaultSettings };
