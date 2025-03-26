import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button } from '../ui';
import {
    selectIsDefaultSettings,
    restoreDefaultSettings,
} from '../../store/slices/output-settings';

function RestoreDefaults() {
    const dispatch = useAppDispatch();
    const isDefaultSettings = useAppSelector(selectIsDefaultSettings);

    function handleRestoreDefaultsClick() {
        dispatch(restoreDefaultSettings());
    }

    return (
        <Button color='accent' onClick={handleRestoreDefaultsClick} disabled={isDefaultSettings}>
            Restore defaults
        </Button>
    );
}

export { RestoreDefaults };
