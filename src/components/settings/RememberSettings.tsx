import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectRememberSettings, setRememberSettings } from '@/store/slices/settings';
import { Checkbox, Divider } from '@components/ui';

import styles from './style.module.scss';

function RememberSettings() {
    const dispatch = useAppDispatch();
    const cl = clsx(styles.settingsItem, styles.rememberSettings);
    const rememberSettings = useAppSelector(selectRememberSettings);

    function handleChange(value: boolean) {
        dispatch(setRememberSettings(value));
    }

    return (
        <div className={cl}>
            <Divider />
            <Checkbox label='Remember choice' checked={rememberSettings} onChange={handleChange} />
        </div>
    );
}

export { RememberSettings };
